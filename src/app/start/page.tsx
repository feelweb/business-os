import { DayCheck } from "@/components/start/day-check";
import { GlanceGrid } from "@/components/start/glance-grid";
import { WeekOverviewSection } from "@/components/start/week-overview";
import { AttentionList } from "@/components/start/attention-list";
import { BrainDump } from "@/components/start/brain-dump";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 11) return "Guten Morgen, Heike.";
  if (hour < 18) return "Guten Tag, Heike.";
  return "Guten Abend, Heike.";
}

export default function StartPage() {
  return (
    <div>
      <section className="pb-7 pt-1.5">
        <h1 className="text-[clamp(30px,3.6vw,44px)] font-bold tracking-tight">
          {greeting()}
        </h1>
        <p className="mt-2 max-w-[46ch] text-[16.5px] text-ink-2">
          Lass uns entscheiden, was heute wirklich zählt.
        </p>
      </section>

      <DayCheck />
      <GlanceGrid />
      <WeekOverviewSection />
      <AttentionList />
      <BrainDump />
    </div>
  );
}
