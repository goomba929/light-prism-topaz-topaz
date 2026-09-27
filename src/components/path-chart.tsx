import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMedium } from "@/lib/dates";
import type { DayScore } from "@/lib/scoring";

type Point = {
  date: string;
  label: string;
  pct: number | null;
  avg: number | null;
};

function rolling(series: DayScore[], window = 7): Point[] {
  const out: Point[] = [];
  const buf: number[] = [];
  for (const s of series) {
    const pct = s.rest ? null : s.rated > 0 ? s.truePct : null;
    if (pct != null) {
      buf.push(pct);
      if (buf.length > window) buf.shift();
    }
    const avg =
      buf.length === 0
        ? null
        : Math.round((buf.reduce((a, b) => a + b, 0) / buf.length) * 10) / 10;
    out.push({
      date: s.date,
      label: formatMedium(s.date),
      pct,
      avg: pct == null && buf.length === 0 ? null : avg,
    });
  }
  return out;
}

function SquareDot({
  cx,
  cy,
  payload,
}: {
  cx?: number;
  cy?: number;
  payload?: Point;
}) {
  if (cx == null || cy == null || payload?.pct == null) return null;
  return (
    <rect
      x={cx - 3}
      y={cy - 3}
      width={6}
      height={6}
      fill="var(--color-bg)"
      stroke="var(--color-primary)"
      strokeWidth={1.5}
    />
  );
}

function PathTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: Point }[];
}) {
  if (!active || !payload?.[0]) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-bg px-3 py-2 font-mono text-xs text-fg shadow-border">
      <p className="text-muted">{p.label}</p>
      <p className="mt-1 tabular-nums">
        {p.pct == null ? "no marks" : `${p.pct}%`}
      </p>
      {p.avg != null ? (
        <p className="text-muted tabular-nums">avg {p.avg}%</p>
      ) : null}
    </div>
  );
}

export function PathChart({ series }: { series: DayScore[] }) {
  const data = rolling(series);
  const logged = data.filter((d) => d.pct != null);

  if (logged.length === 0) {
    return (
      <p className="py-10 text-sm text-muted">
        Rate a few days. The line appears when the sheet has a past.
      </p>
    );
  }

  return (
    <div className="h-64 w-full min-w-0 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid
            stroke="var(--color-subtle)"
            strokeDasharray="2 6"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{
              fill: "var(--color-muted)",
              fontSize: 12,
              fontFamily: "IBM Plex Mono, ui-monospace, monospace",
            }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-primary)" }}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tick={{
              fill: "var(--color-muted)",
              fontSize: 12,
              fontFamily: "IBM Plex Mono, ui-monospace, monospace",
            }}
            tickLine={false}
            axisLine={{ stroke: "var(--color-primary)" }}
            width={36}
            unit="%"
          />
          <ReferenceLine
            y={50}
            stroke="var(--color-subtle)"
            strokeDasharray="4 4"
          />
          <Tooltip
            content={<PathTooltip />}
            cursor={{ stroke: "var(--color-muted)", strokeDasharray: "3 3" }}
          />
          <Line
            type="linear"
            dataKey="avg"
            stroke="var(--color-subtle)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            connectNulls
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="pct"
            stroke="var(--color-primary)"
            strokeWidth={2}
            strokeLinecap="square"
            dot={<SquareDot />}
            activeDot={{
              r: 4,
              fill: "var(--color-primary)",
              stroke: "var(--color-bg)",
            }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
