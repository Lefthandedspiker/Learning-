import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and track your progress.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-3xl font-heading font-bold text-primary mb-1">
            {profile?.flex_points ?? 0}
          </div>
          <div className="text-sm text-muted-foreground">Flex Points</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-3xl font-heading font-bold text-secondary mb-1">
            {profile?.level ?? 1}
          </div>
          <div className="text-sm text-muted-foreground">Level</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-3xl font-heading font-bold text-accent mb-1">
            {100 - ((profile?.flex_points ?? 0) % 100)}
          </div>
          <div className="text-sm text-muted-foreground">Points to Level Up</div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <div className="text-3xl font-heading font-bold text-foreground mb-1">
            {Math.floor((profile?.flex_points ?? 0) / 5)}
          </div>
          <div className="text-sm text-muted-foreground">Searches Made</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-foreground">
            Level {profile?.level ?? 1}
          </span>
          <span className="text-sm text-muted-foreground">
            {(profile?.flex_points ?? 0) % 100}/100 XP
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${((profile?.flex_points ?? 0) % 100)}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Keep learning to unlock new levels and achievements!
        </p>
      </div>

      {/* Profile Form */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold text-foreground mb-4">
          Account Information
        </h2>
        <ProfileForm profile={profile} email={user?.email ?? ""} />
      </div>
    </div>
  );
}
