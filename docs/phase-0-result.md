# Phase 0 — Ergebnis

## Gebaut

Next.js (App Router) + React + TypeScript + Tailwind CSS v4, lauffähig mit lokalen
Demo-Daten, ohne Backend. Alle sechs MVP-Bereiche aus `CLAUDE.md` sind als echte Routen
umgesetzt, funktional 1:1 am Prototyp (`business-os.html`) orientiert:

- `/start` — Begrüßung, Tagescheck-Modal (Kapazität + 3 Fokusoptionen, öffnet automatisch
  beim ersten Besuch), Zusammenfassungsleiste danach, 4 Schnellüberblick-Kacheln,
  „Diese Woche" (Hauptfokus/Umsatzfokus/Wachstumsfokus, Deadline-Hero, Content-Ringe pro
  Marke), Aufmerksamkeits-Liste, Brain-Dump mit simulierter Einordnung.
- `/eingang` — Liste + Detail-Sheet mit „So hab ich das verstanden" und den drei Aktionen
  (Weiterdenken/Als Aufgabe/Parken).
- `/projekte` — 5 Tabs (Alle/Kundenprojekte/Eigene Projekte/Produkte/Experimente),
  Projektkarten mit Wirkung/Aufwand/Potential (Punkte-Skala statt Farbe), Deadline, Energie,
  abhakbaren Aufgaben, Fortschrittsbalken, Kundenprojekt-Zusatzinfos (Wert/Status/Quelle/
  nächster Schritt).
- `/content` + `/content/[id]` — Markenfilter, 5-Spalten-Pipeline, Workspace mit editierbarem
  Dokument links (Textmarkierung → Popover mit Überarbeiten/Tiefer denken/Konkreter),
  simuliertem Chat-Assistenten rechts, 4 Schnellaktionen.
- `/wissen` — Tabs Ich/Marken/Fachwissen/Gelernt; „Gelernt" mit Confidence-Anzeige und
  aufklappbarer „Warum weiß ich das?"-Evidenzliste.
- `/rueckblick` — Tabs Monat/Quartal/Jahr mit zeitbasierter Freischaltung (Lock-Panel +
  Countdown), editorialer Aufbau: große Kennzahlen, „Was du bewegt hast", „Woher dein
  Business kam", „Was du erschaffen hast", Entscheidungs-Timeline, „Wie du dich verändert
  hast".
- Global: einklappbare Sidebar-Navigation, Floating-AI-Dock (kontextabhängig über die
  aktuelle Route), Light/Dark/System-Theme-Umschalter.

Details zu Struktur, Komponenten und Datenmodellen: [`docs/implementation-plan.md`](implementation-plan.md).

## Simuliert (keine echte AI)

- `classifyInboxItem` (Brain-Dump- und Eingang-Einordnung) — Keyword-Heuristik mit
  künstlicher Verzögerung, ersetzt `guessCategorization()` aus dem Prototyp.
- `chatWithContext` (Content-Workspace-Chat + globaler AI-Dock) — Wenn-Dann-Heuristik,
  ersetzt `aiReply()`.
- Schnellaktionen im Content-Workspace (Reel/Carousel/Caption/Weiterdenken) und die
  Textmarkierungs-Popover-Aktionen (Überarbeiten/Tiefer denken/Konkreter) — feste, vorab
  formulierte Antworten, kein echter Text-Rewrite.

Alle drei Stellen sind im Code (`lib/ai/*.ts`) explizit als „PHASE 0 — SIMULATION, KEINE
ECHTE KI" markiert.

## Bewusst nicht angeschlossen

- Keine Datenbank/Supabase — alle Daten liegen in `lib/data/*.ts`, State lebt nur im
  Browser-Speicher (React-Context), Reload setzt auf die Demo-Daten zurück.
- Keine Authentifizierung — die App geht immer von „Heike" als einziger Nutzerin aus.
- Keine echten AI-Calls (OpenAI/Anthropic) — siehe oben.
- Keine Automationen (Wochen-/Monats-/Quartals-/Jahres-Jobs).
- Keine Deployment-Konfiguration über das reine `next build`/`next start` hinaus.
- `lib/ai/future-stubs.ts` enthält die Ziel-Funktionssignaturen für Phase 2
  (`generateStructured`, `createWeeklyPlan`, `createReview`, `extractLearnings`,
  `retrieveContext`, `rewriteSelection`), aber ohne UI-Anbindung und ohne Implementierung
  (wirft absichtlich einen Fehler bei Aufruf) — das hält die künftige Serviceschicht-Form
  fest, ohne für Phase 0 unnötige UI zu bauen.

## Abweichungen vom Prototyp (bewusst, laut Auftrag)

- **Farben**: Mint/Sky-Akzentfarbe und individuelle Markenfarben (feelweb/Lodora/
  RemindFuel) sind entfernt. Marken werden über neutrale Initialen-Badges (Schwarz/Weiß)
  unterschieden statt über Farbe.
- **Statusfarben**: `good`/`warn`/`crit`-Grün/Gelb/Rot und die grün/gelb hinterlegte
  Confidence-Pille sind entfernt. Zustände laufen über Icon-Füllung, Schriftgewicht und
  Position (dringendster Eintrag zuerst, gefülltes statt Outline-Icon).
- **Gradient-Tokens**: `--grad-temp-*` in `src/app/globals.css`, klar als temporär markiert.
  Wert = der einzige im Prototyp bereits vorhandene RemindFuel-Verlauf
  (`#cdf5eb → #9fe0e0 → #7cc8ff`) — keine neu erfundene Farbe. Austausch gegen finale
  Werte ist eine Änderung an genau dieser einen Stelle.
- **Dark Mode**: im Prototyp nicht vorhanden (er war bewusst Single-Theme), hier über
  `next-themes` ergänzt (Light/Dark/System), gleiche Tokens mit getauschter Basis/Ink,
  identischer Verlauf — wie von `CLAUDE.md` gefordert.
- **Typografie**: DM Sans wie gefordert. „Garet" (Body/UI) ist ein kommerzieller Font ohne
  freie Quelle in dieser Umgebung — temporärer Ersatz ist „Plus Jakarta Sans" (Google
  Fonts), im Code klar als `TEMP_BODY_FONT` markiert. Austausch ist eine reine
  Font-Config-Änderung in `src/app/layout.tsx` + `globals.css`.
- **Routing statt Einzel-State**: jeder Bereich ist eine echte Next.js-Route statt eines
  globalen `state.view`-Switches — funktional identisch, aber Deep-Links/Reload pro Bereich
  funktionieren zusätzlich.
- **State-Persistenz**: nur die Theme-Präferenz wird persistiert (localStorage, über
  next-themes). Tagescheck, Inbox-Mutationen, Task-Toggles etc. sind bewusst flüchtig
  (Reload = Ausgangszustand), weil es Demo-Daten ohne echten Inhalt sind.

## Qualitätssicherung

- `npx tsc --noEmit` — 0 Fehler.
- `npm run lint` (ESLint inkl. `eslint-config-next` + React-Hooks-Regeln) — 0 Fehler,
  0 Warnungen.
- `npm run build` (`next build`) — erfolgreich, alle Routen statisch vorgerendert bis auf
  `/content/[id]` (dynamisch, da parametrisiert).
- Manueller Smoke-Test aller Routen per Playwright (Chromium) inkl. Tagescheck-Abschluss
  und Dark-Mode-Umschaltung: keine Console-Errors, keine Console-Warnings, keine
  Hydration-Mismatches.

## Nächste Schritte (Phase 1+)

1. Supabase-Projekt aufsetzen, Schema aus `docs/03-data-model.md` anlegen.
2. `lib/data/*.ts` einzeln durch Supabase-Queries ersetzen (gleiche Rückgabetypen aus
   `lib/types.ts` beibehalten, damit Komponenten unverändert bleiben).
3. Supabase Auth einführen (aktuell keine Nutzerverwaltung).
4. `lib/ai/*.ts` gegen eine echte provider-neutrale Serviceschicht tauschen
   (OpenAI/Anthropic, Modi auto/openai/anthropic wie in `CLAUDE.md`), `lib/ai/future-stubs.ts`
   dabei implementieren und an die UI anbinden.
5. Finale Hex-Werte für den RemindFuel-Verlauf einpflegen (nur `globals.css` betroffen).
6. Lizenziertes „Garet" einbinden und `Plus Jakarta Sans` ersetzen.
7. Memory-/Lern-Mechanik (`docs/04-ai-memory.md`) und Entscheidungs-Historie (`valid_from`/
   `valid_to`/`superseded_by`) auf echten Daten aufbauen.
