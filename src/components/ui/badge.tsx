import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none px-2.5 py-0.5 font-mono text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "bg-elevated text-fg shadow-border",
        good: "bg-good/15 text-good",
        warn: "bg-warn/15 text-warn",
        bad: "bg-bad/15 text-bad",
        outline: "text-muted shadow-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
