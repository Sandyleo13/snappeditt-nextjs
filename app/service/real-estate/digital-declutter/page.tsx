// app/digital-declutter/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trash2, Folder, CheckCircle, Shield, Zap, Search,
  ArrowRight, Image as ImageIcon, Eye, Database,
  ChevronLeft, ChevronRight, Clock,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';

export default function DigitalDeclutterPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Scan');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);        // hero slider
  const gallerySliderRef = useRef<HTMLDivElement>(null); // gallery slider

  const imageExamples = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=85&auto=format&fit=crop&brightness=58&saturation=40',
      afterImage:  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&q=85&auto=format&fit=crop',
      description: 'Remove clutter, furniture, and distracting objects from property photos.',
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&auto=format&fit=crop&brightness=56&saturation=38',
      afterImage:  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&auto=format&fit=crop',
      description: 'Clean up bedrooms by removing personal items for a neutral listing look.',
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop&brightness=55&saturation=38',
      afterImage:  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85&auto=format&fit=crop',
      description: 'Kitchen declutter — remove appliances and personal items for a cleaner shot.',
    },
  ];

  const stats = [
    { value: '2.5TB', label: 'Space Reclaimed',  sub: 'More space for what matters',      icon: <Database   className="w-5 h-5" /> },
    { value: '15K+',  label: 'Files Organized',   sub: 'Automatically sorted & arranged',  icon: <Folder     className="w-5 h-5" /> },
    { value: '98%',   label: 'Accuracy Rate',     sub: 'AI-powered precision',             icon: <Eye        className="w-5 h-5" /> },
    { value: '60%',   label: 'Faster Access',     sub: 'Find files in half the time',      icon: <Zap        className="w-5 h-5" /> },
  ];

  const editorTabs = ['Scan', 'Remove', 'Organize', 'Review'];

  const services = [
    { title: 'Object Removal',      description: 'Remove unwanted objects, furniture and clutter from property photos.',          icon: <Trash2    className="w-6 h-6" /> },
    { title: 'Smart Scan',          description: 'AI scans and identifies every distracting element in the image.',               icon: <Search    className="w-6 h-6" /> },
    { title: 'Remove Duplicates',   description: 'Eliminate duplicate shots and near-identical images from your shoot.',          icon: <Shield    className="w-6 h-6" /> },
    { title: 'Auto Organise',       description: 'Files intelligently sorted into smart categories ready for delivery.',          icon: <Folder    className="w-6 h-6" /> },
    { title: 'Photo Clean-up',      description: 'Remove personal items, cords, and distractions from every room.',              icon: <ImageIcon className="w-6 h-6" /> },
    { title: 'Storage Reclaim',     description: 'Free up gigabytes by purging temporary files and junk data.',                   icon: <HardDrive className="w-6 h-6" /> },
    { title: 'Quick Delivery',      description: '24-hour turnaround on all declutter and cleanup orders.',                       icon: <Clock     className="w-6 h-6" /> },
    { title: 'Quality Check',       description: 'Every cleaned image is reviewed before final delivery.',                        icon: <CheckCircle className="w-6 h-6" /> },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    // determine which ref is active
    const activeRef = sliderRef.current?.contains(e.target as Node) ? sliderRef : gallerySliderRef;
    if (!activeRef.current) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
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

  const changeImage = (i: number) => { setCurrentImageIndex(i); setSliderPosition(50); };
  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.15;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'De-Clutter Objects', qty: 1, price: pricePerImage,
      retouching: 'De-Clutter Objects', order_name: 'Digital Declutter Service',
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

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial blobs */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />

          {/* Orbit SVG rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation: 'ddCW 8s linear infinite', transformOrigin: '820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation: 'ddCCW 12s linear infinite', transformOrigin: '820px 340px' }}/>
          </svg>

          {/* Red spheres */}
          <motion.div animate={{ y: [-13, 13, -13] }} transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
            style={{ position:'absolute', right:'6%', top:'7%', width:52, height:52, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow:'0 10px 30px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y: [9, -9, 9] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.8 }}
            style={{ position:'absolute', right:'8%', top:'50%', width:24, height:24, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow:'0 5px 16px rgba(232,53,42,0.26)' }} />

          {/* Glass spheres */}
          <motion.div animate={{ y: [-11, 11, -11] }} transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut' }}
            style={{ position:'absolute', left:'5%', top:'46%', width:60, height:60, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow:'0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border:'1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y: [8,-8,8] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut', delay: 0.7 }}
            style={{ position:'absolute', left:'12%', bottom:'28%', width:28, height:28, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow:'0 3px 12px rgba(15,23,42,0.07)', border:'1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y: [-8,8,-8] }} transition={{ repeat: Infinity, duration: 5.1, ease: 'easeInOut', delay: 1.2 }}
            style={{ position:'absolute', right:'11%', top:'53%', width:36, height:36, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow:'0 4px 14px rgba(15,23,42,0.08)', border:'1px solid rgba(208,218,234,0.35)' }} />
          <motion.div animate={{ y: [-5,5,-5] }} transition={{ repeat: Infinity, duration: 3.7, ease: 'easeInOut', delay: 0.4 }}
            style={{ position:'absolute', left:'46%', top:'6%', width:15, height:15, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.96) 0%,rgba(218,226,242,0.40) 70%)',
              boxShadow:'0 2px 6px rgba(15,23,42,0.06)', border:'1px solid rgba(208,218,234,0.30)' }} />

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
            <filter id="declutter-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#declutter-noise)" />
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="declutter-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#declutter-grid)" /></svg>
          {[6, 4, 8, 5, 3, 7].map((size, i) => <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: size, height: size, left: `${[12, 28, 45, 62, 75, 88][i]}%`, top: `${[20, 65, 15, 75, 35, 55][i]}%`, filter: 'blur(1px)' }} />)}
        </div>

        <style>{`
          @keyframes ddCW  { to { stroke-dashoffset: -1800; } }
          @keyframes ddCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col px-8 pb-12 pt-24 sm:px-12 lg:grid lg:grid-cols-2 lg:px-16 lg:py-0 xl:px-24">
          <div className="grid min-h-screen grid-cols-1 items-stretch lg:contents">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col justify-center gap-6 px-2 text-center lg:items-start lg:px-0 lg:text-left"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.7, ease:'easeOut' }}>

              {/* Badge */}
              <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                className="inline-flex items-center gap-2 self-center rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm lg:self-start">
                <Zap className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-[#E8352A] text-xs font-semibold tracking-wide">AI-Powered Organization</span>
              </motion.div>

              {/* Heading */}
              <h1 className="font-extrabold leading-[0.95] tracking-tight">
                <motion.span className="block text-[#E8352A] text-[clamp(3rem,8vw,7rem)]"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.30, duration:0.55 }}>
                  De-
                </motion.span>
                <span className="block text-white text-[clamp(3rem,8vw,7rem)]">clutter</span>
              </h1>

              <motion.p className="max-w-xl text-xl font-semibold leading-snug text-white/90 sm:text-2xl md:text-3xl"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.5 }}>
                Organization & Cleanup Magic
              </motion.p>

              <motion.p className="mx-auto max-w-xl text-base leading-relaxed text-[#A0A0B0] md:text-lg lg:mx-0"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.54, duration:0.5 }}>
                Transform digital chaos into organized perfection. Watch as AI magically organizes files,
                removes duplicates, and creates order from digital mess.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1 justify-center lg:justify-start w-full max-w-xl mx-auto lg:mx-0"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.66, duration:0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex justify-center items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105 w-full sm:w-auto">
                  Get Start For Free
                </Link>
              </motion.div>

              {/* Feature pills */}
             
            </motion.div>

            {/* ── RIGHT: before / after image slider ── */}
            <motion.div className="relative flex flex-col lg:h-screen"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Slider container */}
              <div
                ref={sliderRef}
                className="relative mt-4 min-h-[340px] w-full flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl shadow-2xl lg:mt-0 lg:rounded-none"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* AFTER (base layer) */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${imageExamples[currentImageIndex].afterImage})` }}
                />
                {/* BEFORE (clipped layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${imageExamples[currentImageIndex].beforeImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
                    }}
                  />
                </div>

                {/* Divider line + handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft  className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">After</span>

                <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Zap className="h-3.5 w-3.5 text-[#E8352A]" />
                  <span className="whitespace-nowrap text-[11px] font-semibold text-white">AI-Assisted Declutter</span>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                  <div className="flex items-center justify-between gap-2">
                    {editorTabs.map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
                        {tab === 'Scan' && <Search className="h-4 w-4" />}
                        {tab === 'Remove' && <Trash2 className="h-4 w-4" />}
                        {tab === 'Organize' && <Folder className="h-4 w-4" />}
                        {tab === 'Review' && <CheckCircle className="h-4 w-4" />}
                        <span className="text-[9px] font-semibold">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbnail nav */}
              <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
                {imageExamples.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentImageIndex(i); setSliderPosition(50); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentImageIndex ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Caption */}
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div className="grid grid-cols-2 gap-4 border-t border-white/10 px-8 pb-8 pt-14 sm:px-12 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-[calc(50%-4rem)] lg:grid-cols-4 lg:px-0 lg:pb-0 lg:pt-0 xl:left-24 xl:w-[calc(50%-8rem)]"
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.0 }}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold text-white lg:text-3xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERY
      ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Transformation</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real property photos before and after professional object removal and decluttering.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch px-4 sm:px-0">
            <div className="flex-1 flex flex-col w-full max-w-full">
              <div ref={gallerySliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px] w-full max-w-full"
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentImage.beforeImage})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentImage.afterImage})`,
                      width: gallerySliderRef.current ? `${gallerySliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{ left:`${sliderPosition}%`, transform:'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft  className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Cluttered</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Decluttered</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5 w-full">
                <button onClick={() => changeImage((currentImageIndex-1+imageExamples.length)%imageExamples.length)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  <ChevronLeft className="w-4 h-4"/> Prev
                </button>
                  <button onClick={() => changeImage((currentImageIndex+1)%imageExamples.length)}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow w-full sm:w-auto">
                  Next <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            </div>

            <div className="w-full lg:w-80 xl:w-96 max-w-xl bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col mx-auto lg:mx-0">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">De-Clutter Objects</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional removal of clutter and unwanted objects from real estate photos.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.15 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Object & Clutter Removal','Furniture Removal','Personal Items Cleanup','Cord & Cable Removal','Sky Cleaning','24-Hour Delivery'].map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-[#333]">
                    <CheckCircle className="w-4 h-4 text-[#E8352A] flex-shrink-0"/>{feat}
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
              <span className="text-[#E8352A]">Declutter</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive digital cleanup for photographers and real estate studios.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                   <span className="w-10 h-10 flex items-center justify-center">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
