import type { SupabaseClient } from "@supabase/supabase-js";

import type { Project } from "@/lib/types";
import type { ProjectRow, TaskRow } from "@/lib/supabase/types";

/**
 * Zweiter Supabase-Austauschpunkt (nach der Inbox): ersetzt
 * `lib/data/projects.ts` als Datenquelle. `tasks` hängt per `project_id` an
 * `projects` -- wir laden beide Tabellen getrennt und setzen sie hier
 * zusammen, statt einen verschachtelten Supabase-`select` zu pflegen, das
 * hält die Query-Seite einfach lesbar.
 */

function rowsToProject(project: ProjectRow, tasks: TaskRow[]): Project {
  return {
    id: project.id,
    category: project.category,
    title: project.title,
    subtitle: project.subtitle ?? "",
    impact: project.impact,
    effort: project.effort,
    potential: project.potential,
    deadline: project.deadline,
    energy: project.energy,
    tasks: tasks
      .filter((t) => t.project_id === project.id)
      .sort((a, b) => a.position - b.position)
      .map((t) => ({ id: t.id, text: t.text, done: t.done })),
    client: project.client_value
      ? {
          value: project.client_value,
          status: project.client_status ?? "",
          source: project.client_source ?? "",
          nextStep: project.client_next_step ?? "",
          contentPotential: project.client_content_potential ?? "medium",
        }
      : undefined,
  };
}

export async function listProjects(supabase: SupabaseClient): Promise<Project[]> {
  const [{ data: projects, error: projectsError }, { data: tasks, error: tasksError }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .is("archived_at", null)
        .order("created_at", { ascending: true }),
      supabase
        .from("tasks")
        .select("*")
        .is("archived_at", null)
        .order("position", { ascending: true }),
    ]);

  if (projectsError) throw projectsError;
  if (tasksError) throw tasksError;

  return (projects as ProjectRow[]).map((p) => rowsToProject(p, tasks as TaskRow[]));
}

export async function setTaskDone(
  supabase: SupabaseClient,
  taskId: string,
  done: boolean
): Promise<void> {
  const { error } = await supabase.from("tasks").update({ done }).eq("id", taskId);
  if (error) throw error;
}
