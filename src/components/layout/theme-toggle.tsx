"use client";

import { useTheme } from "next-themes";
import clsx from "clsx";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useHasMounted } from "@/lib/use-has-mounted";

const OPTIONS = [
  { key: "light", label: "Hell", icon: SunIcon },
  { key: "system", label: "Auto", icon: null },
  { key: "dark", label: "Dunkel", icon: MoonIcon },
] as const;

export function ThemeToggle({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  // next-themes liest die Präferenz erst nach dem Mount aus localStorage —
  // bis dahin einen neutralen Platzhalter rendern, um Hydration-Mismatches
  // zu vermeiden.
  const mounted = useHasMounted();

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center justify-center rounded-[10px] border border-border-soft bg-surface p-2.5 text-ink-3 hover:text-ink"
        title="Theme wechseln"
      >
        {mounted && theme === "dark" ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunIcon className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className="flex gap-1 rounded-[11px] bg-surface-2 p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => setTheme(opt.key)}
          className={clsx(
            "flex-1 rounded-[8px] py-1.5 text-[11.5px] font-bold transition-colors",
            mounted && theme === opt.key
              ? "bg-surface text-ink shadow-[var(--shadow-sm)]"
              : "text-ink-3"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
