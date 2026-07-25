// app/components/before-after-showcase.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap, Sparkles, Layers,
  Home, Building, Camera, Sunset, Award, TrendingUp, Timer,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import CountUp from 'react-countup';

gsap.registerPlugin(ScrollTrigger);

// Define image interface
interface ComparisonImage {
  id: string;
  title: string;
  category:
  | 'real-estate'
  | 'product-retouching'
  | 'people-retouching'
  | 'cliping-path'
  | '3D-services'
  | 'day-to-dusk'
  | 'wedding-retouching'
  | 'de-clutter-objects';

  content: {
    description: string;
    services: string[];
    cta?: string;
  };

  before: {
    title: string;
    description: string;
    imageUrl: string;
    stats: string[];
  };

  after: {
    title: string;
    description: string;
    imageUrl: string;
    stats: string[];
  };

  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeSaved: string;
  tags: string[];
}

// ===============================
// CONFIGURATION AREA - EDIT HERE
// ===============================
const comparisonExamples: ComparisonImage[] = [
  // REAL ESTATE
  {
    id: 'real-estate-1',
    title: 'Real Estate',
    category: 'real-estate',

    content: {
      description:
        'Successful real estate sales rely heavily on great photographs with turnaround times of less than 12 hours and consistent results.',
      services: [
        ' HDR Editing',
        ' Manual Blending',
        ' Retouching',
        ' Floor Plans',
        ' Virtual Staging',
        ' Day to Dusk'
      ]
    },

    before: {
      title: 'Before: Dark Interior',
      description: 'Poor lighting, dull colors, uninviting space',
      imageUrl: '/images/real-estate-raw.jpg',
      stats: ['ISO 800', 'f/4.0', '1/60s', 'Dark Corners']
    },

    after: {
      title: 'After: Magazine Ready',
      description: 'Bright exposure, vibrant colors, professional look',
      imageUrl: '/images/real-estate-corrected.jpg',
      stats: ['+2 Stops', '+40% Saturation', 'Shadow Recovery']
    },

    difficulty: 'Medium',
    timeSaved: '25 min',
    tags: ['hdr', 'blending', 'retouching', 'staging']
  },

  // PRODUCT RETOUCHING
  {
    id: 'product-retouching',
    title: 'Product Retouching',
    category: 'product-retouching',

    content: {
      description:
        'Our Product Retouching services help your business showcase products beautifully for eCommerce portals—driving more sales.',
      services: [
        ' eCommerce Retouching',
        ' Apparel Retouching',
        ' Jewelry Retouching',
        ' Fashion Retouching',
        ' Composite Retouching',
        ' Ghost Mannequin'
      ],
      cta: 'Check Our Packages →'
    },

    before: {
      title: 'Before: Unretouched Product',
      description: 'Raw product image with lighting and color inconsistencies',
      imageUrl: '/images/Product-eComm-HP-Corrected-1-scaled.webp',
      stats: ['Raw Capture', 'Uneven Lighting', 'Color Cast', 'Background Issues']
    },

    after: {
      title: 'After: eCommerce Ready',
      description: 'Professional retouching with clean background and accurate colors',
      imageUrl: '/images/Product-eComm-HP-Raw-1-scaled.webp',
      stats: ['Color Corrected', 'Clean Background', 'Shadow Enhanced', 'Web Ready']
    },

    difficulty: 'Hard',
    timeSaved: '35 min',
    tags: ['ecommerce', 'apparel', 'jewelry', 'fashion']
  },

  // PEOPLE RETOUCHING
  {
    id: 'people-retouching',
    title: 'People Retouching',
    category: 'people-retouching',

    content: {
      description:
        'Reduce your workload with professional people retouching that matches your studio’s style perfectly.',
      services: [
        ' Pregnancy Retouching',
        ' Newborn Retouching',
        ' Sports Retouching',
        ' Portrait Retouching',
        ' Composite Retouching',
        ' Fashion Retouching'
      ]
    },

    before: {
      title: 'Before: Raw Portrait',
      description: 'Unedited portrait image',
      imageUrl: '/images/Baby-SPH-Raw-3.webp',
      stats: ['Raw Photo', 'No Retouching', 'Natural Skin']
    },

    after: {
      title: 'After: Studio Finish',
      description: 'Professional portrait enhancement',
      imageUrl: '/images/Baby-SPH-Corrected-3.webp',
      stats: ['Skin Retouch', 'Color Grading', 'Studio Finish']
    },

    difficulty: 'Hard',
    timeSaved: '2 hours',
    tags: ['portrait', 'beauty', 'fashion', 'newborn']
  },

  // WEDDING RETOUCHING
  {
    id: 'wedding-retouching-1',
    title: 'Wedding Retouching',
    category: 'wedding-retouching',

    content: {
      description:
        'Create timeless wedding photos with natural skin tone enhancements, color grading, and flawless detail work for every bride and groom.',
      services: [
        ' Wedding Retouching',
        ' Bridal Portrait Enhancements',
        ' Groom Retouching',
        ' Skin Smoothing',
        ' Event Color Correction',
        ' Album-Ready Output'
      ]
    },

    before: {
      title: 'Before: Raw Wedding Photo',
      description: 'Unedited wedding portrait with uneven skin tones and color shifts',
      imageUrl: '/images/real-estate-raw.jpg',
      stats: ['Low Contrast', 'Uneven Skin Tone', 'Muted Colors']
    },

    after: {
      title: 'After: Wedding-Ready',
      description: 'Bright, balanced wedding photography with polished details and natural warmth',
      imageUrl: '/images/real-estate-corrected.jpg',
      stats: ['Balanced Exposure', 'Natural Skin', 'Crisp Detail']
    },

    difficulty: 'Medium',
    timeSaved: '3 hours',
    tags: ['wedding', 'events', 'portrait', 'retouch']
  },

  // CLIPPING PATH
  {
    id: 'cliping-path-extraction',
    title: 'Clipping Path & Extraction',
    category: 'cliping-path',

    content: {
      description:
        'We deliver background removals, transparent images, and path clippings for jewelry and product photos efficiently.',
      services: [
        ' Background Removal',
        ' Blue Screen Removal',
        ' Green Screen Removal',
        ' Extraction',
        'Clipping Path',
        'CP with Shadows & Reflection'
      ]
    },

    before: {
      title: 'Before: Product Background',
      description: 'Complex background and unwanted elements',
      imageUrl: '/images/Clipping-Path-HP-RAW-1.webp',
      stats: ['Busy Background', 'Uncut', 'Raw Product']
    },

    after: {
      title: 'After: Clean Extraction',
      description: 'Perfect clipping path and transparent background',
      imageUrl: '/images/Clipping-Path-HP-Corrected-1.webp',
      stats: ['Transparent', 'Clean Edge', 'Web Ready']
    },

    difficulty: 'Medium',
    timeSaved: '45 min',
    tags: ['clipping-path', 'background-removal', 'masking']
  },

  // 3D RENDERING
  {
    id: '3d-rendering',
    title: '3D Rendering',
    category: '3D-services',

    content: {
      description:
        'We specialize in creating high-quality Architectural 3D Rendering, Interior Rendering and 3D Floor Plans delivered quickly and cost-effectively.',
      services: [
        '3D Floor Plans',
        '3D Rendering'
      ]
    },

    before: {
      title: 'Before: Concept Model',
      description: 'Basic architectural visualization',
      imageUrl: '/images/Day-to-Dusk-SHP-Raw-1.webp',
      stats: ['Concept', 'Basic Lighting', 'No Materials']
    },

    after: {
      title: 'After: Photorealistic Render',
      description: 'Detailed rendering with realistic lighting',
      imageUrl: '/images/Day-to-Dusk-SHP-Corrected-1.webp',
      stats: ['Photorealistic', 'Lighting', 'Materials']
    },

    difficulty: 'Hard',
    timeSaved: '3 hours',
    tags: ['3d', 'architecture', 'rendering', 'floor-plan']
  },

]

// Category configurations
const categories = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Property photography enhancements',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/real-estate',
  },
   {
    id: '3D-services',
    name: '3D Services',
    icon: Building,
    description: '3D visualization and rendering',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/3d-services',
  },
   {
    id: 'wedding-retouching',
    name: 'Wedding Retouching',
    icon: Building,
    description: 'Wedding photo enhancements',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/wedding-events',
  },
  {
    id: 'product-retouching',
    name: 'Product Ecommerce',
    icon: Building,
    description: 'E-commerce product enhancements',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/commercial',
  },
  {
    id: 'people-retouching',
    name: 'People Retouching',
    icon: Camera,
    description: 'Professional portrait retouching',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/people',
  },
  {
    id: 'cliping-path',
    name: 'Clipping Path ',
    icon: Layers,
    description: 'Background removal & extraction',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/clipping-path-extraction',
  },
  {
    id: 'day-to-dusk',
    name: 'Day to Dusk',
    icon: Sunset,
    description: 'Daytime to sunset transformations',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/real-estate',
  },
];

// Map category id → service page route (used by "Check Our Package" button)
// const categoryRouteMap: Record<string, string> = {
//   'real-estate':        '/service/real-estate/hdr-basic',
//   'product-retouching': '/service/commercial/products-apparel-footwear-furniture',
//   'people-retouching':  '/service/people/portrait-headshots-studio',
//   'cliping-path':       '/service/clipping-path-extraction/clipping-path',
//   'day-to-dusk':        '/service/real-estate/day-to-dusk',
// };

// Performance stats
const improvementStats = [
  { value: 98, suffix: '%', label: 'Accuracy', icon: Award },
  { value: 10, suffix: 'x', label: 'Faster', icon: Zap },
  { value: 95, suffix: '%', label: 'User Satisfaction', icon: TrendingUp },
  { value: 2, suffix: ' min', label: 'Average Edit Time', icon: Timer },
];

const BeforeAfterSection = () => {
  const router = useRouter();

  // State management
  const [activeExample, setActiveExample] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAutoMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [animationSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Refs
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sliderDirectionRef = useRef<1 | -1>(1);


  const categoryButtons = [
    {
      id: 'all',
      name: 'All Categories',
      icon: Home,
      description: 'Show all services',
      color: ' from-white-500 to-red-600 ',
      bgColor: 'bg-red-500/10',
      route: '/service',
    },
    ...categories,
  ];

  // Filter examples by category
  const filteredExamples = selectedCategory === 'all'
    ? comparisonExamples
    : comparisonExamples.filter(example => example.category === selectedCategory);

  // If category changes and current index is out of range, reset to first item
  useEffect(() => {
    if (activeExample >= filteredExamples.length) {
      setActiveExample(0);
    }
  }, [filteredExamples.length, activeExample]);

  // Auto-cycle examples repeatedly unless paused/dragging
  useEffect(() => {
    if (!isPlaying || isDragging || filteredExamples.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveExample(prev => (prev + 1) % filteredExamples.length);
      setSliderPosition(50);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [filteredExamples.length, isPlaying, isDragging]);

  // Current example - fallback to first example if none found
  const currentExample = filteredExamples[activeExample] || filteredExamples[0] || comparisonExamples[0];

  const currentCategoryRoute = categories.find((cat) => cat.id === currentExample.category)?.route ?? '/packages/';

  // Safety check - if no data loaded, don't render
  if (!currentExample) {
    return (
      <section className="relative w-full overflow-hidden bg-[#f3f4f6] py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded-xl w-96 mx-auto" />
            <div className="h-6 bg-gray-100 rounded-lg w-64 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  // Initialize animations — only section entrance, no opacity scrub on filters/stats
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none', // fire once, no scrub
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto animation effect - left-right pingpong
  useEffect(() => {
    if (!isAutoMode || !isPlaying || isDragging) return;

    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        const next = prev + sliderDirectionRef.current * 2;

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
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoMode, isPlaying, isDragging]);

  // Handle slider drag - SIMPLIFIED
  const handleSliderDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    if (isAutoMode) setIsPlaying(false);

    const rect = containerRef.current.getBoundingClientRect();

    const updatePosition = (clientX: number) => {
      const x = ((clientX - rect.left) / rect.width) * 100;
      const position = Math.max(0, Math.min(100, x));
      setSliderPosition(position);
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      updatePosition(moveEvent.clientX);
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        updatePosition(moveEvent.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    if ('touches' in e) {
      updatePosition(e.touches[0].clientX);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      updatePosition(e.clientX);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const resetSlider = () => {
    sliderDirectionRef.current = 1;
    setSliderPosition(50);
  };

  // Category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveExample(0);
    resetSlider();
  };

  const showPreviousExample = () => {
    setActiveExample(prev => (prev - 1 + filteredExamples.length) % filteredExamples.length);
    resetSlider();
  };

  const showNextExample = () => {
    setActiveExample(prev => (prev + 1) % filteredExamples.length);
    resetSlider();
  };

  // Render comparison slider
  const renderComparisonSlider = () => {
    return (
      <div className="absolute inset-0 z-30">
        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl transform -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-2xl cursor-ew-resize flex items-center justify-center"
            onMouseDown={handleSliderDrag}
            onTouchStart={handleSliderDrag}
          >
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-1 h-4 bg-gray-600 mx-0.5" />
                <div className="w-1 h-4 bg-gray-600 mx-0.5" />
              </div>
              <div className="text-xs font-bold text-gray-600 mt-1">
                {Math.round(sliderPosition)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f3f4f6] py-16 md:py-24"
    >
      <div className="relative w-full max-w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
       

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Real Edits.
           
            <span className="text-red-600">
              Real Results.
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
           Explore professional photo enhancements across different editing categories.
          </p>
        </div>

        {/* Stats Grid - Horizontal Layout */}
        <div className="stats-grid mb-16 flex flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-4 justify-center animate-fadeIn">
          {improvementStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="flex-1 min-w-[250px]  stat-card bg-white rounded-2xl border border-slate-200 p-5 hover:border-red-300 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>

                  <div className="text-left">
                    <div className="text-2xl font-bold text-slate-900">
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={0.6}
                        suffix={stat.suffix}
                        useEasing={false}
                      />
                    </div>

                    <div className="text-slate-600 text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="category-filters mb-12 ml-25 animate-fadeIn">
          <div
            ref={scrollRef}
            className="max-w-full overflow-x-auto scrollbar-none px-2 py-2 sm:px-1"
          >
            <div className="flex items-center gap-3 whitespace-nowrap">
              {categoryButtons.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`category-filter active:scale-95 flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-3 text-2xl sm:text-xl font-medium transition-all duration-300 border ${
                      isActive
                        ? 'active-category bg-[#F44336] text-white border-[#F44336] shadow-lg shadow-red-500/20'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-[#F44336] hover:text-[#F44336]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] w-full h-[600px] bg-white p-1 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] items-stretch gap-5 lg:gap-12 rounded-[1.7rem] p-4 sm:p-8">
            {/* Left Hero Content */}
            <div className="flex flex-col justify-center w-full h-full gap-6">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 hover:border-red-300 transition-all duration-300">
                {/* <div className="text-xs uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">Featured Example</div> */}
                <div className="text-5xl sm:text-5xl font-bold text-slate-900 mb-3">{currentExample.title}</div>
                <p className="text-base sm:text-2xl text-slate-600 mb-5 leading-relaxed">{currentExample.content.description}</p>

                <div className="mb-6 flex flex-wrap gap-2 text-xs">
                  {currentExample.content.services.slice(0, 4).map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-red-50 px-2.5 py-1 text-xl text-red-700 border border-red-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-600">Difficulty</span>
                      <span className="text-lg font-semibold text-slate-900">{currentExample.difficulty}</span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-slate-200" />
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-600">Time Saved</span>
                      <span className="text-lg font-semibold text-slate-900">{currentExample.timeSaved}</span>
                    </div>
                  </div> */}
                  <Link
                    href={currentCategoryRoute}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[#F44336] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E53935] duration-300 hover:shadow-lg hover:shadow-[#F44336]/30 sm:w-auto"
                  >
                    Explore Our Packages
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Comparison Panel */}
            <div
              className="relative min-h-[240px] h-full rounded-xl overflow-hidden bg-slate-800 mb-4 border border-slate-300 shadow-md"
              onMouseEnter={() => {
                setIsPaused(true);
                setIsPlaying(false);
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                setIsPlaying(true);
              }}
            >
              {/* Pause Indicator */}
              {isPaused && (
                <div className="absolute top-4 right-4 z-50">
                  <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-slate-400 text-white text-xs font-medium">
                    Paused
                  </div>
                </div>
              )}

              <div ref={containerRef} className="absolute inset-0">
                {/* BEFORE IMAGE */}
                <div ref={beforeRef} className="absolute inset-0 z-10">
                  <Image
                    src={currentExample.before.imageUrl}
                    alt={currentExample.before.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      BEFORE
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      AFTER
                    </div>
                  </div>
                </div>

                {/* AFTER IMAGE */}
                <div
                  ref={afterRef}
                  className="absolute inset-0 z-20 overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  }}
                >
                  <Image
                    src={currentExample.after.imageUrl}
                    alt={currentExample.after.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      AFTER
                    </div>
                  </div>
                    <div className="absolute bottom-4 left-4 z-20">
                    <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                      BEFORE
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-3 z-40 flex items-center justify-between px-3 sm:px-4">
                  <button
                    onClick={showPreviousExample}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg shadow-slate-900/10 transition hover:bg-white sm:h-11 sm:w-11"
                    aria-label="Previous example"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={showNextExample}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-lg shadow-slate-900/10 transition hover:bg-white sm:h-12 sm:w-12"
                    aria-label="Next example"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* SLIDER */}
                {renderComparisonSlider()}



              </div>
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default BeforeAfterSection;