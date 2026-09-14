/**
 * Domain-Typen für das Business OS.
 *
 * Phase 0: Diese Typen werden ausschließlich von lokalen Demo-Daten befüllt
 * (siehe `lib/data/*`). Feldnamen orientieren sich bewusst an
 * `docs/03-data-model.md`, damit sie sich in Phase 1 möglichst direkt auf
 * Supabase-Tabellen abbilden lassen (id, createdAt/updatedAt, brandId-Referenzen
 * statt Farbwerten). Komponenten importieren nur diese Typen + die Daten aus
 * `lib/data`, nie umgekehrt — das hält den späteren Austausch gegen echte
 * Queries an einer einzigen Stelle.
 */

export type BrandKey = "feelweb" | "lodora" | "remindfuel";

export interface Brand {
  key: BrandKey;
  name: string;
  /** Kurzform für neutrale Badges (kein Farbcode — siehe Design System). */
  initial: string;
}

export type Capacity = "low" | "normal" | "high";

export interface FocusOption {
  id: string;
  category: string;
  title: string;
  why: string;
}

export interface WeekOverview {
  mainFocusTitle: string;
  revenueFocusTitle: string;
  growthFocusTitle: string;
  deadlineWhat: string;
  deadlineDate: string;
  deadlineDays: number;
  contentProgressByBrand: Partial<Record<BrandKey, number>>;
}

export interface GlanceItem {
  key: "ansteht" | "status" | "offen" | "potential";
  label: string;
  value: string;
  sub: string;
}

export type AttentionLevel = "info" | "warn" | "critical";

export interface AttentionItem {
  id: string;
  level: AttentionLevel;
  text: string;
}

export type InboxKind = "idea" | "link" | "task" | "thought";

export interface InboxSuggestion {
  type: string;
  brand: string;
  linkedTo: string;
  potential: string;
  suggestedAction: "Weiterdenken" | "Als Aufgabe" | "Parken";
}

export interface InboxItem {
  id: string;
  kind: InboxKind;
  brandKey: BrandKey | null;
  text: string;
  createdAt: string;
  suggestion: InboxSuggestion;
}

export type ProjectCategory = "client" | "own" | "products" | "experiments";
export type ScaleLevel = "low" | "medium" | "high" | "unclear";
export type Energy = "leicht" | "fokus";

export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export interface ClientDetails {
  value: string;
  status: string;
  source: string;
  nextStep: string;
  contentPotential: ScaleLevel;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  impact: ScaleLevel;
  effort: ScaleLevel;
  potential: ScaleLevel;
  deadline: string | null;
  energy: Energy;
  tasks: Task[];
  client?: ClientDetails;
  usesPhotoTile?: boolean;
}

export type ContentStage =
  | "ideas"
  | "explore"
  | "draft"
  | "ready"
  | "published";

export interface ContentItem {
  id: string;
  brandKey: BrandKey;
  stage: ContentStage;
  title: string;
  meta: string;
  body: string;
  isCurrentFocus?: boolean;
}

export interface ChatMessage {
  id: string;
  who: "ai" | "user";
  text: string;
}

export interface KnowledgeEntry {
  key: string;
  value: string;
}

export interface BrandKnowledge {
  brandKey: BrandKey;
  entries: KnowledgeEntry[];
}

export type MemoryConfidence = "hoch" | "mittel";

export interface LearnedMemory {
  id: string;
  text: string;
  confidence: MemoryConfidence;
  evidence: string[];
}

export type ReviewPeriod = "month" | "quarter" | "year";

export interface ReviewNumber {
  value: string;
  label: string;
}

export interface ReviewDecision {
  date: string;
  text: string;
}

export interface Review {
  period: ReviewPeriod;
  periodLabel: string;
  numbers: ReviewNumber[];
  moved: string[];
  whereFrom: string;
  created: string[];
  decisions: ReviewDecision[];
  changed: string;
}
