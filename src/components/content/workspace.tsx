"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { useAppStore } from "@/lib/store/app-store";
import { CONTENT_ITEMS } from "@/lib/data/content";
import { BRANDS } from "@/lib/data/brands";
import { chatWithContext, quickActionReply, selectionActionReply } from "@/lib/ai/chat";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { SendIcon } from "@/components/icons";
import { createId } from "@/lib/id";
import type { ChatMessage } from "@/lib/types";

const QUICK_ACTIONS: { key: "reel" | "carousel" | "caption" | "think"; label: string }[] = [
  { key: "reel", label: "Reel daraus" },
  { key: "carousel", label: "Carousel daraus" },
  { key: "caption", label: "Caption" },
  { key: "think", label: "Weiterdenken" },
];

const SELECTION_ACTIONS: { key: "rewrite" | "deeper" | "concrete"; label: string }[] = [
  { key: "rewrite", label: "Überarbeiten" },
  { key: "deeper", label: "Tiefer denken" },
  { key: "concrete", label: "Konkreter" },
];

export function Workspace({ id }: { id: string }) {
  const item = CONTENT_ITEMS.find((c) => c.id === id);
  const { chatLogs, setChatLog, addChatMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [popover, setPopover] = useState<{ top: number; left: number } | null>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const messages = item ? chatLogs[item.id] ?? [] : [];

  useEffect(() => {
    if (item && !chatLogs[item.id]) {
      setChatLog(item.id, [
        {
          id: "welcome",
          who: "ai",
          text: "Ich hab deinen Gedanken schon mal ins Dokument gelegt. Sag mir, wenn ich etwas vertiefen, kürzen oder anders angehen soll.",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, pending]);

  if (!item) notFound();

  function push(text: string) {
    addChatMessage(item!.id, { id: createId("ai"), who: "ai", text });
  }

  async function sendChat() {
    const value = input.trim();
    if (!value || pending) return;
    const userMsg: ChatMessage = { id: createId("u"), who: "user", text: value };
    addChatMessage(item!.id, userMsg);
    setInput("");
    setPending(true);
    const reply = await chatWithContext(item!.title, value);
    push(reply);
    setPending(false);
  }

  function onMouseUp() {
    const sel = window.getSelection();
    const doc = docRef.current;
    if (sel && sel.toString().trim().length > 3 && doc) {
      const range = sel.getRangeAt(0).getBoundingClientRect();
      const parentRect = doc.getBoundingClientRect();
      setPopover({ top: range.top - parentRect.top - 44, left: Math.max(0, range.left - parentRect.left) });
    } else {
      setPopover(null);
    }
  }

  const brandKey = item.brandKey;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <Link href="/content" className="inline-flex items-center gap-2 rounded-[11px] px-2.5 py-2 text-[13.5px] font-bold text-ink-2 hover:bg-surface-2">
          ← Zurück zu {BRANDS[brandKey].name}
        </Link>
        <Pill variant="neutral">{item.meta}</Pill>
      </div>

      <div className="grid min-h-[560px] overflow-hidden rounded-[18px] border border-border-soft bg-surface lg:grid-cols-[63%_1fr]">
        <div className="relative border-b border-border-soft px-8 py-7.5 lg:border-b-0 lg:border-r">
          <h2 className="mb-4 font-display text-[22px] font-bold">{item.title}</h2>
          <div
            ref={docRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onMouseUp={onMouseUp}
            className="min-h-[300px] text-base leading-[1.75] outline-none"
          >
            {item.body.split("\n\n").map((p, i) => (
              <p key={i} className="mb-3.5">
                {p}
              </p>
            ))}
          </div>

          {popover && (
            <div
              className="absolute z-20 flex gap-1 rounded-xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)]"
              style={{ top: popover.top, left: popover.left }}
            >
              {SELECTION_ACTIONS.map((a) => (
                <button
                  key={a.key}
                  type="button"
                  className="rounded-[7px] px-2.5 py-1.5 text-xs font-bold hover:bg-surface-2"
                  onClick={() => {
                    setPopover(null);
                    push(selectionActionReply(a.key));
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border-soft pt-4.5">
            {QUICK_ACTIONS.map((a) => (
              <Button key={a.key} onClick={() => push(quickActionReply(a.key))}>
                {a.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-surface-2">
          <div className="flex items-center gap-2 border-b border-border-soft px-5 py-4 text-[13.5px] font-bold">
            <span className="grad-temp-bg h-2 w-2 flex-none rounded-full" />
            KI-Assistent
          </div>
          <div className="scroll-thin flex max-h-[420px] flex-1 flex-col gap-3.5 overflow-y-auto px-5 py-4.5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.who === "user"
                    ? "max-w-[92%] self-end rounded-[12px_12px_3px_12px] border border-border-soft bg-surface px-3.5 py-2.5 text-[13.5px] leading-normal"
                    : "max-w-[92%] text-[13.5px] leading-normal"
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
            <div ref={chatEndRef} />
          </div>
          <div className="flex gap-2 border-t border-border-soft px-4 py-3.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="z.B. „das ist mir zu kitschig”"
              className="flex-1 rounded-[11px] border border-border bg-surface px-3 py-2.5 text-[13px] outline-none"
            />
            <button
              type="button"
              onClick={sendChat}
              className="grad-temp-bg flex items-center justify-center rounded-[11px] px-3.5 font-extrabold text-[var(--grad-temp-ink)]"
            >
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
