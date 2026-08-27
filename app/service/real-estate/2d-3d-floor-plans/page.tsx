'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Box, Home, Layout, Camera,
  ArrowRight, CheckCircle,
  Zap, Eye, Ruler, Shield,
  ChevronLeft, ChevronRight, Sun, Contrast, Layers, Wand2, Sparkles
} from 'lucide-react';

/* ── View mode tabs ── */
const viewModes = [
  { id:'3d',          label:'3D View',     icon:'🧊' },
  { id:'walkthrough', label:'Walkthrough', icon:'🚶' },
  { id:'360',         label:'360° View',   icon:'🔄' },
  { id:'vr',          label:'VR Ready',    icon:'🥽' },
];

export default function FloorPlansPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition]           = useState(50);
  const [isDragging, setIsDragging]                   = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]       = useState(false);
  const [activeView, setActiveView]                   = useState('3d');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Exposure');
  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  const transformationExamples = [
    { id:1, beforeImage:'/images/floor-plan-2d-1.jpg',  afterImage:'/images/floor-plan-3d-1.jpg',
      fallbackBefore:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85&auto=format&fit=crop&sat=-80&brightness=80',
      fallbackAfter:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=85&auto=format&fit=crop',
      description:'Transform flat 2D blueprints into immersive 3D interior visualizations.' },
    { id:2, beforeImage:'/images/floor-plan-2d-2.jpg',  afterImage:'/images/floor-plan-3d-2.jpg',
      fallbackBefore:'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=85&auto=format&fit=crop&sat=-80&brightness=80',
      fallbackAfter:'https://images.unsplash.com/photo-1618220179428-22790b461013?w=900&q=85&auto=format&fit=crop',
      description:'Convert architectural drawings into interactive 3D building models.' },
    { id:3, beforeImage:'/images/floor-plan-2d-3.jpg',  afterImage:'/images/floor-plan-3d-3.jpg',
      fallbackBefore:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&auto=format&fit=crop&sat=-80&brightness=80',
      fallbackAfter:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85&auto=format&fit=crop',
      description:'Convert floor layouts into 3D models with realistic furniture placement.' },
  ];

  const stats = [
    { value:'10x',      label:'Faster Design',  sub:'Save time, deliver more',            icon:<Zap className="w-5 h-5"/> },
    { value:'95%',      label:'Accuracy',        sub:'Highly precise conversion',          icon:<Eye className="w-5 h-5"/> },
    { value:'360°',     label:'View Rotation',   sub:'Explore from any angle',             icon:<Ruler className="w-5 h-5"/> },
    { value:'VR Ready', label:'Virtual Reality', sub:'Immersive client experience',        icon:<Box className="w-5 h-5"/> },
  ];

  const services = [
    { title:'Residential Plans',  description:'Transform residential blueprints into immersive 3D home models.', icon:<Home className="w-8 h-8"/>, color:'#E8352A', bg:'#FFF0EE' },
    { title:'Commercial Spaces',  description:'Convert commercial floor plans into 3D office and retail models.', icon:<Layout className="w-8 h-8"/>, color:'#7C3AED', bg:'#F5F0FF' },
    { title:'Architectural',      description:'Turn architectural drawings into detailed 3D building visualizations.', icon:<Box className="w-8 h-8"/>, color:'#0EA5E9', bg:'#F0F9FF' },
    { title:'Virtual Tours',      description:'Create interactive 3D walkthroughs for properties and spaces.', icon:<Camera className="w-8 h-8"/>, color:'#10B981', bg:'#ECFDF5' },
  ];

  /* ── Auto-animate slider ── */
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
    if (!isDragging) return;
    const activeRef = heroSliderRef.current?.contains(e.target as Node) ? heroSliderRef : gallerySliderRef;
    if (!activeRef.current) return;
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
    const pricePerImage = 0.20, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name:'2D to 3D Floor Plans', qty:1, price:pricePerImage,
      retouching:'2D to 3D Floor Plans', order_name:'2D to 3D Floor Plans',
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
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ══════════════════════════════════════  HERO  ══════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* ── Animated mesh background ── */}
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

        {/* ── Main content grid ── */}
        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT PANEL */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">2D → 3D Floor Plans</span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['2D', 'to 3D', 'Floor Plans'].map((word, i) => (
                <motion.span key={word} className={`block ${
                  i === 1 ? 'text-[#E8352A]' : 'text-white'
                } text-[clamp(3rem,8vw,7rem)]`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Description */}
            <motion.p
              className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Convert 2D blueprints and floor plans into detailed 3D models, interactive walkthroughs, and VR-ready assets — ideal for architects, developers, and real-estate marketing.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)] hover:scale-105">
                Get Started Free
                <ArrowRight className="w-4 h-4 text-current group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:border-[#E8352A]/50 hover:text-white hover:bg-white/5 transition-all">
                View Examples
              </button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL — full-height before/after */}
          <motion.div
            className="relative flex flex-col lg:h-screen"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            {/* Before/After fills the entire right column */}
            <div
              ref={heroSliderRef}
              className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0"
              style={{ minHeight: 340 }}
              onMouseMove={handleSliderMove}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchMove={handleSliderMove}
              onTouchEnd={() => setIsDragging(false)}
              onMouseUp={() => setIsDragging(false)}
            >
              {/* Before */}
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentExample.fallbackBefore})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              {/* After */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentExample.fallbackAfter})`,
                    width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%',
                  }} />
              </div>

              {/* Divider */}
              <div className="absolute top-0 bottom-0 z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]"
                  style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div className="flex gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              {/* Service badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
              >
                <Box className="h-3.5 w-3.5 text-[#E8352A]" />
                <span className="whitespace-nowrap text-[11px] font-semibold text-white">
                  Professional 3D Floor Plan
                </span>
              </motion.div>

              {/* Bottom overlay: editor toolbar */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                        activeTab === tab
                          ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]'
                          : 'text-white/50 hover:text-white/80'
                      }`}>
                      {tab === 'Exposure'   && <Sun    className="w-4 h-4" />}
                      {tab === 'Contrast'   && <Contrast className="w-4 h-4" />}
                      {tab === 'Highlights' && <Sun    className="w-4 h-4 opacity-70" />}
                      {tab === 'Shadows'    && <Layers className="w-4 h-4" />}
                      {tab === 'Color'      && <Wand2  className="w-4 h-4" />}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>    
            </div>

            {/* Image selector dots */}
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {transformationExamples.map((_, i) => (
                <button key={i} onClick={() => changeExample(i)}
                  className={`rounded-full transition-all duration-300 ${
                    currentExampleIndex === i
                      ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]'
                      : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                  }`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════  GALLERY  ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See <span className="text-[#E8352A]">2D → 3D</span> in Action
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Drag the slider to see how flat floor plans transform into immersive 3D models.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch px-4 sm:px-0">
            {/* Slider */}
            <div className="flex-1 flex flex-col w-full max-w-full">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[280px] sm:min-h-[420px] w-full max-w-full"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentExample.fallbackAfter})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentExample.fallbackBefore})`,
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">2D Plan</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">3D Model</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full">
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
            <div className="w-full max-w-xl lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">2D to 3D Floor Plans</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional 2D to 3D conversion for architectural floor plans and blueprints.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.20 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['AI-Powered 2D to 3D Conversion','Automatic Wall Extrusion','Realistic Material Textures',
                  'Furniture Placement','Lighting Simulation','VR / AR Export Ready'].map(feat => (
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
              <span className="text-[#E8352A]">Floor Plan</span> Services
            </h2>
            <p className="text-xl text-gray-600">Comprehensive 3D conversion solutions for every architectural need.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service,i) => (
              <div key={i} className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group overflow-hidden">
                {/* hover glow fill */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />

                {/* top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: service.bg, color: service.color }}>
                   {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                <button className="text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all" style={{ color: service.color }}>
                  Learn more <ArrowRight className="w-3.5 h-3.5 text-current"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
