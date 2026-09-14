/**
 * Monotoner In-Memory-Zähler statt `Date.now()`/`Math.random()` direkt im
 * Komponenten-Code — vermeidet impure Calls im Render-/Handler-Pfad
 * (react-hooks/purity) und reicht für rein lokale Demo-IDs in Phase 0.
 */
let counter = 0;

export function createId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
