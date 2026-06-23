"use client";

// 세그먼트 컨트롤 — 탭/토글 형태의 반복 패턴 단일화.
// variant "solid": 활성 항목이 accent 배경(흰 글자)
// variant "pill":  활성 항목이 카드 배경 + 그림자(iOS 세그먼트 느낌)
export function Segmented<T extends string>({
  options, value, onChange, accent = "#E63946", variant = "solid", size = "md", className = "",
}: {
  options: { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  accent?: string;
  variant?: "solid" | "pill";
  size?: "sm" | "md";
  className?: string;
}) {
  const pad = size === "sm" ? "py-1.5 text-xs" : "py-2.5 text-sm";
  return (
    <div className={`flex gap-1 rounded-2xl p-1 ${className}`} style={{ background: "var(--surface)" }} role="tablist">
      {options.map((o) => {
        const on = o.value === value;
        const style = variant === "solid"
          ? (on ? { background: accent, color: "#fff" } : { color: "var(--text-3)" })
          : (on
              ? { background: "var(--card)", color: "var(--text-1)", boxShadow: "0 1px 3px rgba(0,0,0,.12)" }
              : { color: "var(--text-3)" });
        return (
          <button key={o.value} role="tab" aria-selected={on} onClick={() => onChange(o.value)}
            className={`flex-1 rounded-xl font-bold transition ${pad}`} style={style}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
