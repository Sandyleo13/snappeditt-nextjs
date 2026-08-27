'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Layers,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';

type HdrCase = {
  id: number;
  beforeTitle: string;
  afterTitle: string;
  beforeImage: string;
  afterImage: string;
  description: string;
};

const hdrCases: HdrCase[] = [
  {
    id: 1,
    beforeTitle: 'Raw Property',
    afterTitle: 'Balanced HDR',
    beforeImage: '/images/HDR%20Basic/1-before.webp',
    afterImage: '/images/HDR%20Basic/1-after.webp',
    description:
      'Balance exposure, recover natural detail, and create a clean HDR finish for real estate photography.',
  },
  {
    id: 2,
    beforeTitle: 'Raw Exterior',
    afterTitle: 'HDR Exterior',
    beforeImage: '/images/HDR%20Basic/2-before.webp',
    afterImage: '/images/HDR%20Basic/2-after.webp',
    description:
      'Bring back architectural detail while keeping the sky, highlights, and property colors natural.',
  },
  {
    id: 3,
    beforeTitle: 'Raw Interior',
    afterTitle: 'Enhanced Interior',
    beforeImage: '/images/HDR%20Basic/3-before.webp',
    afterImage: '/images/HDR%20Basic/3-after.webp',
    description:
      'Improve interior exposure and color balance while preserving realistic shadows and highlights.',
  },
  {
    id: 4,
    beforeTitle: 'Raw Listing Photo',
    afterTitle: 'Polished HDR',
    beforeImage: '/images/HDR%20Basic/4-before.webp',
    afterImage: '/images/HDR%20Basic/4-after.webp',
    description:
      'Turn a flat property capture into a polished, listing-ready image with balanced tones and detail.',
  },
  {
    id: 5,
    beforeTitle: 'Raw Property Capture',
    afterTitle: 'Natural HDR Finish',
    beforeImage: '/images/HDR%20Basic/5-before.webp',
    afterImage: '/images/HDR%20Basic/5-after.webp',
    description:
      'Create a bright, natural-looking property image without an overly processed HDR appearance.',
  },
];

function HdrServicesSection({
  services,
}: {
  services: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bg: string;
  }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F8F9FB] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.2em] text-[#E8352A] sm:text-base">
            What We Offer
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-[#1A1A1A] sm:text-4xl md:text-5xl">
            Our HDR Solutions
          </h2>
          <p className="text-base text-[#777] sm:text-lg">
            Professional HDR editing services designed to make every listing shine.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white p-6 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-lg"
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
                style={{ background: service.bg, color: service.color }}
              >
                {React.createElement(service.icon, {
                  size: 24,
                  className: 'h-6 w-6',
                })}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-[#1A1A1A] transition-colors duration-300 group-hover:text-[#E8352A]">
                {service.title}
              </h3>
              <p className="mb-5 text-base leading-relaxed text-[#888] sm:text-lg">
                {service.description}
              </p>

              <div
                className="flex items-center gap-1.5 text-base font-semibold sm:text-lg"
                style={{ color: service.color }}
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                  Learn more
                </span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <span className="absolute right-5 top-4 text-[11px] font-bold text-[#1A1A1A]/10 transition-colors duration-300 group-hover:text-[#E8352A]/20">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HdrBasicPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);

  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);

  const currentCase = hdrCases[currentCaseIndex];

  const stats = [
    { value: '50K+', label: 'Photos Edited' },
    { value: '24hr', label: 'Delivery' },
    { value: '98%', label: 'Satisfaction' },
    { value: '10+', label: 'Yrs Experience' },
  ];

  const services = [
    {
      title: 'Exposure Correction',
      description:
        'Balance bright windows, dark rooms, and uneven exposure for a natural property image.',
      icon: Zap,
      color: '#E8352A',
      bg: '#FFF0EE',
    },
    {
      title: 'Tone Mapping',
      description:
        'Create balanced HDR tones that retain detail without making the image look artificial.',
      icon: BarChart3,
      color: '#7C3AED',
      bg: '#F5F0FF',
    },
    {
      title: 'Color Enhancement',
      description:
        'Restore accurate, vibrant colors across interiors, exteriors, furniture, and landscapes.',
      icon: Sparkles,
      color: '#0EA5E9',
      bg: '#F0F9FF',
    },
    {
      title: 'Highlight Recovery',
      description:
        'Recover highlight and shadow detail while maintaining a clean and realistic HDR finish.',
      icon: CloudSun,
      color: '#10B981',
      bg: '#ECFDF5',
    },
  ];

  const handleSliderMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;

    const target = e.target as Node;
    const activeRef = heroSliderRef.current?.contains(target)
      ? heroSliderRef
      : gallerySliderRef;

    if (!activeRef.current) return;

    e.preventDefault();

    const rect = activeRef.current.getBoundingClientRect();
    const x =
      'touches' in e
        ? e.touches[0]?.clientX ?? rect.left
        : (e as React.MouseEvent).clientX;

    const percentage = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  useEffect(() => {
    setSliderPosition(50);
    sliderDirectionRef.current = 1;
  }, [currentCaseIndex]);

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;

    let animationFrame = 0;
    let startTime = 0;
    let delayTimer: ReturnType<typeof setTimeout>;

    const startDelay = 1800;
    const animationDuration = 3200;

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setSliderPosition(50 + 50 * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        delayTimer = setTimeout(() => {
          setCurrentCaseIndex(
            (prev) => (prev + 1) % hdrCases.length,
          );
          setSliderPosition(50);
        }, 1300);
      }
    };

    delayTimer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [currentCaseIndex, isDragging, isHoveringSlider, hdrCases.length]);

  const changeCase = (index: number) => {
    setCurrentCaseIndex(index);
    setSliderPosition(50);
  };

  const addToCart = () => {
    const pricePerImage = 0.14;
    const imageCount = 50;
    const total = Number((pricePerImage * imageCount).toFixed(2));

    const cartItem = {
      service_name: 'HDR Basic',
      qty: 1,
      price: pricePerImage,
      retouching: 'HDR Basic',
      order_name: currentCase.afterTitle,
      order_images: imageCount,
      order_details: currentCase.description,
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
        'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch {
      document.cookie =
        'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/';
    }

    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* ===================================================
          HERO — HDR BASIC
          Designed to match the reference layout:
          left content + right comparison card with thumbnails
      =================================================== */}
      <section className="relative w-full overflow-hidden bg-[#0D0D0F]">
        <div className="grid lg:min-h-[calc(100vh-76px)] lg:grid-cols-2">
          {/* LEFT — CONTENT */}
          <div className="flex flex-col justify-center px-7 pb-14 pt-24 sm:px-12 lg:px-14 lg:py-16 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E8352A]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8352A] sm:text-xs">
                Basic HDR Retouching
              </span>
            </motion.div>

            <h1 className="mb-6 font-extrabold leading-[0.94] tracking-tight">
              {["HDR", "Basic", "Retouching"].map((word, i) => (
                <motion.span
                  key={word}
                  className={`block text-[clamp(3.2rem,6.4vw,6rem)] ${
                    i === 1 ? "text-[#E8352A]" : "text-white"
                  }`}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.1,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mb-9 max-w-md text-sm leading-relaxed text-[#A0A0B0] sm:text-base lg:text-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Bring every property to life with professionally edited HDR
              images. We balance exposure, colors, and details to create
              bright, natural-looking photos that help listings stand out.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <Link
                href="/free-trial"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#E8352A] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(232,53,42,0.3)] transition-all hover:bg-[#C62B20] hover:shadow-[0_0_40px_rgba(232,53,42,0.4)]"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white"
              >
                View Examples
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-white lg:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#666]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — BEFORE / AFTER CARD */}
          <motion.div
            className="flex items-center bg-[#111113] px-3 pb-3 sm:px-5 sm:pb-5 lg:px-4 lg:py-4 xl:px-6 xl:py-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="w-full overflow-hidden rounded-[22px] border border-white/10 bg-black shadow-2xl">
              {/* MAIN COMPARISON IMAGE */}
              <div
                ref={heroSliderRef}
                className="relative aspect-[4/3] w-full cursor-col-resize select-none overflow-hidden sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11]"
                onMouseDown={(event) => {
                  setIsDragging(true);
                  handleSliderMove(event);
                }}
                onMouseMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => {
                  setIsDragging(false);
                  setIsHoveringSlider(false);
                }}
                onTouchStart={(event) => {
                  setIsDragging(true);
                  handleSliderMove(event);
                }}
                onTouchMove={handleSliderMove}
                onTouchEnd={() => setIsDragging(false)}
              >
                {/* AFTER — full image */}
                <Image
                  key={`hero-after-${currentCaseIndex}`}
                  src={currentCase.afterImage}
                  alt={`${currentCase.afterTitle} HDR Basic`}
                  fill
                  priority={currentCaseIndex === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  draggable={false}
                />

                {/* BEFORE — clipped */}
                <div
                  className="absolute inset-0 z-[1] overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <Image
                    key={`hero-before-${currentCaseIndex}`}
                    src={currentCase.beforeImage}
                    alt={`${currentCase.beforeTitle} HDR Basic`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    draggable={false}
                  />
                </div>

                {/* SLIDER DIVIDER */}
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
                      Basic HDR Retouching
                    </span>
                  </div>
                </div>
              </div>

              {/* THUMBNAILS */}
              <div className="border-t border-white/10 bg-[#111113] px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous example"
                    onClick={() =>
                      changeCase(currentCaseIndex - 1)
                    }
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="grid min-w-0 flex-1 grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((offset) => {
                      const index =
                        (currentCaseIndex + offset) % hdrCases.length;

                      const item = hdrCases[index];
                      const active = index === currentCaseIndex;

                      return (
                        <button
                          type="button"
                          key={`${item.id}-${offset}`}
                          onClick={() => changeCase(index)}
                          aria-label={`Show HDR example ${index + 1}`}
                          className={`group relative aspect-[16/9] overflow-hidden rounded-lg border transition-all duration-300 ${
                            active
                              ? "border-[#E8352A] shadow-[0_0_14px_rgba(232,53,42,0.3)]"
                              : "border-white/10 opacity-65 hover:border-white/30 hover:opacity-100"
                          }`}
                        >
                          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
                            <Image
                              src={item.beforeImage}
                              alt={`Example ${item.id} before`}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                          </div>

                          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                            <Image
                              src={item.afterImage}
                              alt={`Example ${item.id} after`}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                          </div>

                          <div className="absolute bottom-0 left-1/2 top-0 z-10 w-px -translate-x-1/2 bg-white/80" />

                          <span className="absolute bottom-1 left-1 z-20 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold text-white">
                            {index + 1}
                          </span>

                          {active && (
                            <span className="absolute right-1.5 top-1.5 z-20 h-1.5 w-1.5 rounded-full bg-[#E8352A] shadow-[0_0_7px_rgba(232,53,42,0.9)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    aria-label="Next example"
                    onClick={() =>
                      changeCase(currentCaseIndex + 1)
                    }
                    className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:border-[#E8352A]/50 hover:bg-[#E8352A] sm:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 text-center text-[10px] font-semibold text-white/35">
                  {currentCaseIndex + 1} / {hdrCases.length}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#F7F8FA] py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
              Watch <span className="text-[#E8352A]">HDR Transform</span>
            </h2>
            <p className="text-base text-[#555] sm:text-lg md:text-xl">
              See raw property photos transform into bright, balanced HDR images.
            </p>
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-stretch gap-8 lg:flex-row">
            <div className="flex flex-1 flex-col">
              <div
                ref={gallerySliderRef}
                className="relative min-h-[320px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-xl sm:min-h-[480px]"
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
                {/* BEFORE */}
                <img
                  src={currentCase.beforeImage}
                  alt={`${currentCase.beforeTitle} - HDR Basic`}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  draggable={false}
                />

                {/* AFTER — clipped with the slider position */}
                <img
                  src={currentCase.afterImage}
                  alt={`${currentCase.afterTitle} - HDR Basic`}
                  className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                  draggable={false}
                />

                <div
                  className="absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-lg"
                  style={{
                    left: `${sliderPosition}%`,
                    transform: 'translateX(-50%)',
                  }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-xl">
                    <div className="flex gap-0.5">
                      <ChevronLeft className="h-3 w-3 text-[#E8352A]" />
                      <ChevronRight className="h-3 w-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  Before
                </span>
                <span className="absolute bottom-4 right-4 z-10 rounded-full bg-[#E8352A] px-3 py-1 text-xs font-semibold text-white">
                  After
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    changeCase(
                      (currentCaseIndex - 1 + hdrCases.length) %
                        hdrCases.length,
                    )
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#E8352A] px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-[#C62B20]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeCase((currentCaseIndex + 1) % hdrCases.length)
                  }
                  className="flex items-center gap-1.5 rounded-full bg-[#E8352A] px-5 py-2 text-sm font-semibold text-white shadow transition-all hover:bg-[#C62B20]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-md lg:w-80 xl:w-96">
              <h3 className="mb-2 text-xl font-bold text-[#E8352A] sm:text-2xl">
                HDR Basic
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-[#555]">
                Professional HDR photo editing for real estate with balanced
                exposure, natural colors, and clean detail.
              </p>

              <div className="mb-4 text-2xl font-bold text-[#111]">
                $0.14{' '}
                <span className="text-base font-normal text-[#555]">
                  / image
                </span>
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="mb-5 w-full rounded-lg bg-[#E8352A] py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#C62B20]"
              >
                Add to Cart
              </button>

              <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                {[
                  'HDR Merging & Tone Mapping',
                  'Exposure Correction',
                  'Color Enhancement',
                  'Shadow & Highlight Recovery',
                  'White Balance Adjustment',
                  'Natural HDR Look',
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[#333]"
                  >
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#E8352A]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/service/real-estate/hdr-basic/check-out"
                className="w-full rounded-lg border border-[#E8352A] py-2.5 text-center text-sm font-semibold text-[#E8352A] transition-all hover:bg-[#FFF3F2]"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HdrServicesSection services={services} />
    </div>
  );
}
