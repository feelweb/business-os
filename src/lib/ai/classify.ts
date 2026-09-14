import type { BrandKey, InboxSuggestion } from "@/lib/types";

/**
 * PHASE 0 — SIMULATION, KEINE ECHTE KI.
 *
 * Ziel-Signatur für Phase 2 (`CLAUDE.md` § "AI später"): `classifyInboxItem`.
 * Ersetzt in Phase 2 die Keyword-Heuristik unten durch einen echten Call an
 * die provider-neutrale Serviceschicht (OpenAI/Anthropic je nach Modus). Die
 * Rückgabeform bleibt gleich, damit UI-Komponenten unverändert bleiben.
 */
export async function classifyInboxItem(text: string): Promise<{
  brandKey: BrandKey;
  suggestion: InboxSuggestion;
}> {
  // Künstliche Verzögerung wie im Prototyp (setTimeout), damit sich die
  // "Verstehe..."-Zwischenanimation in der UI wie ein echter Call anfühlt.
  await new Promise((resolve) => setTimeout(resolve, 700));

  const t = text.toLowerCase();

  if (t.includes("remindfuel") || t.includes("reel") || t.includes("minddrop")) {
    return {
      brandKey: "remindfuel",
      suggestion: {
        type: "Content-Idee",
        brand: "RemindFuel",
        linkedTo: "Content-Planung",
        potential: "Sichtbarkeit",
        suggestedAction: "Weiterdenken",
      },
    };
  }
  if (t.includes("lodora")) {
    return {
      brandKey: "lodora",
      suggestion: {
        type: "Idee",
        brand: "Lodora",
        linkedTo: "Lodora",
        potential: "Unklar",
        suggestedAction: "Weiterdenken",
      },
    };
  }
  if (t.includes("kunde") || t.includes("projekt") || t.includes("rechnung")) {
    return {
      brandKey: "feelweb",
      suggestion: {
        type: "Aufgabe",
        brand: "feelweb",
        linkedTo: "Kundenarbeit",
        potential: "Umsatzrelevant",
        suggestedAction: "Als Aufgabe",
      },
    };
  }
  return {
    brandKey: "feelweb",
    suggestion: {
      type: "Gedanke",
      brand: "feelweb",
      linkedTo: "Noch offen",
      potential: "Wird geprüft",
      suggestedAction: "Weiterdenken",
    },
  };
}
