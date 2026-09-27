import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "bg-surface text-fg shadow-border border-0 font-[Figtree,ui-sans-serif,system-ui,sans-serif]",
          title: "text-fg",
          description: "text-muted",
        },
      }}
    />
  );
}
