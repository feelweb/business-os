"use client";

import { useState } from "react";
import clsx from "clsx";

import { useAppStore } from "@/lib/store/app-store";
import { FOCUS_OPTIONS } from "@/lib/data/focus";
import { Button } from "@/components/ui/button";
import type { Capacity } from "@/lib/types";

const CAPACITY_OPTIONS: { key: Capacity; label: string }[] = [
  { key: "low", label: "Niedrig" },
  { key: "normal", label: "Normal" },
  { key: "high", label: "Hoch" },
];

export function DayCheck() {
  const { dailyCheckDone, capacity, focusIndex, submitDayCheck } = useAppStore();
  // `null` = kein manueller Eingriff: das Modal folgt dann einfach
  // `!dailyCheckDone` (offen, solange der Tagescheck noch aussteht — 1:1
  // das Verhalten aus dem Prototyp), ganz ohne Mount-Effekt.
  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const open = manualOpen ?? !dailyCheckDone;
  const [draftCapacity, setDraftCapacity] = useState<Capacity>(capacity);
  const [draftFocus, setDraftFocus] = useState(focusIndex);

  function openModal() {
    setDraftCapacity(capacity);
    setDraftFocus(focusIndex);
    setManualOpen(true);
  }

  function submit() {
    submitDayCheck(draftCapacity, draftFocus);
    setManualOpen(false);
  }

  return (
    <>
      {dailyCheckDone && (
        <div
          className="mt-6 flex flex-wrap items-center gap-5 rounded-[18px] border border-border-soft px-5.5 py-4"
          style={{
            background:
              "radial-gradient(120% 160% at 0% 0%, color-mix(in srgb, var(--grad-temp-start) 45%, transparent), transparent 60%), radial-gradient(120% 160% at 100% 100%, color-mix(in srgb, var(--grad-temp-end) 35%, transparent), transparent 60%), var(--surface)",
          }}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-ink-3">
              Kapazität heute
            </span>
            <span className="text-[15px] font-bold">
              {CAPACITY_OPTIONS.find((c) => c.key === capacity)?.label}
            </span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex min-w-[200px] flex-1 flex-col gap-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wide text-ink-3">
              Fokus heute · {FOCUS_OPTIONS[focusIndex].category}
            </span>
            <span className="text-[15px] font-bold">{FOCUS_OPTIONS[focusIndex].title}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={openModal}>
            Ändern
          </Button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(20,18,16,.32)] p-5 backdrop-blur-[3px]">
          <div className="modal-in relative w-full max-w-[520px] overflow-hidden rounded-[24px] border border-border-soft bg-surface p-8 shadow-[var(--shadow-lg)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-[70px] -top-[90px] h-[260px] w-[260px] rounded-full opacity-35 blur-[60px]"
              style={{ background: "var(--grad-temp-main)" }}
            />
            <div className="relative">
              <p className="text-[11.5px] font-bold uppercase tracking-wide text-ink-3">Tagescheck</p>
              <h2 className="mt-1.5 text-2xl font-bold">Wie startest du heute?</h2>
              <p className="mt-1.5 text-sm text-ink-2">
                Kurz einordnen — der Rest der Seite richtet sich danach aus.
              </p>

              <div className="mt-6">
                <p className="mb-2.5 text-[12.5px] font-bold text-ink-2">Deine Kapazität heute</p>
                <div className="flex gap-1.5 rounded-[12px] bg-surface-2 p-1.5">
                  {CAPACITY_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setDraftCapacity(opt.key)}
                      className={clsx(
                        "flex-1 rounded-[9px] px-4 py-2.5 text-[13.5px] font-bold transition-colors",
                        draftCapacity === opt.key
                          ? "bg-surface text-ink shadow-[var(--shadow-sm)]"
                          : "text-ink-3"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6.5">
                <p className="mb-2.5 text-[12.5px] font-bold text-ink-2">
                  Worauf soll dein Fokus heute liegen?
                </p>
                <div className="flex flex-col gap-2">
                  {FOCUS_OPTIONS.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setDraftFocus(i)}
                      className={clsx(
                        "flex items-start gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-colors",
                        draftFocus === i
                          ? "border-transparent shadow-[0_0_0_1.5px_var(--grad-temp-end)_inset]"
                          : "border-border-soft hover:border-ink-3"
                      )}
                      style={
                        draftFocus === i
                          ? {
                              background:
                                "radial-gradient(160% 200% at 0% 0%, color-mix(in srgb, var(--grad-temp-start) 45%, transparent), transparent 65%), radial-gradient(140% 180% at 100% 100%, color-mix(in srgb, var(--grad-temp-end) 35%, transparent), transparent 65%), var(--surface)",
                            }
                          : undefined
                      }
                    >
                      <span
                        className={clsx(
                          "relative mt-0.5 h-[18px] w-[18px] flex-none rounded-full border-[1.5px]",
                          draftFocus === i ? "border-ink" : "border-border"
                        )}
                      >
                        {draftFocus === i && (
                          <span className="grad-temp-bg absolute inset-[3px] rounded-full" />
                        )}
                      </span>
                      <span>
                        <span className="block text-[11px] font-bold uppercase tracking-wide text-ink-3">
                          {f.category}
                        </span>
                        <span className="mt-0.5 block text-[14.5px] font-bold">{f.title}</span>
                        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-2">
                          {f.why}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="primary" className="mt-6.5 w-full justify-center py-3.5 text-[14.5px]" onClick={submit}>
                Los geht&apos;s →
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
