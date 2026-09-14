import type { SVGProps } from "react";

/**
 * 1:1 aus dem Prototyp (`ICN`) übernommene Icon-Strichzeichnungen, nur als
 * React-Komponenten statt Template-Strings. Rein monochrom (`currentColor`)
 * — Zustände werden nie über die Icon-Farbe, sondern über Füllung/Gewicht
 * ausgedrückt (siehe docs/05-design-system.md).
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9.5 10 3l7 6.5" />
      <path d="M5 8.5V17h10V8.5" />
      <path d="M8 17v-5h4v5" />
    </svg>
  );
}

export function InboxIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 11h3.8l1 2h3.4l1-2h3.8" />
      <path d="M4 11 5.3 4.8A1 1 0 0 1 6.3 4h7.4a1 1 0 0 1 1 .8L16 11v4.2a.8.8 0 0 1-.8.8H4.8a.8.8 0 0 1-.8-.8Z" />
    </svg>
  );
}

export function WorkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="14" height="9" rx="1.6" />
      <path d="M7 7V5.6A1.6 1.6 0 0 1 8.6 4h2.8A1.6 1.6 0 0 1 13 5.6V7" />
      <path d="M3 11h14" />
    </svg>
  );
}

export function ContentIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3 17 6.7 10 10.3 3 6.7 10 3Z" />
      <path d="m3 10.4 7 3.6 7-3.6" />
      <path d="m3 13.9 7 3.6 7-3.6" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="6.5" r="2.1" />
      <circle cx="14" cy="6.5" r="2.1" />
      <circle cx="10" cy="13" r="2.1" />
      <path d="M6 8.6v1a2 2 0 0 0 2 2h.2M14 8.6v1a2 2 0 0 0-2 2h-.2M6.9 5.1h6.2" />
    </svg>
  );
}

export function ReviewIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16V9M10 16V4M16 16v-6.5" />
      <path d="M3 16h14" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 3v3M10 14v3M3 10h3M14 10h3M5.3 5.3l2 2M12.7 12.7l2 2M5.3 14.7l2-2M12.7 7.3l2-2" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="7.3" />
      <path d="M10 6.5v4M10 13.2v.1" />
    </svg>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4l6 6-6 6" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="9" width="11" height="8" rx="2" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2.1} {...props}>
      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 2.6v1.8M10 15.6v1.8M17.4 10h-1.8M4.4 10H2.6M15.2 4.8l-1.3 1.3M6.1 13.9l-1.3 1.3M15.2 15.2l-1.3-1.3M6.1 6.1 4.8 4.8" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16.5 12.4A6.8 6.8 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z" />
    </svg>
  );
}
