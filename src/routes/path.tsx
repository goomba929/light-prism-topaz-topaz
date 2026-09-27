import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AspectBars } from "@/components/aspect-bars";
import { Heatmap } from "@/components/heatmap";
import { PathChart } from "@/components/path-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMedium, keysBefore, todayKey } from "@/lib/dates";
import { ASPECT_ICONS } from "@/lib/icons";
import {
  aspectAverages,
  averagesForRange,
  historySeries,
} from "@/lib/scoring";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/path")({ component: PathPage });

function PathPage() {
  const today = todayKey();
  const aspects = useAppStore((s) => s.aspects);
  const metrics = useAppStore((s) => s.metrics);
  const logs = useAppStore((s) => s.logs);

  const series = historySeries(today, 28, logs, metrics, aspects);
  const weekKeys = keysBefore(today, 7);
  const weekAspects = aspectAverages(weekKeys, logs, metrics, aspects);
  const weekPct = Object.fromEntries(
    weekAspects.map((a) => [a.aspect.id, a.pct]),
  );
  const metricAvgs = averagesForRange(weekKeys, logs, metrics)
    .filter((m) => m.n > 0)
    .sort((a, b) => a.avg - b.avg);

  const weekSeries = historySeries(today, 7, logs, metrics, aspects);
  const weekLogged = weekSeries.filter((s) => s.rated > 0 && !s.rest);
  const weekAvg =
    weekLogged.length === 0
      ? 0
      : Math.round(
          (weekLogged.reduce((sum, d) => sum + d.truePct, 0) /
            weekLogged.length) *
            10,
        ) / 10;

  return (
    <main className="flex flex-col gap-8 px-5 pt-8 md:pt-10">
      <header>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Path
        </p>
        <h1 className="font-display mt-1 text-4xl tracking-wide">
          The moving average of you.
        </h1>
        <p className="mt-2 text-sm text-muted">
          {series.filter((s) => s.rated > 0).length} days kept in the last 28.
          Week average <span className="tabular-nums text-fg">{weekAvg}%</span>
          .
        </p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => {
            const week = historySeries(today, 7, logs, metrics, aspects);
            const name = useAppStore.getState().profile.name.trim() || "the figure";
            const lines = [
              `Arête · ${name}`,
              `${formatMedium(week[0]?.date ?? today)} – ${formatMedium(today)}`,
              `Week average ${weekAvg}%`,
              "",
              ...week.map((d) =>
                d.rest
                  ? `${d.date}  rest`
                  : d.rated > 0
                    ? `${d.date}  ${d.truePct}%  ${d.rated}/${d.active}`
                    : `${d.date}  —`,
              ),
              "",
              "Thin to thick",
              ...metricAvgs.map(
                (row) =>
                  `${row.metric.name}  ${Math.round((row.avg / 5) * 100)}%`,
              ),
            ];
            void navigator.clipboard.writeText(lines.join("\n")).then(
              () => toast.success("Week copied."),
              () => toast.error("Could not copy."),
            );
          }}
        >
          Copy this week
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Twenty-eight days</CardTitle>
        </CardHeader>
        <CardContent>
          <PathChart series={series} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Presence</CardTitle>
        </CardHeader>
        <CardContent>
          <Heatmap
            end={today}
            weeks={12}
            scores={Object.fromEntries(
              historySeries(today, 84, logs, metrics, aspects).map((s) => [
                s.date,
                s,
              ]),
            )}
          />
        </CardContent>
      </Card>

      <section>
        <h2 className="mb-3 font-display text-xl font-medium">This week</h2>
        <AspectBars aspects={aspects} pct={weekPct} />
      </section>

      <section className="flex flex-col gap-3 pb-4">
        <h2 className="font-display text-xl font-medium">Marks, thin to thick</h2>
        {metricAvgs.length === 0 ? (
          <p className="text-sm text-muted">
            Rate a few days and the path will fill.
          </p>
        ) : (
          <ul className="divide-y divide-border bg-bg shadow-border">
            {metricAvgs.map((row) => {
              const Icon = ASPECT_ICONS[row.metric.aspectId];
              const pct = Math.round((row.avg / 5) * 1000) / 10;
              return (
                <li
                  key={row.metric.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-muted" />
                    <span className="truncate text-sm">{row.metric.name}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden w-24 sm:block">
                      <span className="block h-2 overflow-hidden rounded-none bg-bg shadow-border">
                        <span
                          className="block h-full bg-primary"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                    </span>
                    <span className="w-14 text-right text-sm tabular-nums text-fg">
                      {pct}%
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
