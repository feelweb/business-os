import clsx from "clsx";
import { GLANCE_ITEMS } from "@/lib/data/glance";
import { ReviewIcon, HomeIcon, InboxIcon, SparkIcon } from "@/components/icons";

const ICON_BY_KEY = {
  ansteht: ReviewIcon,
  status: HomeIcon,
  offen: InboxIcon,
  potential: SparkIcon,
};

export function GlanceGrid() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      {GLANCE_ITEMS.map((item) => {
        const Icon = ICON_BY_KEY[item.key];
        const isPotential = item.key === "potential";
        return (
          <div
            key={item.key}
            className={clsx(
              "flex min-h-[104px] flex-col gap-2 rounded-2xl border px-4.5 py-4.5",
              isPotential ? "border-transparent" : "border-border-soft bg-surface"
            )}
            style={
              isPotential
                ? {
                    background:
                      "radial-gradient(140% 160% at 100% 0%, color-mix(in srgb, var(--grad-temp-start) 45%, transparent), transparent 60%), radial-gradient(120% 140% at 0% 100%, color-mix(in srgb, var(--grad-temp-end) 35%, transparent), transparent 60%), var(--surface)",
                  }
                : undefined
            }
          >
            <div
              className={clsx(
                "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide",
                isPotential ? "text-[var(--grad-temp-ink)]" : "text-ink-3"
              )}
            >
              <Icon className="h-[13px] w-[13px] flex-none" />
              {item.label}
            </div>
            <div className="text-[14.5px] font-bold leading-snug">{item.value}</div>
            <div className="text-xs text-ink-2">{item.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
