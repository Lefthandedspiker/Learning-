"use client";

import { useState } from "react";

type AnswerMode = "translate" | "homework" | "exam" | "video";

interface SearchResult {
  answer: string;
  mode: AnswerMode;
  translations?: {
    english: string;
    mandarin: string;
    malay: string;
  };
}

const modeConfig = {
  translate: {
    label: "Smart Translate",
    description: "Translate and explain terms in multiple languages",
    color: "primary",
    icon: TranslateIcon,
  },
  homework: {
    label: "Homework Mode",
    description: "Step-by-step guidance without giving direct answers",
    color: "secondary",
    icon: HomeworkIcon,
  },
  exam: {
    label: "Exam Prep",
    description: "Practice questions and test your knowledge",
    color: "accent",
    icon: ExamIcon,
  },
  video: {
    label: "Video Summary",
    description: "Summarize YouTube videos in your language",
    color: "muted",
    icon: VideoIcon,
  },
};

export function SearchEngine() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<AnswerMode>("translate");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Mode Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(modeConfig) as AnswerMode[]).map((modeKey) => {
          const config = modeConfig[modeKey];
          const isActive = mode === modeKey;
          const colorClasses = {
            primary: isActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:border-primary/50",
            secondary: isActive
              ? "border-secondary bg-secondary/10 text-secondary"
              : "border-border hover:border-secondary/50",
            accent: isActive
              ? "border-accent bg-accent/10 text-accent"
              : "border-border hover:border-accent/50",
            muted: isActive
              ? "border-muted-foreground bg-muted text-foreground"
              : "border-border hover:border-muted-foreground/50",
          };

          return (
            <button
              key={modeKey}
              onClick={() => setMode(modeKey)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${colorClasses[config.color as keyof typeof colorClasses]}`}
            >
              <config.icon className="w-5 h-5 mb-2" />
              <div className="font-medium text-sm">{config.label}</div>
            </button>
          );
        })}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "video"
                ? "Paste a YouTube URL to summarize..."
                : "Type your question in any language..."
            }
            className="w-full px-5 py-4 pr-14 rounded-2xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
          >
            {loading ? (
              <LoadingSpinner className="w-5 h-5" />
            ) : (
              <SearchIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {modeConfig[mode].description}
        </p>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                mode === "translate"
                  ? "bg-primary/10 text-primary"
                  : mode === "homework"
                    ? "bg-secondary/10 text-secondary"
                    : mode === "exam"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {modeConfig[mode].label}
            </span>
          </div>

          <div className="prose prose-sm max-w-none text-foreground">
            <div className="whitespace-pre-wrap">{result.answer}</div>
          </div>

          {result.translations && (
            <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  English
                </div>
                <div className="text-sm text-foreground">
                  {result.translations.english}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  中文 (Mandarin)
                </div>
                <div className="text-sm text-foreground">
                  {result.translations.mandarin}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Bahasa Melayu
                </div>
                <div className="text-sm text-foreground">
                  {result.translations.malay}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Examples */}
      {!result && !loading && (
        <div className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "What is photosynthesis?",
              "Explain quadratic equations",
              "How does gravity work?",
              "What is the water cycle?",
            ].map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TranslateIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      />
    </svg>
  );
}

function HomeworkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function ExamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  );
}

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
