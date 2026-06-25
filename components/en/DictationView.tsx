"use client";

import { EN_CONVERSATIONS } from "@/lib/en/conversations";
import { speakEn } from "@/lib/en/speech";
import Dictation, { type DictItem } from "@/components/Dictation";

const ITEMS: DictItem[] = (() => {
  const seen = new Set<string>();
  const out: DictItem[] = [];
  for (const c of EN_CONVERSATIONS) {
    for (const l of c.lines) {
      if (l.en.length < 6 || l.en.length > 60 || seen.has(l.en)) continue;
      seen.add(l.en);
      out.push({ audio: l.en, text: l.en, ko: l.ko });
    }
  }
  return out;
})();

export default function EnDictationView({ onExit }: { onExit: () => void }) {
  return <Dictation items={ITEMS} speak={speakEn} accent="#4361EE" onExit={onExit} />;
}
