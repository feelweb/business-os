import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["700", "800"],
});

// TEMP_BODY_FONT: Ersatz für "Garet" (kommerzieller Font, siehe globals.css).
const bodyFontTemp = Plus_Jakarta_Sans({
  variable: "--font-body-temp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Business OS",
  description: "Heikes persönliches Business- und Content-Betriebssystem.",
};

/**
 * Bewusst minimal: nur Fonts + Theme. `AppStoreProvider`/`Shell` (Sidebar,
 * AI-Dock) leben seit Phase 1 in `(app)/layout.tsx`, damit `/login` ohne
 * App-Chrome auskommt — Routenschutz übernimmt `middleware.ts`.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${dmSans.variable} ${bodyFontTemp.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
