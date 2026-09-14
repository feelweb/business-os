import clsx from "clsx";
import { SCALE_LEVEL_DOTS, SCALE_LEVEL_LABEL } from "@/lib/format";
import type { ScaleLevel } from "@/lib/types";

/** Wirkung/Aufwand/Potential als Punkte-Skala statt Farbcode. */
export function DotScale({ level }: { level: ScaleLevel }) {
  const active = SCALE_LEVEL_DOTS[level];
  return (
    <span className="inline-flex items-center gap-[3px]" title={SCALE_LEVEL_LABEL[level]}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={clsx(
            "h-1.5 w-1.5 rounded-full",
            i < active ? "bg-ink" : "bg-border"
          )}
        />
      ))}
    </span>
  );
}
