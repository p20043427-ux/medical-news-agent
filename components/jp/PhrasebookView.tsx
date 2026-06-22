"use client";

import { useState } from "react";
import { TRAVEL_PHRASEBOOK } from "@/lib/jp/phrasebook";
import { speakJa } from "@/lib/jp/speech";

export default function PhrasebookView() {
  const [active, setActive] = useState(TRAVEL_PHRASEBOOK[0]?.key ?? "");
  const situation = TRAVEL_PHRASEBOOK.find((s) => s.key === active) ?? TRAVEL_PHRASEBOOK[0];

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>여행 회화집</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>상황을 고르고, 문장을 눌러 발음을 들어보세요. 🔊</p>
      </div>

      {/* 상황 탭 (가로 스크롤) */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {TRAVEL_PHRASEBOOK.map((s) => {
          const on = s.key === active;
          return (
            <button key={s.key} onClick={() => setActive(s.key)}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition active:scale-[0.97]"
              style={on
                ? { background: "linear-gradient(135deg,#00b894,#00cec9)", color: "#fff", boxShadow: "0 3px 10px rgba(0,184,148,.35)" }
                : { background: "var(--surface)", color: "var(--text-2)" }}>
              <span>{s.emoji}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* 문장 리스트 */}
      <div className="space-y-2.5 px-4">
        {situation?.phrases.map((p, i) => (
          <button key={i} onClick={() => speakJa(p.reading || p.jp)}
            className="flex w-full items-start gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.99]"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold leading-snug" style={{ color: "var(--text-1)" }}>{p.jp}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{p.reading}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{p.ko}</p>
              {p.tip && (
                <p className="mt-1.5 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: "#00b89414", color: "var(--text-2)" }}>💡 {p.tip}</p>
              )}
            </div>
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
              style={{ background: "#00b89418", color: "#00b894" }}>🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
