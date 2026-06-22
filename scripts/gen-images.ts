/**
 * 단어 일러스트 생성 파이프라인 (Phase 3)
 *
 * OpenAI Images(gpt-image-1)로 단어별/카테고리별 일러스트를 생성해
 * public/words/ 에 저장하고 lib/jp/wordImages.ts 매니페스트를 갱신한다.
 *
 * 사전 준비:
 *   npm i -D tsx openai sharp
 *   환경변수 OPENAI_API_KEY 설정 (.env.local 에 추가해도 됨)
 *
 * 실행 예:
 *   npx tsx scripts/gen-images.ts --category greeting --limit 20   # 인사 카테고리 20개 (옵션 A)
 *   npx tsx scripts/gen-images.ts --per-category                   # 카테고리당 1장 (옵션 B, 저비용)
 *   npx tsx scripts/gen-images.ts --limit 100                      # 앞에서부터 100개
 *
 * 비용: gpt-image-1 1024x1024 약 $0.04~0.08/장. --limit 로 조절하세요.
 */
import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";
import { VOCAB, VOCAB_CATEGORIES } from "../lib/jp/vocab";

const args = process.argv.slice(2);
const has = (f: string) => args.includes(f);
const val = (f: string) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

const CATEGORY = val("--category");
const LIMIT = val("--limit") ? Number(val("--limit")) : Infinity;
const PER_CATEGORY = has("--per-category");

const OUT_DIR = path.join(process.cwd(), "public", "words");
const MANIFEST = path.join(process.cwd(), "lib", "jp", "wordImages.ts");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 모든 카드가 같은 화풍을 갖도록 고정 스타일 프리픽스
const STYLE =
  "Soft anime / Studio-Ghibli-inspired illustration, warm cinematic lighting, " +
  "gentle watercolor texture, a cute chibi character in a scene, vertical card composition, " +
  "highly detailed background, no text, no letters, no watermark.";

function prompt(scene: string): string {
  return `${STYLE} Scene depicting: ${scene}.`;
}

async function gen(id: string, scene: string) {
  const file = path.join(OUT_DIR, `${id}.webp`);
  if (fs.existsSync(file)) { console.log(`skip (exists): ${id}`); return true; }
  try {
    const res = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt(scene),
      size: "1024x1024",
      n: 1,
    });
    const b64 = res.data?.[0]?.b64_json;
    if (!b64) throw new Error("no image data");
    // sharp 가 있으면 webp 로 변환, 없으면 png 저장
    const buf = Buffer.from(b64, "base64");
    try {
      const sharp = (await import("sharp")).default;
      await sharp(buf).resize(768, 768, { fit: "cover" }).webp({ quality: 82 }).toFile(file);
    } catch {
      fs.writeFileSync(file.replace(/\.webp$/, ".png"), buf);
    }
    console.log(`✓ ${id}`);
    return true;
  } catch (e) {
    console.error(`✗ ${id}:`, (e as Error).message);
    return false;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY 가 설정되지 않았습니다.");
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const wordIds: string[] = [];
  const catKeys: string[] = [];

  if (PER_CATEGORY) {
    // 옵션 B: 카테고리당 대표 1장
    for (const cat of VOCAB_CATEGORIES) {
      const rep = VOCAB.find((w) => w.category === cat.key);
      if (!rep) continue;
      const ok = await gen(`cat-${cat.key}`, `${cat.label} (${rep.meaning})`);
      if (ok) catKeys.push(cat.key);
    }
  } else {
    // 옵션 A: 단어별
    let pool = VOCAB;
    if (CATEGORY) pool = pool.filter((w) => w.category === CATEGORY);
    pool = pool.slice(0, LIMIT);
    for (const w of pool) {
      const ok = await gen(w.id, `${w.meaning} — Japanese word "${w.word}"`);
      if (ok) wordIds.push(w.id);
    }
  }

  // 매니페스트 병합 저장
  const cur = fs.readFileSync(MANIFEST, "utf8");
  const curWords = [...cur.matchAll(/WORD_IMAGES = new Set<string>\(\[([\s\S]*?)\]\)/)].length
    ? (cur.match(/WORD_IMAGES = new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "")
    : "";
  const existingWord = new Set([...curWords.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  const existingCat = new Set(
    [...(cur.match(/CATEGORY_IMAGES = new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1])
  );
  wordIds.forEach((id) => existingWord.add(id));
  catKeys.forEach((k) => existingCat.add(k));

  const fmt = (s: Set<string>) => [...s].map((x) => `  "${x}",`).join("\n");
  const next = cur
    .replace(/WORD_IMAGES = new Set<string>\(\[[\s\S]*?\]\)/, `WORD_IMAGES = new Set<string>([\n${fmt(existingWord)}\n])`)
    .replace(/CATEGORY_IMAGES = new Set<string>\(\[[\s\S]*?\]\)/, `CATEGORY_IMAGES = new Set<string>([\n${fmt(existingCat)}\n])`);
  fs.writeFileSync(MANIFEST, next);

  console.log(`\n완료. 단어 ${wordIds.length}개 / 카테고리 ${catKeys.length}개 생성. 매니페스트 갱신됨.`);
}

main();
