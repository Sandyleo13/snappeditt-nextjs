"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AutoBeforeAfterImageProps = {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
};

export default function AutoBeforeAfterImage({
  beforeImage,
  afterImage,
  alt,
  className = "",
}: AutoBeforeAfterImageProps) {
  const [position, setPosition] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const direction = useRef<1 | -1>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = window.setInterval(() => {
      setPosition((current) => {
        const next = current + direction.current * 1.2;
        if (next >= 100) {
          direction.current = -1;
          return 100;
        }
        if (next <= 0) {
          direction.current = 1;
          return 0;
        }
        return next;
      });
    }, 30);

    return () => window.clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        role="img"
        aria-label={`${alt} before editing`}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${beforeImage}")` }}
      />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
        <div
          role="img"
          aria-label={`${alt} after editing`}
          className="absolute inset-y-0 max-w-none bg-cover bg-center"
          style={{
            backgroundImage: `url("${afterImage}")`,
            width: containerWidth || "100%",
          }}
        />
      </div>
      <div className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-lg">
          <ChevronLeft className="h-3 w-3 text-[#E8352A]" />
          <ChevronRight className="h-3 w-3 text-[#E8352A]" />
        </div>
      </div>
      <span className="absolute bottom-3 left-3 z-10 rounded-full bg-slate-900/75 px-3 py-1 text-[10px] font-semibold text-white">BEFORE</span>
      <span className="absolute bottom-3 right-3 z-10 rounded-full bg-[#F44336] px-3 py-1 text-[10px] font-semibold text-white">AFTER</span>
    </div>
  );
}