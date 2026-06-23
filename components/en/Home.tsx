"use client";

import { EN_VOCAB, EN_CATEGORIES } from "@/lib/en/vocab";
import { type EnProgress, isLearned, todayKey, dueIds } from "@/lib/en/progress";
import { EN_TRAVEL_PHRASEBOOK } from "@/lib/en/phrasebook";
import { EN_CONVERSATIONS } from "@/lib/en/conversations";
import { speakEn } from "@/lib/en/speech";
import { useFavorites } from "@/lib/favorites";
import { useRoleplay } from "@/lib/roleplay-progress";
import { useDailyActivity } from "@/lib/daily-activity";
import DailyMissions from "@/components/DailyMissions";
import { useEffect, useState } from "react";
import { Button, Progress } from "@/components/ui";

const EN_ALL_PHRASES = EN_TRAVEL_PHRASEBOOK.flatMap((s) => s.phrases);
function enDailyIndex(key: string, mod: number): number {
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return mod > 0 ? h % mod : 0;
}

const LEVEL_GRAD: Record<string, [string, string]> = {
  A1: ["#10B981", "#4361EE"],
  A2: ["#3B82F6", "#7209B7"],
  B1: ["#8B5CF6", "#4361EE"],
  B2: ["#EC4899", "#7209B7"],
  C1: ["#F59E0B", "#EF4444"],
  C2: ["#4361EE", "#7209B7"],
};

export default function EnHome({ progress, onStudyCategory, onGrammar, onReviewDue }: {
  progress: EnProgress;
  onStudyCategory: (key: string) => void;
  onGrammar?: () => void;
  onReviewDue?: () => void;
}) {
  const dueCount = dueIds(progress).length;
  const todayCount = progress.daily?.[todayKey()] ?? 0;
  const activity = useDailyActivity("en");
  const start = new Date(progress.startedAt);
  const dayN = Math.floor((Date.now() - start.getTime()) / 86400000) + 1;
  const { has, toggle } = useFavorites("en-phrase");
  const { data: rpData } = useRoleplay("en-roleplay");
  const rpDone = Object.keys(rpData).length;
  const rpTotal = EN_CONVERSATIONS.length;
  const [convRead, setConvRead] = useState(0);
  useEffect(() => { try { setConvRead((JSON.parse(localStorage.getItem("en-conv-read") || "[]") as string[]).length); } catch { /* ignore */ } }, []);
  const todayPhrase = EN_ALL_PHRASES[enDailyIndex(todayKey(), EN_ALL_PHRASES.length)];

  const ordered = [...EN_CATEGORIES].sort((a, b) => {
    const aDone = EN_VOCAB.filter((w) => w.category === a.key).every((w) => isLearned(progress, w.id));
    const bDone = EN_VOCAB.filter((w) => w.category === b.key).every((w) => isLearned(progress, w.id));
    return Number(aDone) - Number(bDone);
  });

  // 이어서 학습 — 가장 덜 익힌 카테고리
  const resume = ordered[0];
  const resumeWords = resume ? EN_VOCAB.filter((w) => w.category === resume.key) : [];
  const resumeKnown = resumeWords.filter((w) => isLearned(progress, w.id)).length;

  return (
    <div className="pb-28">
      {/* 오늘의 미션 */}
      <div className="px-5 pb-2 pt-2">
        <DailyMissions accent="#4361EE" missions={[
          { emoji: "📖", label: "단어 10개 학습", done: todayCount, goal: 10 },
          { emoji: "🗣️", label: "회화 1개 보기", done: activity.conversation, goal: 1 },
          { emoji: "🎯", label: "롤플레이·모의시험 1회", done: activity.roleplay + activity.exam, goal: 1 },
        ]} />
      </div>

      {/* 오늘 복습할 단어 */}
      {dueCount > 0 && onReviewDue && (
        <div className="px-5 pb-2 pt-2">
          <button onClick={onReviewDue}
            className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#0984e3,#7209B7)" }}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: "rgba(255,255,255,.2)" }}>🔁</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white/80">오늘 복습</span>
              <span className="block font-extrabold text-white">복습할 단어 {dueCount}개</span>
              <span className="block text-xs text-white/85">간격 반복으로 지금 복습하기</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}

      {/* 이어서 학습 */}
      {resume && (
        <div className="px-5 pb-2 pt-2">
          <button onClick={() => onStudyCategory(resume.key)}
            className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg,#4361EE,#7209B7)" }}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: "rgba(255,255,255,.2)" }}>{resume.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white/80">이어서 학습</span>
              <span className="block font-extrabold text-white">{resume.label}</span>
              <span className="block text-xs text-white/85">{resumeKnown}/{resumeWords.length} 익힘 · 탭하여 계속</span>
            </span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-white" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      )}

      <div className="px-5 pb-3 pt-1">
        <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: "var(--text-1)" }}>
          Day {dayN}
        </h1>
      </div>

      {/* 회화 진행 (읽음 · 롤플레이) */}
      {(convRead > 0 || rpDone > 0) && (
        <div className="px-5 pb-3">
          <div className="space-y-3 rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>📖 회화 읽음</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{convRead} / {rpTotal}</span>
              </div>
              <Progress value={rpTotal ? (convRead / rpTotal) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#10B981,#55efc4)" }} />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>🗣️ 롤플레이</span>
                <span className="text-sm font-bold" style={{ color: "var(--text-2)" }}>{rpDone} / {rpTotal}</span>
              </div>
              <Progress value={rpTotal ? (rpDone / rpTotal) * 100 : 0} indicatorStyle={{ background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
            </div>
          </div>
        </div>
      )}

      {/* 오늘의 표현 */}
      {todayPhrase && (
        <div className="px-5 pb-3">
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#4361EE12,#7209B712)", border: "1px solid var(--border)" }}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-extrabold" style={{ color: "#4361EE" }}>🌍 오늘의 표현</span>
              <button onClick={() => toggle(todayPhrase.en)} aria-label="즐겨찾기" className="text-lg" style={{ color: has(todayPhrase.en) ? "#f0932b" : "var(--text-3)" }}>{has(todayPhrase.en) ? "★" : "☆"}</button>
            </div>
            <button onClick={() => speakEn(todayPhrase.en)} className="w-full text-left">
              <p className="text-lg font-extrabold leading-snug" style={{ color: "var(--text-1)" }}>{todayPhrase.en}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--text-3)" }}>{todayPhrase.pronunciation}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{todayPhrase.ko} · 🔊 눌러 듣기</p>
            </button>
          </div>
        </div>
      )}

      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-1">
        {ordered.map((cat) => {
          const words = EN_VOCAB.filter((w) => w.category === cat.key);
          const total = words.length;
          const learned = words.filter((w) => isLearned(progress, w.id)).length;
          const unknown = total - learned;
          const pct = total ? Math.round((learned / total) * 100) : 0;
          const est = Math.max(1, Math.round(total * 0.3));
          const first = words[0];
          const status = learned === 0 ? "시작 전" : learned >= total ? "완료 🎉" : `${learned}/${total} 완료`;
          const grad = LEVEL_GRAD[first?.cefrLevel] ?? ["#4361EE", "#7209B7"];

          return (
            <div key={cat.key} className="w-[300px] shrink-0 snap-start rounded-[28px] p-3 shadow-sm"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              {/* 레이어드 카드 스택 */}
              <div className="relative h-44 pt-2">
                <div className="absolute left-1/2 top-0 h-40 w-[82%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }} />
                <div className="absolute left-1/2 top-1 h-40 w-[90%] -translate-x-1/2 rounded-2xl"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }} />
                <div className="absolute inset-x-0 top-2 mx-auto h-40 w-full overflow-hidden rounded-2xl"
                  style={{ boxShadow: "0 6px 18px rgba(0,0,0,.12)", background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
                  <div className="absolute right-3 top-3 text-5xl opacity-25 select-none">{cat.emoji}</div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3">
                    <p className="text-xl font-extrabold text-white">{first?.word}</p>
                    <p className="truncate text-xs text-white/85">{first?.pronunciation} · {first?.meaning}</p>
                  </div>
                  <span className="absolute right-2 top-2 rounded-full bg-black/35 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
                    {total}장
                  </span>
                </div>
              </div>

              <div className="px-1 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{cat.emoji}</span>
                    <h3 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>{cat.label}</h3>
                  </div>
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                    style={{ background: "var(--surface)", color: "var(--text-3)" }}>
                    {cat.cefrRange}
                  </span>
                </div>

                <Progress value={pct} className="mt-3" indicatorStyle={{ background: "linear-gradient(90deg,#4361EE,#7209B7)" }} />
                <div className="mt-1.5 flex items-center justify-between text-xs" style={{ color: "var(--text-3)" }}>
                  <span>{status}</span>
                  <span>~{est}분</span>
                </div>

                <p className="pt-3 text-center text-sm" style={{ color: "var(--text-2)" }}>
                  {unknown > 0 ? <>모르는 단어 <strong style={{ color: "var(--text-1)" }}>{unknown}개</strong>를 골라주세요.</> : "모두 익혔어요! 복습해 볼까요?"}
                </p>

                <Button variant="accent" size="free" onClick={() => onStudyCategory(cat.key)}
                  className="mt-3 w-full py-3.5 text-sm">
                  바로 시작
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-3 mt-7 px-5">
        <h2 className="text-lg font-extrabold" style={{ color: "var(--text-1)" }}>더 학습하기</h2>
      </div>
      <div className="px-5">
        <button onClick={onGrammar}
          className="flex w-full items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition active:scale-95"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="text-2xl">📖</span>
          <div>
            <p className="font-bold" style={{ color: "var(--text-1)" }}>문법 · 구동사</p>
            <p className="text-xs" style={{ color: "var(--text-3)" }}>핵심 문법과 구동사를 한 번에</p>
          </div>
          <svg viewBox="0 0 24 24" className="ml-auto h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-3)" }}><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}
