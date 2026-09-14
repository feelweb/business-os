export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
      <div
        className="grad-temp-bg h-full rounded-full transition-[width] duration-300"
        style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
      />
    </div>
  );
}
