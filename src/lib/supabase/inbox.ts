import type { SupabaseClient } from "@supabase/supabase-js";

import type { InboxItem } from "@/lib/types";
import type { InboxItemRow } from "@/lib/supabase/types";

/**
 * Erster echter Supabase-Austauschpunkt (siehe docs/implementation-plan.md
 * § 8 / § 4): ersetzt `lib/data/inbox.ts` als Datenquelle für die Inbox.
 * Läuft sowohl mit dem Browser- als auch dem Server-Client aus
 * `lib/supabase/{client,server}.ts` — beide erfüllen dasselbe `SupabaseClient`-
 * Interface, RLS sorgt in beiden Fällen dafür, dass nur eigene Zeilen sichtbar
 * sind. Soft-Delete über `archived_at` statt echtem DELETE, damit Rohinput
 * erhalten bleibt (docs/03-data-model.md).
 */

function rowToInboxItem(row: InboxItemRow): InboxItem {
  return {
    id: row.id,
    kind: row.kind,
    brandKey: row.brand_key,
    text: row.raw_text,
    createdAt: row.created_at,
    suggestion: row.suggestion,
  };
}

export async function listInboxItems(supabase: SupabaseClient): Promise<InboxItem[]> {
  const { data, error } = await supabase
    .from("inbox_items")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as InboxItemRow[]).map(rowToInboxItem);
}

export async function insertInboxItem(
  supabase: SupabaseClient,
  input: Pick<InboxItem, "kind" | "brandKey" | "text" | "suggestion">
): Promise<InboxItem> {
  const { data, error } = await supabase
    .from("inbox_items")
    .insert({
      kind: input.kind,
      brand_key: input.brandKey,
      raw_text: input.text,
      suggestion: input.suggestion,
    })
    .select()
    .single();

  if (error) throw error;
  return rowToInboxItem(data as InboxItemRow);
}

export async function archiveInboxItem(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase
    .from("inbox_items")
    .update({ archived_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;
}
