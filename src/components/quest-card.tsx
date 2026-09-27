import { Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import type { Quest } from "@/lib/psychology";
import { ASPECT_ICONS } from "@/lib/icons";

export function QuestCard({ quest }: { quest: Quest }) {
  const Icon = ASPECT_ICONS[quest.aspect.id];
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Tomorrow's hinge
          </p>
          <span className="flex items-center gap-1 text-xs text-subtle">
            <Icon className="size-3" />
            {quest.aspect.name}
          </span>
        </div>
        <h2 className="font-display text-2xl font-medium tracking-tight">
          {quest.metric.name}
        </h2>
        <p className="text-sm text-muted">{quest.why}</p>
        <p className="text-sm text-fg">{quest.ifThen}</p>
        <p className="text-sm text-subtle">{quest.tiny}</p>
        <Link
          to="/counsel"
          className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
        >
          Full counsel
        </Link>
      </CardContent>
    </Card>
  );
}
