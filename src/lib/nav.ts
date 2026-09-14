import type { ComponentType, SVGProps } from "react";
import {
  BrainIcon,
  ContentIcon,
  HomeIcon,
  InboxIcon,
  ReviewIcon,
  WorkIcon,
} from "@/components/icons";

export interface NavEntry {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** Reihenfolge = verbindliche Navigation aus CLAUDE.md. */
export const NAV: NavEntry[] = [
  { href: "/start", label: "Start", icon: HomeIcon },
  { href: "/eingang", label: "Eingang", icon: InboxIcon },
  { href: "/projekte", label: "Projekte", icon: WorkIcon },
  { href: "/content", label: "Content", icon: ContentIcon },
  { href: "/wissen", label: "Wissen", icon: BrainIcon },
  { href: "/rueckblick", label: "Rückblick", icon: ReviewIcon },
];

export function navLabelForPath(pathname: string): string {
  const entry = NAV.find((n) => pathname === n.href || pathname.startsWith(`${n.href}/`));
  return entry?.label ?? "Start";
}
