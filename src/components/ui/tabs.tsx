import clsx from "clsx";
import type { ReactNode } from "react";

export interface TabItem<T extends string> {
  key: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export function Tabs<T extends string>({
  items,
  active,
  onChange,
}: {
  items: TabItem<T>[];
  active: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="mb-6 flex w-fit flex-wrap gap-1.5 rounded-[13px] bg-surface-2 p-1.5">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          disabled={item.disabled}
          onClick={() => onChange(item.key)}
          className={clsx(
            "inline-flex items-center gap-1.5 rounded-[9px] px-4 py-2 text-[13px] font-bold transition-colors",
            active === item.key
              ? "bg-surface text-ink shadow-[var(--shadow-sm)]"
              : "text-ink-3 hover:text-ink-2",
            item.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}
