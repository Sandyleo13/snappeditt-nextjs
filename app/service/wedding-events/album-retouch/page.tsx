// app/album-retouch/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Layers, Camera, Sparkles,
  ArrowRight, Zap, Eye, Shield, CheckCircle,
  Palette, Sun, Wand2, Grid3x3,
  ChevronLeft, ChevronRight
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

export default function AlbumRetouchPage() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [sliderPosition, setSliderPosition]           = useState(50);
  const [isDragging, setIsDragging]                   = useState(false);
  const [isHoveringSlider, setIsHoveringSlider]       = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

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
    { title:'Wedding Albums',  description:'Professional retouching for every spread in your wedding album.',        icon:<BookOpen className="w-6 h-6"/> },
    { title:'Family Albums',   description:'Consistent color grading and enhancement for family photo collections.', icon:<Grid3x3 className="w-6 h-6"/> },
    { title:'Portrait Albums', description:'Artistic enhancement for portrait series and model portfolios.',         icon:<Camera className="w-6 h-6"/> },
    { title:'Event Albums',    description:'Complete retouching for corporate and social event photo albums.',       icon:<Sparkles className="w-6 h-6"/> },
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
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* --------------------------------------  HERO  -------------------------------------- */}
      <section className="relative bg-[#F8F9FB] overflow-hidden">

        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.09) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[440px] h-[440px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[240px] rounded-full"
            style={{ background:'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="270" ry="200" stroke="#E8352A" strokeWidth="1.6" opacity="0.38"
              strokeDasharray="200 1600" style={{ animation:'arCW 8s linear infinite', transformOrigin:'820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation:'arCCW 12s linear infinite', transformOrigin:'820px 340px' }}/>
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
          @keyframes arCW  { to { stroke-dashoffset: -1800; } }
          @keyframes arCCW { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 lg:px-12 xl:px-16 pt-20 pb-10 lg:pt-28 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* -- LEFT TEXT -- */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:'easeOut' }}>



              {/* Heading */}
              <div>
                <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.55 }}>
                  Album <span className="text-[#E8352A]">Retouch</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug mt-2"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.5 }}>
                  Every Page, Perfected
                </motion.p>
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.5 }}>
                Transform your entire photo album into a stunning collection. Our AI-powered retouching
                ensures consistent color, tone, and quality across every single page.
              </motion.p>

             
           

              {/* CTAs */}
              <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.64, duration:0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">
                  Get Start For Free
                </Link>
                <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior:'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all">
                 View Examples
                </button>
              </motion.div>

            
            </motion.div>

            {/* -- RIGHT: Slider + album badge + feature badges -- */}
            <motion.div className="flex flex-col gap-3 relative"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Album pages counter badge */}
              <AlbumBadge pages={currentExample.pages} />

              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio:'4/3' }}
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER � base */}
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentExample.afterImage})` }} />
                {/* BEFORE � clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentExample.beforeImage})`,
                      width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
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

                {/* Page spread mini overlay */}
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:1.3 }}
                  className="absolute bottom-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_,i) => (
                      <div key={i} className={`h-8 rounded transition-all ${i === 2 ? 'w-12 bg-[#E8352A]/20 border-2 border-[#E8352A]' : 'w-8 bg-[#F0F0F0]'}`}
                        style={{ backgroundSize:'cover', backgroundPosition:'center',
                          backgroundImage: i === 2 ? `url(${currentExample.afterImage})` : undefined }} />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-[#1A1A1A] leading-none">Page Layout Preview</p>
                    <p className="text-[8px] text-[#999] mt-0.5">{currentExample.pages} pages � Consistent grading</p>
                  </div>
                </motion.div>
              </div>

              {/* Feature badges */}
              <motion.div className="grid grid-cols-4 gap-2"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}>
                {[
                  { icon:<Layers className="w-4 h-4"/>,   label:'Consistent',   sub:'Style' },
                  { icon:<Wand2 className="w-4 h-4"/>,    label:'Skin',         sub:'Retouch' },
                  { icon:<Palette className="w-4 h-4"/>,  label:'Color',        sub:'Harmony' },
                  { icon:<Sun className="w-4 h-4"/>,      label:'Light',        sub:'Perfect' },
                ].map((b,i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#F0F0F0] shadow-sm px-2.5 py-2.5 flex items-center gap-2">
                    <div className="text-[#E8352A] flex-shrink-0">{b.icon}</div>
                    <div>
                      <p className="text-[9px] font-bold text-[#1A1A1A] leading-tight">{b.label}</p>
                      <p className="text-[9px] text-[#999] leading-tight">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Dot nav */}
              <div className="flex items-center justify-center gap-2">
                {transformationExamples.map((_,i) => (
                  <button key={i} onClick={() => changeExample(i)}
                    className={`rounded-full transition-all ${
                      i === currentExampleIndex % transformationExamples.length
                        ? 'w-5 h-2.5 bg-[#E8352A]'
                        : 'w-2.5 h-2.5 bg-[#CCC] hover:bg-[#E8352A]/60'}`} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --------------------------------------  GALLERY  -------------------------------------- */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Difference</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real album photos before and after professional retouching.
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
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Original</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Retouched</span>
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
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Album Retouch</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Complete album retouching with consistent style across every page.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.13 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Consistent Color Grading','Natural Skin Retouching','Lighting & Exposure Fix',
                  'Uniform Style Across Pages','Background Enhancement','48-Hour Delivery'].map(feat => (
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

      {/* --------------------------------------  SERVICES  -------------------------------------- */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Album</span> Services
            </h2>
            <p className="text-xl text-gray-600">Complete retouching solutions for every album type.</p>
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
