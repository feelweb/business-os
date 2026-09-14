import type { GlanceItem } from "@/lib/types";

export const GLANCE_ITEMS: GlanceItem[] = [
  {
    key: "ansteht",
    label: "Steht an",
    value: "Kundenprojekt Peter",
    sub: "Deadline in 3 Tagen — Fr, 18. Sep",
  },
  {
    key: "status",
    label: "Wo du stehst",
    value: "1 von 9 Beiträgen live",
    sub: "Content-Fortschritt diese Woche, über alle Marken",
  },
  {
    key: "offen",
    label: "Noch offen",
    value: "5 Inbox-Einträge · 8 Ideen",
    sub: "Noch nicht eingeordnet oder umgesetzt",
  },
  {
    key: "potential",
    label: "Größtes Potential",
    value: "RemindFuel Reel fertigstellen",
    sub: "Hook steht schon — nur der Schnitt fehlt noch",
  },
];
