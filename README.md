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

## Status: Phase 0

Aktuell lauffähig als reines Frontend mit lokalen Demo-Daten, Light/Dark Mode, ohne Datenbank, Auth oder echte AI-Calls.

Details: [`docs/implementation-plan.md`](docs/implementation-plan.md) und [`docs/phase-0-result.md`](docs/phase-0-result.md).

## Entwicklung

```bash
npm install
npm run dev      # lokaler Dev-Server
npm run build    # Typecheck + Produktions-Build
npm run lint      # ESLint
```
