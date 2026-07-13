// app/service/people/fashion-glamour/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, ShoppingBag, Camera,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Wand2, Palette, Scissors,
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

  const stats = [
    { value: '30K+', label: 'Fashion Edits',  sub: 'For leading brands & agencies', icon: <ShoppingBag className="w-5 h-5" /> },
    { value: '24h',  label: 'Turnaround',     sub: 'Even for full campaign sets',   icon: <Zap className="w-5 h-5" /> },
    { value: '5★',   label: 'Brand Rating',   sub: 'Trusted by luxury brands',      icon: <Sparkles className="w-5 h-5" /> },
    { value: '100%', label: 'Publish Ready',  sub: 'Print, digital & social',       icon: <Shield className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Editorial Retouching', description: 'Magazine-grade retouching for editorial and fashion publications.',    icon: <Camera className="w-6 h-6" /> },
    { title: 'Beauty & Skin',        description: 'Flawless complexion, make-up and beauty retouching for close-ups.',   icon: <Wand2 className="w-6 h-6" /> },
    { title: 'Clothing & Garments',  description: 'Wrinkle removal, colour correction and fabric texture enhancement.',  icon: <Scissors className="w-6 h-6" /> },
    { title: 'Campaign & Lookbook',  description: 'Cohesive, on-brand retouching for full campaign and lookbook sets.',  icon: <Palette className="w-6 h-6" /> },
  ];

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

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation: 'fgCW 8s linear infinite', transformOrigin: '820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation: 'fgCCW 12s linear infinite', transformOrigin: '820px 340px' }}/>
          </svg>
          <motion.div animate={{ y: [-13, 13, -13] }} transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', right: '6%', top: '7%', width: 52, height: 52, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow: '0 10px 30px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y: [9, -9, 9] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.8 }}
            style={{ position: 'absolute', right: '8%', top: '50%', width: 24, height: 24, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow: '0 5px 16px rgba(232,53,42,0.26)' }} />
          <motion.div animate={{ y: [-11, 11, -11] }} transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '5%', top: '46%', width: 60, height: 60, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow: '0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border: '1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut', delay: 0.7 }}
            style={{ position: 'absolute', left: '12%', bottom: '28%', width: 28, height: 28, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 3px 12px rgba(15,23,42,0.07)', border: '1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/40" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>
        <style>{`
          @keyframes fgCW  { to { stroke-dashoffset: -1800; } }
          @keyframes fgCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>

              {/* Top badge */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-[#E8352A]/10 border border-[#E8352A]/25 rounded-full px-4 py-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-[#E8352A] text-xs font-semibold tracking-wide">High-End Fashion &amp; Glamour Retouching</span>
              </motion.div>

              {/* Heading */}
              <div>
                <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
                  Fashion <span className="text-[#E8352A]">Glamour</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug mt-2"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  Editorial-Grade Retouching
                </motion.p>
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Elevate every frame to luxury editorial standard. From runway and beauty close-ups to full
                campaign sets — polished, publish-ready images that define your brand.
              </motion.p>

              {/* Feature grid 2×2 */}
              <motion.div className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}>
                {[
                  { icon: <Wand2 className="w-4 h-4" />,    label: 'Beauty Retouch',   sub: 'Flawless skin & make-up work' },
                  { icon: <Sparkles className="w-4 h-4" />, label: 'Colour Grading',   sub: 'Luxury editorial tones' },
                  { icon: <Scissors className="w-4 h-4" />, label: 'Garment Clean-Up', sub: 'Wrinkle & lint removal' },
                  { icon: <Shield className="w-4 h-4" />,   label: 'Brand Consistent', sub: 'Uniform across full campaign' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#F0F0F0] shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-[#FFF0EE] flex items-center justify-center flex-shrink-0 text-[#E8352A]">{item.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A] leading-tight">{item.label}</p>
                      <p className="text-[10px] text-[#999] mt-0.5 leading-tight">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

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

              {/* Mini stats row */}
              <motion.div className="grid grid-cols-4 gap-3 pt-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.76 }}>
                {stats.map((s, i) => (
                  <motion.div key={i} className="flex flex-col gap-1"
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 + i * 0.08 }}
                    whileHover={{ y: -2 }}>
                    <div className="text-[#E8352A]">{s.icon}</div>
                    <p className="text-lg font-extrabold text-[#E8352A] leading-none">{s.value}</p>
                    <p className="text-[10px] font-semibold text-[#1A1A1A] leading-tight">{s.label}</p>
                    <p className="text-[9px] text-[#999] leading-tight">{s.sub}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Slider + FashionBadge + category strip + dot nav ── */}
            <motion.div className="flex flex-col gap-3 relative"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              <FashionBadge />

              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio: '4/3' }}
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER */}
                <motion.div key={`after-${activeCategory}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentCat.after})` }} />
                {/* BEFORE clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <motion.div key={`before-${activeCategory}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCat.before})`,
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
              </div>

              {/* Fashion category thumbnail strip */}
              <motion.div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-lg px-3 py-3 flex items-center gap-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                <button
                  onClick={() => { const i = fashionCategories.findIndex(c => c.id === activeCategory); selectCategory(fashionCategories[(i - 1 + fashionCategories.length) % fashionCategories.length].id); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2 flex-1 justify-around">
                  {fashionCategories.map(cat => (
                    <button key={cat.id} onClick={() => selectCategory(cat.id)}
                      className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all">
                      <div className={`w-12 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                        activeCategory === cat.id ? 'border-[#E8352A] shadow-md' : 'border-transparent hover:border-[#E8352A]/40'}`}>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${cat.img})` }} />
                      </div>
                      <span className={`text-[9px] font-semibold ${activeCategory === cat.id ? 'text-[#E8352A]' : 'text-[#999]'}`}>
                        {cat.label}
                      </span>
                      {activeCategory === cat.id && (
                        <motion.div layoutId="fgCatDot" className="w-4 h-0.5 bg-[#E8352A] rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { const i = fashionCategories.findIndex(c => c.id === activeCategory); selectCategory(fashionCategories[(i + 1) % fashionCategories.length].id); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Category description caption */}
              <motion.p key={activeCategory} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-[#888] leading-snug px-4">
                {currentCat.desc}
              </motion.p>
            </motion.div>

          </div>
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
                className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
