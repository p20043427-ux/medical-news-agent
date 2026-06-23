"use client";

import { useEffect, useRef } from "react";

// 접근성 확인 다이얼로그: role=dialog, aria-modal, esc 닫기, 열릴 때 포커스 이동·닫힐 때 복귀.
export function ConfirmDialog({
  open, title, description, confirmLabel = "확인", cancelLabel = "취소", destructive, onConfirm, onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    confirmRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      // 간이 포커스 트랩: Tab 이 다이얼로그 밖으로 새지 않도록 두 버튼 사이를 순환
      if (e.key === "Tab") {
        const focusables = confirmRef.current?.closest("[role=dialog]")?.querySelectorAll<HTMLElement>("button");
        if (focusables && focusables.length) {
          const first = focusables[0], last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus?.(); };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="relative w-full max-w-sm rounded-3xl p-6 shadow-xl animate-[slideUp_0.2s_ease-out]"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h2 id="confirm-title" className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{title}</h2>
        {description && <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{description}</p>}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button onClick={onCancel} className="rounded-2xl py-3 text-sm font-bold transition active:scale-[0.98]"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}>{cancelLabel}</button>
          <button ref={confirmRef} onClick={onConfirm} className="rounded-2xl py-3 text-sm font-bold text-white transition active:scale-[0.98]"
            style={{ background: destructive ? "#EF4444" : "#0984e3" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
