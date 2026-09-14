import type { AttentionItem } from "@/lib/types";

/**
 * Reihenfolge = Dringlichkeit. Statt Farbe (rot/gelb) markiert die UI die
 * kritischste Zeile über ein gefülltes statt Outline-Icon — siehe
 * docs/05-design-system.md ("Zustände über Icon, Gewicht ... darstellen").
 */
export const ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "a0",
    level: "critical",
    text: "Kundenprojekt <b>Peter</b> hat in 3 Tagen Deadline — der letzte Feinschliff fehlt noch.",
  },
  {
    id: "a1",
    level: "warn",
    text: "Du hast <b>8 Content-Ideen</b> gesammelt, aber diese Woche erst einen Beitrag fertiggestellt.",
  },
  {
    id: "a2",
    level: "warn",
    text: "<b>RemindFuel</b> ist seit 6 Tagen still — deine Audience dort reagiert normalerweise stark auf Regelmäßigkeit.",
  },
];
