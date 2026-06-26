"use client";

import { useState } from "react";
import { useUiLang, tt } from "@/lib/i18n";
import { kv } from "@/lib/platform/kv";

const KEY = "app-onboarded-v2";

export function shouldOnboard(): boolean {
  return !kv.get(KEY);
}

const SLIDES: { emoji: string; title: [string, string]; desc: [string, string]; grad: string }[] = [
  {
    emoji: "🌸",
    title: ["LinguaFlow에 오신 걸 환영해요", "LinguaFlow へようこそ"],
    desc: ["일본어·영어를 매일 조금씩, 과학적으로 익히는 학습 앱이에요.", "日本語・英語を毎日少しずつ、科学的に学べる学習アプリです。"],
    grad: "linear-gradient(135deg,#E63946,#F4A261)",
  },
  {
    emoji: "🃏",
    title: ["스와이프로 빠르게 분류", "スワイプで素早く仕分け"],
    desc: ["아는 단어는 왼쪽, 모르는 단어는 오른쪽으로 밀어요. 짧게 1회독(스키밍)하고 복습으로 굳혀요.", "知っている単語は左、知らない単語は右へスワイプ。さっと一周（スキミング）して復習で定着させます。"],
    grad: "linear-gradient(135deg,#6c5ce7,#a29bfe)",
  },
  {
    emoji: "🔁",
    title: ["복습·오답노트로 장기기억", "復習・間違いノートで長期記憶"],
    desc: ["SM-2 간격 반복이 복습 시점을 자동으로 잡아주고, 틀린 단어는 오답노트에 모여요.", "SM-2 間隔反復が復習タイミングを自動で調整し、間違えた単語は間違いノートに集まります。"],
    grad: "linear-gradient(135deg,#0984e3,#74b9ff)",
  },
  {
    emoji: "🗣️",
    title: ["회화 · 여행 회화집 · 롤플레이", "会話・旅行会話集・ロールプレイ"],
    desc: ["상황별 회화와 여행 표현집을 듣고, 롤플레이로 직접 골라 대화를 완성해요. ⭐ 즐겨찾기와 발음 따라하기(🎤)도 가능해요.", "場面別の会話や旅行表現を聞き、ロールプレイで自分で選んで会話を完成。⭐お気に入りや発音練習（🎤）も可能です。"],
    grad: "linear-gradient(135deg,#6c5ce7,#0984e3)",
  },
  {
    emoji: "📝",
    title: ["모의시험 · 약점 분석", "模擬試験・弱点分析"],
    desc: ["입문·표준·도전 난이도의 모의시험으로 실력을 점검하고, 약점 분석과 오답 복습으로 약한 부분을 메워요.", "入門・標準・挑戦の難易度の模擬試験で実力を確認し、弱点分析と間違い復習で苦手を補います。"],
    grad: "linear-gradient(135deg,#0984e3,#74b9ff)",
  },
  {
    emoji: "🔥",
    title: ["매일 목표 · 오늘의 표현", "毎日の目標・今日の表現"],
    desc: ["일일 목표와 연속 학습일(스트릭)을 쌓고, 홈의 '오늘의 표현'으로 매일 새 표현을 만나요.", "毎日の目標と連続学習日（ストリーク）を積み上げ、ホームの「今日の表現」で毎日新しい表現に出会えます。"],
    grad: "linear-gradient(135deg,#00b894,#55efc4)",
  },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const lang = useUiLang();
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];

  function finish() {
    kv.set(KEY, "1");
    onDone();
  }

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md flex-col px-6 py-10" style={{ background: "var(--bg)" }}>
      {/* 건너뛰기 */}
      <div className="flex justify-end">
        <button onClick={finish} className="text-sm font-semibold" style={{ color: "var(--text-3)" }}>
          {tt(lang, "건너뛰기", "スキップ")}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8 grid h-28 w-28 place-items-center rounded-[2rem] text-6xl shadow-xl" style={{ background: s.grad }}>
          {s.emoji}
        </div>
        <h2 className="mb-3 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(lang, s.title[0], s.title[1])}</h2>
        <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{tt(lang, s.desc[0], s.desc[1])}</p>
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
        {last ? tt(lang, "시작하기", "始める") : tt(lang, "다음", "次へ")}
      </button>
    </div>
  );
}
