'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const fy = (amp: number, dur: number, delay = 0) => ({
  animate: { y: [-amp, amp, -amp] as number[] },
  transition: { repeat: Infinity, duration: dur, ease: 'easeInOut' as const, delay },
});

export default function HeroAnimation() {
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPos(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  return (
    // Outer: full width, fixed height, relative so absolute children anchor here
    <div className="relative w-full overflow-hidden" style={{ height: 520 }}>

      {/* ── Soft radial background ── */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(232,53,42,0.10) 0%, transparent 70%)' }} />

      {/* ── Orbit SVG rings — fill entire box, centred via viewBox ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 520"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse cx="250" cy="248" rx="222" ry="172" stroke="#E8352A" strokeWidth="0.9" opacity="0.16"/>
        <ellipse cx="250" cy="248" rx="176" ry="134" stroke="#E8352A" strokeWidth="0.7" opacity="0.12"/>
        <ellipse cx="250" cy="248" rx="222" ry="172" stroke="#E8352A" strokeWidth="1.8" opacity="0.48"
          strokeDasharray="200 1260"
          style={{ animation: 'sweepCW 7s linear infinite', transformOrigin: '250px 248px' }}/>
        <ellipse cx="250" cy="248" rx="176" ry="134" stroke="#E8352A" strokeWidth="1.2" opacity="0.30"
          strokeDasharray="130 980"
          style={{ animation: 'sweepCCW 9s linear infinite', transformOrigin: '250px 248px' }}/>
      </svg>

      {/* ── Centre column: card sitting ON podium, pinned from bottom ── */}
      <div
        className="absolute"
        style={{ bottom: 10, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}
      >
        {/* Before/After card */}
        <motion.div {...fy(7, 5)} style={{ width: '68%' }}>
          <div
            ref={cardRef}
            className="relative overflow-hidden cursor-col-resize w-full"
            style={{
              aspectRatio: '4/3',
              borderRadius: 22,
              border: '2px solid rgba(255,255,255,0.88)',
              boxShadow: '0 28px 72px rgba(15,23,42,0.20), 0 6px 18px rgba(232,53,42,0.10)',
            }}
            onMouseMove={move} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}
            onTouchMove={move} onTouchEnd={() => setDragging(false)}
          >
            {/* Before */}
            <div className="absolute inset-0">
              <img
                src="/snappeditt-photos/HDR Basic/7 Jett Lane-10.jpg"
                alt="Before HDR"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.65) saturate(0.6)' }}
              />
            </div>

            {/* After — right side revealed */}
            <div className="absolute inset-0 overflow-hidden" style={{ left: `${sliderPos}%` }}>
              <img
                src="/snappeditt-photos/HDR Basic/7 Jett Lane-11.jpg"
                alt="After HDR"
                className="absolute inset-0 h-full object-cover"
                style={{ width: '100%', left: `-${sliderPos}%` }}
              />
            </div>

            {/* Divider + handle */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/80" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white border-2 border-[#E8352A]"
                style={{ width: 32, height: 32, boxShadow: '0 3px 12px rgba(232,53,42,0.28)' }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M4 5H1M1 5L2.5 3M1 5L2.5 7" stroke="#E8352A" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M10 5H13M13 5L11.5 3M13 5L11.5 7" stroke="#E8352A" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* After label */}
            <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-[#E8352A] text-white text-[10px] font-bold px-2.5 py-0.5">
              After
            </div>
          </div>
        </motion.div>

        {/* Podium directly below card — no gap */}
        <div style={{ width: '68%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 0 }}>
          {/* Red glow ring */}
          <div style={{ width: '85%', height: 12, borderRadius: 999, background: 'radial-gradient(ellipse at center,rgba(232,53,42,0.50) 0%,rgba(232,53,42,0.08) 65%,transparent 100%)', marginBottom: -3, filter: 'blur(2px)' }}/>
          {/* Disc 1 */}
          <div style={{ width: '85%', height: 18, borderRadius: 999, background: 'linear-gradient(180deg,#fff 0%,#e8e8e8 100%)', boxShadow: '0 4px 14px rgba(0,0,0,0.09)', border: '1px solid rgba(215,215,215,0.8)' }}/>
          {/* Disc 2 */}
          <div style={{ width: '68%', height: 14, borderRadius: 999, background: 'linear-gradient(180deg,#f3f3f3 0%,#dcdcdc 100%)', boxShadow: '0 3px 8px rgba(0,0,0,0.07)', border: '1px solid rgba(205,205,205,0.7)', marginTop: -1 }}/>
          {/* Disc 3 */}
          <div style={{ width: '52%', height: 11, borderRadius: 999, background: 'linear-gradient(180deg,#e8e8e8 0%,#d0d0d0 100%)', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', border: '1px solid rgba(195,195,195,0.6)', marginTop: -1 }}/>
        </div>
      </div>

      {/* ── HDR Enhancement card — top left ── */}
      <motion.div {...fy(8, 4.5)} className="absolute" style={{ left: '2%', top: '8%', zIndex: 30 }}>
        <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 12px 36px rgba(15,23,42,0.11)', border: '1px solid rgba(228,228,228,0.9)', backdropFilter: 'blur(12px)', width: 170 }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FFF0EE] flex-shrink-0">
              <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
                <rect x="0.65" y="0.65" width="11.7" height="9.7" rx="1.5" stroke="#E8352A" strokeWidth="1.1"/>
                <circle cx="3.8" cy="3.5" r="1" fill="#E8352A"/>
                <path d="M1 7.8L3.8 5.4L6 7L8.5 4.2L12 7.8" stroke="#E8352A" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#1e293b' }}>HDR Enhancement</span>
          </div>
          <div style={{ background: '#fafafa', borderRadius: 9, padding: '6px 8px', border: '1px solid #f0f0f0' }}>
            <svg viewBox="0 0 140 38" style={{ width: '100%', height: 38 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8352A" stopOpacity="0.18"/>
                  <stop offset="100%" stopColor="#E8352A" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0 30 C16 22 28 28 44 18 S68 8 86 14 S112 6 130 2 L140 1" stroke="#E8352A" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M0 30 C16 22 28 28 44 18 S68 8 86 14 S112 6 130 2 L140 1 L140 38 L0 38Z" fill="url(#sg)"/>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* ── Color Balance card — bottom right ── */}
      <motion.div {...fy(10, 5.2, 1)} className="absolute" style={{ right: '2%', bottom: '20%', zIndex: 30 }}>
        <div style={{ background: 'rgba(255,255,255,0.96)', borderRadius: 16, padding: '12px 14px', boxShadow: '0 12px 36px rgba(15,23,42,0.11)', border: '1px solid rgba(228,228,228,0.9)', backdropFilter: 'blur(12px)', width: 158 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>Color Balance</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="38" height="38" viewBox="0 0 38 38" style={{ flexShrink: 0 }}>
              <circle cx="19" cy="19" r="12" fill="none" stroke="#E5E7EB" strokeWidth="5.5"/>
              <circle cx="19" cy="19" r="12" fill="none" stroke="#E8352A" strokeWidth="5.5" strokeDasharray="50 25" strokeDashoffset="20" strokeLinecap="butt"/>
              <circle cx="19" cy="19" r="12" fill="none" stroke="#cbd5e1" strokeWidth="5.5" strokeDasharray="20 55" strokeDashoffset="-30" strokeLinecap="butt"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
              <div style={{ height: 4, borderRadius: 9, background: '#f1f5f9' }}>
                <div style={{ height: 4, width: '70%', borderRadius: 9, background: '#E8352A' }}/>
              </div>
              <div style={{ height: 4, borderRadius: 9, background: '#f1f5f9' }}>
                <div style={{ height: 4, width: '45%', borderRadius: 9, background: '#fca5a5' }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8352A' }}/>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Spheres ── */}
      <motion.div {...fy(12, 6)}    className="absolute pointer-events-none" style={{ left: '4%',  top: '48%', zIndex: 5 }}>
        <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.52) 58%,rgba(198,208,228,0.22) 100%)', boxShadow: '0 6px 28px rgba(15,23,42,0.09),inset 0 1px 2px rgba(255,255,255,0.9)', border: '1px solid rgba(208,218,234,0.42)' }}/>
      </motion.div>
      <motion.div {...fy(7, 4.5, 0.7)} className="absolute pointer-events-none" style={{ left: '12%', bottom: '28%', zIndex: 5 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.48) 65%)', boxShadow: '0 3px 12px rgba(15,23,42,0.07)', border: '1px solid rgba(208,218,234,0.38)' }}/>
      </motion.div>
      <motion.div {...fy(9, 5, 1.3)}   className="absolute pointer-events-none" style={{ right: '11%', top: '50%', zIndex: 5 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.48) 65%)', boxShadow: '0 4px 14px rgba(15,23,42,0.08)', border: '1px solid rgba(208,218,234,0.38)' }}/>
      </motion.div>
      <motion.div {...fy(5, 3.8, 0.4)} className="absolute pointer-events-none" style={{ left: '45%', top: '5%', zIndex: 5 }}>
        <div style={{ width: 15, height: 15, borderRadius: '50%', background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.96) 0%,rgba(218,226,242,0.42) 70%)', boxShadow: '0 2px 6px rgba(15,23,42,0.06)', border: '1px solid rgba(208,218,234,0.32)' }}/>
      </motion.div>
      <motion.div {...fy(13, 4, 0.3)}  className="absolute pointer-events-none" style={{ right: '5%',  top: '5%', zIndex: 5 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 50%,#8b1a0f 100%)', boxShadow: '0 10px 30px rgba(232,53,42,0.32)' }}/>
      </motion.div>
      <motion.div {...fy(8, 3.6, 2)}   className="absolute pointer-events-none" style={{ right: '7%',  top: '43%', zIndex: 5 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'radial-gradient(circle at 35% 28%,#ff8a80 0%,#E8352A 58%,#a31808 100%)', boxShadow: '0 5px 16px rgba(232,53,42,0.26)' }}/>
      </motion.div>

      <style>{`
        @keyframes sweepCW  { to { stroke-dashoffset: -1460; } }
        @keyframes sweepCCW { to { stroke-dashoffset:  1110; } }
      `}</style>
    </div>
  );
}
