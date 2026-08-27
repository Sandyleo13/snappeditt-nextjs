// app/virtual-staging/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Home, Sofa, PaintBucket, Image as ImageIcon,
  ArrowRight, CheckCircle, Camera,
  Zap, Shield, Armchair,
  ChevronLeft, ChevronRight,
  type LucideIcon,
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

function ServicesSection({ services, sectionTitle, sectionDesc }: { services: { title: string; description: string; icon: LucideIcon; color: string; bg: string }[]; sectionTitle: string; sectionDesc: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section id="services" className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="inline-block text-[#E8352A] text-xl font-bold tracking-[0.2em] uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">{sectionTitle} <span className="text-[#E8352A]">Services</span></h2>
          <p className="text-[#777] text-lg">{sectionDesc}</p>
        </motion.div>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 border border-[#EBEBEB] bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-transparent transition-all duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: service.bg, color: service.color }}>
                {React.createElement(service.icon, { size: 24 })}
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-2xl mb-2">{service.title}</h3>
              <p className="text-[#888] text-lg leading-relaxed mb-5">{service.description}</p>
              <div className="flex items-center gap-1.5 text-xl font-semibold" style={{ color: service.color }}>
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="absolute top-4 right-5 text-[11px] font-bold text-[#1A1A1A]/10">0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

  const services: { title: string; description: string; icon: LucideIcon; color: string; bg: string }[] = [
    { title: 'Residential Staging', description: 'Transform empty homes into inviting living spaces with realistic furniture.',   icon: Home,        color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Commercial Spaces',   description: 'Stage offices, retail, and commercial properties for maximum appeal.',         icon: Armchair,    color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Virtual Renovation',  description: 'Show potential renovations and upgrades before construction.',                 icon: PaintBucket, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'VR Walkthroughs',     description: 'Create immersive virtual reality tours of staged properties.',                 icon: Camera,      color: '#10B981', bg: '#ECFDF5' },
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
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">

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

        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="staging-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#staging-noise)" />
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="staging-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#staging-grid)" /></svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: size, height: size, left: `${[12, 28, 45, 62, 75, 88][i]}%`, top: `${[20, 65, 15, 75, 35, 55][i]}%`, filter: 'blur(1px)' }} />)}
        </div>

        <style>{`
          @keyframes vsCW  { to { stroke-dashoffset: -1800; } }
          @keyframes vsCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col px-8 pb-12 pt-24 sm:px-12 lg:grid lg:grid-cols-2 lg:px-16 lg:py-0 xl:px-24">
          <div className="grid min-h-screen grid-cols-1 items-stretch lg:contents">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col justify-center gap-6 px-2 text-center lg:items-start lg:px-0 lg:text-left"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:'easeOut' }}>

          
           
              <motion.div className="inline-flex items-center gap-2 self-center rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm lg:self-start" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">Real Estate Editing</span>
              </motion.div>

              {/* Heading */}
              <div className="max-w-xl lg:mx-0">
                <motion.h1 className="font-extrabold leading-[0.95] tracking-tight"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.55 }}>
                  <span className="block text-white text-[clamp(3rem,8vw,7rem)]">Virtual</span><span className="block text-[#E8352A] text-[clamp(3rem,8vw,7rem)]">Staging</span>
                </motion.h1>
                <motion.p className="mt-2 text-xl font-semibold leading-snug text-white/90 sm:text-2xl md:text-3xl"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32, duration:0.5 }}>
                  Digital Interior Transformation
                </motion.p>
              </div>

              <motion.p className="mx-auto max-w-xl text-base leading-relaxed text-[#A0A0B0] md:text-lg lg:mx-0"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.44, duration:0.5 }}>
                Transform empty properties into beautifully furnished spaces instantly. Watch as AI magically
                adds furniture, decor, and style to any room.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1 justify-center lg:justify-start w-full max-w-xl mx-auto lg:mx-0"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.56, duration:0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105 w-full sm:w-auto">
                  Get Start For Free
                </Link>
                <button
                  onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior:'smooth' })}
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all w-full sm:w-auto">
                  View Examples
                </button>
              </motion.div>

              <motion.div className="grid w-full grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
                {stats.map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                    <p className="text-2xl font-extrabold text-white lg:text-3xl">{stat.value}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

             
            </motion.div>

            {/* ── RIGHT: Before/After Slider + Style Thumbnails ── */}
            <motion.div className="relative flex flex-col lg:h-screen"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Slider */}
              <div ref={heroSliderRef}
                className="relative mt-4 min-h-[340px] w-full flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-2xl lg:mt-0 lg:rounded-none"
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

                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Zap className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">Virtual Staging</span>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 to-transparent px-6 py-5">
                  <div className="flex items-center justify-between gap-2">
                    {['Modern', 'Minimal', 'Classic', 'Luxury'].map((tab) => (
                      <button key={tab} onClick={() => { setActiveStyle(tab.toLowerCase()); const index = transformationExamples.findIndex(example => example.style === tab.toLowerCase()); if (index >= 0) changeExample(index); }} className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeStyle === tab.toLowerCase() ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
                        <Sofa className="h-4 w-4" />
                        <span className="text-[9px] font-semibold">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style thumbnails carousel */}
              <motion.div
                className="hidden bg-black/50 rounded-2xl border border-white/10 shadow-lg px-4 py-3 items-center gap-3 backdrop-blur-sm lg:flex"
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
              <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
                {styleVariants.map((style, i) => (
                  <button key={i} onClick={() => changeExample(i)}
                    className={`rounded-full transition-all duration-300 ${style.id === activeStyle ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />
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

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch px-4 sm:px-0">
            {/* Slider */}
            <div className="flex-1 flex flex-col w-full max-w-full">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px] w-full max-w-full"
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full">
                <button onClick={() => changeExample(currentExampleIndex - 1)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeExample(currentExampleIndex + 1)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 max-w-xl bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col mx-auto lg:mx-0">
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

      <ServicesSection services={services} sectionTitle="Staging" sectionDesc="Comprehensive virtual staging solutions for every property type." />

    </div>
  );
}
