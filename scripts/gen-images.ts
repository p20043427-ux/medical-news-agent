/**
 * 단어 일러스트 생성 파이프라인 (Phase 3)
 *
 * 기본 제공자(provider)는 **Pollinations.ai** — 무료, API 키 불필요.
 * 결과물을 public/words/ 에 저장하고 lib/jp/wordImages.ts 매니페스트를 갱신한다.
 *
 * 사전 준비:
 *   npm i -D tsx            # 무료(Pollinations) 모드는 이것만 있으면 됨
 *   (OpenAI 모드를 쓸 때만) npm i -D openai sharp + OPENAI_API_KEY
 *
 * 실행 예 (무료):
 *   npx tsx scripts/gen-images.ts --per-category                 # 카테고리당 1장 (13장)
 *   npx tsx scripts/gen-images.ts --category greeting --limit 20 # 인사 단어별 20장
 *   npx tsx scripts/gen-images.ts --limit 100                    # 앞에서부터 100장
 *
 * 유료(OpenAI, 더 일관된 품질):
 *   npx tsx scripts/gen-images.ts --openai --category greeting --limit 20
 */
import fs from "node:fs";
import path from "node:path";
import { VOCAB, VOCAB_CATEGORIES } from "../lib/jp/vocab";

const args = process.argv.slice(2);
const has = (f: string) => args.includes(f);
const val = (f: string) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

const CATEGORY = val("--category");
const LIMIT = val("--limit") ? Number(val("--limit")) : Infinity;
const PER_CATEGORY = has("--per-category");
const USE_OPENAI = has("--openai");

const OUT_DIR = path.join(process.cwd(), "public", "words");
const MANIFEST = path.join(process.cwd(), "lib", "jp", "wordImages.ts");

// 모든 카드가 같은 화풍을 갖도록 고정 스타일 프리픽스
const STYLE =
  "soft anime ghibli style illustration warm cinematic lighting watercolor " +
  "cute chibi character vertical card detailed background no text no watermark";

async function genFree(id: string, scene: string): Promise<boolean> {
  const file = path.join(OUT_DIR, `${id}.jpg`);
  if (fs.existsSync(file)) { console.log(`skip (exists): ${id}`); return true; }
  const prompt = encodeURIComponent(`${STYLE} ${scene}`);
  const url = `https://image.pollinations.ai/prompt/${prompt}?width=768&height=960&nologo=true&seed=7&model=flux`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error("too small (likely error)");
    fs.writeFileSync(file, buf);
    console.log(`✓ ${id} (${buf.length} bytes)`);
    return true;
  } catch (e) {
    console.error(`✗ ${id}:`, (e as Error).message);
    return false;
  }
}

async function genOpenAI(id: string, scene: string): Promise<boolean> {
  const file = path.join(OUT_DIR, `${id}.jpg`);
  if (fs.existsSync(file)) { console.log(`skip (exists): ${id}`); return true; }
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const res = await client.images.generate({ model: "gpt-image-1", prompt: `${STYLE}. ${scene}.`, size: "1024x1024", n: 1 });
    const b64 = res.data?.[0]?.b64_json;
    if (!b64) throw new Error("no image data");
    fs.writeFileSync(file, Buffer.from(b64, "base64"));
    console.log(`✓ ${id}`);
    return true;
  } catch (e) {
    console.error(`✗ ${id}:`, (e as Error).message);
    return false;
  }
}

const gen = USE_OPENAI ? genOpenAI : genFree;

async function main() {
  if (USE_OPENAI && !process.env.OPENAI_API_KEY) { console.error("OPENAI_API_KEY 미설정"); process.exit(1); }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const wordIds: string[] = [];
  const catKeys: string[] = [];

  if (PER_CATEGORY) {
    for (const cat of VOCAB_CATEGORIES) {
      const rep = VOCAB.find((w) => w.category === cat.key);
      if (!rep) continue;
      if (await gen(`cat-${cat.key}`, `${cat.label} ${rep.meaning}`)) catKeys.push(cat.key);
    }
  } else {
    let pool = VOCAB;
    if (CATEGORY) pool = pool.filter((w) => w.category === CATEGORY);
    pool = pool.slice(0, LIMIT);
    for (const w of pool) {
      if (await gen(w.id, `${w.meaning} japanese word ${w.word}`)) wordIds.push(w.id);
    }
  }

  // 매니페스트 병합
  const cur = fs.readFileSync(MANIFEST, "utf8");
  const pick = (re: RegExp) => new Set([...(cur.match(re)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]));
  const eWord = pick(/WORD_IMAGES = new Set<string>\(\[([\s\S]*?)\]\)/);
  const eCat = pick(/CATEGORY_IMAGES = new Set<string>\(\[([\s\S]*?)\]\)/);
  wordIds.forEach((id) => eWord.add(id));
  catKeys.forEach((k) => eCat.add(k));
  const fmt = (s: Set<string>) => [...s].map((x) => `  "${x}",`).join("\n");
  const next = cur
    .replace(/WORD_IMAGES = new Set<string>\(\[[\s\S]*?\]\)/, `WORD_IMAGES = new Set<string>([\n${fmt(eWord)}\n])`)
    .replace(/CATEGORY_IMAGES = new Set<string>\(\[[\s\S]*?\]\)/, `CATEGORY_IMAGES = new Set<string>([\n${fmt(eCat)}\n])`);
  fs.writeFileSync(MANIFEST, next);

  console.log(`\n완료. 단어 ${wordIds.length} / 카테고리 ${catKeys.length}. 매니페스트 갱신됨.`);
}

main();
