"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase-Client für Client Components. Nutzt ausschließlich den öffentlichen
 * Anon-Key + Row-Level-Security (siehe supabase/migrations) — keine Secrets
 * im Browser (CLAUDE.md § Sicherheit).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
