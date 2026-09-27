import { cn } from "@/lib/utils";

type Props = {
  pct: number;
  completion: number;
  rated: number;
  active: number;
  className?: string;
};

export function CharacterSeal({
  pct,
  completion,
  rated,
  active,
  className,
}: Props) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 88;
  const circ = 2 * Math.PI * r;
  const shown = completion === 0 ? 0 : pct;
  const dash = (Math.max(0, Math.min(100, shown)) / 100) * circ;
  const display =
    shown % 1 === 0 ? String(Math.round(shown)) : shown.toFixed(1);

  return (
    <div
      className={cn(
        "relative mx-auto w-60 bg-surface p-3 shadow-border",
        className,
      )}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="size-full"
        aria-hidden="true"
      >
        <rect
          x="8"
          y="8"
          width={size - 16}
          height={size - 16}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="2"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-bg"
          strokeWidth="10"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth="10"
          strokeLinecap="square"
          strokeDasharray={`${dash} ${circ}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{
            transition:
              "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i / 20) * Math.PI * 2 - Math.PI / 2;
          const inner = i % 5 === 0 ? r + 18 : r + 14;
          const outer = r + 26;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * inner}
              y1={cy + Math.sin(a) * inner}
              x2={cx + Math.cos(a) * outer}
              y2={cy + Math.sin(a) * outer}
              stroke="currentColor"
              className={i % 5 === 0 ? "text-primary" : "text-subtle"}
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-6xl leading-none tabular-nums">
          {display}
          <span className="text-2xl text-muted">%</span>
        </span>
        <span className="mt-2 font-mono text-xs tracking-widest text-muted uppercase">
          of the ideal
        </span>
        <span className="mt-1 font-mono text-xs text-subtle tabular-nums">
          {rated}/{active} marked
        </span>
      </div>
    </div>
  );
}
