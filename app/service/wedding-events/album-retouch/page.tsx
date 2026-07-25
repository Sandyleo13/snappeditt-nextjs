// app/album-retouch/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen, Layers, Camera, Sparkles,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Palette, Sun, Wand2, Grid3x3, Contrast,
  ChevronLeft, ChevronRight,
  type LucideIcon,
} from 'lucide-react';

/* -- Animated album pages counter -- */
function AlbumBadge({ pages }: { pages: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const step = Math.ceil(pages / 35);
    const id = setInterval(() => setCount(c => { if (c >= pages) { clearInterval(id); return pages; } return c + step; }), 45);
    return () => clearInterval(id);
  }, [pages]);
  return (
    <motion.div initial={{ opacity:0, y:-12, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay:1.0, duration:0.5, ease:'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2 bg-white rounded-xl shadow-lg border border-[#E8E8E8] px-3 py-2">
      <div className="w-8 h-8 rounded-lg bg-[#FFF0EE] flex items-center justify-center flex-shrink-0">
        <BookOpen className="w-4 h-4 text-[#E8352A]" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">Album Ready!</p>
        <p className="text-[9px] text-[#999] mt-0.5">
          <span className="text-[#E8352A] font-bold">{count}</span> pages retouched
        </p>
      </div>
    </motion.div>
  );
}
function ServicesSection({ services }: { services: { title: string; description: string; icon: LucideIcon; color: string; bg: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const headerAnimate = React.useMemo(() => (inView ? { opacity: 1, y: 0 } : {}), [inView]);
  const cardAnimate = React.useMemo(() => (inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }), [inView]);

  return (
    <section id="services" className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} animate={headerAnimate}
          transition={{ duration: 0.6 }}>
          <span className="inline-block text-[#E8352A] text-2xl font-bold tracking-[0.2em] uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Album <span className="text-[#E8352A]">Retouching</span>
          </h2>
          <p className="text-[#777] text-xl">
            Additional album retouching services designed to keep every spread polished and professional.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={cardAnimate}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              style={{ willChange: 'opacity, transform' }}
              className="group relative z-20 rounded-2xl p-6 border border-[#E6E6E6] bg-white shadow-md overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#E8352A]/20 transition-shadow duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background: service.bg, color: service.color }}>
                {React.createElement(service.icon, { size: 24, className: 'w-10 h-10' })}
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-2">{service.title}</h3>
              <p className="text-[#475569] text-lg leading-relaxed mb-5">{service.description}</p>
              <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: service.color }}>
                <span className="relative">Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <span className="absolute top-4 right-5 text-[11px] font-bold text-[#1A1A1A]/10">0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
const MemoServicesSection = React.memo(ServicesSection);

export default function AlbumRetouchPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition]           = useState(50);
  const [isDragging, setIsDragging]                   = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]       = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Exposure');
  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  const transformationExamples = [
    { id:1, pages:120,
      beforeImage:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=900&q=85&auto=format&fit=crop&sat=-45&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=900&q=85&auto=format&fit=crop',
      description:'Create timeless wedding albums with professional retouching across every page.' },
    { id:2, pages:80,
      beforeImage:'https://images.unsplash.com/photo-1574516479896-42de4f4d22d7?w=900&q=85&auto=format&fit=crop&sat=-45&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1574516479896-42de4f4d22d7?w=900&q=85&auto=format&fit=crop',
      description:'Transform family albums with consistent color grading and enhanced details.' },
    { id:3, pages:60,
      beforeImage:'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=900&q=85&auto=format&fit=crop&sat=-45&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=900&q=85&auto=format&fit=crop',
      description:'Bring travel memories to life with vivid colors and perfect composition.' },
  ];

  const stats = [
    { value:'500K+', label:'Albums Retouched', sub:'Trusted by studios worldwide',  icon:<BookOpen className="w-5 h-5"/> },
    { value:'48h',   label:'Turnaround Time',  sub:'Fast, reliable delivery',        icon:<Zap className="w-5 h-5"/> },
    { value:'100%',  label:'Consistent Style', sub:'Uniform look across all pages',  icon:<Layers className="w-5 h-5"/> },
    { value:'50MP',  label:'Max Resolution',   sub:'Full quality preserved',         icon:<Camera className="w-5 h-5"/> },
  ];

  const services = [
    { title:'Wedding Albums',  description:'Professional retouching for every spread in your wedding album.',        icon:BookOpen, color:'#E8352A', bg:'#FFF0EE' },
    { title:'Family Albums',   description:'Consistent color grading and enhancement for family photo collections.', icon:Grid3x3, color:'#7C3AED', bg:'#F5F0FF' },
    { title:'Portrait Albums', description:'Artistic enhancement for portrait series and model portfolios.',         icon:Camera, color:'#0EA5E9', bg:'#EFF8FF' },
    { title:'Event Albums',    description:'Complete retouching for corporate and social event photo albums.',       icon:Sparkles, color:'#10B981', bg:'#ECFDF5' },
  ];
  

  /* -- Auto-animate slider -- */
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
  }, [isDragging, isHoveringSlider]);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const activeRef = heroSliderRef.current?.contains(e.target as Node) ? heroSliderRef : gallerySliderRef;
    if (!activeRef.current) return;
    if ('touches' in e && e.touches.length === 0) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const changeExample = (i: number) => {
    setCurrentExampleIndex((i + transformationExamples.length) % transformationExamples.length);
    setSliderPosition(50);
  };

  const currentExample = transformationExamples[currentExampleIndex % transformationExamples.length];

  const addToCart = () => {
    const pricePerImage = 0.13, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name:'Album Retouch', qty:1, price:pricePerImage,
      retouching:'Album Retouch', order_name:'Album Retouch',
      order_images:imageCount, order_details:currentExample.description, addons:[], total };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch { document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/'; }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">

      {/* --------------------------------------  HERO  (dark animated mesh) -------------------------------------- */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* Animated mesh background */}
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

          {/* LEFT PANEL */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Album Retouch</span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Album', 'Retouch', 'Editing'].map((word, i) => (
                <motion.span key={word} className={`block ${i===1? 'text-[#E8352A]':'text-white'} text-[clamp(3rem,8vw,7rem)]`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Transform wedding album images with expert manual editing — precise exposure correction, color grading, and layout refinement across every spread.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:scale-105 z-40" style={{ willChange: 'transform, opacity' }}>Get Started Free <ArrowRight className="w-4 h-4"/></Link>
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

          {/* RIGHT PANEL — Before/After full height */}
          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
            <div ref={heroSliderRef} className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0" style={{ minHeight:340 }} onMouseMove={handleSliderMove} onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchMove={handleSliderMove} onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentExample.afterImage})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentExample.beforeImage})`, width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
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
                      {tab === 'Shadows'    && <Layers className="w-4 h-4"/>}
                      {tab === 'Color'      && <Wand2 className="w-4 h-4"/>}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div animate={{ y: [-4,4,-4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Manual Edit</span>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {transformationExamples.map((_, i) => (
                <button key={i} onClick={() => changeExample(i)} className={`rounded-full transition-all duration-300 ${currentExampleIndex === i ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">See the <span className="text-[#E8352A]">Transformation</span></h2>
            <p className="text-lg sm:text-xl text-[#555]">Real wedding album spreads before and after professional retouching.</p>
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:`url(${currentExample.afterImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:`url(${currentExample.beforeImage})`, width: gallerySliderRef.current ? `${gallerySliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left:`${sliderPosition}%`, transform:'translateX(-50%)' }} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Unbalanced</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Balanced</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => changeExample(currentExampleIndex - 1)} className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"><ChevronLeft className="w-4 h-4" /> Prev</button>
                <button onClick={() => changeExample(currentExampleIndex + 1)} className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">Next <ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
              <div className="bg-white rounded-[2rem] border border-[#E5E7EB] shadow-xl p-6 flex flex-col h-full">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E8352A] mb-3">Perfect Color Balance</h3>
                <p className="text-[#4B5563] text-sm sm:text-base mb-6 leading-relaxed">
                  Professional AI-powered color correction and tonal balancing for all album photo types.
                </p>
                <div className="text-3xl font-extrabold text-[#111] mb-4">
                  $0.13 <span className="text-base font-normal text-[#6B7280]">/ image</span>
                </div>
                <button type="button" onClick={addToCart} className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-3 rounded-xl transition-all mb-5 shadow-sm text-sm">
                  Add to Cart
                </button>
                <ul className="flex flex-col gap-3 mb-6 flex-1">
                  {[
                    'White Balance Correction',
                    'Color Cast Removal',
                    'Shadow & Highlight Recovery',
                    'Tonal Balancing',
                    'Skin Tone Correction',
                    '24-Hour Delivery'
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#374151]">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#FEE2E2] text-[#B91C1C]">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FEF2F2] font-semibold py-3 rounded-xl transition-all text-sm">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MemoServicesSection services={services} />

    </div>
  );
}
