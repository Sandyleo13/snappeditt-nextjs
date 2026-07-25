// app/hrd-premium/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { 
  Users, Briefcase, Target, Shield, Clock, CheckCircle, 
  ArrowRight, Play, Pause, ChevronDown,
  BarChart, Award, TrendingUp, Globe,
  Zap, Headphones, FileText, Building,
  Crown, Star, Brain, Target as TargetIcon,
  DollarSign, Award as AwardIcon, Cpu, Network,
  ChevronLeft, ChevronRight,
  Sun, Contrast, Layers, Wand2, Sparkles,
  type LucideIcon,
} from 'lucide-react';

function ServicesSection({ services, sectionTitle, sectionDesc }: { services: { 
  title: string; description: string; icon: LucideIcon; color: string; bg: string }[]; sectionTitle: string; sectionDesc: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section id="services" className="relative py-24 bg-[#F8F9FB] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(232,53,42,0.06) 0%, transparent 70%)' }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="inline-block text-[#E8352A] text-xl font-bold tracking-[0.2em] uppercase mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mb-4">{sectionTitle} <span className="text-[#E8352A]">Services</span></h2>
          <p className="text-[#777] text-lg">{sectionDesc}</p>
        </motion.div>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl p-6 border border-[#EBEBEB] bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:border-transparent transition-all duration-300">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}0D 0%, transparent 70%)` }} />
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${service.color}, transparent)` }} />
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: service.bg, color: service.color }}>
                {React.createElement(service.icon, { size: 24 , className: "w-12 h-12" })}
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-2xl mb-2">{service.title}</h3>
              <p className="text-[#888] text-lg leading-relaxed mb-5">{service.description}</p>
              <div className="flex items-center gap-1.5 text-xl font-semibold" style={{ color: service.color }}>
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="absolute top-4 right-5 text-[11px] font-bold text-[#1A1A1A]/10">0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HRDPremiumPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [automationActive, setAutomationActive] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('Exposure');
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  // Auto-oscillate hero before/after slider
  useEffect(() => {
    let dir = 1;
    const id = setInterval(() => {
      setSliderPosition(prev => {
        if (prev >= 75) dir = -1;
        if (prev <= 25) dir = 1;
        return prev + dir * 0.5;
      });
    }, 30);
    return () => clearInterval(id);
  }, []);
  const automationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // HDR Premium real-estate transformation cases
  const hrCases = [
    {
      id: 1,
      beforeTitle: "Raw Interior",
      afterTitle: "Premium HDR Interior",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4694.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4694_5_6.jpg",
      description: "Balance interior light, window detail, and natural color for a premium listing image."
    },
    {
      id: 2,
      beforeTitle: "Flat Exterior",
      afterTitle: "Balanced Exterior",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4706.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4706_7_8.jpg",
      description: "Recover highlights and shadow detail while keeping the exterior clean and realistic."
    },
    {
      id: 3,
      beforeTitle: "Muted Living Room",
      afterTitle: "Rich Natural Tones",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4709.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4709_10_11.jpg",
      description: "Bring depth and warmth to living spaces with controlled tone mapping and color correction."
    },
    {
      id: 4,
      beforeTitle: "Dark Kitchen",
      afterTitle: "Clean HDR Detail",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4733.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4733_4_5.jpg",
      description: "Reveal detail across reflective surfaces and darker areas without an artificial HDR look."
    },
    {
      id: 5,
      beforeTitle: "Cool Raw Room",
      afterTitle: "Warm Premium Finish",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4742.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4742_3_4.jpg",
      description: "Create a cohesive, inviting finish with precise white balance and premium color grading."
    },
    {
      id: 6,
      beforeTitle: "Raw Property View",
      afterTitle: "Listing-Ready HDR",
      beforeImage: "/snappeditt-photos/HDR PRO/DSC_4763.jpg",
      afterImage: "/snappeditt-photos/HDR PRO/DSC_4763_4_5.jpg",
      description: "Deliver a polished, listing-ready image with clean highlights, balanced contrast, and detail."
    }
  ];

  const benefits = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Advanced AI algorithms provide predictive analytics and strategic workforce planning"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Compliance",
      description: "Multi-region compliance management across 150+ countries with automated updates"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Executive Dashboard",
      description: "Real-time executive dashboards with predictive analytics and strategic insights"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Enterprise Integration",
      description: "Seamless integration with enterprise systems (ERP, CRM, Finance) and custom APIs"
    }
  ];

  const features = [
    "AI-powered predictive workforce analytics",
    "Multi-region compliance across 150+ countries",
    "Real-time executive dashboards and reporting",
    "Personalized AI learning and development paths",
    "Enterprise-grade security and data protection",
    "24/7 dedicated account management and support"
  ];

  const stats = [
    { value: "24h", label: "Fast Delivery" },
    { value: "99%", label: "Natural Results" },
    { value: "4.9/5", label: "Client Rating" },
    { value: "50K+", label: "Images Edited" }
  ];

  const services: { title: string; description: string; icon: LucideIcon; color: string; bg: string }[] = [
    { title: 'HDR Merging',        description: 'Blend multiple exposures into one perfectly balanced HDR image.',              icon: Brain,   color: '#E8352A', bg: '#FFF0EE' },
    { title: 'Advanced Tone Map',  description: 'Multi-country HDR tone mapping with natural-looking results.',                icon: Globe,   color: '#7C3AED', bg: '#F5F0FF' },
    { title: 'Color Correction',   description: 'Advanced color grading and correction for premium real estate listings.',     icon: Crown,   color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Sky Enhancement',    description: 'Seamless sky replacement and enhancement for stunning property backdrops.',   icon: Network, color: '#10B981', bg: '#ECFDF5' },
  ];

  const hrProcesses = [
    {
      step: "1",
      title: "Assess",
      desc: "Comprehensive assessment of current HR maturity and strategic goals",
      icon: "📊"
    },
    {
      step: "2",
      title: "Strategy",
      desc: "Develop AI-driven HR strategy aligned with business objectives",
      icon: "🎯"
    },
    {
      step: "3",
      title: "Implement",
      desc: "Enterprise implementation with change management and training",
      icon: "⚡"
    },
    {
      step: "4",
      title: "Optimize",
      desc: "Continuous optimization with AI insights and strategic refinement",
      icon: "🚀"
    }
  ];

  // Animated Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: i % 3 === 0 ? 'rgba(99, 102, 241, 0.5)' : 
               i % 3 === 1 ? 'rgba(139, 92, 246, 0.5)' : 
               'rgba(236, 72, 153, 0.5)'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle slider movement
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, targetRef = sliderRef) => {
    if (!isDragging || !targetRef.current) return;
    
    e.preventDefault();
    const containerRect = targetRef.current.getBoundingClientRect();
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
  const editorTabs = ['Exposure', 'Contrast', 'Highlights', 'Shadows', 'Color'];

  // Add current service to cart cookie and navigate to /cart
  const addToCart = () => {
    const pricePerImage = 0.20;
    const imageCount = 50;
    const total = parseFloat((pricePerImage * imageCount).toFixed(2));

    const cartItem = {
      service_name: 'HDR Premium',
      qty: 1,
      price: pricePerImage,
      retouching: 'HDR Premium',
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
    <div className="min-h-screen bg-white">
      <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0D0D0F]">
        <div className="pointer-events-none absolute inset-0"><motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }} className="absolute -left-40 top-1/3 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.35) 0%, transparent 65%)' }} /><motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.20, 0.12] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }} className="absolute -right-32 -bottom-20 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.25) 0%, transparent 65%)' }} /><svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E8352A" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg></div>
        <div className="relative z-10 flex min-h-screen flex-1 flex-col lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 pb-12 pt-24 sm:px-12 lg:px-16 lg:py-0 xl:px-24"><motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 inline-flex self-start items-center gap-2 rounded-full border border-[#E8352A]/30 bg-[#E8352A]/10 px-4 py-1.5 backdrop-blur-sm"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E8352A]" /><span className="text-xs font-semibold uppercase tracking-widest text-[#E8352A]">HDR Premium Editing</span></motion.div><h1 className="mb-6 font-extrabold leading-[0.95] tracking-tight">{['HDR', 'Premium', 'Editing'].map((word, i) => <motion.span key={word} className={`block text-[clamp(3rem,8vw,7rem)] ${i === 1 ? 'text-[#E8352A]' : 'text-white'}`} initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>)}</h1><motion.p className="mb-10 max-w-md text-base leading-relaxed text-[#A0A0B0] md:text-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>Transform property photographs with expert manual editing — precise exposure correction, color grading, and perspective fixes that make listings sell faster.</motion.p><motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}><Link href="/free-trial" className="group inline-flex items-center gap-2 rounded-2xl bg-[#E8352A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(232,53,42,0.45)] transition-all hover:scale-105 hover:bg-[#C62B20]">Get Started Free<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-white/80 transition-all hover:border-[#E8352A]/50 hover:bg-white/5 hover:text-white">View Examples</button></motion.div><motion.div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 sm:grid-cols-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>{[{ value: '24h', label: 'Delivery' }, { value: '$0.20', label: 'Per Image' }, { value: '100%', label: 'Manual Edit' }, { value: '∞', label: 'Revisions' }].map((stat, i) => <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}><p className="text-2xl font-extrabold text-white lg:text-3xl">{stat.value}</p><p className="mt-0.5 text-[11px] uppercase tracking-wider text-[#666]">{stat.label}</p></motion.div>)}</motion.div></div>
          <motion.div className="relative flex flex-col lg:h-screen" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}><div ref={heroSliderRef} className="relative mx-4 mt-4 min-h-[340px] flex-1 cursor-col-resize select-none overflow-hidden rounded-2xl lg:mx-0 lg:mt-0 lg:rounded-none" onMouseMove={(e) => handleSliderMove(e, heroSliderRef)} onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)} onMouseEnter={() => setIsHoveringSlider(true)} onMouseLeave={() => { setIsDragging(false); setIsHoveringSlider(false); }} onTouchMove={(e) => handleSliderMove(e, heroSliderRef)} onTouchStart={() => setIsDragging(true)} onTouchEnd={() => setIsDragging(false)}><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCase.beforeImage})`, filter: 'brightness(0.7) saturate(0.6)' }} /><div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${currentCase.afterImage})`, width: `${100 / Math.max(sliderPosition, 1) * 100}%` }} /></div><div className="absolute bottom-0 top-0 z-10" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}><div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/60" /><div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E8352A] bg-white shadow-2xl"><ChevronLeft className="h-3.5 w-3.5 text-[#E8352A]" /><ChevronRight className="h-3.5 w-3.5 text-[#E8352A]" /></div></div><span className="absolute left-5 top-5 z-10 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">Before</span><span className="absolute right-5 top-5 z-10 rounded-full bg-[#E8352A] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">After</span><motion.div animate={{ y: isHoveringSlider ? [-4, 4, -4] : 0 }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute left-1/2 top-5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"><Sparkles className="h-3.5 h-3.5 text-[#E8352A]" /><span className="whitespace-nowrap text-[11px] font-semibold text-white">AI-Assisted Manual Edit</span></motion.div><div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-6 py-5"><div className="flex items-center justify-between gap-2">{editorTabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all ${activeTab === tab ? 'bg-[#E8352A] text-white shadow-[0_0_16px_rgba(232,53,42,0.5)]' : 'text-white/50 hover:text-white/80'}`}>{tab === 'Exposure' && <Sun className="h-4 w-4" />}{tab === 'Contrast' && <Contrast className="h-4 w-4" />}{tab === 'Highlights' && <Sun className="h-4 w-4 opacity-70" />}{tab === 'Shadows' && <Layers className="h-4 w-4" />}{tab === 'Color' && <Wand2 className="h-4 w-4" />}<span className="text-[9px] font-semibold">{tab}</span></button>)}</div></div></div><div className="flex items-center justify-center gap-3 py-5 lg:absolute lg:bottom-24 lg:right-6 lg:flex-col lg:py-0">{hrCases.map((_, i) => <button aria-label={`Show example ${i + 1}`} key={i} onClick={() => changeCase(i)} className={`rounded-full transition-all duration-300 ${currentCaseIndex === i ? 'h-2.5 w-8 bg-[#E8352A] shadow-[0_0_8px_rgba(232,53,42,0.7)]' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/50'}`} />)}</div></motion.div>
        </div>
      </section>

      {/* Premium Transformation Gallery */}
      <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Watch <span className="text-[#E8352A]">HDR Premium Transform</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#555555]">
              See unbalanced photos magically transform into perfectly color-balanced masterpieces
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
                onMouseLeave={() => setIsDragging(false)}
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

                {/* After (HDR Premium) — clipped */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${currentCase.afterImage})`,
                      width: `${100 / Math.max(sliderPosition, 1) * 100}%`,
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
                  <span className="bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">HDR Premium</span>
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
                HDR Premium
              </h3>
              <p className="text-[#555555] text-sm mb-5 leading-relaxed">
                Premium HDR photo editing for real estate — advanced tone mapping and stunning detail.
              </p>

              {/* Price */}
              <div className="text-2xl font-bold text-[#111111] mb-4">
                $0.20 <span className="text-base font-normal text-[#555555]">/ image</span>
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
                  'Exposure Correction',
                  'Contrast',
                  'Temperature',
                  'Shadow & Highlight Recovery',
                  'Defringe / Camera Profile Enabling',
                  'Hue',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-[#333333]">
                    <CheckCircle className="w-4 h-4 text-[#E8352A] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* View More */}
              <button className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FFF3F2] font-semibold py-2.5 rounded-lg transition-all text-sm">
                View More
              </button>
            </div>

          </div>
        </div>
      </section>

      <ServicesSection services={services} sectionTitle="HDR Premium" sectionDesc="Premium HDR solutions designed for professional real estate photography." />

      {/* Premium Services Section - hidden */}
      <section id="services-old" className="py-20 bg-gradient-to-b from-white to-purple-50 hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-[#F44336] bg-clip-text text-transparent">Enterprise</span> Services
            </h2>
            <p className="text-xl text-gray-600">
              Premium HR solutions designed for Fortune 500 companies and large enterprises
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 z-1">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:border-red-300 transition-all duration-500 group relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-grey opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F44336] rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                    <Star className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="relative z-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[#F44336] group-hover:scale-110 transition-transform duration-300">
                    {React.createElement(service.icon, { className: 'w-6 h-6' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F44336] transition-colors">{service.title}</h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">{service.description}</p>
                  <button className="text-[#F44336] font-semibold flex items-center gap-2 whitespace-nowrap transition-all">
                    Explore feature
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

     
      
      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}