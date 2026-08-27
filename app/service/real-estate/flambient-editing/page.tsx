"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Sparkles,
  Layers,
  Palette,
  CheckCircle,
  ArrowRight,
  Wand2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
} from "lucide-react";
import Link from "next/link";

/* =========================================================
   TYPES
========================================================= */

type EditingExample = {
  id: number;
  beforeTitle: string;
  afterTitle: string;
  beforeImage: string;
  afterImage: string;
  description: string;
};

/* =========================================================
   PAGE
========================================================= */

export default function FlambientEditingPage() {
  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  const [sliderPosition, setSliderPosition] =
    useState(50);

  const [isDragging, setIsDragging] =
    useState(false);

  const [isHoveringSlider, setIsHoveringSlider] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Ambient");

  const [openServiceSlug, setOpenServiceSlug] =
    useState<string | null>(null);

  const sliderDirectionRef =
    useRef<1 | -1>(1);

  const heroSliderRef =
    useRef<HTMLDivElement>(null);

  const gallerySliderRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     FLAMBIENT EXAMPLES

     LOCAL WEBP IMAGES
  ======================================================= */

  const editingExamples: EditingExample[] = [
    {
      id: 1,
      beforeTitle: "Original Photo",
      afterTitle: "Flambient Finish",
      beforeImage:
        "/images/Flambient/1-before.webp",
      afterImage:
        "/images/Flambient/1-after.webp",
      description:
        "Blend ambient and flash lighting for a clean, natural, and professional real estate image.",
    },
    {
      id: 2,
      beforeTitle: "Raw Interior",
      afterTitle: "Ambient Enhanced",
      beforeImage:
        "/images/Flambient/2-before.webp",
      afterImage:
        "/images/Flambient/2-after.webp",
      description:
        "Balance interior lighting while preserving realistic shadows, highlights, and color.",
    },
    {
      id: 3,
      beforeTitle: "Original",
      afterTitle: "Premium Flambient",
      beforeImage:
        "/images/Flambient/3-before.webp",
      afterImage:
        "/images/Flambient/3-after.webp",
      description:
        "Create depth and dimensionality with carefully blended flash and ambient exposures.",
    },
    {
      id: 4,
      beforeTitle: "Raw Property",
      afterTitle: "Professional Blend",
      beforeImage:
        "/images/Flambient/4-before.webp",
      afterImage:
        "/images/Flambient/4-after.webp",
      description:
        "Refine exposure, white balance, contrast, and color for a polished property photograph.",
    },
    {
      id: 5,
      beforeTitle: "Original Image",
      afterTitle: "Cinematic Result",
      beforeImage:
        "/images/Flambient/5-before.webp",
      afterImage:
        "/images/Flambient/5-after.webp",
      description:
        "Produce a premium cinematic look while keeping the property natural and believable.",
    },
  ];

  /* =======================================================
     STATS
  ======================================================= */

  const stats = [
    {
      value: "95%",
      label: "Time Saved vs Manual",
    },
    {
      value: "100K+",
      label: "Presets Available",
    },
    {
      value: "4.8/5",
      label: "User Rating",
    },
    {
      value: "50K+",
      label: "Active Creators",
    },
  ];

  /* =======================================================
     EDITOR TABS
  ======================================================= */

  const editorTabs = [
    "Ambient",
    "Blend",
    "Grade",
    "Depth",
    "Export",
  ];

  /* =======================================================
     SERVICES
  ======================================================= */

  const services = [
    {
      title: "Ambient Lighting",
      description:
        "Professional ambient light blending for interior and exterior shots.",
      icon: (
        <Sparkles className="h-6 w-6" />
      ),
      color: "#E8352A",
      bg: "#FFF0EE",
    },
    {
      title: "Color Grading",
      description:
        "Cinematic color grading with AI-powered mood analysis.",
      icon: (
        <Palette className="h-6 w-6" />
      ),
      color: "#7C3AED",
      bg: "#F5F0FF",
    },
    {
      title: "Depth Enhancement",
      description:
        "Create 3D depth and focal plane adjustments for drama.",
      icon: (
        <Layers className="h-6 w-6" />
      ),
      color: "#0EA5E9",
      bg: "#F0F9FF",
    },
    {
      title: "Batch Processing",
      description:
        "Process entire shoots with consistent flambient effects.",
      icon: (
        <Settings className="h-6 w-6" />
      ),
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      title: "HDR Merging",
      description:
        "Merge bracketed exposures into one perfectly balanced image.",
      icon: (
        <Camera className="h-6 w-6" />
      ),
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      title: "Flash Blend",
      description:
        "Seamlessly blend flash and ambient light for natural results.",
      icon: (
        <Sun className="h-6 w-6" />
      ),
      color: "#EC4899",
      bg: "#FDF2F8",
    },
    {
      title: "Sky Enhancement",
      description:
        "Replace or enhance skies for stronger exterior impact.",
      icon: (
        <Wand2 className="h-6 w-6" />
      ),
      color: "#6366F1",
      bg: "#EEF2FF",
    },
    {
      title: "Object Removal",
      description:
        "Clean up distracting elements for polished final images.",
      icon: (
        <CheckCircle className="h-6 w-6" />
      ),
      color: "#14B8A6",
      bg: "#F0FDFA",
    },
  ];

  /* =======================================================
     HELPERS
  ======================================================= */

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(
        /(^-|-$)/g,
        ""
      );

  const currentImage =
    editingExamples[currentImageIndex];

  /* =======================================================
     CHANGE IMAGE
  ======================================================= */

  const changeImage = useCallback(
    (index: number) => {
      const normalized =
        (index +
          editingExamples.length) %
        editingExamples.length;

      setCurrentImageIndex(
        normalized
      );

      setSliderPosition(50);

      sliderDirectionRef.current = 1;
    },
    [editingExamples.length]
  );

  /* =======================================================
     CALCULATE SLIDER
  ======================================================= */

  const updateSliderPosition = useCallback(
    (
      clientX: number,
      targetRef: React.RefObject<HTMLDivElement | null>
    ) => {
      const target =
        targetRef.current;

      if (!target) return;

      const rect =
        target.getBoundingClientRect();

      if (rect.width <= 0) return;

      const percentage =
        ((clientX - rect.left) /
          rect.width) *
        100;

      setSliderPosition(
        Math.max(
          0,
          Math.min(
            100,
            percentage
          )
        )
      );
    },
    []
  );

  /* =======================================================
     MOUSE / TOUCH DRAG

     Keep listeners on window so dragging continues
     even if the cursor leaves the image.
  ======================================================= */

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      updateSliderPosition(
        event.clientX,
        heroSliderRef
      );
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };
  }, [
    isDragging,
    updateSliderPosition,
  ]);

  /* =======================================================
     GALLERY TOUCH/MOUSE HANDLING
  ======================================================= */

  const handleGalleryPointerMove = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;

    event.preventDefault();

    const clientX =
      "touches" in event
        ? event.touches[0]?.clientX
        : event.clientX;

    if (
      typeof clientX !==
      "number"
    ) {
      return;
    }

    updateSliderPosition(
      clientX,
      gallerySliderRef
    );
  };

  /* =======================================================
     AUTO SLIDER

     requestAnimationFrame is considerably smoother
     than updating React state every 28ms.
  ======================================================= */

  useEffect(() => {
    if (
      isDragging ||
      isHoveringSlider
    ) {
      return;
    }

    let animationFrame = 0;
    let lastTime = 0;

    const speed = 22;

    const animate = (
      timestamp: number
    ) => {
      if (!lastTime) {
        lastTime = timestamp;
      }

      const delta =
        timestamp - lastTime;

      lastTime = timestamp;

      setSliderPosition((prev) => {
        let next =
          prev +
          sliderDirectionRef.current *
            (speed * delta) /
            1000;

        if (next >= 100) {
          sliderDirectionRef.current =
            -1;
          next = 100;
        }

        if (next <= 0) {
          sliderDirectionRef.current =
            1;
          next = 0;
        }

        return next;
      });

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    isDragging,
    isHoveringSlider,
  ]);

  /* =======================================================
     CART
  ======================================================= */

  const addToCart = () => {
    const pricePerImage =
      0.18;

    const imageCount = 50;

    const total = parseFloat(
      (
        pricePerImage *
        imageCount
      ).toFixed(2)
    );

    const cartItem = {
      service_name:
        "Flambient Editing",

      qty: 1,

      price:
        pricePerImage,

      retouching:
        "Flambient Editing",

      order_name:
        currentImage.afterTitle,

      order_images:
        imageCount,

      order_details:
        currentImage.description,

      addons: [],

      total,
    };

    try {
      const existing =
        document.cookie.match(
          /(^| )cart=([^;]+)/
        );

      const currentCart =
        existing
          ? JSON.parse(
              decodeURIComponent(
                existing[2]
              )
            )
          : [];

      const updatedCart =
        Array.isArray(
          currentCart
        )
          ? [
              ...currentCart,
              cartItem,
            ]
          : [
              cartItem,
            ];

      document.cookie =
        "cart=" +
        encodeURIComponent(
          JSON.stringify(
            updatedCart
          )
        ) +
        "; path=/";
    } catch {
      document.cookie =
        "cart=" +
        encodeURIComponent(
          JSON.stringify([
            cartItem,
          ])
        ) +
        "; path=/";
    }

    window.location.href =
      "/cart";
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative w-full overflow-hidden bg-[#0D0D0F] text-white">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          {/* Noise */}

          <svg
            className="absolute inset-0 h-full w-full opacity-[0.025]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="flambient-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />

              <feColorMatrix
                type="saturate"
                values="0"
              />
            </filter>

            <rect
              width="100%"
              height="100%"
              filter="url(#flambient-noise)"
            />
          </svg>

          {/* Red glow */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [
                0.12,
                0.20,
                0.12,
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
            className="absolute -left-40 top-1/3 h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.3) 0%, transparent 65%)",
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [
                0.08,
                0.15,
                0.08,
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)",
            }}
          />

          {/* Grid */}

          <svg
            className="absolute inset-0 h-full w-full opacity-[0.035]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="flambient-grid"
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
              fill="url(#flambient-grid)"
            />
          </svg>
        </div>

        {/* Main Hero Grid */}

        <div className="relative z-10 grid lg:grid-cols-2">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="flex flex-col justify-center px-7 pb-14 pt-24 sm:px-12 lg:min-h-[calc(100vh-76px)] lg:px-16 lg:py-16 xl:px-20">
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
              className="mb-7 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8352A] sm:text-xs">
                Flambient Editing
              </span>
            </motion.div>

            <h1 className="mb-6 font-extrabold leading-[0.94] tracking-tight">
              {[
                "Flambient",
                "Photo",
                "Editing",
              ].map((word, i) => (
                <motion.span
                  key={word}
                  className={`block text-[clamp(3.2rem,6.5vw,6.3rem)] ${
                    i === 1
                      ? "text-[#E8352A]"
                      : "text-white"
                  }`}
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay:
                      0.12 + i * 0.1,
                    duration: 0.55,
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
              ))}
            </h1>

            <motion.p
              className="mb-9 max-w-md text-sm leading-relaxed text-[#A0A0B0] sm:text-base lg:text-lg"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
            >
              Transform ordinary property
              photos with cinematic ambient
              lighting, precise flash blending,
              and rich color grading that makes
              every listing stand out.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.65,
                duration: 0.5,
              }}
            >
              <Link
                href="/free-trial"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#E8352A] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(232,53,42,0.3)] transition-all hover:bg-[#C62B20] hover:shadow-[0_0_40px_rgba(232,53,42,0.4)]"
              >
                Get Started Free

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "gallery"
                    )
                    ?.scrollIntoView({
                      behavior:
                        "smooth",
                    })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white"
              >
                View Examples
              </button>
            </motion.div>

            {/* Stats */}

            <motion.div
              className="mt-12 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.85,
                duration: 0.5,
              }}
            >
              {stats.map(
                (stat) => (
                  <div
                    key={
                      stat.label
                    }
                  >
                    <p className="text-2xl font-extrabold text-white lg:text-3xl">
                      {
                        stat.value
                      }
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-[#666]">
                      {
                        stat.label
                      }
                    </p>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}

          <motion.div
            className="flex items-center bg-[#111113] px-3 pb-3 sm:px-5 sm:pb-5 lg:px-4 lg:py-4 xl:px-6 xl:py-6"
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <div className="w-full overflow-hidden rounded-[22px] border border-white/10 bg-black shadow-2xl">
              {/* =================================================
                  HERO COMPARISON

                  Fixed aspect ratio prevents boxy appearance.
              ================================================= */}

              <div
                ref={heroSliderRef}
                className="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11]"
                onMouseDown={(
                  event
                ) => {
                  setIsDragging(
                    true
                  );

                  updateSliderPosition(
                    event.clientX,
                    heroSliderRef
                  );
                }}
                onMouseEnter={() =>
                  setIsHoveringSlider(
                    true
                  )
                }
                onMouseLeave={() => {
                  setIsDragging(
                    false
                  );

                  setIsHoveringSlider(
                    false
                  );
                }}
                onTouchStart={(
                  event
                ) => {
                  setIsDragging(
                    true
                  );

                  const touch =
                    event.touches[0];

                  if (touch) {
                    updateSliderPosition(
                      touch.clientX,
                      heroSliderRef
                    );
                  }
                }}
                onTouchMove={(
                  event
                ) => {
                  if (!isDragging)
                    return;

                  const touch =
                    event.touches[0];

                  if (touch) {
                    updateSliderPosition(
                      touch.clientX,
                      heroSliderRef
                    );
                  }
                }}
                onTouchEnd={() =>
                  setIsDragging(
                    false
                  )
                }
              >
                {/* BEFORE */}

                <Image
                  src={
                    currentImage.beforeImage
                  }
                  alt={`${currentImage.beforeTitle} Flambient example`}
                  fill
                  priority={
                    currentImageIndex ===
                    0
                  }
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  draggable={false}
                />

                {/* AFTER */}

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                  }}
                >
                  <Image
                    src={
                      currentImage.afterImage
                    }
                    alt={`${currentImage.afterTitle} Flambient example`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                {/* DIVIDER */}

                <div
                  className="pointer-events-none absolute bottom-0 top-0 z-20 w-[2px] bg-white shadow-lg"
                  style={{
                    left: `${sliderPosition}%`,
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-xl">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" />

                      <ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* BEFORE LABEL */}

                <div className="absolute left-4 top-4 z-30 sm:left-5 sm:top-5">
                  <span className="rounded-full bg-black/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
                    Before
                  </span>
                </div>

                {/* AFTER LABEL */}

                <div className="absolute right-4 top-4 z-30 sm:right-5 sm:top-5">
                  <span className="rounded-full bg-[#E8352A] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg sm:px-4 sm:py-2 sm:text-[10px]">
                    After
                  </span>
                </div>

                {/* CENTER BADGE */}

                <div className="absolute left-1/2 top-4 z-30 -translate-x-1/2 sm:top-5">
                  <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2">
                    <Sparkles className="h-3 w-3 text-[#E8352A] sm:h-3.5 sm:w-3.5" />

                    <span className="whitespace-nowrap text-[9px] font-semibold text-white sm:text-[10px]">
                      Premium Flambient
                    </span>
                  </div>
                </div>

                {/* EDITOR TABS */}

                <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-5">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    {editorTabs.map(
                      (tab) => (
                        <button
                          key={tab}
                          onClick={() =>
                            setActiveTab(
                              tab
                            )
                          }
                          className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 transition-all sm:rounded-xl sm:px-3 sm:py-2 ${
                            activeTab ===
                            tab
                              ? "bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.45)]"
                              : "text-white/50 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {tab ===
                            "Ambient" && (
                            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          {tab ===
                            "Blend" && (
                            <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          {tab ===
                            "Grade" && (
                            <Palette className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          {tab ===
                            "Depth" && (
                            <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          {tab ===
                            "Export" && (
                            <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          )}

                          <span className="text-[8px] font-semibold sm:text-[9px]">
                            {tab}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* =================================================
                  THUMBNAILS

                  Only 4 thumbnails shown at a time.
                  Next/Image handles optimization.
              ================================================= */}

              <div className="border-t border-white/10 bg-[#111113] px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous example"
                    onClick={() =>
                      changeImage(
                        currentImageIndex -
                          1
                      )
                    }
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="grid min-w-0 flex-1 grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map(
                      (offset) => {
                        const index =
                          (currentImageIndex +
                            offset) %
                          editingExamples.length;

                        const item =
                          editingExamples[
                            index
                          ];

                        const active =
                          index ===
                          currentImageIndex;

                        return (
                          <button
                            key={`${item.id}-${offset}`}
                            onClick={() =>
                              changeImage(
                                index
                              )
                            }
                            className={`group relative aspect-[16/9] overflow-hidden rounded-lg border transition-all duration-300 ${
                              active
                                ? "border-[#E8352A] shadow-[0_0_14px_rgba(232,53,42,0.3)]"
                                : "border-white/10 opacity-60 hover:border-white/30 hover:opacity-100"
                            }`}
                          >
                            {/* Before thumbnail */}

                            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                              <Image
                                src={
                                  item.beforeImage
                                }
                                alt={`Flambient example ${item.id} before`}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                            </div>

                            {/* After thumbnail */}

                            <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                              <Image
                                src={
                                  item.afterImage
                                }
                                alt={`Flambient example ${item.id} after`}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                            </div>

                            {/* Divider */}

                            <div className="absolute bottom-0 left-1/2 top-0 z-10 w-px -translate-x-1/2 bg-white/80" />

                            {/* Number */}

                            <span className="absolute bottom-1 left-1 z-20 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold text-white">
                              {index + 1}
                            </span>

                            {active && (
                              <span className="absolute right-1.5 top-1.5 z-20 h-1.5 w-1.5 rounded-full bg-[#E8352A] shadow-[0_0_7px_rgba(232,53,42,0.9)]" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    aria-label="Next example"
                    onClick={() =>
                      changeImage(
                        currentImageIndex +
                          1
                      )
                    }
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 text-center text-[10px] font-semibold text-white/35">
                  {currentImageIndex +
                    1}{" "}
                  /{" "}
                  {
                    editingExamples.length
                  }
                </div>
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
              Watch{" "}
              <span className="text-[#E8352A]">
                Flambient Transform
              </span>
            </h2>

            <p className="text-base text-[#555] sm:text-lg">
              See ordinary photos transform
              into cinematic property
              photographs.
            </p>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
            {/* =================================================
                GALLERY SLIDER
            ================================================= */}

            <div className="flex min-w-0 flex-1 flex-col">
              <div
                ref={gallerySliderRef}
                className="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden rounded-[22px] shadow-xl sm:aspect-[16/10]"
                onMouseDown={(
                  event
                ) => {
                  setIsDragging(
                    true
                  );

                  updateSliderPosition(
                    event.clientX,
                    gallerySliderRef
                  );
                }}
                onMouseMove={
                  handleGalleryPointerMove
                }
                onMouseEnter={() =>
                  setIsHoveringSlider(
                    true
                  )
                }
                onMouseLeave={() => {
                  setIsDragging(
                    false
                  );

                  setIsHoveringSlider(
                    false
                  );
                }}
                onMouseUp={() =>
                  setIsDragging(
                    false
                  )
                }
                onTouchStart={(
                  event
                ) => {
                  setIsDragging(
                    true
                  );

                  const touch =
                    event.touches[0];

                  if (touch) {
                    updateSliderPosition(
                      touch.clientX,
                      gallerySliderRef
                    );
                  }
                }}
                onTouchMove={
                  handleGalleryPointerMove
                }
                onTouchEnd={() =>
                  setIsDragging(
                    false
                  )
                }
              >
                {/* BEFORE */}

                <Image
                  src={
                    currentImage.beforeImage
                  }
                  alt={
                    currentImage.beforeTitle
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                  draggable={false}
                />

                {/* AFTER */}

                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${sliderPosition}%)`,
                  }}
                >
                  <Image
                    src={
                      currentImage.afterImage
                    }
                    alt={
                      currentImage.afterTitle
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                {/* DIVIDER */}

                <div
                  className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-lg"
                  style={{
                    left: `${sliderPosition}%`,
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-xl">
                    <ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" />

                    <ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" />
                  </div>
                </div>

                {/* Labels */}

                <div className="absolute bottom-4 left-4 z-20 sm:bottom-5 sm:left-5">
                  <span className="rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs">
                    Original
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 z-20 sm:bottom-5 sm:right-5">
                  <span className="rounded-full bg-[#E8352A] px-3 py-1.5 text-[10px] font-semibold text-white sm:px-4 sm:py-2 sm:text-xs">
                    Flambient
                  </span>
                </div>
              </div>

              {/* Navigation */}

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  onClick={() =>
                    changeImage(
                      currentImageIndex -
                        1
                    )
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#E8352A] px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-[#C62B20]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                <span className="min-w-[60px] text-center text-sm font-semibold text-gray-500">
                  {currentImageIndex +
                    1}{" "}
                  /{" "}
                  {
                    editingExamples.length
                  }
                </span>

                <button
                  onClick={() =>
                    changeImage(
                      currentImageIndex +
                        1
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
                  <Sparkles className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#E8352A]">
                    Premium Service
                  </p>

                  <h3 className="text-xl font-bold text-[#111]">
                    Flambient Editing
                  </h3>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-[#555]">
                Cinematic ambient lighting
                and color grading for
                professional real estate
                photography.
              </p>

              <div className="mb-4 text-2xl font-bold text-[#111]">
                $0.18{" "}
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
                  "Ambient Light Blending",
                  "Color Grading",
                  "Exposure Correction",
                  "Shadow & Highlight Recovery",
                  "White Balance Adjustment",
                  "Natural Flambient Look",
                ].map(
                  (feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#333]"
                    >
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#E8352A]" />

                      {feature}
                    </li>
                  )
                )}
              </ul>

              <button className="w-full rounded-lg border border-[#E8352A] py-2.5 text-sm font-semibold text-[#E8352A] transition-all hover:bg-[#FFF3F2]">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RELATED SERVICES
      ===================================================== */}

      <section
        id="services"
        className="bg-gradient-to-b from-white to-gray-50 py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              <span className="text-[#E8352A]">
                Editing
              </span>{" "}
              Services
            </h2>

            <p className="text-xl text-gray-600">
              Comprehensive cinematic editing
              tools for photographers and
              content creators.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map(
              (service, i) => {
                const slug =
                  slugify(
                    service.title
                  );

                const isOpen =
                  openServiceSlug ===
                  slug;

                return (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                        background:
                          service.bg,
                        color:
                          service.color,
                      }}
                    >
                      {service.icon}
                    </div>

                    <h3 className="relative mb-2 text-2xl font-bold text-gray-900">
                      {
                        service.title
                      }
                    </h3>

                    <p className="relative mb-4 text-lg leading-relaxed text-gray-500">
                      {
                        service.description
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenServiceSlug(
                          isOpen
                            ? null
                            : slug
                        )
                      }
                      aria-expanded={
                        isOpen
                      }
                      className="relative flex items-center gap-1.5 text-xl font-semibold transition-all group-hover:gap-2.5"
                      style={{
                        color:
                          service.color,
                      }}
                    >
                      Learn more

                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    {isOpen && (
                      <div className="relative mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-800 shadow-sm">
                        <p className="mb-3">
                          {
                            service.description
                          }{" "}
                          More about this
                          service, examples,
                          turnaround times,
                          and common
                          use-cases.
                        </p>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenServiceSlug(
                                null
                              )
                            }
                            className="rounded-md bg-gray-100 px-3 py-2 text-gray-800"
                          >
                            Close
                          </button>

                          <Link
                            href={`/service/real-estate/flambient-editing/${slug}`}
                            className="rounded-md bg-[#E8352A] px-3 py-2 text-white"
                          >
                            Open full page
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </div>
  );
}