"use client";

import CardArt from "./CardArt";
import { wordImageSrc } from "@/lib/jp/wordImages";

/**
 * 단어 일러스트. 실제 이미지가 있으면 표시하고, 없으면 CardArt(SVG)로 폴백한다.
 * 이미지를 public/words/ 에 넣고 lib/jp/wordImages.ts 에 등록하면 자동 적용.
 */
export default function WordImage({
  id,
  category,
  emoji,
  className = "",
}: {
  id: string;
  category: string;
  emoji: string;
  className?: string;
}) {
  const src = wordImageSrc(id, category);
  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/80 text-xl shadow-md ring-1 ring-white/60 backdrop-blur-sm">
          <span className="drop-shadow-sm">{emoji}</span>
        </div>
      </div>
    );
  }
  return <CardArt category={category} emoji={emoji} className={className} />;
}
