import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SCIENTIFIC_TERMS: Record<string, string> = {
  fire: "Exothermic Combustion",
  water: "H₂O Molecular Compound",
  photosynthesis: "Chlorophyll-Mediated Carbon Fixation",
  gravity: "Gravitational Force (F = Gm₁m₂/r²)",
  electricity: "Electron Flow / Electric Current",
  light: "Electromagnetic Radiation",
  sound: "Acoustic Wave Propagation",
  plant: "Autotrophic Organism",
  animal: "Heterotrophic Organism",
  cell: "Fundamental Unit of Life",
  atom: "Fundamental Unit of Matter",
  energy: "Capacity to Do Work (Joules)",
  force: "Mass × Acceleration (Newtons)",
  speed: "Distance / Time (m/s)",
  heat: "Thermal Energy Transfer",
  cold: "Absence of Thermal Energy",
  rain: "Precipitation / Water Cycle",
  cloud: "Atmospheric Water Vapor Condensation",
  sun: "G-Type Main Sequence Star",
  moon: "Natural Satellite",
  earth: "Terrestrial Planet",
  math: "Mathematical Sciences",
  number: "Numerical Value",
  equation: "Mathematical Statement of Equality",
};

function getScientificTerm(query: string): string {
  const lowerQuery = query.toLowerCase();
  for (const [key, term] of Object.entries(SCIENTIFIC_TERMS)) {
    if (lowerQuery.includes(key)) {
      return term;
    }
  }
  // Generate a generic scientific-sounding term
  const words = query.split(" ").filter(w => w.length > 3);
  if (words.length > 0) {
    return `${words[0].charAt(0).toUpperCase() + words[0].slice(1)} Analysis`;
  }
  return "Scientific Inquiry";
}

function generateHomeworkTip(query: string): string {
  const tips = [
    `Always mention the key components and their relationships to score.`,
    `Remember to include real-world examples in your answer.`,
    `Break down your explanation into clear, numbered steps.`,
    `Include relevant formulas or definitions in your response.`,
    `Connect this concept to related topics you&apos;ve learned.`,
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

function generateSquadMission(query: string, scientificTerm: string): string {
  const missions = [
    `Quiz your squad on the ${scientificTerm} for 100 XP`,
    `Challenge a friend to explain ${query} in their own words for 50 XP`,
    `Create a diagram about ${scientificTerm} and share with your squad for 75 XP`,
    `Find 3 real-world examples of ${query} to share for 60 XP`,
  ];
  return missions[Math.floor(Math.random() * missions.length)];
}

const SYSTEM_PROMPTS = {
  translate: `You are a helpful study assistant for students learning in English who come from Mandarin-speaking backgrounds (SJKC schools in Malaysia). 
Provide a clear, simple explanation. Include translations to Mandarin and Malay.
Keep your response concise - 2-3 sentences for the main explanation.`,

  homework: `You are a homework helper for students. Guide them to understand WITHOUT giving direct answers.
Explain the concept simply in 2-3 sentences, then provide a homework tip.
Be encouraging and use simple language.`,

  exam: `You are an exam prep assistant. Provide a brief explanation of the topic in 2-3 sentences.
Then suggest what key points students should remember for exams.`,

  video: `You are a video summarizer. Provide a brief summary of the educational topic in 2-3 sentences.
Suggest key takeaways for studying.`,
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

    const scientificTerm = getScientificTerm(query);
    const homeworkTip = generateHomeworkTip(query);
    const squadMission = generateSquadMission(query, scientificTerm);

    // Try to get AI response if API key is available
    let answer = "";
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const systemPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.translate;
        
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
            max_tokens: 300,
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          answer = data.choices[0]?.message?.content || "";
        }
      } catch {
        // Fall through to fallback
      }
    }

    // Fallback responses if no API key or API fails
    if (!answer) {
      answer = generateFallbackAnswer(query, mode, scientificTerm);
    }

    // Award flex points for using the search
    await awardPoints(supabase, user.id, 5);

    return NextResponse.json({
      answer,
      mode,
      scientificTerm,
      homeworkTip: mode === "homework" ? homeworkTip : undefined,
      squadMission,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

function generateFallbackAnswer(query: string, mode: string, scientificTerm: string): string {
  const responses: Record<string, string> = {
    translate: `${query} refers to ${scientificTerm.toLowerCase()}. This is an important concept in science that describes a fundamental process or phenomenon. Understanding this will help you connect ideas across different subjects.\n\nKey terms: ${query} (English) | ${query} (中文) | ${query} (Bahasa Melayu)`,
    
    homework: `${query} happens when oxygen and fuel decide to break up their old bonds and form new ones. It releases massive energy.\n\nHomework Tip: Always mention the key components and how they interact to score full marks.`,
    
    exam: `For exams, remember that ${query} is related to ${scientificTerm}. Key points to memorize: the definition, the process involved, and real-world examples. Practice explaining this concept in your own words.`,
    
    video: `This topic covers ${scientificTerm}, which is a fundamental concept. The key takeaways are: understanding the basic definition, recognizing examples in everyday life, and knowing how it connects to other topics you've learned.`,
  };

  return responses[mode] || responses.translate;
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
