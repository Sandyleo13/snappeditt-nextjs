'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layers, Target, Cpu, Box,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Wand2, Image as ImageIcon, Camera,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Animated layer-peel badge ── */
function ExtractionBadge() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setOffset(o => (o >= 8 ? 0 : o + 0.08));
    }, 20);
    return () => clearInterval(id);
  }, []);
  const layers = [
    { bg: 'rgba(232,53,42,0.18)', y: offset * 2 },
    { bg: 'rgba(232,53,42,0.12)', y: offset },
    { bg: 'rgba(232,53,42,0.06)', y: 0 },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className="absolute top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2">
      {/* Animated layered squares */}
      <div className="relative w-9 h-9 flex-shrink-0">
        {layers.map((l, i) => (
          <div key={i} className="absolute inset-0 rounded-lg transition-none"
            style={{ background: l.bg, transform: `translateY(-${l.y}px) scale(${1 - i * 0.06})`,
              zIndex: 3 - i, border: '1px solid rgba(232,53,42,0.20)' }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Layers className="w-4 h-4 text-[#E8352A]" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">AI Extraction Active</p>
        <p className="text-[9px] text-[#999] mt-0.5">Layers · Masks · Alpha</p>
      </div>
    </motion.div>
  );
}

/* ── Extraction category tabs ── */
const extractionCategories = [
  { id: 'product',  label: 'Product',  img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop',
    desc: 'Fast, precise product background removal for e-commerce at scale.' },
  { id: 'person',   label: 'Person',   img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop',
    desc: 'Portrait and people extraction with natural hair and edge detail.' },
  { id: 'vehicle',  label: 'Vehicle',  img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop',
    desc: 'Vehicle extraction for automotive marketplaces and dealer catalogues.' },
  { id: 'animal',   label: 'Animal',   img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=85&auto=format&fit=crop',
    desc: 'Fur and hair masking for pet photography and animal stock images.' },
  { id: 'complex',  label: 'Complex',  img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    after:  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=85&auto=format&fit=crop',
    desc: 'Complex multi-element scenes with transparency and soft edges.' },
];

export default function ExtractionPage() {
  const [activeCategory, setActiveCategory]     = useState('product');
  const [sliderPosition, setSliderPosition]     = useState(50);
  const [isDragging, setIsDragging]             = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentCat = extractionCategories.find(c => c.id === activeCategory) ?? extractionCategories[0];

  const stats = [
    { value: '5M+',  label: 'Images Extracted',  sub: 'Powered by AI + human QC',      icon: <ImageIcon className="w-5 h-5" /> },
    { value: '3s',   label: 'Avg Processing',     sub: 'AI-fast, human-precise',         icon: <Zap className="w-5 h-5" /> },
    { value: '100%', label: 'Alpha Ready',         sub: 'PNG transparent output',         icon: <Layers className="w-5 h-5" /> },
    { value: '4.9★', label: 'Client Rating',       sub: 'Trusted by 2,000+ brands',       icon: <Shield className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Background Removal',    description: 'AI-powered instant background removal for any subject type.',          icon: <Layers className="w-6 h-6" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Alpha Masking',         description: 'Transparent PNG output with natural hair and soft-edge masking.',      icon: <Target className="w-6 h-6" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'AI Bulk Extraction',    description: 'Process thousands of images overnight with consistent AI quality.',    icon: <Cpu className="w-6 h-6" />, color: '#0EA5E9', bg: '#EFF9FF' },
    { title: 'Smart Compositing',     description: 'Extract and place subjects onto any new background seamlessly.',       icon: <Box className="w-6 h-6" />, color: '#10B981', bg: '#ECFDF5' },
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
    const pricePerImage = 0.09, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: 'AI Extraction', qty: 1, price: pricePerImage,
      retouching: 'AI Extraction', order_name: 'AI Extraction',
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
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.3, 0.18] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-32 top-20 w-[620px] h-[620px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-24 w-[520px] h-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.24) 0%, transparent 65%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.4 }}
              className="absolute rounded-full bg-[#E8352A]"
              style={{
                width: [6, 4, 8, 5, 3, 7][i], height: [6, 4, 8, 5, 3, 7][i],
                left: `${[12, 28, 45, 62, 75, 88][i]}%`,
                top: `${[20, 65, 15, 75, 35, 55][i]}%`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen pt-6 lg:pt-8">
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-[10px] font-semibold tracking-[0.25em] uppercase">AI Extraction</span>
            </motion.div>

            <motion.h1
              className="font-extrabold tracking-tight text-white text-5xl md:text-6xl lg:text-7xl leading-[0.94]"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
              Extraction that keeps every subject, edge and shadow intact.
            </motion.h1>

            <motion.p
              className="text-[#A8A8B8] text-base md:text-lg leading-relaxed max-w-xl mt-6"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Intelligent background removal for products, people, vehicles and complex scenes.
              Get transparent PNGs with precise hair, fur, glass and multi-element masking at scale.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.35)] hover:shadow-[0_0_60px_rgba(232,53,42,0.45)] hover:scale-105">
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:border-[#E8352A]/50 hover:text-white hover:bg-white/5 transition-all">
                View Examples
              </button>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              {stats.map((stat, index) => (
                <div key={index} className="rounded-3xl bg-white/5 border border-white/10 p-5">
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B8B8C8] mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative flex flex-col px-8 sm:px-12 lg:px-6 xl:px-8 pb-16 lg:pb-0"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}>

            <ExtractionBadge />

            <div ref={heroSliderRef}
              className="relative flex-1 rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.35)] cursor-col-resize select-none"
              style={{ minHeight: 420 }}
              onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <div className="absolute inset-0 bg-[#0B0B0F]" />
              <div className="absolute inset-0"
                style={{ backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.02) 0% 25%, rgba(255,255,255,0.05) 0% 50%)', backgroundSize: '18px 18px' }} />

              <motion.div key={`after-${activeCategory}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentCat.after})`, filter: 'brightness(0.95)' }} />

              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <motion.div key={`before-${activeCategory}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentCat.before})`, width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
              </div>

              <div className="absolute top-0 bottom-0 w-[1px] bg-white/40 z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              <span className="absolute top-5 left-5 z-10 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">Original</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">Extracted</span>
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-[2rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B8B8C8]">Use case</p>
                  <p className="text-lg font-semibold text-white">Switch between extraction styles</p>
                </div>
                <div className="text-[#E8352A] text-sm font-semibold">{currentCat.label}</div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => { const i = extractionCategories.findIndex(c => c.id === activeCategory); selectCategory(extractionCategories[(i - 1 + extractionCategories.length) % extractionCategories.length].id); }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:border-[#E8352A]/60 hover:text-white transition">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {extractionCategories.map(cat => (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)}
                    className={`flex flex-col items-center gap-2 px-3 py-2 rounded-3xl transition-all ${
                      activeCategory === cat.id ? 'bg-[#E8352A] text-white shadow-lg' : 'bg-white/10 text-[#D1D5DB] hover:bg-white/15'
                    }`}>
                    <div className="w-12 h-10 rounded-xl overflow-hidden border border-white/10 bg-cover bg-center"
                      style={{ backgroundImage: `url(${cat.img})` }} />
                    <span className="text-[11px] font-semibold">{cat.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => { const i = extractionCategories.findIndex(c => c.id === activeCategory); selectCategory(extractionCategories[(i + 1) % extractionCategories.length].id); }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/80 hover:border-[#E8352A]/60 hover:text-white transition">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <motion.p key={activeCategory}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-sm text-[#C7CAD1] leading-relaxed mt-2">
                {currentCat.desc}
              </motion.p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See <span className="text-[#E8352A]">Extraction</span> Results
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real before/after extraction — original background vs clean transparent output.
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
                <div className="absolute inset-0"
                  style={{ backgroundImage: 'repeating-conic-gradient(#E0E0E0 0% 25%, #F8F8F8 0% 50%)', backgroundSize: '20px 20px' }} />
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentCat.after})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCat.before})`,
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
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Extracted</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {extractionCategories.map(cat => (
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">AI Extraction</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                AI-powered background removal for products, people, vehicles and complex objects.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.09 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['AI Background Removal','Transparent PNG Output','Hair & Fur Edge Masking',
                  'Shadow Preservation Option','Bulk API Processing','Same-Day Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">Extraction</span> Services
            </h2>
            <p className="text-xl text-gray-600">AI-powered removal for every subject and scale.</p>
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
                            <Link href={`/service/clipping-path-extraction/extraction/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
