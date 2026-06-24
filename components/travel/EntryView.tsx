"use client";

import { useState } from "react";
import { ENTRY_SECTIONS } from "@/lib/travel/entry";
import { EntrySection } from "@/lib/travel/types";

/* ── 색상 상수 ─────────────────────────────────────────── */
const ACCENT = "#E63946";
const ACCENT_LIGHT = "#E6394612";
const OFFICER_BG = "#1d4ed8";   /* 파란색 — 심사관 */
const TRAVELER_BG = "#ffffff";  /* 흰색 — 여행자 */

/* ── 섹션 탭 ────────────────────────────────────────────── */
function SectionTabs({
  sections,
  activeKey,
  onChange,
}: {
  sections: EntrySection[];
  activeKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div
      className="flex gap-1.5 overflow-x-auto px-4 pb-3 pt-1"
      style={{ scrollbarWidth: "none" }}
    >
      {sections.map((s) => {
        const on = s.key === activeKey;
        return (
          <button
            key={s.key}
            onClick={() => onChange(s.key)}
            aria-pressed={on}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition active:scale-[0.97]"
            style={
              on
                ? {
                    background: `linear-gradient(135deg, ${ACCENT}, #F4A261)`,
                    color: "#fff",
                    boxShadow: `0 3px 12px ${ACCENT}44`,
                  }
                : {
                    background: "var(--surface)",
                    color: "var(--text-2)",
                  }
            }
          >
            <span>{s.emoji}</span>
            <span>{s.title}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── 대화 버블 ──────────────────────────────────────────── */
function DialogueBubble({
  speaker,
  jp,
  reading,
  ko,
}: {
  speaker: "officer" | "traveler";
  jp: string;
  reading: string;
  ko: string;
}) {
  const isOfficer = speaker === "officer";
  return (
    <div
      className={`flex flex-col gap-0.5 ${isOfficer ? "items-start" : "items-end"}`}
    >
      <span
        className="mb-0.5 text-[10px] font-bold"
        style={{ color: "var(--text-3)" }}
      >
        {isOfficer ? "🛂 심사관" : "🧳 여행자"}
      </span>
      <div
        className="max-w-[88%] rounded-2xl px-4 py-2.5"
        style={
          isOfficer
            ? {
                background: OFFICER_BG,
                color: "#fff",
                borderBottomLeftRadius: "4px",
              }
            : {
                background: TRAVELER_BG,
                color: "#1a1a2e",
                border: "1px solid var(--border)",
                borderBottomRightRadius: "4px",
              }
        }
      >
        {/* 일본어 큰 글씨 */}
        <p className="text-base font-bold leading-snug">{jp}</p>
        {/* 히라가나 읽기 작은 글씨 */}
        <p
          className="mt-0.5 text-[11px] leading-relaxed"
          style={{
            color: isOfficer ? "rgba(255,255,255,0.7)" : "var(--text-3)",
          }}
        >
          {reading}
        </p>
        {/* 한국어 뜻 */}
        <p
          className="mt-1 text-xs font-semibold"
          style={{
            color: isOfficer ? "rgba(255,255,255,0.9)" : "var(--text-2)",
          }}
        >
          {ko}
        </p>
      </div>
    </div>
  );
}

/* ── Step 아코디언 카드 ──────────────────────────────────── */
function StepCard({
  step,
  defaultOpen,
}: {
  step: EntrySection["steps"][number];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="overflow-hidden rounded-2xl transition-shadow"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {/* 헤더 — 번호 + 제목 + 토글 */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {/* 번호 배지 */}
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, #F4A261)`,
          }}
        >
          {step.no}
        </span>
        {/* 제목 */}
        <span
          className="flex-1 text-sm font-bold leading-snug"
          style={{ color: "var(--text-1)" }}
        >
          {step.title}
        </span>
        {/* 토글 화살표 */}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
          style={{
            color: "var(--text-3)",
            transform: open ? "rotate(180deg)" : "none",
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* 본문 */}
      {open && (
        <div className="space-y-3 px-4 pb-4">
          {/* 본문 텍스트 (줄바꿈 처리) */}
          <div
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {step.body.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-1" : ""}>
                {line}
              </p>
            ))}
          </div>

          {/* 주의 사항 */}
          {step.caution && (
            <div
              className="rounded-xl px-3.5 py-2.5 text-xs leading-relaxed"
              style={{
                background: "#F597031A",
                borderLeft: "3px solid #F59703",
                color: "var(--text-2)",
              }}
            >
              <span className="font-bold" style={{ color: "#B45309" }}>
                ⚠️ 주의{" "}
              </span>
              {step.caution}
            </div>
          )}

          {/* 대화 */}
          {step.dialogue && step.dialogue.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <p
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: "var(--text-3)" }}
              >
                💬 실전 대화
              </p>
              <div
                className="space-y-3 rounded-2xl p-3"
                style={{ background: "var(--surface)" }}
              >
                {step.dialogue.map((d, i) => (
                  <DialogueBubble
                    key={i}
                    speaker={d.speaker}
                    jp={d.jp}
                    reading={d.reading}
                    ko={d.ko}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 섹션 뷰 (desc 카드 + step 목록 + 팁) ────────────────── */
function SectionView({ section }: { section: EntrySection }) {
  return (
    <div className="space-y-3 px-4 pb-28">
      {/* desc 설명 카드 */}
      <div
        className="flex items-center gap-3 rounded-2xl p-4"
        style={{
          background: ACCENT_LIGHT,
          border: `1px solid ${ACCENT}22`,
        }}
      >
        <span className="text-3xl">{section.emoji}</span>
        <div>
          <p
            className="text-base font-extrabold leading-snug"
            style={{ color: "var(--text-1)" }}
          >
            {section.title}
          </p>
          <p
            className="mt-0.5 text-sm leading-relaxed"
            style={{ color: "var(--text-2)" }}
          >
            {section.desc}
          </p>
        </div>
      </div>

      {/* Step 카드 목록 */}
      <div className="space-y-2.5">
        {section.steps.map((step, i) => (
          <StepCard key={step.no} step={step} defaultOpen={i === 0} />
        ))}
      </div>

      {/* 팁 섹션 */}
      {section.tips.length > 0 && (
        <div
          className="rounded-2xl p-4"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="mb-3 text-sm font-extrabold"
            style={{ color: "var(--text-1)" }}
          >
            💡 알아두면 좋은 팁
          </p>
          <ul className="space-y-2.5">
            {section.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-2)" }}
                >
                  {tip}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── 메인 컴포넌트 ───────────────────────────────────────── */
export default function EntryView() {
  const [activeKey, setActiveKey] = useState<string>(
    ENTRY_SECTIONS[0]?.key ?? ""
  );

  const activeSection =
    ENTRY_SECTIONS.find((s) => s.key === activeKey) ?? ENTRY_SECTIONS[0];

  return (
    <div className="pt-3">
      {/* 페이지 헤더 */}
      <div className="px-4 pb-3">
        <h1
          className="mb-0.5 text-2xl font-extrabold"
          style={{ color: "var(--text-1)" }}
        >
          ✈️ 일본 입출국 가이드
        </h1>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          단계별 절차와 실전 대화로 완벽 준비
        </p>
      </div>

      {/* 섹션 선택 탭 (가로 스크롤) */}
      <SectionTabs
        sections={ENTRY_SECTIONS}
        activeKey={activeKey}
        onChange={setActiveKey}
      />

      {/* 선택된 섹션 내용 */}
      {activeSection && <SectionView section={activeSection} />}
    </div>
  );
}
