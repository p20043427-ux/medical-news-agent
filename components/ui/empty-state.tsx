"use client";

import * as React from "react";

// 빈 상태 공용 — 이모지 + 제목 + 설명(+선택 액션)
export function EmptyState({
  emoji, title, description, action, className = "",
}: {
  emoji: string;
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 px-6 py-20 text-center ${className}`}>
      <span className="text-5xl">{emoji}</span>
      <p className="text-base font-semibold" style={{ color: "var(--text-2)" }}>{title}</p>
      {description && <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
