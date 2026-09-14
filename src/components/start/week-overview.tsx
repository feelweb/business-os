"use client";

import { WEEK_OVERVIEW } from "@/lib/data/week";
import { BRANDS } from "@/lib/data/brands";
import { ContentIcon } from "@/components/icons";
import { Pill } from "@/components/ui/pill";
import { useAppStore } from "@/lib/store/app-store";
import { FOCUS_OPTIONS } from "@/lib/data/focus";

export function WeekOverviewSection() {
  return (
    <>
      <div className="mb-4 mt-11 flex items-baseline justify-between">
        <h2 className="text-[19px] font-bold">Diese Woche</h2>
        <span className="text-xs text-ink-3">auf einen Blick</span>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-4.5 rounded-[20px] border border-border-soft px-6.5 py-5.5"
        style={{
          background:
            "radial-gradient(140% 180% at 0% 0%, color-mix(in srgb, var(--grad-temp-start) 45%, transparent), transparent 60%), radial-gradient(120% 160% at 100% 100%, color-mix(in srgb, var(--grad-temp-end) 35%, transparent), transparent 60%), var(--surface)",
        }}
      >
        <div>
          <div className="font-display text-[clamp(30px,4vw,42px)] font-extrabold leading-none">
            {WEEK_OVERVIEW.deadlineDays} Tage
          </div>
          <div className="mt-1.5 text-[13px] font-semibold text-ink-2">
            bis zur nächsten Deadline — {WEEK_OVERVIEW.deadlineWhat}
          </div>
        </div>
        <Pill variant="grad">{WEEK_OVERVIEW.deadlineDate}</Pill>
      </div>

      <WeekTiles />
    </>
  );
}

function WeekTiles() {
  const { focusIndex } = useAppStore();
  const mainFocusMatches = FOCUS_OPTIONS[focusIndex]?.title === WEEK_OVERVIEW.mainFocusTitle;
  const revenueFocusMatches = FOCUS_OPTIONS[focusIndex]?.title === WEEK_OVERVIEW.revenueFocusTitle;

  const tiles = [
    { label: "Hauptfokus", value: WEEK_OVERVIEW.mainFocusTitle, isFocus: mainFocusMatches },
    { label: "Umsatzfokus", value: WEEK_OVERVIEW.revenueFocusTitle, isFocus: revenueFocusMatches },
    { label: "Wachstumsfokus", value: WEEK_OVERVIEW.growthFocusTitle, isFocus: false },
  ];

  return (
    <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="relative min-h-[96px] rounded-2xl border border-border-soft bg-surface px-4.5 py-4.5"
          style={tile.isFocus ? { boxShadow: "0 0 0 1.5px var(--grad-temp-end) inset" } : undefined}
        >
          {tile.isFocus && (
            <span className="grad-temp-bg absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[var(--grad-temp-ink)]">
              Dein Fokus
            </span>
          )}
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-3">
            <span className="h-2 w-2 flex-none rounded-full bg-ink" />
            {tile.label}
          </div>
          <div className="mt-2.5 text-[14.5px] font-bold leading-snug">{tile.value}</div>
        </div>
      ))}

      <div className="min-h-[96px] rounded-2xl border border-border-soft bg-surface px-4.5 py-4.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-3">
          <ContentIcon className="h-[13px] w-[13px]" />
          Contentfortschritt
        </div>
        <div className="mt-2.5 flex items-center gap-3.5">
          {Object.entries(WEEK_OVERVIEW.contentProgressByBrand).map(([key, value]) => {
            const pct = Math.round((value ?? 0) * 100);
            return (
              <div key={key} className="flex flex-col items-center">
                <div
                  className="relative flex h-[46px] w-[46px] items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(from -90deg, var(--ink) ${pct}%, var(--surface-2) 0)`,
                  }}
                >
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-surface">
                    <span className="font-display text-[10.5px] font-extrabold">{pct}%</span>
                  </div>
                </div>
                <div className="mt-1 text-[10.5px] font-bold text-ink-3">{BRANDS[key as keyof typeof BRANDS].name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
