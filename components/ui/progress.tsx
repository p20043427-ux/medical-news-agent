import * as React from "react";
import { cn } from "@/lib/ui/cn";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0~100 */
  value: number;
  /** 채움 색 (Tailwind 클래스). 기본 primary */
  indicatorClassName?: string;
  /** 채움 인라인 스타일 (그라데이션 등 보존용). width 는 자동 적용 */
  indicatorStyle?: React.CSSProperties;
}

/**
 * 공통 Progress — 접근성 속성 포함(role=progressbar, aria-valuenow).
 * RN Reusables `Progress` 매핑.
 */
export function Progress({ value, indicatorClassName, indicatorStyle, className, ...props }: ProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-full bg-primary transition-[width] duration-500", indicatorClassName)}
        style={{ width: `${v}%`, ...indicatorStyle }}
      />
    </div>
  );
}
