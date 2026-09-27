import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { todayKey } from "@/lib/dates";
import { ASPECT_ICONS } from "@/lib/icons";
import { useAppStore } from "@/lib/store";
import type { AppData, AspectId } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/figure")({ component: FigurePage });

function FigurePage() {
  const profile = useAppStore((s) => s.profile);
  const aspects = useAppStore((s) => s.aspects);
  const metrics = useAppStore((s) => s.metrics);
  const setName = useAppStore((s) => s.setName);
  const toggleMetric = useAppStore((s) => s.toggleMetric);
  const renameMetric = useAppStore((s) => s.renameMetric);
  const removeMetric = useAppStore((s) => s.removeMetric);
  const addMetric = useAppStore((s) => s.addMetric);
  const resetAll = useAppStore((s) => s.resetAll);
  const clearHistory = useAppStore((s) => s.clearHistory);
  const importSheet = useAppStore((s) => s.importSheet);

  const [addOpen, setAddOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAspect, setNewAspect] = useState<AspectId>("body");
  const fileRef = useRef<HTMLInputElement>(null);

  const activeCount = metrics.filter((m) => m.active).length;

  return (
    <main className="flex flex-col gap-8 px-5 pt-8 md:pt-10">
      <header>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          Figure
        </p>
        <h1 className="font-display mt-1 text-4xl tracking-wide">
          Rewrite the ideal.
        </h1>
        <p className="mt-2 text-sm text-muted">
          {activeCount} active marks. The sheet is yours.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <Label htmlFor="display-name">Name on the sheet</Label>
        <Input
          id="display-name"
          value={profile.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      {aspects.map((aspect) => {
        const Icon = ASPECT_ICONS[aspect.id];
        const group = metrics
          .filter((m) => m.aspectId === aspect.id)
          .sort((a, b) => a.order - b.order);
        return (
          <Card key={aspect.id}>
            <CardContent className="p-5">
              <div className="mb-3 flex items-baseline gap-2">
                <Icon className="size-4 text-muted" />
                <h2 className="font-display text-xl font-medium">
                  {aspect.name}
                </h2>
                <span className="text-xs text-subtle">{aspect.tagline}</span>
              </div>
              <ul className="divide-y divide-border">
                {group.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center"
                  >
                    <Input
                      value={m.name}
                      onChange={(e) => renameMetric(m.id, e.target.value)}
                      className="h-11 sm:flex-1"
                      aria-label={`Rename ${m.name}`}
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant={m.active ? "default" : "outline"}
                        onClick={() => toggleMetric(m.id)}
                      >
                        {m.active ? "On" : "Off"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeMetric(m.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}

      <Button variant="secondary" onClick={() => setAddOpen(true)}>
        <Plus className="size-4" />
        Add a mark
      </Button>

      <section className="flex flex-col gap-3 pb-8">
        <h2 className="font-display text-xl font-medium">The book</h2>
        <p className="text-sm text-muted">
          History lives on this device. Keep a copy. On a phone, use the
          browser share menu and add Arête to the home screen. Clearing the
          path keeps the figure. Starting over forgets everything.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            void file.text().then((raw) => {
              try {
                const parsed = JSON.parse(raw) as AppData & {
                  state?: AppData;
                };
                const data = parsed.state ?? parsed;
                if (
                  !data.profile ||
                  !Array.isArray(data.metrics) ||
                  !Array.isArray(data.aspects) ||
                  !data.logs
                ) {
                  toast.error("That file is not a sheet.");
                  return;
                }
                importSheet({
                  profile: data.profile,
                  aspects: data.aspects,
                  metrics: data.metrics,
                  logs: data.logs,
                  briefings: data.briefings ?? {},
                });
                toast.success("Sheet restored.");
              } catch {
                toast.error("Could not read that file.");
              }
            });
          }}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button
            variant="secondary"
            onClick={() => {
              const s = useAppStore.getState();
              const blob = new Blob(
                [
                  JSON.stringify(
                    {
                      arete: 1,
                      exportedAt: new Date().toISOString(),
                      profile: s.profile,
                      aspects: s.aspects,
                      metrics: s.metrics,
                      logs: s.logs,
                      briefings: s.briefings,
                    },
                    null,
                    2,
                  ),
                ],
                { type: "application/json" },
              );
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = `arete-${todayKey()}.json`;
              a.click();
              URL.revokeObjectURL(a.href);
              toast.success("Copy downloaded.");
            }}
          >
            Download a copy
          </Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            Restore a copy
          </Button>
          <Button variant="secondary" onClick={() => clearHistory()}>
            Clear the path
          </Button>
          <Button variant="outline" onClick={() => setResetOpen(true)}>
            Start over
          </Button>
        </div>
      </section>

      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add a mark</SheetTitle>
            <SheetDescription>
              A name is enough. Put it in the aspect it belongs to.
            </SheetDescription>
          </SheetHeader>
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!newName.trim()) return;
              addMetric({ name: newName.trim(), aspectId: newAspect });
              setNewName("");
              setAddOpen(false);
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-mark">Name</Label>
              <Input
                id="new-mark"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Sabbath"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Aspect</Label>
              <div className="flex flex-wrap gap-2">
                {aspects.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setNewAspect(a.id)}
                    className={cn(
                      "h-10 rounded-none px-3 text-sm transition-colors duration-150",
                      newAspect === a.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted shadow-border",
                    )}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={!newName.trim()}>
              Add to the sheet
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start over?</DialogTitle>
            <DialogDescription>
              This clears the figure, the path, and the name. It cannot be
              undone. Download a copy first if you want the book back.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              Keep it
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                resetAll();
                setResetOpen(false);
              }}
            >
              Start over
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
