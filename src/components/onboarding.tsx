import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ASPECT_ICONS } from "@/lib/icons";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const HEADLINE = "The list of who you are becoming, kept.";

export function Onboarding() {
  const aspects = useAppStore((s) => s.aspects);
  const metrics = useAppStore((s) => s.metrics);
  const toggleMetric = useAppStore((s) => s.toggleMetric);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [step, setStep] = useState<0 | 1>(0);
  const [name, setName] = useState("");
  const [typed, setTyped] = useState(0);
  const [seen, setSeen] = useState(false);

  const activeCount = useMemo(
    () => metrics.filter((m) => m.active).length,
    [metrics],
  );

  const done = typed >= HEADLINE.length;

  useEffect(() => {
    if (step !== 0) return;
    if (seen) {
      setTyped(HEADLINE.length);
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(HEADLINE.length);
      setSeen(true);
      return;
    }
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n + 1 >= HEADLINE.length) {
          window.clearInterval(id);
          setSeen(true);
          return HEADLINE.length;
        }
        return n + 1;
      });
    }, 32);
    return () => window.clearInterval(id);
  }, [step, seen]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 py-10 md:justify-center md:py-16">
      <p className="font-mono text-xs tracking-widest text-primary uppercase">
        {">"} Arete // character.sys
      </p>
      {step === 0 ? (
        <div className="mt-6 flex flex-col gap-8">
          <div>
            <h1
              className="font-display min-h-24 text-5xl tracking-wide sm:min-h-28 sm:text-6xl"
              onClick={() => {
                setTyped(HEADLINE.length);
                setSeen(true);
              }}
            >
              {HEADLINE.slice(0, typed)}
              <span className={done ? "caret-done" : "caret"} aria-hidden />
            </h1>
            <p
              className={cn(
                "mt-4 text-muted transition-opacity duration-300 ease-out",
                done ? "opacity-100" : "opacity-0",
              )}
            >
              Twenty marks. Five aspects. Each day you rate how fully you showed
              up as the figure you already wrote down. Not a streak toy. A
              character sheet.
            </p>
          </div>
          <div
            className={cn(
              "flex flex-col gap-8 transition-opacity duration-300 ease-out",
              done ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">What should the sheet call you?</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") setStep(1);
                }}
              />
            </div>
            <Button size="lg" onClick={() => setStep(1)}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-8 pb-10">
          <div>
            <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
              Five aspects. Twenty marks.
            </h1>
            <p className="mt-3 text-muted">
              Body, Spirit, Kin, Craft, Mind. Toggle anything that is not yours.
              You can rewrite the sheet later.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {aspects.map((aspect) => {
              const Icon = ASPECT_ICONS[aspect.id];
              const group = metrics.filter((m) => m.aspectId === aspect.id);
              return (
                <section key={aspect.id}>
                  <div className="mb-2 flex flex-wrap items-baseline gap-2">
                    <Icon className="size-3.5 text-muted" />
                    <h2 className="font-display text-lg font-medium">
                      {aspect.name}
                    </h2>
                    <span className="text-xs text-subtle">{aspect.tagline}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMetric(m.id)}
                        className={cn(
                          "h-10 rounded-none px-3 font-mono text-sm transition-[background-color,color,box-shadow] duration-150",
                          m.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-bg text-muted shadow-border",
                        )}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              disabled={activeCount === 0}
              onClick={() =>
                completeOnboarding({ name: name.trim(), seed: true })
              }
            >
              Begin with the twenty
            </Button>
            <Button
              size="lg"
              variant="secondary"
              disabled={activeCount === 0}
              onClick={() =>
                completeOnboarding({ name: name.trim(), seed: false })
              }
            >
              Start from zero
            </Button>
            <p className="text-xs text-subtle">
              The twenty includes a sample fortnight so the path has a past.
              Clear it anytime from the figure.
            </p>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="min-h-11 text-sm text-muted hover:text-fg"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
