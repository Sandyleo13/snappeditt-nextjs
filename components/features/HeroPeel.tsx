'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Great_Vibes } from 'next/font/google';
import {
  Star, Clock, Camera, Users, RotateCw,
  MessageSquare, Shield, ChevronLeft, ChevronRight,
  Play, CheckCircle2, Zap, Calendar, Lock, Workflow, BadgeCheck,
  Check
} from 'lucide-react';
import UnbreakableTrust from './UnbreakableTrust';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });

/* ── Typewriter words ── */
const WORDS = ['Enhance...', 'Retouched...', 'Edited...', 'Perfect...', 'Optimize...'];

/* ── Bottom feature cards ── */
const FEATURES = [
  { icon: Camera, label: 'Replicate Style', sub: "Perfectly match your brand's look & feel" },
  { icon: Users, label: 'Expert Team', sub: 'Skilled photo editors you can rely on' },
  { icon: RotateCw, label: 'Unlimited Redo', sub: 'We ensure 100% satisfaction' },
  { icon: MessageSquare, label: 'Expert Consultation', sub: 'Get professional advice tailored to you' },
  { icon: Shield, label: 'Secure & Private', sub: 'Your images are safe with us' },
];

/* ── Stats row ── */
const STATS = [
  { icon: <Star className="w-5 h-5 text-[#E8352A]" />, value: '4.9/5', label: 'Rating', sub: 'From 2K+ Clients' },
  { icon: <Clock className="w-5 h-5 text-[#E8352A]" />, value: '24h', label: 'Delivery', sub: 'Super Fast Turnaround' },
  { icon: <Camera className="w-5 h-5 text-[#E8352A]" />, value: '10K+', label: 'Images', sub: 'Successfully Edited' },
];

export default function AnimatedPhotoHero() {
  /* ── Typewriter ── */
  const [wordIdx, setWordIdx] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

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
  const [pos, setPos] = useState(50);
  const [playing, setPlaying] = useState(true);
  const [dragging, setDragging] = useState(false);
  const dirRef = useRef<1 | -1>(1);
  const imgRef = useRef<HTMLDivElement>(null);
  const [trustOpen, setTrustOpen] = useState(false);

  const handleTrustClick = (e: any) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      e.preventDefault();
      setTrustOpen(v => !v);
    }
  };

  /* Auto ping-pong */
  useEffect(() => {
    if (!playing || dragging) return;
    const id = setInterval(() => {
      setPos((p) => {
        const n = p + dirRef.current * 1.4;
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

  const RED_FEATURES = [
    { icon: Users, label: 'Expert Editors' },
    { icon: Workflow, label: 'Secure Workflow' },
    { icon: Clock, label: 'On-Time Delivery' },
    { icon: BadgeCheck, label: 'Quality Assured' },
  ];

  const RED_STATS = [
    { value: '50K+', label: 'Images Edited' },
    { value: '24 Hours', label: 'Average Delivery' },
    { value: '99%', label: 'Client Satisfaction' },
    { value: '10+ Years', label: 'Experience' },
  ];

  // function GlossyShield() {
  //   return (
  //     <div className="relative mb-4 flex justify-center sm:justify-start">
  //       <div
  //         className="relative flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20"
  //         style={{
  //           background: 'linear-gradient(145deg, #FF6B5B 0%, #E8352A 45%, #A01010 100%)',
  //           boxShadow:
  //             '0 12px 32px rgba(232,53,42,0.45), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 8px rgba(0,0,0,0.15)',
  //         }}
  //       >
  //         <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent" />
  //         <Shield className="relative h-8 w-8 text-white drop-shadow-md sm:h-10 sm:w-10" strokeWidth={1.5} />
  //         <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
  //           <CheckCircle2 className="h-3 w-3 text-[#E8352A]" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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

    return (<></>);
  }

  return (
    <>
      <style>{`
        .floating-float{animation:float 6s ease-in-out infinite;transform-origin:center}
        .group:hover .floating-float{animation-play-state:paused}
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
      `}</style>
      {/* dot-grid background removed to fix parsing error */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pt-14 sm:pt-20 pb-12 sm:pb-16">

        {/* ─── TOP GRID: left copy + right slider ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-8 lg:gap-14 items-center mb-10 sm:mb-14">

          {/* ── LEFT ── */}
          <div>
            <h1 className="text-3xl sm:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.08] mb-3">
              Get Professionally
            </h1>
            <div className="mb-3 min-h-[60px] sm:min-h-[80px]">
              <span className={`${greatVibes.className} text-[#E8352A] text-4xl sm:text-5xl lg:text-7xl leading-tight`}>
                {display}
                <span className="animate-pulse ml-0.5 text-gray-400 font-light text-3xl sm:text-4xl">|</span>
              </span>
            </div>

            {/* subheading */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Images without any Compromise</p>
            </div>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8 max-w-md">
              Professional photo editing that brings out true colors, removes distractions,
              and delivers clean, polished images ready to impress.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                href="/free-trial"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-lg shadow-[#E8352A]/25 hover:scale-105"
              >
                Get Started for Free
              </Link>
            </div>
          </div>

          {/* ── RIGHT: Before/After slider ── */}
          <div className="relative mt-2 lg:mt-0">
            {/* floating label — hidden on very small to avoid clipping */}
            <div className="hidden sm:flex absolute -top-4 -left-4 z-20 bg-white border border-gray-200 rounded-2xl shadow-md px-4 py-2.5 items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-bold text-gray-700">Live Preview</span>
            </div>

            <div
              ref={imgRef}
              className="relative h-[300px] sm:h-[400px] lg:h-[460px] xl:h-[520px] rounded-2xl sm:rounded-[2rem] overflow-hidden border border-gray-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)] select-none cursor-col-resize"
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
                className="absolute top-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#E8352A] shadow-xl flex items-center justify-center cursor-ew-resize"
                style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
                onMouseDown={e => {
                  e.preventDefault();
                  setDragging(true);
                  setPlaying(false);
                  if (imgRef.current) {
                    const { left, width } = imgRef.current.getBoundingClientRect();
                    setPos(Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100)));
                  }
                }}
                onTouchStart={e => {
                  setDragging(true);
                  setPlaying(false);
                  if (imgRef.current && e.touches[0]) {
                    const { left, width } = imgRef.current.getBoundingClientRect();
                    setPos(Math.max(0, Math.min(100, ((e.touches[0].clientX - left) / width) * 100)));
                  }
                }}
              >
                <div className="flex items-center gap-0.5">
                  <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                  <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-3 left-3 z-20">
                <span className="bg-gray-900/75 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">BEFORE</span>
              </div>
              <div className="absolute bottom-3 right-3 z-20">
                <span className="bg-[#E8352A] text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">AFTER</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM: feature cards ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 overflow-visible">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="relative group flex flex-col items-center gap-2.5 sm:gap-3 rounded-2xl border border-gray-200 bg-white px-3 sm:px-4 py-4 sm:py-6 text-center shadow-sm hover:border-[#E8352A]/30 hover:shadow-md transition-all duration-300"
            >
              {/* Hover popup (desktop): appears above the card */}
              <div className="hidden md:block pointer-events-none absolute left-1/2 bottom-full mb-3 w-56 -translate-x-1/2 rounded-lg bg-white p-3 text-left text-sm text-gray-800 shadow-lg opacity-0 scale-95 transform transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50">
                <div className="font-semibold text-gray-900">{label}</div>
                <div className="mt-1 text-xs text-gray-600">{sub}</div>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white shadow-sm" />
              </div>

              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFF0EE] flex items-center justify-center group-hover:bg-[#FFE5E2] transition-colors">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8352A]" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{label}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 leading-snug">{sub}</p>
              <div className="w-5 h-0.5 bg-[#E8352A]/40 rounded-full" />
            </div>
          ))}
        </div>

      </div>


      <div className="relative z-10 w-full py-16 sm:py-24 md:py-28">
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
              <Link href="/about-us" onClick={handleTrustClick} className="relative z-30 group block px-4 sm:px-8 lg:absolute lg:left-40 lg:top-1/2 lg:w-[min(100%,500px)] lg:-translate-y-1/2 xl:left-70 xl:w-[400px]">
                <div
                  className="floating-float border border-white/70 mb-60 p-4 sm:p-5 lg:pt-5 lg:pb-3 lg:px-7 rounded-3xl transform transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-[#E8352A]/25 bg-white"
                  style={{
                    background: 'white',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow:
                      '0 40px 80px rgba(0,0,0,0.18), 0 8px 30px rgba(232,53,42,0.12), 0 0 0 1px rgba(255,255,255,0.5) inset',
                  }}
                >
                  {/* Hover popup for the floating trust card (desktop only) */}
                  <div className="hidden md:block pointer-events-none absolute left-1/2 bottom-full mb-3 w-64 -translate-x-1/2 rounded-lg bg-white p-3 text-left text-sm text-gray-800 shadow-lg opacity-0 scale-95 transform transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50">
                    <div className="font-semibold text-gray-900">Why Clients Trust Us</div>
                    <div className="mt-1 text-xs text-gray-600">100% manual checks, secure workflow, fast delivery, and dedicated editors.</div>
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white shadow-sm" />
                  </div>
                  {/* Mobile tap-to-open popup (controlled by state) */}
                  <div className={`md:hidden pointer-events-auto absolute left-1/2 bottom-full mb-3 w-64 -translate-x-1/2 rounded-lg bg-white p-3 text-left text-sm text-gray-800 shadow-lg transform transition-all duration-200 z-50 ${trustOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="font-semibold text-gray-900">Why Clients Trust Us</div>
                    <div className="mt-1 text-xs text-gray-600">100% manual checks, secure workflow, fast delivery, and dedicated editors.</div>
                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white shadow-sm" />
                    <div className="mt-3 text-right">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8352A] text-white text-xs font-semibold">Learn More</span>
                    </div>
                  </div>
                  {/* <GlossyShield /> */}

                  <h3 className="mt-1 text-center text-lg font-extrabold tracking-tight text-[#FF4436] sm:text-left sm:text-xl">
                    UNBREAKABLE TRUST
                  </h3>


                  <p>
                    SnappEditt is a Professional Editing/Post Production Studio with a personal touch and consistent results every time.
                    We know the hustle of editing the images after exhausting real estate photo shoots or weddings as we are photographers.
                  </p>
                  <br />
                  <p>Whether you’ve never outsourced post-production in your life or you’re
                    experienced and are looking to find a better alternative, we’ve got this!</p>
                  {/* Avatar row */}
                  <div className="mt-4 flex -space-x-3 justify-center sm:justify-start">
                    {['VG','RJ','SM','KP','NL'].map((t,i)=> (
                      <div key={i} className="h-8 w-8 rounded-full ring-2 ring-white bg-[#FFECEB] flex items-center justify-center text-xs font-semibold text-[#E8352A] shadow-sm">{t}</div>
                    ))}
                  </div>
                  </div>
                </Link>

              {/* Main content area */}
              <div className="relative z-10 px-5 pb-4 pt-2 sm:px-10 sm:pb-4 sm:pt-5 lg:grid lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12 lg:px-12 lg:pb-10 lg:pt-16 xl:gap-16">
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
                    Let’s Discover A Brand-New Dimension In Photo Editing & Retouching Services.
                    <br />
                    {/* <span className="text-white/90">Professional Results.</span> */}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base">
                    We are a leading outsourcing Professional Editing / Retouching service provider from Mumbai, India. We are currently serving a wide range of clients in diverse sectors such as Digital Studios, Photographers, Photography companies, Ad agencies, Real Estate agencies,
                    E-Commerce, Fashion, etc. from all around the globe at cost-effective rates.
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
                    <Link
                      href="/about-us"
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#FFF] border border-white/25 text-[#FF4436] font-bold text-sm hover:bg-[#F0F0F0] transition-all shadow-lg shadow-[#E8352A]/25 hover:scale-105"
                    >
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {/* Feature icons */}
                  {/* <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
                  {RED_FEATURES.map(({ icon: Icon, label }) => (
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
                </div> */}

                  {/* <BeforeAfterCard /> */}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
}
