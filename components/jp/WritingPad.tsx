"use client";

import { useRef, useEffect, useCallback, useState, useMemo } from "react";

const SIZE = 300;
type Pt = [number, number];

export default function WritingPad({
  character,
  reading,
}: {
  character: string;
  reading: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDown = useRef(false);
  const strokes = useRef<Pt[][]>([]); // 획 히스토리(undo용)
  const [idx, setIdx] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);

  // 단어를 글자 단위로 분해 → 글자별 연습
  const chars = useMemo(() => Array.from(character), [character]);
  const cur = chars[idx] ?? character;

  // 테마에 맞는 잉크 색 (라이트=진하게, 다크=밝게) — 다크모드 비가시 문제 해결
  const inkColor = useCallback(() => {
    if (typeof window === "undefined") return "#1a1a2e";
    const v = getComputedStyle(document.documentElement).getPropertyValue("--text-1").trim();
    return v || "#1a1a2e";
  }, []);

  const toCanvas = useCallback((clientX: number, clientY: number): Pt => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return [
      (clientX - rect.left) * (SIZE / rect.width),
      (clientY - rect.top) * (SIZE / rect.height),
    ];
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, SIZE, SIZE);
    // 십자 가이드
    ctx.save();
    ctx.strokeStyle = "rgba(120,130,160,0.28)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(SIZE / 2, 0); ctx.lineTo(SIZE / 2, SIZE);
    ctx.moveTo(0, SIZE / 2); ctx.lineTo(SIZE, SIZE / 2);
    ctx.stroke();
    ctx.restore();
    // 가이드 글자(연하게)
    ctx.save();
    ctx.font = `bold ${Math.round(SIZE * 0.62)}px serif`;
    ctx.fillStyle = "rgba(120,130,160,0.20)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cur, SIZE / 2, SIZE / 2);
    ctx.restore();
  }, [cur]);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, pts: Pt[], ink: string) => {
    if (pts.length === 0) return;
    ctx.fillStyle = ink;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (pts.length === 1) {
      ctx.beginPath();
      ctx.arc(pts[0][0], pts[0][1], 4, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2;
      const my = (pts[i][1] + pts[i + 1][1]) / 2;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    const last = pts[pts.length - 1];
    ctx.lineTo(last[0], last[1]);
    ctx.stroke();
  }, []);

  // 전체 다시 그리기 (배경 + 모든 획) — 레티나 스케일 포함
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBackground(ctx);
    const ink = inkColor();
    strokes.current.forEach((s) => drawStroke(ctx, s, ink));
  }, [drawBackground, drawStroke, inkColor]);

  // 글자/문자 바뀌면 초기화
  useEffect(() => {
    strokes.current = [];
    setStrokeCount(0);
    redraw();
  }, [cur, redraw]);

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    e.stopPropagation(); // 스와이프 래퍼로 전파 방지
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDown.current = true;
    const pt = toCanvas(e.clientX, e.clientY);
    strokes.current.push([pt]);
    const ctx = canvas.getContext("2d")!;
    drawStroke(ctx, [pt], inkColor());
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDown.current) return;
    e.preventDefault();
    e.stopPropagation();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const curStroke = strokes.current[strokes.current.length - 1];
    const prev = curStroke[curStroke.length - 1];
    const pt = toCanvas(e.clientX, e.clientY);
    curStroke.push(pt);
    // 라이브 세그먼트
    const mx = (prev[0] + pt[0]) / 2;
    const my = (prev[1] + pt[1]) / 2;
    ctx.strokeStyle = inkColor();
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(prev[0], prev[1]);
    ctx.quadraticCurveTo(prev[0], prev[1], mx, my);
    ctx.lineTo(pt[0], pt[1]);
    ctx.stroke();
  }

  function up(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDown.current) return;
    isDown.current = false;
    setStrokeCount(strokes.current.length);
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  }

  function undo() {
    strokes.current.pop();
    setStrokeCount(strokes.current.length);
    redraw();
  }
  function clear() {
    strokes.current = [];
    setStrokeCount(0);
    redraw();
  }

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-5">
      <div className="text-center">
        <p className="text-3xl font-extrabold" style={{ color: "#E63946" }}>{character}</p>
        <p className="text-sm" style={{ color: "var(--text-3)" }}>[{reading}]</p>
      </div>

      {/* 글자별 네비게이션 */}
      {chars.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            aria-label="이전 글자"
            className="grid h-8 w-8 place-items-center rounded-full disabled:opacity-30"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}
          >‹</button>
          <span className="text-sm font-bold" style={{ color: "var(--text-1)" }}>
            {cur} <span style={{ color: "var(--text-3)" }}>({idx + 1}/{chars.length})</span>
          </span>
          <button
            onClick={() => setIdx((i) => Math.min(chars.length - 1, i + 1))}
            disabled={idx === chars.length - 1}
            aria-label="다음 글자"
            className="grid h-8 w-8 place-items-center rounded-full disabled:opacity-30"
            style={{ background: "var(--surface)", color: "var(--text-2)" }}
          >›</button>
        </div>
      )}

      <p className="text-xs" style={{ color: "var(--text-3)" }}>가이드를 따라 써보세요</p>
      <div
        className="overflow-hidden rounded-2xl shadow-inner"
        style={{ width: "100%", maxWidth: SIZE, aspectRatio: "1 / 1", background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`${cur} 쓰기 연습`}
          className="block h-full w-full"
          style={{ touchAction: "none" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        />
      </div>

      {/* 액션 */}
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={strokeCount === 0}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold disabled:opacity-40"
          style={{ background: "var(--surface)", color: "var(--text-2)" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-1" /></svg>
          되돌리기
        </button>
        <button
          onClick={clear}
          disabled={strokeCount === 0}
          className="flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold disabled:opacity-40"
          style={{ background: "linear-gradient(135deg,#ffeaa7,#fdcb6e)", color: "#7f5800" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          전체 지우기
        </button>
      </div>
    </div>
  );
}
