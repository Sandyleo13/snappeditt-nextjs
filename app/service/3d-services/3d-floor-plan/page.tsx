// app/3d-floor-plans/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box, RotateCw, Video, CheckCircle,
  ArrowRight, Zap, Eye, Shield, Download,
  Layers, Ruler, Building, Camera,
  ChevronLeft, ChevronRight
} from 'lucide-react';

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
    { title: 'Residential 3D Plans',   description: 'Photorealistic 3D floor plans for homes, apartments and villas.',       icon: <Building className="w-6 h-6" /> },
    { title: 'Commercial Spaces',       description: 'Detailed 3D layouts for offices, retail and hospitality spaces.',       icon: <Layers className="w-6 h-6" /> },
    { title: 'Architectural Models',    description: 'Full-scale architectural 3D models with exterior and interior views.',  icon: <Box className="w-6 h-6" /> },
    { title: 'VR Walkthroughs',         description: 'Immersive VR-ready floor plans for interactive client presentations.', icon: <Video className="w-6 h-6" /> },
  ];

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
      <section className="relative bg-white overflow-hidden min-h-[90vh] flex items-center">

        {/* ── Rich animated background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Large radial blobs */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.10) 0%, transparent 70%)' }} />
          <div className="absolute -right-24 -top-24 w-[480px] h-[480px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.08) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px]"
            style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.07) 0%, transparent 70%)' }} />

          {/* Animated architectural grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid3d" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3d)" />
          </svg>

          {/* Orbit SVG rings — same as other pages */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="820" cy="340" rx="280" ry="210" stroke="#E8352A" strokeWidth="0.8" opacity="0.10"/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="0.6" opacity="0.08"/>
            <ellipse cx="820" cy="340" rx="280" ry="210" stroke="#E8352A" strokeWidth="1.6" opacity="0.35"
              strokeDasharray="200 1700" style={{ animation: 'fpCW3 8s linear infinite', transformOrigin: '820px 340px' }}/>
            <ellipse cx="820" cy="340" rx="210" ry="158" stroke="#E8352A" strokeWidth="1.0" opacity="0.20"
              strokeDasharray="140 1200" style={{ animation: 'fpCCW3 12s linear infinite', transformOrigin: '820px 340px' }}/>
          </svg>

          {/* Floating 3D box wireframe shapes */}
          {[
            { x: '8%',  y: '15%', size: 40, delay: 0 },
            { x: '88%', y: '10%', size: 28, delay: 0.5 },
            { x: '5%',  y: '70%', size: 22, delay: 1.0 },
            { x: '92%', y: '65%', size: 32, delay: 0.8 },
            { x: '45%', y: '5%',  size: 18, delay: 0.3 },
          ].map((b, i) => (
            <motion.div key={i}
              animate={{ y: [-10, 10, -10], rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5 + i * 0.8, ease: 'easeInOut', delay: b.delay }}
              style={{ position: 'absolute', left: b.x, top: b.y }}>
              <svg width={b.size} height={b.size} viewBox="0 0 40 40" fill="none">
                {/* Isometric cube wireframe */}
                <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" stroke="#E8352A" strokeWidth="1.2" fill="rgba(232,53,42,0.06)" opacity="0.5"/>
                <line x1="20" y1="2" x2="20" y2="18" stroke="#E8352A" strokeWidth="0.8" opacity="0.4"/>
                <line x1="2" y1="12" x2="20" y2="18" stroke="#E8352A" strokeWidth="0.8" opacity="0.4"/>
                <line x1="38" y1="12" x2="20" y2="18" stroke="#E8352A" strokeWidth="0.8" opacity="0.4"/>
                <line x1="20" y1="18" x2="20" y2="38" stroke="#E8352A" strokeWidth="0.8" opacity="0.3"/>
              </svg>
            </motion.div>
          ))}

          {/* Red spheres */}
          <motion.div animate={{ y: [-13, 13, -13] }} transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut' }}
            style={{ position: 'absolute', right: '6%', top: '7%', width: 52, height: 52, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff7b6e 0%,#E8352A 52%,#8b1a0f 100%)',
              boxShadow: '0 10px 30px rgba(232,53,42,0.32)' }} />
          <motion.div animate={{ y: [9, -9, 9] }} transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.8 }}
            style={{ position: 'absolute', right: '8%', top: '52%', width: 24, height: 24, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow: '0 5px 16px rgba(232,53,42,0.26)' }} />

          {/* Glass spheres */}
          <motion.div animate={{ y: [-11, 11, -11] }} transition={{ repeat: Infinity, duration: 6.4, ease: 'easeInOut' }}
            style={{ position: 'absolute', left: '5%', top: '46%', width: 64, height: 64, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow: '0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border: '1px solid rgba(208,218,234,0.40)' }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 4.7, ease: 'easeInOut', delay: 0.7 }}
            style={{ position: 'absolute', left: '12%', bottom: '28%', width: 30, height: 30, borderRadius: '50%',
              background: 'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow: '0 3px 12px rgba(15,23,42,0.07)', border: '1px solid rgba(208,218,234,0.35)' }} />

          {/* Dot accents */}
          <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute left-[43%] top-[14%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50" />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.8 }}
            className="absolute right-[18%] top-[22%] w-3 h-3 rounded-full bg-[#E8352A]/38" />
          <motion.div animate={{ y: [-6, 6, -6] }} transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 0.4 }}
            className="absolute left-[14%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/30" />
          <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1.2 }}
            className="absolute left-[60%] bottom-[20%] w-1.5 h-1.5 rounded-full bg-[#E8352A]/40" />

          {/* Animated bottom wave — 3-layer morphing */}
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <motion.path fill="rgba(232,53,42,0.05)"
              animate={{ d: [
                "M0,60 C240,30 480,80 720,55 C960,30 1200,70 1440,60 L1440,100 L0,100 Z",
                "M0,45 C240,70 480,30 720,65 C960,80 1200,40 1440,45 L1440,100 L0,100 Z",
                "M0,60 C240,30 480,80 720,55 C960,30 1200,70 1440,60 L1440,100 L0,100 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }} />
            <motion.path fill="rgba(232,53,42,0.08)"
              animate={{ d: [
                "M0,72 C360,95 720,45 1080,72 C1260,85 1380,60 1440,72 L1440,100 L0,100 Z",
                "M0,58 C360,70 720,90 1080,58 C1260,45 1380,78 1440,58 L1440,100 L0,100 Z",
                "M0,72 C360,95 720,45 1080,72 C1260,85 1380,60 1440,72 L1440,100 L0,100 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 1 }} />
            <motion.path fill="rgba(232,53,42,0.13)"
              animate={{ d: [
                "M0,82 C480,60 720,96 960,78 C1200,60 1360,88 1440,82 L1440,100 L0,100 Z",
                "M0,70 C480,90 720,62 960,88 C1200,100 1360,65 1440,70 L1440,100 L0,100 Z",
                "M0,82 C480,60 720,96 960,78 C1200,60 1360,88 1440,82 L1440,100 L0,100 Z",
              ]}}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.5 }} />
          </svg>
        </div>

        <style>{`
          @keyframes fpCW3  { to { stroke-dashoffset: -1900; } }
          @keyframes fpCCW3 { to { stroke-dashoffset:  1348; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>

      
              {/* Heading — matches screenshot */}
              <div>
                <motion.h1 className="font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}>
                  <span className="text-5xl md:text-6xl lg:text-7xl text-[#E8352A]">3D</span>
                  <span className="text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A]"> Floor </span>
                  <span className="text-5xl md:text-6xl lg:text-7xl text-[#E8352A]">Plans</span>
                </motion.h1>
                <motion.p className="text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-snug mt-2"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  Immersive Spatial Design
                </motion.p>
               
              </div>

              <motion.p className="text-base md:text-lg text-[#666] leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46, duration: 0.5 }}>
                Experience architectural spaces in breathtaking 3D detail.
                Interactive floor plans that bring your designs to life.
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

            {/* ── RIGHT: 3D Floor Plan image + floating badges ── */}
            <motion.div className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>

              {/* Main 3D render */}
              <div className="relative w-full max-w-lg">
                {/* Soft glow behind */}
                <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.4) 0%, transparent 70%)' }} />

                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#F0F0F0]"
                  style={{ cursor: rotate ? 'grabbing' : 'grab' }}
                  onClick={() => setRotate(r => !r)}>
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.12, x: '-4%' }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1.12,
                      rotate: rotate ? angle : 0,
                      x: rotate ? 0 : ['-4%', '4%', '-4%'],
                    }}
                    transition={{ 
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.4 },
                      x: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
                    }}
                    className="w-full object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                  {/* 360° badge overlay */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-[#E8352A]/20 z-10">
                    <RotateCw className="w-3.5 h-3.5 text-[#E8352A]" />
                    <span className="text-[10px] font-bold text-[#E8352A]">360°</span>
                  </motion.div>
                </motion.div>

                {/* Floating feature badges */}
                <FloatBadge
                  icon={<Box className="w-4 h-4" />}
                  title="3D Interactive" sub="Explore Every Angle"
                  delay={0.9} className="top-4 right-0 translate-x-1/3" />
                <FloatBadge
                  icon={<Zap className="w-4 h-4" />}
                  title="Real-time Rendering" sub="High Quality Output"
                  delay={1.1} className="top-1/2 -translate-y-1/2 right-0 translate-x-2/5" />
                <FloatBadge
                  icon={<Eye className="w-4 h-4" />}
                  title="VR Ready" sub="Immersive Experience"
                  delay={1.3} className="bottom-16 right-0 translate-x-1/3" />

                {/* Thumbnail nav dots */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  {floorPlanExamples.map((_, i) => (
                    <button key={i} onClick={() => {
                        setSlideDirection(i > activeIndex ? 'right' : 'left');
                        setActiveIndex(i);
                      }}
                      className={`rounded-full transition-all ${
                        i === activeIndex ? 'w-5 h-2.5 bg-[#E8352A]' : 'w-2.5 h-2.5 bg-[#DDD] hover:bg-[#E8352A]/50'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

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
