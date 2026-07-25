// app/portrait-headshots-studio/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Camera, User, Star, Users,
  Sparkles, Zap, CheckCircle,
  ArrowRight, Eye, Shield, Sun, Contrast, Layers,
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
  // design-only: continuously animated auto slider
  const activeStyle = 'corporate';
  const [designSliderPercent, setDesignSliderPercent] = useState(40);
  const currentStyle = portraitStyles.find(s => s.id === activeStyle) ?? portraitStyles[0];

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setDesignSliderPercent(prev => {
        const next = prev + direction * 0.6;
        if (next >= 70) {
          direction = -1;
          return 70;
        }
        if (next <= 30) {
          direction = 1;
          return 30;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value:'100K+', label:'Portraits Done',    sub:'Trusted worldwide',              icon:<Camera className="w-5 h-5 text-[#E8352A]"/> },
    { value:'24h',   label:'Turnaround Time',   sub:'Fast, reliable delivery',        icon:<Zap className="w-5 h-5 text-[#E8352A]"/> },
    { value:'5★',    label:'Client Rating',     sub:'Based on 3,000+ reviews',        icon:<Star className="w-5 h-5 text-[#E8352A]"/> },
    { value:'100%',  label:'Natural Results',   sub:'No over-retouched look',         icon:<Eye className="w-5 h-5 text-[#E8352A]"/> },
  ];

  const services = [
    { title:'Corporate Headshots', description:'Polished headshots for business profiles, teams, and websites.',      icon:<Award className="w-8 h-8"/>, color: '#E8352A', bg: '#FFF0EE' },
    { title:'LinkedIn Profiles',   description:'Profile-ready photos for LinkedIn and professional networks.',        icon:<User className="w-8 h-8"/>, color: '#7C3AED', bg: '#F5F0FF' },
    { title:'Actor Portraits',     description:'Portfolio headshots for actors, models, and creative professionals.', icon:<Camera className="w-8 h-8"/>, color: '#0EA5E9', bg: '#F0F9FF' },
    { title:'Team Photos',         description:'Consistent retouching across entire team or group headshot sets.',    icon:<Users className="w-8 h-8"/>, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  // design-only hero: no interactive image carousel or slider ref

  // interactive behavior removed for design-only hero

  return (
    <div className="min-h-screen bg-[#F8F9FB]">

      {/* ══════════════════════════════════════  HERO  ══════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* ── Animated mesh background ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* base noise texture via SVG filter */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          {/* large red glow — left */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }}
          />
          {/* subtle glow — right */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }}
          />
          {/* grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
          {/* floating particles */}
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

        <style>{`
          @keyframes portraitReveal {
            0%, 10% { width: 0%; }
            45%, 55% { width: 100%; }
            90%, 100% { width: 0%; }
          }
          @keyframes portraitDivider {
            0%, 10% { left: 0%; }
            45%, 55% { left: 100%; }
            90%, 100% { left: 0%; }
          }
          .portrait-motion {
            animation-duration: 8s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-play-state: running;
          }
          .portrait-stage:hover .portrait-motion {
            animation-play-state: paused;
          }
        `}</style>

        {/* ── Main content grid ── */}
        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT PANEL */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Portrait Headshot Editing</span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Portrait', 'Headshots', 'Retouching'].map((word, i) => (
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
              Create polished, natural headshots for LinkedIn, corporate profiles, portfolios, and personal brands with expert portrait retouching.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)] hover:scale-105">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

            {/* Before/After fills the entire right column and pauses while hovered */}
            <div className="portrait-stage relative flex-1 select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0" style={{ minHeight: 340 }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentStyle.before})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div
                className="portrait-motion absolute inset-0 overflow-hidden"
                style={{ animationName: 'portraitReveal' }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentStyle.after})`, width: '100%' }} />
              </div>

              {/* Divider follows the reveal from left to right */}
              <div
                className="portrait-motion absolute bottom-0 top-0 z-10"
                style={{ animationName: 'portraitDivider', transform: 'translateX(-50%)' }}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]" style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div className="flex gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              {/* Bottom overlay: toolbar (design-only, non-interactive) */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {['Exposure','Contrast','Highlights','Shadows','Color'].map(tab => (
                    <div key={tab} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-white/50">
                      <div className="w-4 h-4 opacity-90" />
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating AI badge */}
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Manual Edit</span>
              </motion.div>
            </div>

            {/* Image selector dots (design-only) */}
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              <div className="w-8 h-2.5 bg-[#E8352A] rounded-full" />
              <div className="w-2.5 h-2.5 bg-white/25 rounded-full" />
              <div className="w-2.5 h-2.5 bg-white/25 rounded-full" />
            </div>
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
              <div className="relative rounded-2xl overflow-hidden shadow-xl select-none flex-1 min-h-[320px] sm:min-h-[420px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:`url(${currentStyle.after})` }} />
                <div className="absolute inset-0 overflow-hidden" style={{ width:`${designSliderPercent}%` }}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:`url(${currentStyle.before})`, width:'100%' }} />
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left:`${designSliderPercent}%`, transform:'translateX(-50%)' }}>
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
                  <div key={style.id}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeStyle === style.id
                        ? 'bg-[#E8352A] text-white shadow'
                        : 'bg-white border border-[#E5E7EB] text-[#555]'
                    }`}> {style.label}</div>
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
              <button
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
                          <p className="mb-3">{service.description} More details, pricing examples, and typical turnaround info.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/people/portrait-headshots-studio/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
