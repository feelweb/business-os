"use client";

import { useState } from "react";

import { useAppStore } from "@/lib/store/app-store";
import { classifyInboxItem } from "@/lib/ai/classify";
import { createId } from "@/lib/id";
import { createClient } from "@/lib/supabase/client";
import { insertInboxItem } from "@/lib/supabase/inbox";
import { SparkIcon } from "@/components/icons";

type Reveal =
  | { status: "thinking" }
  | { status: "done"; text: string; type: string; brand: string; potential: string }
  | null;

export function BrainDump() {
  const { addInboxItem } = useAppStore();
  const [value, setValue] = useState("");
  const [reveal, setReveal] = useState<Reveal>(null);
  const [sending, setSending] = useState(false);

  async function submit() {
    const text = value.trim();
    if (!text || sending) return;
    setValue("");
    setSending(true);
    setReveal({ status: "thinking" });

    const { brandKey, suggestion } = await classifyInboxItem(text);
    setReveal({ status: "done", text, type: suggestion.type, brand: suggestion.brand, potential: suggestion.potential });

    try {
      const supabase = createClient();
      const saved = await insertInboxItem(supabase, { kind: "idea", brandKey, text, suggestion });
      addInboxItem(saved);
    } catch (err) {
      // Speichern fehlgeschlagen (z.B. Netzwerk) -- Eintrag trotzdem lokal
      // zeigen, statt den Gedanken kommentarlos zu verlieren. Persistiert
      // dann erst beim nächsten erfolgreichen Schreibvorgang neu.
      console.error("Konnte Inbox-Eintrag nicht speichern:", err);
      addInboxItem({
        id: createId("i"),
        kind: "idea",
        brandKey,
        text,
        createdAt: new Date().toISOString(),
        suggestion,
      });
    }
    setSending(false);
  }

  return (
    <div className="mt-12.5">
      <div className="relative rounded-[22px] border border-border-soft bg-surface p-1.5 shadow-[var(--shadow-md)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-[22px] opacity-90"
          style={{
            background: "var(--grad-temp-main)",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            padding: "1.5px",
          }}
        />
        <div className="flex items-center gap-3 py-3 pl-4.5 pr-2">
          <SparkIcon className="h-[19px] w-[19px] flex-none text-ink-3" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Was ist gerade in deinem Kopf?"
            className="flex-1 border-none bg-transparent py-2 text-[16.5px] outline-none placeholder:text-ink-3"
          />
          <button
            type="button"
            disabled={sending}
            onClick={submit}
            className="grad-temp-bg flex-none rounded-[14px] px-4.5 py-2.5 text-[13.5px] font-extrabold text-[var(--grad-temp-ink)] disabled:opacity-35"
          >
            Ablegen
          </button>
        </div>
      </div>
      <p className="mt-2.5 text-center text-xs text-ink-3">
        Kein Projekt, keine Kategorie nötig — deine KI ordnet es ein.
      </p>

      {reveal && (
        <div className="reveal-in mt-3.5 rounded-[18px] border border-border-soft bg-surface-2 px-5 py-4.5">
          <div className="flex items-center gap-2 text-[12.5px] font-bold text-ink-2">
            <span className="grad-temp-bg h-2 w-2 flex-none rounded-full" />
            {reveal.status === "thinking" ? "Verstehe..." : "In die Inbox abgelegt & eingeordnet"}
          </div>
          {reveal.status === "done" && (
            <>
              <p className="mt-2.5 text-[14.5px] font-semibold">„{reveal.text}“</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12.5px] font-semibold">
                  {reveal.type}
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12.5px] font-semibold">
                  Marke: {reveal.brand}
                </span>
                <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[12.5px] font-semibold">
                  {reveal.potential}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
