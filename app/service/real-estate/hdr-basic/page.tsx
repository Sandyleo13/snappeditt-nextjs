// app/hrd-basic/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, Target, Shield, Clock, CheckCircle, 
  ArrowRight, Play, Pause, ChevronDown,
  BarChart, Award, TrendingUp, Globe,
  Zap, Headphones, FileText, Building, Search, Sparkles, ShoppingCart,
  ChevronLeft, ChevronRight
} from 'lucide-react';

import HeroAnimation from './HeroAnimation';

export default function HRDBasicPage() {
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
    {
      title: "HR Automation",
      description: "Streamline HR processes with intelligent automation workflows",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Payroll Management",
      description: "Automated payroll processing with tax compliance",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Talent Acquisition",
      description: "AI-powered recruitment and candidate management",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Performance Management",
      description: "Continuous performance tracking and development",
      icon: <TrendingUp className="w-6 h-6" />
    }
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
    <div className="min-h-screen bg-[#FFF7F5]">
      <section className="relative overflow-hidden bg-[#FFF7F5] py-20 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(232,53,42,0.18),_transparent_25%)] pointer-events-none" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#E8352A]/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 h-56 w-56 rounded-full bg-[#E8352A]/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 xl:px-16">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-slate-950">
                HDR <span className="text-[#E8352A]">Basic</span>
              </h1>
              <p className="max-w-2xl text-3xl font-semibold leading-tight text-slate-800 sm:text-4xl">
                Real Estate Photo Enhancement
              </p>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Bring every property to life with professionally edited HDR images. We carefully balance lighting, colors, and details to create bright, natural-looking photos that help listings stand out and attract more buyers.
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

          <div className="relative flex items-center justify-center">
            <HeroAnimation />
          </div>
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
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-[#F44336] bg-clip-text text-transparent">HR Solutions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive HR management tools designed for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:border-[#F44336] transition-all duration-300 group">
                <div className="w-14 h-14 bg-[#F44336] rounded-2xl flex items-center justify-center mb-6 text-white group-hover:from-indigo-100 group-hover:to-purple-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-[#F44336] font-semibold flex items-center gap-2 whitespace-nowrap transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          {/* <div className="mt-20 bg-[#F44336] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your HR Operations?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of companies that have modernized their HR with HRD Basic. 
              Reduce costs, improve efficiency, and enhance employee experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/service/real-estate/hdr-basic/check-out" className="bg-white text-[#F44336] px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all transform hover:scale-105 flex items-center justify-center gap-3">
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </Link>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                Watch Platform Demo
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5" />
                <span>Free onboarding support</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      
    </div>
  );
}