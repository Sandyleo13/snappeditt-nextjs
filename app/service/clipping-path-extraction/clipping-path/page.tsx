// app/clipping-path/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors, Crop, Layers, Target,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Camera, Image as ImageIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Animated path-tracing badge ── */
function ClippingBadge() {
  const [pathPct, setPathPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPathPct(p => (p >= 100 ? 0 : p + 1)), 35);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2 min-w-[185px]">
      <div className="w-8 h-8 rounded-lg bg-[#FFF0EE] flex items-center justify-center flex-shrink-0">
        <Scissors className="w-4 h-4 text-[#E8352A]" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <p className="text-[9px] font-bold text-[#1A1A1A] leading-none">Path Tracing</p>
          <span className="text-[9px] font-bold text-[#E8352A]">{Math.round(pathPct)}%</span>
        </div>
        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#E8352A] rounded-full"
            animate={{ width: `${pathPct}%` }} transition={{ duration: 0.035 }} />
        </div>
        <p className="text-[8px] text-[#999] mt-0.5">Pixel-perfect isolation</p>
      </div>
    </motion.div>
  );
}

/* ── Clipping path category tabs ── */
const clippingCategories = [
  { id: 'product',   label: 'Product',   img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&auto=format&fit=crop',
    desc: 'Precise product isolation for e-commerce, catalogs and marketing assets.' },
  { id: 'apparel',   label: 'Apparel',   img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=85&auto=format&fit=crop',
    desc: 'Clean garment cut-outs for fashion brands and online clothing stores.' },
  { id: 'jewelry',   label: 'Jewelry',   img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
    desc: 'Fine jewelry and accessories isolated with hair-thin precision.' },
  { id: 'furniture', label: 'Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop',
    desc: 'Furniture and home goods isolated for lifestyle composite scenes.' },
  { id: 'complex',   label: 'Complex',   img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop',
    desc: 'Complex multi-component objects with hair, fur, and fine edges.' },
];

export default function ClippingPathPage() {
  const [activeCategory, setActiveCategory]     = useState('product');
  const [sliderPosition, setSliderPosition]     = useState(50);
  const [isDragging, setIsDragging]             = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentCat = clippingCategories.find(c => c.id === activeCategory) ?? clippingCategories[0];

  const stats = [
    { value: '2M+',  label: 'Objects Clipped',  sub: 'For global e-commerce brands',   icon: <Scissors className="w-5 h-5" /> },
    { value: '24h',  label: 'Batch Delivery',    sub: 'Any volume, same-day',           icon: <Zap className="w-5 h-5" /> },
    { value: '100%', label: 'Pixel Perfect',     sub: 'No jagged edges, ever',          icon: <Target className="w-5 h-5" /> },
    { value: '4.9★', label: 'Client Rating',     sub: 'Trusted by 1,000+ brands',       icon: <Shield className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Basic Clipping Path',    description: 'Simple product and object isolation for e-commerce backgrounds.',    icon: <Scissors className="w-6 h-6" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Complex Path',           description: 'Multi-layer paths for complex products with holes and fine edges.',  icon: <Layers className="w-6 h-6" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Background Removal',     description: 'Clean background removal ready for white, custom or transparent.',  icon: <Crop className="w-6 h-6" />, color: '#0EA5E9', bg: '#EFF9FF' },
    { title: 'Alpha Masking',          description: 'Hair, fur and soft-edge masking for photos needing natural cut-outs.',icon: <ImageIcon className="w-6 h-6" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);


  useEffect(() => { sliderDirectionRef.current = 1; setSliderPosition(50); }, [activeCategory]);

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
  }, [isDragging, isHoveringSlider, activeCategory]);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const activeRef = heroSliderRef.current?.contains(e.target as Node) ? heroSliderRef : gallerySliderRef;
    if (!activeRef.current) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const selectCategory = (id: string) => { setActiveCategory(id); setSliderPosition(50); };

  const addToCart = () => {
    const pricePerImage = 0.12, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: 'Clipping Path', qty: 1, price: pricePerImage,
      retouching: 'Clipping Path', order_name: 'Clipping Path',
      order_images: imageCount, order_details: currentCat.desc, addons: [], total };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch { document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/'; }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
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
        <style>{`
          @keyframes cpCW  { to { stroke-dashoffset: -1800; } }
          @keyframes cpCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm text-sm text-[#E8352A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              Clipping Path
            </motion.div>

            <h1 className="font-extrabold leading-[0.95] tracking-tight text-white text-[clamp(3rem,8vw,7rem)]">
              <motion.span className="block"
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                Clipping
              </motion.span>
              <motion.span className="block text-[#E8352A]"
                initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                Path
              </motion.span>
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-xl mt-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
              Precise clipping paths and background removal for products, apparel, jewelry and complex
              objects — delivered clean, sharp, and ready for any background or platform.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.35)] hover:shadow-[0_0_60px_rgba(232,53,42,0.55)] hover:scale-105">
                Get Start For Free
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 bg-white/5 text-white/80 font-semibold text-sm hover:text-white hover:border-[#E8352A]/50 hover:bg-white/10 transition-all">
                View Examples
              </button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5 }}>
              {stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.06, duration: 0.35 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <ClippingBadge />

            <div ref={heroSliderRef}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.35)] cursor-col-resize select-none w-full"
              style={{ aspectRatio: '4/3' }}
              onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <motion.div key={`after-${activeCategory}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentCat.after})` }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <motion.div key={`before-${activeCategory}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentCat.before})`, width: '100%' }} />
              </div>

              <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                    <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              <span className="absolute top-4 left-4 z-10 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#D2D2E0]">Before</span>
              <span className="absolute top-4 right-4 z-10 rounded-full bg-[#E8352A] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white">Clipped</span>

              <motion.div
                animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                AI-Assisted Manual Edit
              </motion.div>
            </div>

            <motion.div className="bg-[#11131A]/90 rounded-3xl border border-white/10 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.25)] mt-6"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => { const i = clippingCategories.findIndex(c => c.id === activeCategory); selectCategory(clippingCategories[(i - 1 + clippingCategories.length) % clippingCategories.length].id); }}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-[#E8352A] transition-all">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <div className="flex gap-2 overflow-x-auto py-1">
                  {clippingCategories.map(cat => (
                    <button key={cat.id} onClick={() => selectCategory(cat.id)}
                      className="flex flex-col items-center gap-1.5 rounded-3xl px-3 py-2 transition-all text-white/70 hover:text-white">
                      <div className={`w-12 h-10 rounded-xl overflow-hidden border-2 transition-all ${
                        activeCategory === cat.id ? 'border-[#E8352A] shadow-md' : 'border-white/10'}
                      `}>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${cat.img})` }} />
                      </div>
                      <span className={`text-[9px] font-semibold ${activeCategory === cat.id ? 'text-white' : 'text-white/50'}`}>
                        {cat.label}
                      </span>
                      {activeCategory === cat.id && (
                        <motion.div layoutId="cpCatDot" className="w-4 h-0.5 bg-[#E8352A] rounded-full" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { const i = clippingCategories.findIndex(c => c.id === activeCategory); selectCategory(clippingCategories[(i + 1) % clippingCategories.length].id); }}
                  className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center hover:border-[#E8352A] transition-all">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <motion.p key={activeCategory} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-white/70 leading-snug mt-3 px-2">
                {currentCat.desc}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See <span className="text-[#E8352A]">Clipping Path</span> Results
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real products before and after precision clipping path extraction.
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
                  style={{ backgroundImage: `url(${currentCat.after})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCat.before})`, width: '100%' }} />
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
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Clipped</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {clippingCategories.map(cat => (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[#E8352A] text-white shadow'
                        : 'bg-white border border-[#E5E7EB] text-[#555] hover:border-[#E8352A] hover:text-[#E8352A]'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Clipping Path</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Pixel-perfect object isolation for products, apparel, jewelry and complex shapes.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.12 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Hand-Drawn Clipping Paths','Multi-Layer Path Support','White / Transparent Background',
                  'Shadow Preservation Option','Bulk Batch Processing','24-Hour Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">Clipping</span> Services
            </h2>
            <p className="text-xl text-gray-600">Precise extraction for every object type and complexity level.</p>
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
                          <p className="mb-3">{service.description} Typical turnaround, sample edits, and volume pricing details.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/clipping-path-extraction/clipping-path/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
