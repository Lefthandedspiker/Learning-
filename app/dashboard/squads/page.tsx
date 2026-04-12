import { createClient } from "@/lib/supabase/server";
import { SquadList } from "@/components/squad-list";
import { CreateSquadForm } from "@/components/create-squad-form";

export default async function SquadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user's squads
  const { data: memberSquads } = await supabase
    .from("squad_members")
    .select(
      `
      squad_id,
      role,
      study_squads (
        id,
        name,
        description,
        invite_code,
        created_at
      )
    `
    )
    .eq("user_id", user?.id);

  const squads =
    memberSquads?.map((m) => ({
      ...m.study_squads,
      role: m.role,
    })) || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Study Squads
        </h1>
        <p className="text-muted-foreground">
          Form study groups with friends to learn together and share results.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create or Join Squad */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4">
            Create or Join a Squad
          </h2>
          <CreateSquadForm userId={user?.id || ""} />
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-border p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4">
            Why Study Together?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-muted-foreground text-sm">
                Share search results with your squad members
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-muted-foreground text-sm">
                Compete on squad leaderboards for bonus points
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-muted-foreground text-sm">
                Help each other with homework and exam prep
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-muted-foreground text-sm">
                Stay motivated with group study sessions
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Squad List */}
      <SquadList squads={squads} userId={user?.id || ""} />
    </div>
  );
}
