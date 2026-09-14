"use client";

import { useAppStore } from "@/lib/store/app-store";
import { Tabs } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/projects/project-card";
import type { ProjectCategory } from "@/lib/types";

const TABS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "Alle Projekte" },
  { key: "client", label: "Kundenprojekte" },
  { key: "own", label: "Eigene Projekte" },
  { key: "products", label: "Produkte" },
  { key: "experiments", label: "Experimente" },
];

export function ProjectBoard() {
  const { projects, workTab, setWorkTab } = useAppStore();
  const items = projects.filter((p) => workTab === "all" || p.category === workTab);

  return (
    <div>
      <div className="pb-2">
        <h1 className="text-[32px] font-bold">Projekte</h1>
        <p className="mt-2 text-[16.5px] text-ink-2">
          Alles, woran du gerade arbeitest, mit den einzelnen Aufgaben zum Abhaken.
        </p>
      </div>

      <Tabs items={TABS} active={workTab} onChange={setWorkTab} />

      <div className="grid gap-3.5 lg:grid-cols-2">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
