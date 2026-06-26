import * as React from "react";
import { cn } from "@/lib/ui/cn";

type Variant = "default" | "primary" | "accent" | "success" | "warning" | "muted" | "outline";

const VARIANT: Record<Variant, string> = {
  default: "bg-foreground text-background",
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  muted: "bg-muted text-muted-foreground",
  outline: "border border-border text-muted-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

/** 공통 Badge — 품사·레벨·상태 칩. RN Reusables `Badge` 매핑. */
export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        VARIANT[variant],
        className,
      )}
      {...props}
    />
  );
}
