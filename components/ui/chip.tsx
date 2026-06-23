"use client";

import * as React from "react";

// 가로 스크롤 필터 칩 — 화면마다 반복되던 패턴의 단일 소스.
export function Chip({
  active, accent = "#E63946", activeGradient, onClick, children, className = "",
}: {
  active: boolean;
  accent?: string;
  /** 활성 시 배경 그라데이션(있으면 accent 대신 사용) */
  activeGradient?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95 ${className}`}
      style={active
        ? { background: activeGradient ?? accent, color: "#fff", ...(activeGradient ? { boxShadow: "0 3px 10px rgba(0,0,0,.15)" } : null) }
        : { background: "var(--surface)", color: "var(--text-2)" }}
    >
      {children}
    </button>
  );
}
