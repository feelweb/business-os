"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { BrandTabs } from "@/components/content/brand-tabs";
import { ME_KNOWLEDGE, BRAND_KNOWLEDGE, FACHWISSEN } from "@/lib/data/knowledge";
import { LEARNED_MEMORIES } from "@/lib/data/learned";
import { ChevronIcon } from "@/components/icons";
import type { BrandKey, KnowledgeEntry } from "@/lib/types";

type Tab = "me" | "brands" | "knowledge" | "learned";

const TABS: { key: Tab; label: string }[] = [
  { key: "me", label: "Ich" },
  { key: "brands", label: "Marken" },
  { key: "knowledge", label: "Fachwissen" },
  { key: "learned", label: "Gelernt" },
];

function DetailGrid({ entries }: { entries: KnowledgeEntry[] }) {
  return (
    <div className="mt-5.5 grid gap-3.5 md:grid-cols-2">
      {entries.map((entry) => (
        <div key={entry.key} className="rounded-2xl border border-border-soft bg-surface px-5 py-4.5">
          <div className="mb-2 text-[11.5px] font-bold uppercase tracking-wide text-ink-3">
            {entry.key}
          </div>
          <div className="text-sm leading-relaxed text-ink-2">{entry.value}</div>
        </div>
      ))}
    </div>
  );
}

function LearnedList() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-3">
      {LEARNED_MEMORIES.map((memory) => (
        <div key={memory.id} className="rounded-2xl border border-border-soft bg-surface px-5 py-4.5">
          <div className="flex items-start justify-between gap-3.5">
            <p className="max-w-[60ch] text-[14.5px] font-semibold leading-relaxed">{memory.text}</p>
            <span className="flex flex-none items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-bold">
              <span
                className={
                  memory.confidence === "hoch"
                    ? "h-1.5 w-1.5 rounded-full bg-ink"
                    : "h-1.5 w-1.5 rounded-full border border-ink"
                }
              />
              Sicherheit: {memory.confidence === "hoch" ? "Hoch" : "Mittel"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpenId(openId === memory.id ? null : memory.id)}
            className="mt-3 inline-flex items-center gap-1 border-none bg-none p-0 text-[12.5px] font-bold text-ink-3"
          >
            Warum weiß ich das?
            <ChevronIcon
              className="h-[13px] w-[13px] transition-transform"
              style={{ transform: openId === memory.id ? "rotate(90deg)" : undefined }}
            />
          </button>
          {openId === memory.id && (
            <div className="mt-3.5 border-t border-border-soft pt-3.5 text-[13px] text-ink-2">
              {memory.evidence.map((e, i) => (
                <div key={i} className="flex gap-2 py-2">
                  — {e}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function KnowledgePage() {
  const [tab, setTab] = useState<Tab>("brands");
  const [brand, setBrand] = useState<BrandKey>("feelweb");

  return (
    <div>
      <div className="pb-2">
        <h1 className="text-[32px] font-bold">Wissen</h1>
        <p className="mt-2 text-[16.5px] text-ink-2">
          Alles, was deine KI über dich, deine Marken und dein Wissen gesammelt hat.
        </p>
      </div>

      <div className="mt-6">
        <Tabs items={TABS} active={tab} onChange={setTab} />
      </div>

      {tab === "me" && <DetailGrid entries={ME_KNOWLEDGE} />}
      {tab === "brands" && (
        <>
          <BrandTabs active={brand} onChange={setBrand} />
          <DetailGrid entries={BRAND_KNOWLEDGE[brand].entries} />
        </>
      )}
      {tab === "knowledge" && <DetailGrid entries={FACHWISSEN} />}
      {tab === "learned" && <LearnedList />}
    </div>
  );
}
