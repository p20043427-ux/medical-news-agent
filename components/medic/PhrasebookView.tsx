"use client";

import { useState } from "react";
import { MED_PHRASEBOOK } from "@/lib/medic/phrasebook";
import type { MedRole } from "@/lib/medic/types";
import { useFavorites } from "@/lib/favorites";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT, BilingualRow } from "./common";

const ROLES: { key: MedRole | "fav"; ko: string; ja: string; emoji: string }[] = [
  { key: "fav", ko: "즐겨찾기", ja: "お気に入り", emoji: "⭐" },
  { key: "common", ko: "공통", ja: "共通", emoji: "💬" },
  { key: "doctor", ko: "의사", ja: "医師", emoji: "🩺" },
  { key: "nurse", ko: "간호", ja: "看護", emoji: "💉" },
  { key: "exam", ko: "검사", ja: "検査", emoji: "🔬" },
  { key: "pharmacy", ko: "약제", ja: "薬剤", emoji: "💊" },
  { key: "admin", ko: "원무", ja: "事務", emoji: "📋" },
];

export default function MedicPhrasebookView({ uiLang }: { uiLang: UiLang }) {
  const [role, setRole] = useState<MedRole | "fav">("common");
  const { has, toggle, favs } = useFavorites("medic-phrase");

  const groups = role === "fav" ? [] : MED_PHRASEBOOK.filter((g) => g.role === role);
  const favPhrases = MED_PHRASEBOOK.flatMap((g) => g.phrases).filter((p) => favs.includes(p.ko));

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "의료 전문 회화집", "医療会話集")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "직종·상황별 표현 · 한/일 문장을 눌러 발음 듣기", "職種・場面別の表現 · 韓/日の文をタップで発音")}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {ROLES.map((r) => (
          <Chip key={r.key} active={r.key === role} size="md" onClick={() => setRole(r.key)}
            accent={r.key === "fav" ? "#f0932b" : MED_ACCENT}>
            <span>{r.emoji}</span><span>{uiLang === "ja" ? r.ja : r.ko}{r.key === "fav" && favs.length ? ` ${favs.length}` : ""}</span>
          </Chip>
        ))}
      </div>

      {role === "fav" ? (
        favPhrases.length === 0 ? (
          <EmptyState emoji="⭐" title={tt(uiLang, "즐겨찾기가 비어있어요", "お気に入りが空です")} description={tt(uiLang, "표현의 ☆를 눌러 자주 쓰는 문장을 모아 보세요.", "表現の☆を押してよく使う文を集めましょう。")} />
        ) : (
          <div className="space-y-2.5 px-4">
            {favPhrases.map((p, i) => (
              <div key={i} className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="mb-1 flex justify-end">
                  <button onClick={() => toggle(p.ko)} aria-label={tt(uiLang, "즐겨찾기", "お気に入り")} className="text-lg" style={{ color: "#f0932b" }}>★</button>
                </div>
                <BilingualRow {...p} uiLang={uiLang} />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-5 px-4">
          {groups.map((g) => (
            <section key={g.key}>
              <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold" style={{ color: "var(--text-1)" }}>
                <span>{g.emoji}</span><span>{uiLang === "ja" ? g.titleJa : g.titleKo}</span>
              </h2>
              <div className="space-y-2.5">
                {g.phrases.map((p, i) => {
                  const fav = has(p.ko);
                  const note = uiLang === "ja" ? p.noteJa : p.noteKo;
                  return (
                    <div key={i} className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                      <div className="mb-1 flex justify-end">
                        <button onClick={() => toggle(p.ko)} aria-label={tt(uiLang, "즐겨찾기", "お気に入り")} className="text-lg" style={{ color: fav ? "#f0932b" : "var(--text-3)" }}>{fav ? "★" : "☆"}</button>
                      </div>
                      <BilingualRow {...p} uiLang={uiLang} />
                      {note && (
                        <p className="mt-2 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: `${MED_ACCENT}14`, color: "var(--text-2)" }}>💡 {note}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
