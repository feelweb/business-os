-- Business OS -- initiales Schema (Phase 1)
-- Entspricht docs/03-data-model.md. Prinzipien: UUIDs, user_id, created_at/
-- updated_at, optionale archived_at, relationale Kerndaten + JSONB für
-- flexible Metadaten, Rohinput/Content-Versionen erhalten, RLS pro Nutzer.
--
-- Ausführen: Supabase Dashboard -> SQL Editor -> Inhalt einfügen -> Run.
-- (Läuft nicht automatisch -- DDL braucht Projekt-Rechte, die der Anon-Key
-- bewusst nicht hat, siehe CLAUDE.md § Sicherheit.)

-- ---------------------------------------------------------------------
-- Hilfsfunktion: updated_at automatisch pflegen
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- profiles -- 1:1 zu auth.users, per Trigger automatisch angelegt
-- ---------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: owner select" on public.profiles
  for select using (id = auth.uid());
create policy "profiles: owner update" on public.profiles
  for update using (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- brands -- globale Referenzdaten (feelweb/Lodora/RemindFuel), nicht
-- user-scoped: für alle eingeloggten Nutzer:innen gleich lesbar, nur per
-- Migration/Dashboard änderbar (keine Insert/Update/Delete-Policy für
-- normale Nutzer:innen).
-- ---------------------------------------------------------------------
create table public.brands (
  key text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.brands enable row level security;

create policy "brands: authenticated read" on public.brands
  for select to authenticated using (true);

insert into public.brands (key, name) values
  ('feelweb', 'feelweb'),
  ('lodora', 'Lodora'),
  ('remindfuel', 'RemindFuel');

-- ---------------------------------------------------------------------
-- projects (+ tasks) -- deckt Kundenprojekte, eigene Projekte, Produkte
-- und Experimente über die category-Spalte ab (siehe lib/types.ts).
-- ---------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  brand_key text references public.brands (key),
  category text not null check (category in ('client', 'own', 'products', 'experiments')),
  title text not null,
  subtitle text,
  impact text not null default 'medium' check (impact in ('low', 'medium', 'high', 'unclear')),
  effort text not null default 'medium' check (effort in ('low', 'medium', 'high', 'unclear')),
  potential text not null default 'medium' check (potential in ('low', 'medium', 'high', 'unclear')),
  deadline date,
  energy text not null default 'fokus' check (energy in ('leicht', 'fokus')),
  client_value text,
  client_status text,
  client_source text,
  client_next_step text,
  client_content_potential text check (client_content_potential in ('low', 'medium', 'high', 'unclear')),
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid not null references public.projects (id) on delete cascade,
  text text not null,
  done boolean not null default false,
  position integer not null default 0,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- inbox_items -- Brain Dump + Eingang. Soft-Delete über archived_at statt
-- DELETE, damit Rohinput erhalten bleibt (docs/03-data-model.md).
-- ---------------------------------------------------------------------
create table public.inbox_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('idea', 'link', 'task', 'thought')),
  brand_key text references public.brands (key),
  raw_text text not null,
  suggestion jsonb not null default '{}'::jsonb,
  archived_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- content_items (+ content_versions) -- Content-Pipeline. body_json liegt
-- in einer eigenen Versions-Tabelle statt als Spalte, damit ältere
-- Fassungen erhalten bleiben (docs/03-data-model.md: "Content-Versionen
-- erhalten"). Phase 0/Anfang Phase 1: UI liest/schreibt hier noch nicht.
-- ---------------------------------------------------------------------
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  brand_key text not null references public.brands (key),
  parent_content_id uuid references public.content_items (id) on delete set null,
  type text,
  stage text not null default 'ideas' check (stage in ('idea', 'explore', 'direction', 'draft', 'refine', 'ready', 'published', 'learn')),
  title text not null,
  meta text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_versions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  content_item_id uuid not null references public.content_items (id) on delete cascade,
  body_json jsonb not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- knowledge_entries -- Wissen: Ich/Marken/Fachwissen. Phase 0/Anfang
-- Phase 1: UI liest hier noch nicht, bleibt vorerst lokale Demo-Daten.
-- ---------------------------------------------------------------------
create table public.knowledge_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  scope text not null check (scope in ('user', 'brand', 'general')),
  brand_key text references public.brands (key),
  category text not null,
  content text not null,
  source text,
  valid_from date not null default current_date,
  valid_to date,
  importance text check (importance in ('low', 'medium', 'high')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- learned_memories -- Wissen -> Gelernt. Explainability-Felder aus
-- docs/04-ai-memory.md (Confidence, Evidenz, Anzahl Signale, erste
-- Beobachtung, letzte Verstärkung).
-- ---------------------------------------------------------------------
create table public.learned_memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  brand_key text references public.brands (key),
  scope text check (scope in ('user', 'brand', 'general')),
  text text not null,
  state text not null default 'observed' check (state in ('observed', 'learned', 'core', 'rejected')),
  confidence text check (confidence in ('hoch', 'mittel', 'niedrig')),
  evidence jsonb not null default '[]'::jsonb,
  evidence_count integer not null default 0,
  first_observed_at timestamptz not null default now(),
  last_reinforced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- decisions -- eigenständig gespeichert (nicht überschrieben, siehe
-- docs/01/CLAUDE.md § Historie), mit superseded_by-Verkettung.
-- ---------------------------------------------------------------------
create table public.decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  text text not null,
  reasoning text,
  validity text not null default 'active' check (validity in ('active', 'superseded', 'reversed')),
  superseded_by uuid references public.decisions (id),
  period text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- reviews -- Rückblick (Monat/Quartal/Jahr).
-- ---------------------------------------------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  period text not null check (period in ('week', 'month', 'quarter', 'year')),
  period_label text not null,
  structured_data jsonb not null default '{}'::jsonb,
  narrative text,
  reflection_answers jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- revenue_entries, acquisition_sources -- Grundlage für Rückblick-Zahlen
-- und "Akquisequelle" bei Kundenprojekten. Noch nicht ans Frontend
-- angebunden.
-- ---------------------------------------------------------------------
create table public.acquisition_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  kind text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.revenue_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  acquisition_source_id uuid references public.acquisition_sources (id) on delete set null,
  amount numeric(12, 2) not null,
  currency text not null default 'EUR',
  occurred_on date not null default current_date,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- relationships -- generische Verknüpfung zwischen beliebigen Entitäten
-- (z. B. Inbox-Eintrag -> Projekt).
-- ---------------------------------------------------------------------
create table public.relationships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  from_type text not null,
  from_id uuid not null,
  relation_type text not null,
  to_type text not null,
  to_id uuid not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- ai_interactions, ai_feedback -- Grundlage für Phase 2 (Kostenprotokoll,
-- Lernsignale aus docs/04-ai-memory.md).
-- ---------------------------------------------------------------------
create table public.ai_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  context text,
  mode text check (mode in ('auto', 'openai', 'anthropic')),
  input text,
  output text,
  tokens_used integer,
  cost numeric(10, 4),
  created_at timestamptz not null default now()
);

create table public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  ai_interaction_id uuid references public.ai_interactions (id) on delete cascade,
  feedback text not null check (feedback in ('accepted', 'rejected', 'edited')),
  note text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- updated_at-Trigger für alle Tabellen mit updated_at-Spalte
-- ---------------------------------------------------------------------
create trigger set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.content_items
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.knowledge_entries
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.learned_memories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- RLS: für jede user-scoped Tabelle Eigentümer-Policies (select/insert/
-- update/delete jeweils nur auf eigene Zeilen). `brands` hat eigene
-- Policy oben, `profiles` ebenfalls.
-- ---------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'projects', 'tasks', 'inbox_items', 'content_items', 'content_versions',
    'knowledge_entries', 'learned_memories', 'decisions', 'reviews',
    'acquisition_sources', 'revenue_entries', 'relationships',
    'ai_interactions', 'ai_feedback'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format(
      'create policy "%1$s: owner select" on public.%1$s for select using (user_id = auth.uid());', t
    );
    execute format(
      'create policy "%1$s: owner insert" on public.%1$s for insert with check (user_id = auth.uid());', t
    );
    execute format(
      'create policy "%1$s: owner update" on public.%1$s for update using (user_id = auth.uid());', t
    );
    execute format(
      'create policy "%1$s: owner delete" on public.%1$s for delete using (user_id = auth.uid());', t
    );
  end loop;
end $$;
