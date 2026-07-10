// app/single-exposure/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Camera, Sparkles, Shield, CheckCircle,
  ArrowRight, Image as ImageIcon,
  BarChart, Target, ChevronRight, ChevronLeft,
  Sun, Contrast, Layers, Wand2
} from 'lucide-react';
import Link from 'next/link';

export default function SingleExposurePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const [activeTab, setActiveTab] = useState('Exposure');
  const sliderDirectionRef = useRef<1 | -1>(1);
  const sliderRef = useRef<HTMLDivElement>(null);

  const imageExamples = [
    {
      id: 1,
      beforeTitle: 'Dark Interior',
      afterTitle: 'Bright & Inviting Interior',
      beforeImage: '/images/Real-Estate-Single_Exposure-S-Raw-2.webp',
      afterImage: '/images/Real-Estate-Single_Exposure-S-Corrected-2.webp',
      description: 'Brighten dark interiors and achieve balanced exposure with manual retouching.',
    },
    {
      id: 2,
      beforeTitle: 'Uneven Lighting',
      afterTitle: 'Balanced Natural Exposure',
      beforeImage: '/images/Real-Estate-Single_Exposure-S-Raw-1.webp',
      afterImage: '/images/Real-Estate-Single_Exposure-S-Corrected-1.webp',
      description: 'Correct inconsistent lighting for a clean, natural property presentation.',
    },
    {
      id: 3,
      beforeTitle: 'Flat Exterior',
      afterTitle: 'Vibrant Property Exterior',
      beforeImage: '/images/real-estate-basic-sky-explosure-before.webp',
      afterImage: '/images/real-estate-basic-sky-explosure-after.webp',
      description: 'Enhance exterior shots with richer color and improved curb appeal.',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Photos Edited' },
    { value: '24hr', label: 'Delivery Time' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '10+', label: 'Years Experience' },
  ];

  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  const services = [
    { title: 'HDR Photo Editing', description: 'Enhance dynamic range while preserving natural detail in every room.', icon: <Camera className="w-6 h-6" /> },
    { title: 'Day to Dusk', description: 'Turn daytime property shots into elegant evening scenes for marketing.', icon: <Sparkles className="w-6 h-6" /> },
    { title: 'Virtual Staging', description: 'Prepare spaces for listings with photo-ready staging support.', icon: <ImageIcon className="w-6 h-6" /> },
    { title: 'Sky Replacement', description: 'Replace dull skies with clean, attractive backdrops.', icon: <Target className="w-6 h-6" /> },
    { title: 'Object Removal', description: 'Remove distractions for cleaner, more professional property images.', icon: <Shield className="w-6 h-6" /> },
    { title: 'Image Enhancement', description: 'Sharpen detail, refine color, and improve overall visual appeal.', icon: <CheckCircle className="w-6 h-6" /> },
    { title: 'Floor Plan Redraw', description: 'Create polished floor plan visuals for property marketing.', icon: <BarChart className="w-6 h-6" /> },
    { title: 'Virtual Renovation', description: 'Showcase property potential with realistic renovation mockups.', icon: <Layers className="w-6 h-6" /> },
  ];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const rect = sliderRef.current.getBoundingClientRect();
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

  const changeImage = (index: number) => {
    setCurrentImageIndex(index);
    setSliderPosition(50);
  };

  const currentImage = imageExamples[currentImageIndex];

  const addToCart = () => {
    const pricePerImage = 0.12;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Single Exposure Editing', qty: 1, price: pricePerImage,
      retouching: 'Single Exposure Editing', order_name: currentImage.afterTitle,
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

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">
        {/* Soft background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.10) 0%, transparent 70%)' }} />
          <div className="absolute -right-20 -top-20 w-[380px] h-[380px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.08) 0%, transparent 70%)' }} />
          {/* Floating dots */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[42%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[18%] top-[22%] w-3.5 h-3.5 rounded-full bg-[#E8352A]/40" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[15%] bottom-[28%] w-2 h-2 rounded-full bg-[#E8352A]/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}>

              {/* Badge */}
           

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight">
                <motion.span className="block text-[#1A1A1A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Single
                </motion.span>
                <motion.span className="block text-[#E8352A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Exposure
                </motion.span>
              </h1>

              {/* Subheading */}
              <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Real Estate Photo Enhancement
              </motion.p>

              {/* Description */}
              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
                Transform property photographs with expert manual editing. Our retouchers carefully
                adjust lighting, colors, contrast, and perspective to deliver bright, natural,
                market-ready images.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">
                  Get Start For Free
                </Link>
                 <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all">
                  View Examples
                </button>
              </motion.div>

            
            </motion.div>

            {/* ── RIGHT: Before/After + Editor toolbar ── */}
            <motion.div className="relative flex flex-col items-center gap-0"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Floating filter settings icon */}
              <div className="absolute -right-3 top-1/3 z-20 hidden lg:flex flex-col items-center justify-center w-10 h-10 bg-white rounded-xl shadow-lg border border-[#eee]">
                <svg className="w-4 h-4 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="absolute -right-3 top-1/2 z-20 hidden lg:flex flex-col items-center justify-center w-10 h-10 bg-[#E8352A] rounded-xl shadow-lg mt-2">
                <Sparkles className="w-4 h-4 text-white" />
              </div>

              {/* Before/After card */}
              <div
                ref={sliderRef}
                className="relative overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio: '4/3', border: '2px solid rgba(255,255,255,0.9)' }}
                onMouseMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchMove={handleSliderMove}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* Before */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentImage.beforeImage})` }} />
                {/* After — clipped left side */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                {/* Divider */}
                <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/80" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]"
                    style={{ boxShadow: '0 4px 16px rgba(232,53,42,0.30)' }}>
                    <div className="flex gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>
                {/* Labels */}
                <span className="absolute top-3 left-3 z-10 bg-[#1A1A1A]/75 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Before</span>
                <span className="absolute top-3 right-3 z-10 bg-[#E8352A] text-white text-[11px] font-semibold px-3 py-1 rounded-full">After</span>
              </div>

              {/* Editor toolbar */}
              <div className="w-full bg-white rounded-b-2xl border border-t-0 border-[#EBEBEB] shadow-lg px-4 py-3 flex items-center justify-between gap-2">
                {editorTabs.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all text-center ${
                      activeTab === tab ? 'bg-[#E8352A]/10 text-[#E8352A]' : 'text-[#888] hover:text-[#555]'
                    }`}>
                    {tab === 'Exposure'   && <Sun      className="w-4 h-4" />}
                    {tab === 'Contrast'   && <Contrast className="w-4 h-4" />}
                    {tab === 'Highlights' && <Sun      className="w-4 h-4 opacity-70" />}
                    {tab === 'Shadows'    && <Layers   className="w-4 h-4" />}
                    {tab === 'Color'      && <Wand2    className="w-4 h-4" />}
                    <span className={`text-[10px] font-semibold ${activeTab === tab ? 'text-[#E8352A]' : ''}`}>{tab}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Stats bar ── */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }}>
            {stats.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm px-5 py-4 text-center group hover:border-[#E8352A]/30 hover:scale-105 transition-all duration-300">
                <p className="text-2xl font-bold text-[#1A1A1A] group-hover:text-[#E8352A] transition-colors">{s.value}</p>
                <p className="text-xs text-[#888] mt-1">{s.label}</p>
                {/* mini sparkline */}
                <svg viewBox="0 0 80 20" className="w-full mt-2 opacity-50" fill="none">
                  <polyline points="0,15 15,10 30,13 45,5 60,9 80,3"
                    stroke="#E8352A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
            ))}
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
              See the <span className="text-[#E8352A]">Transformation</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Explore before and after comparisons from our real estate photo studio.
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
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Raw</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Corrected</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button onClick={() => changeImage((currentImageIndex - 1 + imageExamples.length) % imageExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button onClick={() => changeImage((currentImageIndex + 1) % imageExamples.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Single Exposure Editing</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">Professional manual retouching for real estate property photographs.</p>
              <div className="text-2xl font-bold text-[#111] mb-4">$0.12 <span className="text-base font-normal text-[#555]">/ image</span></div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Exposure Correction','Color Enhancement','White Balance Adjustment','Shadow & Highlight Recovery','Perspective Correction','Window View Enhancement'].map(feat => (
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
              Related <span className="text-[#E8352A]">Services</span>
            </h2>
            <p className="text-xl text-gray-600">
              Additional real estate photo services designed to make listings look their best.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
