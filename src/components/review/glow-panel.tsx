import type { ReactNode } from "react";

/**
 * Steht für ein atmosphärisches Foto (im Prototyp: `.glowpanel`) — bewusst
 * die einzige Stelle im Produkt, die unabhängig vom Theme immer dunkel
 * bleibt, weil sie eine Fotofläche simuliert statt eine UI-Fläche zu sein.
 * Keine neue Farbe: derselbe neutrale Nah-Schwarz-Ton + RemindFuel-Verlauf.
 */
export function GlowPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] px-8 py-7.5 text-[#f3f5f4]"
      style={{
        background:
          "radial-gradient(130% 160% at 10% -10%, color-mix(in srgb, var(--grad-temp-start) 55%, transparent), transparent 55%), radial-gradient(110% 140% at 105% 115%, color-mix(in srgb, var(--grad-temp-end) 55%, transparent), transparent 55%), linear-gradient(160deg, #15191a 0%, #0c0e0f 100%)",
      }}
    >
      <div aria-hidden className="absolute inset-0 bg-[rgba(9,11,11,.32)]" />
      <div className="relative [&_b]:text-white [&_b]:font-bold">{children}</div>
    </div>
  );
}
