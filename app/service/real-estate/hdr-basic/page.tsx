// app/hrd-basic/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Users, Briefcase, Target, Shield, Clock, CheckCircle,
  ArrowRight, Play, Pause, ChevronDown,
  BarChart, Award, TrendingUp, Globe,
  Zap, Headphones, FileText, Building, Search, Sparkles, ShoppingCart,
  ChevronLeft, ChevronRight
} from 'lucide-react';

import HeroAnimation from './HeroAnimation';

function HdrServicesSection({ services }: { services: { title: string; description: string; icon: React.ElementType; color: string; bg: string }[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="inline-block text-[#E8352A] text-xl font-bold tracking-[0.2em] uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">
            Our HDR Solutions
          </h2>
          <p className="text-[#777] text-lg">Professional HDR editing services designed to make every listing shine.</p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 border border-[#EBEBEB] bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-transparent transition-all duration-300"
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
              {/* top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />

              {/* icon */}
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                style={{ background: service.bg, color: service.color }}
              >
                {React.createElement(service.icon, { size: 24, className: 'w-10 h-10' })}
              </div>

              <h3 className="text-[#1A1A1A] font-bold text-2xl mb-2 group-hover:text-[#E8352A] transition-colors duration-300">{service.title}</h3>
              <p className="text-[#888] text-lg leading-relaxed mb-5">{service.description}</p>

              <div className="flex items-center gap-1.5 text-xl font-semibold" style={{ color: service.color }}>
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
                  Learn more
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              <span className="absolute top-4 right-5 text-[11px] font-bold text-[#1A1A1A]/10 group-hover:text-[#E8352A]/20 transition-colors duration-300">
                0{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function HdrBasicPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [automationActive, setAutomationActive] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  const sliderDirectionRef = useRef<1 | -1>(1);

  const sliderRef = useRef<HTMLDivElement>(null);
  const automationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sample HDR real estate transformation cases
  const hrCases = [
    {
      id: 1,
      beforeTitle: "Dark Living Room",
      afterTitle: "HDR Brightened Living Room",
      beforeImage: "/images/real-estate-raw.jpg",
      afterImage: "/images/real-estate-corrected.jpg",
      description: "Restore natural light and bring out rich interior details for property photography."
    },
    {
      id: 2,
      beforeTitle: "Overexposed Exterior",
      afterTitle: "Balanced HDR Exterior",
      beforeImage: "/images/real-estate-basic-sky-explosure-before.webp",
      afterImage: "/images/real-estate-basic-sky-explosure-after.webp",
      description: "Fix harsh skies and preserve architectural detail for premium real estate listings."
    },
    {
      id: 3,
      beforeTitle: "Raw Property Capture",
      afterTitle: "HDR Enhanced Property",
      beforeImage: "/images/Real-Estate-Single_Exposure-S-Raw-2.webp",
      afterImage: "/images/Real-Estate-Single_Exposure-S-Corrected-2.webp",
      description: "Turn raw property photos into polished HDR images ready for marketing."
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Process Automation",
      description: "Automate repetitive HR tasks to save time and reduce errors"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Compliance First",
      description: "Stay compliant with automated updates for changing regulations"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Data-Driven Insights",
      description: "Make informed decisions with real-time HR analytics"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Employee Experience",
      description: "Enhance employee satisfaction with self-service tools"
    }
  ];

  const features = [
    "No HDR Blending",
    "Color Correction",
    "Lens Correction",
    "Perspective Correction",
    "Color Cast Removal – Minimal",
    "Sharpening",
    "Output: JPEG, TIFF, PSD"
  ];

  const stats = [
    { value: "70%", label: "Time Saved on Admin Tasks" },
    { value: "99.9%", label: "Payroll Accuracy" },
    { value: "40%", label: "Faster Hiring" },
    { value: "45%", label: "Reduced HR Costs" }
  ];

  const services = [
    { title: 'HDR Merging', description: 'Blend multiple exposures into one perfectly balanced HDR image.', icon: Zap, color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Tone Mapping', description: 'Map HDR tones to natural-looking results for real estate listings.', icon: BarChart, color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Color Correction', description: 'Restore accurate, vibrant colors across every room and exterior shot.', icon: Sparkles, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Sky Enhancement', description: 'Replace or enhance skies for a clean, attractive property backdrop.', icon: Globe, color: '#10B981', bg: '#ECFDF5' },
  ];

  const hrProcesses = [
    {
      step: "1",
      title: "Analyze",
      desc: "Assess current HR processes and pain points",
      icon: <Search className="w-8 h-8" />
    },
    {
      step: "2",
      title: "Automate",
      desc: "Implement automation for repetitive tasks",
      icon: <Zap className="w-8 h-8" />
    },
    {
      step: "3",
      title: "Integrate",
      desc: "Connect with existing systems and tools",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      step: "4",
      title: "Optimize",
      desc: "Continuous improvement with analytics",
      icon: <Target className="w-8 h-8" />
    }
  ];

  // Handle slider movement
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const containerRect = sliderRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = x - containerRect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / containerRect.width) * 100));

    setSliderPosition(percentage);
  };

  // Start/stop automation
  const toggleAutomation = () => {
    if (automationActive) {
      setAutomationActive(false);
      if (automationIntervalRef.current) {
        clearInterval(automationIntervalRef.current);
        automationIntervalRef.current = null;
      }
      setSliderPosition(50);
    } else {
      setAutomationActive(true);
      setSliderPosition(0);

      automationIntervalRef.current = setInterval(() => {
        setSliderPosition(prev => {
          if (prev >= 100) {
            setTimeout(() => {
              setCurrentCaseIndex(prevIndex => (prevIndex + 1) % hrCases.length);
              setSliderPosition(0);
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (automationIntervalRef.current) {
        clearInterval(automationIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDragging || isHoveringSlider) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + sliderDirectionRef.current * 1.5;

        if (next >= 100) {
          sliderDirectionRef.current = -1;
          return 100;
        }
        if (next <= 0) {
          sliderDirectionRef.current = 1;
          return 0;
        }

        return next;
      });
    }, 28);

    return () => window.clearInterval(intervalId);
  }, [isDragging, isHoveringSlider]);

  // Change case manually
  const changeCase = (index: number) => {
    setCurrentCaseIndex(index);
    setAutomationActive(false);
    setSliderPosition(50);
    if (automationIntervalRef.current) {
      clearInterval(automationIntervalRef.current);
      automationIntervalRef.current = null;
    }
  };

  const currentCase = hrCases[currentCaseIndex];

  // Add current service to cart cookie and navigate to /cart
  const addToCart = () => {
    const pricePerImage = 0.14;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));

    const cartItem = {
      service_name: 'HDR Basic',
      qty: 1,
      price: pricePerImage,
      retouching: 'HDR Basic',
      order_name: currentCase.afterTitle,
      order_images: imageCount,
      order_details: currentCase.description,
      addons: [],
      total,
    };

    try {
      const existing = document.cookie.match(/(^| )cart=([^;]+)/);
      const currentCart = existing
        ? JSON.parse(decodeURIComponent(existing[2]))
        : [];
      const updatedCart = Array.isArray(currentCart)
        ? [...currentCart, cartItem]
        : [currentCart, cartItem];
      document.cookie =
        'cart=' + encodeURIComponent(JSON.stringify(updatedCart)) + '; path=/';
    } catch {
      document.cookie =
        'cart=' + encodeURIComponent(JSON.stringify([cartItem])) + '; path=/';
    }

    window.location.href = '/cart';
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* HERO */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-[#0D0D0F]">

        {/* ── background ── */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hdr-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hdr-grid)" />
          </svg>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.14, 0.26, 0.14] }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
            className="absolute -left-48 top-1/4 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut', delay: 2 }}
            className="absolute -right-32 -bottom-24 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.20) 0%, transparent 65%)' }}
          />
          {[...Array(6)].map((_, i) => (
            <motion.div key={i}
              animate={{ y: [0, -20, 0], opacity: [0.25, 0.65, 0.25] }}
              transition={{ repeat: Infinity, duration: 3.5 + i * 0.6, ease: 'easeInOut', delay: i * 0.5 }}
              className="absolute rounded-full bg-[#E8352A]"
              style={{
                width: [5, 3, 7, 4, 6, 4][i], height: [5, 3, 7, 4, 6, 4][i],
                left: `${[8, 25, 44, 60, 76, 90][i]}%`,
                top: `${[15, 62, 10, 78, 32, 52][i]}%`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>

        {/* ── grid ── */}
        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 pt-24 pb-12 lg:py-0">

            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start mb-8 px-4 py-1.5 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] animate-pulse" />
              <span className="text-[#E8352A] text-xs font-semibold tracking-widest uppercase">Real Estate Editing</span>
            </motion.div>

            {/* heading */}
            <h1 className="font-extrabold leading-[0.95] tracking-tight mb-6">
              {[{ word: 'HDR', red: false }, { word: 'Basic', red: true }, { word: 'Editing', red: false }].map(({ word, red }, i) => (
                <motion.span key={word}
                  className={`block text-[clamp(3rem,8vw,7rem)] ${red ? 'text-[#E8352A]' : 'text-white'}`}
                  initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* description */}
            <motion.p
              className="text-[#A0A0B0] text-base md:text-lg leading-relaxed max-w-md mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
              Bring every property to life with professionally edited HDR images. We carefully balance
              lighting, colors, and details to create bright, natural-looking photos that help listings
              stand out and attract more buyers.
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
              <Link href="/free-trial"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_32px_rgba(232,53,42,0.35)] hover:shadow-[0_8px_40px_rgba(232,53,42,0.50)] hover:scale-105">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-sm hover:border-[#E8352A]/50 hover:text-white hover:bg-white/5 transition-all">
                View Examples
              </button>
            </motion.div>

            {/* stats */}
            <motion.div
              className="grid grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
              {[{ value: '50K+', label: 'Photos Edited' }, { value: '24hr', label: 'Delivery' }, { value: '98%', label: 'Satisfaction' }, { value: '10+', label: 'Yrs Experience' }].map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}>
                  <p className="text-2xl lg:text-3xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[11px] text-[#666] mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — full-height before/after slider */}
          <motion.div
            className="relative flex flex-col lg:h-screen"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>

            <div
              ref={sliderRef}
              className="relative flex-1 cursor-col-resize select-none overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mt-4 lg:mt-0"
              style={{ minHeight: 340 }}
              onMouseMove={handleSliderMove}
              onMouseEnter={() => setIsHoveringSlider(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }}
              onTouchMove={handleSliderMove}
              onTouchEnd={() => setIsDragging(false)}
              onMouseUp={() => setIsDragging(false)}
            >
              {/* Before */}
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentCase.beforeImage})`, filter: 'brightness(0.65) saturate(0.55)' }} />

              {/* After */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${currentCase.afterImage})`,
                    width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
                  }} />
              </div>

              {/* Divider */}
              <div className="absolute top-0 bottom-0 z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/70" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-[#E8352A]"
                  style={{ boxShadow: '0 0 0 4px rgba(232,53,42,0.15), 0 8px 24px rgba(0,0,0,0.18)' }}>
                  <div className="flex gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#E8352A]" />
                    <ChevronRight className="w-3.5 h-3.5 text-[#E8352A]" />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <span className="absolute top-5 left-5 z-10 bg-black/55 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md tracking-wider uppercase">Before</span>
              <span className="absolute top-5 right-5 z-10 bg-[#E8352A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">After</span>

              {/* floating HDR badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E8352A]" />
                <span className="text-white text-[11px] font-semibold">HDR Tone Mapping</span>
              </motion.div>

              {/* bottom toolbar overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-6 py-5">
                <div className="flex items-center justify-between gap-2">
                  {['Exposure', 'Tone Map', 'Color', 'Shadows', 'Detail'].map((tab, idx) => (
                    <button key={tab}
                      onClick={() => setAutomationActive(idx === 0 ? !automationActive : automationActive)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${idx === 0 && automationActive
                        ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]'
                        : 'text-white/50 hover:text-white/80'
                        }`}>
                      <span className="text-[9px] font-semibold">{tab}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* image dots */}
            <div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">
              {hrCases.map((_, i) => (
                <button key={i} onClick={() => changeCase(i)}
                  className={`rounded-full transition-all duration-300 ${currentCaseIndex === i
                    ? 'w-8 h-2.5 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.5)]'
                    : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                    }`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}

      {/* HR Transformation Gallery */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">HDR Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555555]">
              See raw property photos transform into stunning HDR masterpieces
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">

            {/* LEFT — Before/After Slider */}
            <div className="flex-1 flex flex-col">
              <div
                ref={sliderRef}
                className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
                onMouseMove={handleSliderMove}
                onTouchMove={handleSliderMove}
                onMouseEnter={() => setIsHoveringSlider(true)}
                onMouseLeave={() => {
                  setIsDragging(false);
                  setIsHoveringSlider(false);
                }}
                onTouchEnd={() => setIsDragging(false)}
                onMouseUp={() => setIsDragging(false)}
              >
                {/* Before (Raw) */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentCase.beforeImage})` }}
                  />
                </div>

                {/* After (HDR) — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentCase.afterImage})`,
                      width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
                    }}
                  />
                </div>

                {/* Divider + Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  onMouseDown={() => setIsDragging(true)}
                  onTouchStart={() => setIsDragging(true)}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
                    <div className="flex items-center gap-0.5">
                      <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
                      <ChevronRight className="w-3 h-3 text-[#E8352A]" />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">Raw</span>
                </div>
                <div className="absolute bottom-4 right-4 z-10">
                  <span className="bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">HDR</span>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={() => changeCase((currentCaseIndex - 1 + hrCases.length) % hrCases.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <button
                  onClick={() => changeCase((currentCaseIndex + 1) % hrCases.length)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT — Service Card */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">
                HDR Basic
              </h3>
              <p className="text-[#555555] text-sm mb-5 leading-relaxed">
                Professional HDR photo editing for real estate — balanced exposure and vibrant detail.
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-[#111111] mb-4">
                $0.14 <span className="text-base font-normal text-[#555555]">/ image</span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={addToCart}
                className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm"
              >
                Add to Cart
              </button>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {[
                  'HDR Merging & Tone Mapping',
                  'Exposure Correction',
                  'Color Enhancement',
                  'Shadow & Highlight Recovery',
                  'White Balance Adjustment',
                  'Natural HDR Look',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#E8352A] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* View More */}
              <Link
                href="/service/real-estate/hdr-basic/check-out"
                className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FFF3F2] font-semibold py-2.5 rounded-lg transition-all text-sm text-center"
              >
                View More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <HdrServicesSection services={services} />


    </div>
  );
}