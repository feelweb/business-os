/**
 * PHASE 0 — SIMULATION, KEINE ECHTE KI.
 *
 * Ziel-Signatur für Phase 2: `chatWithContext(context, message, history)`.
 * `context` ist aktuell nur ein Label (aktiver Bereich/Content-Titel) — in
 * Phase 2 wird daraus der echte Kontext-Layer aus `docs/04-ai-memory.md`
 * (User-Kontext, aktive Marke, aktuelles Objekt, relevante Memories).
 */
export async function chatWithContext(
  context: string,
  message: string
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  const t = message.toLowerCase();
  if (t.includes("kitsch")) {
    return "Verstanden — ich nehme die weichen Formulierungen raus und mache den Ton nüchterner. Einen Moment.";
  }
  if (t.includes("tiefer")) {
    return "Guter Impuls. Was wäre, wenn wir nicht nur sagen *dass* Stillstand okay ist, sondern zeigen, *woran man ihn im Alltag erkennt*? Das macht es greifbarer.";
  }
  if (t.includes("konkret")) {
    return "Ich ersetze den Einstieg durch ein konkretes Bild statt der allgemeinen Aussage — das passt besser zu deinem Stil.";
  }
  if (t.includes("perspektive")) {
    return "Hier drei: 1) Stillstand als Erholung fürs Nervensystem. 2) Stillstand als Zeichen, dass du gerade neu kalibrierst. 3) Stillstand, den nur du siehst — von außen wirkt es oft wie Fortschritt.";
  }
  return `Ich denk das weiter (bezogen auf „${context}") und melde mich mit einer überarbeiteten Version.`;
}

const QUICK_ACTION_REPLIES: Record<string, string> = {
  reel: "Ich forme daraus ein Reel-Skript mit Hook, Mitte und Call-to-Action.",
  carousel: "Ich baue daraus ein 5-Slide-Carousel im RemindFuel-Stil.",
  caption: "Ich schreibe eine passende Caption dazu.",
  think: "Lass uns den Gedanken gemeinsam weiterspinnen — was fehlt deiner Meinung nach noch?",
};

export function quickActionReply(action: keyof typeof QUICK_ACTION_REPLIES): string {
  return QUICK_ACTION_REPLIES[action];
}

const SELECTION_ACTION_REPLIES: Record<string, string> = {
  rewrite: "Ich habe die markierte Stelle überarbeitet — schau sie dir gleich im Dokument an.",
  deeper: "Ich vertiefe genau diesen Gedanken.",
  concrete: "Ich mache diese Stelle konkreter.",
};

export function selectionActionReply(action: keyof typeof SELECTION_ACTION_REPLIES): string {
  return SELECTION_ACTION_REPLIES[action];
}
