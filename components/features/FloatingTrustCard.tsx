'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Shield, Check } from 'lucide-react';
import { initFloat } from '../../lib/animations';

export default function FloatingTrustCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    initFloat(ref);

    // simple count-up (safe, dependency-free)
    let raf: number | null = null;
    const duration = 1400;
    const start = performance.now();
    const from = 0;
    const to = 1000;

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = Math.pow(p, 0.6);
      setCount(Math.floor(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={ref} className="gsap-float gsap-float-target relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.18)] min-h-[350px] sm:min-h-[420px] lg:min-h-[430px]">
      <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-[#FEE2E2] opacity-70 blur-3xl pointer-events-none" />
      <div className="absolute left-0 top-0 h-16 w-full bg-gradient-to-b from-white/95 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FDE8E8] bg-[#FEF2F2] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#842929]">
            <Shield className="h-3.5 w-3.5 text-[#D71920]" />
            WHY CHOOSE SNAPPEDITT
          </div>

          <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
            UNBREAKABLE <span className="text-[#D71920]">TRUST</span>
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#4B5563] sm:text-base">
            A premium photo editing studio for wedding, ecommerce, fashion, and real estate brands.
          </p>

          <div className="mt-6 space-y-3">
            {['Wedding', 'Ecommerce', 'Fashion', 'Real Estate'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-3xl border border-[#F3F4F6] bg-[#FEF2F2] px-4 py-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE2E2] text-[#D71920] shadow-sm">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-[#111111]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[#FEE2E2] bg-[#FFEBEE] px-5 py-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9CA3AF]">Premium Results</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#111111]">{count}+ Projects</p>
          <p className="mt-1 text-sm text-[#4B5563]">Delivered with editorial polish</p>
        </div>
      </div>
    </div>
  );
}
