"use client";

import Link from "next/link";

interface SquadMember {
  id: string;
  username: string | null;
}

interface TopFlexer {
  id: string;
  username: string | null;
  flex_points: number;
}

export function Sidebar({
  squadMembers,
  topFlexers,
  currentUserId,
}: {
  squadMembers: SquadMember[];
  topFlexers: TopFlexer[];
  currentUserId: string;
}) {
  return (
    <aside className="w-72 border-r border-border min-h-[calc(100vh-60px)] p-4 space-y-6">
      {/* Study Squad */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-bold text-sm tracking-wider text-foreground">STUDY SQUAD</span>
        </div>
        
        {squadMembers.length > 0 ? (
          <div className="space-y-3">
            {squadMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold">
                      {(member.username?.[0] || "U").toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">
                    {member.username || "Unknown"}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No squad members yet</p>
        )}
        
        <Link
          href="/dashboard/squads"
          className="mt-4 block w-full py-2 border border-border text-center text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors rounded"
        >
          + INVITE TO SQUAD
        </Link>
      </div>

      {/* Global Flexers */}
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <span className="font-bold text-sm tracking-wider text-primary">GLOBAL FLEXERS</span>
        </div>
        
        <div className="space-y-2">
          {topFlexers.map((flexer, index) => {
            const isCurrentUser = flexer.id === currentUserId;
            return (
              <div 
                key={flexer.id} 
                className={`flex items-center justify-between py-2 ${
                  index === 0 ? "border-l-2 border-primary pl-2" : "pl-4"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${index === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {index + 1}. {flexer.username || "Unknown"}
                    {isCurrentUser && " (You)"}
                  </span>
                </div>
                <span className={`text-sm font-medium ${index === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  {flexer.flex_points.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        
        <Link
          href="/dashboard/leaderboard"
          className="mt-4 block text-center text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View Full Leaderboard
        </Link>
      </div>
    </aside>
  );
}
