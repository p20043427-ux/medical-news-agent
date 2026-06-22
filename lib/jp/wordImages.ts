// 실제 일러스트가 존재하는 단어/카테고리 매니페스트.
// 이미지를 추가하면 여기에 id(또는 category)를 등록하면 자동으로 표시됩니다.
//   - 단어별:   public/words/{id}.webp        → WORD_IMAGES 에 id 추가
//   - 카테고리: public/words/cat-{category}.webp → CATEGORY_IMAGES 에 category 추가
// (scripts/gen-images.mjs 가 생성 후 이 파일을 자동 갱신합니다)

export const WORD_IMAGES = new Set<string>([
  // 예: "greeting-ohayou",
]);

export const CATEGORY_IMAGES = new Set<string>([
  // Claude SVG illustrations are now used via CardArt component.
  // Re-add category keys here only if you want to use Pollinations jpg images instead.
]);

export function wordImageSrc(id: string, category: string): string | null {
  if (WORD_IMAGES.has(id)) return `/words/${id}.jpg`;
  if (CATEGORY_IMAGES.has(category)) return `/words/cat-${category}.jpg`;
  return null;
}
