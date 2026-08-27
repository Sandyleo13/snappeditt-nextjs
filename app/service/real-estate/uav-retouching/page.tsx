// app/uav-retouching/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Zap,
  Cloud,
  Image as ImageIcon,
  ArrowRight,
  CheckCircle,
  Shield,
  Target,
  Map,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function UAVRetouchingPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState("Enhance");
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);

  // UAV Retouching transformation examples
  const transformationExamples = [
    {
      id: 1,
      beforeTitle: "Raw Aerial Shot",
      afterTitle: "Enhanced Landscape",
      beforeImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=20&saturation=150",
      category: "landscape",
      description:
        "Transform raw drone shots into stunning professional landscape photography",
    },
    {
      id: 2,
      beforeTitle: "Hazy Survey",
      afterTitle: "Crystal Clear Map",
      beforeImage:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80&auto=format&fit=crop&brightness=105&contrast=25&saturation=120",
      category: "survey",
      description:
        "Clear atmospheric haze and enhance details for precise aerial survey data",
    },
    {
      id: 3,
      beforeTitle: "Low-Light Footage",
      afterTitle: "Bright & Detailed",
      beforeImage:
        "https://images.unsplash.com/photo-1472148083604-64f1084980b9?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1472148083604-64f1084980b9?w=800&q=80&auto=format&fit=crop&brightness=130&contrast=15&saturation=110",
      category: "lowlight",
      description:
        "Enhance low-light drone footage while preserving details and reducing noise",
    },
    {
      id: 4,
      beforeTitle: "Distorted Image",
      afterTitle: "Corrected Geometry",
      beforeImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop&brightness=105&contrast=20&saturation=130",
      category: "correction",
      description:
        "Correct lens distortion and perspective for professional architectural shots",
    },
    {
      id: 5,
      beforeTitle: "Weather Interference",
      afterTitle: "Perfect Conditions",
      beforeImage:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=25&saturation=140",
      category: "weather",
      description:
        "Remove weather interference and enhance colors for perfect aerial views",
    },
    {
      id: 6,
      beforeTitle: "Basic Orthomosaic",
      afterTitle: "Professional Map",
      beforeImage:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&auto=format&fit=crop",
      afterImage:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&auto=format&fit=crop&brightness=105&contrast=30&saturation=120",
      category: "mapping",
      description:
        "Transform basic drone mapping data into professional-grade orthomosaics",
    },
  ];

  const benefits = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Aerial Enhancement",
      description:
        "Specialized algorithms for drone-specific image enhancement",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Editing",
      description: "Pixel-perfect editing for survey and mapping applications",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Integrity",
      description: "Maintain geospatial data accuracy while enhancing visuals",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Batch Processing",
      description: "Process hundreds of drone images simultaneously",
    },
  ];

  const features = [
    "Atmospheric haze removal and clarity enhancement",
    "Lens distortion correction for wide-angle drone shots",
    "Color grading optimized for aerial perspectives",
    "Geometric correction for mapping applications",
    "Noise reduction for high ISO drone footage",
    "Batch processing with GPS metadata preservation",
  ];

  const stats = [
    {
      value: "8K+",
      label: "Resolution Support",
      sub: "Ultra high resolution output",
      icon: <ImageIcon className="w-5 h-5" />,
    },
    {
      value: "99.9%",
      label: "Data Accuracy",
      sub: "AI precision you can trust",
      icon: <Target className="w-5 h-5" />,
    },
    {
      value: "50MP",
      label: "Image Processing",
      sub: "Handle large, detailed images",
      icon: <Camera className="w-5 h-5" />,
    },
    {
      value: "0.5cm",
      label: "Precision Level",
      sub: "Highly accurate results",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const editorTabs = ["Enhance", "Clarity", "Geometry", "Color"];
  const services = [
    {
      title: "Aerial Enhancement",
      description:
        "Transform raw drone shots into stunning professional aerial photography",
      icon: <Camera className="w-6 h-6" />,
      color: "#E8352A",
      bg: "#FFF0EE",
    },
    {
      title: "Survey Processing",
      description:
        "Enhance aerial survey data while maintaining geospatial accuracy",
      icon: <Map className="w-6 h-6" />,
      color: "#7C3AED",
      bg: "#F5F0FF",
    },
    {
      title: "Mapping Correction",
      description:
        "Correct distortions and enhance details for professional mapping",
      icon: <Layers className="w-6 h-6" />,
      color: "#0EA5E9",
      bg: "#F0F9FF",
    },
    {
      title: "Weather Correction",
      description: "Remove weather interference and enhance aerial visibility",
      icon: <Cloud className="w-6 h-6" />,
      color: "#6366F1",
      bg: "#EEF2FF",
    },
  ];

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  // Auto-animate slider when not dragging/hovering
  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition((prev) => {
        const next = prev + sliderDirectionRef.current * 0.8;
        if (next >= 100) {
          sliderDirectionRef.current = -1;
          return 100;
        }
        if (next <= 0) {
          sliderDirectionRef.current = 1;
          return 0;
        }
        return next;
      });
    }, 30);
    return () => window.clearInterval(id);
  }, [isDragging, isHoveringSlider]);

  const handleSliderMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;
    const activeRef = heroSliderRef.current?.contains(e.target as Node)
      ? heroSliderRef
      : gallerySliderRef;
    if (!activeRef.current) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(
      Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)),
    );
  };

  const changeExample = (index: number) => {
    setCurrentExampleIndex(
      (index + transformationExamples.length) % transformationExamples.length,
    );
    setSliderPosition(50);
  };

  const currentExample =
    transformationExamples[currentExampleIndex % transformationExamples.length];

  // Add current service to cart cookie and navigate to /cart
  const addToCart = () => {
    const pricePerImage = 0.16;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));

    const cartItem = {
      service_name: "UAV Retouching",
      qty: 1,
      price: pricePerImage,
      retouching: "UAV Retouching",
      order_name: currentExample.afterTitle,
      order_images: imageCount,
      order_details: currentExample.description,
      addons: [],
      total,
    };

    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing
        ? JSON.parse(decodeURIComponent(existing[2]))
        : [];
      const updatedCart = Array.isArray(currentCart)
        ? [...currentCart, cartItem]
        : [currentCart, cartItem];
      document.cookie =
        "cart=" + encodeURIComponent(JSON.stringify(updatedCart)) + "; path=/";
    } catch {
      document.cookie =
        "cart=" + encodeURIComponent(JSON.stringify([cartItem])) + "; path=/";
    }

    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* ══════════════════════════════════════
          HERO — two-column layout
      ══════════════════════════════════════ */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">
        {/* Animated background blobs + orbits */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)",
            }}
          />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1200 700"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              cx="820"
              cy="340"
              rx="270"
              ry="200"
              stroke="#E8352A"
              strokeWidth="0.8"
              opacity="0.10"
            />
            <ellipse
              cx="820"
              cy="340"
              rx="210"
              ry="158"
              stroke="#E8352A"
              strokeWidth="0.6"
              opacity="0.08"
            />
            <ellipse
              cx="820"
              cy="340"
              rx="270"
              ry="200"
              stroke="#E8352A"
              strokeWidth="1.6"
              opacity="0.38"
              strokeDasharray="200 1600"
              style={{
                animation: "uavCW 8s linear infinite",
                transformOrigin: "820px 340px",
              }}
            />
            <ellipse
              cx="820"
              cy="340"
              rx="210"
              ry="158"
              stroke="#E8352A"
              strokeWidth="1.0"
              opacity="0.22"
              strokeDasharray="140 1200"
              style={{
                animation: "uavCCW 12s linear infinite",
                transformOrigin: "820px 340px",
              }}
            />
          </svg>

          {/* Floating red sphere */}
          <motion.div
            animate={{ y: [-13, 13, -13] }}
            transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "6%",
              top: "7%",
              width: 52,
              height: 52,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)",
              boxShadow: "0 10px 30px rgba(232,53,42,0.32)",
            }}
          />
          <motion.div
            animate={{ y: [9, -9, 9] }}
            transition={{
              repeat: Infinity,
              duration: 3.8,
              ease: "easeInOut",
              delay: 0.8,
            }}
            style={{
              position: "absolute",
              right: "8%",
              top: "50%",
              width: 24,
              height: 24,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)",
              boxShadow: "0 5px 16px rgba(232,53,42,0.26)",
            }}
          />

          {/* Glass spheres */}
          <motion.div
            animate={{ y: [-11, 11, -11] }}
            transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: "5%",
              top: "46%",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)",
              boxShadow:
                "0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)",
              border: "1px solid rgba(208,218,234,0.40)",
            }}
          />
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{
              repeat: Infinity,
              duration: 4.7,
              ease: "easeInOut",
              delay: 0.7,
            }}
            style={{
              position: "absolute",
              left: "12%",
              bottom: "28%",
              width: 28,
              height: 28,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)",
              boxShadow: "0 3px 12px rgba(15,23,42,0.07)",
              border: "1px solid rgba(208,218,234,0.35)",
            }}
          />

          {/* Dot accents */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50"
          />
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{
              repeat: Infinity,
              duration: 5.2,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38"
          />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="uav-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#uav-noise)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full"
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
                id="uav-grid"
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
            <rect width="100%" height="100%" fill="url(#uav-grid)" />
          </svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 3 + i * 0.7,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="absolute rounded-full bg-[#E8352A]"
              style={{
                width: size,
                height: size,
                left: `${[12, 28, 45, 62, 75, 88][i]}%`,
                top: `${[20, 65, 15, 75, 35, 55][i]}%`,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes uavCW  { to { stroke-dashoffset: -1800; } }
          @keyframes uavCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col px-8 pb-12 pt-24 sm:px-12 lg:grid lg:grid-cols-2 lg:px-16 lg:py-0 xl:px-24">
          <div className="grid min-h-screen grid-cols-1 items-stretch lg:contents">
            {/* ── LEFT TEXT ── */}
            <motion.div
              className="flex flex-col justify-center gap-6 px-2 text-center lg:items-start lg:px-0 lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-2 self-center rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm lg:self-start"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">
                  Aerial Image Editing
                </span>
              </motion.div>

              {/* Heading */}
              <div>
                <motion.h1
                  className="font-extrabold leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                >
                  <span className="block text-white text-[clamp(3rem,8vw,7rem)]">
                    UAV
                  </span>
                  <span className="block text-[#E8352A] text-[clamp(3rem,8vw,7rem)]">
                    Retouching
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-2 text-xl font-semibold leading-snug text-white/90 sm:text-2xl md:text-3xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.5 }}
                >
                  Aerial Image Enhancement
                </motion.p>
              </div>

              <motion.p
                className="max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.5 }}
              >
                Transform raw drone footage into professional aerial
                masterpieces. Watch as AI magically enhances clarity, corrects
                distortions, and perfects every aerial shot.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56, duration: 0.5 }}
              >
                <Link
                  href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105"
                >
                  Get Start For Free
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("gallery")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all"
                >
                  <ImageIcon className="w-4 h-4" /> View Examples
                </button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Before / After Slider ── */}
            <motion.div
              className="relative flex flex-col lg:h-screen"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              {/* Slider */}
              <div
                ref={heroSliderRef}
                className="relative mt-4 min-h-[340px] w-full flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-2xl lg:mt-0 lg:rounded-none"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => {
                  setIsDragging(false);
                  setIsHoveringSlider(false);
                }}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* AFTER — base */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentExample.afterImage})`,
                  }}
                />

                {/* BEFORE — clipped */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentExample.beforeImage})`,
                      width: heroSliderRef.current
                        ? `${heroSliderRef.current.offsetWidth}px`
                        : "100%",
                    }}
                  />
                </div>

                {/* Divider + handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                  Before
                </span>
                <span className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  After
                </span>

                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
                >
                  <Camera className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">
                    Professional Aerial Retouching
                  </span>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                  <div className="flex items-center justify-between gap-2">
                    {editorTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab ? "bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]" : "text-white/50 hover:text-white/80"}`}
                      >
                        {tab === "Enhance" && <Zap className="h-4 w-4" />}
                        {tab === "Clarity" && <ImageIcon className="h-4 w-4" />}
                        {tab === "Geometry" && <Target className="h-4 w-4" />}
                        {tab === "Color" && <Cloud className="h-4 w-4" />}
                        <span className="text-[9px] font-semibold">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dot nav */}
              <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
                {transformationExamples.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changeExample(i)}
                    className={`rounded-full transition-all ${
                      i === currentExampleIndex % transformationExamples.length
                        ? "h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]"
                        : "h-2.5 w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            className="grid grid-cols-2 gap-4 border-t border-white/10 px-8 pb-8 pt-14 sm:px-12 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-[calc(50%-4rem)] lg:grid-cols-4 lg:px-0 lg:pb-0 lg:pt-0 xl:left-24 xl:w-[calc(50%-8rem)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold text-white lg:text-3xl">
                  {s.value}
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">Aerial Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              See raw drone footage magically transform into professional aerial
              imagery.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Slider */}
            <div className="flex-1 flex flex-col">
              <div
                ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => {
                  setIsDragging(false);
                  setIsHoveringSlider(false);
                }}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentExample.afterImage})`,
                  }}
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentExample.beforeImage})`,
                      width: gallerySliderRef.current
                        ? `${gallerySliderRef.current.offsetWidth}px`
                        : "100%",
                    }}
                  />
                </div>
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{
                    left: `${sliderPosition}%`,
                    transform: "translateX(-50%)",
                  }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  Raw
                </span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Enhanced
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={() => changeExample(currentExampleIndex - 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={() => changeExample(currentExampleIndex + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">
                UAV Retouching
              </h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional aerial image enhancement for drone footage and
                survey data.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.16{" "}
                <span className="text-base font-normal text-[#555]">
                  / image
                </span>
              </div>
              <button
                onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm"
              >
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {[
                  "Atmospheric Haze Removal",
                  "Lens Distortion Correction",
                  "Aerial Color Grading",
                  "Geometric Correction",
                  "Noise Reduction",
                  "GPS Metadata Preserved",
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 text-sm text-[#333]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#E8352A] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FFF3F2] font-semibold py-2.5 rounded-lg transition-all text-sm">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section
        id="services"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-[#E8352A]">Aerial</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Transform your drone footage with our specialized aerial
              enhancement tools.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to right, transparent, ${service.color}, transparent)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: service.bg, color: service.color }}
                >
                  <span className="w-10 h-10 flex items-center justify-center">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">
                  {service.description}
                </p>
                {(() => {
                  const slug = slugify(service.title);
                  return (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenServiceSlug((prev) =>
                            prev === slug ? null : slug,
                          )
                        }
                        aria-expanded={openServiceSlug === slug}
                        className="text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                        style={{ color: service.color }}
                      >
                        Learn more{" "}
                        <ArrowRight className="w-3.5 h-3.5 text-current" />
                      </button>
                      {openServiceSlug === slug && (
                        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-800 shadow-sm">
                          <p className="mb-3">
                            {service.description} Examples, turnaround times,
                            and common use-cases.
                          </p>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setOpenServiceSlug(null)}
                              className="px-3 py-2 rounded-md bg-gray-100 text-gray-800"
                            >
                              Close
                            </button>
                            <Link
                              href={`/service/real-estate/uav-retouching/${slug}`}
                              className="px-3 py-2 rounded-md bg-[#E8352A] text-white"
                            >
                              Open full page
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
