"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="flex items-center justify-center gap-2 rounded-[10px] border border-border-soft bg-surface px-2 py-2 text-xs font-semibold text-ink-3 hover:text-ink disabled:opacity-50"
    >
      {collapsed ? "⏻" : pending ? "Wird abgemeldet…" : "Abmelden"}
    </button>
  );
}
