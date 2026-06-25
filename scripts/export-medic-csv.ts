// 의료교류 데이터를 감수용 CSV로 추출.
// 실행: npx tsx scripts/export-medic-csv.ts [출력경로]
import { writeFileSync } from "node:fs";
import { MED_PHRASEBOOK } from "../lib/medic/phrasebook";
import { MED_GLOSSARY } from "../lib/medic/glossary";
import { MED_CARDS } from "../lib/medic/cards";
import { MED_SIGNAGE } from "../lib/medic/signage";

const HEADER = [
  "구분", "분류", "한국어", "한국어로마자", "한국어발음(가나)",
  "일본어", "일본어읽기(가나)", "일본어발음(한글)", "메모/예문",
];

function esc(v: string | undefined): string {
  const s = (v ?? "").replace(/\r?\n/g, " ");
  return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function row(cells: (string | undefined)[]): string {
  return cells.map(esc).join(",");
}

const lines: string[] = [row(HEADER)];

for (const g of MED_PHRASEBOOK) {
  for (const p of g.phrases) {
    lines.push(row([`회화/${g.role}`, `${g.titleKo} / ${g.titleJa}`, p.ko, p.koRomaja, p.koPron, p.ja, p.jaReading, p.jaPron, [p.noteKo, p.noteJa].filter(Boolean).join(" / ")]));
  }
}
for (const c of MED_GLOSSARY) {
  for (const t of c.terms) {
    lines.push(row([`용어/${c.key}`, `${c.titleKo} / ${c.titleJa}`, t.ko, t.koRomaja, t.koPron, t.ja, t.jaReading, t.jaPron, [t.exampleKo, t.exampleJa].filter(Boolean).join(" / ")]));
  }
}
for (const g of MED_CARDS) {
  for (const c of g.cards) {
    lines.push(row([`카드/${g.key}`, `${g.titleKo} / ${g.titleJa}`, c.ko, c.koRomaja, c.koPron, c.ja, c.jaReading, c.jaPron, c.urgent ? "긴급" : ""]));
  }
}
for (const g of MED_SIGNAGE) {
  for (const s of g.signs) {
    lines.push(row([`표지판/${g.key}`, `${g.titleKo} / ${g.titleJa}`, s.ko, "", s.koPron, s.ja, s.jaReading, s.jaPron, ""]));
  }
}

const out = process.argv[2] ?? "medic-review.csv";
// BOM 추가로 Excel 한글/일본어 깨짐 방지
writeFileSync(out, "﻿" + lines.join("\n"), "utf8");
console.log(`wrote ${out}: ${lines.length - 1} rows`);
