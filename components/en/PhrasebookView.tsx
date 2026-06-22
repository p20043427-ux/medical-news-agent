"use client";

import { useState } from "react";
import { EN_TRAVEL_PHRASEBOOK } from "@/lib/en/phrasebook";
import { speakEn } from "@/lib/en/speech";

export default function EnPhrasebookView() {
  const [active, setActive] = useState(EN_TRAVEL_PHRASEBOOK[0]?.key ?? "");
  const situation = EN_TRAVEL_PHRASEBOOK.find((s) => s.key === active) ?? EN_TRAVEL_PHRASEBOOK[0];

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>여행 회화집</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>상황을 고르고, 문장을 눌러 발음을 들어보세요. 🔊</p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {EN_TRAVEL_PHRASEBOOK.map((s) => {
          const on = s.key === active;
          return (
            <button key={s.key} onClick={() => setActive(s.key)}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition active:scale-[0.97]"
              style={on
                ? { background: "linear-gradient(135deg,#4361EE,#7209B7)", color: "#fff", boxShadow: "0 3px 10px rgba(67,97,238,.35)" }
                : { background: "var(--surface)", color: "var(--text-2)" }}>
              <span>{s.emoji}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5 px-4">
        {situation?.phrases.map((p, i) => (
          <button key={i} onClick={() => speakEn(p.en)}
            className="flex w-full items-start gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.99]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{p.en}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{p.pronunciation}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{p.ko}</p>
              {p.tip && (
                <p className="mt-1.5 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: "#4361EE14", color: "var(--text-2)" }}>💡 {p.tip}</p>
              )}
            </div>
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
              style={{ background: "#4361EE18", color: "#4361EE" }}>🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
