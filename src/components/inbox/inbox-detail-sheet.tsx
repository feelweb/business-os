"use client";

import { useAppStore } from "@/lib/store/app-store";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { archiveInboxItem } from "@/lib/supabase/inbox";
import type { InboxItem } from "@/lib/types";

export function InboxDetailSheet({
  item,
  onClose,
}: {
  item: InboxItem;
  onClose: () => void;
}) {
  const { removeInboxItem } = useAppStore();

  function act() {
    // Optimistisch: sofort aus der Liste, Archivierung läuft im Hintergrund
    // nach (soft delete über archived_at, siehe lib/supabase/inbox.ts).
    removeInboxItem(item.id);
    onClose();
    const supabase = createClient();
    archiveInboxItem(supabase, item.id).catch((err) =>
      console.error("Konnte Inbox-Eintrag nicht archivieren:", err)
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-end bg-[rgba(30,24,17,.38)] backdrop-blur-[2px]"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="sheet-in h-full w-[min(480px,92vw)] overflow-y-auto bg-surface px-7.5 py-7.5 shadow-[var(--shadow-lg)]">
        <button
          type="button"
          onClick={onClose}
          className="float-right border-none bg-none text-lg text-ink-3"
        >
          ✕
        </button>
        <h3 className="mb-3.5 text-sm font-bold text-ink-3">Gedanke</h3>
        <p className="clear-both mb-5.5 mt-2.5 font-display text-[19px] font-semibold leading-relaxed">
          „{item.text}“
        </p>

        <div className="rounded-2xl border border-border-soft bg-surface-2 px-5 py-4.5">
          <div className="mb-3 flex items-center gap-2 text-[12.5px] font-bold text-ink-2">
            <span className="grad-temp-bg h-2 w-2 flex-none rounded-full" />
            Ich habe das so verstanden:
          </div>
          {[
            ["Typ", item.suggestion.type],
            ["Marke", item.suggestion.brand],
            ["Verknüpft mit", item.suggestion.linkedTo],
            ["Potential", item.suggestion.potential],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="flex justify-between gap-2.5 py-2 text-[13.5px]"
              style={i > 0 ? { borderTop: "1px solid var(--border-soft)" } : undefined}
            >
              <span className="font-semibold text-ink-3">{k}</span>
              <span className="text-right font-bold">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-5.5 flex flex-wrap gap-2">
          <Button variant="primary" onClick={act}>
            Weiterdenken
          </Button>
          <Button onClick={act}>Als Aufgabe</Button>
          <Button variant="ghost" onClick={act}>
            Parken
          </Button>
        </div>
      </div>
    </div>
  );
}
