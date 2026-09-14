"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store/app-store";
import { BrandTabs } from "@/components/content/brand-tabs";
import { CONTENT_ITEMS, CONTENT_STAGES } from "@/lib/data/content";

export function StatusBoard() {
  const { contentBrand, setContentBrand } = useAppStore();
  const items = CONTENT_ITEMS.filter((c) => c.brandKey === contentBrand);

  return (
    <div>
      <div className="pb-2">
        <h1 className="text-[32px] font-bold">Content</h1>
        <p className="mt-2 text-[16.5px] text-ink-2">
          Von der ersten Idee bis zur Veröffentlichung — für alle deine Marken an einem Ort.
        </p>
      </div>

      <div className="mt-6">
        <BrandTabs active={contentBrand} onChange={setContentBrand} />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {CONTENT_STAGES.map((stage) => {
          const stageItems = items.filter((i) => i.stage === stage.key);
          return (
            <div key={stage.key}>
              <div className="mb-2.5 flex justify-between text-[11.5px] font-bold uppercase tracking-wide text-ink-3">
                {stage.label}
                <span>{stageItems.length}</span>
              </div>
              <div className="flex min-h-[60px] flex-col gap-2.5">
                {stageItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/${item.id}`}
                    className="block rounded-[13px] border border-border-soft bg-surface px-3.5 py-3.5 transition-transform hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="text-[13.5px] font-bold leading-snug">{item.title}</div>
                    <div className="mt-2 text-[11.5px] text-ink-3">{item.meta}</div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
