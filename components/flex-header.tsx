"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string | null;
  flex_points: number;
  level: number;
}

const RANKS = [
  { min: 0, name: "ROOKIE", color: "text-muted-foreground" },
  { min: 100, name: "LEARNER", color: "text-blue-400" },
  { min: 300, name: "SCHOLAR", color: "text-green-400" },
  { min: 600, name: "EXPERT", color: "text-yellow-400" },
  { min: 1000, name: "STREET LEGEND", color: "text-primary" },
  { min: 2000, name: "FLEX MASTER", color: "text-primary" },
];

function getRank(points: number) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (points >= RANKS[i].min) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

function getProgress(points: number) {
  const rank = getRank(points);
  const rankIndex = RANKS.indexOf(rank);
  if (rankIndex === RANKS.length - 1) return 100;
  
  const nextRank = RANKS[rankIndex + 1];
  const progress = ((points - rank.min) / (nextRank.min - rank.min)) * 100;
  return Math.min(progress, 100);
}

export function FlexHeader({
  user,
  profile,
}: {
  user: User;
  profile: Profile | null;
}) {
  const rank = getRank(profile?.flex_points ?? 0);
  const progress = getProgress(profile?.flex_points ?? 0);

  return (
    <header className="border-b border-border bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground px-3 py-1.5 font-bold text-sm tracking-wider">
              THE FLEX
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium tracking-wider ${rank.color}`}>
              RANK: {rank.name}
            </span>
            <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">LVL {profile?.level ?? 1}</span>
            <div className="flex items-center gap-1 text-primary font-bold">
              <span>{(profile?.flex_points ?? 0).toLocaleString()}</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <Link href="/dashboard/profile">
            <div className="w-10 h-10 rounded-full bg-muted border-2 border-primary flex items-center justify-center overflow-hidden">
              <span className="text-sm font-bold text-foreground">
                {(profile?.username?.[0] || user.email?.[0] || "U").toUpperCase()}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
