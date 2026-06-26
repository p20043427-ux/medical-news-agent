# 단어 일러스트 (Phase 3)

앱은 이미 **이미지 준비 완료** 상태입니다. 이미지를 넣으면 자동으로 플래시카드·홈 덱 카드에 표시되고, 없으면 기존 `CardArt`(SVG)로 폴백합니다.

현재 **13개 카테고리 대표 일러스트**가 Pollinations(무료)로 생성되어 적용돼 있습니다.

## 폴더 구조
- 단어별: `public/words/{단어id}.jpg`
- 카테고리별: `public/words/cat-{category}.jpg`
- 매니페스트: [`lib/jp/wordImages.ts`](lib/jp/wordImages.ts) — 존재하는 이미지의 id/category 등록 (생성 스크립트가 자동 갱신)

## 자동 생성 — 무료 (Pollinations, API 키 불필요) ✅ 권장
```bash
npm i -D tsx

# 카테고리당 1장 (13장) — 이미 생성됨
npx tsx scripts/gen-images.ts --per-category

# 단어별 (레퍼런스급): 카테고리 하나씩 채우기
npx tsx scripts/gen-images.ts --category greeting --limit 20
npx tsx scripts/gen-images.ts --limit 100
```
- **비용 0.** 모든 카드가 같은 화풍이 되도록 고정 스타일 프롬프트 + seed 사용.
- 생성 후 매니페스트 자동 갱신 → git commit & push 하면 배포 반영.

## 자동 생성 — 유료 (OpenAI, 더 일관된 품질)
```bash
npm i -D tsx openai
# .env.local 에 OPENAI_API_KEY=sk-...
npx tsx scripts/gen-images.ts --openai --category greeting --limit 20
```

## 수동 추가
1. 이미지를 `public/words/{id}.jpg` 로 저장
2. `lib/jp/wordImages.ts` 의 `WORD_IMAGES` 에 `"{id}"` 추가
