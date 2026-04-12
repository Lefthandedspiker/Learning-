import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FlexHeader } from "@/components/flex-header";
import { Sidebar } from "@/components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get squad members for sidebar
  const { data: squadMemberships } = await supabase
    .from("squad_members")
    .select(`
      squad_id,
      study_squads (
        id,
        name
      )
    `)
    .eq("user_id", user.id);

  let squadMembers: Array<{ id: string; username: string | null }> = [];
  if (squadMemberships && squadMemberships.length > 0) {
    const squadId = (squadMemberships[0] as { squad_id: string }).squad_id;
    const { data: members } = await supabase
      .from("squad_members")
      .select(`
        user_id,
        profiles (
          id,
          username
        )
      `)
      .eq("squad_id", squadId);
    
    if (members) {
      squadMembers = members.map((m) => ({
        id: (m.profiles as { id: string })?.id || m.user_id,
        username: (m.profiles as { username: string | null })?.username || null,
      }));
    }
  }

  // Get top 3 for leaderboard
  const { data: topFlexers } = await supabase
    .from("profiles")
    .select("id, username, flex_points")
    .order("flex_points", { ascending: false })
    .limit(3);

  return (
    <div className="min-h-screen bg-background">
      <FlexHeader user={user} profile={profile} />
      <div className="flex">
        <Sidebar 
          squadMembers={squadMembers} 
          topFlexers={topFlexers || []} 
          currentUserId={user.id}
        />
        <main className="flex-1 px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
