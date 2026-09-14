# Implementation Plan — Phase 0

Dieser Plan übersetzt `business-os.html` (Prototyp) + `CLAUDE.md` + `docs/01-05` in eine
Next.js/React/TypeScript/Tailwind-App. Er wird **vor** der Implementierung geschrieben und
danach nicht rückwirkend beschönigt — Abweichungen werden in `docs/phase-0-result.md` benannt.

## 1. Analyse des Prototyps

`business-os.html` ist eine Single-File-App (Vanilla JS, `innerHTML`-Rendering, ein globales
`state`-Objekt, ein Render-Router). Funktional deckt sie exakt die sechs MVP-Bereiche ab:

- **Start**: Begrüßung, Tagescheck-Modal (Kapazität + 3 Fokusoptionen), Zusammenfassung als
  Leiste sobald erledigt, 4 Schnellüberblick-Kacheln, „Diese Woche" (Hauptfokus/Umsatzfokus/
  Wachstumsfokus + Content-Ringe pro Marke), Aufmerksamkeits-Liste, Brain-Dump-Eingabe mit
  simulierter KI-Einordnung.
- **Eingang**: Liste gespeicherter Einträge → Detail-Sheet mit „So hab ich das verstanden"
  (Typ/Marke/Verknüpfung/Potential) und drei Aktionen (Weiterdenken, Als Aufgabe, Parken).
- **Projekte**: Tabs Alle/Kundenprojekte/Eigene Projekte/Produkte/Experimente. Karten mit
  Wirkung/Aufwand/Potential (Punkte-Skala), Deadline, Energie, Aufgabenliste zum Abhaken,
  Fortschrittsbalken, bei Kundenprojekten zusätzlich Wert/Status/Akquisequelle/nächster Schritt.
- **Content**: Markenfilter, 5-Spalten-Pipeline (Ideen/Entdecken/Entwurf/Bereit/Veröffentlicht),
  Klick öffnet Workspace: Dokument links (editierbar, Textmarkierung → Popover-Aktionen),
  simulierter Chat-Assistent rechts, Schnellaktionen (Reel/Carousel/Caption/Weiterdenken).
- **Wissen**: Tabs Ich/Marken/Fachwissen/Gelernt. „Gelernt" mit Confidence-Pill, aufklappbarer
  „Warum weiß ich das?"-Box mit Evidenzliste.
- **Rückblick**: Tabs Monat/Quartal/Jahr, zeitbasierte Freischaltung (Lock-Panel vor Ablauf),
  editorialer Aufbau: große Kennzahlen, „Was du bewegt hast", „Woher dein Business kam",
  „Was du erschaffen hast", Entscheidungs-Timeline, „Wie du dich verändert hast".
- **Global**: Sidebar-Navigation (einklappbar), Floating-AI-Dock (Button + Panel, kontextabhängig
  per `state.aiContext`).

Der Prototyp verwendet zusätzlich eine zweite Farbwelt (Mint/Sky-Akzent, grün/gelb/rot für
Status/Confidence, individuelle Markenfarben für feelweb/Lodora/RemindFuel). Das widerspricht
`CLAUDE.md` („nur Weiß, Schwarz, RemindFuel-Verlauf") und wird **nicht** übernommen — siehe
Abschnitt 5.

## 2. App-Struktur (Next.js App Router)

```
src/
  app/
    layout.tsx                 Root-Layout: Fonts, ThemeProvider, AppProvider, <Shell>
    globals.css                Tailwind-Import + Design-Tokens (Light/Dark)
    page.tsx                   redirect → /start
    start/page.tsx
    eingang/page.tsx
    projekte/page.tsx
    content/page.tsx           Pipeline-Board
    content/[id]/page.tsx      Content-Workspace (Dokument + Assistent)
    wissen/page.tsx            ?tab=me|brands|knowledge|learned
    rueckblick/page.tsx        ?tab=month|quarter|year
  components/
    layout/  Sidebar, AiDock, Shell, ThemeToggle
    ui/      Card, Pill, Button, ProgressBar, DotScale, Tabs, IconBadge
    start/   DayCheckModal, GlanceGrid, WeekOverview, AttentionList, BrainDump
    inbox/   InboxList, InboxDetailSheet
    projects/ ProjectTabs, ProjectCard, TaskList
    content/ BrandTabs, StatusBoard, ContentCard, Workspace, SelectionPopover
    knowledge/ KnowledgeTabs, DetailGrid, LearnedList
    review/  ReviewTabs, BigNumbers, Timeline, LockedPanel
  lib/
    types.ts                   Alle Domain-Typen (siehe Abschnitt 4)
    data/                      Demo-Daten, eine Datei pro Entität-Gruppe
    ai/                        Simulierte KI-Funktionen mit Ziel-Signaturen (Abschnitt 6)
    store/app-store.tsx        React-Context + Reducer für den Demo-App-State
    format.ts                  kleine Format-Helfer (Datum, Prozent)
```

Routing statt zentralem `state.view`: jede Sektion ist eine echte Route, das ist idiomatischer
Next.js und macht Deep-Links/Reload pro Bereich möglich, ohne die IA zu verändern. Tab-State
innerhalb einer Sektion (Wissen, Rückblick, Projekte-Filter, Content-Marke) bleibt Client-State
bzw. Search-Param — funktional identisch zum Prototyp.

## 3. Komponenten-Zuschnitt

Ein-zu-eins-Ableitung aus den CSS-Blöcken/Funktionen des Prototyps, jede Komponente klein und
gezielt austauschbar (`CLAUDE.md`: „nicht overengineeren"). Gemeinsame Bausteine (`Card`, `Pill`,
`Button`, `ProgressBar`, `DotScale` für die Wirkung/Aufwand/Potential-Skala) wandern in `ui/`,
weil sie in mehreren Bereichen wiederverwendet werden (Projekte, Content, Wissen, Rückblick).

## 4. Demo-Datenmodelle (`lib/types.ts`, `lib/data/*`)

Die Typen sind bewusst an `docs/03-data-model.md` angelehnt (Feldnamen, Enums), damit sie in
Phase 1 möglichst 1:1 auf Supabase-Tabellen abgebildet werden können — inklusive `id`, optionaler
`createdAt`/`updatedAt`, `brandId`-Referenzen statt Farb-Strings.

| Typ | Herkunft im Prototyp | Später (Supabase) |
|---|---|---|
| `Brand` | `BRANDS` | `brands` |
| `FocusOption` | `FOCUS` | abgeleitet aus `tasks`/`projects` (AI-Vorschlag) |
| `WeekOverview` | `WEEK` | Aggregation, kein eigenes Table nötig |
| `GlanceItem` | `GLANCE` | Aggregation |
| `AttentionItem` | `ATTENTION` | Aggregation/AI-Output |
| `InboxItem` | `INBOX` inkl. `ai`-Unterobjekt | `inbox_items` |
| `Project`, `Task` | `WORK` inkl. verschachtelter `tasks[]` und optionalem `client` | `projects`, `tasks` |
| `ContentItem` | `CONTENT` | `content_items` (+ `content_versions` für den Dokumenttext) |
| `KnowledgeEntry` | `BRAND_DETAIL`, Fachwissen-Liste, „Ich"-Liste | `knowledge_entries` |
| `LearnedMemory` | `LEARNED` | `learned_memories` |
| `Review` | `REVIEW_DATA` | `reviews` |

Alle Demo-Daten liegen in `lib/data/*.ts`, reiner Daten-Export ohne UI-Import — Komponenten
importieren nur Typen + Daten, nie umgekehrt. Das ist der zentrale Austauschpunkt für Phase 1:
eine Datei wird durch einen Supabase-Query mit demselben Rückgabetyp ersetzt, die Komponente
ändert sich nicht.

## 5. Designkorrektur — konkrete Umsetzung

- **Farben**: Tailwind-Theme + CSS-Variablen kennen nur `--bg`, `--surface`, `--ink` (+ `-2`/`-3`
  Abstufungen ausschließlich über Schwarz-/Weiß-Opacity) und die Gradient-Tokens. Mint/Sky als
  eigenständige Akzentfarbe entfällt. Die Marken-Farbpunkte (feelweb/Lodora/RemindFuel) werden zu
  neutralen Kürzel-Badges (Initiale in Kreis, Schwarz/Weiß) statt Farbcodierung.
- **Statusfarben** (`good`/`warn`/`crit`, Confidence-Grün/Gelb): ersetzt durch neutrale Mittel —
  Icon-Variante (gefüllt vs. Outline), Schriftgewicht, Rahmenstil (durchgezogen/gestrichelt) und
  Position/Reihenfolge, wie in `docs/05-design-system.md` gefordert. Konkret: Aufmerksamkeits-
  Einträge sortieren nach Dringlichkeit und markieren die dringendste mit einem gefüllten statt
  outline Icon; Confidence wird als Wort + gefüllter/outline Punkt dargestellt, nicht als Farbe.
- **Gradient-Tokens**: `--grad-temp-start/-mid/-end/-main/-glow/-ink` in `globals.css`, klar als
  `TEMP` markiert (Kommentar + Namenskonvention), Wert vorerst aus dem einzigen bereits im
  Prototyp existierenden RemindFuel-Verlauf übernommen (`#cdf5eb → #9fe0e0 → #7cc8ff`), da dies
  laut Auftrag der bereits vorhandene RemindFuel-Verlauf ist und keine neue Farbe erfindet. Sobald
  finale Hex-Werte geliefert werden, ändert sich nur diese eine Stelle.
- **Dark Mode**: gleiche Tokens, Basis/Ink getauscht (Schwarz-Basis, Weiß-Text/UI), Verlauf
  bleibt identisch. Umsetzung über `next-themes` (Klassen-Strategie `light`/`dark`/`system`),
  Umschalter in der Sidebar.
- **Typografie**: DM Sans (Bold/ExtraBold) für Headlines/Nav/Zahlen wie gefordert, via
  `next/font/google`. Für „Garet" (Body/UI) gibt es keine freie/lizenzierte Quelle in dieser
  Umgebung — **temporärer Ersatz** ist eine geometrische, warme Sans („Plus Jakarta Sans", Google
  Fonts) mit klarer `TEMP_BODY_FONT`-Markierung im Code. Austausch gegen lizenziertes Garet ist
  eine reine Font-Config-Änderung.

## 6. Übernommene Funktionen (Simulation, keine echte AI)

Aus dem Prototyp übernommene JS-Logik wandert 1:1 (inhaltlich) nach `lib/ai/*.ts`, aber bereits
unter den **Ziel-Funktionsnamen** aus `CLAUDE.md` § „AI später", damit Phase 2 nur die
Implementierung tauscht, nicht die Call-Sites:

- `classifyInboxItem(text)` — ersetzt `guessCategorization()`; Keyword-Heuristik, `Promise`-Signatur
  mit künstlicher Verzögerung (wie im Prototyp `setTimeout`).
- `chatWithContext(context, message, history)` — ersetzt `aiReply()`; gleiche Wenn-Dann-Heuristik
  für Content-Workspace-Chat und den globalen AI-Dock.
- `rewriteSelection(text, mode)` — ersetzt die Selection-Popover-Aktionen (Überarbeiten/Tiefer
  denken/Konkreter).
- `generateStructured`, `createWeeklyPlan`, `createReview`, `extractLearnings`, `retrieveContext`
  — in Phase 0 als **typisierte Stubs ohne UI-Anbindung** angelegt (Signatur + Kommentar „Phase 2"),
  damit die Serviceschicht-Form von Anfang an feststeht, ohne UI zu bauen, die es noch nicht
  braucht (kein Overengineering).

Alle simulierten Antworten sind unmissverständlich als Simulation erkennbar (Kommentare im Code,
`docs/phase-0-result.md`), es gibt keinen echten Netzwerk-Call.

## 7. State-Management (Phase 0)

Ein schlanker React-Context + `useReducer` (`lib/store/app-store.tsx`) hält den Demo-App-State
(Tagescheck, Kapazität/Fokus, Inbox-Mutationen, Task-Toggles, aktive Content-Workspace-Chats,
Brain-Dump-Reveal). Das ist der 1:1-Ersatz für das globale `state`-Objekt des Prototyps. Bewusst
**kein** Zustand-/Redux-Setup — die Datenmenge ist klein, `useReducer` reicht und bleibt leicht
lesbar. Persistiert wird in Phase 0 nur die Theme-Präferenz (localStorage); alle übrigen Demo-
Daten sind bewusst flüchtig (Reload = Ausgangszustand), weil es keine echten Nutzdaten sind.

## 8. Spätere Austauschpunkte (Supabase/AI) — Zusammenfassung

| Stelle | Phase 0 | Später |
|---|---|---|
| `lib/data/*.ts` | statische Arrays/Objekte | Supabase-Queries, gleiche Rückgabetypen |
| `lib/ai/*.ts` | Heuristik + `setTimeout`-Delay | echte OpenAI/Anthropic-Calls über Serviceschicht |
| `lib/store/app-store.tsx` | In-Memory-Reducer | Reducer + Supabase-Mutations/Realtime |
| Auth | keine (immer „Heike") | Supabase Auth |
| Content-Versionen | ein Textblock im State | `content_versions`-Tabelle, Historie |
| Gradient-Tokens | `--grad-temp-*` | finale Hex-Werte, gleiche Variablennamen ohne `temp` |

## 9. Abgleich mit MVP-Scope

Alle in `docs/01-product-spec.md` genannten MVP-Bereiche (Start, Eingang, Projekte, Content,
Wissen, Rückblick) sind in Abschnitt 2–3 abgedeckt. Keine zusätzlichen Bereiche, keine Konstant-
Architektur-Inhalte, keine Datenbank/Auth/AI-Anbindung — Scope-konform für Phase 0.
