// app/day-to-dusk/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sun, Moon, CheckCircle, ArrowRight,
  Clock, Layers, Eye, Sparkles,
  ChevronLeft, ChevronRight, Star, Cloud, Sunset
} from 'lucide-react';
import Link from 'next/link';

export default function DayToDuskPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Day');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  /* ── Real property before/after images ── */
  const imageExamples = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=85&auto=format&fit=crop',
      afterImage:  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=85&auto=format&fit=crop',
      description: 'Transform a bright daytime pool villa into a warm dusk masterpiece.',
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=85&auto=format&fit=crop',
      afterImage:  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=85&auto=format&fit=crop',
      description: 'Suburban home converted to a cinematic golden-hour showcase.',
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=900&q=85&auto=format&fit=crop',
      afterImage:  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&q=85&auto=format&fit=crop',
      description: 'Classic exterior transformed to a dramatic twilight blue-hour scene.',
    },
    {
      id: 4,
      beforeImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85&auto=format&fit=crop',
      afterImage:  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85&auto=format&fit=crop',
      description: 'Luxury property lit up at dusk with glowing windows and vibrant sky.',
    },
  ];

  const stats = [
    { value: '1,440', label: 'Minute Precision',  sub: 'Ultra-fine time control',        icon: <Clock   className="w-5 h-5" /> },
    { value: '16K+',  label: 'Time Presets',       sub: 'Professional presets to choose', icon: <Layers  className="w-5 h-5" /> },
    { value: '99%',   label: 'Realism Accuracy',   sub: 'Naturally realistic results',    icon: <Eye     className="w-5 h-5" /> },
    { value: '24h',   label: 'Time Range',          sub: 'Any time, any mood, any scene',  icon: <Star    className="w-5 h-5" /> },
  ];

  const editorTabs = ['Day', 'Sunset', 'Dusk', 'Night', 'Blue Hour'];

  const services = [
    { title: 'Day to Dusk',          description: 'Convert bright daytime shots into magical dusk or golden-hour scenes.',         icon: <Sunset  className="w-6 h-6" /> },
    { title: 'Blue Hour Creation',   description: 'Create serene blue-hour atmospheres for premium property marketing.',            icon: <Moon    className="w-6 h-6" /> },
    { title: 'Golden Hour',          description: 'Warm golden tones that make every property feel inviting and aspirational.',      icon: <Sun     className="w-6 h-6" /> },
    { title: 'Twilight Sky',         description: 'Dramatic twilight skies with glowing windows and rich ambient lighting.',        icon: <Star    className="w-6 h-6" /> },
    { title: 'Night Conversion',     description: 'Full day-to-night conversion with exterior lighting simulation.',                icon: <Cloud   className="w-6 h-6" /> },
    { title: 'Sky Enhancement',      description: 'Replace or enhance skies to complement the chosen time-of-day effect.',         icon: <Sparkles className="w-6 h-6" /> },
    { title: 'Window Glow',          description: 'Add realistic warm interior window glow for authentic dusk appearance.',         icon: <Eye     className="w-6 h-6" /> },
    { title: 'Batch Conversion',     description: 'Process entire property shoots consistently across all time-of-day styles.',     icon: <Layers  className="w-6 h-6" /> },
  ];

  /* ── Slider auto-animation ── */
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

  const changeImage = (i: number) => { setCurrentImageIndex(i); setSliderPosition(50); };
  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.16;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Day to Dusk', qty: 1, price: pricePerImage,
      retouching: 'Day to Dusk', order_name: 'Day to Dusk Conversion',
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
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Large soft radial blobs */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          {/* Bottom center warm glow — sunrise/dusk feel */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(255,120,50,0.08) 0%, transparent 70%)' }} />

          {/* Orbit SVG rings — centred on right half where the slider lives */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700"
            fill="none" preserveAspectRatio="xMidYMid meet">
            {/* Static faint rings */}
            <ellipse cx="850" cy="350" rx="280" ry="210" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="850" cy="350" rx="220" ry="165" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            {/* Sweeping dash — CW */}
            <ellipse cx="850" cy="350" rx="280" ry="210" stroke="#E8352A" strokeWidth="1.6" opacity="0.40"
              strokeDasharray="220 1600"
              style={{ animation: 'dtdCW 8s linear infinite', transformOrigin: '850px 350px' }}/>
            {/* Sweeping dash — CCW */}
            <ellipse cx="850" cy="350" rx="220" ry="165" stroke="#E8352A" strokeWidth="1.0" opacity="0.25"
              strokeDasharray="150 1200"
              style={{ animation: 'dtdCCW 11s linear infinite', transformOrigin: '850px 350px' }}/>
            {/* Sun arc on the left side */}
            <path d="M 100 600 Q 300 80 700 200" stroke="#FF8C42" strokeWidth="1.2" opacity="0.12"
              strokeDasharray="8 18" strokeLinecap="round"/>
          </svg>

          {/* Floating red spheres */}
          <motion.div animate={{ y: [-14, 14, -14] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute right-[6%] top-[6%]"
            style={{ width: 54, height: 54, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow: '0 10px 32px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[8%] top-[46%]"
            style={{ width: 26, height: 26, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow: '0 5px 18px rgba(232,53,42,0.28)' }} />

          {/* Glassmorphic spheres */}
          <motion.div animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
            className="absolute left-[5%] top-[45%]"
            style={{ width: 62, height: 62, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.5) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow: '0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border: '1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 0.7 }}
            className="absolute left-[13%] bottom-[26%]"
            style={{ width: 30, height: 30, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 3px 12px rgba(15,23,42,0.07)',
              border: '1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y: [-9, 9, -9] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 1.3 }}
            className="absolute right-[12%] top-[52%]"
            style={{ width: 38, height: 38, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 4px 14px rgba(15,23,42,0.08)',
              border: '1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[46%] top-[7%]"
            style={{ width: 16, height: 16, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.96) 0%,rgba(218,226,242,0.40) 70%)',
              boxShadow: '0 2px 6px rgba(15,23,42,0.06)',
              border: '1px solid rgba(208,218,234,0.30)' }} />

          {/* Tiny dot accents */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[43%] top-[13%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[17%] top-[21%] w-3.5 h-3.5 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[13%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
          <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: 1.4 }}
            className="absolute right-[31%] bottom-[16%] w-3 h-3 rounded-full bg-[#E8352A]/25" />
        </div>

        {/* CSS for orbit sweeps */}
        <style>{`
          @keyframes dtdCW  { to { stroke-dashoffset: -1820; } }
          @keyframes dtdCCW { to { stroke-dashoffset:  1350; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-10 lg:pt-24 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 w-full"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}>

              {/* Badge */}
             

              {/* Heading — red first, then black (matches screenshot) */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight">
                <motion.span className="block text-[#E8352A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Day to Dusk
                </motion.span>
                <motion.span className="block text-[#1A1A1A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Time Transformation
                </motion.span>
                <motion.span className="block text-[#1A1A1A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.40, duration: 0.55 }}>
                  Magic
                </motion.span>
              </h1>

              {/* Description */}
              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
                Transform any daytime photo into magical dusk, sunset, or twilight scenes.
                Watch as AI magically changes the time of day with rich red-toned gradients
                and cinematic lighting.
              </motion.p>

              {/* Feature pills */}
              {/* <motion.div className="flex flex-wrap gap-5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.62 }}>
                {[
                  { icon: <Sun      className="w-3.5 h-3.5" />, label: 'Smart Lighting',   sub: 'AI adjusts light naturally'         },
                  { icon: <Sunset   className="w-3.5 h-3.5" />, label: 'Rich Colors',       sub: 'Beautiful red-toned gradients'      },
                  { icon: <Sparkles className="w-3.5 h-3.5" />, label: 'Cinematic Look',    sub: 'Stunning atmosphere in one click'   },
                  { icon: <Clock    className="w-3.5 h-3.5" />, label: 'Any Time',          sub: 'From day to night instantly'        },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="text-[#E8352A]">{item.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A] leading-none">{item.label}</p>
                      <p className="text-[10px] text-[#999] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div> */}

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1 justify-center lg:justify-start w-full"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105 w-full sm:w-auto">
                 
             Get Start For Free
                  
                </Link>
                {/* <button onClick={addToCart}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1A1A1A] font-semibold text-sm border border-[#E2E4E8] hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  View Examples
                </button> */}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: slider + time-of-day toolbar ── */}
            <motion.div className="relative flex flex-col items-center"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Before/After card */}
              <div ref={sliderRef}
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none w-full max-w-full"
                style={{ aspectRatio: '4/3', border: '2px solid rgba(255,255,255,0.9)' }}
                onMouseMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchMove={handleSliderMove}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}>

                {/* Before (day) */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                {/* After (dusk) — revealed from left */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
                </div>

                {/* Divider */}
                <div className="absolute top-0 bottom-0 z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]"
                    style={{ boxShadow: '0 4px 16px rgba(232,53,42,0.30)' }}>
                    <div className="flex gap-0.5">
                      <ChevronLeft  className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/75 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-3 right-3 z-10 bg-[#E8352A] text-white text-[11px] font-semibold px-3 py-1 rounded-full">After</span>
              </div>

              {/* Time-of-day toolbar */}
              <div className="w-full bg-white rounded-b-2xl border border-t-0 border-[#EBEBEB] shadow-lg px-2 py-3 flex flex-wrap items-center justify-center gap-2">
                {editorTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center gap-1 flex-1 min-w-[90px] py-1.5 rounded-lg transition-all ${
                      activeTab === tab ? 'bg-[#E8352A]/10 text-[#E8352A]' : 'text-[#888] hover:text-[#555]'
                    }`}>
                    {tab === 'Day'       && <Sun      className="w-4 h-4" />}
                    {tab === 'Sunset'    && <Sunset   className="w-4 h-4" />}
                    {tab === 'Dusk'      && <Sparkles className="w-4 h-4" />}
                    {tab === 'Night'     && <Moon     className="w-4 h-4" />}
                    {tab === 'Blue Hour' && <Star     className="w-4 h-4" />}
                    <span className={`text-[10px] font-semibold whitespace-nowrap ${activeTab === tab ? 'text-[#E8352A]' : ''}`}>{tab}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

   
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">Time Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              See daytime property shots magically transform into beautiful dusk and twilight scenes.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch px-4 sm:px-0">
            {/* Slider */}
            <div className="flex-1 flex flex-col w-full max-w-full">
              <div ref={sliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px] w-full max-w-full"
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
                      <ChevronLeft  className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  <Sun className="w-3 h-3 inline mr-1" />Day
                </span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <Moon className="w-3 h-3 inline mr-1" />Dusk
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full">
                <button onClick={() => changeImage((currentImageIndex - 1 + imageExamples.length) % imageExamples.length)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeImage((currentImageIndex + 1) % imageExamples.length)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 max-w-xl bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Day to Dusk</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional day-to-dusk conversion for real estate property photography.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.16 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Day to Dusk / Twilight','Golden Hour Conversion','Blue Hour Creation','Window Glow Effect','Sky Replacement','Cinematic Lighting'].map(feat => (
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
          SERVICES GRID
      ══════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Time Transformation</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Every time-of-day style, crafted by professional retouchers for standout listings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
