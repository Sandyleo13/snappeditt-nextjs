// app/architecture-retouch/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building, CheckCircle, ArrowRight,
  Sun, Layers, Grid, Wind,
  ChevronLeft, ChevronRight, Home, Crop, Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ArchitectureRetouchPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Perspective');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const imageExamples = [
    {
      id: 1,
      beforeTitle: 'Architectural Photo',
      afterTitle: 'Professional Render',
      beforeImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop&brightness=60&saturation=50&contrast=80',
      afterImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop',
      description: 'Transform raw architectural photos into professional render-like visuals with stunning light.',
    },
    {
      id: 2,
      beforeTitle: 'Flat Exterior',
      afterTitle: 'Vibrant Building',
      beforeImage: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80&auto=format&fit=crop&brightness=58&saturation=40',
      afterImage: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80&auto=format&fit=crop',
      description: 'Enhance building exteriors with balanced lighting, colour grading and sharp detail.',
    },
    {
      id: 3,
      beforeTitle: 'Overcast Sky',
      afterTitle: 'Dramatic Sunset',
      beforeImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80&auto=format&fit=crop&brightness=55&saturation=35',
      afterImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80&auto=format&fit=crop',
      description: 'Replace dull skies with dramatic backdrops that complement the architecture.',
    },
    {
      id: 4,
      beforeTitle: 'Mixed Lighting',
      afterTitle: 'Balanced Lighting',
      beforeImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&auto=format&fit=crop&brightness=130',
      afterImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80&auto=format&fit=crop',
      description: 'Balance mixed interior/exterior lighting for harmonious architectural presentations.',
    },
    {
      id: 5,
      beforeTitle: 'Distorted Lines',
      afterTitle: 'Corrected Geometry',
      beforeImage: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&q=80&auto=format&fit=crop&brightness=62&saturation=45',
      afterImage: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=800&q=80&auto=format&fit=crop',
      description: 'Correct lens distortion and perspective issues for perfect geometric accuracy.',
    },
  ];

  const stats = [
    { value: '99%',   label: 'Geometric Accuracy', sub: 'Precision perspective correction', icon: <Grid    className="w-5 h-5" /> },
    { value: '4K',    label: 'Maximum Output',      sub: 'Ultra-high resolution delivery',  icon: <Eye     className="w-5 h-5" /> },
    { value: '50+',   label: 'Arch. Presets',       sub: 'Ready-made style guides',         icon: <Layers  className="w-5 h-5" /> },
    { value: '0.01°', label: 'Angle Precision',     sub: 'True vertical correction',        icon: <Crop    className="w-5 h-5" /> },
  ];

  const editorTabs = ['Perspective', 'Lighting', 'Details', 'Color'];

  const services = [
    { title: 'Exterior Enhancement', description: 'Professional enhancement of building exteriors with lighting and detail optimisation.',    icon: <Building className="w-6 h-6" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Interior Retouch',     description: 'Interior space enhancement with lighting balance and perspective correction.',             icon: <Home     className="w-6 h-6" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Perspective Fix',      description: 'Architectural perspective and lens distortion correction to perfect geometry.',           icon: <Grid     className="w-6 h-6" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Sky Replacement',      description: 'Intelligent sky replacement with architectural context awareness.',                       icon: <Wind     className="w-6 h-6" />, color: '#10B981', bg: '#ECFDF5' },
    { title: 'Lighting Control',     description: 'Control and enhance natural and artificial lighting for optimal presentation.',           icon: <Sun      className="w-6 h-6" />, color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Object Removal',       description: 'Remove distracting elements while preserving architectural context.',                    icon: <Eye      className="w-6 h-6" />, color: '#EC4899', bg: '#FDF2F8' },
    { title: 'Material Enhancement', description: 'Enhance textures, materials, and surface details for premium quality outputs.',          icon: <Layers   className="w-6 h-6" />, color: '#6366F1', bg: '#EEF2FF' },
    { title: 'Final Delivery',       description: 'Export in 4K resolution for presentations, publications, and marketing materials.',      icon: <CheckCircle className="w-6 h-6" />, color: '#D71920', bg: '#FFF0EE' },
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

  const changeImage = (index: number) => { setCurrentImageIndex(index); setSliderPosition(50); };
  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.20;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Architecture Retouching', qty: 1, price: pricePerImage,
      retouching: 'Architecture Retouching', order_name: currentImage.afterTitle,
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
            <filter id="architecture-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#architecture-noise)" />
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="architecture-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#architecture-grid)" /></svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: size, height: size, left: `${[12, 28, 45, 62, 75, 88][i]}%`, top: `${[20, 65, 15, 75, 35, 55][i]}%`, filter: 'blur(1px)' }} />)}
        </div>

        <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col px-8 pb-12 pt-24 sm:px-12 lg:grid lg:grid-cols-2 lg:px-16 lg:py-0 xl:px-24">
          <div className="grid min-h-screen grid-cols-1 items-stretch lg:contents">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col justify-center gap-6 px-2 text-center lg:items-start lg:px-0 lg:text-left"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}>

            

              <motion.div className="inline-flex items-center gap-2 self-center rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm lg:self-start"
                initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">Real Estate Editing</span>
              </motion.div>

              {/* Heading */}
              <h1 className="font-extrabold leading-[0.95] tracking-tight">
                <motion.span className="block text-white text-[clamp(3rem,8vw,7rem)]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Architecture
                </motion.span>
                <motion.span className="block text-[#E8352A] text-[clamp(3rem,8vw,7rem)]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Retouch
                </motion.span>
              </h1>

              {/* Subheading */}
              <motion.p className="max-w-2xl text-xl font-semibold leading-snug text-white/90 sm:text-2xl md:text-3xl"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Professional Building Enhancement
              </motion.p>

              {/* Description */}
              <motion.p className="mx-auto max-w-xl text-base leading-relaxed text-[#A0A0B0] md:text-lg lg:mx-0"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
                Transform architectural photography into stunning visual presentations. Enhance building
                aesthetics, correct perspectives, and create professional architectural visuals.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1 justify-center lg:justify-start w-full"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105 w-full sm:w-auto">
           
                Get Start For Free
              
                </Link>
             
              </motion.div>
            </motion.div>

            {/* ── RIGHT: slider + toolbar + floating tool panel ── */}
            <motion.div className="relative flex w-full max-w-full flex-col lg:h-screen"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Vertical floating tool panel */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-2 bg-white rounded-2xl shadow-xl border border-[#F0F0F0] p-2">
                {[
                  { icon: <Grid    className="w-4 h-4" />, active: false },
                  { icon: <Sun     className="w-4 h-4" />, active: true  },
                  { icon: <Layers  className="w-4 h-4" />, active: false },
                  { icon: <Crop    className="w-4 h-4" />, active: false },
                ].map((item, i) => (
                  <div key={i} className={`w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all ${
                    item.active
                      ? 'bg-[#E8352A] text-white shadow-md shadow-[#E8352A]/30'
                      : 'text-[#888] hover:text-[#E8352A] hover:bg-red-50'
                  }`}>
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* Before/After card */}
              <div ref={sliderRef}
                className="relative mt-4 min-h-[340px] w-full flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-2xl lg:mt-0 lg:rounded-none"
                style={{ border: '2px solid rgba(255,255,255,0.9)' }}
                onMouseMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchMove={handleSliderMove}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}>

                {/* Before */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                {/* After */}
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
                <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/75 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-3 right-3 z-10 bg-[#E8352A] text-white text-[11px] font-semibold px-3 py-1 rounded-full">After</span>
              </div>

              {/* Editor toolbar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 rounded-none border-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${
                        activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'
                      }`}>
                      {tab === 'Perspective' && <Grid className="h-4 w-4" />}
                      {tab === 'Lighting' && <Sun className="h-4 w-4" />}
                      {tab === 'Details' && <Eye className="h-4 w-4" />}
                      {tab === 'Color' && <Layers className="h-4 w-4" />}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {imageExamples.map((_, i) => (
                <button key={i} aria-label={`Show example ${i + 1}`} onClick={() => changeImage(i)}
                  className={`rounded-full transition-all duration-300 ${currentImageIndex === i ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* Stats bar */}
            <motion.div className="grid grid-cols-2 gap-4 border-t border-white/10 px-8 pb-8 pt-14 sm:px-12 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-[calc(50%-4rem)] lg:grid-cols-4 lg:px-0 lg:pb-0 lg:pt-0 xl:left-24 xl:w-[calc(50%-8rem)]"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold text-white lg:text-3xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">{s.label}</p>
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
              See the <span className="text-[#E8352A]">Transformation</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Explore before and after comparisons from our architectural retouching studio.
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Original</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Enhanced</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full">
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
            <div className="w-full lg:w-80 xl:w-96 max-w-xl bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Architecture Retouching</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional enhancement of architectural photography for stunning visual presentations.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.20 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-3 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Perspective Correction','Sky Replacement','Lighting Optimisation','Material Enhancement','Object Removal','4K Export Ready'].map(feat => (
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
              <span className="text-[#E8352A]">Architecture</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive retouching tools for architectural photographers and studios.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />

                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: service.bg, color: service.color }}>
             <span className="w-10 h-10 flex items-center justify-center">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                <button className="text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: service.color }}>
                  Learn more <ArrowRight className="w-3.5 h-3.5 text-current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
