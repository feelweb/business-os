import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { listInboxItems } from "@/lib/supabase/inbox";
import { listProjects } from "@/lib/supabase/projects";
import { AppStoreProvider } from "@/lib/store/app-store";
import { Shell } from "@/components/layout/shell";

/**
 * Geschützter App-Bereich (alle sechs MVP-Sektionen). `middleware.ts` schickt
 * nicht eingeloggte Aufrufe schon vorher zu `/login`; der Redirect hier ist
 * nur die letzte Absicherung, falls dieses Layout direkt gerendert wird.
 *
 * Lädt Inbox und Projekte einmal server-seitig und reicht sie als
 * Startzustand an den Client-Store weiter — die ersten Bereiche, die
 * wirklich aus Supabase kommen statt aus lokalen Demo-Daten (siehe
 * docs/phase-1-result.md).
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [initialInbox, initialProjects] = await Promise.all([
    listInboxItems(supabase),
    listProjects(supabase),
  ]);

  return (
    <AppStoreProvider initialInbox={initialInbox} initialProjects={initialProjects}>
      <Shell userEmail={user.email ?? null}>{children}</Shell>
    </AppStoreProvider>
  );
}
