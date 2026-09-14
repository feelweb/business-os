"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store/app-store";
import type { InboxItem } from "@/lib/types";
import { InboxDetailSheet } from "@/components/inbox/inbox-detail-sheet";

const KIND_LABEL: Record<InboxItem["kind"], string> = {
  idea: "Idee",
  link: "Link",
  task: "Aufgabe",
  thought: "Gedanke",
};

export function InboxList() {
  const { inbox } = useAppStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = inbox.find((i) => i.id === activeId) ?? null;

  return (
    <>
      <div className="pb-2">
        <h1 className="text-[32px] font-bold">Eingang</h1>
        <p className="mt-2 text-[16.5px] text-ink-2">
          Alles, was noch keinen Platz hat. {inbox.length} offene Einträge.
        </p>
      </div>

      <div className="mt-1.5 flex flex-col gap-2.5">
        {inbox.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border px-5 py-8 text-center text-sm text-ink-3">
            Eingang ist leer — schön aufgeräumt.
          </div>
        )}
        {inbox.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className="flex items-center gap-3.5 rounded-[14px] border border-border-soft bg-surface px-4.5 py-4 text-left transition-transform hover:translate-x-0.5 hover:border-ink-3"
          >
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-3">
              {KIND_LABEL[item.kind]}
            </span>
            <span className="flex-1 text-[14.5px] font-semibold">{item.text}</span>
            <span className="flex-none text-xs text-ink-3">{item.suggestion.brand}</span>
          </button>
        ))}
      </div>

      {activeItem && (
        <InboxDetailSheet item={activeItem} onClose={() => setActiveId(null)} />
      )}
    </>
  );
}
