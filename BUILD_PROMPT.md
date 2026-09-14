# Erster Auftrag für Claude Code

Lies zuerst vollständig:
1. `CLAUDE.md`
2. `business-os.html`
3. alle Dateien unter `docs/`

Baue NICHT sofort das komplette finale System. Arbeite nur an Phase 0.

## Aufgabe
Baue aus `business-os.html` eine echte, sauber strukturierte Next.js-Anwendung mit React, TypeScript und Tailwind CSS.

Der Prototyp ist die verbindliche visuelle, funktionale und UX-seitige Referenz.

### Phase 0
Lokal lauffähige Web-App mit lokalen Demo-Daten, Light Mode und Dark Mode.

Noch keine Datenbank, Supabase-Verbindung, Authentifizierung, OpenAI API, Anthropic API, Automationen oder Deployment-Abhängigkeiten.

## Vor dem Coden
1. Analysiere den Prototyp.
2. Erstelle `docs/implementation-plan.md`.
3. Beschreibe App-Struktur, Komponenten, Demo-Datenmodelle, übernommene Funktionen und spätere Austauschpunkte für Supabase/AI.
4. Prüfe gegen den MVP-Scope.
5. Implementiere dann Phase 0.

## Funktionen
Start: Begrüßung, Tagescheck, Kapazität, 3 Fokusoptionen, Wochenfokus, Schnellüberblick, Aufmerksamkeit, Brain Dump.

Eingang: gespeicherte Einträge, Detailansicht, vorgeschlagene Einordnung, Weiterdenken, Als Aufgabe, Parken.

Projekte: Alle, Kundenprojekte, Eigene Projekte, Produkte, Experimente. Projektkarten mit Status, Deadline, Aufgaben, Fortschritt, Potential, Aufwand/Energie und Akquisequelle bei Kundenprojekten.

Content: Markenfilter, Pipeline, Content öffnen, Dokument links, kontextueller Assistent rechts, Textmarkierung und lokal simulierte Aktionen. Noch keine echte AI.

Wissen: Ich, Marken, Fachwissen, Gelernt. Bei Gelernt: Confidence, Warum weiß ich das?, Evidenz.

Rückblick: Monat, Quartal, Jahr, editorialer Aufbau, große Kennzahlen, Timeline, Entscheidungen und Entwicklung.

## Designkorrektur
Der aktuelle Prototyp enthält zusätzliche Farben. Nicht übernehmen.
Final nur Weiß, Schwarz und RemindFuel-Verlauf. Keine roten/gelben/grünen Statusfarben.

Dark Mode ergänzen: Schwarz als Basis, Weiß als UI/Text, derselbe Verlauf. Neutrale Abstufungen nur über Transparenz.

Gradient zentral tokenisieren. Solange finale Werte fehlen, klar markierte temporäre Tokens verwenden.

## Daten
Demo-Daten getrennt von UI-Komponenten ablegen. Typen so vorbereiten, dass sie später aus Supabase kommen können.

## Abschluss
Typecheck, Lint und Build ausführen. Offensichtliche Console Errors beseitigen.
Danach `docs/phase-0-result.md` erstellen: gebaut, simuliert, bewusst nicht angeschlossen, Abweichungen, nächste Schritte.
