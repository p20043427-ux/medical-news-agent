"use client";

import { useEffect, useState } from "react";
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
  { key: "doctor", ko: "진료부", ja: "診療部", emoji: "🩺" },
  { key: "nurse", ko: "간호부", ja: "看護部", emoji: "💉" },
  { key: "exam", ko: "진료지원(검사)", ja: "検査・放射線", emoji: "🔬" },
  { key: "pharmacy", ko: "약제부", ja: "薬剤部", emoji: "💊" },
  { key: "rehab", ko: "재활치료", ja: "リハビリ", emoji: "🦽" },
  { key: "infection", ko: "감염관리", ja: "感染対策", emoji: "🦠" },
  { key: "qps", ko: "의료질·안전", ja: "医療の質・安全", emoji: "🛡️" },
  { key: "affairs", ko: "원무", ja: "医事課", emoji: "🧾" },
  { key: "finance", ko: "재무", ja: "経理・財務", emoji: "💰" },
  { key: "purchasing", ko: "구매", ja: "購買・調達", emoji: "📦" },
  { key: "admin", ko: "인사총무·교류", ja: "人事総務・交流", emoji: "📋" },
];

export default function MedicPhrasebookView({ uiLang, focusRole }: { uiLang: UiLang; focusRole?: MedRole | null }) {
  const [role, setRole] = useState<MedRole | "fav">("common");
  const [groupKey, setGroupKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { has, toggle, favs } = useFavorites("medic-phrase");

  useEffect(() => { if (focusRole) { setRole(focusRole); setGroupKey(null); setQuery(""); } }, [focusRole]);

  const groups = role === "fav" ? [] : MED_PHRASEBOOK.filter((g) => g.role === role);
  const openGroup = groups.find((g) => g.key === groupKey);
  const favPhrases = MED_PHRASEBOOK.flatMap((g) => g.phrases).filter((p) => favs.includes(p.ko));

  const q = query.trim().toLowerCase();
  const searchResults = q
    ? MED_PHRASEBOOK.flatMap((g) => g.phrases).filter((p) =>
        [p.ko, p.ja, p.koRomaja, p.jaReading, p.koPron, p.jaPron].some((s) => s?.toLowerCase().includes(q)))
    : [];

  function PhraseCard({ p }: { p: typeof MED_PHRASEBOOK[number]["phrases"][number] }) {
    const fav = has(p.ko);
    const note = uiLang === "ja" ? p.noteJa : p.noteKo;
    return (
      <div className="rounded-2xl p-4 shadow-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="mb-1 flex justify-end">
          <button onClick={() => toggle(p.ko)} aria-label={tt(uiLang, "즐겨찾기", "お気に入り")} className="text-lg" style={{ color: fav ? "#f0932b" : "var(--text-3)" }}>{fav ? "★" : "☆"}</button>
        </div>
        <BilingualRow {...p} uiLang={uiLang} />
        {note && (
          <p className="mt-2 rounded-lg px-2 py-1 text-[11px] leading-relaxed" style={{ background: `${MED_ACCENT}14`, color: "var(--text-2)" }}>💡 {note}</p>
        )}
      </div>
    );
  }

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "의료 전문 회화집", "医療会話集")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "직종·상황별 표현 · 한/일 문장을 눌러 발음 듣기", "職種・場面別の表現 · 韓/日の文をタップで発音")}</p>
        <div className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5" style={{ background: "var(--surface)" }}>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" style={{ color: "var(--text-3)" }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={tt(uiLang, "회화 검색 (한국어·일본어·발음)", "会話を検索（韓国語・日本語・発音）")}
            className="w-full bg-transparent text-sm outline-none" style={{ color: "var(--text-1)" }} />
          {query && <button onClick={() => setQuery("")} aria-label={tt(uiLang, "지우기", "クリア")} className="shrink-0 text-sm" style={{ color: "var(--text-3)" }}>✕</button>}
        </div>
      </div>

      {q ? (
        <div className="mt-3 px-4">
          <p className="mb-2 text-sm font-bold" style={{ color: "var(--text-1)" }}>{tt(uiLang, `검색 결과 ${searchResults.length}개`, `検索結果 ${searchResults.length}件`)}</p>
          {searchResults.length === 0 ? (
            <EmptyState emoji="🔍" title={tt(uiLang, "검색 결과가 없어요", "検索結果がありません")} description={tt(uiLang, "다른 검색어를 시도해 보세요.", "別のキーワードを試してください。")} />
          ) : (
            <div className="space-y-2.5">
              {searchResults.map((p, i) => <PhraseCard key={i} p={p} />)}
            </div>
          )}
        </div>
      ) : (
      <>
      <div className="mt-1 flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {ROLES.map((r) => (
          <Chip key={r.key} active={r.key === role} size="md" onClick={() => { setRole(r.key); setGroupKey(null); }}
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
            {favPhrases.map((p, i) => <PhraseCard key={i} p={p} />)}
          </div>
        )
      ) : openGroup ? (
        <div className="px-4">
          <button onClick={() => setGroupKey(null)} className="mb-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: "var(--surface)", color: "var(--text-2)" }}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            {tt(uiLang, "상황 목록", "場面一覧")}
          </button>
          <h2 className="mb-2 flex items-center gap-2 text-lg font-extrabold" style={{ color: "var(--text-1)" }}>
            <span>{openGroup.emoji}</span><span>{uiLang === "ja" ? openGroup.titleJa : openGroup.titleKo}</span>
            <span className="text-sm font-bold" style={{ color: "var(--text-3)" }}>{openGroup.phrases.length}</span>
          </h2>
          <div className="space-y-2.5">
            {openGroup.phrases.map((p, i) => <PhraseCard key={i} p={p} />)}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 px-4">
          {groups.map((g) => (
            <button key={g.key} onClick={() => setGroupKey(g.key)}
              className="flex flex-col items-start rounded-2xl p-4 text-left shadow-sm transition active:scale-[0.97]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <span className="text-2xl">{g.emoji}</span>
              <span className="mt-1.5 text-sm font-extrabold leading-tight" style={{ color: "var(--text-1)" }}>{uiLang === "ja" ? g.titleJa : g.titleKo}</span>
              <span className="mt-0.5 text-xs font-bold" style={{ color: MED_ACCENT }}>{tt(uiLang, `${g.phrases.length}개 표현`, `${g.phrases.length}表現`)}</span>
            </button>
          ))}
        </div>
      )}
      </>
      )}
    </div>
  );
}
