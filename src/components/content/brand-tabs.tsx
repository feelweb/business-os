"use client";

import clsx from "clsx";
import { BRAND_LIST } from "@/lib/data/brands";
import type { BrandKey } from "@/lib/types";

export function BrandTabs({
  active,
  onChange,
}: {
  active: BrandKey;
  onChange: (brand: BrandKey) => void;
}) {
  return (
    <div className="mb-6.5 flex flex-wrap gap-2.5">
      {BRAND_LIST.map((brand) => (
        <button
          key={brand.key}
          type="button"
          onClick={() => onChange(brand.key)}
          className={clsx(
            "flex items-center gap-2 rounded-[13px] border px-4.5 py-2.5 text-[13.5px] font-bold transition-colors",
            active === brand.key
              ? "border-ink text-ink shadow-[var(--shadow-sm)]"
              : "border-border-soft text-ink-2"
          )}
        >
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-current text-[9px] font-bold">
            {brand.initial}
          </span>
          {brand.name}
        </button>
      ))}
    </div>
  );
}
