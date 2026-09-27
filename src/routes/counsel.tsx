import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { writeBriefing } from "@/lib/coach";
import { formatLong, formatWeekday, keysBefore, todayKey } from "@/lib/dates";
import { ASPECT_ICONS } from "@/lib/icons";
import { buildInsights, buildQuest, localBriefing } from "@/lib/psychology";
import {
  aspectAverages,
  averagesForRange,
  scoreDay,
  streakEndingAt,
} from "@/lib/scoring";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/counsel")({ component: CounselPage });

function CounselPage() {
  const today = todayKey();
  const profile = useAppStore((s) => s.profile);
  const aspects = useAppStore((s) => s.aspects);
  const metrics = useAppStore((s) => s.metrics);
  const logs = useAppStore((s) => s.logs);
  const briefings = useAppStore((s) => s.briefings);
  const saveBriefing = useAppStore((s) => s.saveBriefing);
  const [pending, setPending] = useState(false);

  const quest = buildQuest(today, logs, metrics, aspects);
  const insights = buildInsights(
    today,
    profile.name,
    logs,
    metrics,
    aspects,
  );
  const day = scoreDay(today, logs[today], metrics, aspects);
  const week = aspectAverages(keysBefore(today, 7), logs, metrics, aspects);
  const lowest = averagesForRange(keysBefore(today, 7), logs, metrics)
    .filter((m) => m.n >= 1)
    .sort((a, b) => a.avg - b.avg)
    .slice(0, 3);
  const saved = briefings[today];
  const local = localBriefing(today, profile.name, logs, metrics, aspects);

  async function askGrok() {
    setPending(true);
    try {
      const result = await writeBriefing({
        data: {
          name: profile.name,
          date: today,
          weekday: formatWeekday(today),
          truePct: day.truePct,
          completion: day.completion,
          streak: streakEndingAt(today, logs, metrics),
          journal: logs[today]?.journal,
          aspects: aspects.map((a) => ({
            name: a.name,
            pct: day.aspectPct[a.id] ?? 0,
          })),
          weekAspects: week.map((a) => ({
            name: a.aspect.name,
            pct: a.pct,
          })),
          lowest: lowest.map((m) => ({
            name: m.metric.name,
            aspect:
              aspects.find((a) => a.id === m.metric.aspectId)?.name ?? "",
            avg: m.avg,
          })),
          quest: quest
            ? {
                name: quest.metric.name,
                aspect: quest.aspect.name,
                why: quest.why,
                ifThen: quest.ifThen,
                tiny: quest.tiny,
              }
            : undefined,
        },
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      saveBriefing(today, {
        text: result.text,
        at: new Date().toISOString(),
        source: "grok",
      });
    } catch {
      toast.error("Counsel could not be reached.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="flex flex-col gap-8 px-5 pt-8 md:pt-10">
      <header>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Counsel · {formatLong(today)}
        </p>
        <h1 className="font-display mt-1 text-4xl tracking-wide">
          One hinge. Not a pile of advice.
        </h1>
      </header>

      {quest ? (
        <Card>
          <CardContent className="flex flex-col gap-3 p-5">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              The hinge
            </p>
            <h2 className="font-display text-2xl font-medium">
              {quest.metric.name}
            </h2>
            <p className="text-sm text-muted">{quest.why}</p>
            <p className="text-sm">{quest.ifThen}</p>
            <p className="text-sm text-subtle">{quest.tiny}</p>
            <p className="text-sm italic text-muted">{quest.identity}</p>
          </CardContent>
        </Card>
      ) : null}

      <section className="flex flex-col gap-3">
        {insights.map((insight) => (
          <Card key={insight.id}>
            <CardContent className="p-5">
              <p className="font-mono text-xs tracking-widest text-muted uppercase">
                {insight.kicker}
              </p>
              <h2 className="font-display mt-1 text-xl font-medium">
                {insight.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{insight.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-3 pb-6">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-medium">Briefing</h2>
          {import.meta.env.VITE_STATIC === "1" ? null : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => void askGrok()}
              disabled={pending}
            >
              {pending ? "Writing…" : "Ask Grok to go deeper"}
            </Button>
          )}
        </div>
        <Card>
          <CardContent className="p-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg">
              {saved?.text ?? local}
            </p>
            <p className="mt-4 text-xs text-subtle">
              {saved?.source === "grok"
                ? "Written for this sheet today."
                : import.meta.env.VITE_STATIC === "1"
                  ? "Counsel from this sheet. No account required."
                  : "Local counsel. Ask Grok when you want a second reading."}
            </p>
          </CardContent>
        </Card>
        <ul className="flex flex-wrap gap-2">
          {week.map((a) => {
            const Icon = ASPECT_ICONS[a.aspect.id];
            return (
              <li
                key={a.aspect.id}
                className="flex items-center gap-1.5 rounded-none px-3 py-1.5 font-mono text-xs text-muted shadow-border"
              >
                <Icon className="size-3" />
                {a.aspect.name}{" "}
                <span className="tabular-nums text-fg">{a.pct}%</span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
