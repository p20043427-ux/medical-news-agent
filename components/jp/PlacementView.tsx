"use client";

import { useState } from "react";
import { VOCAB } from "@/lib/jp/vocab";
import PlacementTest, { type PlacementQ, type PlacementResult } from "@/components/PlacementTest";

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function build(): PlacementQ[] {
  const pool = [...VOCAB].sort((a, b) => a.reading.length - b.reading.length); // 짧은(쉬운)→긴(어려운)
  const meanings = VOCAB.map((w) => w.meaning);
  const N = 12, step = Math.max(1, Math.floor(pool.length / N));
  const qs: PlacementQ[] = [];
  const used = new Set<string>();
  for (let i = 0; i < N; i++) {
    const w = pool[Math.min(i * step, pool.length - 1)];
    if (used.has(w.id)) continue;
    used.add(w.id);
    const distract = shuffle(meanings.filter((m) => m !== w.meaning)).slice(0, 3);
    qs.push({ prompt: w.word, sub: `[${w.reading}]`, options: shuffle([w.meaning, ...distract]), answer: w.meaning });
  }
  return qs;
}

function result(correct: number, total: number): PlacementResult {
  const r = correct / total;
  if (r < 0.4) return { emoji: "🌱", label: "입문 — 가나·기초 단어", desc: "가나(히라가나·가타카나)와 기초 단어부터 차근히 시작해요." };
  if (r < 0.75) return { emoji: "📗", label: "기초 — N5 단어·회화", desc: "N5 단어와 생활 회화 위주로 학습하면 좋아요." };
  return { emoji: "🏆", label: "탄탄 — 문법·모의시험", desc: "N5 문법과 모의시험으로 실전 감각을 키워보세요." };
}

export default function PlacementView({ onExit }: { onExit: () => void }) {
  const [qs] = useState(build);
  return <PlacementTest questions={qs} getResult={result} accent="#E63946" onExit={onExit}
    onDone={(r) => { try { localStorage.setItem("placement-jp", JSON.stringify(r)); } catch { /* ignore */ } }} />;
}
