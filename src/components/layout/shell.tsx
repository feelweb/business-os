import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { AiDock } from "@/components/layout/ai-dock";

/**
 * Rahmen der App: Sidebar + Hauptinhalt + Floating-AI-Dock. Ersetzt das
 * `<div class="app">` + `#main` + `#aiFab/#aiPanel` Gerüst des Prototyps.
 * Die ambienten Gradient-Lichtflächen (`body::before/::after` im Prototyp)
 * laufen hier als fixe, dekorative Elemente hinter dem Inhalt.
 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-40 -top-52 z-0 h-[560px] w-[560px] rounded-full opacity-40 blur-[95px]"
        style={{
          background:
            "radial-gradient(circle, var(--grad-temp-start), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-44 left-28 z-0 h-[480px] w-[480px] rounded-full opacity-30 blur-[95px]"
        style={{
          background:
            "radial-gradient(circle, var(--grad-temp-end), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <main className="view-in min-w-0 flex-1 px-6 py-8 pb-24 md:px-11">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>
      </div>
      <AiDock />
    </div>
  );
}
