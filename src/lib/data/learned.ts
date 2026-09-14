import type { LearnedMemory } from "@/lib/types";

export const LEARNED_MEMORIES: LearnedMemory[] = [
  {
    id: "l0",
    text: 'Heike bevorzugt konkrete Aussagen gegenüber abstrakten Formulierungen wie „fühlt sich nach dir an".',
    confidence: "hoch",
    evidence: [
      'Korrektur in RemindFuel-Reel „Mut“ (2. Sep): „zu vage — konkreter machen"',
      "Korrektur in feelweb-Carousel (28. Aug): abstrakte Zeile ersetzt durch konkretes Beispiel",
    ],
  },
  {
    id: "l1",
    text: 'Bei feelweb-Content bevorzugt Heike kurze Sätze und vermeidet Konstruktionen wie „nicht nur X, sondern Y".',
    confidence: "hoch",
    evidence: [
      "Wiederholte Anmerkung in 4 Content-Reviews seit August",
      "Explizite Regel im Brand-Voice-Dokument feelweb",
    ],
  },
  {
    id: "l2",
    text: "Kundenprojekte mit klarer Deadline bearbeitet Heike bevorzugt am Vormittag.",
    confidence: "mittel",
    evidence: [
      "Zeitpunkt abgeschlossener Aufgaben der letzten 3 Wochen: 6 von 8 vor 12 Uhr",
    ],
  },
  {
    id: "l3",
    text: 'Heike lässt Ideen mit unklarem Umsatzbezug gerne erstmal „parken" statt sie sofort zu verwerfen.',
    confidence: "mittel",
    evidence: [
      "Inbox-Verhalten: 5 der letzten 12 Einträge wurden geparkt statt gelöscht",
    ],
  },
];
