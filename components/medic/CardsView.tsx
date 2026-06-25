"use client";

import { useState } from "react";
import { MED_CARDS } from "@/lib/medic/cards";
import type { MedCard } from "@/lib/medic/types";
import { speakKo } from "@/lib/ko/speech";
import { speakJa } from "@/lib/jp/speech";
import { Chip } from "@/components/ui/chip";
import { tt, type UiLang } from "@/lib/i18n";
import { MED_ACCENT } from "./common";

export default function MedicCardsView({ uiLang }: { uiLang: UiLang }) {
  const [group, setGroup] = useState(MED_CARDS[0]?.key ?? "");
  const [zoom, setZoom] = useState<MedCard | null>(null);
  const active = MED_CARDS.find((g) => g.key === group) ?? MED_CARDS[0];

  return (
    <div className="pb-28 pt-3">
      <div className="px-4">
        <h1 className="mb-1 text-2xl font-extrabold" style={{ color: "var(--text-1)" }}>{tt(uiLang, "포인트-투-토크 카드", "ポイント・トゥ・トーク")}</h1>
        <p className="mb-3 text-sm" style={{ color: "var(--text-3)" }}>{tt(uiLang, "카드를 눌러 크게 보여주고, 🔊로 들려주세요. 오프라인에서도 동작해요.", "カードをタップして大きく見せ、🔊で聞かせましょう。オフラインでも動きます。")}</p>
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
        {MED_CARDS.map((g) => (
          <Chip key={g.key} active={g.key === group} size="md" onClick={() => setGroup(g.key)}
            accent={g.key === "emergency" ? "#E63946" : MED_ACCENT}>
            <span>{g.emoji}</span><span>{uiLang === "ja" ? g.titleJa : g.titleKo}</span>
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4">
        {active?.cards.map((c, i) => (
          <button key={i} onClick={() => setZoom(c)}
            className="flex flex-col items-center gap-1.5 rounded-2xl p-4 text-center shadow-sm transition active:scale-[0.97]"
            style={{ background: "var(--card)", border: c.urgent ? "2px solid #E63946" : "1px solid var(--border)" }}>
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-bold leading-tight" style={{ color: c.urgent ? "#E63946" : "var(--text-1)" }}>{uiLang === "ja" ? c.ko : c.ja}</span>
            <span className="text-xs leading-tight" style={{ color: "var(--text-3)" }}>{uiLang === "ja" ? c.ja : c.ko}</span>
          </button>
        ))}
      </div>

      {zoom && (
        <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 p-6"
          style={{ background: "var(--bg)" }} onClick={() => setZoom(null)}>
          <span className="text-7xl">{zoom.icon}</span>
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-3xl font-extrabold leading-snug" style={{ color: zoom.urgent ? "#E63946" : "var(--text-1)" }}>{zoom.ja}</p>
            <p className="mt-1 font-mono text-sm" style={{ color: "var(--text-3)" }}>{zoom.jaReading}</p>
            <div className="my-4 h-px w-40 self-center" style={{ background: "var(--border)" }} />
            <p className="text-3xl font-extrabold leading-snug" style={{ color: zoom.urgent ? "#E63946" : "var(--text-1)" }}>{zoom.ko}</p>
            <p className="mt-1 font-mono text-sm" style={{ color: "var(--text-3)" }}>{zoom.koRomaja}</p>
          </div>
          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => speakJa(zoom.jaReading)} className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "#E63946" }}>🔊 日本語</button>
            <button onClick={() => speakKo(zoom.ko)} className="rounded-full px-5 py-3 text-sm font-bold text-white" style={{ background: "#2563EB" }}>🔊 한국어</button>
          </div>
          <p className="text-xs" style={{ color: "var(--text-3)" }}>{tt(uiLang, "화면을 누르면 닫혀요", "画面をタップで閉じます")}</p>
        </div>
      )}
    </div>
  );
}
