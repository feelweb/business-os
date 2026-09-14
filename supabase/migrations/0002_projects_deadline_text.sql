-- Korrektur: `deadline` war als `date` angelegt, die UI zeigt Deadlines aber
-- als freien Text an ("18. Sep", "Launch Okt", ...) statt als echtes Datum.
-- Ausführen wie 0001_init.sql: Supabase Dashboard -> SQL Editor -> Run.
-- (Tabelle ist zu diesem Zeitpunkt noch leer, daher unkritisch.)

alter table public.projects
  alter column deadline type text using deadline::text;
