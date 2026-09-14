import clsx from "clsx";
import { ATTENTION_ITEMS } from "@/lib/data/attention";
import { AlertIcon } from "@/components/icons";

/**
 * Statt rot/gelb (Prototyp) markiert nur das gefüllte Icon + höhere Deckkraft
 * die dringendste Zeile — Zustände über Gewicht/Opacity, nicht Farbe.
 */
export function AttentionList() {
  return (
    <>
      <div className="mb-4 mt-11">
        <h2 className="text-[19px] font-bold">Was noch offen ist</h2>
      </div>
      <div className="flex flex-col gap-2.5">
        {ATTENTION_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-[14px] border border-border-soft bg-surface-2 px-4.5 py-4"
          >
            <AlertIcon
              className={clsx(
                "mt-0.5 h-[18px] w-[18px] flex-none",
                item.level === "critical" ? "text-ink opacity-100" : "text-ink-3 opacity-80"
              )}
              fill={item.level === "critical" ? "currentColor" : "none"}
            />
            <div
              className={clsx(
                "text-sm leading-relaxed [&>b]:font-extrabold",
                item.level === "critical" ? "font-semibold" : "font-medium"
              )}
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
