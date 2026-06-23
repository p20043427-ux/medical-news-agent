"use client";

import { CONVERSATIONS } from "@/lib/jp/conversations";
import { speakJa } from "@/lib/jp/speech";
import Dictation, { type DictItem } from "@/components/Dictation";

const ITEMS: DictItem[] = (() => {
  const seen = new Set<string>();
  const out: DictItem[] = [];
  for (const c of CONVERSATIONS) {
    for (const l of c.lines) {
      const text = l.tokens.map((t) => t.t).join("");
      if (text.length < 4 || text.length > 28 || seen.has(text)) continue;
      seen.add(text);
      out.push({ audio: l.tokens.map((t) => t.r || t.t).join(""), text, ko: l.ko });
    }
  }
  return out;
})();

export default function DictationView({ onExit }: { onExit: () => void }) {
  return <Dictation items={ITEMS} speak={speakJa} accent="#0984e3" onExit={onExit} />;
}
