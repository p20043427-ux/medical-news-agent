"use client";

import { speakKo } from "@/lib/ko/speech";
import { speakJa } from "@/lib/jp/speech";
import type { UiLang } from "@/lib/i18n";

export const MED_ACCENT = "#0D9488"; // teal — 의료 테마

function Speaker({ onClick, accent }: { onClick: () => void; accent: string }) {
  return (
    <button onClick={onClick} aria-label="발음 듣기 / 発音"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg"
      style={{ background: `${accent}18`, color: accent }}>🔊</button>
  );
}

/**
 * 양국어 표현 행 — 방문자 언어(uiLang)의 반대 언어를 강조해 보여준다.
 * (한국 직원=ko → 일본어를 말해야 하므로 일본어 강조)
 */
export function BilingualRow({
  ko, koRomaja, koPron, ja, jaReading, jaPron, uiLang, accent = MED_ACCENT, emphasizeBoth = false,
}: {
  ko: string; koRomaja: string; koPron?: string; ja: string; jaReading: string; jaPron?: string;
  uiLang: UiLang; accent?: string; emphasizeBoth?: boolean;
}) {
  // 강조 언어: 방문자가 '말해야 하는' 상대국 언어
  const koPrimary = emphasizeBoth || uiLang === "ja";
  const jaPrimary = emphasizeBoth || uiLang === "ko";

  return (
    <div className="flex items-stretch gap-2">
      <div className="min-w-0 flex-1 space-y-2">
        {/* 일본어 — 한국 직원은 jaPron(한글 발음)으로 바로 읽고 말함 */}
        <button onClick={() => speakJa(jaReading)} className="flex w-full items-start gap-2 text-left">
          <span className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#E6394618", color: "#E63946" }}>日</span>
          <span className="min-w-0 flex-1">
            <span className={jaPrimary ? "block text-base font-bold leading-snug" : "block text-sm leading-snug"} style={{ color: "var(--text-1)" }}>{ja}</span>
            {jaPron && <span className="block text-[13px] font-semibold leading-snug" style={{ color: "#E63946" }}>🗣 {jaPron}</span>}
            <span className="block font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{jaReading}</span>
          </span>
        </button>
        {/* 한국어 — 일본 직원은 koPron(가타카나 발음)으로 바로 읽고 말함 */}
        <button onClick={() => speakKo(ko)} className="flex w-full items-start gap-2 text-left">
          <span className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "#2563EB18", color: "#2563EB" }}>한</span>
          <span className="min-w-0 flex-1">
            <span className={koPrimary ? "block text-base font-bold leading-snug" : "block text-sm leading-snug"} style={{ color: "var(--text-1)" }}>{ko}</span>
            {koPron && <span className="block text-[13px] font-semibold leading-snug" style={{ color: "#2563EB" }}>🗣 {koPron}</span>}
            <span className="block font-mono text-[11px]" style={{ color: "var(--text-3)" }}>{koRomaja}</span>
          </span>
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-1.5">
        <Speaker onClick={() => speakJa(jaReading)} accent="#E63946" />
        <Speaker onClick={() => speakKo(ko)} accent="#2563EB" />
      </div>
    </div>
  );
}
