import { addDays, formatMedium, formatWeekdayShort, keysBefore, weekday } from "@/lib/dates";
import type { DayScore } from "@/lib/scoring";
import { cn } from "@/lib/utils";

type Props = {
  end: string;
  weeks?: number;
  scores: Record<string, DayScore>;
};

const DAY_MARKS = ["M", "", "W", "", "F", "", ""] as const;

export function cellTone(s?: DayScore): string {
  if (!s || (s.rated === 0 && !s.rest)) return "bg-bg shadow-border";
  if (s.rest) return "bg-bg shadow-border";
  if (s.truePct >= 75) return "bg-primary";
  if (s.truePct >= 50) return "bg-primary/70";
  if (s.truePct >= 25) return "bg-primary/40";
  return "bg-primary/20";
}

export function cellTitle(key: string, s?: DayScore): string {
  if (s?.rest) return `${key} · rest`;
  if (s && s.rated > 0) return `${key} · ${s.truePct}%`;
  return `${key} · no marks`;
}

export function Heatmap({ end, weeks = 12, scores }: Props) {
  const days = weeks * 7;
  const start = addDays(end, -(days - 1));
  const startPad = (weekday(start) + 6) % 7;
  const keys = keysBefore(end, days);
  const cells: (string | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...keys,
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const columns: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between font-mono text-xs text-subtle">
        <span>{formatMedium(keys[0] ?? end)}</span>
        <span>{formatMedium(end)}</span>
      </div>
      <div className="flex gap-1">
        <div className="flex w-4 shrink-0 flex-col gap-1">
          {DAY_MARKS.map((d, i) => (
            <div
              key={i}
              className="flex aspect-square items-center font-mono text-xs text-subtle"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 gap-1">
          {columns.map((col, ci) => (
            <div key={ci} className="flex min-w-0 flex-1 flex-col gap-1">
              {col.map((key, ri) => {
                if (!key) {
                  return (
                    <div
                      key={`e-${ci}-${ri}`}
                      className="aspect-square w-full"
                    />
                  );
                }
                const s = scores[key];
                return (
                  <div
                    key={key}
                    title={cellTitle(key, s)}
                    className={cn(
                      "relative aspect-square w-full rounded-none",
                      cellTone(s),
                    )}
                  >
                    {s?.rest ? (
                      <span className="absolute inset-[3px] shadow-border" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs text-subtle">
        Empty: no marks. Inner box: rest. Brighter: closer to the ideal.
      </p>
    </div>
  );
}

export function WeekStrip({
  end,
  scores,
}: {
  end: string;
  scores: Record<string, DayScore>;
}) {
  const keys = keysBefore(end, 7);
  return (
    <div className="flex gap-1">
      {keys.map((key) => {
        const s = scores[key];
        return (
          <div key={key} className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="font-mono text-xs text-subtle">
              {formatWeekdayShort(key).slice(0, 1)}
            </span>
            <div
              title={cellTitle(key, s)}
              className={cn(
                "relative aspect-square w-full rounded-none",
                cellTone(s),
              )}
            >
              {s?.rest ? (
                <span className="absolute inset-[3px] shadow-border" />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
