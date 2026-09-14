# Business OS

Persönliches Business- und Content-Betriebssystem für Heike.

## Ziel
Das Produkt soll wie ein externes Gehirn funktionieren: Aufgaben und Projekte ordnen, Prioritäten vorschlagen, Gedanken erfassen, Content entwickeln, Markenwissen speichern, Entscheidungen dokumentieren, aus Korrekturen lernen und Entwicklung sichtbar machen.

## Marken im MVP
- feelweb
- Lodora
- RemindFuel

Konstant Architektur ist ausdrücklich nicht Bestandteil dieses Projekts.

## Zielstack
- Next.js
- React
- TypeScript
- Tailwind CSS
- später Supabase
- später OpenAI + Anthropic

`business-os.html` ist die verbindliche Referenz für Aufbau, Informationsarchitektur und Interaktionsidee.

## Status: Phase 1 (in Arbeit)

Supabase-Schema, Auth (Magic Link) und die Inbox laufen echt gegen Supabase; Projekte,
Content, Wissen und Rückblick sind noch lokale Demo-Daten.

Details: [`docs/implementation-plan.md`](docs/implementation-plan.md),
[`docs/phase-0-result.md`](docs/phase-0-result.md),
[`docs/phase-1-result.md`](docs/phase-1-result.md).

## Entwicklung

```bash
npm install
cp .env.example .env.local   # Supabase-URL + Anon-Key eintragen
npm run dev      # lokaler Dev-Server
npm run build    # Typecheck + Produktions-Build
npm run lint      # ESLint
```

Einmalig in Supabase: das Schema aus `supabase/migrations/0001_init.sql` im
SQL Editor ausführen und `http://localhost:3000/auth/callback` unter
*Authentication → URL Configuration → Redirect URLs* eintragen.
