"use client";

import { useEffect, useState } from "react";
import { MED_PHRASEBOOK } from "@/lib/medic/phrasebook";
import { MED_GLOSSARY } from "@/lib/medic/glossary";
import { MED_CARDS } from "@/lib/medic/cards";
import { MED_SIGNAGE } from "@/lib/medic/signage";
import { VISIT_CHECKLIST } from "@/lib/medic/visit";
import type { MedRole } from "@/lib/medic/types";
import { useFavorites } from "@/lib/favorites";
import { Progress } from "@/components/ui";
import { speak } from "@/lib/platform/speak";
import { kv } from "@/lib/platform/kv";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

const ALL_PHRASES = MED_PHRASEBOOK.flatMap((g) => g.phrases);
const TERM_COUNT = MED_GLOSSARY.reduce((n, c) => n + c.terms.length, 0);
const CARD_COUNT = MED_CARDS.reduce((n, g) => n + g.cards.length, 0);
const SIGN_COUNT = MED_SIGNAGE.reduce((n, g) => n + g.signs.length, 0);

function dailyIndex(key: string, mod: number): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return mod > 0 ? h % mod : 0;
}

const ROLES: { key: MedRole; ko: string; ja: string; emoji: string }[] = [
  { key: "doctor", ko: "진료부", ja: "診療部", emoji: "🩺" },
  { key: "nurse", ko: "간호부", ja: "看護部", emoji: "💉" },
  { key: "exam", ko: "검사", ja: "検査", emoji: "🔬" },
  { key: "pharmacy", ko: "약제", ja: "薬剤", emoji: "💊" },
  { key: "rehab", ko: "재활", ja: "リハビリ", emoji: "🦽" },
  { key: "infection", ko: "감염관리", ja: "感染対策", emoji: "🦠" },
  { key: "qps", ko: "의료질·안전", ja: "質・安全", emoji: "🛡️" },
  { key: "affairs", ko: "원무", ja: "医事課", emoji: "🧾" },
];

export default function MedicHomeView({ uiLang, onTab, onRole }: {
  uiLang: UiLang;
  onTab: (t: "phrase" | "glossary" | "cards" | "visit") => void;
  onRole: (r: MedRole) => void;
}) {
  const { favs, has, toggle } = useFavorites("medic-phrase");
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => { setChecked(kv.getJSON<string[]>("medic-checklist", [])); }, []);

  const today = new Date().toISOString().slice(0, 10);
  const todayPhrase = ALL_PHRASES[dailyIndex(today, ALL_PHRASES.length)];
  const prepPct = Math.round((checked.length / VISIT_CHECKLIST.length) * 100);

  const QUICK: { tab: "phrase" | "glossary" | "cards" | "visit"; emoji: string; label: string; sub: string; grad: string; urgent?: boolean }[] = [
    { tab: "cards", emoji: "🚨", label: tt(uiLang, "긴급 카드", "緊急カード"), sub: tt(uiLang, "오프라인 포인트-투-토크", "オフライン"), grad: "linear-gradient(135deg,#E63946,#F4A261)", urgent: true },
    { tab: "phrase", emoji: "💬", label: tt(uiLang, "전문 회화", "専門会話"), sub: tt(uiLang, "직종·상황별", "職種・場面別"), grad: "linear-gradient(135deg,#0D9488,#0EA5E9)" },
    { tab: "glossary", emoji: "📖", label: tt(uiLang, "의료용어", "医療用語"), sub: tt(uiLang, "한일 대역 검색", "韓日対訳"), grad: "linear-gradient(135deg,#2563EB,#7C3AED)" },
    { tab: "visit", emoji: "🎒", label: tt(uiLang, "방문 실무", "訪問実務"), sub: tt(uiLang, "매너·표지판·체크", "マナー・標識"), grad: "linear-gradient(135deg,#f59e0b,#e17055)" },
  ];

  const STATS = [
    { n: ALL_PHRASES.length, label: tt(uiLang, "회화", "会話") },
    { n: TERM_COUNT, label: tt(uiLang, "용어", "用語") },
    { n: CARD_COUNT, label: tt(uiLang, "카드", "カード") },
    { n: SIGN_COUNT, label: tt(uiLang, "표지판", "標識") },
  ];

  return (
    <div className="px-4 pb-28 pt-3">
      {/* 히어로 */}
      <div className="overflow-hidden rounded-3xl p-5 text-white shadow-sm" style={{ background: "linear-gradient(135deg,#0D9488,#0EA5E9)" }}>
        <div className="text-3xl">🏥</div>
        <h1 className="mt-1 text-xl font-extrabold">{tt(uiLang, "의료교류 도우미", "医療交流アシスタント")}</h1>
        <p className="mt-1 text-sm text-white/85">{tt(uiLang, "은성의료재단 ↔ 가마치그룹 상호방문을 한 손에.", "恩成医療財団 ↔ 蒲池グループの相互訪問をサポート。")}</p>
      </div>

      {/* 빠른 액션 */}
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {QUICK.map((q) => (
          <button key={q.tab} onClick={() => onTab(q.tab)}
            className="flex min-h-[92px] flex-col items-start justify-between rounded-2xl p-4 text-left text-white shadow-sm transition active:scale-95"
            style={{ background: q.grad }}>
            <span className="text-2xl">{q.emoji}</span>
            <span>
              <span className="block text-sm font-extrabold leading-tight">{q.label}</span>
              <span className="block text-[11px] text-white/85">{q.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {/* 오늘의 의료표현 */}
      {todayPhrase && (
        <div className="mt-4 rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#0D948812,#0EA5E912)", border: "1px solid var(--border)" }}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-extrabold" style={{ color: MED_ACCENT }}>{tt(uiLang, "🩺 오늘의 의료표현", "🩺 今日の医療表現")}</span>
            <button onClick={() => toggle(todayPhrase.ko)} aria-label={tt(uiLang, "즐겨찾기", "お気に入り")} className="text-lg" style={{ color: has(todayPhrase.ko) ? "#f0932b" : "var(--text-3)" }}>{has(todayPhrase.ko) ? "★" : "☆"}</button>
          </div>
          <button onClick={() => speak(uiLang === "ja" ? "ko" : "ja", uiLang === "ja" ? todayPhrase.ko : todayPhrase.jaReading)} className="w-full text-left">
            <p className="text-base font-extrabold leading-snug" style={{ color: "var(--text-1)" }}>{uiLang === "ja" ? todayPhrase.ja : todayPhrase.ko}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{uiLang === "ja" ? todayPhrase.jaReading : todayPhrase.koRomaja}</p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{uiLang === "ja" ? todayPhrase.ko : todayPhrase.ja} · {tt(uiLang, "🔊 눌러 듣기", "🔊 タップで再生")}</p>
          </button>
        </div>
      )}

      {/* 방문 준비 진행률 + 즐겨찾기 */}
      <div className="mt-3 grid grid-cols-1 gap-2.5">
        <button onClick={() => onTab("visit")} className="rounded-2xl p-4 text-left" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "🎒 방문 준비", "🎒 訪問準備")}</span>
            <span className="text-sm font-bold" style={{ color: prepPct >= 100 ? "#10B981" : "var(--text-2)" }}>{checked.length}/{VISIT_CHECKLIST.length}</span>
          </div>
          <Progress value={prepPct} indicatorStyle={{ background: prepPct >= 100 ? "#10B981" : `linear-gradient(90deg,${MED_ACCENT},#0EA5E9)` }} />
        </button>
        {favs.length > 0 && (
          <button onClick={() => onRole("doctor")} className="flex items-center gap-3 rounded-2xl p-4 text-left" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl" style={{ background: "#f0932b18" }}>★</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "즐겨찾기 표현", "お気に入り表現")}</span>
              <span className="block text-xs" style={{ color: "var(--text-3)" }}>{tt(uiLang, `${favs.length}개 저장됨 · 회화에서 모아보기`, `${favs.length}件保存 · 会話でまとめて`)}</span>
            </span>
          </button>
        )}
      </div>

      {/* 부서 바로가기 */}
      <h2 className="mt-5 mb-2 text-base font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "🏥 부서별 회화", "🏥 部署別の会話")}</h2>
      <div className="grid grid-cols-4 gap-2">
        {ROLES.map((r) => (
          <button key={r.key} onClick={() => onRole(r.key)}
            className="flex flex-col items-center gap-1 rounded-2xl p-2.5 text-center transition active:scale-95" style={{ background: "var(--surface)" }}>
            <span className="text-xl">{r.emoji}</span>
            <span className="text-[11px] font-bold leading-tight" style={{ color: "var(--text-2)" }}>{uiLang === "ja" ? r.ja : r.ko}</span>
          </button>
        ))}
      </div>

      {/* 콘텐츠 규모 */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-lg font-extrabold" style={{ color: MED_ACCENT }}>{s.n}</p>
            <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
