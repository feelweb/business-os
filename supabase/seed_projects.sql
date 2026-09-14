-- Startdaten für "Projekte" -- dieselben Beispielprojekte wie im Prototyp/
-- Phase 0, damit die Projekte-Seite nach dem Umstieg auf Supabase sofort
-- nutzbar ist. Zum Bearbeiten/Löschen später direkt in Supabase oder sobald
-- es eine Bearbeiten-Ansicht gibt.
--
-- WICHTIG: erst ausführen, nachdem du dich mindestens einmal erfolgreich
-- per Magic Link eingeloggt hast (sonst gibt es noch keine auth.users-Zeile
-- für deine E-Mail, und die Projekte könnten keinem Account zugeordnet
-- werden).
--
-- Falls du dich mit einer anderen Adresse als office@feelweb.de eingeloggt
-- hast: unten in jedem "select id from auth.users where email = '...'"
-- die Adresse anpassen (einfaches Suchen & Ersetzen).
--
-- Ausführen wie die Migrationen: Supabase Dashboard -> SQL Editor -> Run.

-- w1: Website Content Planner
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    'feelweb', 'own', 'Website Content Planner', 'Eigenes Produkt · feelweb',
    'high', 'medium', 'high', null, 'fokus'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Grobkonzept stehen', true, 0),
  ('Preismodell festlegen', true, 1),
  ('Landingpage-Text schreiben', false, 2),
  ('Testphase mit 2 Kundinnen planen', false, 3)
) as t(text, done, position);

-- w2: Business OS
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    'feelweb', 'own', 'Business OS', 'Internes Tool · feelweb',
    'high', 'high', 'medium', null, 'fokus'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Grundstruktur definieren', true, 0),
  ('Home-Bereich gestalten', true, 1),
  ('Projekte-Ansicht überarbeiten', false, 2),
  ('Mit echten Daten testen', false, 3)
) as t(text, done, position);

-- w3: Kickstart your Website
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    'feelweb', 'own', 'Kickstart your Website', 'Kurs · feelweb',
    'high', 'high', 'high', 'Launch Okt', 'fokus'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Module 1–3 Skript fertig', true, 0),
  ('Modul 4 Skript schreiben', false, 1),
  ('Videos aufnehmen', false, 2),
  ('Landingpage bauen', false, 3)
) as t(text, done, position);

-- w4: Cozy YouTube Experiment
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    null, 'experiments', 'Cozy YouTube Experiment', 'Experiment · privat',
    'low', 'low', 'unclear', null, 'leicht'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Kanal-Konzept skizzieren', true, 0),
  ('Erstes Video planen', false, 1)
) as t(text, done, position);

-- w5: Living Boutique Hotel (Kundenprojekt)
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy,
     client_value, client_status, client_source, client_next_step, client_content_potential)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    null, 'client', 'Living Boutique Hotel', 'Kundenprojekt · Website',
    'high', 'high', 'high', '2. Okt', 'fokus',
    '3.200 €', 'In Umsetzung', 'Empfehlung von Peter', 'Startseite final abstimmen', 'high'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Kickoff & Fotos gesichtet', true, 0),
  ('Startseite entworfen', true, 1),
  ('Startseite final abstimmen', false, 2),
  ('Unterseiten aufbauen', false, 3)
) as t(text, done, position);

-- w6: Peter — Coaching-Website (Kundenprojekt)
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy,
     client_value, client_status, client_source, client_next_step, client_content_potential)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    null, 'client', 'Peter — Coaching-Website', 'Kundenprojekt · Relaunch',
    'high', 'low', 'medium', '18. Sep', 'leicht',
    '1.450 €', 'Letzter Feinschliff', 'Bestandskunde', 'Texte auf Startseite freigeben lassen', 'medium'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Struktur final', true, 0),
  ('Texte geschrieben', true, 1),
  ('Design final', true, 2),
  ('Texte von Peter freigeben lassen', false, 3)
) as t(text, done, position);

-- w7: 0€ Website Planer
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    'feelweb', 'products', '0€ Website Planer', 'Vorprodukt · feelweb',
    'medium', 'low', 'high', null, 'leicht'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Struktur-Vorlage entworfen', true, 0),
  ('Moodboard-Teil bauen', false, 1),
  ('Landingpage schreiben', false, 2)
) as t(text, done, position);

-- w8: Lead-Magnet Quiz
with proj as (
  insert into public.projects
    (user_id, brand_key, category, title, subtitle, impact, effort, potential, deadline, energy)
  values (
    (select id from auth.users where email = 'office@feelweb.de'),
    null, 'products', 'Lead-Magnet Quiz', 'Tool · Lovable-Kurs',
    'medium', 'medium', 'medium', null, 'fokus'
  )
  returning id
)
insert into public.tasks (user_id, project_id, text, done, position)
select (select id from auth.users where email = 'office@feelweb.de'), proj.id, t.text, t.done, t.position
from proj, (values
  ('Fragen entworfen', true, 0),
  ('Ergebnis-Typen geschrieben', false, 1),
  ('Technisch umsetzen', false, 2)
) as t(text, done, position);
