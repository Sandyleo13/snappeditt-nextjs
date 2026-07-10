// app/portrait-headshots-studio/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera, User, Star, Users,
  Sparkles, Zap, CheckCircle,
  ArrowRight, Eye, Shield,
  Wand2, Palette, Award,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── Animated "Profile Ready" badge ── */
function ProfileBadge() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setActive(true), 1400);
    return () => clearTimeout(t1);
  }, []);
  return (
    <motion.div initial={{ opacity:0, y:-12, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }}
      transition={{ delay:1.0, duration:0.5, ease:'easeOut' }}
      className="absolute -top-5 right-2 z-20 flex items-center gap-2.5 bg-white rounded-xl shadow-lg border border-[#E8E8E8] px-3 py-2">
      {/* Profile avatar mockup */}
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0077B5] to-[#005580] flex items-center justify-center">
          <User className="w-4.5 h-4.5 text-white w-5 h-5" />
        </div>
        <motion.div
          initial={{ scale:0 }} animate={{ scale: active ? 1 : 0 }}
          transition={{ type:'spring', stiffness:400, damping:20 }}
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <CheckCircle className="w-2 h-2 text-white" />
        </motion.div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-none">Profile Photo Ready</p>
        <p className="text-[9px] text-[#999] mt-0.5">LinkedIn • Portfolio • Corporate</p>
      </div>
    </motion.div>
  );
}

/* ── Portrait style tabs ── */
const portraitStyles = [
  { id:'corporate',     label:'Corporate',    img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=85&auto=format&fit=crop',
    desc:'Polished corporate headshots that make the perfect first impression.' },
  { id:'linkedin',      label:'LinkedIn',     img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85&auto=format&fit=crop',
    desc:'Transform casual selfies into professional LinkedIn profile photos.' },
  { id:'studio',        label:'Studio',       img:'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=900&q=85&auto=format&fit=crop',
    desc:'Studio-quality headshots with perfect lighting and skin retouching.' },
  { id:'creative',      label:'Creative',     img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=85&auto=format&fit=crop',
    desc:'Artistic portraits with creative lighting and colour grading.' },
  { id:'actor',         label:'Actor',        img:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&q=70&auto=format&fit=crop',
    before:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    after: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=900&q=85&auto=format&fit=crop',
    desc:'Actor & model portfolio headshots that showcase your personality.' },
];

export default function PortraitHeadshotsStudioPage() {
  const [activeStyle, setActiveStyle] = useState('corporate');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging]         = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef      = useRef<HTMLDivElement>(null);
  const gallerySliderRef   = useRef<HTMLDivElement>(null);

  const currentStyle = portraitStyles.find(s => s.id === activeStyle) ?? portraitStyles[0];

  const stats = [
    { value:'100K+', label:'Portraits Done',    sub:'Trusted worldwide',              icon:<Camera className="w-5 h-5"/> },
    { value:'24h',   label:'Turnaround Time',   sub:'Fast, reliable delivery',        icon:<Zap className="w-5 h-5"/> },
    { value:'5★',    label:'Client Rating',     sub:'Based on 3,000+ reviews',        icon:<Star className="w-5 h-5"/> },
    { value:'100%',  label:'Natural Results',   sub:'No over-retouched look',         icon:<Eye className="w-5 h-5"/> },
  ];

  const services = [
    { title:'Corporate Headshots', description:'Polished headshots for business profiles, teams, and websites.',      icon:<Award className="w-6 h-6"/> },
    { title:'LinkedIn Profiles',   description:'Profile-ready photos for LinkedIn and professional networks.',        icon:<User className="w-6 h-6"/> },
    { title:'Actor Portraits',     description:'Portfolio headshots for actors, models, and creative professionals.', icon:<Camera className="w-6 h-6"/> },
    { title:'Team Photos',         description:'Consistent retouching across entire team or group headshot sets.',    icon:<Users className="w-6 h-6"/> },
  ];

  useEffect(() => { sliderDirectionRef.current = 1; setSliderPosition(50); }, [activeStyle]);

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
  }, [isDragging, isHoveringSlider, activeStyle]);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const activeRef = heroSliderRef.current?.contains(e.target as Node) ? heroSliderRef : gallerySliderRef;
    if (!activeRef.current) return;
    e.preventDefault();
    const rect = activeRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const selectStyle = (id: string) => { setActiveStyle(id); setSliderPosition(50); };

  const addToCart = () => {
    const pricePerImage = 0.20, imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name:'Portrait & Headshots', qty:1, price:pricePerImage,
      retouching:'Portrait & Headshots', order_name:'Portrait & Headshots',
      order_images:imageCount, order_details:currentStyle.desc, addons:[], total };
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
              strokeDasharray="200 1600" style={{ animation:'phCW 8s linear infinite', transformOrigin:'820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.22"
              strokeDasharray="140 1200" style={{ animation:'phCCW 12s linear infinite', transformOrigin:'820px 340px' }}/>
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
          @keyframes phCW  { to { stroke-dashoffset: -1800; } }
          @keyframes phCCW { to { stroke-dashoffset:  1348; } }
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
                  Portrait <span className="text-[#E8352A]">Headshots</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-semibold text-[#333] leading-snug mt-2"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.5 }}>
                  Studio-Quality Retouching
                </motion.p>
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.42, duration:0.5 }}>
                Turn any photo into a professional headshot. Natural skin retouching, background
                replacement, and perfect lighting — ready for LinkedIn, corporate, or portfolio.
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

            {/* ── RIGHT: Slider + profile badge + style strip ── */}
            <motion.div className="flex flex-col gap-3 relative"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Profile ready badge */}
              <ProfileBadge />

              {/* Before/After slider */}
              <div ref={heroSliderRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none w-full"
                style={{ aspectRatio:'4/3' }}
                onMouseMove={handleSliderMove} onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
                onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

                {/* AFTER — base */}
                <motion.div key={`after-${activeStyle}`}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage:`url(${currentStyle.after})` }} />

                {/* BEFORE — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <motion.div key={`before-${activeStyle}`}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentStyle.before})`,
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
              </div>

              {/* Portrait style thumbnail strip */}
              <motion.div
                className="bg-white rounded-2xl border border-[#F0F0F0] shadow-lg px-3 py-3 flex items-center gap-1"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}>
                <button
                  onClick={() => { const i = portraitStyles.findIndex(s => s.id === activeStyle); selectStyle(portraitStyles[(i-1+portraitStyles.length)%portraitStyles.length].id); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2 flex-1 justify-around">
                  {portraitStyles.map(style => (
                    <button key={style.id} onClick={() => selectStyle(style.id)}
                      className="flex flex-col items-center gap-1.5 flex-shrink-0 transition-all">
                      <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                        activeStyle === style.id ? 'border-[#E8352A] shadow-md' : 'border-transparent hover:border-[#E8352A]/40'}`}>
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage:`url(${style.img})` }} />
                      </div>
                      <span className={`text-[9px] font-semibold ${activeStyle === style.id ? 'text-[#E8352A]' : 'text-[#999]'}`}>
                        {style.label}
                      </span>
                      {activeStyle === style.id && (
                        <motion.div layoutId="portStyleDot" className="w-4 h-0.5 bg-[#E8352A] rounded-full"
                          transition={{ type:'spring', stiffness:400, damping:30 }} />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { const i = portraitStyles.findIndex(s => s.id === activeStyle); selectStyle(portraitStyles[(i+1)%portraitStyles.length].id); }}
                  className="w-7 h-7 rounded-full border border-[#EEE] flex items-center justify-center hover:border-[#E8352A] hover:text-[#E8352A] transition-all flex-shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Caption */}
              <motion.p key={activeStyle} initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                className="text-center text-xs text-[#888] leading-snug px-4">
                {currentStyle.desc}
              </motion.p>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.0 }}>
            {stats.map((s,i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm px-5 py-4 flex items-start gap-3 group hover:border-[#E8352A]/30 hover:scale-105 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0EE] flex items-center justify-center flex-shrink-0 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors mt-0.5">
                  {s.icon}
                </div>
                <div>
                  <p className="text-xl font-bold text-[#E8352A]">{s.value}</p>
                  <p className="text-xs font-semibold text-[#1A1A1A] leading-tight">{s.label}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{s.sub}</p>
                  <svg viewBox="0 0 60 14" className="w-14 mt-1.5 opacity-50" fill="none">
                    <polyline points="0,11 10,7 22,9 34,3 44,6 60,2" stroke="#E8352A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════  GALLERY  ══════════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See the <span className="text-[#E8352A]">Transformation</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">Real portraits before and after professional headshot retouching.</p>
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
                  style={{ backgroundImage:`url(${currentStyle.after})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${sliderPosition}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage:`url(${currentStyle.before})`,
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
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {portraitStyles.map(style => (
                  <button key={style.id} onClick={() => selectStyle(style.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeStyle === style.id
                        ? 'bg-[#E8352A] text-white shadow'
                        : 'bg-white border border-[#E5E7EB] text-[#555] hover:border-[#E8352A] hover:text-[#E8352A]'}`}>
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">Portrait & Headshots</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Professional headshot retouching for corporate, LinkedIn, actors & portfolios.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.20 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Natural Skin Retouching','Lighting & Shadow Fix','Background Replacement',
                  'Color & Tone Grading','Blemish & Fly-away Removal','24-Hour Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">Portrait</span> Services
            </h2>
            <p className="text-xl text-gray-600">Professional headshots for every use case.</p>
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
