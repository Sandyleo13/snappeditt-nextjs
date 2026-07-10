'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Great_Vibes } from 'next/font/google';
import {
  Star, Clock, Camera, Users, RotateCw,
  MessageSquare, Shield, ChevronLeft, ChevronRight,
  Play,
} from 'lucide-react';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

/* ── Typewriter words ── */
const WORDS = ['Enhance...', 'Retouch...', 'Edit...', 'Perfect...', 'Optimize...'];

/* ── Bottom feature cards ── */
const FEATURES = [
  { icon: Camera,       label: 'Replicate Style',       sub: "Perfectly match your brand's look & feel" },
  { icon: Users,        label: 'Expert Team',           sub: 'Skilled photo editors you can rely on' },
  { icon: RotateCw,     label: 'Unlimited Redo',        sub: 'We ensure 100% satisfaction' },
  { icon: MessageSquare,label: 'Expert Consultation',   sub: 'Get professional advice tailored to you' },
  { icon: Shield,       label: 'Secure & Private',      sub: 'Your images are safe with us' },
];

/* ── Stats row ── */
const STATS = [
  { icon: <Star  className="w-5 h-5 text-[#E8352A]" />, value: '4.9/5',  label: 'Rating',           sub: 'From 2K+ Clients' },
  { icon: <Clock className="w-5 h-5 text-[#E8352A]" />, value: '24h',    label: 'Delivery',         sub: 'Super Fast Turnaround' },
  { icon: <Camera className="w-5 h-5 text-[#E8352A]"/>, value: '10K+',   label: 'Images',           sub: 'Successfully Edited' },
];

export default function AnimatedPhotoHero() {
  /* ── Typewriter ── */
  const [wordIdx, setWordIdx]       = useState(0);
  const [display, setDisplay]       = useState('');
  const [deleting, setDeleting]     = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = word.substring(0, display.length + 1);
        setDisplay(next);
        if (next === word) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = word.substring(0, display.length - 1);
        setDisplay(next);
        if (next === '') {
          setDeleting(false);
          setWordIdx(i => (i + 1) % WORDS.length);
        }
      }
    }, deleting ? 55 : 110);
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx]);

  /* ── Before/After slider ── */
  const [pos, setPos]           = useState(50);
  const [playing, setPlaying]   = useState(true);
  const [dragging, setDragging] = useState(false);
  const dirRef                  = useRef<1 | -1>(1);
  const imgRef                  = useRef<HTMLDivElement>(null);

  /* Auto ping-pong */
  useEffect(() => {
    if (!playing || dragging) return;
    const id = setInterval(() => {
      setPos(p => {
        const n = p + dirRef.current * 1.4;
        if (n >= 100) { dirRef.current = -1; return 100; }
        if (n <= 0)   { dirRef.current =  1; return 0;   }
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
    const mm = (e: MouseEvent) => { if (dragging) calcPos(e.clientX); };
    const tm = (e: TouchEvent)  => { if (dragging && e.touches[0]) calcPos(e.touches[0].clientX); };
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
    <section className="relative bg-[#F8F9FB] overflow-hidden">

      {/* ── dot-grid bg ── */}
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
          <defs>
            <pattern id="hpdots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.5" fill="#E8352A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hpdots)" />
        </svg>
        {/* radial glow left */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
        {/* radial glow right */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.05) 0%, transparent 70%)' }} />
        {/* floating red shapes */}
        <div className="absolute top-[14%] left-[38%] w-10 h-10 bg-[#E8352A]/15 rounded-xl rotate-12" />
        <div className="absolute bottom-[18%] right-[6%]  w-7 h-7 bg-[#E8352A]/10 rounded-lg -rotate-12" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-10 xl:px-14 pt-20 pb-16">

        {/* ─── TOP GRID: left copy + right slider ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-10 lg:gap-14 items-center mb-14">

          {/* ── LEFT ── */}
          <div>
            {/* badge */}
            {/* <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6">
              <span className="w-5 h-5 rounded-full bg-[#FFF0EE] flex items-center justify-center">
                <Star className="w-3 h-3 text-[#E8352A] fill-[#E8352A]" />
              </span>
              <span className="text-xs font-semibold text-gray-700">Professional Photo Editing Services</span>
            </div> */}

            {/* headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.08] mb-3">
              Get Professionally
            </h1>
            <div className="mb-3 min-h-[80px]">
              <span className={`${greatVibes.className} text-[#E8352A] text-5xl sm:text-6xl lg:text-7xl leading-tight`}>
                {display}
                <span className="animate-pulse ml-0.5 text-gray-400 font-light text-4xl">|</span>
              </span>
            </div>

            {/* subheading */}
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-1 h-6 bg-[#E8352A] rounded-full" /> */}
              <p className="text-lg sm:text-xl font-bold text-gray-900">Images without any Compromise</p>
            </div>

            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              Professional photo editing that brings out true colors, removes distractions,
              and delivers clean, polished images ready to impress.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/free-trial"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-lg shadow-[#E8352A]/25 hover:scale-105"
              >
              
                Get Started for Free
              </Link>
              {/* <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-800 font-bold text-sm hover:border-gray-300 transition-all shadow-sm">
                <Play className="w-4 h-4 fill-gray-700" />
                Watch Demo
              </button> */}
            </div>

            {/* Stats */}
            {/* <div className="flex flex-wrap gap-6">
              {STATS.map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0EE] border border-[#FFD5CE] flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-gray-900 leading-none">{s.value} <span className="text-sm font-bold text-gray-700">{s.label}</span></p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ── RIGHT: Before/After slider ── */}
          <div className="relative">
            {/* floating label top-left */}
            <div className="absolute -top-4 -left-4 z-20 bg-white border border-gray-200 rounded-2xl shadow-md px-4 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-bold text-gray-700">Live Preview</span>
            </div>

            <div
              ref={imgRef}
              className="relative h-[460px] sm:h-[520px] rounded-[2rem] overflow-hidden border border-gray-200 bg-white shadow-[0_32px_64px_rgba(15,23,42,0.10)] select-none cursor-col-resize"
              onMouseEnter={() => setPlaying(false)}
              onMouseLeave={() => { if (!dragging) setPlaying(true); }}
            >
              {/* BEFORE */}
              <img
                src="/images/Virtual-Staging-SPH-Raw-1.webp"
                alt="Before editing"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* AFTER */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img
                  src="/images/Virtual-Staging-SPH-Corrected-1.webp"
                  alt="After editing"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* Divider line */}
              <div
                className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
              />

              {/* Handle */}
              <div
                className="absolute top-1/2 z-30 w-12 h-12 rounded-full bg-white border-2 border-[#E8352A] shadow-xl flex items-center justify-center cursor-ew-resize"
                style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
                onMouseDown={e => { e.preventDefault(); setDragging(true); setPlaying(false); calcPos(e.clientX); }}
                onTouchStart={e => { setDragging(true); setPlaying(false); calcPos(e.touches[0].clientX); }}
              >
                <div className="flex items-center gap-0.5">
                  <ChevronLeft  className="w-3 h-3 text-[#E8352A]" />
                  <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-gray-900/75 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full">BEFORE</span>
              </div>
              <div className="absolute bottom-4 right-4 z-20">
                <span className="bg-[#E8352A] text-white text-xs font-bold px-4 py-1.5 rounded-full">AFTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM: feature cards ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm hover:border-[#E8352A]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFF0EE] flex items-center justify-center group-hover:bg-[#FFE5E2] transition-colors">
                <Icon className="w-6 h-6 text-[#E8352A]" />
              </div>
              <p className="text-sm font-bold text-gray-900">{label}</p>
              <p className="text-xs text-gray-400 leading-snug">{sub}</p>
              <div className="w-6 h-0.5 bg-[#E8352A]/40 rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
