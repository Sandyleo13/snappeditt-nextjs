'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Users, ArrowRight, Zap, Camera, Wand2, CheckCircle, ChevronLeft, ChevronRight, Sun, Contrast, Layers } from 'lucide-react';

export default function MaternityPregnancyRetouchPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null!);
  const galleryRef = useRef<HTMLDivElement>(null!);

  const imageExamples = [
    {
      beforeImage: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=1200&q=80&auto=format&fit=crop&sat=-30&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=1200&q=80&auto=format&fit=crop'
    },
    {
      beforeImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200&q=80&auto=format&fit=crop&sat=-30&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200&q=80&auto=format&fit=crop'
    },
    {
      beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80&auto=format&fit=crop&sat=-30&brightness=70',
      afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80&auto=format&fit=crop'
    }
  ];

  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];
  const [activeTab, setActiveTab] = useState(editorTabs[0]);

  const stats = [
    { value: '2K+', label: 'Moms Served' },
    { value: '4.9★', label: 'Client Rating' },
    { value: '100%', label: 'Satisfaction' },
    { value: '24h', label: 'Delivery' },
  ];

  const relatedServices = [
    { title: 'Newborn Retouching', description: 'Soft, clean edits for newborn portraits and keepsakes.', icon: <Camera className="w-8 h-8" />, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Family Portraits', description: 'Elegant color and skin refinement for family sessions.', icon: <Users className="w-8 h-8" />, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Lifestyle Editing', description: 'Cinematic finishing for maternity lifestyle and documentary shoots.', icon: <Sparkles className="w-8 h-8" />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Headshot Retouch', description: 'Polished portraits for personal branding and professional profiles.', icon: <Star className="w-8 h-8" />, color: '#10B981', bg: '#ECFDF5' },
  ];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);

  useEffect(() => {
    if (isDragging || isHoveringSlider) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + 0.6;
        if (next > 100) return 50;
        return next;
      });
    }, 60);
    return () => window.clearInterval(id);
  }, [isDragging, isHoveringSlider]);

  function handleSliderMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDragging) return;
    const ref = sliderRef.current;
    if (!ref) return;
    e.preventDefault();
    const rect = ref.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pct)));
  }

  function changeImage(i: number) {
    setCurrentImageIndex((i + imageExamples.length) % imageExamples.length);
    setSliderPosition(50);
  }

  function addToCart() {
    const pricePerImage = 0.16;
    const imageCount = 60;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));
    const cartItem = {
      service_name: 'Maternity Retouching',
      qty: 1,
      price: pricePerImage,
      retouching: 'Maternity Retouching',
      order_name: 'Maternity Retouching',
      order_images: imageCount,
      order_details: 'Gentle maternity and pregnancy portrait retouching for a soft, polished finish.',
      addons: [],
      total,
    };

    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing ? JSON.parse(decodeURIComponent(existing[2])) : [];
      const updatedCart = Array.isArray(currentCart) ? [...currentCart, cartItem] : [currentCart, cartItem];
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch (error) {
      document.cookie = 'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/';
    }

    window.location.href = '/cart';
  }

  return (
    <div className="min-h-screen bg-[#0D0D0F] text-white">
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* Animated mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.5 }} className="absolute rounded-full bg-[#E8352A]" style={{ width: [6,4,8,5,3,7][i], height: [6,4,8,5,3,7][i], left: `${[12,28,45,62,75,88][i]}%`, top: `${[20,65,15,75,35,55][i]}%`, filter: 'blur(1px)' }} />
          ))}
        </div>

        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" /><span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Maternity Retouch</span></motion.div>

            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {['Maternity','Pregnancy'].map((word,i) => (
                <motion.span key={word} className={`block ${i===1? 'text-[#E8352A]':'text-white'} text-[clamp(3rem,8vw,5rem)]`} initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15 + i*0.12, duration:0.6 }}>{word}</motion.span>
              ))}
            </h1>

            <motion.p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>Gentle, beautiful retouching to celebrate new life.</motion.p>

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

          {/* RIGHT */}
          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
            <div ref={sliderRef} className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0" style={{ minHeight:340 }} onMouseMove={handleSliderMove} onTouchMove={handleSliderMove} onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchEnd={() => setIsDragging(false)} onMouseUp={() => setIsDragging(false)}>

              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageExamples[currentImageIndex].afterImage})`, filter: 'brightness(0.7) saturate(0.6)' }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageExamples[currentImageIndex].beforeImage})`, width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }} />
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
            </div>

            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {imageExamples.map((_, i) => (
                <button key={i} onClick={() => changeImage(i)} className={`rounded-full transition-all duration-300 ${currentImageIndex === i ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA] text-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">See the <span className="text-[#E8352A]">Magical Difference</span></h2>
            <p className="text-lg sm:text-xl text-[#555]">Real maternity photos before and after our gentle, beautiful retouching.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div ref={galleryRef} className="rounded-2xl overflow-hidden h-[420px] relative" onMouseMove={(e) => { if (isDragging) handleSliderMove(e as any); }} onTouchMove={(e) => { if (isDragging) handleSliderMove(e as any); }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageExamples[currentImageIndex].afterImage})` }} />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imageExamples[currentImageIndex].beforeImage})` }} />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full">Original</div>
              <div className="absolute bottom-4 right-4 bg-[#E8352A] text-white px-3 py-1 rounded-full">Retouched</div>
            </div>

            <div className="bg-white rounded-2xl border p-6 shadow">
              <h3 className="text-xl font-bold text-[#E8352A] mb-2">Maternity Retouching</h3>
              <p className="text-gray-700 mb-4">Gentle, beautiful retouching that celebrates the miracle of motherhood.</p>
              <div className="text-2xl font-bold mb-4">$0.16 <span className="text-base font-normal text-gray-600">/ image</span></div>
              <button onClick={addToCart} className="w-full bg-[#E8352A] text-white py-3 rounded-lg mb-4">Add to Cart</button>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#E8352A]"/> Soft Skin Glow Enhancement</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#E8352A]"/> Lighting & Background Fix</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#E8352A]"/> Dreamy Color Grading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section id="related-services" className="py-20 bg-gradient-to-b from-[#F7F8FA] to-white text-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#E8352A] mb-4">Related Services</p>
            <h2 className="text-4xl md:text-5xl font-bold">More people retouching services</h2>
            <p className="text-gray-600 mt-4">Explore other portraits and lifestyle retouching options tailored for families, professionals, and fashion shoots.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service, i) => (
              <div key={i} className="relative bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: service.bg, color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                {(() => {
                  const slug = slugify(service.title);
                  return (
                    <>
                      <button type="button" onClick={() => setOpenServiceSlug(prev => prev === slug ? null : slug)} className="inline-flex items-center gap-2 text-xl font-semibold transition-all" style={{ color: service.color }} aria-expanded={openServiceSlug === slug}>
                        View service <ArrowRight className="w-3.5 h-3.5 text-current" />
                      </button>
                      {openServiceSlug === slug && (
                        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-800 shadow-sm">
                          <p className="mb-3">{service.description} Typical turnaround, sample edits, and add-ons.</p>
                          <div className="flex items-center gap-3">
                            <button type="button" onClick={() => setOpenServiceSlug(null)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
                            <Link href={`/service/people/maternity-pregnancy-retouch/${slug}`} className="px-3 py-2 rounded-md bg-[#E8352A] text-white">Open full page</Link>
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
