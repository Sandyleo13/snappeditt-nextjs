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
    { title: 'Exterior Enhancement', description: 'Professional enhancement of building exteriors with lighting and detail optimisation.',    icon: <Building className="w-6 h-6" /> },
    { title: 'Interior Retouch',     description: 'Interior space enhancement with lighting balance and perspective correction.',             icon: <Home     className="w-6 h-6" /> },
    { title: 'Perspective Fix',      description: 'Architectural perspective and lens distortion correction to perfect geometry.',           icon: <Grid     className="w-6 h-6" /> },
    { title: 'Sky Replacement',      description: 'Intelligent sky replacement with architectural context awareness.',                       icon: <Wind     className="w-6 h-6" /> },
    { title: 'Lighting Control',     description: 'Control and enhance natural and artificial lighting for optimal presentation.',           icon: <Sun      className="w-6 h-6" /> },
    { title: 'Object Removal',       description: 'Remove distracting elements while preserving architectural context.',                    icon: <Eye      className="w-6 h-6" /> },
    { title: 'Material Enhancement', description: 'Enhance textures, materials, and surface details for premium quality outputs.',          icon: <Layers   className="w-6 h-6" /> },
    { title: 'Final Delivery',       description: 'Export in 4K resolution for presentations, publications, and marketing materials.',      icon: <CheckCircle className="w-6 h-6" /> },
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
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* Soft radial blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.10) 0%, transparent 70%)' }} />
          <div className="absolute -right-20 -top-20 w-[380px] h-[380px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.08) 0%, transparent 70%)' }} />
          {/* Floating dots */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[42%] top-[12%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[16%] top-[20%] w-3.5 h-3.5 rounded-full bg-[#E8352A]/40" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[26%] w-2 h-2 rounded-full bg-[#E8352A]/35" />
          <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.2 }}
            className="absolute right-[30%] bottom-[18%] w-3 h-3 rounded-full bg-[#E8352A]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 pb-10 lg:pt-24 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 w-full max-w-3xl px-2 sm:px-0"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}>

            

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight">
                <motion.span className="block text-[#1A1A1A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Architecture
                </motion.span>
                <motion.span className="block text-[#E8352A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Retouch
                </motion.span>
              </h1>

              {/* Subheading */}
              <motion.p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#333] leading-snug max-w-2xl"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Professional Building Enhancement
              </motion.p>

              {/* Description */}
              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-xl mx-auto lg:mx-0"
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
                {/* <button onClick={addToCart}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1A1A1A] font-semibold text-sm border border-[#E2E4E8] hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  View Examples
                </button> */}
              </motion.div>

              {/* Feature pills */}
              {/* <motion.div className="flex flex-wrap gap-5 pt-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.80 }}>
                {[
                  { icon: <Grid  className="w-3.5 h-3.5" />, label: 'Perfect Lines',       sub: 'Precision perspective correction' },
                  { icon: <Eye   className="w-3.5 h-3.5" />, label: 'Enhanced Details',    sub: 'Sharp, clear and highly detailed'  },
                  { icon: <Sun   className="w-3.5 h-3.5" />, label: 'True Colors',         sub: 'Accurate colors that pop'          },
                  { icon: <Layers className="w-3.5 h-3.5" />, label: 'Natural Lighting',   sub: 'Realistic light and shadow balance' },
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
            </motion.div>

            {/* ── RIGHT: slider + toolbar + floating tool panel ── */}
            <motion.div className="relative flex flex-col items-center lg:pr-16 w-full max-w-full"
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
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none w-full max-w-full"
                style={{ aspectRatio: '4/3', border: '2px solid rgba(255,255,255,0.9)' }}
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
              <div className="w-full bg-white rounded-b-2xl border border-t-0 border-[#EBEBEB] shadow-lg px-3 py-3 flex flex-wrap items-center justify-center gap-2">
                {editorTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center gap-1 flex-1 min-w-[96px] py-1.5 rounded-lg transition-all ${
                      activeTab === tab ? 'bg-[#E8352A]/10 text-[#E8352A]' : 'text-[#888] hover:text-[#555]'
                    }`}>
                    {tab === 'Perspective' && <Grid    className="w-4 h-4" />}
                    {tab === 'Lighting'    && <Sun     className="w-4 h-4" />}
                    {tab === 'Details'     && <Eye     className="w-4 h-4" />}
                    {tab === 'Color'       && <Layers  className="w-4 h-4" />}
                    <span className={`text-[10px] font-semibold ${activeTab === tab ? 'text-[#E8352A]' : ''}`}>{tab}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto px-2 sm:px-0"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm px-5 py-4 flex items-start gap-3 group hover:border-[#E8352A]/30 hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0EE] flex items-center justify-center flex-shrink-0 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors mt-0.5">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl font-bold text-[#E8352A]">{s.value}</p>
                  <p className="text-xs font-semibold text-[#1A1A1A] leading-tight">{s.label}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{s.sub}</p>
                  <svg viewBox="0 0 60 14" className="w-14 mt-1.5 opacity-50" fill="none">
                    <polyline points="0,11 10,7 22,9 34,3 44,6 60,2"
                      stroke="#E8352A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
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
