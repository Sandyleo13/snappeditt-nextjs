// app/jewelry/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, Gem,
  ArrowRight, CheckCircle,
  Camera, Image as ImageIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Jewelry category tabs ── */
const jewelryCategories = [
  { id:'rings',     label:'Rings',     img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    after: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
    desc:'Enhance ring brilliance with perfect stone clarity and metal shine.' },
  { id:'necklaces', label:'Necklaces', img:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    after: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop',
    desc:'Bring out the elegance of fine necklaces with expert retouching.' },
  { id:'bracelets', label:'Bracelets', img:'https://images.unsplash.com/photo-1573408301185-9519f94815b9?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1573408301185-9519f94815b9?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    after: 'https://images.unsplash.com/photo-1573408301185-9519f94815b9?w=900&q=85&auto=format&fit=crop',
    desc:'Perfect light and shadow for bracelet texture and metal finish.' },
  { id:'earrings',  label:'Earrings',  img:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    after: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=900&q=85&auto=format&fit=crop',
    desc:'Showcase earring detail, gemstone color, and metalwork clarity.' },
  { id:'watches',   label:'Watches',   img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    after: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85&auto=format&fit=crop',
    desc:'Luxury watch retouching — reflections, dial clarity and strap texture.' },
];

export default function JewelryPage() {
  const [activeCategory, setActiveCategory] = useState('rings');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging]         = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentCat = jewelryCategories.find(c => c.id === activeCategory) ?? jewelryCategories[0];

  const services = [
    { title:'Ring Retouching',     description:'Perfect stone clarity, metal shine and shadow for all ring types.',    icon:<Gem className="w-6 h-6"/>, color: '#E8352A', bg: '#FFF0EE' },
    { title:'Necklace & Pendants', description:'Bring out the elegance of fine chains, pendants and gemstones.',       icon:<Sparkles className="w-6 h-6"/>, color: '#7C3AED', bg: '#F5F0FF' },
    { title:'Watch Photography',   description:'Luxury watch retouching — reflections, dials and strap textures.',     icon:<Camera className="w-6 h-6"/>, color: '#0EA5E9', bg: '#F0F9FF' },
    { title:'Full Catalog Edits',  description:'Consistent, high-end retouching across entire jewelry collections.',   icon:<ImageIcon className="w-6 h-6"/>, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  useEffect(() => {
    sliderDirectionRef.current = 1;
  }, [activeCategory]);

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 0.7;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0)   { sliderDirectionRef.current =  1; return 0;   }
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
    const cartItem = { service_name:'Jewelry Retouching', qty:1, price:pricePerImage,
      retouching:'Jewelry Retouching', order_name:'Jewelry Retouching',
      order_images:imageCount, order_details:currentCat.desc, addons:[], total };
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
            <filter id="jewelry-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#jewelry-noise)"/>
          </svg>
          <motion.div animate={{ scale:[1,1.12,1], opacity:[0.16,0.26,0.16] }} transition={{ repeat:Infinity, duration:8, ease:'easeInOut' }}
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale:[1,1.08,1], opacity:[0.1,0.18,0.1] }} transition={{ repeat:Infinity, duration:10, ease:'easeInOut', delay:2 }}
            className="absolute -bottom-20 -right-32 h-[500px] w-[500px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="jewelry-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#jewelry-grid)"/>
          </svg>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation:'jwCW 8s linear infinite', transformOrigin:'820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation:'jwCCW 12s linear infinite', transformOrigin:'820px 340px' }}/>
          </svg>
          <motion.div animate={{ y:[-13,13,-13] }} transition={{ repeat:Infinity, duration:5.8, ease:'easeInOut' }}
            style={{ position:'absolute', right:'6%', top:'7%', width:52, height:52, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow:'0 10px 30px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y:[9,-9,9] }} transition={{ repeat:Infinity, duration:3.8, ease:'easeInOut', delay:0.8 }}
            style={{ position:'absolute', right:'8%', top:'50%', width:24, height:24, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow:'0 5px 16px rgba(232,53,42,0.26)' }} />
          <motion.div animate={{ y:[-11,11,-11] }} transition={{ repeat:Infinity, duration:6.4, ease:'easeInOut' }}
            style={{ position:'absolute', left:'5%', top:'46%', width:60, height:60, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow:'0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border:'1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y:[8,-8,8] }} transition={{ repeat:Infinity, duration:4.7, ease:'easeInOut', delay:0.7 }}
            style={{ position:'absolute', left:'12%', bottom:'28%', width:28, height:28, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow:'0 3px 12px rgba(15,23,42,0.07)', border:'1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y:[-8,8,-8] }} transition={{ repeat:Infinity, duration:4, ease:'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y:[8,-8,8] }} transition={{ repeat:Infinity, duration:5.2, ease:'easeInOut', delay:0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y:[-6,6,-6] }} transition={{ repeat:Infinity, duration:3.6, ease:'easeInOut', delay:0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>
        <style>{`
          @keyframes jwCW  { to { stroke-dashoffset: -1800; } }
          @keyframes jwCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:'easeOut' }}>


              {/* Heading */}
              <div>
                <motion.h1 className="font-extrabold leading-[0.95] tracking-tight"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.55 }}>
                  {['Jewelry', 'Retouching', 'Editing'].map((word, i) => <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`}
                    initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 + i * 0.12, duration:0.6, ease:[0.22,1,0.36,1] }}>{word}</motion.span>)}
                </motion.h1>
              </div>

              <motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.5 }}>
                Transform ordinary jewelry photos into stunning, high-end catalogue images. Perfect
                gemstone clarity, metal brilliance, and flawless reflections — every time.
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

            
            </motion.div>

            {/* ── RIGHT: Slider + gem quality badge + category strip ── */}
            <motion.div className="relative flex flex-col lg:h-screen"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Animated shine badge */}
              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative mx-4 mt-4 min-h-[340px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER — base */}
                <motion.div key={`after-${activeCategory}`}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentCat.after})` }} />

                {/* BEFORE — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 w-full bg-cover bg-center" style={{ backgroundImage:`url(${currentCat.before})` }} />
                </div>

                {/* Divider + handle */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
                  style={{ left:`${sliderPosition}%`, transform:'translateX(-50%)' }}
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
                <motion.div animate={{ y:[-4,4,-4] }} transition={{ repeat:Infinity, duration:3, ease:'easeInOut' }}
                  className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Gem className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">Gemstone-Ready Edit</span>
                </motion.div>
              </div>

              {/* Jewelry category thumbnail strip */}
              <motion.div
                className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}>
                <button
                  onClick={() => { const i = jewelryCategories.findIndex(c => c.id === activeCategory); selectCategory(jewelryCategories[(i-1+jewelryCategories.length)%jewelryCategories.length].id); }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex flex-1 justify-around gap-2 lg:flex-col">
                  {jewelryCategories.map(cat => (
                    <button key={cat.id} onClick={() => selectCategory(cat.id)}
                      className="flex flex-shrink-0 flex-col items-center gap-1.5 transition-all">
                      <span aria-label={`Show ${cat.label} example`} className={`rounded-full transition-all duration-300 ${activeCategory === cat.id ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { const i = jewelryCategories.findIndex(c => c.id === activeCategory); selectCategory(jewelryCategories[(i+1)%jewelryCategories.length].id); }}
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:border-[#E8352A] hover:text-[#E8352A] transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Caption */}
              <motion.p key={activeCategory} initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                className="text-center text-xs text-[#888] leading-snug px-4">
                {currentCat.desc}
              </motion.p>
            </motion.div>
          </div>
      </section>

      {/* ══════════════════════════════════════  GALLERY  ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Brilliance</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real jewelry photos before and after expert retouching.
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
                  style={{ backgroundImage:`url(${currentCat.after})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentCat.before})`,
                      width: '100%' }} />
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{ left:`${sliderPosition}%`, transform:'translateX(-50%)' }}
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
              {/* Category pills */}
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {jewelryCategories.map(cat => (
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Jewelry Retouching</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                High-end retouching for rings, necklaces, bracelets, earrings and watches.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.22 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Gemstone Clarity Enhancement','Metal Shine & Polish','Background Removal',
                  'Reflection & Glare Control','Dust & Scratch Removal','24-Hour Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">Jewelry</span> Services
            </h2>
            <p className="text-xl text-gray-600">Luxury retouching for every piece in your collection.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service,i) => (
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
                          <p className="mb-3">{service.description} Typical turnaround, sample edits, and bulk pricing.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/commercial/jewelry/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
