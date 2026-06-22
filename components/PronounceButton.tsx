"use client";

import { useState } from "react";
import { isRecognitionSupported, recognizeOnce, pronunciationScore } from "@/lib/speech/recognize";

// 발음 따라하기 버튼: 누르면 마이크로 듣고 목표 문장과의 유사도를 표시.
export default function PronounceButton({
  target, lang, accent = "#6c5ce7",
}: {
  target: string;       // 채점 기준 문장 (가나 읽기 또는 영어)
  lang: "ja" | "en";
  accent?: string;
}) {
  const [state, setState] = useState<"idle" | "listening" | "done" | "error">("idle");
  const [score, setScore] = useState(0);

  if (!isRecognitionSupported()) return null;

  async function go(e: React.MouseEvent) {
    e.stopPropagation();
    setState("listening");
    try {
      const said = await recognizeOnce(lang === "ja" ? "ja-JP" : "en-US");
      setScore(pronunciationScore(target, said));
      setState("done");
    } catch {
      setState("error");
    }
  }

  const color = state === "done" ? (score >= 80 ? "#10B981" : score >= 50 ? "#F59E0B" : "#E63946") : accent;
  const label =
    state === "listening" ? "듣는 중…" :
    state === "done" ? `${score}점${score >= 80 ? " 🎉" : score >= 50 ? " 👍" : " 💪"}` :
    state === "error" ? "다시" : "따라 말하기";

  return (
    <button onClick={go} aria-label="발음 따라하기"
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition active:scale-95"
      style={{ background: `${color}1a`, color }}>
      <span>{state === "listening" ? "🔴" : "🎤"}</span>
      <span>{label}</span>
    </button>
  );
}
