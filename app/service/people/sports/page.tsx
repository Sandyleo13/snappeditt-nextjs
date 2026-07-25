// app/sports/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy, Target, Users, Activity,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Camera, Wand2, Flame,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Animated "Action Intensity" badge ── */
function SportsBadge() {
  const [intensity, setIntensity] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIntensity(prev => {
        if (prev >= 100) return 0;
        return prev + 1.2;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div initial={{ opacity: 0, y: -12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5, ease: 'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2 min-w-[180px]">
      <div className="w-8 h-8 rounded-lg bg-[#FFF0EE] flex items-center justify-center flex-shrink-0">
        <Flame className="w-4 h-4 text-[#E8352A]" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <p className="text-[9px] font-bold text-[#1A1A1A] leading-none">Action Intensity</p>
          <span className="text-[9px] font-bold text-[#E8352A]">{Math.round(intensity)}%</span>
        </div>
        <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, #E8352A, #FF6B35)` }}
            animate={{ width: `${intensity}%` }}
            transition={{ duration: 0.03 }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Sport category tabs ── */
const sportCategories = [
  { id: 'action',   label: 'Action',   img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&auto=format&fit=crop',
    desc: 'Transform action shots into championship-worthy moments with vivid clarity.' },
  { id: 'team',     label: 'Team',     img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=900&q=85&auto=format&fit=crop',
    desc: 'Enhance team photos for professional presentations, media kits, and sponsors.' },
  { id: 'portrait', label: 'Portrait', img: 'https://images.unsplash.com/photo-1519861155735-a454d4d60c38?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1519861155735-a454d4d60c38?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1519861155735-a454d4d60c38?w=900&q=85&auto=format&fit=crop',
    desc: 'Professional athlete portraits for sponsorships and media coverage.' },
  { id: 'fitness',  label: 'Fitness',  img: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=900&q=85&auto=format&fit=crop',
    desc: 'High-contrast fitness photography for gyms, coaches, and athletes.' },
  { id: 'event',    label: 'Event',    img: 'https://images.unsplash.com/photo-1551958219-acbc595d5cd2?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1551958219-acbc595d5cd2?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after:  'https://images.unsplash.com/photo-1551958219-acbc595d5cd2?w=900&q=85&auto=format&fit=crop',
    desc: 'Race, tournament, and sporting event photography — every moment captured crisp.' },
];

export default function SportsRetouchingPage() {
  const [activeCategory, setActiveCategory]         = useState('action');
  const [sliderPosition, setSliderPosition]         = useState(50);
  const [isDragging, setIsDragging]                 = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]     = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentCat = sportCategories.find(c => c.id === activeCategory) ?? sportCategories[0];

  const stats = [
    { value: '50K+', label: 'Athletes Served',  sub: 'From amateur to pro',          icon: <Trophy className="w-5 h-5" /> },
    { value: '24h',  label: 'Turnaround',        sub: 'Even for large event batches', icon: <Zap className="w-5 h-5" /> },
    { value: '4K',   label: 'Max Resolution',    sub: 'Full quality preserved',       icon: <Camera className="w-5 h-5" /> },
    { value: '100%', label: 'Print Ready',       sub: 'Press, web & sponsorship',     icon: <Shield className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Action Photography',  description: 'Vivid, sharp action shots with perfect motion and colour depth.',      icon: <Activity className="w-8 h-8" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Team Portraits',      description: 'Consistent team photos for clubs, leagues and professional squads.',    icon: <Users className="w-8 h-8" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Athlete Profiles',    description: 'Pro-level headshots and portraits for media kits and sponsorships.',    icon: <Target className="w-8 h-8" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Event Coverage',      description: 'Batch retouching for tournament, race and sporting event galleries.',   icon: <Trophy className="w-8 h-8" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  useEffect(() => { sliderDirectionRef.current = 1; }, [activeCategory]);

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
    const pricePerImage = 0.18, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: 'Sports Retouching', qty: 1, price: pricePerImage,
      retouching: 'Sports Retouching', order_name: 'Sports Retouching',
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
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">

        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <filter id="sports-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#sports-noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.16, 0.26, 0.16] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-20 -right-32 h-[500px] w-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="sports-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#sports-grid)"/>
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation: 'spCW 8s linear infinite', transformOrigin: '820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation: 'spCCW 12s linear infinite', transformOrigin: '820px 340px' }}/>
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
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>
        <style>{`
          @keyframes spCW  { to { stroke-dashoffset: -1800; } }
          @keyframes spCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>

      
              {/* Heading */}
              <div className="mb-6">
                <motion.h1 className="font-extrabold leading-[0.95] tracking-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
                  {['Sports', 'Photo', 'Editing'].map((word, i) => <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`}
                    initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>)}
                </motion.h1>
              </div>

              <motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Turn raw sports shots into powerful, media-ready images. From action-packed game moments
                to pro athlete portraits — every photo enhanced to championship standard.
              </motion.p>

           

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-4 pt-1"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.64, duration:0.5 }}>
                <Link href="/free-trial"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)]">
                  Get Started Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior:'smooth' })}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">
                  View Examples
                </button>
              </motion.div>

           
              <motion.div className="mt-14 grid grid-cols-4 gap-4 border-t border-white/10 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
                {stats.map((s, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                  <p className="text-2xl font-extrabold text-white lg:text-3xl">{s.value}</p><p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#666]">{s.label}</p>
                </motion.div>)}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Slider + intensity badge + sport category strip ── */}
            <motion.div className="relative flex flex-col lg:h-screen"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative mx-4 mt-4 min-h-[340px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCat.after})` }} />
                {/* BEFORE clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 w-full bg-cover bg-center" style={{ backgroundImage: `url(${currentCat.before})` }} />
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

                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"><Flame className="h-3.5 w-3.5 text-[#E8352A]" /><span className="whitespace-nowrap text-[11px] font-semibold text-white">Championship-Ready Edit</span></motion.div>

                {/* Labels */}
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A]/75 text-white text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm">Before</span>
                <span className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">After</span>
              </div>

              {/* Sport category selector */}
              <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
                <button aria-label="Previous sport example"
                  onClick={() => { const i = sportCategories.findIndex(c => c.id === activeCategory); selectCategory(sportCategories[(i - 1 + sportCategories.length) % sportCategories.length].id); }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex flex-1 justify-around gap-2 lg:flex-col">
                  {sportCategories.map(cat => (
                    <button
                      key={cat.id}
                      aria-label={`Show ${cat.label} example`}
                      onClick={() => selectCategory(cat.id)}
                      className={activeCategory === cat.id
                        ? 'h-2.5 w-8 rounded-full bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]'
                        : 'h-2.5 w-2.5 rounded-full bg-white/25 hover:bg-white/50'}
                    />
                  ))}
                </div>
                <button aria-label="Next sport example"
                  onClick={() => { const i = sportCategories.findIndex(c => c.id === activeCategory); selectCategory(sportCategories[(i + 1) % sportCategories.length].id); }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Caption */}
              <motion.p key={activeCategory} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-[#888] leading-snug px-4">
                {currentCat.desc}
              </motion.p>
            </motion.div>
          </div>

      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See <span className="text-[#E8352A]">Sports Photos</span> Transform
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">Real sports shots before and after championship-level retouching.</p>
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
                  <div className="absolute inset-0 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCat.before})` }} />
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
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {sportCategories.map(cat => (
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

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Sports Retouching</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Championship-level retouching for action, team, portrait and event sports photography.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.18 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Action Sharpness & Clarity','Vivid Colour & Contrast','Skin & Uniform Retouch',
                  'Background Replacement','Motion Blur Reduction','24-Hour Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">Sports</span> Services
            </h2>
            <p className="text-xl text-gray-600">Professional retouching for every sport and athletic context.</p>
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
                          <p className="mb-3">{service.description} More details, samples, and typical turnaround info.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/people/sports/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
