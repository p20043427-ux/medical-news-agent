// 콘텐츠 무결성 검사 — 단어/문법 데이터의 구조적 오류를 잡는다.
// 실행: node scripts/check-content.mjs   (오류 있으면 exit 1)
import fs from "node:fs";

const issues = [];
const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

// ── 영어 어휘 ──
const EN_FILES = ["lib/en/vocab.ts", "lib/en/vocab-ea.ts", "lib/en/vocab-eb.ts", "lib/en/vocab-ec.ts", "lib/en/vocab-ed.ts"];
const LV = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);
const CAT = new Set(["basic-verbs", "daily-life", "emotions", "travel", "health", "workplace", "academic", "adjectives", "society", "advanced"]);
const seenEn = new Map();
for (const f of EN_FILES) {
  const t = read(f);
  for (const m of t.matchAll(/id:\s*"([^"]+)",\s*word:\s*"([^"]+)",\s*pronunciation:\s*"([^"]*)",\s*partOfSpeech:\s*"([^"]*)",\s*cefrLevel:\s*"([^"]*)",\s*category:\s*"([^"]*)",\s*meaning:\s*"([^"]*)"/g)) {
    const [, id, word, pron, , lv, cat, mean] = m;
    if (!LV.has(lv)) issues.push(`${f}:${id} 잘못된 레벨 ${lv}`);
    if (!CAT.has(cat)) issues.push(`${f}:${id} 잘못된 카테고리 ${cat}`);
    if (!mean) issues.push(`${f}:${id} 뜻 비어있음`);
    if (pron && !/^\/.*\/$/.test(pron)) issues.push(`${f}:${id} IPA 형식 오류 ${pron}`);
    if (seenEn.has(id)) issues.push(`${f}:${id} 중복 id`);
    seenEn.set(id, word);
  }
}

// ── 일본어 문법 ──
const g = read("lib/jp/grammar.ts");
for (const m of g.matchAll(/jp:\s*"([^"]+)",\s*reading:\s*"([^"]*)"/g)) {
  if (!m[2]) issues.push(`jp/grammar: "${m[1]}" reading 비어있음`);
}

if (issues.length) {
  console.error(`콘텐츠 오류 ${issues.length}건:`);
  issues.slice(0, 50).forEach((x) => console.error("  - " + x));
  process.exit(1);
}
console.log(`콘텐츠 검사 통과 — 영어 어휘 ${seenEn.size}개, 일본어 문법 OK`);
