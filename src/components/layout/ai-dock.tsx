"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { navLabelForPath } from "@/lib/nav";
import { useAppStore } from "@/lib/store/app-store";
import { chatWithContext } from "@/lib/ai/chat";
import { createId } from "@/lib/id";
import { SendIcon } from "@/components/icons";

/**
 * Floating-AI-Dock, kontextabhängig über die aktuelle Route statt über ein
 * globales `state.aiContext`-Feld wie im Prototyp — Next.js-Routing liefert
 * den Kontext bereits "for free" über `usePathname`.
 */
export function AiDock() {
  const pathname = usePathname();
  const contextLabel = navLabelForPath(pathname);
  const { aiPanelOpen, aiPanelLog, toggleAiPanel, addAiPanelMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  async function send() {
    const value = input.trim();
    if (!value || pending) return;
    addAiPanelMessage({ id: createId("u"), who: "user", text: value });
    setInput("");
    setPending(true);
    const reply = await chatWithContext(contextLabel, value);
    addAiPanelMessage({ id: createId("ai"), who: "ai", text: `Auf ${contextLabel} bezogen: ${reply}` });
    setPending(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleAiPanel}
        title="KI fragen"
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-border-soft bg-surface shadow-[var(--shadow-lg)]"
      >
        <span className="pulse-core grad-temp-bg h-[26px] w-[26px] rounded-full" />
      </button>

      {aiPanelOpen && (
        <div className="sheet-in fixed bottom-24 right-6 z-[70] flex max-h-[60vh] w-[340px] flex-col overflow-hidden rounded-[20px] border border-border-soft bg-surface shadow-[var(--shadow-lg)]">
          <div className="flex items-center gap-2 border-b border-border-soft px-4.5 py-3.5 text-[13px] font-bold text-ink-2">
            <span className="grad-temp-bg h-2 w-2 flex-none rounded-full" />
            KI-Assistent · <span>{contextLabel}</span>
          </div>
          <div className="scroll-thin flex flex-1 flex-col gap-3 overflow-y-auto px-4.5 py-4">
            {aiPanelLog.map((m) => (
              <div
                key={m.id}
                className={
                  m.who === "user"
                    ? "self-end rounded-[12px_12px_3px_12px] border border-border-soft bg-surface-2 px-3 py-2.5 text-[13.5px] leading-normal"
                    : "text-[13.5px] leading-normal"
                }
              >
                {m.text}
              </div>
            ))}
            {pending && (
              <span className="flex gap-1">
                <span className="typing-dot h-[5px] w-[5px] rounded-full bg-ink-3" />
                <span className="typing-dot h-[5px] w-[5px] rounded-full bg-ink-3" style={{ animationDelay: "150ms" }} />
                <span className="typing-dot h-[5px] w-[5px] rounded-full bg-ink-3" style={{ animationDelay: "300ms" }} />
              </span>
            )}
          </div>
          <div className="flex gap-2 border-t border-border-soft px-3.5 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Frag mich etwas…"
              className="flex-1 rounded-[10px] border border-border bg-surface-2 px-2.5 py-2 text-[12.5px] outline-none"
            />
            <button
              type="button"
              onClick={send}
              className="grad-temp-bg flex items-center justify-center rounded-[10px] px-3 font-extrabold text-[var(--grad-temp-ink)]"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
