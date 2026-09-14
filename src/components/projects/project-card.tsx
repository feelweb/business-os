"use client";

import clsx from "clsx";
import type { ComponentType, SVGProps } from "react";

import { useAppStore } from "@/lib/store/app-store";
import { ProgressBar } from "@/components/ui/progress-bar";
import { DotScale } from "@/components/ui/dot-scale";
import { CheckIcon, ContentIcon, HomeIcon, SparkIcon, WorkIcon } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import { setTaskDone } from "@/lib/supabase/projects";
import type { Project } from "@/lib/types";

const CAT_ICON: Record<Project["category"], ComponentType<SVGProps<SVGSVGElement>>> = {
  client: WorkIcon,
  own: HomeIcon,
  products: ContentIcon,
  experiments: SparkIcon,
};

export function ProjectCard({ project }: { project: Project }) {
  const { toggleTask } = useAppStore();
  const done = project.tasks.filter((t) => t.done).length;
  const total = project.tasks.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const Icon = CAT_ICON[project.category];

  function onToggleTask(taskId: string, currentlyDone: boolean) {
    // Optimistisch: UI schaltet sofort um, die Persistenz läuft im
    // Hintergrund nach (gleiches Muster wie bei der Inbox).
    toggleTask(project.id, taskId);
    const supabase = createClient();
    setTaskDone(supabase, taskId, !currentlyDone).catch((err) =>
      console.error("Konnte Aufgabe nicht speichern:", err)
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[18px] border border-border-soft bg-surface transition-shadow hover:shadow-[var(--shadow-md)]">
      <div className="flex gap-3.5 px-5.5 pt-5">
        <div
          className={clsx(
            "flex h-[50px] w-[50px] flex-none items-center justify-center rounded-[13px]",
            project.usesPhotoTile ? "bg-ink text-[var(--bg)]" : "bg-surface-2 text-ink"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2.5">
            <div>
              <div className="font-display text-base font-bold">{project.title}</div>
              <div className="mt-0.5 text-xs text-ink-3">{project.subtitle}</div>
            </div>
            {project.client && (
              <span className="grad-temp-bg flex-none rounded-full px-2.5 py-1 text-xs font-bold text-[var(--grad-temp-ink)]">
                {project.client.value}
              </span>
            )}
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1 text-[11.5px] font-bold text-ink-2">
              Wirkung <DotScale level={project.impact} />
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1 text-[11.5px] font-bold text-ink-2">
              Aufwand <DotScale level={project.effort} />
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1 text-[11.5px] font-bold text-ink-2">
              Potential <DotScale level={project.potential} />
            </span>
            <span className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">
              Deadline <b className="font-extrabold text-ink">{project.deadline ?? "—"}</b>
            </span>
            <span className="rounded-lg bg-surface-2 px-2.5 py-1 text-[11.5px] font-semibold text-ink-2">
              Energie <b className="font-extrabold text-ink capitalize">{project.energy}</b>
            </span>
          </div>
        </div>
      </div>

      <div className="px-5.5 pt-4">
        <ProgressBar percent={pct} />
        <div className="mt-1.5 text-[11.5px] font-semibold text-ink-3">
          {done} von {total} Aufgaben erledigt
        </div>
      </div>

      <div className="mt-2 px-3.5 pb-3.5">
        {project.tasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => onToggleTask(task.id, task.done)}
            className="flex w-full items-center gap-2.5 rounded-[10px] px-2 py-2 text-left transition-colors hover:bg-surface-2"
          >
            <span
              className={clsx(
                "flex h-[19px] w-[19px] flex-none items-center justify-center rounded-[6px] border-[1.5px]",
                task.done ? "grad-temp-bg border-transparent" : "border-border"
              )}
            >
              {task.done && <CheckIcon className="h-[11px] w-[11px] text-[var(--grad-temp-ink)]" />}
            </span>
            <span className={clsx("text-[13px] font-semibold", task.done && "text-ink-3 line-through")}>
              {task.text}
            </span>
          </button>
        ))}
      </div>

      {project.client && (
        <div className="mx-5.5 mb-5 flex flex-wrap gap-x-4 gap-y-1.5 rounded-xl bg-surface-2 px-3.5 py-3 text-xs text-ink-2">
          <span>
            Status: <b className="font-bold text-ink">{project.client.status}</b>
          </span>
          <span>
            Quelle: <b className="font-bold text-ink">{project.client.source}</b>
          </span>
          <span>
            Content-Potential: <b className="font-bold text-ink capitalize">{project.client.contentPotential}</b>
          </span>
          <span>
            Nächster Schritt: <b className="font-bold text-ink">{project.client.nextStep}</b>
          </span>
        </div>
      )}
    </div>
  );
}
