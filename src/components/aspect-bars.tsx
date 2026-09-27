import { ASPECT_ICONS } from "@/lib/icons";
import type { Aspect } from "@/lib/types";

type Props = {
  aspects: Aspect[];
  pct: Record<string, number>;
};

export function AspectBars({ aspects, pct }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-5">
      {aspects.map((a) => {
        const Icon = ASPECT_ICONS[a.id];
        const v = pct[a.id] ?? 0;
        return (
          <li key={a.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted">
                <Icon className="size-3" />
                {a.name}
              </span>
              <span className="tabular-nums text-fg">{formatPct(v)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-none bg-bg shadow-border">
              <div
                className="h-full rounded-none bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${Math.max(0, Math.min(100, v))}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function formatPct(v: number): string {
  return `${v % 1 === 0 ? Math.round(v) : v.toFixed(1)}%`;
}
