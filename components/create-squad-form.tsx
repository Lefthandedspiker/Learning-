"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function CreateSquadForm({ userId }: { userId: string }) {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    const newInviteCode = generateInviteCode();

    // Create the squad
    const { data: squad, error: createError } = await supabase
      .from("study_squads")
      .insert({
        name: name.trim(),
        description: description.trim() || null,
        invite_code: newInviteCode,
        created_by: userId,
      })
      .select()
      .single();

    if (createError) {
      setError(createError.message);
      setLoading(false);
      return;
    }

    // Add creator as owner
    const { error: memberError } = await supabase.from("squad_members").insert({
      squad_id: squad.id,
      user_id: userId,
      role: "owner",
    });

    if (memberError) {
      setError(memberError.message);
      setLoading(false);
      return;
    }

    setName("");
    setDescription("");
    setLoading(false);
    router.refresh();
  };

  const handleJoinSquad = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;

    setLoading(true);
    setError(null);

    // Find the squad by invite code
    const { data: squad, error: findError } = await supabase
      .from("study_squads")
      .select("id")
      .eq("invite_code", inviteCode.trim().toUpperCase())
      .single();

    if (findError || !squad) {
      setError("Invalid invite code. Please check and try again.");
      setLoading(false);
      return;
    }

    // Check if already a member
    const { data: existing } = await supabase
      .from("squad_members")
      .select("id")
      .eq("squad_id", squad.id)
      .eq("user_id", userId)
      .single();

    if (existing) {
      setError("You are already a member of this squad.");
      setLoading(false);
      return;
    }

    // Join the squad
    const { error: joinError } = await supabase.from("squad_members").insert({
      squad_id: squad.id,
      user_id: userId,
      role: "member",
    });

    if (joinError) {
      setError(joinError.message);
      setLoading(false);
      return;
    }

    setInviteCode("");
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex rounded-lg bg-muted p-1">
        <button
          onClick={() => setMode("create")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
            mode === "create"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Create New
        </button>
        <button
          onClick={() => setMode("join")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
            mode === "join"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Join Existing
        </button>
      </div>

      {mode === "create" ? (
        <form onSubmit={handleCreateSquad} className="space-y-4">
          <div>
            <label
              htmlFor="squad-name"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Squad Name
            </label>
            <input
              id="squad-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Form 4 Science Gang"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="squad-description"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Description (optional)
            </label>
            <input
              id="squad-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this squad about?"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Creating..." : "Create Squad"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleJoinSquad} className="space-y-4">
          <div>
            <label
              htmlFor="invite-code"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Invite Code
            </label>
            <input
              id="invite-code"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="Enter 6-character code"
              maxLength={6}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm font-mono uppercase tracking-wider"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ask your friend for their squad&apos;s invite code
            </p>
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || inviteCode.length !== 6}
            className="w-full py-2.5 bg-secondary text-secondary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Joining..." : "Join Squad"}
          </button>
        </form>
      )}
    </div>
  );
}
