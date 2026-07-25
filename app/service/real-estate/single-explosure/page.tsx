// app/single-exposure/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Camera, Sparkles, Shield, CheckCircle,
  ArrowRight, Image as ImageIcon,
  BarChart, Target, ChevronRight, ChevronLeft,
  Sun, Contrast, Layers, Wand2,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

function ServicesSection({ services }: { services: { title: string; description: string; icon: LucideIcon; color: string; bg: string }[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="inline-block text-[#E8352A] text-2xl font-bold tracking-[0.2em] uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Related <span className="text-[#E8352A]">Services</span>
          </h2>
          <p className="text-[#777] text-xl">
            Additional real estate photo services designed to make listings look their best.
          </p>
        </motion.div>

        {/* grid */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {(() => {
            const slugify = (s: string) =>
              s
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            return services.map((service, i) => {
              const href = (service as any).href ?? `/service/${slugify(service.title)}`;
              return (
                <Link key={i} href={href} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="relative rounded-2xl p-6 border border-[#EBEBEB] bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-[#E8352A]/20 transition-shadow duration-300"
                  >
                    {/* hover glow fill */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />

                    {/* top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />

                    {/* icon */}
                    <div
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                      style={{ background: service.bg, color: service.color }}
                    >
                      {React.createElement(service.icon, { size: 24, className: 'w-10 h-10' })}
                    </div>

                    <h3 className="text-[#1A1A1A] font-bold text-xl mb-2 transition-colors duration-300"
                      style={{ ['--hover-color' as string]: service.color }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-[#888] text-lg leading-relaxed mb-5">{service.description}</p>

                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: service.color }}>
                      <span className="relative text-xl after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
                        style={{ ['--tw-after-bg' as string]: service.color }}>
                        Learn more
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* corner number */}
                    <span className="absolute top-4 right-5 text-[11px] font-bold text-[#1A1A1A]/10 transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </motion.div>
                </Link>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
}

export default function SingleExposurePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Exposure');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const imageExamples = [
    {
      id: 1,
      beforeTitle: 'Dark Interior',
      afterTitle: 'Bright & Inviting Interior',
      beforeImage: '/images/Real-Estate-Single_Exposure-S-Raw-2.webp',
      afterImage: '/images/Real-Estate-Single_Exposure-S-Corrected-2.webp',
      description: 'Brighten dark interiors and achieve balanced exposure with manual retouching.',
    },
    {
      id: 2,
      beforeTitle: 'Uneven Lighting',
      afterTitle: 'Balanced Natural Exposure',
      beforeImage: '/images/Real-Estate-Single_Exposure-S-Raw-1.webp',
      afterImage: '/images/Real-Estate-Single_Exposure-S-Corrected-1.webp',
      description: 'Correct inconsistent lighting for a clean, natural property presentation.',
    },
    {
      id: 3,
      beforeTitle: 'Flat Exterior',
      afterTitle: 'Vibrant Property Exterior',
      beforeImage: '/images/real-estate-basic-sky-explosure-before.webp',
      afterImage: '/images/real-estate-basic-sky-explosure-after.webp',
      description: 'Enhance exterior shots with richer color and improved curb appeal.',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Photos Edited' },
    { value: '24hr', label: 'Delivery Time' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Years Experience' },
  ];

  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  const services = [
    { title: 'HDR Photo Editing', description: 'Enhance dynamic range while preserving natural detail in every room.', icon: Camera, color: '#E8352A', bg: '#FFF0EE', href: '/service/real-estate/hdr-basic' },
    { title: 'Day to Dusk', description: 'Turn daytime property shots into elegant evening scenes for marketing.', icon: Sparkles, color: '#7C3AED', bg: '#F5F0FF', href: '/service/real-estate/day-to-dusk' },
    { title: 'Virtual Staging', description: 'Prepare spaces for listings with photo-ready staging support.', icon: ImageIcon, color: '#0EA5E9', bg: '#F0F9FF', href: '/service/real-estate/virtual-staging' },
    { title: 'Sky Replacement', description: 'Replace dull skies with clean, attractive backdrops.', icon: Target, color: '#10B981', bg: '#ECFDF5', href: '/service/real-estate/sky-replacement' },
    { title: 'Object Removal', description: 'Remove distractions for cleaner, more professional property images.', icon: Shield, color: '#F59E0B', bg: '#FFFBEB', href: '/service/real-estate/digital-declutter' },
    { title: 'Image Enhancement', description: 'Sharpen detail, refine color, and improve overall visual appeal.', icon: CheckCircle, color: '#EC4899', bg: '#FDF2F8', href: '/service/real-estate/hdr-preminum' },
    { title: 'Floor Plan Redraw', description: 'Create polished floor plan visuals for property marketing.', icon: BarChart, color: '#6366F1', bg: '#EEF2FF', href: '/service/real-estate/2d-3d-floor-plans' },
    { title: 'Virtual Renovation', description: 'Showcase property potential with realistic renovation mockups.', icon: Layers, color: '#14B8A6', bg: '#F0FDFA', href: '/service/3d-services/3d-rendering' },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const rect = sliderRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 1.5;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0)   { sliderDirectionRef.current =  1; return 0;   }
        return next;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [isDragging, isHoveringSlider]);

  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
    setSliderPosition(50);
  };

  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.12;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Single Exposure Editing', qty: 1, price: pricePerImage,
      retouching: 'Single Exposure Editing', order_name: currentImage.afterTitle,
      order_images: imageCount, order_details: currentImage.description, addons: [], total,
    };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch {
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/';
    }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ══════════════════════════════════════════
          HERO — full-bleed cinematic
      ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* ── Animated mesh background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* base noise texture via SVG filter */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          {/* large red glow — left */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }}
          />
          {/* subtle glow — right */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }}
          />
          {/* grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
          {/* floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute rounded-full bg-[#E8352A]"
              style={{
                width: [6,4,8,5,3,7][i], height: [6,4,8,5,3,7][i],
                left: `${[12,28,45,62,75,88][i]}%`,
                top: `${[20,65,15,75,35,55][i]}%`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* ── Main content grid ── */}
        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT PANEL */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Real Estate Editing</span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Single', 'Exposure', 'Editing'].map((word, i) => (
                <motion.span key={word} className={`block ${
                  i === 1 ? 'text-[#E8352A]' : 'text-white'
                } text-[clamp(3rem,8vw,7rem)]`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Transform property photographs with expert manual editing — precise exposure correction,
              color grading, and perspective fixes that make listings sell faster.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)] hover:scale-105">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:border-[#E8352A]/50 hover:text-white hover:bg-white/5 transition-all">
                View Examples
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL — full-height before/after */}
          <motion.div
            className="relative flex flex-col lg:h-screen"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            {/* Before/After fills the entire right column */}
            <div
              ref={sliderRef}
              className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0"
              style={{ minHeight: 340 }}
              onMouseMove={handleSliderMove}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchMove={handleSliderMove}
              onTouchEnd={() => setIsDragging(false)}
              onMouseUp={() => setIsDragging(false)}
            >
              {/* Before */}
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentImage.beforeImage})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              {/* After */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentImage.afterImage})`,
                    width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
                  }} />
              </div>

              {/* Divider */}
              <div className="absolute top-0 bottom-0 z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]"
                  style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div className="flex gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              {/* Bottom overlay: editor toolbar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                        activeTab === tab
                          ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]'
                          : 'text-white/50 hover:text-white/80'
                      }`}>
                      {tab === 'Exposure'   && <Sun    className="w-4 h-4" />}
                      {tab === 'Contrast'   && <Contrast className="w-4 h-4" />}
                      {tab === 'Highlights' && <Sun    className="w-4 h-4 opacity-70" />}
                      {tab === 'Shadows'    && <Layers className="w-4 h-4" />}
                      {tab === 'Color'      && <Wand2  className="w-4 h-4" />}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating AI badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Manual Edit</span>
              </motion.div>
            </div>

            {/* Image selector dots */}
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {imageExamples.map((_, i) => (
                <button key={i} onClick={() => changeImage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    currentImageIndex === i
                      ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]'
                      : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                  }`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY SECTION
      ══════════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Transformation</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Explore before and after comparisons from our real estate photo studio.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Slider */}
            <div className="flex-1 flex flex-col">
              <div ref={sliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Raw</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Corrected</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => changeImage((currentImageIndex - 1 + imageExamples.length) % imageExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeImage((currentImageIndex + 1) % imageExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Single Exposure Editing</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">Professional manual retouching for real estate property photographs.</p>
              <div className="text-2xl font-bold text-[#111] mb-4">$0.12 <span className="text-base font-normal text-[#555]">/ image</span></div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Exposure Correction','Color Enhancement','White Balance Adjustment','Shadow & Highlight Recovery','Perspective Correction','Window View Enhancement'].map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-[#333]">
                    <CheckCircle className="w-4 h-4 text-[#E8352A] flex-shrink-0" />{feat}
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

      {/* ══════════════════════════════════════════
          RELATED SERVICES
      ══════════════════════════════════════════ */}
      <ServicesSection services={services} />

    </div>
  );
}
