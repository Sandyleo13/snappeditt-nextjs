"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Globe,
  Network,
  Star,
  Users,
  Shield,
  Target,
  Award,
  Zap,
  Camera,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* =========================================================
   SERVICES SECTION
========================================================= */

function ServicesSection({
  services,
  sectionTitle,
  sectionDesc,
}: {
  services: {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bg: string;
  }[];
  sectionTitle: string;
  sectionDesc: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F8F9FB] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block text-xl font-bold uppercase tracking-[0.2em] text-[#E8352A]">
            What We Offer
          </span>

          <h2 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] md:text-5xl">
            {sectionTitle}{" "}
            <span className="text-[#E8352A]">Services</span>
          </h2>

          <p className="text-lg text-[#777]">{sectionDesc}</p>
        </motion.div>

        <div
          ref={ref}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.07,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-6 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-lg"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)`,
                }}
              />

              <div
                className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, transparent, ${service.color}, transparent)`,
                }}
              />

              <div
                className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: service.bg,
                  color: service.color,
                }}
              >
                {React.createElement(service.icon, {
                  size: 24,
                })}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-[#1A1A1A]">
                {service.title}
              </h3>

              <p className="mb-5 text-lg leading-relaxed text-[#888]">
                {service.description}
              </p>

              <div
                className="flex items-center gap-1.5 text-xl font-semibold"
                style={{ color: service.color }}
              >
                <span>Learn more</span>

                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <span className="absolute right-5 top-4 text-[11px] font-bold text-[#1A1A1A]/10">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function HRDPremiumPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Slider position lives in CSS, not React state, so dragging/animation
  // does not cause a component render on every pointer/frame update.
  const sliderPositionRef = useRef(50);
  const isDraggingRef = useRef(false);
  const autoAnimationRef = useRef<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  /* =======================================================
     10 BEFORE / AFTER IMAGE PAIRS
  ======================================================= */

  const hrCases = [
    {
      id: 1,
      beforeTitle: "Raw Image",
      afterTitle: "Premium HDR Finish",
      beforeImage: "/images/HD-Premium/1-before.webp",
      afterImage: "/images/HD-Premium/1-after.webp",
      description:
        "Professional HDR processing with balanced exposure, detail recovery, and natural color.",
    },
    {
      id: 2,
      beforeTitle: "Original Image",
      afterTitle: "Enhanced HDR",
      beforeImage: "/images/HD-Premium/2-before.webp",
      afterImage: "/images/HD-Premium/2-after.webp",
      description:
        "Recover detail from highlights and shadows while maintaining realistic tones.",
    },
    {
      id: 3,
      beforeTitle: "Raw Photo",
      afterTitle: "Premium Retouch",
      beforeImage: "/images/HD-Premium/3-before.webp",
      afterImage: "/images/HD-Premium/3-after.webp",
      description:
        "Professional tonal correction and color refinement for a polished final image.",
    },
    {
      id: 4,
      beforeTitle: "Before Editing",
      afterTitle: "HDR Enhanced",
      beforeImage: "/images/HD-Premium/4-before.webp",
      afterImage: "/images/HD-Premium/4-after.webp",
      description:
        "Enhance image depth, contrast, and overall visual balance.",
    },
    {
      id: 5,
      beforeTitle: "Original",
      afterTitle: "Premium Finish",
      beforeImage: "/images/HD-Premium/5-before.webp",
      afterImage: "/images/HD-Premium/5-after.webp",
      description:
        "Create a clean, premium appearance with controlled highlights and shadows.",
    },
    {
      id: 6,
      beforeTitle: "Raw Photo",
      afterTitle: "Professional HDR",
      beforeImage: "/images/HD-Premium/6-before.webp",
      afterImage: "/images/HD-Premium/6-after.webp",
      description:
        "Improve tonal range and preserve important details throughout the image.",
    },
    {
      id: 7,
      beforeTitle: "Before",
      afterTitle: "After Retouching",
      beforeImage: "/images/HD-Premium/7-before.webp",
      afterImage: "/images/HD-Premium/7-after.webp",
      description:
        "Natural-looking professional enhancement with refined color and exposure.",
    },
    {
      id: 8,
      beforeTitle: "Original",
      afterTitle: "HDR Premium",
      beforeImage: "/images/HD-Premium/8-before.webp",
      afterImage: "/images/HD-Premium/8-after.webp",
      description:
        "Bring out subtle details while keeping the final result natural and realistic.",
    },
    {
      id: 9,
      beforeTitle: "Raw Image",
      afterTitle: "Enhanced Result",
      beforeImage: "/images/HD-Premium/9-before.webp",
      afterImage: "/images/HD-Premium/9-after.webp",
      description:
        "Premium exposure and color correction for a clean professional finish.",
    },
    {
      id: 10,
      beforeTitle: "Before",
      afterTitle: "Premium HDR",
      beforeImage: "/images/HD-Premium/10-before.webp",
      afterImage: "/images/HD-Premium/10-after.webp",
      description:
        "Final HDR enhancement with balanced tones, clean detail, and natural color.",
    },
  ];

  const currentCase = hrCases[currentCaseIndex];

  useEffect(() => {
    const current = hrCases[currentCaseIndex];
    const next = hrCases[(currentCaseIndex + 1) % hrCases.length];

    const preload = (src: string) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    };

    // Keep the current pair ready and prepare the next pair before
    // the automatic transition reaches it.
    preload(current.beforeImage);
    preload(current.afterImage);
    preload(next.beforeImage);
    preload(next.afterImage);
  }, [currentCaseIndex]);

  /* =======================================================
     FAST SLIDER ENGINE
  ======================================================= */

  const setVisualPosition = (position: number) => {
    const clamped = Math.max(0, Math.min(100, position));
    sliderPositionRef.current = clamped;

    const value = `${clamped}%`;

    if (heroSliderRef.current) {
      heroSliderRef.current.style.setProperty(
        "--slider-position",
        value,
      );
    }

    if (sliderRef.current) {
      sliderRef.current.style.setProperty(
        "--slider-position",
        value,
      );
    }
  };

  const getSliderPosition = (
    clientX: number,
    target: HTMLDivElement,
  ) => {
    const rect = target.getBoundingClientRect();

    if (!rect.width) {
      return sliderPositionRef.current;
    }

    return Math.max(
      0,
      Math.min(
        100,
        ((clientX - rect.left) / rect.width) * 100,
      ),
    );
  };

  const stopAutoSlider = () => {
    if (autoAnimationRef.current !== null) {
      cancelAnimationFrame(autoAnimationRef.current);
      autoAnimationRef.current = null;
    }

  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    const target = targetRef.current;
    if (!target) return;

    e.preventDefault();

    isDraggingRef.current = true;
    setIsDragging(true);
    stopAutoSlider();

    target.setPointerCapture?.(e.pointerId);
    setVisualPosition(getSliderPosition(e.clientX, target));
  };

  const handleSliderKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    const step = e.shiftKey ? 10 : 5;
    let nextPosition = sliderPositionRef.current;

    if (e.key === "ArrowLeft") {
      nextPosition -= step;
    } else if (e.key === "ArrowRight") {
      nextPosition += step;
    } else if (e.key === "Home") {
      nextPosition = 0;
    } else if (e.key === "End") {
      nextPosition = 100;
    } else {
      return;
    }

    e.preventDefault();
    stopAutoSlider();
    setVisualPosition(nextPosition);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    if (!isDraggingRef.current) return;

    const target = targetRef.current;
    if (!target) return;

    e.preventDefault();
    setVisualPosition(getSliderPosition(e.clientX, target));
  };

  const handlePointerUp = (
    e: React.PointerEvent<HTMLDivElement>,
    targetRef: React.RefObject<HTMLDivElement | null>,
  ) => {
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      targetRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {
      // Pointer capture may already have been released.
    }
  };

  const changeCase = (index: number) => {
    const normalizedIndex =
      (index + hrCases.length) % hrCases.length;

    setCurrentCaseIndex(normalizedIndex);
    setVisualPosition(50);
  };

  /* =======================================================
     AUTOMATIC BEFORE / AFTER ANIMATION

     Only the CSS custom property is animated.
     No React state updates happen during animation frames.
  ======================================================= */

  useEffect(() => {
    if (isDragging) return;

    const animationDuration = 2600;
    const edgePauseDuration = 350;
    let direction: 1 | -1 = 1;
    let startTime: number | null = null;
    let pauseUntil = 0;

    setVisualPosition(50);

    const animate = (timestamp: number) => {
      if (isDraggingRef.current) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      if (timestamp < pauseUntil) {
        autoAnimationRef.current =
          requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(
        (timestamp - startTime) / animationDuration,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 3);

      setVisualPosition(
        direction === 1
          ? 50 + 50 * eased
          : 100 - 50 * eased,
      );

      if (progress < 1) {
        autoAnimationRef.current =
          requestAnimationFrame(animate);
        return;
      }

      if (direction === 1) {
        direction = -1;
        startTime = null;
        pauseUntil = timestamp + edgePauseDuration;
      } else {
        setVisualPosition(50);
        setCurrentCaseIndex(
          (prev) => (prev + 1) % hrCases.length,
        );
        direction = 1;
        startTime = null;
        pauseUntil = timestamp + edgePauseDuration;
      }

      autoAnimationRef.current =
        requestAnimationFrame(animate);
    };

    autoAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (autoAnimationRef.current !== null) {
        cancelAnimationFrame(autoAnimationRef.current);
        autoAnimationRef.current = null;
      }
    };
  }, [isDragging]);

  /* =======================================================
     CART
  ======================================================= */

  const addToCart = () => {
    const pricePerImage = 0.20;
    const imageCount = 50;

    const total = parseFloat(
      (pricePerImage * imageCount).toFixed(2)
    );

    const cartItem = {
      service_name: "HDR Premium",
      qty: 1,
      price: pricePerImage,
      retouching: "HDR Premium",
      order_name: currentCase.afterTitle,
      order_images: imageCount,
      order_details: currentCase.description,
      addons: [],
      total,
    };

    try {
      const existing =
        document.cookie.match(
          /(^| )cart=([^;]+)/
        );

      const currentCart = existing
        ? JSON.parse(
            decodeURIComponent(existing[2])
          )
        : [];

      const updatedCart = Array.isArray(
        currentCart
      )
        ? [...currentCart, cartItem]
        : [cartItem];

      document.cookie =
        "cart=" +
        encodeURIComponent(
          JSON.stringify(updatedCart)
        ) +
        "; path=/";
    } catch {
      document.cookie =
        "cart=" +
        encodeURIComponent(
          JSON.stringify([cartItem])
        ) +
        "; path=/";
    }

    window.location.href = "/cart";
  };

  /* =======================================================
     SERVICES
  ======================================================= */

  const services: {
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    bg: string;
  }[] = [
    {
      title: "HDR Merging",
      description:
        "Blend multiple exposures into one perfectly balanced HDR image.",
      icon: Camera,
      color: "#E8352A",
      bg: "#FFF0EE",
    },
    {
      title: "Advanced Tone Mapping",
      description:
        "Professional tone mapping with natural-looking results.",
      icon: Target,
      color: "#7C3AED",
      bg: "#F5F0FF",
    },
    {
      title: "Color Correction",
      description:
        "Advanced color grading and correction for premium images.",
      icon: Crown,
      color: "#0EA5E9",
      bg: "#F0F9FF",
    },
    {
      title: "Detail Enhancement",
      description:
        "Recover fine details while maintaining a natural appearance.",
      icon: Network,
      color: "#10B981",
      bg: "#ECFDF5",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative min-h-screen w-full overflow-hidden bg-[#0D0D0F]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)",
            }}
          />

          <div
            className="absolute -bottom-20 -right-32 h-[500px] w-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)",
            }}
          />

          <svg
            className="absolute inset-0 h-full w-full opacity-[0.06]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="#E8352A"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="url(#grid)"
            />
          </svg>
        </div>

        <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-20 xl:px-24">
            <motion.div
              initial={{
                opacity: 0,
                y: -16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-8 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />

              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">
                Premium HDR Retouching
              </span>
            </motion.div>

            <h1 className="mb-6 font-extrabold leading-[0.95] tracking-tight">
              {["HDR", "Premium", "Retouching"].map(
                (word, i) => (
                  <motion.span
                    key={word}
                    className={`block text-[clamp(3rem,7vw,6.5rem)] ${
                      i === 1
                        ? "text-[#E8352A]"
                        : "text-white"
                    }`}
                    initial={{
                      opacity: 0,
                      x: -60,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      duration: 0.6,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    {word}
                  </motion.span>
                )
              )}
            </h1>

            <motion.p
              className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 0.5,
              }}
            >
              Transform property photographs with
              professional HDR retouching, balanced
              exposure, refined colors, and natural
              detail enhancement.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.68,
                duration: 0.5,
              }}
            >
              <Link
                href="/free-trial"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20]"
              >
                Get Started Free

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white"
              >
                View Examples
              </button>
            </motion.div>

            {/* Stats */}

            <motion.div
              className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.9,
                duration: 0.6,
              }}
            >
              {[
                {
                  value: "24h",
                  label: "Delivery",
                },
                {
                  value: "$0.20",
                  label: "Per Image",
                },
                {
                  value: "100%",
                  label: "Manual Edit",
                },
                {
                  value: "∞",
                  label: "Revisions",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      0.9 + i * 0.08,
                    duration: 0.4,
                  }}
                >
                  <p className="text-2xl font-extrabold text-white lg:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* =================================================
              RIGHT IMAGE AREA
          ================================================= */}

          <motion.div
            className="relative flex min-h-[600px] flex-col lg:h-screen"
            initial={{
              opacity: 0,
              x: 60,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            {/* Main Before / After */}

            <div
              ref={heroSliderRef}
              className="relative min-h-[500px] flex-1 cursor-col-resize select-none overflow-hidden touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8352A] lg:rounded-none"
              aria-label="HDR before and after comparison"
              tabIndex={0}
              style={
                {
                  "--slider-position": "50%",
                  contain: "layout paint",
                } as React.CSSProperties
              }
              onPointerDown={(e) =>
                handlePointerDown(e, heroSliderRef)
              }
              onPointerMove={(e) =>
                handlePointerMove(e, heroSliderRef)
              }
              onPointerUp={(e) =>
                handlePointerUp(e, heroSliderRef)
              }
              onPointerCancel={(e) =>
                handlePointerUp(e, heroSliderRef)
              }
              onLostPointerCapture={(e) =>
                handlePointerUp(e, heroSliderRef)
              }
              onKeyDown={handleSliderKeyDown}
            >
              {/* AFTER — full image underneath. RIGHT side = AFTER */}

              <div className="absolute inset-0">
                <img
                  src={currentCase.afterImage}
                  alt={`${currentCase.afterTitle} - HDR Premium`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>

              {/* BEFORE — GPU-friendly clip instead of changing width/layout */}

              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath:
                    "inset(0 calc(100% - var(--slider-position, 50%)) 0 0)",
                  WebkitClipPath:
                    "inset(0 calc(100% - var(--slider-position, 50%)) 0 0)",
                  willChange: "clip-path",
                }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt={`${currentCase.beforeTitle} - HDR Premium`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  draggable={false}
                />
              </div>

              {/* DIVIDER */}

              <div
                className="pointer-events-none absolute bottom-0 top-0 z-20 w-[2px] bg-white/80 shadow-xl"
                style={{
                  left: "var(--slider-position, 50%)",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-2xl">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="h-4 w-4 text-[#E8352A]" />
                    <ChevronRight className="h-4 w-4 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              {/* BEFORE LABEL */}

              <div className="pointer-events-none absolute left-5 top-5 z-30">
                <span className="rounded-full bg-black/70 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  Before
                </span>
              </div>

              {/* AFTER LABEL */}

              <div className="pointer-events-none absolute right-5 top-5 z-30">
                <span className="rounded-full bg-[#E8352A] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
                  After
                </span>
              </div>

              {/* PAGE RELATED BADGE */}

              <div className="pointer-events-none absolute left-1/2 top-5 z-30 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-md">
                  <Camera className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">
                    Premium HDR Retouching
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                THUMBNAIL STRIP
            ================================================= */}

            <div className="relative z-30 border-t border-white/10 bg-[#111113] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                {/* Previous */}

                <button
                  aria-label="Previous example"
                  onClick={() =>
                    changeCase(
                      currentCaseIndex - 1
                    )
                  }
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Thumbnails */}

                <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
                  {[0, 1, 2, 3].map(
                    (offset) => {
                      const index =
                        (currentCaseIndex +
                          offset) %
                        hrCases.length;

                      const item =
                        hrCases[index];

                      const active =
                        index ===
                        currentCaseIndex;

                      return (
                        <button
                          key={`${item.id}-${offset}`}
                          onClick={() =>
                            changeCase(index)
                          }
                          className={`group relative h-[75px] overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-[90px] ${
                            active
                              ? "border-[#E8352A] shadow-[0_0_18px_rgba(232,53,42,0.35)]"
                              : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                          }`}
                        >
                          {/* Before */}

                          <img
                            src={item.beforeImage}
                            alt={`Example ${item.id} before`}
                            className="absolute inset-y-0 left-0 h-full w-1/2 object-cover"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />

                          {/* After */}

                          <img
                            src={item.afterImage}
                            alt={`Example ${item.id} after`}
                            className="absolute inset-y-0 right-0 h-full w-1/2 object-cover"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                          />

                          {/* Center divider */}

                          <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/80" />

                          {/* Number */}

                          <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-sm">
                            {index + 1}
                          </span>

                          {/* Active indicator */}

                          {active && (
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.9)]" />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Next */}

                <button
                  aria-label="Next example"
                  onClick={() =>
                    changeCase(
                      currentCaseIndex + 1
                    )
                  }
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile arrows */}

              <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
                <button
                  onClick={() =>
                    changeCase(
                      currentCaseIndex - 1
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="text-xs font-semibold text-white/60">
                  {currentCaseIndex + 1} /{" "}
                  {hrCases.length}
                </span>

                <button
                  onClick={() =>
                    changeCase(
                      currentCaseIndex + 1
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Desktop counter */}

              <div className="mt-3 hidden text-center text-xs font-semibold text-white/40 sm:block">
                {currentCaseIndex + 1} /{" "}
                {hrCases.length}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section
        id="gallery"
        className="bg-[#F7F8FA] py-16 sm:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              See the{" "}
              <span className="text-[#E8352A]">
                HDR Transformation
              </span>
            </h2>

            <p className="text-lg text-[#555] sm:text-xl">
              Compare original photographs with
              professionally retouched HDR results.
            </p>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
            {/* Main comparison */}

            <div className="flex min-w-0 flex-1 flex-col">
              <div
                ref={sliderRef}
                className="relative min-h-[320px] flex-1 cursor-col-resize select-none overflow-hidden touch-none rounded-2xl shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8352A] sm:min-h-[520px]"
                aria-label="HDR before and after comparison"
                tabIndex={0}
                style={
                  {
                    "--slider-position": "50%",
                    contain: "layout paint",
                  } as React.CSSProperties
                }
                onPointerDown={(e) =>
                  handlePointerDown(e, sliderRef)
                }
                onPointerMove={(e) =>
                  handlePointerMove(e, sliderRef)
                }
                onPointerUp={(e) =>
                  handlePointerUp(e, sliderRef)
                }
                onPointerCancel={(e) =>
                  handlePointerUp(e, sliderRef)
                }
                onLostPointerCapture={(e) =>
                  handlePointerUp(e, sliderRef)
                }
                onKeyDown={handleSliderKeyDown}
              >
                {/* AFTER — full image underneath */}

                <div className="absolute inset-0">
                  <img
                    src={currentCase.afterImage}
                    alt={currentCase.afterTitle}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>

                {/* BEFORE — GPU-friendly clip */}

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath:
                      "inset(0 calc(100% - var(--slider-position, 50%)) 0 0)",
                    WebkitClipPath:
                      "inset(0 calc(100% - var(--slider-position, 50%)) 0 0)",
                  }}
                >
                  <img
                    src={currentCase.beforeImage}
                    alt={currentCase.beforeTitle}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>

                {/* DIVIDER */}

                <div
                  className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-lg"
                  style={{
                    left: "var(--slider-position, 50%)",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-xl">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" />
                      <ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}

                <div className="pointer-events-none absolute bottom-5 left-5 z-20">
                  <span className="rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                    {currentCase.beforeTitle}
                  </span>
                </div>

                <div className="pointer-events-none absolute bottom-5 right-5 z-20">
                  <span className="rounded-full bg-[#E8352A] px-4 py-2 text-xs font-semibold text-white">
                    {currentCase.afterTitle}
                  </span>
                </div>
              </div>

              {/* Main navigation */}

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    changeCase(
                      currentCaseIndex - 1
                    )
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#E8352A] px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-[#C62B20]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                <span className="min-w-[60px] text-center text-sm font-semibold text-gray-500">
                  {currentCaseIndex + 1} /{" "}
                  {hrCases.length}
                </span>

                <button
                  onClick={() =>
                    changeCase(
                      currentCaseIndex + 1
                    )
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#E8352A] px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-[#C62B20]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* =================================================
                SERVICE CARD
            ================================================= */}

            <div className="flex w-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md lg:w-80 xl:w-96">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0EE] text-[#E8352A]">
                  <Camera className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E8352A]">
                    Premium Service
                  </p>

                  <h3 className="text-xl font-bold text-[#111]">
                    HDR Premium
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-[#555]">
                Professional HDR photo editing with
                balanced exposure, natural colors,
                enhanced details, and a clean premium
                finish.
              </p>

              <div className="mb-4 text-2xl font-bold text-[#111]">
                $0.20{" "}
                <span className="text-base font-normal text-[#555]">
                  / image
                </span>
              </div>

              <button
                onClick={addToCart}
                className="mb-6 w-full rounded-lg bg-[#E8352A] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#C62B20]"
              >
                Add to Cart
              </button>

              <ul className="mb-6 flex flex-1 flex-col gap-3">
                {[
                  "Exposure Correction",
                  "Advanced Tone Mapping",
                  "Color Correction",
                  "Shadow & Highlight Recovery",
                  "Natural Detail Enhancement",
                  "Professional HDR Finish",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#333]"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-[#E8352A]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full rounded-lg border border-[#E8352A] py-2.5 text-sm font-semibold text-[#E8352A] transition-all hover:bg-[#FFF3F2]">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <ServicesSection
        services={services}
        sectionTitle="HDR Premium"
        sectionDesc="Professional HDR solutions designed for high-quality property photography."
      />

      {/* =====================================================
          EXTRA FEATURES
      ===================================================== */}

      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#E8352A]">
              Why Choose Us
            </span>

            <h2 className="text-3xl font-extrabold text-[#111] sm:text-4xl">
              Professional Results,
              <span className="text-[#E8352A]">
                {" "}
                Every Time
              </span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Clock,
                title: "Fast Delivery",
                description:
                  "Most orders are completed within 24 hours.",
              },
              {
                icon: Shield,
                title: "Quality Focused",
                description:
                  "Every image receives careful professional attention.",
              },
              {
                icon: Award,
                title: "Premium Results",
                description:
                  "Natural-looking edits designed for professional use.",
              },
              {
                icon: Users,
                title: "Client Support",
                description:
                  "Dedicated support whenever you need assistance.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0EE] text-[#E8352A]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#111]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}