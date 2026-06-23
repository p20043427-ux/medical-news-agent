"use client";

import { useEffect, useState } from "react";

// 의존성 없는 경량 토스트. toast(...) 호출 → <Toaster/>가 표시.
type ToastAction = { label: string; onClick: () => void };
type ToastItem = { id: number; message: string; action?: ToastAction };

let counter = 0;
const listeners = new Set<(t: ToastItem) => void>();

export function toast(message: string, opts?: { action?: ToastAction }) {
  const item: ToastItem = { id: ++counter, message, action: opts?.action };
  listeners.forEach((l) => l(item));
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const add = (t: ToastItem) => {
      setItems((prev) => [...prev, t]);
      window.setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), t.action ? 6000 : 3000);
    };
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[100] flex flex-col items-center gap-2 px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}
      aria-live="polite"
    >
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex max-w-[92%] items-center gap-3 rounded-2xl px-4 py-3 text-sm shadow-lg animate-[slideUp_0.2s_ease-out]"
          style={{ background: "var(--text-1)", color: "var(--bg)" }}
        >
          <span className="font-semibold">{t.message}</span>
          {t.action && (
            <button
              onClick={() => { t.action!.onClick(); setItems((p) => p.filter((x) => x.id !== t.id)); }}
              className="shrink-0 rounded-full px-2.5 py-1 text-xs font-extrabold"
              style={{ background: "var(--bg)", color: "var(--text-1)" }}
            >
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
