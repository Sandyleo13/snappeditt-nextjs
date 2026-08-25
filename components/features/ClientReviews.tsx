"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
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
  User,
} from "lucide-react";

import FreeTrialForm from "./FreeTrialForm";

gsap.registerPlugin(ScrollTrigger);

interface ReviewType {
  id: number;
  name: string;
  role: string;
  company?: string;
  avatar: string;
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

export const ClientReviewsSection = forwardRef<
  HTMLElement,
  ClientReviewsSectionProps
>(function ClientReviewsSection({ id = "client-reviews" }, ref) {
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
    [ref],
  );

  const reviews: ReviewType[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Professional Photographer",
      avatar: "/avatars/1.png",
      company: "Studio Visuals",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content:
        "SnappEditt transformed my wedding workflow with stunning edits and incredibly fast delivery.",
      service: "Wedding Album Editing",
      date: "2 weeks ago",
      location: "San Francisco, CA",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Real Estate Agent",
      avatar: "/avatars/2.png",
      company: "Luxury Properties Inc",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content:
        "SnappEditt's sky replacement and color correction made my listings stand out. Property views increased significantly.",
      service: "Real Estate Photo Editing",
      date: "1 month ago",
      location: "Miami, FL",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Social Media Influencer",
      company: "Content Creator",
      avatar: "/avatars/3.png",
      avatarColor: "bg-[#F44336]",
      rating: 5,
      content:
        "Accurate AI background removal that saves hours of editing and delivers professional results.",
      service: "Extraction & Clipping Path",
      date: "3 days ago",
      location: "New York, NY",
      verified: true,
    },
    {
      id: 4,
      name: "David Park",
      role: "Architectural Photographer",
      company: "Urban Perspectives",
      avatar: "/avatars/4.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 4,
      content:
        "Outstanding editing quality with perfect skies and enhanced details. A huge time-saver for our studio.",
      service: "Sky Replacement",
      date: "2 months ago",
      location: "Chicago, IL",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "E-commerce Store Owner",
      company: "Boutique Fashion",
      avatar: "/avatars/5.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content:
        "Perfect background removal for thousands of product images. The consistency across batches is impressive. Our conversion rates increased by 25% with professionally edited product photos. Worth every penny!",
      service: "Extraction & Clipping Path",
      date: "1 week ago",
      location: "Austin, TX",
      verified: true,
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Marketing Director",
      company: "TechStart Inc",
      avatar: "/avatars/6.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content:
        "We use SnappEditt for all our marketing materials. The consistency across campaigns and the ability to maintain brand colors while enhancing images has elevated our visual content. The team loves how easy it is to use!",
      service: "Day to Dusk & Color Grading",
      date: "3 weeks ago",
      location: "Seattle, WA",
      verified: true,
    },
    {
      id: 7,
      name: "Tiago B",
      role: "Fashion Photographer",
      avatar: "/avatars/7.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content:
        "I have been working with Snapp Editt for very long time, I am really happy with the quality of the images, the turnaround time is amazing and they are so reliable. Sean is very approachable, I can't recommend them enough!",
      service: "Fashion Photography Editing",
      date: "1 month ago",
      location: "Australia",
      verified: true,
    },
    {
      id: 8,
      name: "Alain",
      role: "Real Estate Photographer",
      avatar: "/avatars/8.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content:
        "I first engaged Snapp Editt for the editing of my real estate photos a few months ago. What has set them apart from other editors is their willingness to communicate, fix any issues and reliability. Very happy with their work.",
      service: "Real Estate Photo Editing",
      date: "2 months ago",
      location: "Australia",
      verified: true,
    },
    {
      id: 9,
      name: "David",
      role: "Architecture & Real Estate Photographer",
      avatar: "/avatars/9.png",
      avatarColor: "from-red-500 to-red-600",
      rating: 5,
      content:
        "I couldn't be happier with the service I've received from Snapp Editt. They consistently provide exactly what I require - high quality image processing with a quick turnaround time. Highly recommend!",
      service: "Architecture & Real Estate Editing",
      date: "3 weeks ago",
      location: "UK",
      verified: true,
    },
  ];

  const servicesIcons = {
    "Wedding Album Editing": Heart,
    "Real Estate Photo Editing": Home,
    "Extraction & Clipping Path": Scissors,
    "Sky Replacement": Cloud,
    "Day to Dusk & Color Grading": Camera,
  };

  const stats = [
    { value: "4.9", label: "Average Rating", icon: Star, suffix: "/5" },
    { value: "10,000+", label: "Happy Clients", icon: Users },
    { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp },
    { value: "50K+", label: "Projects Completed", icon: TrendingUp },
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
          },
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
          },
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
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const currentReview = reviews[activeReview];
  const ServiceIcon =
    servicesIcons[currentReview.service as keyof typeof servicesIcons] ||
    Camera;
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

      <div className="relative max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real reviews from real estate professionals who trust SnappEditt for
            high-quality photo editing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-14">
          {reviews.slice(0, 4).map((review) => {
            const Icon =
              servicesIcons[review.service as keyof typeof servicesIcons] ||
              Camera;
            return (
              <div
                key={review.id}
                className="group relative flex min-h-[460px] flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-red-200"
              >
                {/* Header */}
                <div className="flex h-24 items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-lg ring-2 ring-red-100">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex h-20 flex-col justify-center">
                    <h3 className="text-xl font-bold leading-tight text-slate-900 line-clamp-2">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-base leading-5 text-slate-500 line-clamp-2">
                      {review.role}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-2 mb-5 flex h-6 items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="mt-6 flex-1 text-lg leading-8 text-slate-600 line-clamp-4">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="font-medium text-[#F44336]">
                    {review.service}
                  </span>

                  <span className="text-sm text-slate-400">{review.date}</span>
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
          <p className="mt-4 text-sm text-slate-600">No credit card required</p>
        </div>
      </div>
    </section>
  );
});
