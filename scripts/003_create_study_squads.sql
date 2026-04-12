-- Create study squads table
create table if not exists public.study_squads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique not null,
  created_by uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create squad members junction table
create table if not exists public.squad_members (
  id uuid primary key default gen_random_uuid(),
  squad_id uuid references public.study_squads(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(squad_id, user_id)
);

-- Create search history table for shared outputs
create table if not exists public.search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  squad_id uuid references public.study_squads(id) on delete set null,
  query text not null,
  mode text not null, -- 'translate', 'homework', 'exam', 'video'
  response text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.study_squads enable row level security;
alter table public.squad_members enable row level security;
alter table public.search_history enable row level security;

-- Study squads policies
create policy "squads_select" on public.study_squads for select using (true);
create policy "squads_insert" on public.study_squads for insert with check (auth.uid() = created_by);
create policy "squads_delete" on public.study_squads for delete using (auth.uid() = created_by);

-- Squad members policies
create policy "members_select" on public.squad_members for select using (true);
create policy "members_insert" on public.squad_members for insert with check (auth.uid() = user_id);
create policy "members_delete" on public.squad_members for delete using (auth.uid() = user_id);

-- Search history policies (can see own and squad members' searches)
create policy "history_select_own" on public.search_history for select using (auth.uid() = user_id);
create policy "history_select_squad" on public.search_history for select using (
  squad_id in (select squad_id from public.squad_members where user_id = auth.uid())
);
create policy "history_insert" on public.search_history for insert with check (auth.uid() = user_id);
