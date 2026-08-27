"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Great_Vibes } from "next/font/google";
import {
  Star,
  Clock,
  Camera,
  Users,
  RotateCw,
  MessageSquare,
  Shield,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Zap,
  Calendar,
  Lock,
  Workflow,
  BadgeCheck,
  Check,
} from "lucide-react";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

/* ── Typewriter words ── */
const WORDS = [
  "Enhanced...",
  "Retouched...",
  "Edited...",
  "Perfected...",
  "Optimized...",
];

/* ── Bottom feature cards ── */
const FEATURES = [
  {
    icon: Camera,
    label: "Replicate Style",
    sub: "Perfectly match your brand's look & feel",
  },
  {
    icon: Users,
    label: "Expert Team",
    sub: "Skilled photo editors you can rely on",
  },
  {
    icon: RotateCw,
    label: "Unlimited Redo",
    sub: "We ensure 100% satisfaction",
  },
  {
    icon: MessageSquare,
    label: "Expert Consultation",
    sub: "Get professional advice tailored to you",
  },
  {
    icon: Shield,
    label: "Secure & Private",
    sub: "Your images are safe with us",
  },
];

/* ── Stats row ── */
const STATS = [
  {
    icon: <Star className="w-5 h-5 text-[#E8352A]" />,
    value: "4.9/5",
    label: "Rating",
    sub: "From 2K+ Clients",
  },
  {
    icon: <Clock className="w-5 h-5 text-[#E8352A]" />,
    value: "24h",
    label: "Delivery",
    sub: "Super Fast Turnaround",
  },
  {
    icon: <Camera className="w-5 h-5 text-[#E8352A]" />,
    value: "10K+",
    label: "Images",
    sub: "Successfully Edited",
  },
];

export default function AnimatedPhotoHero() {
  /* ── Typewriter ── */
  const [wordIdx, setWordIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.substring(0, display.length + 1);
          setDisplay(next);
          if (next === word) setTimeout(() => setDeleting(true), 1600);
        } else {
          const next = word.substring(0, display.length - 1);
          setDisplay(next);
          if (next === "") {
            setDeleting(false);
            setWordIdx((i) => (i + 1) % WORDS.length);
          }
        }
      },
      deleting ? 55 : 110,
    );
    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx]);

  /* ── Before/After slider ── */
  const [pos, setPos] = useState(50);
  const [playing, setPlaying] = useState(true);
  const [dragging, setDragging] = useState(false);
  const dirRef = useRef<1 | -1>(1);
  const imgRef = useRef<HTMLDivElement>(null);
  const calcPos = (clientX: number) => {
  if (!imgRef.current) return;

  const rect = imgRef.current.getBoundingClientRect();

  const percentage = ((clientX - rect.left) / rect.width) * 100;

  setPos(Math.max(0, Math.min(100, percentage)));
};
  const [trustOpen, setTrustOpen] = useState(false);

  const handleTrustClick = (e: any) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      e.preventDefault();
      setTrustOpen((v) => !v);
    }
  };

  /* Auto ping-pong */
  useEffect(() => {
  if (!playing || dragging) return;

  const interval = setInterval(() => {
    setPos((prev) => {
      let next = prev + dirRef.current * 1.2;

      if (next >= 100) {
        dirRef.current = -1;
        next = 100;
      }

      if (next <= 0) {
        dirRef.current = 1;
        next = 0;
      }

      return next;
    });
  }, 25);

  return () => clearInterval(interval);
}, [playing, dragging]);

  const TRUST_POINTS = [
    {
      icon: CheckCircle2,
      label: "100% Manual Quality Check",
      desc: "Every image is carefully reviewed before delivery.",
    },
    {
      icon: Lock,
      label: "Secure Workflow",
      desc: "Your files are safe with us — 100% confidential.",
    },
    {
      icon: Zap,
      label: "Fast Delivery",
      desc: "Quick turnaround without compromising quality.",
    },
    {
      icon: Calendar,
      label: "Trusted Since 2015",
      desc: "Delivering consistent quality for over 10 years.",
    },
  ];

  const RED_FEATURES = [
    { icon: Users, label: "Expert Editors" },
    { icon: Workflow, label: "Secure Workflow" },
    { icon: Clock, label: "On-Time Delivery" },
    { icon: BadgeCheck, label: "Quality Assured" },
  ];

  const RED_STATS = [
    { value: "50K+", label: "Images Edited" },
    { value: "24 Hours", label: "Average Delivery" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "10+ Years", label: "Experience" },
  ];

  
  return (
    <>
      <style>{`
        .floating-float{animation:float 6s ease-in-out infinite;transform-origin:center}
        .group:hover .floating-float{animation-play-state:paused}
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
      `}</style>
      {/* dot-grid background removed to fix parsing error */}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pt-14 sm:pt-20 pb-12 sm:pb-16 scroll-mt-24">
        {/* ─── TOP GRID: left copy + right slider ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.45fr] gap-8 lg:gap-14 items-center mb-10 sm:mb-14">
          {/* ── LEFT ── */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              Get Professionally
            </h1>
            <div className="mb-4 min-h-[50px] sm:min-h-[65px] lg:min-h-[90px]">
              <span
                className={`${greatVibes.className} text-[#E8352A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight`}
              >
                {display}
                <span className="animate-pulse ml-0.5 text-gray-400 font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                  |
                </span>
              </span>
            </div>

            {/* subheading */}
          </div>

          {/* ── RIGHT: Before/After slider ── */}
          <div className="relative mt-2 lg:mt-0">
            {/* floating label — hidden on very small to avoid clipping */}
            <div
              className="hidden sm:flex absolute -top-4 -left-4 z-20 bg-white 
            border border-gray-200 rounded-2xl shadow-md px-4 py-2.5 items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-bold text-gray-700">
                Live Preview
              </span>
            </div>

            <div
              ref={imgRef}
              className="
    relative
    h-[240px]
    sm:h-[320px]
    md:h-[400px]
    lg:h-[480px]
    xl:h-[560px]
    rounded-2xl
    sm:rounded-[2rem]
    overflow-hidden
    border
    border-gray-200
    bg-white
    shadow-[0_16px_40px_rgba(15,23,42,0.10)]
    select-none
    cursor-col-resize
  "
              onMouseEnter={() => {
  setPlaying(false);
}}

onMouseLeave={() => {
  if (!dragging) {
    setPlaying(true);
  }
}}
            >
              {/* BEFORE */}
              <Image
                src="/images/Virtual-Staging-SPH-Corrected-1.webp"
                alt="After editing"
                fill
                sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 90vw,
         50vw"
                className="object-cover"
                draggable={false}
              />

              {/* AFTER */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <Image
                  src="/images/Virtual-Staging-SPH-Raw-1.webp"
                  alt="Before editing"
                  fill
                  priority
                  className="object-cover"
                  draggable={false}
                />
              </div>

              {/* Divider line */}
              <div
                className="absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              />

              {/* Handle */}
              <div
                className="
absolute
top-1/2
z-30
w-9 h-9
sm:w-10 sm:h-10
md:w-11 md:h-11
lg:w-12 lg:h-12
rounded-full
bg-white
border-2
border-[#E8352A]
shadow-xl
flex
items-center
justify-center
cursor-ew-resize
touch-none
"
                style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDragging(true);
                  setPlaying(false);
                  if (imgRef.current) {
                    const { left, width } =
                      imgRef.current.getBoundingClientRect();
                    setPos(
                      Math.max(
                        0,
                        Math.min(100, ((e.clientX - left) / width) * 100),
                      ),
                    );
                  }
                }}
                onTouchStart={(e) => {
                  setDragging(true);
                  setPlaying(false);
                  if (imgRef.current && e.touches[0]) {
                    const { left, width } =
                      imgRef.current.getBoundingClientRect();
                    setPos(
                      Math.max(
                        0,
                        Math.min(
                          100,
                          ((e.touches[0].clientX - left) / width) * 100,
                        ),
                      ),
                    );
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
                <span className="bg-gray-900/75 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
                  BEFORE
                </span>
              </div>
              <div className="absolute bottom-3 right-3 z-20">
                <span className="bg-[#E8352A] text-white text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
                  AFTER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOTTOM: feature cards ─── */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-3 sm:gap-4 overflow-visible">
          {FEATURES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="relative group flex flex-col items-center gap-2.5 sm:gap-3 rounded-2xl border border-gray-200 
              bg-white px-3 sm:px-4 py-4 sm:py-6 text-center shadow-sm hover:border-[#E8352A]/30 hover:shadow-md transition-all duration-300"
            >
              {/* Hover popup (desktop): appears above the card */}
              <div className="hidden md:block pointer-events-none absolute left-1/2 bottom-full mb-3 w-56 -translate-x-1/2 rounded-lg bg-white p-3 text-left text-sm text-gray-800 shadow-lg opacity-0 scale-95 transform transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50">
                <div className="font-semibold text-gray-900">{label}</div>
                <div className="mt-1 text-xs text-gray-600">{sub}</div>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white shadow-sm" />
              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-[#FFF0EE]">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8352A]" />
              </div>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight">
                {label}
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-snug">
                {sub}
              </p>
              {/* <div className="w-5 h-0.5 bg-[#E8352A]/40 rounded-full" /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full mt-20 xl:mt-40 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -skew-y-12 bg-[linear-gradient(135deg,#D71920_0%,#EF4444_55%,#8B0A0A_100%)] origin-top-right -z-10" />
        <div className="pointer-events-none absolute inset-0 -skew-y-12 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_22%)] opacity-70 origin-top-right -z-10" />
        <div className="pointer-events-none absolute inset-0 -skew-y-12 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_25%)] opacity-55 origin-top-right -z-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.045),transparent_50%)] -z-10" />

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,450px)_1fr] items-center py-10 lg:py-0">
              <div className="relative ">
                <div
                  className="
relative
gsap-float
overflow-hidden
rounded-[2rem]
sm:rounded-[2.5rem]
border
border-white/20
bg-white
shadow-[0_40px_100px_rgba(0,0,0,0.18)]
transition-transform
duration-300
hover:-translate-y-1
min-h-[340px]
sm:min-h-[380px]
lg:min-h-[430px]
"
                >
                  <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-[#FEE2E2] opacity-70 blur-3xl" />
                  <div className="absolute left-0 top-0 h-16 w-full bg-gradient-to-b from-white/95 to-transparent" />
                  <div className="relative flex h-full  flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#FDE8E8] bg-[#FEF2F2] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-[#842929]">
                        <Shield className="h-3.5 w-3.5 text-[#D71920]" />
                        WHY CHOOSE SNAPPEDITT
                      </div>

                      <h3 className="mt-8 text-xl font-extrabold tracking-tight text-[#111111] sm:text-2xl">
                        UNBREAKABLE{" "}
                        <span className="text-[#D71920]">TRUST</span>
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
                        A premium photo editing studio for wedding, ecommerce,
                        fashion, and real estate brands.
                      </p>

                      {/* <div className="mt-8 grid gap-3">
                        {['Wedding', 'Ecommerce', 'Fashion', 'Real Estate'].map((item) => (
                          <div key={item} className="flex items-center gap-3 rounded-3xl border border-[#F3F4F6] bg-[#FEF2F2] px-4 py-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FEE2E2] text-[#D71920] shadow-sm">
                              <Check className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-medium text-[#111111]">{item}</span>
                          </div>
                        ))}
                      </div> */}
                      <p className="mt-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                        SnappEditt is a Professional Editing/Post Production
                        Studio with a personal touch and consistent results
                        every time. We know the hustle of editing the images
                        after exhausting real estate photo shoots or weddings as
                        we are photographers.
                      </p>
                      <p className="mt-2">
                        Whether you’ve never outsourced post-production in your
                        life or you’re experienced and are looking to find a
                        better alternative, we’ve got this!
                      </p>
                    </div>

                    <div className="mt-4 rounded-[1.75rem] border border-[#FEE2E2] bg-[#FFEBEE] px-5 py-5 text-center">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-[#9CA3AF]">
                        Premium Results
                      </p>
                      <p className="mt-3 text-2xl font-bold tracking-tight text-[#111111]">
                        1000+ Projects
                      </p>
                      <p className="mt-1 text-sm text-[#4B5563]">
                        Delivered with editorial polish
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center lg:min-h-[460px] lg:pt-24 lg:translate-y-16 lg:mb-16">
                <div
                  className="
  w-full
  max-w-xl
  lg:max-w-3xl
  xl:max-w-4xl
  space-y-5
  sm:space-y-6
  lg:space-y-8
  lg:pl-8
  xl:pl-12
"
                >
                  {/* <span className="inline-flex  items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/90 backdrop-blur-sm">
                    WHY CHOOSE SNAPPEDITT   
                  </span> */}
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold lg:font-black tracking-tight text-white leading-tight mt-8 md:mt-12 lg:mt-20
    drop-shadow-[0_22px_40px_rgba(0,0,0,0.22)]
  "
                  >
                    A premium image workflow
                    <br className="hidden lg:block" />
                    for agencies, studios, and enterprise brands.
                  </h2>
                  <p
                    className="
    max-w-xl
    text-sm
    sm:text-base
    lg:text-lg
    leading-relaxed
    text-white/90
    mt-4
  "
                  >
                    SnappEditt delivers editorial-grade photo editing with a
                    refined, studio-quality process — built for photographers,
                    ecommerce brands, and creative agencies who demand premium
                    results.
                  </p>

                  {/* <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Manual quality review</p>
                        <p className="text-xs text-white/70">Every image polished by hand.</p>
                      </div>
                    </div>
                    {/* <div className="flex items-start gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-4">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Secure workflow</p>
                        <p className="text-xs text-white/70">Safe media handling end to end.</p>
                      </div>
                    </div> */}
                  {/* </div>  */}

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/about-us"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-[#D71920] shadow-lg shadow-[#D71920]/15 transition hover:scale-[1.02]"
                    >
                      Learn More
                      <ChevronRight className="w-7 h-7" />
                    </Link>
                    {/* <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80">
                      Trusted Creative Studio
                    </span> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 mb-8 grid gap-3 sm:grid-cols-4">
              {RED_FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group transform-gpu will-change-transform flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#FFFF] transition-colors duration-200 group-hover:bg-white/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-white drop-shadow-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  );
}