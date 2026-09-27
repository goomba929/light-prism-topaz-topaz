import { useEffect, useState, type ReactNode } from "react";
import { Onboarding } from "@/components/onboarding";
import { AppNav, SideNav } from "@/components/app-nav";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppStore } from "@/lib/store";

export function AppFrame({ children }: { children: ReactNode }) {
  const onboarded = useAppStore((s) => s.profile.onboarded);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const finish = () => {
      if (alive) setReady(true);
    };
    const persist = useAppStore.persist;
    const t = window.setTimeout(finish, 50);
    try {
      const result = persist?.rehydrate?.();
      void Promise.resolve(result).finally(finish);
    } catch {
      finish();
    }
    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, []);

  const showApp = ready && onboarded;

  return (
    <TooltipProvider delayDuration={200}>
      {showApp ? (
        <div className="min-h-dvh bg-bg text-fg">
          <div className="mx-auto flex max-w-5xl md:px-6">
            <SideNav />
            <div className="min-w-0 flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-10">
              {children}
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 md:hidden">
            <AppNav className="h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]" />
          </div>
        </div>
      ) : (
        <Onboarding />
      )}
      <Toaster />
    </TooltipProvider>
  );
}
