"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Camera,
  Sparkles,
  Users,
  Target,
  Eye,
  Award,
  Zap,
  Shield,
  Globe,
  Heart,
  Crop,
  SlidersHorizontal,
  Droplet,
  Sun,
  Palette,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  TrendingUp,
  Clock,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Trophy,
  ChevronRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentStat, setCurrentStat] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      imageColor: "from-blue-500 to-cyan-500",
      description: "Former Google AI researcher with 10+ years in computer vision",
      funFact: "Photography enthusiast since age 12"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      imageColor: "from-purple-500 to-pink-500",
      description: "PhD in Computer Science, specializing in image processing",
      funFact: "Loves astrophotography"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      imageColor: "from-green-500 to-emerald-500",
      description: "Ex-Adobe product lead with passion for creative tools",
      funFact: "Collects vintage cameras"
    },
    {
      name: "Emma Wilson",
      role: "Lead AI Engineer",
      imageColor: "from-orange-500 to-amber-500",
      description: "Machine learning expert focused on generative AI",
      funFact: "Competitive photographer"
    }
  ];

  const milestones = [
    { year: "2021", title: "Founded", description: "Started with vision to democratize professional photo editing" },
    { year: "2022", title: "First AI Model", description: "Launched proprietary AI for automatic image enhancement" },
    { year: "2022", title: "10K Users", description: "Reached first major milestone of satisfied customers" },
    { year: "2023", title: "Series A Funding", description: "Raised $15M to expand AI capabilities" },
    { year: "2023", title: "Team Growth", description: "Expanded team to 50+ experts worldwide" },
    { year: "2024", title: "Industry Awards", description: "Recognized as top AI photo editor globally" }
  ];

  const stats = [
    { value: "50,000+", label: "Happy Customers", icon: Users, color: "bg-[#F44336]" },
    { value: "5M+", label: "Photos Edited", icon: Camera, color: "bg-[#F44336]" },
    { value: "98%", label: "Satisfaction Rate", icon: Star, color: "bg-[#F44336]" },
    { value: "40+", label: "Countries Served", icon: Globe, color: "bg-[#F44336]" }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation First",
      description: "Constantly pushing boundaries of what AI can achieve in creative fields"
    },
    {
      icon: Shield,
      title: "Quality Obsessed",
      description: "Never compromise on the quality of our edits and customer experience"
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Our customers' success stories drive everything we do"
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Deliver professional results in minutes, not days"
    }
  ];

  const reasons = [
    {
      icon: CheckCircle,
      title: "One Stop Solution",
      description: "From retouching to advanced composites, we handle every photo editing need."
    },
    {
      icon: Target,
      title: "Parallel Styling",
      description: "Maintain consistent visual identity across campaigns and product ranges."
    },
    {
      icon: Users,
      title: "Building Relations",
      description: "We partner closely with brands to deliver quality that inspires loyalty."
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description: "Fast delivery without compromising on the professional finish."
    },
    {
      icon: Award,
      title: "Competitive Prices",
      description: "Premium edits at pricing designed for freelancers and growing businesses."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Secure uploads, encrypted storage, and privacy-first handling on every file."
    },
    {
      icon: Globe,
      title: "Dedicated Team",
      description: "A global creative team delivering expert support across time zones."
    }
    ,
    {
      icon: Phone,
      title: "24/7 Support",
      description: "Our support team is always available to assist you anytime, anywhere."
    }
  ];

  const faqs = [
    {
      question: "What makes SnapEdit different from other photo editors?",
      answer: "SnapEdit combines professional-grade AI with human artistry. While other tools focus on filters, we use advanced machine learning to understand image context, apply professional editing principles, and deliver results that maintain natural beauty while enhancing visual appeal."
    },
    {
      question: "Is my data safe with SnapEdit?",
      answer: "Absolutely. We use military-grade encryption for all uploads, images are automatically deleted after processing, and we never share or sell your data. We're GDPR compliant and undergo regular security audits."
    },
    {
      question: "Do you offer custom solutions for businesses?",
      answer: "Yes! We provide enterprise solutions with custom AI models, API access, bulk processing, and dedicated support. Many real estate agencies, photography studios, and e-commerce brands use our customized solutions."
    },
    {
      question: "How accurate is the AI editing?",
      answer: "Our AI achieves 95%+ accuracy on most editing tasks. We combine multiple neural networks trained on millions of professionally edited images. For critical work, our pro editors review results to ensure perfection."
    },
    {
      question: "Can I edit photos in batches?",
      answer: "Yes! Our batch processing feature allows you to upload up to 100 images at once, apply consistent edits across all photos, and download them as a ZIP file. Perfect for wedding photographers and real estate agents."
    },
    {
      question: "What file formats do you support?",
      answer: "We support all major formats: JPG, PNG, WEBP, HEIC, and RAW files from most camera brands. Output is delivered in your preferred format with no quality loss."
    },
    {
      question: "How long does editing take?",
      answer: "Most edits are completed in 30 seconds to 2 minutes. Complex edits like day-to-dusk transformations take 2-3 minutes. Our AI scales automatically to handle demand spikes."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with the results, we'll re-edit your photos or provide a full refund within 30 days."
    }
  ];

  const achievements = [
    "AI Photo Editor of the Year 2023",
    "Forbes 30 Under 30 - Technology",
    "Product Hunt #1 Product of the Day",
    "500,000+ 5-star reviews",
    "ISO 27001 Certified Security",
    "Zero Data Breaches Since Launch"
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Auto-rotate stats
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % stats.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        ".hero-title",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
        }
      );

      // Timeline animations
      gsap.fromTo(
        ".timeline-item",
        {
          scale: 0.8,
          opacity: 0,
          y: 50,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
          },
        }
      );

      // Stats animations
      gsap.fromTo(
        ".stat-item",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top center",
          },
        }
      );

      // Team animations
      gsap.fromTo(
        ".team-card",
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".team-section",
            start: "top center",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (

    <main className="min-h-screen bg-[var(--background)]">

      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--background)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-[var(--background)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(248,113,113,0.14),transparent_22%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),transparent_22%)]" />
          <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[var(--primary)]/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[var(--accent-to)]/10 blur-3xl" />
          <div className="relative w-full max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
              <div className="space-y-8">
                <div className="max-w-2xl">
                  <p className="text-sm uppercase tracking-[0.5em] text-[var(--primary)] mb-4">
                    Photo Editing for Professionals
                  </p>
                  <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-heading)] leading-tight">
                    Redefining <span className="text-[var(--primary)]">Photo Editing</span>
                  </h1>
                </div>

                <div className="space-y-5 max-w-2xl text-left">
                  <p className="text-lg sm:text-xl leading-relaxed text-[var(--text-paragraph)]">
                    We are a professional post production company based in Mumbai, India. We offer cost effective post production solutions to photographers and businesses working in Real Estate, Wedding, Commercial, Portrait, and more.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-[var(--text-paragraph)]">
                    Our main aim is to help photographers increase productivity and reduce the burden of image editing by delivering consistent quality, fast turnaround, and cost effective pricing.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-[var(--text-paragraph)]">
                    Currently we have 150+ professional editors working 24/7 to match the turnaround time expectations of our partners.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/free-trial"
                    className="group inline-flex items-center justify-center rounded-3xl bg-[var(--primary)] px-8 py-4 text-white font-semibold shadow-2xl shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--primary)]/30"
                  >
                    <span className="flex items-center gap-2">
                      Try Free Trial
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                  {/* <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white/90 px-8 py-4 text-[var(--text-heading)] transition-all duration-300 hover:border-[var(--primary)] hover:bg-white">
                    Watch Our Story
                  </button> */}
                </div>

                {/* <div className="flex flex-wrap items-center gap-4">
                  <div className="flex -space-x-3">
                    <img src="/toWEBP/avatar1.png" alt="Editor" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="/toWEBP/avatar2.png" alt="Editor" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="/toWEBP/avatar3.png" alt="Editor" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="/toWEBP/avatar4.png" alt="Editor" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm" />
                  </div>
                  <div className="rounded-full bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--text-heading)] shadow-sm shadow-slate-200/40">
                    150+ Professional Editors
                  </div>
                </div> */}
              </div>

              <div className="relative mx-auto w-full max-w-[650px]">
                <div className="relative mx-auto flex h-[600px] w-[600px] items-center justify-center">

                  {/* Ripple rings — SVG circles with stroke-fill animation */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Static base rings */}
                    <circle cx="300" cy="300" r="298" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                    <circle cx="300" cy="300" r="276" stroke="#fecaca" strokeWidth="0.8" opacity="0.4" />
                    <circle cx="300" cy="300" r="238" stroke="#fca5a5" strokeWidth="0.8" opacity="0.35" />
                    <circle cx="300" cy="300" r="190" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.4" />
                    <circle cx="300" cy="300" r="135" stroke="#fecaca" strokeWidth="0.8" opacity="0.35" />

                    {/* Ripple ring 1 — innermost, fastest */}
                    <circle
                      cx="300" cy="300" r="135"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="848"
                      strokeDashoffset="848"
                      className="ring-r135"
                    />
                    {/* Ripple ring 2 */}
                    <circle
                      cx="300" cy="300" r="190"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="1194"
                      strokeDashoffset="1194"
                      className="ring-r190"
                    />
                    {/* Ripple ring 3 */}
                    <circle
                      cx="300" cy="300" r="238"
                      stroke="#ef4444"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeDasharray="1495"
                      strokeDashoffset="1495"
                      className="ring-r238"
                    />
                    {/* Ripple ring 4 */}
                    <circle
                      cx="300" cy="300" r="276"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeDasharray="1734"
                      strokeDashoffset="1734"
                      className="ring-r276"
                    />
                    {/* Ripple ring 5 — outermost */}
                    <circle
                      cx="300" cy="300" r="298"
                      stroke="#ef4444"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeDasharray="1872"
                      strokeDashoffset="1872"
                      className="ring-r298"
                    />
                  </svg>

                  {/* Red gradient glow — pulses */}
                  <div className="absolute inset-[40px] rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-red-400/40 via-red-300/20 to-transparent blur-2xl animate-glow-pulse" />
                  </div>
                  {/* Softer inner glow — pulses offset */}
                  <div className="absolute inset-[180px] rounded-full bg-red-400/15 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

                  {/* SVG arc decorative lines — draw-on animation */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer sweep arc */}
                    <path
                      d="M 300 60 A 240 240 0 0 1 540 300"
                      stroke="url(#arcGrad1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      className="animate-draw-arc-1"
                    />
                    {/* Inner sweep arc */}
                    <path
                      d="M 300 110 A 190 190 0 0 1 490 300"
                      stroke="url(#arcGrad2)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      fill="none"
                      className="animate-draw-arc-2"
                    />
                    {/* Dashed arc bottom — rotates */}
                    <path
                      d="M 180 480 A 190 190 0 0 0 480 420"
                      stroke="#f87171"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.35"
                    />
                    <defs>
                      <linearGradient id="arcGrad1" x1="300" y1="60" x2="540" y2="300" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.1" />
                        <stop offset="60%" stopColor="#ef4444" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                      </linearGradient>
                      <linearGradient id="arcGrad2" x1="300" y1="110" x2="490" y2="300" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* ── Floating icon cards — each with staggered float delay ── */}

                  {/* Crop — top left */}
                  <div className="absolute left-[52px] top-[68px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg shadow-slate-200/50 backdrop-blur-xl animate-icon-float" style={{ animationDelay: "0s" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[var(--primary)]">
                      <Crop className="h-5 w-5" />
                    </div>
                  </div>

                  {/* SlidersHorizontal — top right */}
                  <div className="absolute right-[52px] top-[80px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg shadow-slate-200/50 backdrop-blur-xl animate-icon-float" style={{ animationDelay: "0.8s" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[var(--primary)]">
                      <SlidersHorizontal className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Droplet — middle left */}
                  <div className="absolute left-[28px] top-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg shadow-slate-200/50 backdrop-blur-xl animate-icon-float" style={{ animationDelay: "1.6s" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[var(--primary)]">
                      <Droplet className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Sun — bottom left */}
                  <div className="absolute left-[68px] bottom-[80px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg shadow-slate-200/50 backdrop-blur-xl animate-icon-float" style={{ animationDelay: "2.4s" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[var(--primary)]">
                      <Sun className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Palette — bottom right */}
                  <div className="absolute right-[62px] bottom-[100px] rounded-2xl border border-red-200/60 bg-red-50/90 p-3.5 shadow-lg shadow-red-200/40 backdrop-blur-xl animate-icon-float" style={{ animationDelay: "3.2s" }}>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-[var(--primary)]">
                      <Palette className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Centre circle — subtle scale pulse */}
                  <div className="relative z-10 flex h-[260px] w-[260px] items-center justify-center rounded-full bg-white/95 shadow-2xl shadow-black/15 border border-white/60 animate-center-pulse">
                    <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-red-50/60 to-white/40" />
                    <img src="/icons/photo-edit.svg" alt="Photo edit icon" className="relative z-10 h-20 w-20 animate-float" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes float2 {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-10px, -15px);
            }
          }

          @keyframes particle {
            0% {
              transform: translateY(0);
              opacity: 0.2;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-40px);
              opacity: 0.2;
            }
          }

          @keyframes spinSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          .animate-spin-slow {
            animation: spinSlow 18s linear infinite;
          }

          .animate-spin-reverse {
            animation: spinReverse 22s linear infinite;
          }

          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          .animate-float2 {
            animation: float2 5s ease-in-out infinite;
          }

          .animate-float3 {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float4 {
            animation: float2 7s ease-in-out infinite;
          }

          .animate-float5 {
            animation: float 5.5s ease-in-out infinite;
          }

          .animate-particle {
            animation: particle 6s ease-in-out infinite;
          }

          /* Ring ripple fill — draws around then fades, one per ring size */
          @keyframes ripple135 {
            0%   { stroke-dashoffset: 848;  opacity: 0; }
            8%   { opacity: 1; }
            65%  { stroke-dashoffset: 0; opacity: 0.85; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 848;  opacity: 0; }
          }
          @keyframes ripple190 {
            0%   { stroke-dashoffset: 1194; opacity: 0; }
            8%   { opacity: 1; }
            65%  { stroke-dashoffset: 0; opacity: 0.75; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1194; opacity: 0; }
          }
          @keyframes ripple238 {
            0%   { stroke-dashoffset: 1495; opacity: 0; }
            8%   { opacity: 1; }
            65%  { stroke-dashoffset: 0; opacity: 0.65; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1495; opacity: 0; }
          }
          @keyframes ripple276 {
            0%   { stroke-dashoffset: 1734; opacity: 0; }
            8%   { opacity: 1; }
            65%  { stroke-dashoffset: 0; opacity: 0.5; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1734; opacity: 0; }
          }
          @keyframes ripple298 {
            0%   { stroke-dashoffset: 1872; opacity: 0; }
            8%   { opacity: 1; }
            65%  { stroke-dashoffset: 0; opacity: 0.35; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1872; opacity: 0; }
          }
          .ring-r135 { animation: ripple135 3s ease-in-out infinite; }
          .ring-r190 { animation: ripple190 3s ease-in-out infinite; animation-delay: 0.5s; }
          .ring-r238 { animation: ripple238 3s ease-in-out infinite; animation-delay: 1s; }
          .ring-r276 { animation: ripple276 3s ease-in-out infinite; animation-delay: 1.5s; }
          .ring-r298 { animation: ripple298 3s ease-in-out infinite; animation-delay: 2s; }

          /* Icon cards — gentle up/down float with slight X drift */
          @keyframes iconFloat {
            0%, 100% { transform: translate(0px, 0px); }
            33%       { transform: translate(-4px, -10px); }
            66%       { transform: translate(3px, -6px); }
          }
          .animate-icon-float {
            animation: iconFloat 5s ease-in-out infinite;
          }

          /* Glow blob pulsing */
          @keyframes glowPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50%       { opacity: 1;   transform: scale(1.12); }
          }
          .animate-glow-pulse {
            animation: glowPulse 4s ease-in-out infinite;
          }

          /* Centre circle subtle scale breath */
          @keyframes centerPulse {
            0%, 100% { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15); transform: scale(1); }
            50%       { box-shadow: 0 25px 60px -8px rgba(239,68,68,0.18); transform: scale(1.025); }
          }
          .animate-center-pulse {
            animation: centerPulse 6s ease-in-out infinite;
          }

          /* Arc draw-on — outer arc (stroke ~380 units) */
          @keyframes drawArc1 {
            0%   { stroke-dashoffset: 380; opacity: 0; }
            10%  { opacity: 0.5; }
            60%  { stroke-dashoffset: 0; opacity: 0.9; }
            80%  { stroke-dashoffset: 0; opacity: 0.9; }
            100% { stroke-dashoffset: 380; opacity: 0; }
          }
          .animate-draw-arc-1 {
            stroke-dasharray: 380;
            stroke-dashoffset: 380;
            animation: drawArc1 4s ease-in-out infinite;
          }

          /* Arc draw-on — inner arc (stroke ~300 units) */
          @keyframes drawArc2 {
            0%   { stroke-dashoffset: 300; opacity: 0; }
            10%  { opacity: 0.4; }
            60%  { stroke-dashoffset: 0; opacity: 0.7; }
            80%  { stroke-dashoffset: 0; opacity: 0.7; }
            100% { stroke-dashoffset: 300; opacity: 0; }
          }
          .animate-draw-arc-2 {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            animation: drawArc2 4s ease-in-out infinite;
            animation-delay: 0.6s;
          }

          /* Vision/Mission image overlay — ring ripples */
          @keyframes vmRipple1 {
            0%   { stroke-dashoffset: 691;  opacity: 0; }
            8%   { opacity: 0.9; }
            65%  { stroke-dashoffset: 0; opacity: 0.7; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 691;  opacity: 0; }
          }
          @keyframes vmRipple2 {
            0%   { stroke-dashoffset: 974;  opacity: 0; }
            8%   { opacity: 0.75; }
            65%  { stroke-dashoffset: 0; opacity: 0.55; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 974;  opacity: 0; }
          }
          @keyframes vmRipple3 {
            0%   { stroke-dashoffset: 1257; opacity: 0; }
            8%   { opacity: 0.6; }
            65%  { stroke-dashoffset: 0; opacity: 0.4; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1257; opacity: 0; }
          }
          @keyframes vmRipple4 {
            0%   { stroke-dashoffset: 1539; opacity: 0; }
            8%   { opacity: 0.45; }
            65%  { stroke-dashoffset: 0; opacity: 0.25; }
            82%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 1539; opacity: 0; }
          }
          .vm-ring-1 { animation: vmRipple1 3.5s ease-in-out infinite; animation-delay: 0s; }
          .vm-ring-2 { animation: vmRipple2 3.5s ease-in-out infinite; animation-delay: 0.5s; }
          .vm-ring-3 { animation: vmRipple3 3.5s ease-in-out infinite; animation-delay: 1s; }
          .vm-ring-4 { animation: vmRipple4 3.5s ease-in-out infinite; animation-delay: 1.5s; }

          /* Vision/Mission badge float */
          @keyframes vmBadge {
            0%, 100% { transform: translateY(0px); opacity: 0.85; }
            50%       { transform: translateY(-7px); opacity: 1; }
          }
          .vm-badge {
            animation: vmBadge 4s ease-in-out infinite;
          }
        `}</style>

      {/* ================= ABOUT US SECTION ================= */}
      <section
        ref={aboutRef}
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)]"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── Vision & Mission ── */}
          <div className="grid gap-12 lg:grid-cols-2 items-center mb-24">

            {/* Left — text */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-3">
                Our Vision <span className="text-[var(--primary)]">Mission</span>
              </h2>
              {/* Red underline */}
              <div className="h-[3px] w-10 bg-[var(--primary)] rounded-full mb-10" />

              <div className="space-y-10">
                {/* Vision */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 border border-red-100">
                    <Eye className="h-7 w-7 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">Our Vision</h3>
                    <div className="h-[2px] w-8 bg-[var(--primary)] rounded-full mb-3" />
                    <p className="text-[var(--text-paragraph)] leading-relaxed">
                      To be the preferred global partner for photographers and companies seeking excellence in post-production services.
                    </p>
                  </div>
                </div>

                {/* Mission */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 border border-red-100">
                    <Target className="h-7 w-7 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">Our Mission</h3>
                    <div className="h-[2px] w-8 bg-[var(--primary)] rounded-full mb-3" />
                    <p className="text-[var(--text-paragraph)] leading-relaxed">
                      Our mission is to streamline post-production for our partners by delivering exceptional quality, fast turnaround times, and proactive support—saving them time, money, and effort with every project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — image with overlay arcs + icon badges */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="/toWEBP/vision.webp"
                alt="Vision and mission"
                className="w-full h-[500px] object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/20" />

              {/* SVG concentric arc rings overlay */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 600 500"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Static base arcs */}
                <circle cx="300" cy="260" r="110" stroke="white" strokeWidth="0.6" opacity="0.25" />
                <circle cx="300" cy="260" r="155" stroke="white" strokeWidth="0.6" opacity="0.2" />
                <circle cx="300" cy="260" r="200" stroke="white" strokeWidth="0.6" opacity="0.15" />
                <circle cx="300" cy="260" r="245" stroke="white" strokeWidth="0.6" opacity="0.12" />

                {/* Animated ripple arcs */}
                <circle cx="300" cy="260" r="110" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray="691" strokeDashoffset="691" className="vm-ring-1" opacity="0" />
                <circle cx="300" cy="260" r="155" stroke="white" strokeWidth="1.2" strokeLinecap="round"
                  strokeDasharray="974" strokeDashoffset="974" className="vm-ring-2" opacity="0" />
                <circle cx="300" cy="260" r="200" stroke="white" strokeWidth="1" strokeLinecap="round"
                  strokeDasharray="1257" strokeDashoffset="1257" className="vm-ring-3" opacity="0" />
                <circle cx="300" cy="260" r="245" stroke="white" strokeWidth="0.8" strokeLinecap="round"
                  strokeDasharray="1539" strokeDashoffset="1539" className="vm-ring-4" opacity="0" />
              </svg>

              {/* Floating icon badges — positioned like image */}
              {/* Top left — Target/Goal */}
              <div className="absolute top-[15%] left-[30%] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-sm shadow-lg vm-badge" style={{ animationDelay: "0s" }}>
                <Target className="h-5 w-5 text-white" />
              </div>
              {/* Top right — Eye */}
              <div className="absolute top-[15%] right-[18%] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-sm shadow-lg vm-badge" style={{ animationDelay: "0.4s" }}>
                <Eye className="h-5 w-5 text-white" />
              </div>
              {/* Left — Users */}
              <div className="absolute top-[42%] left-[14%] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-sm shadow-lg vm-badge" style={{ animationDelay: "0.8s" }}>
                <Users className="h-5 w-5 text-white" />
              </div>
              {/* Right — Handshake/Shield */}
              <div className="absolute top-[42%] right-[10%] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-sm shadow-lg vm-badge" style={{ animationDelay: "1.2s" }}>
                <Heart className="h-5 w-5 text-white" />
              </div>
              {/* Bottom right — Shield */}
              <div className="absolute bottom-[18%] right-[20%] flex h-11 w-11 items-center justify-center rounded-full bg-white/20 border border-white/40 backdrop-blur-sm shadow-lg vm-badge" style={{ animationDelay: "1.6s" }}>
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

              {/* Our Story */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-[2rem] shadow-2xl h-full min-h-[520px]">
                    <img
                      src="/toWEBP/value.webp"
                      alt="Story image"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>

                  <div className="absolute -bottom-6 left-6 flex items-center gap-4 bg-white rounded-full p-4 shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--primary)]">Our values guide</p>
                      <p className="text-sm text-[var(--text-paragraph)]">The way we work and the promise we keep.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-left mb-8">
                    <p className="text-lg tracking-[0.4em] text-[var(--primary)] mb-4">Our Values</p>
                    <h3 className="text-4xl md:text-5xl font-bold text-[var(--text-heading)]">
                      The principles that <span className="text-[var(--primary)]">drive everything we do.</span>
                    </h3>
                    <div className="h-1 w-16 bg-[var(--primary)] rounded-full mt-6 mb-6" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div key={index} className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-[var(--text-heading)]">{value.title}</h4>
                              <div className="h-1 w-8 bg-[var(--primary)] rounded-full my-3" />
                              <p className="text-sm text-[var(--text-paragraph)]">{value.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ================= WHY CHOOSE US ================= */}
              <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[var(--white)]">
                <div className="max-w-7xl mx-auto relative">
                  {/* Decorative dots */}
                  <div className="pointer-events-none absolute top-6 right-8 opacity-20 hidden lg:block">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#F97373">
                        <circle cx="2" cy="2" r="1.5" />
                        <circle cx="8" cy="2" r="1.5" />
                        <circle cx="14" cy="2" r="1.5" />
                        <circle cx="20" cy="2" r="1.5" />
                        <circle cx="2" cy="8" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                        <circle cx="20" cy="8" r="1.5" />
                      </g>
                    </svg>
                  </div>

                  <div className="pointer-events-none absolute bottom-6 left-8 opacity-20 hidden lg:block">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g fill="#F97373">
                        <circle cx="2" cy="2" r="1.5" />
                        <circle cx="8" cy="2" r="1.5" />
                        <circle cx="14" cy="2" r="1.5" />
                        <circle cx="20" cy="2" r="1.5" />
                        <circle cx="2" cy="8" r="1.5" />
                        <circle cx="8" cy="8" r="1.5" />
                        <circle cx="14" cy="8" r="1.5" />
                        <circle cx="20" cy="8" r="1.5" />
                      </g>
                    </svg>
                  </div>

                  <div className="text-center mb-12">
                    <p className="text-lg  tracking-[0.4em] text-[var(--primary)] mb-4">
                      Why Choose Us
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-heading)]">
                      The smartest way to bring your photos to life.
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--text-paragraph)] leading-relaxed">
                      We combine award-winning AI, expert artists, and fast delivery to make every image look its best.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {reasons.map((reason, index) => {
                      const Icon = reason.icon;
                      return (
                        <div
                          key={index}
                          className="group rounded-3xl border border-slate-200 bg-white p-8 text-center transition-transform shadow-sm hover:-[var(--primary)]/10 hover:shadow-xl"
                        >
                          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--primary)]/10 text-[var(--primary)]">
                            <Icon className="w-7 h-7" />
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--text-heading)]">
                            {reason.title}
                          </h3>
                          <div className="mx-auto my-3 h-1 w-10 bg-[var(--primary)] rounded-full" aria-hidden />
                          <p className="text-sm leading-relaxed text-[var(--text-paragraph)]">
                            {reason.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </section>

        </main>
    );
}