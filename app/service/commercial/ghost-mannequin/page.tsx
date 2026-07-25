// app/ghost-mannequin/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera, EyeOff, Layers, Scissors,
  ArrowRight, Shield, CheckCircle,
  Wand2,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export default function GhostMannequinPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);

  const transformationExamples = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop',
      description: 'Remove mannequin to create floating garment effect for e-commerce.'
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop',
      description: 'Create professional floating dress effect with ghost mannequin technique.'
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
      afterImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=85&auto=format&fit=crop',
      description: 'Create perfect floating shirt images for online catalogs.'
    },
  ];

  const services = [
    { title: 'Clothing & Tops', description: 'Ghost effect for T-shirts, blouses, and all tops.', icon: <Camera className="w-6 h-6" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Dresses & Skirts', description: 'Seamless mannequin removal for dresses and formal wear.', icon: <Scissors className="w-6 h-6" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Outerwear', description: 'Professional ghost technique for jackets, coats, and suits.', icon: <Layers className="w-6 h-6" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Full Catalog', description: 'Batch ghost mannequin processing for your entire product line.', icon: <Wand2 className="w-6 h-6" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  /* ── Auto-animate slider ── */
  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 0.7;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0) { sliderDirectionRef.current = 1; return 0; }
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
  };

  const currentExample = transformationExamples[currentExampleIndex % transformationExamples.length];

  const addToCart = () => {
    const pricePerImage = 0.18, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Ghost Mannequin', qty: 1, price: pricePerImage,
      retouching: 'Ghost Mannequin', order_name: 'Ghost Mannequin',
      order_images: imageCount, order_details: currentExample.description, addons: [], total
    };
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

      {/* ══════════════════════════════════════  HERO  ══════════════════════════════════════ */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">

        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <filter id="ghost-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#ghost-noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.16, 0.26, 0.16] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-20 -right-32 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ghost-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#ghost-grid)"/>
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10" />
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08" />
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation: 'gmCW 8s linear infinite', transformOrigin: '820px 340px' }} />
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation: 'gmCCW 12s linear infinite', transformOrigin: '820px 340px' }} />
          </svg>
          <motion.div animate={{ y: [-13, 13, -13] }} transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute', right: '6%', top: '7%', width: 52, height: 52, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow: '0 10px 30px rgba(232,53,42,0.32)'
            }} />
          <motion.div animate={{ y: [9, -9, 9] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.8 }}
            style={{
              position: 'absolute', right: '8%', top: '50%', width: 24, height: 24, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow: '0 5px 16px rgba(232,53,42,0.26)'
            }} />
          <motion.div animate={{ y: [-11, 11, -11] }} transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: '5%', top: '46%', width: 60, height: 60, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow: '0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border: '1px solid rgba(208,218,234,0.40)'
            }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut', delay: 0.7 }}
            style={{
              position: 'absolute', left: '12%', bottom: '28%', width: 28, height: 28, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 3px 12px rgba(15,23,42,0.07)', border: '1px solid rgba(208,218,234,0.35)'
            }} />
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>
        <style>{`
          @keyframes gmCW  { to { stroke-dashoffset: -1800; } }
          @keyframes gmCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>

              {/* Heading */}
              <div className="mb-6">
                <motion.h1 className="font-extrabold leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
                  {['Ghost', 'Mannequin', 'Editing'].map((word, i) => <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`}
                    initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>)}
                </motion.h1>
              </div>

              <motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Make your mannequin disappear. Our ghost mannequin service creates a clean,
                hollow 3D shape effect that shows off garments professionally for e-commerce.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-4 pt-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.64, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)]">
                  Get Started Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">
                  View Examples
                </button>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Slider + ghost badge + process strip + feature badges ── */}
            <motion.div className="relative flex flex-col lg:h-screen"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Animated ghost removal badge — hidden on smallest screens to avoid clip */}
              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative mx-4 mt-4 min-h-[340px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER — base */}
                <div className="absolute inset-0 bg-cover bg-center bg-white"
                  style={{ backgroundImage: `url(${currentExample.afterImage})` }} />
                {/* BEFORE — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentExample.beforeImage})`
                    }} />
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
                <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/75 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm">With Mannequin</span>
                <span className="absolute top-3 right-3 z-10 bg-[#E8352A] text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg">Ghost Effect</span>

                {/* Process steps overlay */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/85 to-transparent px-6 py-5">
                  <div className="flex items-center justify-between gap-2">
                  {[
                    { step: '1', label: 'Detect' },
                    { step: '2', label: 'Remove' },
                    { step: '3', label: 'Fill' },
                    { step: '4', label: 'Polish' },
                  ].map((s, i) => (
                    <React.Fragment key={s.step}>
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: 1.4 + i * 0.12 }}
                          className="flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-white/70">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8352A]">
                          <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                          <span className="text-[9px] font-semibold">{s.label}</span>
                      </motion.div>
                        {i < 3 && <div className="h-px w-5 flex-shrink-0 bg-white/20" />}
                    </React.Fragment>
                  ))}
                    </div>
                </motion.div>
              </div>

                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <EyeOff className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">Invisible Mannequin Edit</span>
                </motion.div>

              {/* Feature badges — 2-col on mobile, 4-col on sm+ */}
              <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                {[
                  { icon: <EyeOff className="w-4 h-4" />, label: 'Invisible', sub: 'Mannequin' },
                  { icon: <Layers className="w-4 h-4" />, label: '3D Hollow', sub: 'Effect' },
                  { icon: <Scissors className="w-4 h-4" />, label: 'Neck Joint', sub: 'Merge' },
                  { icon: <Shield className="w-4 h-4" />, label: 'Clean', sub: 'Background' },
                ].map((b, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2.5 flex items-center gap-2 backdrop-blur-sm">
                    <div className="text-[#E8352A] flex-shrink-0">{b.icon}</div>
                    <div>
                      <p className="text-[9px] sm:text-[10px] font-bold text-white leading-tight">{b.label}</p>
                      <p className="text-[9px] sm:text-[10px] text-white/45 leading-tight">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Dot nav */}
              <div className="flex items-center justify-center gap-2">
                {transformationExamples.map((_, i) => (
                  <button key={i} onClick={() => changeExample(i)}
                    className={`rounded-full transition-all ${i === currentExampleIndex % transformationExamples.length
                        ? 'w-5 h-2.5 bg-[#E8352A]'
                      : 'w-2.5 h-2.5 bg-white/25 hover:bg-[#E8352A]/60'}`} />
                ))}
              </div>
            </motion.div>
          </div>
      </section>

      {/* ══════════════════════════════════════  GALLERY  ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Ghost Effect</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real garment photos before and after the invisible mannequin technique.
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
                <div className="absolute inset-0 bg-cover bg-center bg-white"
                  style={{ backgroundImage: `url(${currentExample.afterImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentExample.beforeImage})` }} />
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">With Mannequin</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Ghost Effect</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Ghost Mannequin</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional invisible mannequin effect for all garment types.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.18 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Mannequin & Hanger Removal', 'Neck & Sleeve Joint Fix', '3D Hollow Body Shape',
                  'White / Custom Background', 'Color & Tone Correction', '24-Hour Delivery'].map(feat => (
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

      {/* ══════════════════════════════════════  SERVICES  ══════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Ghost</span> Services
            </h2>
            <p className="text-xl text-gray-600">Invisible mannequin for every garment type.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: service.bg, color: service.color }}>
               <span className="w-10 h-10 flex items-center justify-center">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                {(() => {
                  const slug = slugify(service.title);
                  return (
                    <>
                      <button type="button" onClick={() => setOpenServiceSlug(prev => prev === slug ? null : slug)} aria-expanded={openServiceSlug === slug} className="text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: service.color }}>
                        Learn more <ArrowRight className="w-3.5 h-3.5 text-current" />
                      </button>
                      {openServiceSlug === slug && (
                        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-800 shadow-sm">
                          <p className="mb-3">{service.description} Samples, turnaround, and bulk pricing info.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/commercial/ghost-mannequin/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
