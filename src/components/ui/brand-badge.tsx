import clsx from "clsx";
import { BRANDS } from "@/lib/data/brands";
import type { BrandKey } from "@/lib/types";

/**
 * Ersetzt die farbigen Marken-Punkte des Prototyps: neutrales
 * Initialen-Badge (Schwarz/Weiß) statt Farbcodierung pro Marke.
 */
export function BrandBadge({
  brandKey,
  size = "sm",
}: {
  brandKey: BrandKey;
  size?: "sm" | "md";
}) {
  const brand = BRANDS[brandKey];
  return (
    <span
      className={clsx(
        "inline-flex flex-none items-center justify-center rounded-full border border-border font-display font-bold text-ink",
        size === "sm" ? "h-5 w-5 text-[10px]" : "h-7 w-7 text-xs"
      )}
      title={brand.name}
    >
      {brand.initial}
    </span>
  );
}
