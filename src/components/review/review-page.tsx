"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { GlowPanel } from "@/components/review/glow-panel";
import { LockIcon } from "@/components/icons";
import { REVIEWS } from "@/lib/data/reviews";
import { formatDate, reviewAvailability } from "@/lib/format";
import type { ReviewPeriod } from "@/lib/types";

const TABS: { key: ReviewPeriod; label: string }[] = [
  { key: "month", label: "Monat" },
  { key: "quarter", label: "Quartal" },
  { key: "year", label: "Jahr" },
];

const PERIOD_LABEL: Record<ReviewPeriod, string> = {
  month: "Monats",
  quarter: "Quartals",
  year: "Jahres",
};

export function ReviewPage() {
  const [tab, setTab] = useState<ReviewPeriod>("month");
  const availability = reviewAvailability();
  const current = availability[tab];

  return (
    <div>
      <Tabs
        items={TABS.map((t) => ({
          ...t,
          icon: !availability[t.key].unlocked ? <LockIcon className="h-3 w-3" /> : undefined,
        }))}
        active={tab}
        onChange={setTab}
      />
      {current.unlocked ? (
        <ReviewContent period={tab} />
      ) : (
        <ReviewLocked period={tab} unlockDate={current.unlockDate} />
      )}
    </div>
  );
}

function ReviewLocked({ period, unlockDate }: { period: ReviewPeriod; unlockDate: Date }) {
  const diffDays = Math.max(1, Math.ceil((unlockDate.getTime() - new Date().getTime()) / 86400000));
  return (
    <>
      <div className="pb-2.5 pt-7.5">
        <p className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--grad-temp-ink)]">
          Rückblick
        </p>
        <h1 className="mt-2 text-4xl font-bold">Noch nicht bereit</h1>
      </div>
      <GlowPanel>
        <span className="inline-flex h-[30px] w-[30px] items-center justify-center opacity-90">
          <LockIcon className="h-[30px] w-[30px] text-white" />
        </span>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-white/85">
          Dein {PERIOD_LABEL[period]}-Rückblick braucht noch etwas Abstand, um ehrlich zu sein — er
          schaltet sich automatisch frei, sobald{" "}
          {period === "year" ? "das Jahr sich dem Ende zuneigt" : "der Zeitraum fast vorbei ist"}.
        </p>
        <p className="mt-4 text-[13.5px] opacity-85">
          Verfügbar ab <b>{formatDate(unlockDate)}</b> — noch {diffDays} {diffDays === 1 ? "Tag" : "Tage"}.
        </p>
      </GlowPanel>
    </>
  );
}

function ReviewContent({ period }: { period: ReviewPeriod }) {
  const data = REVIEWS[period];
  return (
    <>
      <div className="pb-2.5 pt-7.5">
        <p className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--grad-temp-ink)]">
          Rückblick
        </p>
        <h1 className="grad-temp-text mt-2 text-[clamp(34px,5vw,58px)] font-extrabold tracking-tight">
          {data.periodLabel}
        </h1>
      </div>

      <div className="my-8.5 grid grid-cols-2 border-y border-border-soft md:grid-cols-5">
        {data.numbers.map((n, i) => (
          <div
            key={n.label}
            className="px-5 py-6"
            style={i < data.numbers.length - 1 ? { borderRight: "1px solid var(--border-soft)" } : undefined}
          >
            <div className="font-display text-[clamp(24px,2.6vw,34px)] font-extrabold tabular-nums">
              {n.value}
            </div>
            <div className="mt-1.5 text-xs font-semibold text-ink-3">{n.label}</div>
          </div>
        ))}
      </div>

      <ReviewSection title="Was du bewegt hast">
        <div className="grid gap-3.5 md:grid-cols-3">
          {data.moved.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-soft bg-surface-2 px-5 py-4.5 text-sm leading-relaxed text-ink-2 [&>b]:font-bold [&>b]:text-ink"
              dangerouslySetInnerHTML={{ __html: t }}
            />
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Woher dein Business kam">
        <GlowPanel>
          <p
            className="max-w-[60ch] text-[15px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.whereFrom }}
          />
        </GlowPanel>
      </ReviewSection>

      <ReviewSection title="Was du erschaffen hast">
        <div className="grid gap-3.5 md:grid-cols-3">
          {data.created.map((t, i) => (
            <div key={i} className="rounded-2xl border border-border-soft bg-surface-2 px-5 py-4.5 text-sm leading-relaxed text-ink-2">
              {t}
            </div>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Wichtige Entscheidungen">
        <div className="flex flex-col">
          {data.decisions.map((d, i) => (
            <div key={i} className="grid grid-cols-[90px_20px_1fr]">
              <div className="py-3.5 text-[12.5px] font-bold text-ink-3">{d.date}</div>
              <div className="flex flex-col items-center">
                <span className="mt-[18px] h-[9px] w-[9px] flex-none rounded-full bg-ink" />
                {i < data.decisions.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="py-3 pl-4.5 text-sm text-ink-2 [&>b]:font-bold [&>b]:text-ink" dangerouslySetInnerHTML={{ __html: d.text }} />
            </div>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title="Wie du dich verändert hast">
        <GlowPanel>
          <p
            className="max-w-[62ch] text-[15px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.changed }}
          />
        </GlowPanel>
      </ReviewSection>
    </>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border-soft py-11">
      <h2 className="mb-4.5 text-2xl font-extrabold">{title}</h2>
      {children}
    </div>
  );
}
