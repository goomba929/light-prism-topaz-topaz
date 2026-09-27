import { Link } from "@tanstack/react-router";
import { Compass, Feather, Layers, Waypoints } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/", label: "Today", icon: Compass },
  { to: "/path", label: "Path", icon: Waypoints },
  { to: "/counsel", label: "Counsel", icon: Feather },
  { to: "/figure", label: "Figure", icon: Layers },
] as const;

export function AppNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex", className)}
      aria-label="Primary"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className="flex min-h-11 flex-1 flex-col items-center justify-center gap-1 px-2 font-mono text-xs tracking-widest text-subtle uppercase transition-colors duration-150 hover:text-fg [&.active]:text-primary"
            activeOptions={{ exact: item.to === "/" }}
            activeProps={{ className: "active" }}
          >
            <Icon className="size-4" strokeWidth={1.6} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SideNav() {
  return (
    <aside className="hidden w-52 shrink-0 flex-col gap-8 py-10 pr-6 md:flex">
      <div>
        <p className="font-display text-3xl tracking-wide text-primary">
          Arête
        </p>
        <p className="mt-1 font-mono text-xs tracking-widest text-subtle uppercase">
          Character.sys
        </p>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Primary">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex min-h-11 items-center gap-3 rounded-none px-3 font-mono text-sm tracking-wide text-muted uppercase transition-colors duration-150 hover:bg-elevated hover:text-fg [&.active]:bg-elevated [&.active]:text-primary"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "active" }}
            >
              <Icon className="size-4" strokeWidth={1.6} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
