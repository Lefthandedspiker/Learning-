"use client";

import { useState } from "react";

type AnswerMode = "translate" | "homework" | "exam" | "video";

interface SearchResult {
  originalInput: string;
  scientificUpgrade: string;
  answer: string;
  mode: AnswerMode;
  homeworkTip?: string;
  squadMission?: string;
}

const modeConfig = {
  translate: {
    label: "SMART TRANSLATE",
  },
  homework: {
    label: "HOMEWORK MODE",
  },
  exam: {
    label: "EXAM PREP",
  },
  video: {
    label: "VIDEO SUMMARIES",
  },
};

export function FlexSearch() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<AnswerMode>("homework");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stealthMode, setStealthMode] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

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
      
      // Transform API response to our format
      setResult({
        originalInput: query,
        scientificUpgrade: data.scientificTerm || "Processing...",
        answer: data.answer,
        mode: mode,
        homeworkTip: data.homeworkTip,
        squadMission: data.squadMission,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold text-center">
        <span className="text-foreground">ASK </span>
        <span className="text-foreground italic">ANYTHING</span>
        <span className="text-foreground">.</span>
      </h1>

      {/* Mode Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {(Object.keys(modeConfig) as AnswerMode[]).map((modeKey) => {
          const config = modeConfig[modeKey];
          const isActive = mode === modeKey;
          return (
            <button
              key={modeKey}
              onClick={() => setMode(modeKey)}
              className={`px-4 py-2 rounded text-xs font-bold tracking-wider transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:border-primary"
              }`}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center bg-card border-2 border-border rounded-lg overflow-hidden focus-within:border-primary transition-colors">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-5 py-4 bg-transparent text-foreground text-xl placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
          >
            {loading ? "..." : "GO"}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Card - Original Input & Scientific Upgrade */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground tracking-wider">ORIGINAL INPUT:</span>
              <span className="text-xs text-muted-foreground tracking-wider">SYNCED TO SQUAD</span>
            </div>
            
            <div className="text-foreground italic">&quot;{result.originalInput}&quot;</div>
            
            <div className="flex items-center gap-2 text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div>
              <span className="text-xs text-muted-foreground tracking-wider">SCIENTIFIC UPGRADE:</span>
              <div className="text-lg font-bold text-foreground mt-1">{result.scientificUpgrade}</div>
            </div>
          </div>

          {/* Right Card - The Breakdown */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-wider text-foreground">THE BREAKDOWN</h3>
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-wider rounded">
                {modeConfig[result.mode].label}
              </span>
            </div>
            
            <div className={`text-muted-foreground leading-relaxed ${stealthMode ? "blur-sm select-none" : ""}`}>
              {result.answer}
            </div>
            
            {result.homeworkTip && (
              <div className={`text-foreground ${stealthMode ? "blur-sm select-none" : ""}`}>
                <span className="font-bold">Homework Tip: </span>
                {result.homeworkTip}
              </div>
            )}
            
            <button
              onClick={() => setStealthMode(!stealthMode)}
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {stealthMode ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                )}
              </svg>
              TOGGLE STEALTH VIEW
            </button>
          </div>
        </div>
      )}

      {/* Squad Mission */}
      {result?.squadMission && (
        <div className="bg-secondary/20 border border-secondary rounded-lg p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-secondary-foreground tracking-wider mb-1">SQUAD MISSION</div>
            <div className="text-foreground font-medium">{result.squadMission}</div>
          </div>
          <svg className="w-8 h-8 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 pt-8">
        <button className="px-6 py-3 bg-card border border-border rounded-lg text-foreground font-bold text-sm tracking-wider hover:border-primary transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          HOTPOT BREAK
        </button>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-sm tracking-wider hover:opacity-90 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          REWARD SHOP
        </button>
      </div>
    </div>
  );
}
