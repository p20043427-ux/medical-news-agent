import * as React from "react";
import { cn } from "@/lib/ui/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 이니셜 또는 이모지 */
  fallback?: string;
  size?: number;
}

/** 공통 Avatar — 이니셜 폴백. RN Reusables `Avatar` 매핑. */
export function Avatar({ fallback = "?", size = 36, className, ...props }: AvatarProps) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-muted font-bold text-muted-foreground",
        className,
      )}
      {...props}
    >
      {fallback}
    </span>
  );
}
