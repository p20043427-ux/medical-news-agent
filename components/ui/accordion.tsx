"use client";

import * as React from "react";

// 접이식 아코디언 아이템(컨트롤드). 헤더 우측 셰브론 회전 + aria-expanded.
export function AccordionItem({
  open, onToggle, header, children, bordered = true,
}: {
  open: boolean;
  onToggle: () => void;
  /** 헤더 좌측 내용(보통 flex-1 컨테이너). 셰브론은 자동 추가됨. */
  header: React.ReactNode;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl ${bordered ? "" : "shadow-sm"}`}
      style={{ background: "var(--card)", ...(bordered ? { border: "1px solid var(--border)" } : null) }}>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-center gap-2 p-4 text-left">
        {header}
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform"
          style={{ color: "var(--text-3)", transform: open ? "rotate(180deg)" : "none" }}
          fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}
