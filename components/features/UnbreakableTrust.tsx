'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  CheckCircle2,
  Lock,
  Zap,
  Calendar,
  Users,
  Workflow,
  Clock,
  BadgeCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: CheckCircle2,
    label: '100% Manual Quality Check',
    desc: 'Every image is carefully reviewed before delivery.',
  },
  {
    icon: Lock,
    label: 'Secure Workflow',
    desc: 'Your files are safe with us — 100% confidential.',
  },
  { icon: Zap, label: 'Fast Delivery', desc: 'Quick turnaround without compromising quality.' },
  { icon: Calendar, label: 'Trusted Since 2015', desc: 'Delivering consistent quality for over 10 years.' },
];

const FEATURES = [
  { icon: Users, label: 'Expert Editors' },
  { icon: Workflow, label: 'Secure Workflow' },
  { icon: Clock, label: 'On-Time Delivery' },
  { icon: BadgeCheck, label: 'Quality Assured' },
];

const STATS = [
  { value: '50K+', label: 'Images Edited' },
  { value: '24 Hours', label: 'Average Delivery' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '10+ Years', label: 'Experience' },
];

function GlossyShield() {
  return (
    <div className="relative mb-4 flex justify-center sm:justify-start">
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20"
        style={{
          background: 'linear-gradient(145deg, #FF6B5B 0%, #E8352A 45%, #A01010 100%)',
          boxShadow:
            '0 12px 32px rgba(232,53,42,0.45), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        <Shield className="relative h-8 w-8 text-white drop-shadow-md sm:h-10 sm:w-10" strokeWidth={1.5} />
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
          <CheckCircle2 className="h-3 w-3 text-[#E8352A]" />
        </div>
      </div>
    </div>
  );
}

function BeforeAfterCard() {
  const [pos, setPos] = useState(50);
  const [playing, setPlaying] = useState(true);
  const [dragging, setDragging] = useState(false);
  const dirRef = useRef<1 | -1>(1);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing || dragging) return;
    const id = setInterval(() => {
      setPos((p) => {
        const n = p + dirRef.current * 1.2;
        if (n >= 100) {
          dirRef.current = -1;
          return 100;
        }
        if (n <= 0) {
          dirRef.current = 1;
          return 0;
        }
        return n;
      });
    }, 28);
    return () => clearInterval(id);
  }, [playing, dragging]);

  const calcPos = (clientX: number) => {
    if (!imgRef.current) return;
    const { left, width } = imgRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - left) / width) * 100)));
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => {
      if (dragging) calcPos(e.clientX);
    };
    const tm = (e: TouchEvent) => {
      if (dragging && e.touches[0]) calcPos(e.touches[0].clientX);
    };
    const up = () => setDragging(false);
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', tm);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', up);
    };
  }, [dragging]);

  return (
    // <div className="relative mt-8 sm:mt-10">
    //   <div className="absolute -top-3 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/20 bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
    //     <Sparkles className="h-3.5 w-3.5 text-[#E8352A]" />
    //     <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 sm:text-xs">
    //       Real Estate Editing
    //     </span>
    //   </div>

    //   <div
    //     ref={imgRef}
    //     className="relative h-[220px] cursor-col-resize select-none overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:h-[280px] lg:h-[320px]"
    //     onMouseEnter={() => setPlaying(false)}
    //     onMouseLeave={() => {
    //       if (!dragging) setPlaying(true);
    //     }}
    //   >
    //     <img
    //       src="/images/real-estate-raw.jpg"
    //       alt="Before real estate photo editing"
    //       className="absolute inset-0 h-full w-full object-cover"
    //       draggable={false}
    //     />

    //     <div
    //       className="absolute inset-0 z-10 overflow-hidden"
    //       style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
    //     >
    //       <img
    //         src="/images/real-estate-corrected.jpg"
    //         alt="After real estate photo editing"
    //         className="absolute inset-0 h-full w-full object-cover"
    //         draggable={false}
    //       />
    //     </div>

    //     <div
    //       className="absolute inset-y-0 z-20 w-0.5 cursor-col-resize bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
    //       style={{ left: `${pos}%` }}
    //       onMouseDown={() => setDragging(true)}
    //       onTouchStart={() => setDragging(true)}
    //     >
    //       <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#E8352A] shadow-lg">
    //         <div className="flex gap-0.5">
    //           <div className="h-3 w-0.5 rounded-full bg-white/90" />
    //           <div className="h-3 w-0.5 rounded-full bg-white/90" />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="absolute bottom-3 left-3 z-20 rounded-lg bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs">
    //       Before
    //     </div>
    //     <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-[#E8352A]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs">
    //       After
    //     </div>
    //   </div>
    // </div>
    <>
    </>
  );
}

export default function UnbreakableTrust() {
  return (
    <section id="trust" className="relative overflow-hidden w-full bg-white  py-16 sm:py-24 md:py-28">
      {/* Subtle dot grid */}
      <div className="pointer-events-none absolute left-0 right-0 top-0" style={{ bottom: '50%' }}>
        <svg className="absolute inset-0 h-full w-full opacity-[0.45]">
          <defs>
            <pattern id="trust-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#D1D5DB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-dot-grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full">
        <div className="relative">
          {/* Red gradient section */}
          <div
            className="relative overflow-visible "
            style={{
              background: 'linear-gradient(135deg, #E8352A 0%, #C41818 55%, #8B0A0A 100%)',
              boxShadow: '0 32px 80px rgba(232,53,42,0.28), 0 0 0 1px rgba(255,255,255,0.06) inset',
            }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-[#FF6B5B]/10 blur-3xl" />

            {/* Inner dot texture on red */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.08]">
              <svg className="h-full w-full">
                <defs>
                  <pattern id="trust-red-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="16" cy="16" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#trust-red-dots)" />
              </svg>
            </div>

            {/* Floating glassmorphism trust card — center between adjacent sections on large screens */}
            <div className="relative z-30 px-4 sm:px-8 lg:absolute lg:left-8 lg:top-0 lg:w-[min(100%,360px)] lg:-translate-y-1/2 xl:left-12 xl:w-[360px]">
              <div
                className="rounded-[1.5rem] border border-white/70 mb-18 p-4 sm:p-5 lg:pt-5 lg:pb-3 lg:px-7"
                style={{
                  background: 'rgba(255,255,255,0.82)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  boxShadow:
                    '0 24px 64px rgba(15,23,42,0.12), 0 8px 24px rgba(232,53,42,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset',
                }}
              >
                <GlossyShield />

                <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8352A] sm:text-left sm:text-xs">
                  Unbreakable Trust
                </p>
                <h3 className="mt-1 text-center text-lg font-extrabold tracking-tight text-slate-900 sm:text-left sm:text-xl">
                  UNBREAKABLE TRUST
                </h3>
                <p className="mt-2 text-center text-sm font-medium text-slate-500 sm:text-left">
                  Your Images. Our Commitment.
                </p>

                <div className="mt-2 space-y-2 sm:mt-4">
                  {TRUST_POINTS.map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100/80 bg-white/60 px-3 py-2.5 transition hover:border-[#E8352A]/20 hover:bg-white/90"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EF] shadow-sm">
                        <Icon className="h-4 w-4 text-[#E8352A]" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-700">{label}</div>
                        <div className="mt-0.5 text-xs text-slate-500">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="relative z-10 px-5 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-10 lg:grid lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12 lg:px-12 lg:pb-10 lg:pt-16 xl:gap-16">
              {/* Spacer for floating card on desktop */}
              <div className="hidden lg:block" aria-hidden />

              <div className="lg:pt-4">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                  <Shield className="h-3.5 w-3.5 text-white/90" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/95 sm:text-xs">
                    Why Choose SnappEditt
                  </span>
                </div>

                <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Unbreakable Trust.
                  <br />
                  <span className="text-white/90">Professional Results.</span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base">
                  SnappEditt delivers premium photo editing and retouching for real estate, e-commerce,
                  and commercial brands. Every image passes a manual quality review, secure handling, and
                  fast turnaround — so your visuals sell with confidence.
                </p>

                {/* Feature icons */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
                  {FEATURES.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="group flex flex-col items-center gap-2.5 rounded-2xl border border-white/15 bg-white/8 px-3 py-4 text-center backdrop-blur-sm transition hover:border-white/30 hover:bg-white/12"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition group-hover:bg-white/20">
                        <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                      </div>
                      <span className="text-xs font-semibold leading-tight text-white/90 sm:text-sm">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* <BeforeAfterCard /> */}
              </div>
            </div>

            {/* Floating stat cards */}
            {/* <div className="relative z-20 mx-4 mb-6 grid grid-cols-2 gap-3 sm:mx-8 sm:gap-4 lg:mx-12 lg:grid-cols-4 lg:gap-5">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/80 bg-white px-4 py-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.16)] sm:px-5 sm:py-6"
                >
                  <p className="text-xl font-extrabold tracking-tight text-[#E8352A] sm:text-2xl lg:text-[1.65rem]">
                    {value}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))} */}
            {/* </div> */}

            {/* Bottom CTA bar */}
            {/* <div className="relative z-20 mx-4 mb-5 flex flex-col items-stretch gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-5 backdrop-blur-md sm:mx-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6 lg:mx-12">
              <p className="text-center text-base font-semibold text-white sm:text-left sm:text-lg">
                Your Trust Drives Our Excellence
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/free-trial"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#E8352A] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition hover:bg-slate-50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-[0.98]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/before-after"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-transparent px-6 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 active:scale-[0.98]"
                >
                  View Portfolio
                </Link>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
