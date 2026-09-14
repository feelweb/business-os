"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/start";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "sending") return;
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-bg px-5">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-40 -top-52 h-[560px] w-[560px] rounded-full opacity-40 blur-[95px]"
        style={{ background: "radial-gradient(circle, var(--grad-temp-start), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-44 left-28 h-[480px] w-[480px] rounded-full opacity-30 blur-[95px]"
        style={{ background: "radial-gradient(circle, var(--grad-temp-end), transparent 70%)" }}
      />

      <div className="relative w-full max-w-[420px] rounded-[24px] border border-border-soft bg-surface p-9 shadow-[var(--shadow-lg)]">
        <div className="grad-temp-bg mb-5 h-[34px] w-[34px] rounded-[10px]" />
        <h1 className="text-2xl font-bold">Business OS</h1>
        <p className="mt-2 text-sm text-ink-2">
          Melde dich mit deiner E-Mail an — du bekommst einen Login-Link zugeschickt, kein
          Passwort nötig.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-2xl border border-border-soft bg-surface-2 px-5 py-4.5 text-sm text-ink-2">
            Link ist unterwegs an <b className="font-bold text-ink">{email}</b>. Mail öffnen und
            draufklicken — das Fenster hier kannst du danach schließen.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="heike@feelweb.de"
              className="rounded-[12px] border border-border bg-surface px-4 py-3 text-sm outline-none"
            />
            <Button variant="primary" type="submit" className="justify-center py-3">
              {status === "sending" ? "Sende Link…" : "Login-Link senden"}
            </Button>
            {status === "error" && (
              <p className="text-xs font-semibold text-ink-2">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
