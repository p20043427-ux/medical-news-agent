"use client";

import * as React from "react";

export function Skeleton({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse rounded-xl ${className}`} style={{ background: "var(--surface)", ...style }} />;
}

// 앱 진입 로딩 골격 — 헤더 + 카드 자리표시 (스피너 대체)
export function AppSkeleton() {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-4" style={{ background: "var(--bg)" }}>
      <div className="flex items-center gap-3 pb-4">
        <Skeleton className="h-7 w-24" />
        <div className="ml-auto flex gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <Skeleton className="mb-3 h-16 w-full rounded-2xl" />
      <Skeleton className="mb-5 h-8 w-28" />
      <Skeleton className="mb-3 h-44 w-full rounded-3xl" />
      <div className="flex gap-3">
        <Skeleton className="h-24 flex-1 rounded-2xl" />
        <Skeleton className="h-24 flex-1 rounded-2xl" />
      </div>
    </div>
  );
}
