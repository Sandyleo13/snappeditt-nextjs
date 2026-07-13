// app/baby-retouch/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Star, Sparkles, Users,
  ArrowRight, Zap, Shield, CheckCircle,
  Camera, Wand2, Eye,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Floating soft star/cloud decorative element ── */
function FloatingStar({ style, size = 16 }: { style: React.CSSProperties; size?: number }) {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10], opacity: [0.4, 0.8, 0.4] }}
      transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: 'easeInOut' }}
      className="absolute pointer-events-none"
      style={style}>
      <Star style={{ width: size, height: size, fill: '#E8352A', color: '#E8352A', opacity: 0.35 }} />
    </motion.div>
  );
}

/* ── Angel Glow badge ── */
function NewbornBadge() {
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2">
      {/* Pulsing star halo */}
      <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center">
        <motion.div className="absolute inset-0 rounded-full bg-[#E8352A]/15"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
        <div className="w-9 h-9 rounded-full bg-[#FFF0EE] flex items-center justify-center">
          <Star className="w-4 h-4 text-[#E8352A] fill-[#E8352A]" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">Angel Glow ✨</p>
        <p className="text-[9px] text-[#999] mt-0.5">Soft · Pure · Precious</p>
      </div>
    </motion.div>
  );
}

export default function BabyRetouchPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition]           = useState(50);
  const [isDragging, setIsDragging]                   = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]       = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const transformationExamples = [
    { id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage:  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85&auto=format&fit=crop',
      description: 'Gentle retouching that enhances your newborn\'s natural beauty.' },
    { id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1531895861208-8504b83fe2c3?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage:  'https://images.unsplash.com/photo-1531895861208-8504b83fe2c3?w=900&q=85&auto=format&fit=crop',
      description: 'Capture perfect milestone photos with the gentlest enhancement.' },
    { id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage:  'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?w=900&q=85&auto=format&fit=crop',
      description: 'Cherished family photos with baby, beautifully retouched.' },
    { id: 4,
      beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage:  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85&auto=format&fit=crop',
      description: 'Dreamy, angelic first-year milestone portraits.' },
  ];

  const stats = [
    { value: '5K+',  label: 'Babies Retouched', sub: 'Precious memories preserved', icon: <Heart className="w-5 h-5" /> },
    { value: '4.9★', label: 'Parent Rating',     sub: 'Based on loving reviews',     icon: <Star className="w-5 h-5" /> },
    { value: '100%', label: 'Gentle Touch',      sub: 'Natural, not over-edited',     icon: <Shield className="w-5 h-5" /> },
    { value: '24h',  label: 'Delivery Time',     sub: 'Fast, caring turnaround',      icon: <Zap className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Newborn Portraits',   description: 'Ultra-soft retouching that preserves your baby\'s delicate features.', icon: <Heart className="w-6 h-6" /> },
    { title: 'Milestone Memories',  description: 'Monthly milestone photos retouched with gentle, consistent style.',     icon: <Star className="w-6 h-6" /> },
    { title: 'Family with Baby',    description: 'Perfect family portraits with baby — everyone looking their best.',     icon: <Users className="w-6 h-6" /> },
    { title: 'First Year Album',    description: 'A full year of consistently retouched baby photos for your keepsake.',  icon: <Camera className="w-6 h-6" /> },
  ];

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 0.7;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0)   { sliderDirectionRef.current =  1; return 0; }
        return next;
      });
    }, 30);
    return () => window.clearInterval(id);
  }, [isDragging, isHoveringSlider]);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const activeRef = heroSliderRef.current?.contains(e.target as Node) ? heroSliderRef : gallerySliderRef;
    if (!activeRef.current) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const changeExample = (i: number) => {
    setCurrentExampleIndex((i + transformationExamples.length) % transformationExamples.length);
    setSliderPosition(50);
    sliderDirectionRef.current = 1;
  };

  const currentExample = transformationExamples[currentExampleIndex % transformationExamples.length];

  const addToCart = () => {
    const pricePerImage = 0.15, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: 'Newborn Retouching', qty: 1, price: pricePerImage,
      retouching: 'Newborn Retouching', order_name: 'Newborn Retouching',
      order_images: imageCount, order_details: currentExample.description, addons: [], total };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch { document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/'; }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />

          {/* Orbit SVG rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation: 'nbCW 8s linear infinite', transformOrigin: '820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation: 'nbCCW 12s linear infinite', transformOrigin: '820px 340px' }}/>
          </svg>

          {/* Floating stars — newborn-specific decorations */}
          <FloatingStar style={{ right: '5%', top: '6%' }}   size={28} />
          <FloatingStar style={{ right: '12%', top: '52%' }} size={18} />
          <FloatingStar style={{ right: '3%', top: '74%' }}  size={14} />
          <FloatingStar style={{ left: '42%', top: '9%' }}   size={12} />
          <FloatingStar style={{ left: '8%', bottom: '30%' }} size={10} />

          {/* Red sphere */}
          <motion.div animate={{ y: [-13, 13, -13] }} transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', right: '7%', top: '18%', width: 36, height: 36, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow: '0 8px 24px rgba(232,53,42,0.28)' }} />

          {/* Glass spheres */}
          <motion.div animate={{ y: [-11, 11, -11] }} transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '5%', top: '46%', width: 60, height: 60, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow: '0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border: '1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut', delay: 0.7 }}
            style={{ position: 'absolute', left: '12%', bottom: '28%', width: 28, height: 28, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 3px 12px rgba(15,23,42,0.07)', border: '1px solid rgba(208,218,234,0.35)' }} />

          {/* Dot accents */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>

        <style>{`
          @keyframes nbCW  { to { stroke-dashoffset: -1800; } }
          @keyframes nbCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              {/* Heading */}
              <div>
                <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
                  Newborn <span className="text-[#E8352A]">Baby</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug mt-2"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  Angel-Soft Retouching
                </motion.p>
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Preserve every tiny detail of your newborn's first days. Our ultra-gentle retouching
                enhances natural beauty while keeping that precious, authentic newborn feel.
              </motion.p>


              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.64, duration:0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">
              Get Start For Free
                </Link>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior:'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all">
                  View Examples
                </button>
              </motion.div>

            </motion.div>

            {/* ── RIGHT: Slider + angel badge + milestone strip + feature badges ── */}
            <motion.div className="flex flex-col gap-3 relative"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Angel Glow badge */}
              <NewbornBadge />

              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio: '4/3' }}
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentExample.afterImage})` }} />
                {/* BEFORE clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentExample.beforeImage})`,
                      width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
                </div>

                {/* Divider + handle */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A]/75 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm">Before</span>
                <span className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">After</span>

                {/* Milestone month strip overlay */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="absolute bottom-4 left-4 right-4 z-10 bg-white/92 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between gap-1">
                  {['Day 1', '1 mo', '3 mo', '6 mo', '1 yr'].map((m, i) => (
                    <motion.button key={m}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 1.4 + i * 0.08 }}
                      onClick={() => changeExample(i < transformationExamples.length ? i : 0)}
                      className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold transition-all ${
                        i === currentExampleIndex % transformationExamples.length
                          ? 'bg-[#E8352A] text-white'
                          : 'bg-[#F5F5F5] text-[#888] hover:bg-[#FFE5E2] hover:text-[#E8352A]'}`}>
                      {m}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Feature badges */}
              <motion.div className="grid grid-cols-4 gap-2"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                {[
                  { icon: <Heart className="w-4 h-4" />,    label: 'Gentle',     sub: 'Touch' },
                  { icon: <Star className="w-4 h-4" />,     label: 'Angel',      sub: 'Glow' },
                  { icon: <Wand2 className="w-4 h-4" />,    label: 'Natural',    sub: 'Skin' },
                  { icon: <Sparkles className="w-4 h-4" />, label: 'Dreamy',     sub: 'Effects' },
                ].map((b, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#F0F0F0] shadow-sm px-2.5 py-2.5 flex items-center gap-2">
                    <div className="text-[#E8352A] flex-shrink-0">{b.icon}</div>
                    <div>
                      <p className="text-[9px] font-bold text-[#1A1A1A] leading-tight">{b.label}</p>
                      <p className="text-[9px] text-[#999] leading-tight">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Dot nav */}
              <div className="flex items-center justify-center gap-2">
                {transformationExamples.map((_, i) => (
                  <button key={i} onClick={() => changeExample(i)}
                    className={`rounded-full transition-all ${
                      i === currentExampleIndex % transformationExamples.length
                        ? 'w-5 h-2.5 bg-[#E8352A]'
                        : 'w-2.5 h-2.5 bg-[#CCC] hover:bg-[#E8352A]/60'}`} />
                ))}
              </div>
            </motion.div>
          </div>

       
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Angel Difference</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real newborn photos before and after our gentle, ultra-soft retouching.
            </p>
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentExample.afterImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentExample.beforeImage})`,
                      width: gallerySliderRef.current ? `${gallerySliderRef.current.offsetWidth}px` : '100%' }} />
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Original</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Retouched</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => changeExample(currentExampleIndex - 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeExample(currentExampleIndex + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Newborn Retouching</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Ultra-gentle retouching that preserves your baby's precious, authentic beauty.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.15 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Ultra-Soft Skin Smoothing','Natural Baby Glow','Background Clean-Up',
                  'Gentle Color Grading','Blemish & Redness Removal','24-Hour Delivery'].map(feat => (
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

      {/* ══════════════════════════════════  SERVICES  ══════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Newborn</span> Services
            </h2>
            <p className="text-xl text-gray-600">Gentle, precious retouching for every baby milestone.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
