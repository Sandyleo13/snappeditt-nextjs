// app/flambient-editing/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Sparkles, Layers, Palette, CheckCircle,
  ArrowRight, Wand2, Settings, ChevronLeft, ChevronRight,
  Sun
} from 'lucide-react';
import Link from 'next/link';

export default function FlambientEditingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Ambient');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  const editingExamples = [
    {
      id: 1,
      beforeTitle: 'Flat Photo',
      afterTitle: 'Flambient Masterpiece',
      beforeImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=20&saturation=150',
      description: 'Add cinematic depth and ambient lighting to flat property photos.',
    },
    {
      id: 2,
      beforeTitle: 'Harsh Lighting',
      afterTitle: 'Soft Ambient Light',
      beforeImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=15',
      description: 'Convert harsh lighting into soft, balanced ambient illumination.',
    },
    {
      id: 3,
      beforeTitle: 'Basic Colors',
      afterTitle: 'Cinematic Grade',
      beforeImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop&saturation=180&contrast=25&brightness=105',
      description: 'Transform basic palettes into rich cinematic color grades.',
    },
  ];

  const stats = [
    { value: '95%', label: 'Time Saved vs Manual' },
    { value: '100K+', label: 'Presets Available' },
    { value: '4.8/5', label: 'User Rating' },
    { value: '50K+', label: 'Active Creators' },
  ];

  const editorTabs = ['Ambient', 'Blend', 'Grade', 'Depth', 'Export'];

  const services = [
    { title: 'Ambient Lighting', description: 'Professional ambient light blending for interior and exterior shots.', icon: <Sparkles className="w-6 h-6" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Color Grading', description: 'Cinematic color grading with AI-powered mood analysis.', icon: <Palette className="w-6 h-6" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Depth Enhancement', description: 'Create 3D depth and focal plane adjustments for drama.', icon: <Layers className="w-6 h-6" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Batch Processing', description: 'Process entire shoots with consistent flambient effects.', icon: <Settings className="w-6 h-6" />, color: '#10B981', bg: '#ECFDF5' },
    { title: 'HDR Merging', description: 'Merge bracketed exposures into one perfectly balanced image.', icon: <Camera className="w-6 h-6" />, color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Flash Blend', description: 'Seamlessly blend flash and ambient light for natural results.', icon: <Sun className="w-6 h-6" />, color: '#EC4899', bg: '#FDF2F8' },
    { title: 'Sky Enhancement', description: 'Replace or enhance skies for stronger exterior impact.', icon: <Wand2 className="w-6 h-6" />, color: '#6366F1', bg: '#EEF2FF' },
    { title: 'Object Removal', description: 'Clean up distracting elements for polished final images.', icon: <CheckCircle className="w-6 h-6" />, color: '#14B8A6', bg: '#F0FDFA' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, targetRef = sliderRef) => {
    if (!isDragging || !targetRef.current) return;
    e.preventDefault();
    const rect = targetRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 1.5;
        if (next >= 100) { sliderDirectionRef.current = -1; return 100; }
        if (next <= 0)   { sliderDirectionRef.current =  1; return 0;   }
        return next;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [isDragging, isHoveringSlider]);

  const changeImage = (index: number) => { setCurrentImageIndex(index); setSliderPosition(50); };
  const currentImage = editingExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.18;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Flambient Editing', qty: 1, price: pricePerImage,
      retouching: 'Flambient Editing', order_name: currentImage.afterTitle,
      order_images: imageCount, order_details: currentImage.description, addons: [], total,
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

      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg"><filter id="flambient-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter><rect width="100%" height="100%" filter="url(#flambient-noise)" /></svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="flambient-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#flambient-grid)" /></svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: size, height: size, left: `${[12, 28, 45, 62, 75, 88][i]}%`, top: `${[20, 65, 15, 75, 35, 55][i]}%`, filter: 'blur(1px)' }} />)}
        </div>
        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" /><span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">Flambient Editing</span></motion.div>
            <h1 className="mb-6 font-extrabold leading-[0.95] tracking-tight">{['Flambient', 'Photo', 'Editing'].map((word, i) => <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`} initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>)}</h1>
            <motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>Transform ordinary property photos with cinematic ambient lighting, precise flash blending, and rich color grading that makes every listing stand out.</motion.p>
            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}><Link href="/free-trial" className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20]">Get Started Free<ArrowRight className="h-4 w-4 text-current transition-transform group-hover:translate-x-1" /></Link><button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">View Examples</button></motion.div>
            <motion.div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>{stats.map((stat, i) => <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}><p className="text-2xl font-extrabold text-white lg:text-3xl">{stat.value}</p><p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">{stat.label}</p></motion.div>)}</motion.div>
          </div>
          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div ref={heroSliderRef} className="relative mx-4 mt-4 min-h-[340px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none" onMouseMove={(e) => handleSliderMove(e, heroSliderRef)} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchMove={(e) => handleSliderMove(e, heroSliderRef)} onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentImage.beforeImage})`, filter: 'brightness(0.7) saturate(0.6)' }} /><div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentImage.afterImage})`, width: `${100 / Math.max(sliderPosition, 1) * 100}%` }} /></div>
              <div className="absolute bottom-0 top-0 z-10" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}><div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/60" /><div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-2xl"><ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" /><ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" /></div></div>
              <span className="absolute left-5 top-5 z-10 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Before</span><span className="absolute right-5 top-5 z-10 rounded-full bg-[#E8352A] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">After</span>
              <motion.div animate={{ y: isHoveringSlider ? [-4, 4, -4] : 0 }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"><Sparkles className="h-3.5 w-3.5 text-[#E8352A]" /><span className="whitespace-nowrap text-[11px] font-semibold text-white">AI-Assisted Manual Edit</span></motion.div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5"><div className="flex items-center justify-between gap-2">{editorTabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>{tab === 'Ambient' && <Sparkles className="h-4 w-4" />}{tab === 'Blend' && <Layers className="h-4 w-4" />}{tab === 'Grade' && <Palette className="h-4 w-4" />}{tab === 'Depth' && <Wand2 className="h-4 w-4" />}{tab === 'Export' && <Settings className="h-4 w-4" />}<span className="text-[9px] font-semibold">{tab}</span></button>)}</div></div>
            </div>
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">{editingExamples.map((_, i) => <button aria-label={`Show example ${i + 1}`} key={i} onClick={() => changeImage(i)} className={`rounded-full transition-all duration-300 ${currentImageIndex === i ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />)}</div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY SECTION
      ══════════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">Flambient Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              See ordinary photos transform into cinematic masterpieces.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Slider */}
            <div className="flex-1 flex flex-col">
              <div ref={sliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: `${100 / Math.max(sliderPosition, 1) * 100}%` }} />
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
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Flambient</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => changeImage((currentImageIndex - 1 + editingExamples.length) % editingExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeImage((currentImageIndex + 1) % editingExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Flambient Editing</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Cinematic ambient lighting and color grading for professional real estate photography.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.18 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Ambient Light Blending','Color Grading','Exposure Correction','Shadow & Highlight Recovery','White Balance Adjustment','Natural Flambient Look'].map(feat => (
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

      {/* ══════════════════════════════════════════
          RELATED SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Editing</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive cinematic editing tools for photographers and content creators.
            </p>
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
                          <p className="mb-3">{service.description} More about this service, examples, turnaround times, and common use-cases.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/real-estate/flambient-editing/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
