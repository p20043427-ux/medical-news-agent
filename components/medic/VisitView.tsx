"use client";

import { useEffect, useState } from "react";
import { MANNERS, VISIT_CHECKLIST } from "@/lib/medic/visit";
import { MED_SIGNAGE } from "@/lib/medic/signage";
import { speakKo } from "@/lib/ko/speech";
import { speakJa } from "@/lib/jp/speech";
import { Segmented } from "@/components/ui/segmented";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

const CK_KEY = "medic-checklist";

export default function MedicVisitView({ uiLang }: { uiLang: UiLang }) {
  const [sub, setSub] = useState<"manners" | "checklist" | "signage">("manners");
  const [checked, setChecked] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(MANNERS[0]?.key ?? null);

  useEffect(() => {
    try { setChecked(JSON.parse(window.localStorage.getItem(CK_KEY) || "[]")); } catch { /* ignore */ }
  }, []);

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { window.localStorage.setItem(CK_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }

  const doneCount = checked.length;

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "방문 실무", "訪問の実務")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "교류 매너 가이드와 준비 체크리스트", "交流マナーガイドと準備チェックリスト")}</p>
        <Segmented value={sub} onChange={setSub} accent={MED_ACCENT}
          options={[
            { value: "manners", label: tt(uiLang, "🤝 매너", "🤝 マナー") },
            { value: "signage", label: tt(uiLang, "🪧 표지판", "🪧 標識") },
            { value: "checklist", label: tt(uiLang, `✅ 준비 (${doneCount}/${VISIT_CHECKLIST.length})`, `✅ 準備 (${doneCount}/${VISIT_CHECKLIST.length})`) },
          ]} />
      </div>

      {sub === "signage" && (
        <div className="mt-3 space-y-5 px-4">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
            {tt(uiLang, "방문국 병원의 표지를 읽고 뜻을 바로 파악하세요. 발음을 눌러 들을 수 있어요.", "訪問先病院の標識を読んで意味をすぐ把握。発音をタップで聞けます。")}
          </p>
          {MED_SIGNAGE.map((g) => (
            <section key={g.key}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>
                <span>{g.emoji}</span><span>{uiLang === "ja" ? g.titleJa : g.titleKo}</span>
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {g.signs.map((s, i) => (
                  <div key={i} className="rounded-2xl p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="text-lg">{s.emoji}</span>
                      <span className="shrink-0 rounded px-1 py-0.5 text-[9px] font-bold" style={{ background: "#E6394618", color: "#E63946" }}>日</span>
                    </div>
                    <button onClick={() => speakJa(s.jaReading)} className="block w-full text-left">
                      <span className="block text-base font-bold leading-tight" style={{ color: "var(--text-1)" }}>{s.ja}</span>
                      <span className="block text-[12px] font-semibold" style={{ color: "#E63946" }}>🗣 {s.jaPron}</span>
                    </button>
                    <div className="my-1.5 h-px" style={{ background: "var(--border)" }} />
                    <button onClick={() => speakKo(s.ko)} className="block w-full text-left">
                      <span className="inline-block shrink-0 rounded px-1 py-0.5 text-[9px] font-bold" style={{ background: "#2563EB18", color: "#2563EB" }}>한</span>
                      <span className="block text-base font-bold leading-tight" style={{ color: "var(--text-1)" }}>{s.ko}</span>
                      <span className="block text-[12px] font-semibold" style={{ color: "#2563EB" }}>🗣 {s.koPron}</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {sub === "manners" && (
        <div className="mt-3 space-y-2.5 px-4">
          {MANNERS.map((s) => {
            const isOpen = open === s.key;
            return (
              <div key={s.key} className="overflow-hidden rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <button onClick={() => setOpen(isOpen ? null : s.key)} className="flex w-full items-center gap-3 p-4 text-left">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="flex-1 font-bold" style={{ color: "var(--text-1)" }}>{uiLang === "ja" ? s.titleJa : s.titleKo}</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform" style={{ color: "var(--text-3)", transform: isOpen ? "rotate(180deg)" : "none" }} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                {isOpen && (
                  <div className="space-y-3 p-4 pt-0">
                    {s.items.map((it, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: "var(--surface)" }}>
                        <p className="mb-1 flex items-center gap-2 text-sm font-bold" style={{ color: "var(--text-1)" }}>
                          <span>{it.icon}</span><span>{uiLang === "ja" ? it.titleJa : it.titleKo}</span>
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--text-2)" }}>{uiLang === "ja" ? it.bodyJa : it.bodyKo}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {sub === "checklist" && (
        <div className="mt-3 px-4">
          <ul className="space-y-2">
            {VISIT_CHECKLIST.map((it) => {
              const on = checked.includes(it.id);
              return (
                <li key={it.id}>
                  <button onClick={() => toggleCheck(it.id)} className="flex w-full items-center gap-3 rounded-2xl p-3.5 text-left transition active:scale-[0.99]"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-sm text-white"
                      style={{ background: on ? MED_ACCENT : "var(--surface)", border: on ? "none" : "1px solid var(--border)" }}>{on ? "✓" : ""}</span>
                    <span className="text-sm font-semibold" style={{ color: on ? "var(--text-3)" : "var(--text-1)", textDecoration: on ? "line-through" : "none" }}>
                      {uiLang === "ja" ? it.ja : it.ko}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 rounded-xl p-3 text-xs leading-relaxed" style={{ background: `${MED_ACCENT}12`, color: "var(--text-2)" }}>
            {tt(uiLang, "체크 상태는 이 기기에 저장돼요. 방문 전 마지막으로 점검하세요.", "チェック状態はこの端末に保存されます。訪問前に最終確認しましょう。")}
          </p>
        </div>
      )}
    </div>
  );
}
