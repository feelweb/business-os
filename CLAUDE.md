# CLAUDE.md – permanente Projektregeln

## Produkt
Dieses Projekt ist Heikes persönliches Business OS. Es ist kein CRM, kein Notion-Klon und kein klassisches Projektmanagement-Tool.

Leitfrage für jede Funktion: Reduziert sie, wie viel Heike selbst erinnern, sortieren, priorisieren oder durchdenken muss?

## Referenz
`business-os.html` ist die aktuelle visuelle und funktionale Referenz. Navigation, Seitenlogik, Tagescheck, Brain Dump, Eingang, Projekte, Content Workspace, Wissen, Rückblicke und kontextuelle KI sind die verbindliche Ausgangsbasis.

Technische Neuimplementierung ist erlaubt. UX und Informationsarchitektur nicht eigenmächtig neu erfinden.

## Design
Finales Farbsystem ausschließlich:
- Light Mode: Weiß + Schwarz + RemindFuel-Verlauf
- Dark Mode: Schwarz + Weiß + RemindFuel-Verlauf

Nicht verwenden: Braun, Beige, Grün, Blau, Rot, Gelb oder andere eigenständige Akzentfarben. Grautöne nur als Schwarz/Weiß mit Transparenz.

Der bestehende Prototyp enthält zusätzliche Status- und Markenfarben. Diese im echten Build entfernen.

RemindFuel-Verlauf als zentrale Design-Tokens anlegen. Keine finalen Hexwerte erfinden, solange sie nicht ausdrücklich geliefert wurden.

Typo:
- Headlines/Navigation/Zahlen: DM Sans Bold
- Body/UI: Garet
- keine Serifenschrift

Stil: extrem modern, hochwertig, kreativ, ruhig, editorial, AI-Produkt, Second Brain. Keine Kartenwüste und kein generisches SaaS-Dashboard.

## Navigation
- Start
- Eingang
- Projekte
- Content
- Wissen
- Rückblick

KI ist kein eigener Navigationspunkt, sondern kontextuell integriert.

## Marken
Nur feelweb, Lodora und RemindFuel. Konstant Architektur ausschließen.

## Entwicklungsphasen
Phase 0: Frontend mit lokalen Demo-Daten, Light/Dark Mode, keine DB und keine echten AI Calls.
Phase 1: Supabase, Auth, Persistenz.
Phase 2: OpenAI + Anthropic über provider-neutrale Serviceschicht.
Phase 3: Memory/Learning, Entscheidungen, Evidenz, Validitätszeiträume.
Phase 4: Wochen-/Monats-/Quartals-/Jahres-Automationen.

## Technik
Next.js App Router, React, TypeScript, Tailwind CSS. Komponenten klar und leicht veränderbar halten. Nicht overengineeren.

## AI später
Provider-neutral vorbereiten, z. B. `generateStructured`, `chatWithContext`, `rewriteSelection`, `classifyInboxItem`, `createWeeklyPlan`, `createReview`, `extractLearnings`, `retrieveContext`.

OpenAI bevorzugt für Strategie, Priorisierung, Opportunity-Analyse, Planung und Reviews. Anthropic bevorzugt für Content, kreatives Sparring und Textarbeit. Modi: auto/openai/anthropic.

## Memory
Das Produkt lernt über externe persistente Daten, nicht durch Modelltraining. States: observed, learned, core, rejected. Jeder Memory-Eintrag soll später erklären können, warum er gilt.

## Historie
Wichtige Änderungen nicht überschreiben. Später `valid_from`, `valid_to`, `superseded_by` nutzen.

## Sicherheit
API-Keys nie im Browser, Secrets nur serverseitig, keine Secrets committen, AI-Kosten protokollierbar halten, Rohdaten und Content-Versionen erhalten.
