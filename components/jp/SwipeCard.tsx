"use client";

import { useRef, useState } from "react";
import { useUiLang, tt } from "@/lib/i18n";

/**
 * 드래그(스와이프)로 카드를 분류하는 래퍼.
 * 왼쪽 = 알고 있어요(known), 오른쪽 = 학습할게요(study).
 */
export default function SwipeCard({
  children,
  onSwipe,
  swipeKey,
}: {
  children: React.ReactNode;
  onSwipe: (known: boolean) => void;
  /** 카드가 바뀔 때마다 달라지는 key (위치 리셋용) */
  swipeKey: string;
}) {
  const lang = useUiLang();
  const [dx, setDx] = useState(0);
  const [leaving, setLeaving] = useState<null | "left" | "right">(null);
  const start = useRef<number | null>(null);
  const dragging = useRef(false);
  const dxRef = useRef(0);

  const THRESHOLD = 90;

  function down(e: React.PointerEvent) {
    // 버튼/캔버스(쓰기)/스와이프 제외 영역 위에서 시작한 드래그는 무시
    const t = e.target as HTMLElement;
    if (t.closest("button, canvas, [data-no-swipe]")) return;
    start.current = e.clientX;
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function move(e: React.PointerEvent) {
    if (!dragging.current || start.current === null) return;
    const d = e.clientX - start.current;
    dxRef.current = d;
    setDx(d);
  }
  function up() {
    if (!dragging.current) return;
    dragging.current = false;
    const d = dxRef.current;
    if (d <= -THRESHOLD) fly("left");
    else if (d >= THRESHOLD) fly("right");
    else {
      dxRef.current = 0;
      setDx(0);
    }
    start.current = null;
  }
  function fly(dir: "left" | "right") {
    setLeaving(dir);
    setDx(dir === "left" ? -600 : 600);
    window.setTimeout(() => {
      onSwipe(dir === "left"); // left = known
      setLeaving(null);
      dxRef.current = 0;
      setDx(0);
    }, 220);
  }

  const rot = dx / 18;
  const knownOpacity = Math.min(Math.max(-dx / THRESHOLD, 0), 1); // 왼쪽
  const studyOpacity = Math.min(Math.max(dx / THRESHOLD, 0), 1); // 오른쪽

  return (
    <div
      key={swipeKey}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="relative touch-pan-y select-none"
      style={{
        transform: `translateX(${dx}px) rotate(${rot}deg)`,
        transition: leaving || dx === 0 ? "transform 0.22s ease-out" : "none",
      }}
    >
      {/* 스와이프 라벨 */}
      <div
        className="pointer-events-none absolute left-4 top-6 z-10 rotate-[-12deg] rounded-xl border-4 border-emerald-500 px-3 py-1 text-xl font-extrabold text-emerald-500"
        style={{ opacity: knownOpacity }}
      >
        {tt(lang, "알고 있어요", "知っている")}
      </div>
      <div
        className="pointer-events-none absolute right-4 top-6 z-10 rotate-[12deg] rounded-xl border-4 border-slate-800 px-3 py-1 text-xl font-extrabold text-slate-800"
        style={{ opacity: studyOpacity }}
      >
        {tt(lang, "학습할게요", "学習する")}
      </div>
      {children}
    </div>
  );
}
