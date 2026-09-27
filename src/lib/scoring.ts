import type { Aspect, DayLog, Metric } from "@/lib/types";
import { addDays, keysBefore } from "@/lib/dates";
import { titleForLevel } from "@/lib/defaults";

export type DayScore = {
  date: string;
  rated: number;
  active: number;
  completion: number;
  idealPct: number;
  truePct: number;
  aspectPct: Record<string, number>;
  xp: number;
  rest: boolean;
};

export function clampScore(n: number): number {
  return Math.max(1, Math.min(5, Math.round(n)));
}

export function scoreDay(
  date: string,
  log: DayLog | undefined,
  metrics: Metric[],
  aspects: Aspect[],
): DayScore {
  const active = metrics.filter((m) => m.active);
  const scores = log?.scores ?? {};
  const ratedList = active.filter((m) => scores[m.id] != null);
  const rated = ratedList.length;
  const completion = active.length === 0 ? 0 : rated / active.length;

  const ratedSum = ratedList.reduce((s, m) => s + (scores[m.id] ?? 0), 0);
  const trueSum = active.reduce((s, m) => s + (scores[m.id] ?? 0), 0);

  const idealPct =
    rated === 0 ? 0 : Math.round((ratedSum / (rated * 5)) * 1000) / 10;
  const truePct =
    active.length === 0
      ? 0
      : Math.round((trueSum / (active.length * 5)) * 1000) / 10;

  const aspectPct: Record<string, number> = {};
  for (const a of aspects) {
    const group = active.filter((m) => m.aspectId === a.id);
    if (group.length === 0) {
      aspectPct[a.id] = 0;
      continue;
    }
    const sum = group.reduce((s, m) => s + (scores[m.id] ?? 0), 0);
    aspectPct[a.id] = Math.round((sum / (group.length * 5)) * 1000) / 10;
  }

  const xp = log?.rest ? 0 : Math.round(truePct * completion * 1.15);

  return {
    date,
    rated,
    active: active.length,
    completion,
    idealPct,
    truePct,
    aspectPct,
    xp,
    rest: Boolean(log?.rest),
  };
}

export function streakEndingAt(
  end: string,
  logs: Record<string, DayLog>,
  metrics: Metric[],
): number {
  const active = metrics.filter((m) => m.active);
  if (active.length === 0) return 0;
  const kept = (k: string) => {
    const log = logs[k];
    if (log?.rest) return true;
    const rated = log
      ? active.filter((m) => log.scores[m.id] != null).length
      : 0;
    return rated > 0;
  };
  let k = end;
  if (!kept(k)) k = addDays(end, -1);
  let n = 0;
  for (let i = 0; i < 400; i++) {
    if (!kept(k)) break;
    n += 1;
    k = addDays(k, -1);
  }
  return n;
}

export function totalXp(
  logs: Record<string, DayLog>,
  metrics: Metric[],
  aspects: Aspect[],
): number {
  let xp = 0;
  for (const log of Object.values(logs)) {
    xp += scoreDay(log.date, log, metrics, aspects).xp;
  }
  return xp;
}

export function levelFromXp(xp: number): {
  level: number;
  title: string;
  into: number;
  needed: number;
  progress: number;
} {
  const per = 180;
  const level = Math.max(1, Math.floor(xp / per) + 1);
  const into = xp % per;
  return {
    level,
    title: titleForLevel(level),
    into,
    needed: per,
    progress: into / per,
  };
}

export type MetricAverage = {
  metric: Metric;
  avg: number;
  n: number;
};

export function averagesForRange(
  keys: string[],
  logs: Record<string, DayLog>,
  metrics: Metric[],
): MetricAverage[] {
  return metrics
    .filter((m) => m.active)
    .map((metric) => {
      let sum = 0;
      let n = 0;
      for (const k of keys) {
        const v = logs[k]?.scores[metric.id];
        if (v != null) {
          sum += v;
          n += 1;
        }
      }
      return { metric, avg: n === 0 ? 0 : sum / n, n };
    });
}

export function aspectAverages(
  keys: string[],
  logs: Record<string, DayLog>,
  metrics: Metric[],
  aspects: Aspect[],
): { aspect: Aspect; pct: number; n: number }[] {
  return aspects.map((aspect) => {
    const group = metrics.filter((m) => m.active && m.aspectId === aspect.id);
    let sum = 0;
    let n = 0;
    for (const k of keys) {
      const log = logs[k];
      if (!log) continue;
      for (const m of group) {
        const v = log.scores[m.id];
        if (v != null) {
          sum += v;
          n += 1;
        }
      }
    }
    return {
      aspect,
      pct: n === 0 ? 0 : Math.round((sum / (n * 5)) * 1000) / 10,
      n,
    };
  });
}

export function historySeries(
  end: string,
  days: number,
  logs: Record<string, DayLog>,
  metrics: Metric[],
  aspects: Aspect[],
): DayScore[] {
  return keysBefore(end, days).map((date) =>
    scoreDay(date, logs[date], metrics, aspects),
  );
}

export function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const v =
    values.reduce((s, x) => s + (x - mean) ** 2, 0) / (values.length - 1);
  return Math.sqrt(v);
}
