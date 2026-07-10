// app/virtual-staging/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home, Sofa, PaintBucket, Image as ImageIcon,
  ArrowRight, CheckCircle, Camera,
  Zap, Shield, Armchair,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────
   Style thumbnail data
───────────────────────────────────────── */
const styleVariants = [
  { id: 'modern',       label: 'Modern',       img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&q=70&auto=format&fit=crop' },
  { id: 'minimal',      label: 'Minimal',      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=120&q=70&auto=format&fit=crop' },
  { id: 'classic',      label: 'Classic',      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&q=70&auto=format&fit=crop' },
  { id: 'scandinavian', label: 'Scandinavian', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=120&q=70&auto=format&fit=crop' },
  { id: 'luxury',       label: 'Luxury',       img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=120&q=70&auto=format&fit=crop' },
];

export default function VirtualStagingPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition]           = useState(50);
  const [isDragging, setIsDragging]                   = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]       = useState(false);
  const [activeStyle, setActiveStyle] = useState('modern'); // index 0
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const transformationExamples = [
    { id:1, style:'modern',       beforeImage:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=20', afterImage:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85&auto=format&fit=crop', description:'Transform empty living spaces into beautifully furnished modern interiors.' },
    { id:2, style:'minimal',      beforeImage:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=20', afterImage:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=85&auto=format&fit=crop', description:'Stage vacant bedrooms with a clean, minimal aesthetic.' },
    { id:3, style:'classic',      beforeImage:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=20', afterImage:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop', description:'Add modern appliances and classic decor to showcase kitchen functionality.' },
    { id:4, style:'scandinavian', beforeImage:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=20', afterImage:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&auto=format&fit=crop', description:'Stage home offices with Scandinavian furniture that highlights productivity.' },
    { id:5, style:'luxury',       beforeImage:'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=20', afterImage:'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=85&auto=format&fit=crop', description:'Stage dining areas with luxury furniture and elegant table settings.' },
  ];

  const stats = [
    { value:'87%',   label:'Faster Sale',      sub:'Sell properties faster with staged images',     icon:<ImageIcon className="w-5 h-5"/> },
    { value:'5000+', label:'Furniture Items',   sub:'High-quality furniture & decor library',        icon:<Sofa className="w-5 h-5"/> },
    { value:'20%',   label:'Value Increase',    sub:'Increase perceived property value',             icon:<Zap className="w-5 h-5"/> },
    { value:'24h',   label:'Turnaround Time',   sub:'Super fast delivery within 24 hours',           icon:<CheckCircle className="w-5 h-5"/> },
  ];

  const services = [
    { title:'Residential Staging', description:'Transform empty homes into inviting living spaces with realistic furniture.',         icon:<Home className="w-6 h-6"/> },
    { title:'Commercial Spaces',   description:'Stage offices, retail, and commercial properties for maximum appeal.',               icon:<Armchair className="w-6 h-6"/> },
    { title:'Virtual Renovation',  description:'Show potential renovations and upgrades before construction.',                       icon:<PaintBucket className="w-6 h-6"/> },
    { title:'VR Walkthroughs',     description:'Create immersive virtual reality tours of staged properties.',                       icon:<Camera className="w-6 h-6"/> },
  ];

  /* ── Auto-animate slider ── */
  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 0.8;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0)   { sliderDirectionRef.current =  1; return 0;   }
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
    const idx = (i + transformationExamples.length) % transformationExamples.length;
    setCurrentExampleIndex(idx);
    setSliderPosition(50);
    setActiveStyle(transformationExamples[idx].style);
  };

  const currentExample = transformationExamples[currentExampleIndex % transformationExamples.length];

  const addToCart = () => {
    const pricePerImage = 0.18, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name:'Virtual Staging', qty:1, price:pricePerImage, retouching:'Virtual Staging',
      order_name:'Virtual Staging', order_images:imageCount, order_details:currentExample.description, addons:[], total };
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

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{ background:'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />

          {/* Orbit SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation:'vsCW 8s linear infinite', transformOrigin:'820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation:'vsCCW 12s linear infinite', transformOrigin:'820px 340px' }}/>
          </svg>

          {/* Red spheres */}
          <motion.div animate={{ y:[-13,13,-13] }} transition={{ repeat:Infinity, duration:5.8, ease:'easeInOut' }}
            style={{ position:'absolute', right:'6%', top:'7%', width:52, height:52, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow:'0 10px 30px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y:[9,-9,9] }} transition={{ repeat:Infinity, duration:3.8, ease:'easeInOut', delay:0.8 }}
            style={{ position:'absolute', right:'8%', top:'50%', width:24, height:24, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow:'0 5px 16px rgba(232,53,42,0.26)' }} />

          {/* Glass spheres */}
          <motion.div animate={{ y:[-11,11,-11] }} transition={{ repeat:Infinity, duration:6.4, ease:'easeInOut' }}
            style={{ position:'absolute', left:'5%', top:'46%', width:60, height:60, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow:'0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border:'1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y:[8,-8,8] }} transition={{ repeat:Infinity, duration:4.7, ease:'easeInOut', delay:0.7 }}
            style={{ position:'absolute', left:'12%', bottom:'28%', width:28, height:28, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow:'0 3px 12px rgba(15,23,42,0.07)', border:'1px solid rgba(208,218,234,0.35)' }} />

          {/* Dot accents */}
          <motion.div animate={{ y:[-8,8,-8] }} transition={{ repeat:Infinity, duration:4, ease:'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y:[8,-8,8] }} transition={{ repeat:Infinity, duration:5.2, ease:'easeInOut', delay:0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y:[-6,6,-6] }} transition={{ repeat:Infinity, duration:3.6, ease:'easeInOut', delay:0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
        </div>

        <style>{`
          @keyframes vsCW  { to { stroke-dashoffset: -1800; } }
          @keyframes vsCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:'easeOut' }}>

          
           
              {/* Heading */}
              <div>
                <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.55 }}>
                  Virtual <span className="text-[#E8352A]">Staging</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug mt-2"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32, duration:0.5 }}>
                  Digital Interior Transformation
                </motion.p>
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.44, duration:0.5 }}>
                Transform empty properties into beautifully furnished spaces instantly. Watch as AI magically
                adds furniture, decor, and style to any room.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.56, duration:0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">
                  Get Start For Free
                </Link>
                <button
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior:'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all">
                  View Examples
                </button>
              </motion.div>

             
            </motion.div>

            {/* ── RIGHT: Before/After Slider + Style Thumbnails ── */}
            <motion.div className="flex flex-col gap-3"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Slider */}
              <div ref={heroSliderRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio:'4/3' }}
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER — base */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentExample.afterImage})` }} />
                {/* BEFORE — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentExample.beforeImage})`,
                      width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
                </div>

                {/* Divider + handle */}
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

                {/* Labels */}
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">After</span>
              </div>

              {/* Style thumbnails carousel */}
              <motion.div
                className="bg-white rounded-2xl border border-[#F0F0F0] shadow-lg px-4 py-3 flex items-center gap-3"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}>
                <button
                  onClick={() => { const cur = styleVariants.findIndex(s => s.id === activeStyle); const next = (cur-1+styleVariants.length)%styleVariants.length; setActiveStyle(styleVariants[next].id); changeExample(next); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2.5 flex-1 overflow-hidden">
                  {styleVariants.map((style, idx) => (
                    <button key={style.id} onClick={() => { setActiveStyle(style.id); changeExample(idx); }}
                      className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${activeStyle === style.id ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}>
                      <div className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${activeStyle === style.id ? 'border-[#E8352A]' : 'border-transparent'}`}>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage:`url(${style.img})` }} />
                      </div>
                      <span className={`text-[9px] font-semibold ${activeStyle === style.id ? 'text-[#E8352A]' : 'text-[#999]'}`}>{style.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { const cur = styleVariants.findIndex(s => s.id === activeStyle); const next = (cur+1)%styleVariants.length; setActiveStyle(styleVariants[next].id); changeExample(next); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Dot nav — synced with style thumbnails */}
              <div className="flex items-center justify-center gap-2">
                {styleVariants.map((style, i) => (
                  <button key={i} onClick={() => changeExample(i)}
                    className={`rounded-full transition-all ${style.id === activeStyle ? 'w-5 h-2.5 bg-[#E8352A]' : 'w-2.5 h-2.5 bg-[#CCC] hover:bg-[#E8352A]/60'}`} />
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">Virtual Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              See empty rooms magically transform into beautifully staged spaces.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Slider */}
            <div className="flex-1 flex flex-col">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentExample.afterImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentExample.beforeImage})`,
                      width: gallerySliderRef.current ? `${gallerySliderRef.current.offsetWidth}px` : '100%' }} />
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Empty</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Staged</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Virtual Staging</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Transform empty properties into beautifully furnished spaces with photorealistic staging.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.18 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['AI Furniture Placement','5000+ Furniture Library','Multiple Design Styles',
                  'Photorealistic Rendering','Automatic Lighting Match','24-Hour Delivery'].map(feat => (
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
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Staging</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive virtual staging solutions for every property type.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service,i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
