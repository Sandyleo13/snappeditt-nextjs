// app/3d-rendering/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';
import {
  Camera, Box, Zap, Eye, Building,
  ArrowRight, CheckCircle, Video,
  Globe, Cpu, Star,
  ChevronLeft, ChevronRight, Layers,
} from 'lucide-react';
import { Sun, Contrast, Wand2, Sparkles } from 'lucide-react';

/* ── Floating 3D cube ── */
function FloatingCube({ size, x, y, delay, color = '#E8352A' }: {
  size: number; x: string; y: string; delay: number; color?: string;
}) {
  return (
    <motion.div
      animate={{ y: [-12, 12, -12], rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 5 + delay, ease: 'easeInOut', delay }}
      style={{ position: 'absolute', left: x, top: y, zIndex: 5 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <polygon points="24,4 44,14 44,34 24,44 4,34 4,14"
          fill={`${color}18`} stroke={color} strokeWidth="1.5" opacity="0.7"/>
        <line x1="24" y1="4"  x2="24" y2="24" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="4"  y1="14" x2="24" y2="24" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="44" y1="14" x2="24" y2="24" stroke={color} strokeWidth="1" opacity="0.5"/>
      </svg>
    </motion.div>
  );
}

const featureBadges = [
  { icon: <Camera className="w-4 h-4"/>, title: '8K Rendering',        sub: 'Ultra High Resolution',      delay: 0.9 },
  { icon: <Cpu className="w-4 h-4"/>,    title: 'RTX Ray Tracing',     sub: 'Realistic Light & Shadows',  delay: 1.0 },
  { icon: <Eye className="w-4 h-4"/>,    title: 'Global Illumination', sub: 'Natural Light Simulation',   delay: 1.1 },
  { icon: <Zap className="w-4 h-4"/>,    title: 'GPU Acceleration',    sub: 'Faster & Smoother',          delay: 1.2 },
];

const badgePositions = [
  'top-[8%]  right-0 translate-x-[2%]',
  'top-[30%] right-0 translate-x-[2%]',
  'top-[52%] right-0 translate-x-[2%]',
  'top-[74%] right-0 translate-x-[2%]',
];

export default function ThreeDRenderingPage() {
  const [heroIndex, setHeroIndex]     = useState(0);
  const [isHovering, setIsHovering]   = useState(false);

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('Exposure');
  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  const heroImages = [
    { image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=85&auto=format&fit=crop', label: 'Architectural' },
    { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85&auto=format&fit=crop', label: 'Interior' },
    { image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=85&auto=format&fit=crop', label: 'Product' },
    { image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop', label: 'Automotive' },
  ];
  const current = heroImages[heroIndex];

  useEffect(() => {
    if (isHovering) return;
    const id = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 4000);
    return () => clearInterval(id);
  }, [isHovering]);

  const stats = [
    { value: '8K',   label: 'Max Resolution', sub: 'Ultra-high quality',        icon: <Camera className="w-5 h-5"/> },
    { value: 'RTX',  label: 'Ray Tracing',     sub: 'Real-time GPU rendering',   icon: <Cpu className="w-5 h-5"/> },
    { value: '60fps',label: 'Real-time',       sub: 'Smooth animation output',   icon: <Zap className="w-5 h-5"/> },
    { value: 'GPU',  label: 'Accelerated',     sub: 'Faster & smoother renders', icon: <Globe className="w-5 h-5"/> },
  ];

  const services = [
    { title: 'Architectural Vis.',  description: 'Photorealistic exterior & interior building visualizations.',           icon: <Building className="w-8 h-8"/> },
    { title: 'Product Rendering',   description: 'Studio-grade product renders for e-commerce and marketing.',           icon: <Box className="w-8 h-8"/> },
    { title: '3D Animations',       description: 'Motion sequences, flythroughs and product reveal animations.',         icon: <Video className="w-8 h-8"/> },
    { title: 'VR Experiences',      description: 'Immersive VR-ready scenes for presentations and sales.',               icon: <Eye className="w-8 h-8"/> },
  ];

  const addToCart = () => {
    const price = 0.45;
    const cartItem = { service_name: '3D Rendering', qty: 1, price, retouching: '3D Rendering',
      order_name: '3D Rendering', order_images: 1, order_details: 'GPU ray-traced photorealistic 3D renders', addons: [], total: price };
    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch { document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/'; }
    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] overflow-x-hidden">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute rounded-full bg-[#E8352A]" style={{ width: [6,4,8,5,3,7][i], height: [6,4,8,5,3,7][i], left: `${[12,28,45,62,75,88][i]}%`, top: `${[20,65,15,75,35,55][i]}%`, filter: 'blur(1px)' }} />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT PANEL (text) */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Real Estate Editing</span>
            </motion.div>

            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Cinematic', 'GPU', 'Rendering'].map((word, i) => (
                <motion.span key={word} className={`block ${i===1? 'text-[#E8352A]':'text-white'} text-[clamp(2.5rem,7vw,5rem)]`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Photorealistic renders with ray tracing, GI and advanced post-processing for studio-quality output.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial" className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_0_40px_rgba(232,53,42,0.45)] hover:scale-105">Get Started Free <ArrowRight className="w-4 h-4"/></Link>
              <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm">View Examples</button>
            </motion.div>

            <motion.div className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {stats.map((s,i) => (
                <motion.div key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.9 + i*0.08, duration:0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT PANEL — Before/After full height */}
          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
            <div ref={heroSliderRef} className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0" style={{ minHeight:340 }}
              onMouseMove={(e) => { if (isDragging) {
                const rect = heroSliderRef.current?.getBoundingClientRect(); if (!rect) return; const x = (e as any).clientX; setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100))); } }}
              onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchMove={(e) => { if (isDragging) {
                const t = (e as any).touches[0]; const rect = heroSliderRef.current?.getBoundingClientRect(); if (!rect) return; setSliderPosition(Math.max(0, Math.min(100, ((t.clientX - rect.left) / rect.width) * 100))); }} }
              onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${current.image})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${current.image})`, width: heroSliderRef.current ? `${heroSliderRef.current.offsetWidth}px` : '100%' }} />
              </div>

              <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]" style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.20), 0 8px 24px rgba(0,0,0,0.4)' }}>
                  <div className="flex gap-0.5"><ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]"/><ChevronRight className="w-3.5 h-3.5 text-[#E8352A]"/></div>
                </div>
              </div>

              <span className="absolute top-5 left-5 z-10 bg-black/60 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {editorTabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>
                      {tab === 'Exposure'   && <Sun className="w-4 h-4"/>}
                      {tab === 'Contrast'   && <Contrast className="w-4 h-4"/>}
                      {tab === 'Highlights' && <Sun className="w-4 h-4 opacity-70"/>}
                      {tab === 'Shadows'    && <Layers className="w-4 h-4"/>}
                      {tab === 'Color'      && <Wand2 className="w-4 h-4"/>}
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.div animate={{ y: [-4,4,-4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">AI-Assisted Manual Edit</span>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {heroImages.map((_, i) => (
                <button key={i} onClick={() => { setHeroIndex(i); setSliderPosition(50); }} className={`rounded-full transition-all duration-300 ${heroIndex === i ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════  GALLERY  ══════════════════════════════════ */}
      <BeforeAfterSlider
        images={[
          {
            beforeImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&auto=format&fit=crop',
            afterImage:  'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=85&auto=format&fit=crop',
            description: 'Architectural exterior — raw model to photorealistic render.',
          },
          {
            beforeImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop',
            afterImage:  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85&auto=format&fit=crop',
            description: 'Interior scene — basic draft to luxury photorealistic finish.',
          },
          {
            beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop',
            afterImage:  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=85&auto=format&fit=crop',
            description: 'Product render — wireframe to studio-grade final output.',
          },
          {
            beforeImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85&auto=format&fit=crop',
            afterImage:  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85&auto=format&fit=crop',
            description: 'Automotive — clay model to RTX-rendered showroom quality.',
          },
        ]}
        beforeLabel="Draft"
        afterLabel="Rendered"
        sectionTitle="Our"
        sectionTitleHighlight="Render Portfolio"
        sectionSubtitle="Drag the slider to compare draft models with photorealistic renders."
        serviceName="3D Rendering"
        serviceDescription="GPU ray-traced photorealistic renders for architecture, products and more."
        price="0.45"
        priceUnit="/ render"
        features={['GPU Ray Tracing','8K Resolution Output','PBR Material Library','Global Illumination','Depth of Field & Motion Blur','24-Hour Delivery']}
        onAddToCart={addToCart}
        onViewMore={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* ══════════════════════════════════  SERVICES  ══════════════════════════════════ */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-[#E8352A]">Rendering</span> Services
            </h2>
            <p className="text-xl text-gray-600">Photorealistic 3D across every industry and scale.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service,i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-xl hover:border-[#E8352A]/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#FFF0EE] rounded-xl flex items-center justify-center mb-5 text-[#E8352A] group-hover:bg-[#FFE5E2] transition-colors">
                 {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-lg mb-4 leading-relaxed">{service.description}</p>
                <button className="text-[#E8352A] text-xl font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
