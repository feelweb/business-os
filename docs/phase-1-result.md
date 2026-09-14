# Phase 1 — Zwischenstand (Supabase-Grundlagen + Auth + Inbox)

Phase 1 laut `CLAUDE.md` umfasst „Supabase, Auth, Persistenz" insgesamt — das ist zu groß für
einen Schritt. Dieser Durchgang liefert die komplette Infrastruktur plus einen ersten
End-to-End-Vertical-Slice (Inbox), auf dessen Muster die restlichen Entitäten folgen.

## Gebaut

- **Supabase-Anbindung**: `@supabase/supabase-js` + `@supabase/ssr`, Browser-Client
  (`lib/supabase/client.ts`) und Server-Client (`lib/supabase/server.ts`), beide nur mit dem
  öffentlichen Anon-Key — kein Secret im Code oder im Browser.
- **Vollständiges DB-Schema** für alle Entitäten aus `docs/03-data-model.md`
  (`supabase/migrations/0001_init.sql`): `profiles`, `brands`, `projects`, `tasks`,
  `inbox_items`, `content_items`, `content_versions`, `knowledge_entries`,
  `learned_memories`, `decisions`, `reviews`, `revenue_entries`, `acquisition_sources`,
  `relationships`, `ai_interactions`, `ai_feedback` — jede Tabelle mit Row-Level-Security
  (nur eigene Zeilen sichtbar/änderbar), `brands` als globale Referenzdaten für alle
  eingeloggten Nutzer:innen.
- **Auth**: Magic-Link-Login (`/login`, passwortlos), Callback-Route
  (`/auth/callback`), Session-Refresh + Routenschutz über `middleware.ts` (alles außer
  `/login` verlangt eine Session), Abmelden-Button in der Sidebar.
- **Routing umgebaut**: die sechs App-Bereiche liegen jetzt unter der Route-Gruppe
  `(app)` mit eigenem Layout (`AppStoreProvider` + `Shell`), damit `/login` ganz ohne
  Sidebar/AI-Dock auskommt. Root-Layout ist auf Fonts + Theme reduziert.
- **Erster echter Datenzugriff — Inbox**: `lib/supabase/inbox.ts` (Lesen/Schreiben/
  Soft-Delete über `archived_at`). `(app)/layout.tsx` lädt die Inbox server-seitig und
  reicht sie als Startzustand an den Client-Store (`AppStoreProvider` nimmt jetzt
  `initialInbox` statt der harten Demo-Liste). Brain Dump legt neue Gedanken in Supabase
  ab, die drei Eingang-Aktionen (Weiterdenken/Als Aufgabe/Parken) archivieren den
  Eintrag dort statt ihn nur lokal zu entfernen.

## Noch auf lokalen Demo-Daten (bewusst, siehe unten)

Projekte/Aufgaben, Content, Wissen, Rückblick laufen weiterhin über `lib/data/*.ts` — das
Schema dafür existiert bereits in der Migration, die Anbindung ans Frontend folgt in
weiteren Schritten nach demselben Muster wie bei der Inbox (Repository-Modul unter
`lib/supabase/*`, Server Component lädt initial, Mutationen laufen über den Browser-Client).

## Wichtiger Befund: Live-Verbindung von hier aus nicht testbar

Diese Sandbox-Umgebung lässt ausgehende HTTPS-Verbindungen nur zu einer festen
Allowlist zu (u. a. npm, GitHub, Anthropic-APIs) — **`*.supabase.co` ist darin nicht
enthalten**. Der Versuch, den Magic-Link-Login gegen dein echtes Projekt zu testen, wurde
vom Egress-Proxy dieser Umgebung mit `403 (policy denial)` blockiert — das ist eine
Netzwerk-Policy dieser Sandbox, kein Fehler im Code oder an deinen Zugangsdaten.

Geprüft werden konnte von hier aus:

- Typecheck, Lint, Build: alle sauber.
- Middleware-Schutz: `/start` ohne Session liefert korrekt `307` → `/login?next=/start`.
- `/login` rendert ohne Console-Errors (bis zum eigentlichen Netzwerk-Call an Supabase).

**Nicht geprüft werden konnte**: ob der Magic-Link-Versand, der Callback-Tausch und die
Inbox-Queries gegen dein echtes Projekt tatsächlich funktionieren. Das kannst du (oder ich
in einer Umgebung mit normalem Internetzugriff) mit `npm run dev` + Browser-Aufruf von
`http://localhost:3000/login` direkt verifizieren.

## Bevor der Login bei dir funktioniert — zwei Dinge in Supabase nachtragen

1. **Schema anlegen**: `supabase/migrations/0001_init.sql` im Supabase-Dashboard unter
   *SQL Editor* einfügen und ausführen (einmalig). Braucht Projekt-Owner-Rechte, die der
   Anon-Key absichtlich nicht hat.
2. **Redirect-URL erlauben**: unter *Authentication → URL Configuration → Redirect URLs*
   `http://localhost:3000/auth/callback` eintragen (für lokale Tests) und später die
   Produktions-URL ergänzen, sobald die App deployed ist.

## Nächste Schritte

1. Login lokal/in einer Umgebung mit Internetzugriff end-to-end verifizieren.
2. Projekte/Aufgaben nach demselben Muster wie die Inbox an Supabase anbinden
   (`lib/supabase/projects.ts`, inkl. Task-Toggle als Mutation).
3. Danach Content, Wissen, Rückblick — jeweils gleiches Muster.
4. `lib/data/*.ts` für die dann migrierten Entitäten auf reine Referenz-/Seed-Daten
   reduzieren (so wie jetzt schon bei `lib/data/inbox.ts` markiert).
