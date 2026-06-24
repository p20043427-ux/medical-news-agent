"use client";

import { SIM_GUIDE } from "@/lib/travel/practical";

// ─── PracticalView ─────────────────────────────────────────────────────────────

export default function PracticalView() {
  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100dvh",
        padding: "20px 16px 60px",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 22,
            fontWeight: 900,
            color: "var(--text-1)",
            letterSpacing: "-0.02em",
          }}
        >
          💡 실용 정보
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "var(--text-3)",
          }}
        >
          유심·Wi-Fi 등 여행 필수 실용 정보
        </p>
      </div>

      {/* SIM / eSIM section */}
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            margin: "0 0 12px",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--text-3)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          유심 · eSIM 가이드
        </p>

        {SIM_GUIDE.options.map((opt, i) => (
          <div
            key={i}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: "var(--text-1)",
                }}
              >
                {opt.name}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background:
                    opt.type === "eSIM" ? "#dbeafe" : "#dcfce7",
                  color:
                    opt.type === "eSIM" ? "#1e40af" : "#166534",
                }}
              >
                {opt.type}
              </span>
            </div>

            {/* Price */}
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-2)",
              }}
            >
              {opt.price}
            </p>

            {/* Recommended for */}
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 12,
                color: "var(--text-3)",
                display: "flex",
                alignItems: "flex-start",
                gap: 4,
              }}
            >
              <span style={{ flexShrink: 0 }}>🎯</span>
              <span>{opt.recommendedFor}</span>
            </p>

            {/* Pros & Cons */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <div
                style={{
                  background: "#f0fdf4",
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: "1px solid #bbf7d0",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#166534",
                  }}
                >
                  장점
                </p>
                <ul style={{ margin: 0, paddingLeft: 14 }}>
                  {opt.pros.map((p, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 11,
                        color: "#15803d",
                        lineHeight: 1.6,
                      }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  background: "#fef2f2",
                  borderRadius: 8,
                  padding: "8px 10px",
                  border: "1px solid #fecaca",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#991b1b",
                  }}
                >
                  단점
                </p>
                <ul style={{ margin: 0, paddingLeft: 14 }}>
                  {opt.cons.map((c, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 11,
                        color: "#b91c1c",
                        lineHeight: 1.6,
                      }}
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
