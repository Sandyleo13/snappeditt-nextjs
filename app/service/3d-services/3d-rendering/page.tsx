// app/3d-rendering/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';
import {
  Camera, Box, Zap, Eye, Building,
  ArrowRight, CheckCircle, Video,
  Globe, Cpu, Star,
} from 'lucide-react';

/* ── Floating feature badge connected by a line ── */
function FeatureBadge({
  icon, title, sub, delay, className,
}: { icon: React.ReactNode; title: string; sub: string; delay: number; className: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`absolute z-20 bg-white rounded-2xl shadow-lg border border-[#F0F0F0] px-4 py-3 flex items-center gap-3 min-w-[190px] ${className}`}>
      <div className="w-9 h-9 rounded-xl bg-[#FFF0EE] flex items-center justify-center flex-shrink-0 text-[#E8352A]">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-[#1A1A1A] leading-none">{title}</p>
        <p className="text-[9px] text-[#999] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

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
    { title: 'Architectural Vis.',  description: 'Photorealistic exterior & interior building visualizations.',           icon: <Building className="w-6 h-6"/> },
    { title: 'Product Rendering',   description: 'Studio-grade product renders for e-commerce and marketing.',           icon: <Box className="w-6 h-6"/> },
    { title: '3D Animations',       description: 'Motion sequences, flythroughs and product reveal animations.',         icon: <Video className="w-6 h-6"/> },
    { title: 'VR Experiences',      description: 'Immersive VR-ready scenes for presentations and sales.',               icon: <Eye className="w-6 h-6"/> },
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
    <div className="min-h-screen bg-[#F8F9FB] overflow-x-hidden">

      {/* ══════════════════════════════════  HERO  ══════════════════════════════════ */}
      <section className="relative bg-[#F8F9FB] overflow-hidden min-h-screen flex items-center">

        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Radial blobs */}
          <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.10) 0%, transparent 70%)' }}/>
          <div className="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full"
            style={{ background:'radial-gradient(circle, rgba(232,53,42,0.07) 0%, transparent 70%)' }}/>
          {/* Central glow under 3D model */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl"
            style={{ background:'radial-gradient(ellipse, rgba(232,53,42,0.12) 0%, transparent 70%)' }}/>

          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <defs>
              <pattern id="rdots" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#E8352A"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rdots)"/>
          </svg>

          {/* Orbit rings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="680" cy="350" rx="300" ry="220" stroke="#E8352A" strokeWidth="0.7" opacity="0.08"/>
            <ellipse cx="680" cy="350" rx="230" ry="170" stroke="#E8352A" strokeWidth="0.5" opacity="0.06"/>
            <ellipse cx="680" cy="350" rx="300" ry="220" stroke="#E8352A" strokeWidth="1.4" opacity="0.30"
              strokeDasharray="180 1900" style={{ animation:'r3CW 9s linear infinite', transformOrigin:'680px 350px' }}/>
          </svg>

          {/* Floating 3D cubes */}
          <FloatingCube size={48} x="4%"   y="12%" delay={0}  />
          <FloatingCube size={36} x="88%"  y="8%"  delay={0.5}/>
          <FloatingCube size={28} x="3%"   y="66%" delay={1.0}/>
          <FloatingCube size={56} x="1%"   y="38%" delay={0.3} color="#E8352A"/>
          <FloatingCube size={24} x="44%"  y="3%"  delay={0.7}/>

          {/* Floating red spheres */}
          <motion.div animate={{ y:[-12,12,-12] }} transition={{ repeat:Infinity, duration:5, ease:'easeInOut' }}
            style={{ position:'absolute', right:'4%', top:'60%', width:22, height:22, borderRadius:'50%',
              background:'radial-gradient(circle at 35% 28%,#ff9a80 0%,#E8352A 60%,#a31808 100%)',
              boxShadow:'0 6px 18px rgba(232,53,42,0.35)' }}/>
          <motion.div animate={{ y:[10,-10,10] }} transition={{ repeat:Infinity, duration:4, ease:'easeInOut', delay:0.6 }}
            className="absolute w-4 h-4 rounded-full bg-[#E8352A]"
            style={{ top:'18%', left:'48%', boxShadow:'0 4px 12px rgba(232,53,42,0.40)' }}/>
          <motion.div animate={{ y:[-7,7,-7] }} transition={{ repeat:Infinity, duration:3.8, ease:'easeInOut', delay:1 }}
            className="absolute w-3 h-3 rounded-full bg-[#E8352A]/60"
            style={{ bottom:'32%', left:'10%' }}/>

          {/* Glass spheres */}
          <motion.div animate={{ y:[-11,11,-11] }} transition={{ repeat:Infinity, duration:6.4, ease:'easeInOut' }}
            style={{ position:'absolute', left:'6%', top:'44%', width:58, height:58, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.98) 0%,rgba(228,233,245,0.50) 58%,rgba(198,208,228,0.18) 100%)',
              boxShadow:'0 6px 28px rgba(15,23,42,0.08),inset 0 1px 2px rgba(255,255,255,0.9)',
              border:'1px solid rgba(208,218,234,0.40)' }}/>
          <motion.div animate={{ y:[8,-8,8] }} transition={{ repeat:Infinity, duration:4.7, ease:'easeInOut', delay:0.7 }}
            style={{ position:'absolute', left:'13%', bottom:'26%', width:28, height:28, borderRadius:'50%',
              background:'radial-gradient(circle at 36% 32%,rgba(255,255,255,0.97) 0%,rgba(224,230,244,0.45) 65%)',
              boxShadow:'0 3px 12px rgba(15,23,42,0.07)', border:'1px solid rgba(208,218,234,0.35)' }}/>

          {/* Dot accents */}
          <motion.div animate={{ y:[-8,8,-8] }} transition={{ repeat:Infinity, duration:4 }}
            className="absolute left-[42%] top-[13%] w-2.5 h-2.5 rounded-full bg-[#E8352A]/50"/>
          <motion.div animate={{ y:[6,-6,6] }} transition={{ repeat:Infinity, duration:5, delay:0.9 }}
            className="absolute left-[15%] bottom-[27%] w-2 h-2 rounded-full bg-[#E8352A]/35"/>
        </div>

        <style>{`
          @keyframes r3CW { to { stroke-dashoffset: -2080; } }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 xl:px-14 py-20 w-full">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">

            {/* ── LEFT TEXT ── */}
            <motion.div className="flex flex-col gap-6"
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, ease:'easeOut' }}>


              {/* Heading — matches screenshot */}
              <div>
                <motion.h1 className="font-extrabold leading-[1.06] tracking-tight"
                  initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.55 }}>
                  <span className="text-5xl md:text-6xl lg:text-7xl text-[#E8352A]">3D</span>
                  <span className="text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A]"> Rendering</span>
                </motion.h1>
                <motion.div className="mt-2"
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.5 }}>
                  <span className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Cinematic </span>
                  <span className="text-2xl md:text-3xl font-bold text-[#E8352A]">Visual Excellence</span>
                </motion.div>
              
              </div>

              <motion.p className="text-base text-[#666] leading-relaxed max-w-sm"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.46, duration:0.5 }}>
                Transform 3D models into photorealistic masterpieces with advanced ray tracing
                and global illumination.
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


              {/* Social proof */}
              <motion.div className="flex items-center gap-3"
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}>
                <div className="flex -space-x-2">
                  {['photo-1507003211169-0a1dd7228f2d','photo-1544005313-94ddf0286df2',
                    'photo-1560250097-0b93528c311a','photo-1519085360753-af0119f7cbe7'].map((id, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      style={{ backgroundImage:`url(https://images.unsplash.com/${id}?w=60&q=70&auto=format&fit=crop)`,
                        backgroundSize:'cover', backgroundPosition:'center' }}/>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#E8352A] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">+2k</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Trusted by 2,000+ Architects & Studios</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400"/>)}
                    <span className="text-[10px] text-[#999] ml-1">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Floating 3D render + feature badges ── */}
            <motion.div className="relative flex items-center justify-center"
              initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.7, ease:'easeOut' }}>

              {/* Feature badges with connector lines */}
              {featureBadges.map((b, i) => (
                <FeatureBadge key={i} {...b} className={badgePositions[i]} />
              ))}

              {/* Connector lines from image to badges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 500 500" preserveAspectRatio="none">
                {[108, 203, 298, 393].map((y, i) => (
                  <motion.line key={i} x1="330" y1={y} x2="370" y2={y}
                    stroke="#E8352A" strokeWidth="1" opacity="0.4" strokeDasharray="4 3"
                    initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                    transition={{ delay:1.0 + i * 0.12, duration:0.5 }}/>
                ))}
              </svg>

              {/* Main floating 3D render */}
              <div className="relative w-full mx-auto" style={{ aspectRatio: '4/3', maxWidth: 'calc(100vw - 4rem)' }}>
                {/* Glow base */}
                <div className="absolute inset-x-8 bottom-0 h-16 blur-2xl rounded-full"
                  style={{ background:'radial-gradient(ellipse, rgba(232,53,42,0.30) 0%, transparent 70%)' }}/>

                <motion.div
                  animate={{ y:[-10, 10, -10] }}
                  transition={{ repeat:Infinity, duration:5.5, ease:'easeInOut' }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E8E8]"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}>
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.label}
                    initial={{ opacity:0, scale:1.03 }}
                    animate={{ opacity:1, scale:1 }}
                    transition={{ duration:0.5 }}
                    className="block"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                  {/* 360° badge */}
                  <motion.div
                    animate={{ rotate:[0, 360] }} transition={{ repeat:Infinity, duration:8, ease:'linear' }}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-[#E8352A]/20 z-10">
                    <div className="w-3 h-3 rounded-full border border-[#E8352A] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#E8352A]"/>
                    </div>
                    <span className="text-[10px] font-bold text-[#E8352A]">360° View</span>
                  </motion.div>

                  {isHovering && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                      className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#1A1A1A]/70 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-1 rounded-full">
                      <span className="flex gap-0.5"><span className="w-0.5 h-2.5 bg-white rounded-full"/><span className="w-0.5 h-2.5 bg-white rounded-full"/></span>
                      Paused
                    </motion.div>
                  )}
                </motion.div>

                {/* Dot nav */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {heroImages.map((_,i) => (
                    <button key={i} onClick={() => setHeroIndex(i)}
                      className={`rounded-full transition-all ${i === heroIndex ? 'w-5 h-2.5 bg-[#E8352A]' : 'w-2.5 h-2.5 bg-[#DDD] hover:bg-[#E8352A]/50'}`}/>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats bar ── */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
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
                  <div className="w-6 h-0.5 bg-[#E8352A]/40 rounded-full mt-1.5"/>
                </div>
              </div>
            ))}
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
