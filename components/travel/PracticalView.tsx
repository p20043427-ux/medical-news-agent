"use client";

import { SIM_GUIDE } from "@/lib/travel/practical";

// ─── PracticalView ─────────────────────────────────────────────────────────────

export default function PracticalView() {
  return (
    <div
      className="min-h-[100dvh] px-4 pt-5 pb-[60px]"
      style={{ background: "var(--bg)" }}
    >
      {/* Page header */}
      <div className="mb-5">
        <h2
          className="m-0 mb-1 text-[22px] font-black tracking-[-0.02em]"
          style={{ color: "var(--text-1)" }}
        >
          💡 실용 정보
        </h2>
        <p className="m-0 text-[13px]" style={{ color: "var(--text-3)" }}>
          유심·Wi-Fi 등 여행 필수 실용 정보
        </p>
      </div>

      {/* SIM / eSIM section */}
      <div className="mb-6">
        <p
          className="m-0 mb-3 text-[11px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--text-3)" }}
        >
          유심 · eSIM 가이드
        </p>

        {SIM_GUIDE.options.map((opt, i) => (
          <div
            key={i}
            className="rounded-2xl px-4 py-3.5 mb-2.5 shadow-sm"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Header row */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="text-base font-extrabold"
                style={{ color: "var(--text-1)" }}
              >
                {opt.name}
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: opt.type === "eSIM" ? "#dbeafe" : "#dcfce7",
                  color: opt.type === "eSIM" ? "#1e40af" : "#166534",
                }}
              >
                {opt.type}
              </span>
            </div>

            {/* Price */}
            <p
              className="m-0 mb-2 text-[13px] font-bold"
              style={{ color: "var(--text-2)" }}
            >
              {opt.price}
            </p>

            {/* Recommended for */}
            <p
              className="m-0 mb-2.5 text-xs flex items-start gap-1"
              style={{ color: "var(--text-3)" }}
            >
              <span className="shrink-0">🎯</span>
              <span>{opt.recommendedFor}</span>
            </p>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-lg px-2.5 py-2"
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                }}
              >
                <p
                  className="m-0 mb-1 text-[11px] font-bold"
                  style={{ color: "#166534" }}
                >
                  장점
                </p>
                <ul className="m-0 pl-3.5">
                  {opt.pros.map((p, j) => (
                    <li
                      key={j}
                      className="text-[11px] leading-relaxed"
                      style={{ color: "#15803d" }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-lg px-2.5 py-2"
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                }}
              >
                <p
                  className="m-0 mb-1 text-[11px] font-bold"
                  style={{ color: "#991b1b" }}
                >
                  단점
                </p>
                <ul className="m-0 pl-3.5">
                  {opt.cons.map((c, j) => (
                    <li
                      key={j}
                      className="text-[11px] leading-relaxed"
                      style={{ color: "#b91c1c" }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
