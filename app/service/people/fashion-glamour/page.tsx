// app/service/people/fashion-glamour/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, ShoppingBag, Camera,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Wand2, Palette, Scissors, Sun, Contrast,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Animated "Editorial Grade" badge with shimmer ── */
function FashionBadge() {
  const [shine, setShine] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShine(s => (s >= 120 ? -20 : s + 1.5)), 30);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(105deg, transparent ${shine - 15}%, rgba(255,255,255,0.55) ${shine}%, transparent ${shine + 15}%)` }} />
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative"
        style={{ background: 'linear-gradient(135deg, #1A1A1A, #444)' }}>
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">Editorial Grade</p>
        <p className="text-[9px] text-[#999] mt-0.5">Luxury · High-End · Publish-Ready</p>
      </div>
    </motion.div>
  );
}

/* ── Fashion category data ── */
const fashionCategories = [
  {
    id: 'editorial', label: 'Editorial',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85&auto=format&fit=crop',
    desc: 'Magazine-worthy editorial retouching for fashion publications and campaigns.',
  },
  {
    id: 'runway', label: 'Runway',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
    desc: 'High-impact runway photography with vibrant colour and motion perfection.',
  },
  {
    id: 'beauty', label: 'Beauty',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85&auto=format&fit=crop',
    desc: 'Flawless beauty retouching — skin, make-up and lighting perfected.',
  },
  {
    id: 'campaign', label: 'Campaign',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=85&auto=format&fit=crop',
    desc: 'Luxury brand campaign imagery that commands attention.',
  },
  {
    id: 'lookbook', label: 'Lookbook',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&auto=format&fit=crop',
    desc: 'Polished lookbook images for fashion brands and e-commerce platforms.',
  },
];

export default function FashionRetouchingPage() {
  const [activeCategory, setActiveCategory]         = useState('editorial');
  const [sliderPosition, setSliderPosition]         = useState(50);
  const [isDragging, setIsDragging]                 = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]     = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentCat = fashionCategories.find(c => c.id === activeCategory) ?? fashionCategories[0];
  const currentCatIndex = fashionCategories.findIndex(c => c.id === activeCategory) ?? 0;
  const [activeTab, setActiveTab] = useState('Exposure');
  const editorTabs = ['Exposure','Contrast','Highlights','Shadows','Color'];

  const stats = [
    { value: '30K+', label: 'Fashion Edits',  sub: 'For leading brands & agencies', icon: <ShoppingBag className="w-5 h-5" /> },
    { value: '24h',  label: 'Turnaround',     sub: 'Even for full campaign sets',   icon: <Zap className="w-5 h-5" /> },
    { value: '5★',   label: 'Brand Rating',   sub: 'Trusted by luxury brands',      icon: <Sparkles className="w-5 h-5" /> },
    { value: '100%', label: 'Publish Ready',  sub: 'Print, digital & social',       icon: <Shield className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Editorial Retouching', description: 'Magazine-grade retouching for editorial and fashion publications.',    icon: <Camera className="w-8 h-8" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Beauty & Skin',        description: 'Flawless complexion, make-up and beauty retouching for close-ups.',   icon: <Wand2 className="w-8 h-8" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Clothing & Garments',  description: 'Wrinkle removal, colour correction and fabric texture enhancement.',  icon: <Scissors className="w-8 h-8" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Campaign & Lookbook',  description: 'Cohesive, on-brand retouching for full campaign and lookbook sets.',  icon: <Palette className="w-8 h-8" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  /* Reset slider direction when category changes */
  useEffect(() => { sliderDirectionRef.current = 1; setSliderPosition(50); }, [activeCategory]);

  /* Auto-animate slider */
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
    const pricePerImage = 0.22, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Fashion Glamour Retouching', qty: 1, price: pricePerImage,
      retouching: 'Fashion Glamour Retouching', order_name: 'Fashion Glamour Retouching',
      order_images: imageCount, order_details: currentCat.desc, addons: [], total,
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

      {/* ══════════════════════════════════════  HERO  (dark animated mesh) ══════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute rounded-full bg-[#E8352A]" style={{ width: [6,4,8,5,3,7][i], height: [6,4,8,5,3,7][i], left: `${[12,28,45,62,75,88][i]}%`, top: `${[20,65,15,75,35,55][i]}%`, filter: 'blur(1px)' }} />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Fashion Glamour</span>
            </motion.div>

            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Fashion','Glamour'].map((word,i) => (
                <motion.span key={word} className={`block ${i===1? 'text-[#E8352A]':'text-white'} text-[clamp(3rem,8vw,5rem)]`} initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 + i*0.12, duration:0.6 }}>{word}</motion.span>
              ))}
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Luxury editorial retouching for runway, beauty and campaign imagery.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:scale-105">Get Started Free <ArrowRight className="w-4 h-4"/></Link>
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm">View Examples</button>
            </motion.div>

            <motion.div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s,i) => (
                <motion.div key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.9 + i*0.08, duration:0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
            <div ref={heroSliderRef} className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0" style={{ minHeight:340 }} onMouseMove={handleSliderMove} onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchMove={handleSliderMove} onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCat.after})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCat.before})`, width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
              </div>

              <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]" style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div className="flex gap-0.5"><ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]"/><ChevronRight className="w-3.5 h-3.5 text-[#E8352A]"/></div>
                </div>
              </div>

              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
                      {tab === 'Exposure'   && <Sun className="w-4 h-4"/>}
                      {tab === 'Contrast'   && <Contrast className="w-4 h-4"/>}
                      {tab === 'Highlights' && <Sun className="w-4 h-4 opacity-70"/>}
                      {tab === 'Shadows'    && <Palette className="w-4 h-4"/>}
                      {tab === 'Color'      && <Wand2 className="w-4 h-4"/>}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div animate={{ y: [-4,4,-4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Retouch</span>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {fashionCategories.map((_, i) => (
                <button key={i} onClick={() => selectCategory(fashionCategories[i].id)} className={`rounded-full transition-all duration-300 ${currentCatIndex === i ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════  STATS BAR  ══════════════════════════════════ */}
      <section className="bg-white border-y border-[#F0F0F0]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i}
              className="flex items-start gap-3 group"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              whileHover={{ y: -3 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#FFF0EE] text-[#E8352A]">
                {s.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-[#E8352A]">{s.value}</p>
                <p className="text-xs font-semibold text-[#1A1A1A] leading-tight">{s.label}</p>
                <p className="text-[10px] text-[#999] mt-0.5">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              See the <span className="text-[#E8352A]">Transformation</span>
            </motion.h2>
            <motion.p className="text-lg sm:text-xl text-[#555]"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              Real fashion photos before and after professional retouching.
            </motion.p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">

            {/* Gallery slider */}
            <motion.div className="flex-1 flex flex-col"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCat.after})` }} />
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
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Retouched</span>
              </div>

              {/* Gallery category pills */}
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {fashionCategories.map(cat => (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[#E8352A] text-white shadow'
                        : 'bg-white border border-[#E5E7EB] text-[#555] hover:border-[#E8352A] hover:text-[#E8352A]'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Service card */}
            <motion.div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col"
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              whileHover={{ y: -4 }}>
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Fashion Glamour</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">{currentCat.desc}</p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.22 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <motion.button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Add to Cart
              </motion.button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Beauty Retouch', 'Skin Smoothing', 'Colour Grading', 'Garment Clean-Up', 'Professional Polish', '24-Hour Delivery'].map((feat, idx) => (
                  <motion.li key={feat} className="flex items-center gap-2 text-sm text-[#333]"
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }} viewport={{ once: true }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0 text-[#E8352A]" />{feat}
                  </motion.li>
                ))}
              </ul>
              <button className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FFF0EE] font-semibold py-2.5 rounded-lg transition-all text-sm">
                View More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════  SERVICES  ══════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <span className="text-[#E8352A]">Fashion</span> Services
            </motion.h2>
            <motion.p className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              Professional retouching for every fashion scenario.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div key={i}
                className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
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
                          <p className="mb-3">{service.description} Examples, turnaround times, and recommended add-ons.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/people/fashion-glamour/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
