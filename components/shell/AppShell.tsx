"use client";

import * as React from "react";

/** 모든 카테고리 공통 모바일 셸 래퍼 (max-w-md · safe-area · 토큰 배경) */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md" style={{ background: "var(--bg)" }}>
      {children}
    </div>
  );
}
