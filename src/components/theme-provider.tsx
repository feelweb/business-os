"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Dünner Wrapper um next-themes (Klassen-Strategie: `.dark` auf <html>).
 * Einziger Ort, an dem Theme-Präferenz persistiert wird (localStorage,
 * verwaltet von next-themes selbst) — siehe implementation-plan.md § 7.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
