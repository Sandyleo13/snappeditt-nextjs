// app/3d-floor-plans/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, RotateCw, Video, CheckCircle,
  ArrowRight, Zap, Eye, Shield, Download,
  Layers, Ruler, Building, Camera,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Sun, Contrast, Wand2, Sparkles } from 'lucide-react';

/* ── Floating feature badge ── */
function FloatBadge({ icon, title, sub, delay, className }: {
  icon: React.ReactNode; title: string; sub: string;
  delay: number; className: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`absolute z-20 bg-white rounded-xl shadow-lg border border-[#F0F0F0] px-3 py-2.5 flex items-center gap-2.5 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-[#FFF0EE] flex items-center justify-center flex-shrink-0 text-[#E8352A]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">{title}</p>
        <p className="text-[9px] text-[#999] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

const floorPlanExamples = [
  { id: 1, title: 'Modern Apartment',
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=900&q=85&auto=format&fit=crop',
    desc: 'Detailed 3D apartment floor plan with furniture and lighting.' },
  { id: 2, title: 'Commercial Office',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&auto=format&fit=crop',
    desc: 'Open-plan office with collaborative zones and meeting rooms.' },
  { id: 3, title: 'Luxury Villa',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=85&auto=format&fit=crop',
    desc: 'Luxury villa with pool, garden and full interior detail.' },
];

export default function ThreeDFloorPlansPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotate, setRotate] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const autoSlideIntervalRef = useRef<number | null>(null);
  const current = floorPlanExamples[activeIndex];
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Design');
  const editorTabs = ['Design'];

  // Auto-slide every 4s — pauses while hovered
  useEffect(() => {
    if (autoSlideIntervalRef.current) {
      window.clearInterval(autoSlideIntervalRef.current);
      autoSlideIntervalRef.current = null;
    }

    if (!galleryHovered) {
      autoSlideIntervalRef.current = window.setInterval(() => {
        setSlideDirection('right');
        setActiveIndex(i => (i + 1) % floorPlanExamples.length);
      }, 4000);
    }

    return () => {
      if (autoSlideIntervalRef.current) {
        window.clearInterval(autoSlideIntervalRef.current);
        autoSlideIntervalRef.current = null;
      }
    };
  }, [galleryHovered]);

  // Slow rotation animation on the 3D render
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (!rotate) return;
    const id = setInterval(() => setAngle(a => (a + 0.3) % 360), 30);
    return () => clearInterval(id);
  }, [rotate]);

  const stats = [
    { value: '360°', label: 'View Rotation',   sub: 'Explore from any angle',         icon: <RotateCw className="w-5 h-5" /> },
    { value: '4K',   label: 'Resolution',       sub: 'High quality output',            icon: <Camera className="w-5 h-5" /> },
    { value: 'Real-time', label: 'Rendering',   sub: 'Instant preview updates',        icon: <Zap className="w-5 h-5" /> },
    { value: 'VR',   label: 'Ready Export',     sub: 'Immersive client experience',    icon: <Eye className="w-5 h-5" /> },
  ];

  const services = [
    { title: 'Residential 3D Plans',   description: 'Photorealistic 3D floor plans for homes, apartments and villas.',       icon: <Building className="w-8 h-8" /> },
    { title: 'Commercial Spaces',       description: 'Detailed 3D layouts for offices, retail and hospitality spaces.',       icon: <Layers className="w-8 h-8" /> },
    { title: 'Architectural Models',    description: 'Full-scale architectural 3D models with exterior and interior views.',  icon: <Box className="w-8 h-8" /> },
    { title: 'VR Walkthroughs',         description: 'Immersive VR-ready floor plans for interactive client presentations.', icon: <Video className="w-8 h-8" /> },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !heroSliderRef.current) return;
    e.preventDefault();
    const rect = heroSliderRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const addToCart = () => {
    const pricePerImage = 0.35, imageCount = 1;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: '3D Floor Plan', qty: 1, price: pricePerImage,
      retouching: '3D Floor Plan', order_name: '3D Floor Plan',
      order_images: imageCount, order_details: current.desc, addons: [], total };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch { document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/'; }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
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
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Real Estate Editing</span>
            </motion.div>

            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Design', 'Editing'].map((word, i) => (
                <motion.span key={word} className={`block ${
                  i === 0 ? 'text-[#E8352A]' : 'text-white'
                } text-[clamp(3rem,8vw,7rem)]`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Create photorealistic 3D floor plan designs with accurate layouts, furniture placement,
              lighting simulation, and VR-ready exports to showcase properties effectively.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)] hover:scale-105">
                Get Start For Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:border-[#E8352A]/50 hover:text-white hover:bg-white/5 transition-all">
                View Examples
              </button>
            </motion.div>

            <motion.div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL — full-height before/after */}
          <motion.div className="relative flex flex-col lg:h-screen"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            <div ref={heroSliderRef}
              className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0"
              style={{ minHeight: 340 }}
              onMouseMove={(e) => { if (isDragging) handleSliderMove(e as any); }}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchMove={(e) => { if (isDragging) handleSliderMove(e as any); }}
              onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${current.image})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${current.image})`, width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
              </div>

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

              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                        activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'
                      }`}>
                      {tab === 'Design' && <Ruler className="w-4 h-4" />}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Design</span>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {floorPlanExamples.map((_, i) => (
                <button key={i} onClick={() => { setActiveIndex(i); setSliderPosition(50); }}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                  }`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#E8352A]">3D Floor Plan</span> Portfolio
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">Explore our collection of immersive 3D architectural visualizations.</p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Main display */}
            <div className="flex-1 flex flex-col gap-4 lg:max-w-[780px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={current.image}
                  initial={{ opacity: 0, x: slideDirection === 'right' ? 60 : -60, scale: 1.02 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: slideDirection === 'right' ? -60 : 60, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[320px] sm:min-h-[420px] max-h-[520px] sm:max-h-[620px] aspect-[4/3] cursor-pointer"
                  onMouseEnter={() => setGalleryHovered(true)}
                  onMouseLeave={() => setGalleryHovered(false)}>
                  <motion.img src={current.image} alt={current.title}
                    className="w-full h-full object-cover"
                    animate={{ x: galleryHovered ? 0 : ['-4%', '4%', '-4%'], scale: 1.08 }}
                    transition={{ x: { repeat: Infinity, duration: 8, ease: 'easeInOut' }, scale: { duration: 0 } }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-white font-bold text-lg">{current.title}</h3>
                  <p className="text-white/80 text-sm mt-0.5">{current.desc}</p>
                </div>
                {/* Pause indicator on hover */}
                {galleryHovered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#1A1A1A]/70 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-full">
                    <span className="flex gap-0.5">
                      <span className="w-0.5 h-3 bg-white rounded-full" />
                      <span className="w-0.5 h-3 bg-white rounded-full" />
                    </span>
                    Paused
                  </motion.div>
                )}
              </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => {
                    setSlideDirection('left');
                    setActiveIndex(i => (i - 1 + floorPlanExamples.length) % floorPlanExamples.length);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => {
                    setSlideDirection('right');
                    setActiveIndex(i => (i + 1) % floorPlanExamples.length);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">3D Floor Plan</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Photorealistic 3D floor plans with full furniture, lighting and VR export.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.35 <span className="text-base font-normal text-[#555]">/ plan</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['360° Interactive View','4K Resolution Output','Furniture Placement','Lighting Simulation',
                  'VR / AR Export Ready','24-Hour Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">3D</span> Services
            </h2>
            <p className="text-xl text-gray-600">Comprehensive 3D visualization for every architectural need.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
               {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
