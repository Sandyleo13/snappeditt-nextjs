// app/hrd-premium/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, Target, Shield, Clock, CheckCircle, 
  ArrowRight, Play, Pause, ChevronDown,
  BarChart, Award, TrendingUp, Globe,
  Zap, Headphones, FileText, Building,
  Crown, Star, Brain, Target as TargetIcon,
  DollarSign, Award as AwardIcon, Cpu, Network,
  ChevronLeft, ChevronRight
} from 'lucide-react';



export default function HRDPremiumPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [automationActive, setAutomationActive] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const sliderRef = useRef<HTMLDivElement>(null);

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
  
  // Sample Premium HR transformation cases
  const hrCases = [
    {
      id: 1,
      beforeTitle: "Basic HRIS",
      afterTitle: "AI-Powered HR Suite",
      beforeImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop&brightness=120&contrast=20&saturation=150",
      description: "Upgrade from basic HR systems to comprehensive AI-powered HR management suite"
    },
    {
      id: 2,
      beforeTitle: "Local HR Tools",
      afterTitle: "Global HR Platform",
      beforeImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=15",
      description: "Transform local HR tools into a unified global platform with multi-region compliance"
    },
    {
      id: 3,
      beforeTitle: "Reactive HR",
      afterTitle: "Predictive Analytics",
      beforeImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop&desaturate=50",
      afterImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
      description: "Move from reactive HR to predictive workforce analytics and strategic planning"
    },
    {
      id: 4,
      beforeTitle: "Manual Analytics",
      afterTitle: "Real-Time Dashboard",
      beforeImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=20&saturation=140",
      description: "Replace manual reporting with real-time executive dashboards and predictive insights"
    },
    {
      id: 5,
      beforeTitle: "Standard Training",
      afterTitle: "Personalized Learning",
      beforeImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop&brightness=110&contrast=15&saturation=130",
      description: "Transform standard training programs into AI-powered personalized learning journeys"
    },
    {
      id: 6,
      beforeTitle: "Annual Reviews",
      afterTitle: "Continuous Feedback",
      beforeImage: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&q=80&auto=format&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&q=80&auto=format&fit=crop&saturation=150",
      description: "Upgrade from annual reviews to continuous feedback and real-time performance coaching"
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
    { value: "85%", label: "Strategic HR Time Increase" },
    { value: "60%", label: "Faster Decision Making" },
    { value: "99.99%", label: "Platform Uptime" },
    { value: "40%", label: "Employee Retention Boost" }
  ];

  const services = [
    {
      title: "Strategic HR Analytics",
      description: "AI-powered workforce planning and predictive analytics for strategic decisions",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Global HR Management",
      description: "Multi-country HR operations with local compliance and payroll",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Executive Leadership Tools",
      description: "Advanced dashboards and reporting for C-level HR insights",
      icon: <Crown className="w-6 h-6" />
    },
    {
      title: "Enterprise Integration",
      description: "Seamless integration with existing enterprise systems and custom workflows",
      icon: <Network className="w-6 h-6" />
    }
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
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen bg-[#FFF7F5] overflow-hidden flex items-center">

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E8352A]/12 blur-3xl" />
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full bg-[#E8352A]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#E8352A]/5 blur-3xl" />
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#E8352A 1px,transparent 1px)', backgroundSize: '26px 26px' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── LEFT: Text ── */}
            <div className="space-y-8">
          
              <div className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-slate-950 leading-tight">
                  HDR <span className="text-[#E8352A]">Premium</span>
                </h1>
                <p className="text-2xl font-semibold text-slate-700 sm:text-3xl">
                  Professional Photo Enhancement
                </p>
                <p className="text-base leading-8 text-slate-600 sm:text-lg max-w-lg">
                  Elevate your real estate listings with our premium HDR editing. Advanced tone mapping, colour correction, and sky replacement — delivered in 24 hours with unlimited revisions.
                </p>
              </div>

               <motion.div className="flex flex-wrap gap-3 pt-1"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66, duration: 0.5 }}>
                <Link href="/free-trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E8352A] text-white font-semibold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.30)] hover:scale-105">
          Get Start For Free
        
                </Link>
                   <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#E8352A]/40 text-[#E8352A] font-semibold text-sm hover:bg-[#FFF3F2] transition-all">
                  View Examples
                </button>
              </motion.div>


            </div>

            {/* ── RIGHT: Auto-animating before/after comparison ── */}
            <div className="relative w-full max-w-[600px] mx-auto">

              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-[#E8352A]/10 blur-3xl scale-110 pointer-events-none" />

              {/* Before/After card */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-white/80 bg-white">
                {/* After (base layer) */}
                <img
                  src="/snappeditt-photos/HDR PRO/DSC_4694_5_6.jpg"
                  alt="After HDR Premium"
                  className="w-full aspect-[4/3] object-cover"
                />

                {/* Before (clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden transition-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="/snappeditt-photos/HDR PRO/DSC_4694.jpg"
                    alt="Before HDR Premium"
                    className="w-full aspect-[4/3] object-cover"
                    style={{ minWidth: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%' }}
                  />
                </div>

                {/* Divider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#E8352A] shadow-xl flex items-center justify-center text-white font-bold text-sm">
                    ↔
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 z-10 bg-black/65 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">Before</div>
                <div className="absolute top-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1.5 rounded-full">HDR Premium</div>
              </div>

              {/* Floating stat card — Exposure */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute -left-10 top-16 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20"
              >
                <p className="text-xs font-semibold text-slate-700">Exposure</p>
                <p className="text-lg font-extrabold text-[#E8352A]">+1.4 EV</p>
              </motion.div>

              {/* Floating stat card — Contrast */}
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="absolute -right-8 top-1/3 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20"
              >
                <p className="text-xs font-semibold text-slate-700">Contrast</p>
                <p className="text-lg font-extrabold text-[#E8352A]">+28%</p>
              </motion.div>

              {/* Floating stat card — Lighting bar */}
              <motion.div
                animate={{ y: [-12, 12, -12] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute left-16 -bottom-6 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 z-20"
              >
                <p className="text-xs font-semibold text-slate-700 mb-1.5">Tone Mapping</p>
                <div className="w-28 h-2 rounded-full bg-slate-100">
                  <div className="w-[85%] h-2 rounded-full bg-[#E8352A]" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">85% optimised</p>
              </motion.div>
            </div>
          </div>
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

      {/* Premium Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-purple-50">
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
                    {service.icon}
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

          {/* Premium CTA Section */}
          {/* <div className="mt-20 bg-[#F44336] rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
        
           <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full translate-x-32 translate-y-32"></div>
             
            <div className="relative z-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Crown className="w-5 h-5 text-white-300" />
                <span className="text-white text-sm font-medium">Enterprise Grade Solution</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready for Strategic <span className="bg-black bg-clip-text text-transparent">HR Transformation</span>?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join industry leaders who trust HRD Premium for their enterprise HR needs. 
                Schedule a personalized demo with our enterprise solutions team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-red-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 whitespace-nowrap group">
                  <Crown className="w-5 h-5" />
                  Schedule Enterprise Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all shadow-lg flex items-center justify-center gap-3 whitespace-nowrap group">
                  <Play className="w-5 h-5" />
                  View Case Studies
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-10">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-red-300" />
                  <span>Dedicated Implementation Team</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-red-300" />
                  <span>24/7 Premium Support</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-red-300" />
                  <span>Custom Enterprise Solutions</span>
                </div>
              </div>
            </div>
          </div> */}
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