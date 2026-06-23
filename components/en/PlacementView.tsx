"use client";

import { useState } from "react";
import { EN_VOCAB } from "@/lib/en/vocab";
import PlacementTest, { type PlacementQ, type PlacementResult } from "@/components/PlacementTest";

const LEVEL_ORDER: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

function shuffle<T>(a: T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}

function build(): PlacementQ[] {
  const pool = [...EN_VOCAB].sort((a, b) => (LEVEL_ORDER[a.cefrLevel] ?? 9) - (LEVEL_ORDER[b.cefrLevel] ?? 9));
  const meanings = EN_VOCAB.map((w) => w.meaning);
  const N = 12, step = Math.max(1, Math.floor(pool.length / N));
  const qs: PlacementQ[] = [];
  const used = new Set<string>();
  for (let i = 0; i < N; i++) {
    const w = pool[Math.min(i * step, pool.length - 1)];
    if (used.has(w.id)) continue;
    used.add(w.id);
    const distract = shuffle(meanings.filter((m) => m !== w.meaning)).slice(0, 3);
    qs.push({ prompt: w.word, sub: w.pronunciation, options: shuffle([w.meaning, ...distract]), answer: w.meaning });
  }
  return qs;
}

function result(correct: number, total: number): PlacementResult {
  const r = correct / total;
  if (r < 0.4) return { emoji: "🌱", label: "A1 — 기초", desc: "기초 동사·일상 어휘부터 시작해요. 목표일을 설정하면 좋아요." };
  if (r < 0.75) return { emoji: "📗", label: "A2–B1 — 중급", desc: "감정·여행·직장 어휘와 문법을 확장해 보세요." };
  return { emoji: "🏆", label: "B1+ — 상급", desc: "학문·사회·고급 어휘와 모의시험(도전)으로 실력을 다져요." };
}

export default function EnPlacementView({ onExit }: { onExit: () => void }) {
  const [qs] = useState(build);
  return <PlacementTest questions={qs} getResult={result} accent="#4361EE" onExit={onExit}
    onDone={(r) => { try { localStorage.setItem("placement-en", JSON.stringify(r)); } catch { /* ignore */ } }} />;
}
