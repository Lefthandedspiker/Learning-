import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SYSTEM_PROMPTS = {
  translate: `You are a helpful study assistant for students learning in English who come from Mandarin-speaking backgrounds (SJKC schools in Malaysia). 
Your job is to:
1. Understand the student's question (which may be in English, Mandarin, or Malay)
2. Provide a clear, educational explanation in English
3. Translate key terms into all three languages (English, Mandarin/中文, and Malay/Bahasa Melayu)

Format your response as:
- Main explanation in English (simple, clear language suitable for students)
- Key vocabulary with translations

Always be encouraging and supportive. Use simple language appropriate for students.`,

  homework: `You are a homework helper for students. Your role is to GUIDE students to find answers, not give them directly.

Rules:
1. Never give direct answers
2. Break down problems into steps
3. Ask guiding questions to help students think
4. Explain concepts needed to solve the problem
5. Provide hints if the student is stuck
6. Celebrate when they're on the right track

Be patient, encouraging, and use simple language. If the question is in Mandarin or Malay, respond in that language but include English terms.`,

  exam: `You are an exam preparation assistant. When a student asks about a topic:

1. First, give a brief summary of the key concepts
2. Then, generate 3 practice questions (multiple choice or short answer)
3. After each question, wait for the student's answer or provide the answer key at the end

Format questions clearly with numbers. Include a mix of difficulty levels. For science and math topics, include formula reminders.`,

  video: `You are a video summarizer. When given a YouTube URL or video topic:

1. If it's a URL, acknowledge that you'll summarize the educational content
2. Provide a summary of key points in bullet format
3. Translate key terms to Mandarin and Malay
4. Suggest 2-3 follow-up topics to study

Note: You cannot actually access YouTube videos, so for URLs, provide general information about the topic based on the video title or description the user might provide. Ask clarifying questions if needed.`,
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query, mode } = await request.json();

    if (!query || !mode) {
      return NextResponse.json(
        { error: "Missing query or mode" },
        { status: 400 }
      );
    }

    const systemPrompt =
      SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] ||
      SYSTEM_PROMPTS.translate;

    // Use Vercel AI Gateway with a free model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      // Fallback to a simulated response if API fails
      const fallbackResponse = generateFallbackResponse(query, mode);
      
      // Award points for using the search
      await awardPoints(supabase, user.id, 5);

      return NextResponse.json(fallbackResponse);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || "No response generated.";

    // Award flex points for using the search
    await awardPoints(supabase, user.id, 5);

    // Extract translations for translate mode
    let translations;
    if (mode === "translate") {
      translations = extractTranslations(query, answer);
    }

    return NextResponse.json({
      answer,
      mode,
      translations,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

async function awardPoints(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  points: number
) {
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("flex_points, level")
      .eq("id", userId)
      .single();

    if (profile) {
      const newPoints = (profile.flex_points || 0) + points;
      const newLevel = Math.floor(newPoints / 100) + 1;

      await supabase
        .from("profiles")
        .update({
          flex_points: newPoints,
          level: newLevel,
        })
        .eq("id", userId);
    }
  } catch (error) {
    console.error("Error awarding points:", error);
  }
}

function generateFallbackResponse(query: string, mode: string) {
  const responses: Record<string, string> = {
    translate: `**Understanding: "${query}"**

Let me help you understand this concept!

This is a great question. Here's a simple explanation:

The topic you're asking about is important for your studies. To fully understand it, consider:
1. Breaking it down into smaller parts
2. Looking at examples from everyday life
3. Practicing with exercises

**Key Terms:**
- English: ${query}
- 中文 (Mandarin): Please set up the API key for full translations
- Bahasa Melayu: Sila tetapkan kunci API untuk terjemahan penuh

Keep studying! You're doing great! ⭐`,

    homework: `**Homework Helper: Let's solve this together!**

I see you're working on: "${query}"

Instead of giving you the answer directly, let me guide you:

**Step 1:** What do you already know about this topic?
**Step 2:** Can you identify the key information in the problem?
**Step 3:** What formulas or concepts might apply here?

Think about these questions, and try to work through them. If you get stuck, tell me where and I'll give you a hint!

Remember: Making mistakes is part of learning! 💪`,

    exam: `**Exam Prep: ${query}**

Here are some practice questions to test your knowledge:

**Question 1 (Easy):**
What is the basic definition of this concept?

**Question 2 (Medium):**
Can you explain how this applies in real life?

**Question 3 (Challenge):**
How does this relate to other topics you've learned?

Take your time to answer each question. Review your notes if needed!

*Tip: Set up the API key for personalized practice questions!*`,

    video: `**Video Summary Request**

I received your request about: "${query}"

To summarize educational videos, I need the API to be configured. However, here's what you can do:

1. Watch the video and note the main points
2. Look up key terms you don't understand
3. Create your own summary in English, then translate to your preferred language

**Suggested Topics to Explore:**
- Related concepts
- Real-world applications
- Practice problems

*Set up the API key for full video summaries!*`,
  };

  return {
    answer: responses[mode] || responses.translate,
    mode,
    translations:
      mode === "translate"
        ? {
            english: query,
            mandarin: "请设置 API 密钥以获取完整翻译",
            malay: "Sila tetapkan kunci API untuk terjemahan penuh",
          }
        : undefined,
  };
}

function extractTranslations(query: string, answer: string) {
  // Simple extraction - in production, you'd parse the AI response better
  return {
    english: query,
    mandarin: "请参阅上面的解释",
    malay: "Sila rujuk penjelasan di atas",
  };
}
