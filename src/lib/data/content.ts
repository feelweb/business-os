import type { ContentItem } from "@/lib/types";

const FIELD_BODY = `Manchmal reicht ein kleiner Perspektivwechsel. Du musst nicht jeden Tag wachsen, um vorwärtszukommen.

Manche der wichtigsten Schritte sehen von außen aus wie Stillstand.`;

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "c1",
    brandKey: "feelweb",
    stage: "ideas",
    title: 'Warum "professionell" nicht gleich "steif" bedeutet',
    meta: "Idee · noch offen",
    body: FIELD_BODY,
  },
  {
    id: "c2",
    brandKey: "feelweb",
    stage: "ideas",
    title: "Was ein 0€ Website-Planer wirklich bringt",
    meta: "Idee · noch offen",
    body: FIELD_BODY,
  },
  {
    id: "c3",
    brandKey: "feelweb",
    stage: "explore",
    title: "Hinter den Kulissen: Business OS Prototyp",
    meta: "Entdecken · Richtung gesucht",
    body: FIELD_BODY,
  },
  {
    id: "c4",
    brandKey: "feelweb",
    stage: "draft",
    title: "Carousel: 5 Zeichen, dass deine Website dich ausbremst",
    meta: "Entwurf · 3 von 6 Slides",
    body: FIELD_BODY,
  },
  {
    id: "c5",
    brandKey: "feelweb",
    stage: "ready",
    title: "Reel: Der teuerste Website-Fehler",
    meta: "Bereit · Veröffentlichung offen",
    body: FIELD_BODY,
  },
  {
    id: "c6",
    brandKey: "feelweb",
    stage: "published",
    title: "Carousel: Weniger ist mehr — auch auf deiner Website",
    meta: "Veröffentlicht · Mo",
    body: FIELD_BODY,
  },
  {
    id: "c7",
    brandKey: "lodora",
    stage: "ideas",
    title: "Sonntagsbrief statt klassischem Newsletter",
    meta: "Idee · noch offen",
    body: FIELD_BODY,
  },
  {
    id: "c8",
    brandKey: "lodora",
    stage: "explore",
    title: "Was Lodora eigentlich von anderen Marken unterscheidet",
    meta: "Entdecken",
    body: FIELD_BODY,
  },
  {
    id: "c9",
    brandKey: "remindfuel",
    stage: "draft",
    title: "Perspektivwechsel: „Du musst nicht jeden Tag wachsen“",
    meta: "Entwurf · wird zu Reel",
    body: FIELD_BODY,
    isCurrentFocus: true,
  },
  {
    id: "c10",
    brandKey: "remindfuel",
    stage: "ideas",
    title: "Minddrop zu Selbstvertrauen ohne Vergleich",
    meta: "Idee · noch offen",
    body: FIELD_BODY,
  },
  {
    id: "c11",
    brandKey: "remindfuel",
    stage: "ideas",
    title: "Warum Pausen produktiv sind",
    meta: "Idee · noch offen",
    body: FIELD_BODY,
  },
  {
    id: "c12",
    brandKey: "remindfuel",
    stage: "ready",
    title: "Carousel: 3 Zeichen von Selbstüberforderung",
    meta: "Bereit",
    body: FIELD_BODY,
  },
  {
    id: "c13",
    brandKey: "remindfuel",
    stage: "published",
    title: "Minddrop: Ruhe ist auch ein Ergebnis",
    meta: "Veröffentlicht · Fr",
    body: FIELD_BODY,
  },
];

export const CONTENT_STAGES: { key: ContentItem["stage"]; label: string }[] = [
  { key: "ideas", label: "Ideen" },
  { key: "explore", label: "Entdecken" },
  { key: "draft", label: "Entwurf" },
  { key: "ready", label: "Bereit" },
  { key: "published", label: "Veröffentlicht" },
];
