/**
 * Handgeschriebene Row-Typen für die in Phase 1 tatsächlich angebundenen
 * Tabellen (aktuell: `inbox_items`). Die übrigen Tabellen aus
 * `supabase/migrations/0001_init.sql` existieren zwar schon in der DB
 * (siehe docs/03-data-model.md), sind aber noch nicht ans Frontend
 * angebunden — sobald das passiert, kommen ihre Row-Typen hier dazu.
 *
 * Später idealerweise durch generierte Typen ersetzen:
 * `supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts`
 */

export interface InboxItemRow {
  id: string;
  user_id: string;
  kind: "idea" | "link" | "task" | "thought";
  brand_key: "feelweb" | "lodora" | "remindfuel" | null;
  raw_text: string;
  suggestion: {
    type: string;
    brand: string;
    linkedTo: string;
    potential: string;
    suggestedAction: "Weiterdenken" | "Als Aufgabe" | "Parken";
  };
  created_at: string;
  archived_at: string | null;
}
