import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { AppStoreProvider } from "@/lib/store/app-store";
import { Shell } from "@/components/layout/shell";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${dmSans.variable} ${bodyFontTemp.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppStoreProvider>
            <Shell>{children}</Shell>
          </AppStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
