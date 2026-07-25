"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  CheckCircle,
  Award,
  Users,
  ThumbsUp,
  TrendingUp,
  Zap,
  Heart,
  Camera,
  Home,
  Cloud,
  Scissors,
  User
} from "lucide-react";

import FreeTrialForm from "./FreeTrialForm";

gsap.registerPlugin(ScrollTrigger);

interface ReviewType {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatarColor: string;
  rating: number;
  content: string;
  service: string;
  date: string;
  location: string;
  verified: boolean;
}

interface ClientReviewsSectionProps {
  id?: string;
}

export const ClientReviewsSection = forwardRef<HTMLElement, ClientReviewsSectionProps>(function ClientReviewsSection(
  { id = "client-reviews" },
  ref
) {
  const [activeReview, setActiveReview] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const reviewsRef = useRef<HTMLDivElement[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const freeTrialRef = useRef<HTMLDivElement>(null);

  const setSectionRef = useCallback(
    (node: HTMLElement | null) => {
      sectionRef.current = node;
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    [ref]
  );

  const reviews: ReviewType[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Professional Photographer",
      company: "Studio Visuals",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content: "SnapEdit has completely transformed my wedding photography workflow. The day-to-dusk feature is magical - clients are amazed at how ordinary daytime shots become golden hour masterpieces. The turnaround time is incredible!",
      service: "Wedding Album Editing",
      date: "2 weeks ago",
      location: "San Francisco, CA",
      verified: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Real Estate Agent",
      company: "Luxury Properties Inc",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content: "As a real estate agent, property photos make or break listings. SnapEdit's sky replacement and color correction have increased my property views by 40%. The before/after comparison tool helps clients see the value instantly.",
      service: "Real Estate Photo Editing",
      date: "1 month ago",
      location: "Miami, FL",
      verified: true
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Social Media Influencer",
      company: "Content Creator",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content: "I tried the free trial and was blown away! The extraction tool perfectly removed backgrounds from my product photos. Now I use it daily for my content. The AI is scarily accurate - saves me hours of editing!",
      service: "Extraction & Clipping Path",
      date: "3 days ago",
      location: "New York, NY",
      verified: true
    },
    {
      id: 4,
      name: "David Park",
      role: "Architectural Photographer",
      company: "Urban Perspectives",
      avatarColor: "from-red-500 to-red-600",
      rating: 4,
      content: "The professional touch in every edit is noticeable. My architectural photos now have perfect skies and enhanced textures. The batch processing feature for large projects is a game-changer for our studio.",
      service: "Sky Replacement",
      date: "2 months ago",
      location: "Chicago, IL",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "E-commerce Store Owner",
      company: "Boutique Fashion",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content: "Perfect background removal for thousands of product images. The consistency across batches is impressive. Our conversion rates increased by 25% with professionally edited product photos. Worth every penny!",
      service: "Extraction & Clipping Path",
      date: "1 week ago",
      location: "Austin, TX",
      verified: true
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Marketing Director",
      company: "TechStart Inc",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content: "We use SnapEdit for all our marketing materials. The consistency across campaigns and the ability to maintain brand colors while enhancing images has elevated our visual content. The team loves how easy it is to use!",
      service: "Day to Dusk & Color Grading",
      date: "3 weeks ago",
      location: "Seattle, WA",
      verified: true
    },
    {
      id: 7,
      name: "Tiago B",
      role: "Fashion Photographer",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content: "I have been working with Snapp Editt for very long time, I am really happy with the quality of the images, the turnaround time is amazing and they are so reliable. Sean is very approachable, I can't recommend them enough!",
      service: "Fashion Photography Editing",
      date: "1 month ago",
      location: "Australia",
      verified: true
    },
    {
      id: 8,
      name: "Alain",
      role: "Real Estate Photographer",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content: "I first engaged Snapp Editt for the editing of my real estate photos a few months ago. What has set them apart from other editors is their willingness to communicate, fix any issues and reliability. Very happy with their work.",
      service: "Real Estate Photo Editing",
      date: "2 months ago",
      location: "Australia",
      verified: true
    },
    {
      id: 9,
      name: "David",
      role: "Architecture & Real Estate Photographer",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content: "I couldn't be happier with the service I've received from Snapp Editt. They consistently provide exactly what I require - high quality image processing with a quick turnaround time. Highly recommend!",
      service: "Architecture & Real Estate Editing",
      date: "3 weeks ago",
      location: "UK",
      verified: true
    }
  ];

  const servicesIcons = {
    "Wedding Album Editing": Heart,
    "Real Estate Photo Editing": Home,
    "Extraction & Clipping Path": Scissors,
    "Sky Replacement": Cloud,
    "Day to Dusk & Color Grading": Camera
  };

  const stats = [
    { value: "4.9", label: "Average Rating", icon: Star, suffix: "/5" },
    { value: "10,000+", label: "Happy Clients", icon: Users },
    { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    { value: "50K+", label: "Projects Completed", icon: TrendingUp }
  ];

  const nextReview = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveReview((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevReview = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const selectReview = (index: number) => {
    if (isTransitioning || index === activeReview) return;
    setIsTransitioning(true);
    setActiveReview(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlay) {
      interval = setInterval(() => {
        nextReview();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay, activeReview]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate review cards
      reviewsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top center",
            },
          }
        );
      }
      // Animate review indicators
      gsap.fromTo(
        ".review-indicator",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".reviews-container",
            start: "top center",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const currentReview = reviews[activeReview];
  const ServiceIcon = servicesIcons[currentReview.service as keyof typeof servicesIcons] || Camera;
  const initials = reviews.map((review) => review.name.charAt(0).toUpperCase());

  return (
    <section
      id={id}
      ref={setSectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f3f4f6]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(244,67,54,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-200 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-red-100 rounded-full mix-blend-screen filter blur-3xl opacity-5 animate-blob animation-delay-2000" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real reviews from real estate professionals who trust SnapEdit for high-quality photo editing.
          </p>
        </div>

  

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-14">
          {reviews.slice(0, 3).map((review) => {
            const Icon = servicesIcons[review.service as keyof typeof servicesIcons] || Camera;
            return (
              <div key={review.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-15 h-15 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
                      <User className="w-10 h-10 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-3xl text-slate-900">{review.name}</h3>
                      <p className="text-xl text-[#F44336]">{review.role}</p>
                    </div>
                  </div>
                  <div className="text-[#F44336]">
                    {/* <Icon className="w-5 h-5" /> */}
                  </div>
                </div>
                <p className="text-slate-700 text-lg leading-relaxed line-clamp-4">
                  {review.content}
                </p>
                <div className="mt-4 text-xl text-red-600">
                  {review.service} • {review.date}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/free-trial"
            className="inline-flex min-w-[220px] items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#F44336] text-white font-semibold hover:bg-[#E53935] transition-all duration-300 shadow-[0_8px_20px_rgba(244,67,54,0.25)]"
          >
            Start Your Free Trial
          </Link>
          <p className="mt-4 text-sm text-slate-600">
            No credit card required 
          </p>
        </div>

      
      </div>
    </section>
  );
});