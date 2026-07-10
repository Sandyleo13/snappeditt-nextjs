// app/components/before-after-showcase.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Zap, Sparkles, Layers,
  Home, Building, Camera, Sunset, Award, TrendingUp, Timer
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
  | 'day-to-dusk'
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
        '✨ HDR Editing',
        '🤝 Manual Blending',
        '🖌️ Retouching',
        '📐 Floor Plans',
        '🏠 Virtual Staging',
        '🌇 Day to Dusk'
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
        '🛒 eCommerce Retouching',
        '👕 Apparel Retouching',
        '💎 Jewelry Retouching',
        '💅 Fashion Retouching',
        '📟 Composite Retouching',
        '👔 Ghost Mannequin'
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
        '🤰 Pregnancy Retouching',
        '👶 Newborn Retouching',
        '⚽ Sports Retouching',
        '📷 Portrait Retouching',
        '💄 Composite Retouching',
        '👩 Fashion Retouching'
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

  // CLIPPING PATH
  {
    id: 'cliping-path-extraction',
    title: 'Clipping Path & Extraction',
    category: 'cliping-path',

    content: {
      description:
        'We deliver background removals, transparent images, and path clippings for jewelry and product photos efficiently.',
      services: [
        '✂ Background Removal',
        '🟦 Blue Screen Removal',
        '🟩 Green Screen Removal',
        '📤 Extraction',
        '🔗 Clipping Path',
        '👥 CP with Shadows & Reflection'
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
    category: 'day-to-dusk',

    content: {
      description:
        'We specialize in creating high-quality Architectural 3D Rendering, Interior Rendering and 3D Floor Plans delivered quickly and cost-effectively.',
      services: [
        '🖌️ 3D Floor Plans',
        '📐 3D Rendering'
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

  // OBJECT REMOVAL / DE-CLUTTER
  // {
  //   id: 'de-clutter-example',
  //   title: 'Object Removal',
  //   category: 'de-clutter-objects',

  //   content: {
  //     description:
  //       'Remove unwanted objects, distractions, and clutter from your images quickly and professionally while maintaining natural appearance.',
  //     services: [
  //       '🗑️ Object Removal',
  //       '🧹 Decluttering',
  //       '👥 People Removal',
  //       '🌳 Background Cleanup'
  //     ]
  //   },

  //   before: {
  //     title: 'Before: Cluttered Scene',
  //     description: 'Image with unwanted objects and distractions',
  //     imageUrl: '/images/real-estate-raw.jpg',
  //     stats: ['Busy Scene', 'Unwanted Objects', 'Distracting Elements']
  //   },

  //   after: {
  //     title: 'After: Clean & Professional',
  //     description: 'Clean image with all distractions removed',
  //     imageUrl: '/images/real-estate-corrected.jpg',
  //     stats: ['Objects Removed', 'Clean Background', 'Professional Look']
  //   },

  //   difficulty: 'Medium',
  //   timeSaved: '20 min',
  //   tags: ['object-removal', 'declutter', 'cleanup']
  // }
];

// Category configurations
const categories = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    description: 'Property photography enhancements',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/real-estate/hdr-basic',
  },
  {
    id: 'product-retouching',
    name: 'Product Retouching',
    icon: Building,
    description: 'E-commerce product enhancements',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/commercial/products-apparel-footwear-furniture',
  },
  {
    id: 'people-retouching',
    name: 'People Retouching',
    icon: Camera,
    description: 'Professional portrait retouching',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/people/portrait-headshots-studio',
  },
  {
    id: 'cliping-path',
    name: 'Clipping Path Extraction',
    icon: Layers,
    description: 'Background removal & extraction',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/clipping-path-extraction/clipping-path',
  },
  {
    id: 'day-to-dusk',
    name: 'Day to Dusk',
    icon: Sunset,
    description: 'Daytime to sunset transformations',
    color: ' from-white-500 to-red-600 ',
    bgColor: 'bg-red-500/10',
    route: '/service/real-estate/day-to-dusk',
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
  const sliderDirectionRef = useRef<1 | -1>(1);

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
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
       

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">
            See Your Photos
            <br />
            <span className="text-red-600">
              Transformed
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore real-world examples of how our AI technology enhances photos across different categories.
          </p>
        </div>

        {/* Stats Grid - Horizontal Layout */}
        <div className="stats-grid mb-16 flex flex-wrap lg:flex-nowrap gap-4 animate-fadeIn">
          {improvementStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="flex-1 min-w-[200px] stat-card bg-white rounded-2xl border border-slate-200 p-5 hover:border-red-300 transition-all duration-300 hover:scale-105 shadow-sm"
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
        <div className="category-filters mb-12 animate-fadeIn">
          <div className="flex gap-3 justify-start overflow-x-auto scrollbar-none py-2">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`category-filter px-6 py-3 rounded-full font-medium transition-all duration-300 border ${selectedCategory === 'all'
                ? 'bg-[#F44336] text-white border-red-600'
                : 'bg-white text-slate-800 hover:bg-slate-50 hover:border-red-400 border-slate-300'
                }`}
            >
              All Categories
            </button>

            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const examplesCount = comparisonExamples.filter(
                ex => category.id === 'all' || ex.category === category.id
              ).length;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`category-filter group px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 border ${isActive
                    ? 'bg-[#F44336] text-white border-red-600'
                    : 'bg-white text-slate-800 hover:bg-white-50 hover:border-red-400 border-slate-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive}`}>
                    {/* {examplesCount} */}
                  </span>
                </button>
              );
            })}
          </div>

          {/* <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveExample(prev => (prev - 1 + filteredExamples.length) % filteredExamples.length);
                  setSliderPosition(50);
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-400 hover:text-red-600"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveExample(prev => (prev + 1) % filteredExamples.length);
                  setSliderPosition(50);
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-red-400 hover:text-red-600"
              >
                Next
              </button>
            </div>

            <div className="text-sm text-slate-600">
              Slide {activeExample + 1} of {filteredExamples.length}
            </div>
          </div> */}
        </div>

        <div className="relative rounded-[2rem] bg-white p-1 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12 rounded-[1.7rem] p-8">
            {/* Left Hero Content */}
            <div className="flex flex-col justify-center gap-8">
              <div className="rounded-2xl bg-white border border-slate-200 p-8 hover:border-red-300 transition-all duration-300">
                {/* <div className="text-xs uppercase tracking-[0.3em] text-red-600 font-semibold mb-4">Featured Example</div> */}
                <div className="text-3xl font-bold text-slate-900 mb-4">{currentExample.title}</div>
                <p className="text-slate-600 mb-6 leading-relaxed">{currentExample.content.description}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {currentExample.content.services.slice(0, 4).map((service, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-red-50 px-3 py-1.5 text-xs text-red-700 border border-red-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-600">Difficulty</span>
                      <span className="text-lg font-semibold text-slate-900">{currentExample.difficulty}</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-600">Time Saved</span>
                      <span className="text-lg font-semibold text-slate-900">{currentExample.timeSaved}</span>
                    </div>
                  </div>
                  <a
                    href="/packages"
                    className="inline-flex items-center justify-center rounded-xl bg-[#F44336] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E53935] duration-300 hover:shadow-lg hover:shadow-[#F44336]/30"
                  >
                    Check Our Package
                  </a>
                </div>
              </div>
            </div>

            {/* Right Comparison Panel */}
            <div
              className="relative h-[400px] md:h-[480px] rounded-xl overflow-hidden bg-slate-800 mb-4 border border-slate-300 shadow-md"
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

                {/* SLIDER */}
                {renderComparisonSlider()}



              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-red-50 rounded-3xl border border-red-200 max-w-2xl mx-auto">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-slate-900 mb-2">
                Want to Add Your Own Images?
              </h4>
              <div className="text-slate-600 space-y-1">
                <p>1. Add your images to the public/images folder</p>
                <p>2. Update the image paths in the code above</p>
                <p>3. Add more examples following the existing format</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BeforeAfterSection;