"use client";

import { useRef, useEffect, useCallback } from "react";

const SIZE = 300;

function clientToCanvas(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement
): [number, number] {
  const rect = canvas.getBoundingClientRect();
  return [
    (clientX - rect.left) * (SIZE / rect.width),
    (clientY - rect.top) * (SIZE / rect.height),
  ];
}

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

  const drawBackground = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // Crosshair grid
    ctx.save();
    ctx.strokeStyle = "rgba(0,0,0,0.08)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(SIZE / 2, 0); ctx.lineTo(SIZE / 2, SIZE);
    ctx.moveTo(0, SIZE / 2); ctx.lineTo(SIZE, SIZE / 2);
    ctx.stroke();
    ctx.restore();

    // Guide character (first char only for compounds)
    const guideChar = character.length <= 2 ? character : character[0];
    ctx.save();
    ctx.font = `bold ${Math.round(SIZE * 0.58)}px serif`;
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(guideChar, SIZE / 2, SIZE / 2);
    ctx.restore();
  }, [character]);

  useEffect(() => { drawBackground(); }, [drawBackground]);

  function startStroke(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    isDown.current = true;
    prevPt.current = [x, y];
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a2e";
    ctx.fill();
  }

  function continueStroke(x: number, y: number) {
    if (!isDown.current || !prevPt.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const [px, py] = prevPt.current;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    prevPt.current = [x, y];
  }

  function endStroke() {
    isDown.current = false;
    prevPt.current = null;
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
          width={SIZE}
          height={SIZE}
          className="block h-full w-full touch-none"
          onMouseDown={(e) => {
            const [x, y] = clientToCanvas(e.clientX, e.clientY, e.currentTarget);
            startStroke(x, y);
          }}
          onMouseMove={(e) => {
            if (!isDown.current) return;
            const [x, y] = clientToCanvas(e.clientX, e.clientY, e.currentTarget);
            continueStroke(x, y);
          }}
          onMouseUp={endStroke}
          onMouseLeave={endStroke}
          onTouchStart={(e) => {
            e.stopPropagation();
            const t = e.touches[0];
            const [x, y] = clientToCanvas(t.clientX, t.clientY, e.currentTarget);
            startStroke(x, y);
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
            const t = e.touches[0];
            const [x, y] = clientToCanvas(t.clientX, t.clientY, e.currentTarget);
            continueStroke(x, y);
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            endStroke();
          }}
        />
      </div>
      <button
        onClick={drawBackground}
        className="flex items-center gap-1.5 rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-600"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
        지우기
      </button>
    </div>
  );
}
