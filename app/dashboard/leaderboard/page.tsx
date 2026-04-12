import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get top users by flex points
  const { data: leaderboard } = await supabase
    .from("profiles")
    .select("id, username, flex_points, level, location")
    .order("flex_points", { ascending: false })
    .limit(50);

  const currentUserRank =
    leaderboard?.findIndex((p) => p.id === user?.id) ?? -1;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          See how you rank against other students. Keep learning to climb up!
        </p>
      </div>

      {/* Your Rank Card */}
      {currentUserRank >= 0 && leaderboard && (
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Your Rank</p>
              <p className="text-4xl font-heading font-bold text-foreground">
                #{currentUserRank + 1}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Your Points</p>
              <p className="text-2xl font-bold text-primary">
                {leaderboard[currentUserRank]?.flex_points ?? 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/50">
          <h2 className="font-heading font-semibold text-foreground">
            Top Students
          </h2>
        </div>

        <div className="divide-y divide-border">
          {leaderboard && leaderboard.length > 0 ? (
            leaderboard.map((profile, index) => (
              <div
                key={profile.id}
                className={`flex items-center gap-4 p-4 ${
                  profile.id === user?.id ? "bg-primary/5" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : index === 1
                        ? "bg-gray-100 text-gray-700"
                        : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">
                      {profile.username || "Anonymous Student"}
                    </p>
                    {profile.id === user?.id && (
                      <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Level {profile.level} • {profile.location || "Unknown location"}
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary font-semibold">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {profile.flex_points}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No students on the leaderboard yet.</p>
              <p className="text-sm mt-2">
                Start searching and learning to earn Flex Points!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rewards Info */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          How to Earn Flex Points
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Search & Learn</p>
              <p className="text-sm text-muted-foreground">
                +5 points per search
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Complete Challenges</p>
              <p className="text-sm text-muted-foreground">
                +20 points per challenge
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <svg
                className="w-4 h-4"
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
            <div>
              <p className="font-medium text-foreground">Join Study Squads</p>
              <p className="text-sm text-muted-foreground">
                +10 points for collaboration
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-foreground">Daily Streak</p>
              <p className="text-sm text-muted-foreground">
                +15 bonus points daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
