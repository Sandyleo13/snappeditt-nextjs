// app/school-retouching/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap, BookOpen, Users, Trophy,
  ArrowRight, Zap, CheckCircle,
  Camera, Star,
  Sun, Contrast, Layers, Wand2, Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-react';

/* ── School photo category tabs ── */
const schoolCategories = [
  { id: 'yearbook', label: 'Yearbook', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=72',
    after:  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=85&auto=format&fit=crop',
    count: 450, desc: 'Perfect yearbook portraits — consistent, professional, batch-ready.' },
  { id: 'class',   label: 'Class',    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=72',
    after:  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=85&auto=format&fit=crop',
    count: 120, desc: 'Group class photos with everyone looking bright and sharp.' },
  { id: 'sports',  label: 'Sports',   img: 'https://images.unsplash.com/photo-1530539595977-0aa9890543c8?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1530539595977-0aa9890543c8?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=72',
    after:  'https://images.unsplash.com/photo-1530539595977-0aa9890543c8?w=900&q=85&auto=format&fit=crop',
    count: 80, desc: 'Championship-ready sports team and individual athlete portraits.' },
  { id: 'grad',    label: 'Grad',     img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=72',
    after:  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=85&auto=format&fit=crop',
    count: 200, desc: 'Timeless graduation portraits — every cap and gown polished perfectly.' },
  { id: 'staff',   label: 'Staff',    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=70&auto=format&fit=crop',
    before: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=72',
    after:  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=85&auto=format&fit=crop',
    count: 60, desc: 'Consistent staff directory portraits for school websites and print.' },
];

export default function SchoolRetouchingPage() {
  const [activeCategory, setActiveCategory] = useState('yearbook');

  const currentCat = schoolCategories.find(c => c.id === activeCategory) ?? schoolCategories[0];

  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];
  const imageExamples = schoolCategories.map(cat => ({
    beforeImage: cat.before,
    afterImage: cat.after,
    label: cat.label,
  }));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(editorTabs[0]);
  const currentImage = imageExamples[currentImageIndex];

  const changeImage = (index: number) => {
    const nextIndex = (index + imageExamples.length) % imageExamples.length;
    setCurrentImageIndex(nextIndex);
  };

  const stats = [
    { value: '1M+',  label: 'School Photos',    sub: 'Processed every year',       icon: <Camera className="w-5 h-5 text-[#E8352A]" /> },
    { value: '24h',  label: 'Batch Delivery',   sub: 'Entire school in one day',   icon: <Zap className="w-5 h-5 text-[#E8352A]" /> },
    { value: '100%', label: 'Consistent Style', sub: 'Uniform across all students',icon: <Users className="w-5 h-5 text-[#E8352A]" /> },
    { value: '4.9★', label: 'School Rating',    sub: 'Trusted by 500+ schools',    icon: <Star className="w-5 h-5 text-[#E8352A]" /> },
  ];

  const services = [
    { title: 'Yearbook Portraits',  description: 'Batch-process hundreds of student portraits for yearbooks.',        icon: <BookOpen className="w-8 h-8" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Class & Group',       description: 'Enhance class photos — everyone bright, sharp and smiling.',        icon: <Users className="w-8 h-8" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Graduation Photos',   description: 'Timeless grad portraits for every cap, gown and proud smile.',      icon: <GraduationCap className="w-8 h-8" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Sports & Activities', description: 'Championship-ready sports team and club activity portraits.',       icon: <Trophy className="w-8 h-8" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  const selectCategory = (id: string) => { setActiveCategory(id); };

  const addToCart = () => {
    const pricePerImage = 0.10, imageCount = 100;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = { service_name: 'School Retouching', qty: 1, price: pricePerImage,
      retouching: 'School Retouching', order_name: 'School Retouching',
      order_images: imageCount, order_details: currentCat.desc, addons: [], total };
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

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F] text-white">
        <div className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <filter id="school-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#school-noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.16, 0.26, 0.16] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -bottom-20 -right-32 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="school-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#school-grid)"/>
          </svg>
          {schoolCategories.slice(0, 5).map((_, i) => (
            <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#E8352A]" style={{ left: `${[12, 28, 45, 62, 82][i]}%`, top: `${[20, 65, 15, 75, 35][i]}%` }} />
          ))}
        </div>

        <style>{`
          @keyframes schoolReveal {
            0%, 10% { width: 0%; }
            45%, 55% { width: 100%; }
            90%, 100% { width: 0%; }
          }
          @keyframes schoolDivider {
            0%, 10% { left: 0%; }
            45%, 55% { left: 100%; }
            90%, 100% { left: 0%; }
          }
          .school-motion {
            animation-duration: 8s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-play-state: running;
          }
          .school-stage:hover .school-motion {
            animation-play-state: paused;
          }
        `}</style>

        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-8 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">School Photo Editing</span>
            </motion.div>
            <h1 className="mb-6 font-extrabold leading-[0.95] tracking-tight">
              {['School', 'Photo', 'Editing'].map((word, i) => (
                <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
              ))}
            </h1>
            <motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Batch-process yearbooks, class photos, sports portraits and graduation galleries with consistent, professional quality delivered in 24 hours.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial" className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20] hover:shadow-[0_0_60px_rgba(232,53,42,0.65)]">
                Get Started Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">
                View Examples
              </button>
            </motion.div>
            <motion.div className="mt-14 grid grid-cols-4 gap-4 border-t border-white/10 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s, i) => <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                <p className="text-2xl font-extrabold text-white lg:text-3xl">{s.value}</p><p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#666]">{s.label}</p>
              </motion.div>)}
            </motion.div>
          </div>

          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div className="school-stage relative mx-4 mt-4 min-h-[340px] flex-1 select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentImage.beforeImage})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="school-motion absolute inset-0 overflow-hidden" style={{ animationName: 'schoolReveal' }}><div className="absolute inset-0 w-full bg-cover bg-center" style={{ backgroundImage: `url(${currentImage.afterImage})` }} /></div>
              <div className="school-motion absolute bottom-0 top-0 z-10 w-1" style={{ animationName: 'schoolDivider', transform: 'translateX(-50%)' }}>
                <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/60" />
                <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-2xl" style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}><div className="flex gap-0.5"><ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" /><ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" /></div></div>
              </div>
              <span className="absolute left-5 top-5 z-10 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Before</span>
              <span className="absolute right-5 top-5 z-10 rounded-full bg-[#E8352A] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">After</span>
              <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"><Sparkles className="h-3.5 w-3.5 text-[#E8352A]" /><span className="whitespace-nowrap text-[11px] font-semibold text-white">AI-Assisted Manual Edit</span></motion.div>
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5"><div className="flex items-center justify-between gap-2">
                {editorTabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
                  {tab === 'Exposure' && <Sun className="h-4 w-4" />}{tab === 'Contrast' && <Contrast className="h-4 w-4" />}{tab === 'Highlights' && <Sun className="h-4 w-4 opacity-70" />}{tab === 'Shadows' && <Layers className="h-4 w-4" />}{tab === 'Color' && <Wand2 className="h-4 w-4" />}<span className="text-[9px] font-semibold">{tab}</span>
                </button>)}
              </div></div>
            </div>
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {imageExamples.map((_, i) => <button key={i} aria-label={`Show ${schoolCategories[i].label} example`} onClick={() => { changeImage(i); selectCategory(schoolCategories[i].id); }} className={`rounded-full transition-all duration-300 ${currentImageIndex === i ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              See <span className="text-[#E8352A]">School Photos</span> Transform
            </h2>
            <p className="text-lg sm:text-xl text-[#555]">
              Real student photos before and after professional school retouching.
            </p>
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="flex-1 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[320px] sm:min-h-[420px]">
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${currentCat.after})` }} />
                <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: 'polygon(0 0, 56% 0, 56% 100%, 0 100%)' }}>
                  <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCat.before})` }} />
                </motion.div>
                <motion.div
                  animate={{ x: ['54%', '48%', '54%'] }}
                  transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg z-10"
                  style={{ left: '52%', transform: 'translateX(-50%)' }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </motion.div>
                <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Original</span>
                <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">Retouched</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
                {schoolCategories.map(cat => (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[#E8352A] text-white shadow'
                        : 'bg-white border border-[#E5E7EB] text-[#555] hover:border-[#E8352A] hover:text-[#E8352A]'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">School Retouching</h3>
              <p className="text-[#555] text-sm mb-5 leading-relaxed">
                Batch school photo retouching for yearbooks, class photos, sports and graduation.
              </p>
              <div className="text-2xl font-bold text-[#111] mb-4">
                $0.10 <span className="text-base font-normal text-[#555]">/ image</span>
              </div>
              <button onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm">
                Add to Cart
              </button>
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {['Skin & Complexion Correction','Background Standardisation','Consistent Lighting Balance',
                  'Uniform Style Across School','Colour & Tone Matching','24h Batch Delivery'].map(feat => (
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
              <span className="text-[#E8352A]">School</span> Services
            </h2>
            <p className="text-xl text-gray-600">Complete retouching for every school photo occasion.</p>
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
                          <p className="mb-3">{service.description} More details, pricing examples, and typical turnaround info.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/people/school/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
