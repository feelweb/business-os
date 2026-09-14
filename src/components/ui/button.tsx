import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "default" | "ghost";
type Size = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-2 rounded-[11px] font-bold transition-all",
        size === "md" ? "px-4 py-2.5 text-[13.5px]" : "rounded-[9px] px-3 py-1.5 text-[12.5px]",
        variant === "default" &&
          "border border-border bg-surface text-ink hover:-translate-y-px hover:border-ink-3",
        variant === "primary" &&
          "grad-temp-bg border border-transparent font-extrabold text-[var(--grad-temp-ink)] hover:brightness-[1.04]",
        variant === "ghost" &&
          "border-transparent bg-transparent px-2.5 py-2 text-ink-2 hover:bg-surface-2",
        className
      )}
      {...props}
    />
  );
}
