"use client";

import { useRef, useEffect, useCallback } from "react";

const SIZE = 300;

export default function WritingPad({
  character,
  reading,
}: {
  character: string;
  reading: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDown = useRef(false);
  const prevPt = useRef<[number, number] | null>(null);

  // 캔버스 좌표(논리 SIZE 기준)로 변환
  const toCanvas = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      return [
        (clientX - rect.left) * (SIZE / rect.width),
        (clientY - rect.top) * (SIZE / rect.height),
      ];
    },
    [],
  );

  const drawBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 고해상도(레티나) 대응 — 매번 변환을 초기화하고 다시 스케일
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, SIZE, SIZE);

    // 십자 가이드
    ctx.save();
    ctx.strokeStyle = "rgba(120,130,160,0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(SIZE / 2, 0); ctx.lineTo(SIZE / 2, SIZE);
    ctx.moveTo(0, SIZE / 2); ctx.lineTo(SIZE, SIZE / 2);
    ctx.stroke();
    ctx.restore();

    // 가이드 글자(연하게)
    const guideChar = character.length <= 2 ? character : character[0];
    ctx.save();
    ctx.font = `bold ${Math.round(SIZE * 0.58)}px serif`;
    ctx.fillStyle = "rgba(120,130,160,0.18)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(guideChar, SIZE / 2, SIZE / 2);
    ctx.restore();
  }, [character]);

  useEffect(() => { drawBackground(); }, [drawBackground]);

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    const ctx = canvas.getContext("2d")!;
    const [x, y] = toCanvas(e.clientX, e.clientY);
    isDown.current = true;
    prevPt.current = [x, y];
    ctx.beginPath();
    ctx.arc(x, y, 3.4, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a2e";
    ctx.fill();
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDown.current || !prevPt.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const [x, y] = toCanvas(e.clientX, e.clientY);
    const [px, py] = prevPt.current;
    // 중간점 기준 2차 곡선으로 부드럽게
    const mx = (px + x) / 2;
    const my = (py + y) / 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px, py, mx, my);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    prevPt.current = [x, y];
  }

  function up(e: React.PointerEvent<HTMLCanvasElement>) {
    isDown.current = false;
    prevPt.current = null;
    const canvas = canvasRef.current;
    if (canvas && canvas.hasPointerCapture?.(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-5">
      <div className="text-center">
        <p className="text-3xl font-extrabold text-amber-500">{character}</p>
        <p className="text-sm text-slate-400">[{reading}]</p>
      </div>
      <p className="text-xs text-slate-400">위 문자를 보고 써보세요</p>
      <div
        className="overflow-hidden rounded-2xl bg-slate-50 shadow-inner ring-1 ring-slate-200"
        style={{ width: "100%", maxWidth: SIZE, aspectRatio: "1 / 1" }}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ touchAction: "none" }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        />
      </div>
      <button
        onClick={drawBackground}
        className="flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold"
        style={{ background: "linear-gradient(135deg,#ffeaa7,#fdcb6e)", color: "#7f5800" }}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
        지우기
      </button>
    </div>
  );
}
