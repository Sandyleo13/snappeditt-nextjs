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
    { title: 'Ambient Lighting', description: 'Professional ambient light blending for interior and exterior shots.', icon: <Sparkles className="w-6 h-6" /> },
    { title: 'Color Grading', description: 'Cinematic color grading with AI-powered mood analysis.', icon: <Palette className="w-6 h-6" /> },
    { title: 'Depth Enhancement', description: 'Create 3D depth and focal plane adjustments for drama.', icon: <Layers className="w-6 h-6" /> },
    { title: 'Batch Processing', description: 'Process entire shoots with consistent flambient effects.', icon: <Settings className="w-6 h-6" /> },
    { title: 'HDR Merging', description: 'Merge bracketed exposures into one perfectly balanced image.', icon: <Camera className="w-6 h-6" /> },
    { title: 'Flash Blend', description: 'Seamlessly blend flash and ambient light for natural results.', icon: <Sun className="w-6 h-6" /> },
    { title: 'Sky Enhancement', description: 'Replace or enhance skies for stronger exterior impact.', icon: <Wand2 className="w-6 h-6" /> },
    { title: 'Object Removal', description: 'Clean up distracting elements for polished final images.', icon: <CheckCircle className="w-6 h-6" /> },
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

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.10) 0%, transparent 70%)' }} />
          <div className="absolute -right-20 -top-20 w-[380px] h-[380px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.08) 0%, transparent 70%)' }} />
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

 

              {/* Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight">
                <motion.span className="block text-[#1A1A1A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }}>
                  Flambient
                </motion.span>
                <motion.span className="block text-[#E8352A]"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30, duration: 0.55 }}>
                  Editing
                </motion.span>
              </h1>

              {/* Subheading */}
              <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}>
                Cinematic Photo Transformation
              </motion.p>

              {/* Description */}
              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54, duration: 0.5 }}>
                Transform ordinary photos into cinematic masterpieces with AI-powered ambient
                lighting and color grading. Create professional Hollywood-style visuals that
                make every property listing stand out.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">         
                  Get Start For Free
                </Link>
              
              </motion.div>

              {/* Feature pills */}
        
            </motion.div>

            {/* ── RIGHT: Before/After + Editor toolbar ── */}
            <motion.div className="relative flex flex-col items-center"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Side icon accents */}
              <div className="absolute -right-3 top-1/3 z-20 hidden lg:flex items-center justify-center w-10 h-10 bg-white rounded-xl shadow-lg border border-[#eee]">
                <svg className="w-4 h-4 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="absolute -right-3 top-1/2 z-20 hidden lg:flex items-center justify-center w-10 h-10 bg-[#E8352A] rounded-xl shadow-lg mt-2">
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
                {/* After clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImage.afterImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
                </div>
                {/* Divider */}
                <div className="absolute top-0 bottom-0 z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
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
                    {tab === 'Ambient' && <Sparkles className="w-4 h-4" />}
                    {tab === 'Blend'   && <Layers   className="w-4 h-4" />}
                    {tab === 'Grade'   && <Palette  className="w-4 h-4" />}
                    {tab === 'Depth'   && <Wand2    className="w-4 h-4" />}
                    {tab === 'Export'  && <Settings className="w-4 h-4" />}
                    <span className={`text-[10px] font-semibold ${activeTab === tab ? 'text-[#E8352A]' : ''}`}>{tab}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

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
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  Explore tool <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
