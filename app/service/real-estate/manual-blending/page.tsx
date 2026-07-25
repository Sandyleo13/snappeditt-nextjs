// app/manual-blending/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, Brush, Palette, CheckCircle,
  ArrowRight, Wand2, Settings, Droplets,
  ChevronLeft, ChevronRight, Sun
} from 'lucide-react';
import Link from 'next/link';

export default function ManualBlendingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Mask');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  const imageExamples = [
    {
      id: 1,
      beforeTitle: 'Dark Interior',
      afterTitle: 'Perfectly Blended',
      beforeImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop&brightness=60&saturation=50',
      afterImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop',
      description: 'Blend multiple exposures to reveal perfect window views and bright interior details.',
    },
    {
      id: 2,
      beforeTitle: 'Harsh Window Glare',
      afterTitle: 'Natural Window Pull',
      beforeImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop&brightness=55&saturation=40',
      afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop',
      description: 'Manually pull window views and blend ambient light for a natural, inviting feel.',
    },
    {
      id: 3,
      beforeTitle: 'Flat Bedroom Shot',
      afterTitle: 'Warm Blended Result',
      beforeImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop&brightness=58&saturation=45',
      afterImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop',
      description: 'Create depth and warmth by manually blending flash and ambient light layers.',
    },
    {
      id: 4,
      beforeTitle: 'Color Disparity',
      afterTitle: 'Color Harmony',
      beforeImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop&brightness=60&saturation=40',
      afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop',
      description: 'Manually blend and harmonize disparate colors for cohesive visual results.',
    },
    {
      id: 5,
      beforeTitle: 'Raw Exposure',
      afterTitle: 'Blended Result',
      beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop&brightness=58&saturation=42',
      afterImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
      description: 'Achieve perfectly balanced exposures through expert manual blending techniques.',
    },
  ];

  const stats = [
    { value: '64+',  label: 'Blend Modes',    sub: 'Professional Tools'    },
    { value: '200+', label: 'Custom Brushes', sub: 'For Every Need'         },
    { value: '4.9/5',label: 'User Rating',    sub: 'Trusted by Professionals'},
    { value: '50K+', label: 'Images Blended', sub: 'Active Creators'        },
  ];

  const editorTabs = ['Mask', 'Blend', 'Color', 'Depth', 'Refine'];

  const tools = [
    { title: 'Layer Masking',   description: 'Precise layer masking with feathering and edge refinement for clean results.',   icon: <Layers   className="w-8 h-8" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Brush Engine',    description: 'Customizable brush engine with pressure sensitivity for gradual blending.',      icon: <Brush    className="w-8 h-8" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Color Blending',  description: 'Advanced color blending with harmony and matching tools for cohesive looks.',    icon: <Palette  className="w-8 h-8" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Opacity Control', description: 'Fine-grained opacity and flow control for natural, seamless transitions.',       icon: <Droplets className="w-8 h-8" />, color: '#10B981', bg: '#ECFDF5' },
    { title: 'Exposure Blend',  description: 'Merge multiple exposures into one perfectly lit, balanced property image.',     icon: <Sun      className="w-8 h-8" />, color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Window Pull',     description: 'Naturally blend window views with interior shots for stunning clarity.',        icon: <Wand2    className="w-8 h-8" />, color: '#EC4899', bg: '#FDF2F8' },
    { title: 'Sky Replacement', description: 'Seamlessly replace and blend skies for impactful exterior photography.',        icon: <Layers   className="w-8 h-8" />, color: '#6366F1', bg: '#EEF2FF' },
    { title: 'Detail Refinement', description: 'Final pixel-level refinements for professional, market-ready delivery.',     icon: <Settings className="w-8 h-8" />, color: '#14B8A6', bg: '#F0FDFA' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, targetRef = sliderRef) => {
    if (!isDragging || !targetRef.current) return;
    e.preventDefault();
    const rect = targetRef.current.getBoundingClientRect();
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

  const changeImage = (index: number) => { setCurrentImageIndex(index); setSliderPosition(50); };
  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.22;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Manual Blending', qty: 1, price: pricePerImage,
      retouching: 'Manual Blending', order_name: currentImage.afterTitle,
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

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0D0D0F] text-white">

        {/* Animated mesh background */}
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="manual-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#manual-noise)" />
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="manual-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#manual-grid)" /></svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: size, height: size, left: `${[12, 28, 45, 62, 75, 88][i]}%`, top: `${[20, 65, 15, 75, 35, 55][i]}%`, filter: 'blur(1px)' }} />)}
        </div>

        <div className="relative z-10 grid min-h-screen flex-1 grid-cols-1 px-8 pb-12 pt-24 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-0 xl:px-24">
          <div className="flex flex-col justify-center lg:contents">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}>

           

              {/* Heading */}
              <motion.div className="mb-2 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm"
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">Real Estate Editing</span>
              </motion.div>
              <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl lg:text-7xl xl:text-[clamp(3rem,8vw,7rem)]">
                <motion.span className="block text-white"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Manual
                </motion.span>
                <motion.span className="block text-[#E8352A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Blending
                </motion.span>
              </h1>

              {/* Subheading */}
              <motion.p className="text-2xl font-semibold leading-snug text-white/90 md:text-3xl"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Professional Photo Compositing
              </motion.p>

              {/* Description */}
              <motion.p className="max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
                Transform flat photos into stunning, perfectly balanced images. Expert manual blending brings out the best in every detail, color, and light — delivering results no automated tool can match.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <Link href="/free-trial"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20]">
                  Get Started Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        
                </Link>
                   <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">
                  View Examples
                </button>
              </motion.div>

            
            </motion.div>

            {/* ── RIGHT: Before/After + Editor toolbar ── */}
            <motion.div className="relative flex flex-col items-center lg:h-screen lg:pr-0"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Vertical floating tool panel — matches screenshot */}
              <div className="absolute -right-14 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 rounded-2xl border border-white/10 bg-[#111114] p-2 shadow-xl lg:flex">
                {[
                  { icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>, active: false },
                  { icon: <Brush    className="w-4 h-4" />, active: true  },
                  { icon: <Layers   className="w-4 h-4" />, active: false },
                  { icon: <Droplets className="w-4 h-4" />, active: false },
                ].map((item, i) => (
                  <div key={i} className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    item.active
                      ? 'bg-[#E8352A] text-white shadow-md shadow-[#E8352A]/30'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}>
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* Slider card */}
              <div ref={heroSliderRef}
                className="relative mt-4 min-h-[340px] w-full flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-2xl lg:mt-0 lg:rounded-none"
                onMouseMove={(e) => handleSliderMove(e, heroSliderRef)}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchMove={(e) => handleSliderMove(e, heroSliderRef)}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}>
                {/* Before */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                {/* After */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                {/* Divider */}
                <div className="absolute top-0 bottom-0 z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]"
                    style={{ boxShadow: '0 4px 16px rgba(232,53,42,0.30)' }}>
                    <div className="flex gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/75 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-3 right-3 z-10 bg-[#E8352A] text-white text-[11px] font-semibold px-3 py-1 rounded-full">After</span>
              </div>

              {/* Editor toolbar */}
              <motion.div animate={{ y: isHoveringSlider ? [-4, 4, -4] : 0 }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <Wand2 className="h-3.5 w-3.5 text-[#E8352A]" /><span className="whitespace-nowrap text-[11px] font-semibold text-white">Manual Layer Blending</span>
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
              <div className="w-full px-3 py-3 flex items-center justify-between gap-1">
                {editorTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center gap-1 flex-1 py-1.5 rounded-lg transition-all ${
                      activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'
                    }`}>
                    {tab === 'Mask'   && <Layers   className="w-4 h-4" />}
                    {tab === 'Blend'  && <Brush    className="w-4 h-4" />}
                    {tab === 'Color'  && <Palette  className="w-4 h-4" />}
                    {tab === 'Depth'  && <Droplets className="w-4 h-4" />}
                    {tab === 'Refine' && <Wand2    className="w-4 h-4" />}
                    <span className="text-[10px] font-semibold">{tab}</span>
                  </button>
                ))}
              </div></div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div className="grid grid-cols-2 gap-4 px-8 pb-8 pt-14 sm:px-12 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-[calc(50%-4rem)] lg:grid-cols-4 lg:px-0 lg:pb-0 lg:pt-0 xl:left-24 xl:w-[calc(50%-8rem)]"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-sm transition-all duration-300 group hover:scale-105 hover:border-[#E8352A]/30">
                <p className="text-2xl font-bold text-[#E8352A]">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold text-white">{s.label}</p>
                <p className="mt-0.5 text-[10px] text-white/45">{s.sub}</p>
                <svg viewBox="0 0 80 20" className="w-full mt-2 opacity-50" fill="none">
                  <polyline points="0,15 15,10 30,13 45,5 60,9 80,3"
                    stroke="#E8352A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
              Watch <span className="text-[#E8352A]">Blending Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              See how manual blending techniques turn separate elements into seamless compositions.
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Unblended</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Blended</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Manual Blending</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Expert manual layer blending for seamless real estate photo compositing.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.22 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Manual Layer Masking','Exposure Blending','Color Harmonization','Shadow & Highlight Recovery','Edge Feathering & Refinement','Non-Destructive Workflow'].map(feat => (
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

      {/* ══════════════════════════════════════
          TOOLS / SERVICES
      ══════════════════════════════════════ */}
      <section id="tools" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Blending</span> Tools & Services
            </h2>
            <p className="text-xl text-gray-600">
              Professional manual blending tools for photographers and real estate studios.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${tool.color}0D 0%, transparent 70%)` }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${tool.color}, transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: tool.bg, color: tool.color }}>
                   <span className="w-10 h-10 flex items-center justify-center">{tool.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{tool.description}</p>
                {(() => {
                  const slug = slugify(tool.title);
                  return (
                    <>
                      <button type="button" onClick={() => setOpenServiceSlug(prev => prev === slug ? null : slug)} aria-expanded={openServiceSlug === slug} className="text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: tool.color }}>
                        Learn more <ArrowRight className="w-3.5 h-3.5 text-current" />
                      </button>
                      {openServiceSlug === slug && (
                        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-800 shadow-sm">
                          <p className="mb-3">{tool.description} Examples, turnarounds, and common use-cases for {tool.title}.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/real-estate/manual-blending/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
