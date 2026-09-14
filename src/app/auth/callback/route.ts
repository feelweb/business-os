import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Ziel des Magic-Link-Redirects (siehe `emailRedirectTo` in
 * `app/login/page.tsx`). Tauscht den PKCE-`code` gegen eine Session und
 * schickt weiter zur ursprünglich gewünschten Seite (`next`, Default
 * `/start`).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/start";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
