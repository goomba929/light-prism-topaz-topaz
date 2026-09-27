import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AspectBars } from "@/components/aspect-bars";
import { CharacterSeal } from "@/components/character-seal";
import { WeekStrip } from "@/components/heatmap";
import { MetricRow } from "@/components/metric-row";
import { QuestCard } from "@/components/quest-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { addDays, formatLong, todayKey } from "@/lib/dates";
import { ASPECT_ICONS } from "@/lib/icons";
import { buildQuest } from "@/lib/psychology";
import {
  levelFromXp,
  scoreDay,
  streakEndingAt,
  totalXp,
} from "@/lib/scoring";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: TodayPage });

function TodayPage() {
  const today = todayKey();
  const profile = useAppStore((s) => s.profile);
  const aspects = useAppStore((s) => s.aspects);
  const metrics = useAppStore((s) => s.metrics);
  const logs = useAppStore((s) => s.logs);
  const setScore = useAppStore((s) => s.setScore);
  const clearScore = useAppStore((s) => s.clearScore);
  const setJournal = useAppStore((s) => s.setJournal);
  const setRest = useAppStore((s) => s.setRest);
  const [openYesterday, setOpenYesterday] = useState(false);

  const log = logs[today];
  const day = scoreDay(today, log, metrics, aspects);
  const xp = totalXp(logs, metrics, aspects);
  const level = levelFromXp(xp);
  const streak = streakEndingAt(today, logs, metrics);
  const quest = buildQuest(today, logs, metrics, aspects);
  const who = profile.name.trim() || "you";
  const yesterday = addDays(today, -1);
  const yDay = scoreDay(yesterday, logs[yesterday], metrics, aspects);
  const showYesterday =
    Boolean(profile.startedAt) &&
    profile.startedAt <= yesterday &&
    yDay.rated === 0 &&
    !yDay.rest;
  const weekScores = Object.fromEntries(
    [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const date = addDays(today, i - 6);
      return [date, scoreDay(date, logs[date], metrics, aspects)] as const;
    }),
  );

  return (
    <main className="flex flex-col gap-8 px-5 pt-8 md:pt-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            {formatLong(today)}
          </p>
          <h1 className="font-display mt-1 text-4xl tracking-wide">
            {who === "you"
              ? "How fully did you show up?"
              : `How fully did ${who} show up?`}
          </h1>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            {level.title}
          </p>
          <p className="font-display text-2xl tabular-nums">Lv {level.level}</p>
        </div>
      </header>

      {showYesterday ? (
        <Card>
          <CardContent className="flex flex-col gap-3 p-5">
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              Yesterday · {formatLong(yesterday)}
            </p>
            <p className="text-sm text-fg">
              No marks. A blank day ends the streak.
            </p>
            <Button
              variant="secondary"
              onClick={() => setOpenYesterday((v) => !v)}
            >
              {openYesterday ? "Hide yesterday" : "Close yesterday"}
            </Button>
            {openYesterday
              ? metrics
                  .filter((m) => m.active)
                  .map((metric) => (
                    <MetricRow
                      key={metric.id}
                      metric={metric}
                      value={logs[yesterday]?.scores[metric.id]}
                      onChange={(v) => setScore(yesterday, metric.id, v)}
                      onClear={() => clearScore(yesterday, metric.id)}
                    />
                  ))
              : null}
          </CardContent>
        </Card>
      ) : null}

      <CharacterSeal
        pct={day.truePct}
        completion={day.completion}
        rated={day.rated}
        active={day.active}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            {level.title} · {xp} xp
          </span>
          <span className="tabular-nums">
            {streak} day{streak === 1 ? "" : "s"}
          </span>
        </div>
        <Progress value={Math.round(level.progress * 100)} />
      </div>

      <AspectBars aspects={aspects} pct={day.aspectPct} />

      <WeekStrip end={today} scores={weekScores} />

      <div className="flex flex-wrap gap-2">
        <Button
          variant={log?.rest ? "default" : "secondary"}
          onClick={() => setRest(today, !log?.rest)}
        >
          {log?.rest ? "Rest day on" : "Mark rest day"}
        </Button>
      </div>

      {log?.rest ? (
        <p className="text-sm text-muted">
          Rest holds the streak. Rate anyway if you still showed up.
        </p>
      ) : null}

      {quest ? <QuestCard quest={quest} /> : null}

      <section className="flex flex-col gap-6">
        {aspects.map((aspect) => {
          const group = metrics
            .filter((m) => m.active && m.aspectId === aspect.id)
            .sort((a, b) => a.order - b.order);
          if (group.length === 0) return null;
          const Icon = ASPECT_ICONS[aspect.id];
          return (
            <Card key={aspect.id}>
              <CardContent className="p-5">
                <div className="mb-2 flex items-baseline gap-2">
                  <Icon className="size-4 text-muted" />
                  <h2 className="font-display text-xl">{aspect.name}</h2>
                  <span className="text-xs tabular-nums text-subtle">
                    {day.aspectPct[aspect.id] ?? 0}%
                  </span>
                </div>
                {group.map((metric) => (
                  <MetricRow
                    key={metric.id}
                    metric={metric}
                    value={log?.scores[metric.id]}
                    onChange={(v) => setScore(today, metric.id, v)}
                    onClear={() => clearScore(today, metric.id)}
                  />
                ))}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="flex flex-col gap-2 pb-8">
        <label htmlFor="journal" className="text-sm text-muted">
          What mattered
        </label>
        <Textarea
          id="journal"
          value={log?.journal ?? ""}
          onChange={(e) => setJournal(today, e.target.value)}
          placeholder="One sentence is enough."
        />
      </section>
    </main>
  );
}
