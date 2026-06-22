# 단어 일러스트 (Phase 3)

앱은 이미 **이미지 준비 완료** 상태입니다. 이미지를 넣으면 자동으로 플래시카드·홈 덱 카드에 표시되고, 없으면 기존 `CardArt`(SVG)로 폴백합니다.

## 폴더 구조
- 단어별: `public/words/{단어id}.webp`
- 카테고리별: `public/words/cat-{category}.webp`
- 매니페스트: [`lib/jp/wordImages.ts`](lib/jp/wordImages.ts) — 존재하는 이미지의 id/category 등록 (생성 스크립트가 자동 갱신)

## 자동 생성 (OpenAI Images)
```bash
npm i -D tsx openai sharp
# .env.local 에 OPENAI_API_KEY=sk-... 추가

# 옵션 A — 핵심 카테고리 단어별 (가성비 추천)
npx tsx scripts/gen-images.ts --category greeting --limit 20

# 옵션 B — 카테고리당 1장 (저비용)
npx tsx scripts/gen-images.ts --per-category

# 앞에서부터 N개
npx tsx scripts/gen-images.ts --limit 100
```
- 비용: gpt-image-1 1024² ≈ $0.04~0.08/장. `--limit` 로 조절.
- 모든 카드가 같은 화풍이 되도록 고정 스타일 프롬프트를 사용합니다([scripts/gen-images.ts](scripts/gen-images.ts) 의 `STYLE`).
- 생성 후 자동으로 `webp` 변환·저장하고 매니페스트를 갱신 → 재배포만 하면 반영.

## 수동 추가
1. 이미지를 `public/words/{id}.webp` 로 저장
2. `lib/jp/wordImages.ts` 의 `WORD_IMAGES` 에 `"{id}"` 추가
