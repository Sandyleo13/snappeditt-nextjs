"use client"
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  before: string;
  after: string;
  alt?: string;
  initial?: number;
};

export default function BeforeAfterPreview({ before, after, alt = "Preview", initial = 50 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<number>(initial); // percent from left
  const draggingRef = useRef(false);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const p = ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.max(0, Math.min(100, p)));
    }

    function handleUp() {
      draggingRef.current = false;
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    }

    if (draggingRef.current) {
      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    }

    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, []);

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {}
  }

  return (
    <div ref={containerRef} className="relative w-full rounded-3xl overflow-hidden" style={{ minHeight: 420 }}>
      <Image src={before} alt={`${alt} before`} fill className="object-cover" />

      <div
        className="absolute inset-0"
        style={{
          clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`,
        }}
      >
        <Image src={after} alt={`${alt} after`} fill className="object-cover" />
      </div>

      <div
        onPointerDown={handlePointerDown}
        className="absolute top-1/2 -translate-y-1/2 z-20"
        style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
      >
        <div className="w-10 h-10 rounded-full bg-[#E8352A] flex items-center justify-center text-white shadow-lg cursor-grab">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4 4 4M19 15l-4 4-4-4"/></svg>
        </div>
      </div>

      <div className="absolute left-4 top-4 z-30">
        <div className="bg-white/90 text-sm text-[#C42D1F] font-semibold px-3 py-1 rounded-full">Before</div>
      </div>
      <div className="absolute right-4 top-4 z-30">
        <div className="bg-white/90 text-sm text-slate-700 font-semibold px-3 py-1 rounded-full">After</div>
      </div>
    </div>
  );
}
