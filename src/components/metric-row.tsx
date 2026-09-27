import { cn } from "@/lib/utils";
import type { Metric } from "@/lib/types";

type Props = {
  metric: Metric;
  value?: number;
  onChange: (value: number) => void;
  onClear: () => void;
};

const FILL = [
  "bg-primary/60 text-primary-foreground",
  "bg-primary/75 text-primary-foreground",
  "bg-primary/90 text-primary-foreground",
  "bg-primary text-primary-foreground",
  "bg-primary text-primary-foreground",
] as const;

export function MetricRow({ metric, value, onChange, onClear }: Props) {
  const fill = value != null ? FILL[value - 1] : undefined;

  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <div className="text-sm font-medium text-fg">{metric.name}</div>
        <div className="text-xs text-subtle">{metric.prompt}</div>
      </div>
      <div
        role="radiogroup"
        aria-label={`${metric.name} rating`}
        className="flex shrink-0 items-center gap-1"
        onKeyDown={(e) => {
          if (e.key >= "1" && e.key <= "5") {
            e.preventDefault();
            onChange(Number(e.key));
          }
          if (e.key === "Backspace" || e.key === "0") {
            e.preventDefault();
            onClear();
          }
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = value != null && value >= n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              onClick={() => {
                if (value === n) onClear();
                else onChange(n);
              }}
              className={cn(
                "flex size-11 items-center justify-center rounded-none font-mono text-sm tabular-nums transition-[background-color,color,box-shadow] duration-150 ease-out",
                filled
                  ? fill
                  : "bg-bg text-subtle shadow-border hover:text-fg hover:bg-elevated",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
