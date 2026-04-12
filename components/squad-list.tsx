"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Squad {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  created_at: string;
  role: string;
}

export function SquadList({
  squads,
  userId,
}: {
  squads: Squad[];
  userId: string;
}) {
  const [leaving, setLeaving] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLeaveSquad = async (squadId: string) => {
    if (!confirm("Are you sure you want to leave this squad?")) return;

    setLeaving(squadId);

    const { error } = await supabase
      .from("squad_members")
      .delete()
      .eq("squad_id", squadId)
      .eq("user_id", userId);

    if (!error) {
      router.refresh();
    }

    setLeaving(null);
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Invite code copied to clipboard!");
  };

  if (squads.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-foreground mb-2">
          No Squads Yet
        </h3>
        <p className="text-muted-foreground text-sm">
          Create a new squad or join one with an invite code to study with
          friends!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading font-semibold text-foreground">
        Your Squads ({squads.length})
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {squads.map((squad) => (
          <div
            key={squad.id}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{squad.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {squad.role}
                </p>
              </div>
              {squad.role === "owner" && (
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                  Owner
                </span>
              )}
            </div>

            {squad.description && (
              <p className="text-sm text-muted-foreground mb-4">
                {squad.description}
              </p>
            )}

            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-4">
              <span className="text-xs text-muted-foreground">Invite Code:</span>
              <code className="text-sm font-mono text-foreground flex-1">
                {squad.invite_code}
              </code>
              <button
                onClick={() => copyInviteCode(squad.invite_code)}
                className="p-1 hover:bg-card rounded transition-colors"
                title="Copy code"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push(`/dashboard/squads/${squad.id}`)}
                className="flex-1 py-2 px-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-all"
              >
                View Squad
              </button>
              {squad.role !== "owner" && (
                <button
                  onClick={() => handleLeaveSquad(squad.id)}
                  disabled={leaving === squad.id}
                  className="py-2 px-3 border border-destructive/30 text-destructive text-sm font-medium rounded-lg hover:bg-destructive/10 transition-all disabled:opacity-50"
                >
                  {leaving === squad.id ? "..." : "Leave"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
