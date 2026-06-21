import type { Token } from "@/lib/jp/types";

/** 후리가나(루비) 문장 렌더러. showFurigana=false 면 후리가나를 숨긴다. */
export default function Furigana({
  tokens,
  showFurigana = true,
  className = "",
}: {
  tokens: Token[];
  showFurigana?: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {tokens.map((tok, i) =>
        tok.r && showFurigana ? (
          <ruby key={i}>
            {tok.t}
            <rt className="text-[0.6em] font-normal text-slate-400">{tok.r}</rt>
          </ruby>
        ) : (
          <span key={i}>{tok.t}</span>
        ),
      )}
    </span>
  );
}

/** 토큰 배열을 순수 일본어 문자열로 합친다 (TTS 용). */
export function tokensToText(tokens: Token[]): string {
  return tokens.map((t) => t.t).join("");
}
