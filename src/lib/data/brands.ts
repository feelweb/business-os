import type { Brand, BrandKey } from "@/lib/types";

/** Nur diese drei Marken im MVP — Konstant Architektur bewusst ausgeschlossen. */
export const BRANDS: Record<BrandKey, Brand> = {
  feelweb: { key: "feelweb", name: "feelweb", initial: "F" },
  lodora: { key: "lodora", name: "Lodora", initial: "L" },
  remindfuel: { key: "remindfuel", name: "RemindFuel", initial: "R" },
};

export const BRAND_LIST: Brand[] = Object.values(BRANDS);
