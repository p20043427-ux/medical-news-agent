"use client";

import { useMemo, useState } from "react";
import { VERBS } from "@/lib/jp/verbs";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";
import { useUiLang, tt } from "@/lib/i18n";

const GROUP_LABEL: Record<number, [string, string]> = {
  1: ["1그룹 (五段)", "1グループ（五段）"],
  2: ["2그룹 (一段)", "2グループ（一段）"],
  3: ["3그룹 (불규칙)", "3グループ（不規則）"],
};
// 테마 무관(틴트 배경 + 컬러 텍스트)으로 라이트/다크 모두 자연스러운 그룹 색
const GROUP_COLOR: Record<number, string> = {
  1: "#4361EE",
  2: "#10B981",
  3: "#9B59B6",
};

export default function VerbView({ showFurigana }: { showFurigana: boolean }) {
  const lang = useUiLang();
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<0 | 1 | 2 | 3>(0);

  const list = useMemo(
    () => (filter === 0 ? VERBS : VERBS.filter((v) => v.group === filter)),
    [filter],
  );

  return (
    <div className="px-4 pb-28 pt-2">
      <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>
        {tt(lang, "필수 동사", "必須動詞")}
      </h1>
      <p className="mb-4 text-sm" style={{ color: "var(--text-3)" }}>
        {tt(lang, "생활 회화 동사와 활용형(ます·て·ない)을 익혀요.", "日常会話の動詞と活用形（ます・て・ない）を学びます。")}
      </p>

      {/* 그룹 필터 */}
      <div className="mb-4 flex gap-2">
        {([0, 1, 2, 3] as const).map((g) => {
          const on = filter === g;
          const label = g === 0 ? tt(lang, "전체", "すべて") : tt(lang, `${g}그룹`, `${g}グループ`);
          return (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95"
              style={
                on
                  ? { background: g === 0 ? "#E63946" : GROUP_COLOR[g], color: "#fff" }
                  : { background: "var(--surface)", color: "var(--text-3)" }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {list.map((v) => {
          const isOpen = open === v.id;
          const gc = GROUP_COLOR[v.group];
          return (
            <div
              key={v.id}
              className="overflow-hidden rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : v.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold"
                  style={{ background: `${gc}1f`, color: gc }}
                >
                  {v.group}G
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-xl font-bold" style={{ color: "var(--text-1)" }}>
                    {v.dict}
                  </span>
                  <span className="ml-2 text-sm" style={{ color: "var(--text-3)" }}>
                    [{v.reading}]
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium" style={{ color: "var(--text-2)" }}>
                  {v.meaning}
                </span>
                <SpeakerButton text={v.reading} size={32} />
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 transition-transform"
                  style={{ color: "var(--text-3)", transform: isOpen ? "rotate(180deg)" : "none" }}
                  fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen && (
                <div className="p-4 pt-0">
                  <p className="mb-2 text-xs font-semibold" style={{ color: gc }}>
                    {tt(lang, GROUP_LABEL[v.group][0], GROUP_LABEL[v.group][1])}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: tt(lang, "ます형", "ます形"), val: v.masu },
                      { label: tt(lang, "て형", "て形"), val: v.te },
                      { label: tt(lang, "ない형", "ない形"), val: v.nai },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="rounded-xl p-2.5"
                        style={{ background: "var(--surface)" }}
                      >
                        <p className="text-[11px]" style={{ color: "var(--text-3)" }}>{c.label}</p>
                        <p className="mt-0.5 font-bold" style={{ color: "var(--text-1)" }}>{c.val}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-3 flex items-start justify-between gap-2 rounded-xl p-3"
                    style={{ background: "var(--surface)" }}
                  >
                    <p className="text-base leading-relaxed" style={{ color: "var(--text-1)" }}>
                      <Furigana tokens={v.example.tokens} showFurigana={showFurigana} />
                      <span className="mt-1 block text-xs" style={{ color: "var(--text-3)" }}>
                        {v.example.ko}
                      </span>
                    </p>
                    <SpeakerButton text={tokensToText(v.example.tokens)} size={32} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
