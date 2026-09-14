import type { ReviewPeriod, ScaleLevel } from "@/lib/types";

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("de-DE", { day: "numeric", month: "long" });
}

export interface ReviewAvailability {
  unlocked: boolean;
  unlockDate: Date;
}

/**
 * Ein Rückblick soll erst Abstand zum Zeitraum haben, bevor er ehrlich sein
 * kann — er schaltet sich daher erst in der letzten Woche des Zeitraums frei
 * (Jahresrückblick: ab Dezember, "vor Weihnachten"). 1:1 aus dem Prototyp
 * übernommen.
 */
export function reviewAvailability(now: Date = new Date()): Record<ReviewPeriod, ReviewAvailability> {
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const dim = daysInMonth(y, m);
  const monthUnlockDate = new Date(y, m, dim - 6);
  const monthUnlocked = d >= dim - 6;

  const quarterEndMonths = [2, 5, 8, 11];
  const quarterEndMonth = quarterEndMonths[Math.floor(m / 3)];
  const qDim = daysInMonth(y, quarterEndMonth);
  const quarterUnlockDate = new Date(y, quarterEndMonth, qDim - 6);
  const quarterUnlocked = m === quarterEndMonth && d >= qDim - 6;

  const yearUnlockDate = new Date(y, 11, 1);
  const yearUnlocked = m === 11;

  return {
    month: { unlocked: monthUnlocked, unlockDate: monthUnlockDate },
    quarter: { unlocked: quarterUnlocked, unlockDate: quarterUnlockDate },
    year: { unlocked: yearUnlocked, unlockDate: yearUnlockDate },
  };
}

export const SCALE_LEVEL_DOTS: Record<ScaleLevel, number> = {
  low: 1,
  medium: 2,
  high: 3,
  unclear: 1,
};

export const SCALE_LEVEL_LABEL: Record<ScaleLevel, string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Hoch",
  unclear: "Unklar",
};
