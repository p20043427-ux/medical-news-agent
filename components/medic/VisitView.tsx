"use client";

import { useEffect, useState } from "react";
import { MANNERS, VISIT_CHECKLIST } from "@/lib/medic/visit";
import { Segmented } from "@/components/ui/segmented";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

const CK_KEY = "medic-checklist";

export default function MedicVisitView({ uiLang }: { uiLang: UiLang }) {
  const [sub, setSub] = useState<"manners" | "checklist">("manners");
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
            { value: "manners", label: tt(uiLang, "🤝 매너 가이드", "🤝 マナーガイド") },
            { value: "checklist", label: tt(uiLang, `✅ 체크리스트 (${doneCount}/${VISIT_CHECKLIST.length})`, `✅ チェックリスト (${doneCount}/${VISIT_CHECKLIST.length})`) },
          ]} />
      </div>

      {sub === "manners" ? (
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
      ) : (
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
