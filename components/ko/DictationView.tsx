"use client";

import { KO_CONVERSATIONS } from "@/lib/ko/conversations";
import { speakKo } from "@/lib/ko/speech";
import Dictation, { type DictItem } from "@/components/Dictation";

// 회화 대사에서 받아쓰기 문장 풀 구성 (한국어 문장 듣고 고르기, 힌트는 일본어역)
const ITEMS: DictItem[] = (() => {
  const seen = new Set<string>();
  const out: DictItem[] = [];
  for (const c of KO_CONVERSATIONS) {
    for (const l of c.lines) {
      const text = l.ko;
      if (text.length < 3 || text.length > 28 || seen.has(text)) continue;
      seen.add(text);
      out.push({ audio: l.ko, text, ko: l.ja });
    }
  }
  return out;
})();

export default function KoDictationView({ onExit }: { onExit: () => void }) {
  return <Dictation items={ITEMS} speak={speakKo} accent="#2563EB" onExit={onExit} />;
}
