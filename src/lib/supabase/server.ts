import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client für Server Components/Route Handlers. Liest/schreibt die
 * Session über Next.js-Cookies. Auch hier nur der Anon-Key — Zugriffsschutz
 * kommt aus RLS-Policies, nicht aus einem serverseitigen Secret-Key.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Wird aus einer Server Component (statt Server Action/Route
            // Handler) aufgerufen -- das darf fehlschlagen, solange
            // middleware.ts die Session ohnehin bei jedem Request auffrischt.
          }
        },
      },
    }
  );
}
