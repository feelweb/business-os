/**
 * PHASE 0 — bewusst NICHT an die UI angebunden.
 *
 * Diese Funktionen legen nur die Ziel-Form der provider-neutralen
 * Serviceschicht aus `CLAUDE.md` § "AI später" fest, damit die Architektur
 * für Phase 2 feststeht, ohne für Phase 0 unnötige UI zu bauen (kein
 * Overengineering). Jede Funktion wirft aktuell absichtlich einen Fehler,
 * falls sie versehentlich aufgerufen wird.
 *
 * Modi (Phase 2): "auto" | "openai" | "anthropic" — OpenAI bevorzugt für
 * Strategie/Priorisierung/Planung/Reviews, Anthropic für Content und
 * kreatives Sparring (siehe CLAUDE.md).
 */

export type AiMode = "auto" | "openai" | "anthropic";

function notImplemented(name: string): never {
  throw new Error(
    `${name} ist eine Phase-2-Funktion (echte AI-Anbindung) und in Phase 0 nicht implementiert.`
  );
}

export async function generateStructured<T>(_prompt: string, _mode: AiMode = "auto"): Promise<T> {
  return notImplemented("generateStructured");
}

export async function createWeeklyPlan(_context: unknown): Promise<never> {
  return notImplemented("createWeeklyPlan");
}

export async function createReview(_periodContext: unknown): Promise<never> {
  return notImplemented("createReview");
}

export async function extractLearnings(_recentActivity: unknown): Promise<never> {
  return notImplemented("extractLearnings");
}

export async function retrieveContext(_query: string): Promise<never> {
  return notImplemented("retrieveContext");
}

export async function rewriteSelection(
  _text: string,
  _mode: "rewrite" | "deeper" | "concrete"
): Promise<never> {
  // Phase 0 nutzt stattdessen `selectionActionReply` in `lib/ai/chat.ts`
  // (rein simulierte Chat-Antwort, kein echter Text-Rewrite).
  return notImplemented("rewriteSelection");
}
