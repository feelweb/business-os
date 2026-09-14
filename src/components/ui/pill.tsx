import type { HTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "outline" | "neutral" | "grad";

/**
 * Bewusst nur neutrale Varianten (kein "good/warn/crit" wie im Prototyp) —
 * Zustände werden über Icon/Gewicht/Rahmenstil unterschieden, nicht über
 * Farbe (docs/05-design-system.md).
 */
export function Pill({
  variant = "outline",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold",
        variant === "outline" && "border-border text-ink",
        variant === "neutral" && "border-transparent bg-surface-2 text-ink-2",
        variant === "grad" && "grad-temp-bg border-transparent text-[var(--grad-temp-ink)]",
        className
      )}
      {...props}
    />
  );
}
