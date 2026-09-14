import type { HTMLAttributes } from "react";
import clsx from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-[18px] border border-border-soft bg-surface shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    />
  );
}
