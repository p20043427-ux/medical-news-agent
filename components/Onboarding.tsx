"use client";

import { useState } from "react";

const KEY = "app-onboarded";

export function shouldOnboard(): boolean {
  if (typeof window === "undefined") return false;
  return !window.localStorage.getItem(KEY);
}

const SLIDES = [
  {
    emoji: "🌸",
    title: "LinguaFlow에 오신 걸 환영해요",
    desc: "일본어·영어를 매일 조금씩, 과학적으로 익히는 학습 앱이에요.",
    grad: "linear-gradient(135deg,#E63946,#F4A261)",
  },
  {
    emoji: "🃏",
    title: "스와이프로 빠르게 분류",
    desc: "아는 단어는 왼쪽, 모르는 단어는 오른쪽으로 밀어요. 짧게 1회독(스키밍)하고 복습으로 굳혀요.",
    grad: "linear-gradient(135deg,#6c5ce7,#a29bfe)",
  },
  {
    emoji: "🔁",
    title: "복습·오답노트로 장기기억",
    desc: "SM-2 간격 반복이 복습 시점을 자동으로 잡아주고, 틀린 단어는 오답노트에 모여요.",
    grad: "linear-gradient(135deg,#0984e3,#74b9ff)",
  },
  {
    emoji: "🔥",
    title: "매일 목표 · 스트릭",
    desc: "일일 목표를 채우고 연속 학습일을 쌓아 보세요. 꾸준함이 실력이 됩니다.",
    grad: "linear-gradient(135deg,#00b894,#55efc4)",
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];

  function finish() {
    try { window.localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    onDone();
  }

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col px-6 py-10" style={{ background: "var(--bg)" }}>
      {/* 건너뛰기 */}
      <div className="flex justify-end">
        <button onClick={finish} className="text-sm font-semibold" style={{ color: "var(--text-3)" }}>
          건너뛰기
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8 grid h-28 w-28 place-items-center rounded-[2rem] text-6xl shadow-xl" style={{ background: s.grad }}>
          {s.emoji}
        </div>
        <h2 className="mb-3 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{s.title}</h2>
        <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{s.desc}</p>
      </div>

      {/* 인디케이터 */}
      <div className="mb-6 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            className="h-2 rounded-full transition-all"
            style={{ width: idx === i ? 22 : 8, background: idx === i ? "#E63946" : "var(--surface)" }}
          />
        ))}
      </div>

      <button
        onClick={() => (last ? finish() : setI((x) => x + 1))}
        className="w-full rounded-2xl py-4 font-bold text-white shadow-lg transition active:scale-[0.98]"
        style={{ background: "linear-gradient(135deg,#E63946,#F4A261)" }}
      >
        {last ? "시작하기" : "다음"}
      </button>
    </div>
  );
}
