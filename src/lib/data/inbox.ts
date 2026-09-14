import type { InboxItem } from "@/lib/types";

export const INITIAL_INBOX: InboxItem[] = [
  {
    id: "i1",
    kind: "idea",
    brandKey: "feelweb",
    createdAt: "2026-09-10",
    text: "Vielleicht aus dem Website Content Planner später eine günstigere Version nur für die Sitemap machen.",
    suggestion: {
      type: "Produktidee",
      brand: "feelweb",
      linkedTo: "Website Content Planner",
      potential: "Hoch — passt zur 0€-Planer-Zielgruppe",
      suggestedAction: "Weiterdenken",
    },
  },
  {
    id: "i2",
    kind: "link",
    brandKey: "remindfuel",
    createdAt: "2026-09-11",
    text: "Reel-Format von @slow.mornings gesehen — Textaufbau könnte für Minddrops funktionieren.",
    suggestion: {
      type: "Format-Inspiration",
      brand: "RemindFuel",
      linkedTo: "Reel-Produktion",
      potential: "Mittel — als Vorlage testen",
      suggestedAction: "Als Aufgabe",
    },
  },
  {
    id: "i3",
    kind: "task",
    brandKey: "feelweb",
    createdAt: "2026-09-12",
    text: "Rechnung an Uta noch stellen, Wartung September ist fertig.",
    suggestion: {
      type: "Erledigung",
      brand: "feelweb",
      linkedTo: "Uta Ortwein — Wartung",
      potential: "Direkt umsetzbar",
      suggestedAction: "Als Aufgabe",
    },
  },
  {
    id: "i4",
    kind: "idea",
    brandKey: "lodora",
    createdAt: "2026-09-12",
    text: "Lodora könnte einen ruhigen „Sonntagsbrief“ bekommen, statt normalem Newsletter.",
    suggestion: {
      type: "Content-Idee",
      brand: "Lodora",
      linkedTo: "Newsletter-Konzept",
      potential: "Noch unklar — braucht mehr Gedanken",
      suggestedAction: "Weiterdenken",
    },
  },
  {
    id: "i5",
    kind: "thought",
    brandKey: null,
    createdAt: "2026-09-13",
    text: "Bin ich zu sehr im Umsetzen und zu wenig im Positionieren gerade?",
    suggestion: {
      type: "Reflexion",
      brand: "—",
      linkedTo: "Businessstrategie",
      potential: "Kein Umsatzbezug — trotzdem wichtig",
      suggestedAction: "Parken",
    },
  },
];
