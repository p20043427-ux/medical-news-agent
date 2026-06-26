"use client";

import * as React from "react";

// 가로 스크롤 필터 칩 — 화면마다 반복되던 패턴의 단일 소스.
export function Chip({
  active, accent = "#E63946", activeGradient, activeShadow, size = "sm", onClick, children, className = "",
}: {
  active: boolean;
  accent?: string;
  /** 활성 시 배경 그라데이션(있으면 accent 대신 사용) */
  activeGradient?: string;
  /** 활성 시 box-shadow(그라데이션 칩에 권장) */
  activeShadow?: string;
  size?: "sm" | "md";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const dims = size === "md" ? "px-3.5 py-2 text-sm active:scale-[0.97]" : "px-3 py-1.5 text-xs active:scale-95";
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-full font-bold transition ${dims} ${className}`}
      style={active
        ? { background: activeGradient ?? accent, color: "#fff", ...(activeShadow ? { boxShadow: activeShadow } : null) }
        : { background: "var(--surface)", color: "var(--text-2)" }}
    >
      {children}
    </button>
  );
}
