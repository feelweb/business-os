import type { BrandKnowledge, KnowledgeEntry } from "@/lib/types";

export const ME_KNOWLEDGE: KnowledgeEntry[] = [
  { key: "Persönlichkeit", value: "INFJ-T, introvertiert, hochsensibel" },
  {
    key: "Hintergrund",
    value: "Mental Coaching, Innenarchitektur, Webdesign",
  },
  {
    key: "Arbeitsweise",
    value: "Fokusblöcke am Vormittag, braucht Ruhe für tiefe Arbeit",
  },
  {
    key: "Werte",
    value:
      "Sinnhafte, menschenzentrierte Arbeit vor schnellem Wachstum",
  },
];

export const BRAND_KNOWLEDGE: Record<string, BrandKnowledge> = {
  feelweb: {
    brandKey: "feelweb",
    entries: [
      {
        key: "Identität",
        value:
          "Web- & Brand-Designstudio für Frauen in der (Teilzeit-)Selbstständigkeit.",
      },
      {
        key: "Zielgruppe",
        value:
          "Selbstständige Frauen, die eine Website wollen, die zu ihnen passt — ohne Tech-Overwhelm.",
      },
      {
        key: "Angebote",
        value: "Website-Design, Kickstart-Kurs, Wartung, Content-Begleitung.",
      },
      {
        key: "Perspektive",
        value: "Weniger ist mehr — Klarheit schlägt Vollständigkeit.",
      },
      { key: "Stimme", value: "Locker, emotional, empathisch, nie belehrend." },
      {
        key: "Content",
        value: "Carousels, Reels, Einzelposts rund um Website & Sichtbarkeit.",
      },
      {
        key: "Beispiele",
        value: "„Weniger ist mehr — auch auf deiner Website“",
      },
      {
        key: "No-Gos",
        value: "Keine Buzzwords, kein Fachchinesisch ohne Erklärung.",
      },
    ],
  },
  lodora: {
    brandKey: "lodora",
    entries: [
      {
        key: "Identität",
        value: "Ruhige, hochwertige Marke — Positionierung noch in Entwicklung.",
      },
      { key: "Zielgruppe", value: "Noch nicht final geschärft." },
      { key: "Angebote", value: "Wird aktuell definiert." },
      { key: "Perspektive", value: "Stille statt Lautstärke." },
      { key: "Stimme", value: "Zurückhaltend, warm." },
      { key: "Content", value: "Noch wenig — Sonntagsbrief in Planung." },
      { key: "Beispiele", value: "—" },
      { key: "No-Gos", value: "Kein lautes Marketing-Vokabular." },
    ],
  },
  remindfuel: {
    brandKey: "remindfuel",
    entries: [
      {
        key: "Identität",
        value: "Anti-Hustle-Mindset-Marke — Minddrops & Perspektivwechsel.",
      },
      {
        key: "Zielgruppe",
        value: "Menschen, die aus dem Leistungsdruck aussteigen wollen.",
      },
      {
        key: "Angebote",
        value: "Instagram-Content, langfristig ein Kartendeck (Minddrop).",
      },
      { key: "Perspektive", value: "Ruhe ist auch ein Ergebnis." },
      { key: "Stimme", value: "Direkt, tief, nie kitschig." },
      { key: "Content", value: "Minddrops, Reels, Carousels." },
      { key: "Beispiele", value: "„Du musst nicht jeden Tag wachsen.“" },
      {
        key: "No-Gos",
        value: "Keine Kitsch-Formulierungen, keine leeren Superlative.",
      },
    ],
  },
};

export const FACHWISSEN: KnowledgeEntry[] = [
  {
    key: "SEO",
    value:
      "Google bewertet mittlerweile deutlich menschlicher — Substanz schlägt Keyword-Dichte.",
  },
  {
    key: "Website-Struktur",
    value: "Klare Sitemap vor Design — sonst wird später alles teurer.",
  },
  {
    key: "Content-Rhythmus",
    value:
      "Regelmäßigkeit schlägt Perfektion, besonders bei RemindFuel.",
  },
  {
    key: "Kundenarbeit",
    value:
      "Klare nächste Schritte verhindern die meisten Verzögerungen.",
  },
];
