"use client";

import { useState } from "react";
import { VERBS } from "@/lib/jp/verbs";
import Furigana, { tokensToText } from "./Furigana";
import SpeakerButton from "./SpeakerButton";

const GROUP_LABEL: Record<number, string> = {
  1: "1그룹 (五段)",
  2: "2그룹 (一段)",
  3: "3그룹 (불규칙)",
};
const GROUP_COLOR: Record<number, string> = {
  1: "bg-sky-50 text-sky-600",
  2: "bg-emerald-50 text-emerald-600",
  3: "bg-fuchsia-50 text-fuchsia-600",
};

export default function VerbView({ showFurigana }: { showFurigana: boolean }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="px-4 pb-24 pt-2">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">필수 동사</h1>
      <p className="mb-5 text-sm text-slate-400">
        생활 회화에 꼭 필요한 동사와 활용형(ます·て·ない)을 익혀요.
      </p>
      <div className="space-y-2.5">
        {VERBS.map((v) => {
          const isOpen = open === v.id;
          return (
            <div
              key={v.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
            >
              <button
                onClick={() => setOpen(isOpen ? null : v.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${GROUP_COLOR[v.group]}`}
                >
                  {v.group}G
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-xl font-bold text-slate-900">{v.dict}</span>
                  <span className="ml-2 text-sm text-slate-400">[{v.reading}]</span>
                </span>
                <span className="shrink-0 text-sm font-medium text-slate-600">
                  {v.meaning}
                </span>
                <SpeakerButton text={v.reading} size={32} />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                  <p className="mb-3 text-xs font-semibold text-slate-400">
                    {GROUP_LABEL[v.group]}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { label: "ます형", val: v.masu },
                      { label: "て형", val: v.te },
                      { label: "ない형", val: v.nai },
                    ].map((c) => (
                      <div key={c.label} className="rounded-xl bg-white p-2.5 shadow-sm">
                        <p className="text-[11px] text-slate-400">{c.label}</p>
                        <p className="mt-0.5 font-bold text-slate-800">{c.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2 rounded-xl bg-white p-3 shadow-sm">
                    <p className="text-base leading-relaxed text-slate-800">
                      <Furigana tokens={v.example.tokens} showFurigana={showFurigana} />
                      <span className="mt-1 block text-xs text-slate-400">
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
