'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
export interface BeforeAfterImage {
  beforeImage: string;
  afterImage: string;
  description?: string;
}

export interface ServiceFeature {
  label: string;
}

interface BeforeAfterSliderProps {
  /* Images */
  images: BeforeAfterImage[];

  /* Labels shown bottom-left (dark) and bottom-right (red) */
  beforeLabel?: string;
  afterLabel?: string;

  /* Gallery section heading */
  sectionTitle?: string;
  sectionTitleHighlight?: string;
  sectionSubtitle?: string;

  /* Service card (right column) */
  serviceName?: string;
  serviceDescription?: string;
  price?: string;
  priceUnit?: string;
  features?: string[];
  onAddToCart?: () => void;
  onViewMore?: () => void;
}

/* ─────────────────────────────────────────
   Inner slider — matches all service pages
───────────────────────────────────────── */
function SliderPanel({
  example,
  sliderPosition,
  isDragging,
  sliderRef,
  beforeLabel,
  afterLabel,
  onMouseMove,
  onTouchMove,
  onMouseEnter,
  onMouseLeave,
  onTouchEnd,
  onMouseUp,
  onDividerMouseDown,
  onDividerTouchStart,
}: {
  example: BeforeAfterImage;
  sliderPosition: number;
  isDragging: boolean;
  sliderRef: React.RefObject<HTMLDivElement | null> | React.MutableRefObject<HTMLDivElement | null>;
  beforeLabel: string;
  afterLabel: string;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onTouchEnd: () => void;
  onMouseUp: () => void;
  onDividerMouseDown: () => void;
  onDividerTouchStart: () => void;
}) {
  return (
    <div
      ref={sliderRef}
      className="relative rounded-2xl overflow-hidden shadow-xl cursor-col-resize select-none flex-1 min-h-[320px] sm:min-h-[420px]"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchEnd={onTouchEnd}
      onMouseUp={onMouseUp}
    >
      {/* Before — base layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${example.beforeImage})` }}
      />

      {/* After — revealed from left */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${example.afterImage})`,
            width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
          }}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={onDividerMouseDown}
        onTouchStart={onDividerTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#E8352A]">
          <div className="flex items-center gap-0.5">
            <ChevronLeft className="w-3 h-3 text-[#E8352A]" />
            <ChevronRight className="w-3 h-3 text-[#E8352A]" />
          </div>
        </div>
      </div>

      {/* Labels — bottom corners, matching service pages */}
      <span className="absolute bottom-4 left-4 z-10 bg-[#1A1A1A]/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute bottom-4 right-4 z-10 bg-[#E8352A] text-white text-xs font-semibold px-3 py-1 rounded-full">
        {afterLabel}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main export
───────────────────────────────────────── */
const BeforeAfterSlider = ({
  images,
  beforeLabel = 'Before',
  afterLabel = 'After',
  sectionTitle = 'See the',
  sectionTitleHighlight = 'Transformation',
  sectionSubtitle = 'Real photos before and after professional retouching.',
  serviceName = 'Service',
  serviceDescription = 'Professional photo retouching service.',
  price = '0.14',
  priceUnit = '/ image',
  features = [],
  onAddToCart,
  onViewMore,
}: BeforeAfterSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef<1 | -1>(1);

  /* Auto-animate — same as all service pages (1.5px / 28ms ping-pong) */
  useEffect(() => {
    if (isDragging || isHovering) return;
    const id = window.setInterval(() => {
      setSliderPosition(prev => {
        const next = prev + dirRef.current * 1.5;
        if (next >= 100) { dirRef.current = -1; return 100; }
        if (next <= 0)   { dirRef.current =  1; return 0;   }
        return next;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [isDragging, isHovering]);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const rect = sliderRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setSliderPosition(Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100)));
  };

  const changeImage = (i: number) => {
    setCurrentIndex((i + images.length) % images.length);
    setSliderPosition(50);
    dirRef.current = 1;
  };

  const current = images[currentIndex];

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#F7F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {sectionTitle}{' '}
            <span className="text-[#E8352A]">{sectionTitleHighlight}</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#555555]">{sectionSubtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">

          {/* LEFT — slider */}
          <div className="flex-1 flex flex-col">
            <SliderPanel
              example={current}
              sliderPosition={sliderPosition}
              isDragging={isDragging}
              sliderRef={sliderRef}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => { setIsDragging(false); setIsHovering(false); }}
              onTouchEnd={() => setIsDragging(false)}
              onMouseUp={() => setIsDragging(false)}
              onDividerMouseDown={() => setIsDragging(true)}
              onDividerTouchStart={() => setIsDragging(true)}
            />

            {/* Prev / Next */}
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => changeImage(currentIndex - 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={() => changeImage(currentIndex + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#E8352A] text-white text-sm font-semibold hover:bg-[#C62B20] transition-all shadow"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT — service card */}
          <div className="w-full lg:w-80 xl:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-md p-6 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-[#E8352A] mb-2">{serviceName}</h3>
            <p className="text-[#555555] text-sm mb-5 leading-relaxed">{serviceDescription}</p>

            <div className="text-2xl font-bold text-[#111111] mb-4">
              ${price}{' '}
              <span className="text-base font-normal text-[#555555]">{priceUnit}</span>
            </div>

            <button
              onClick={onAddToCart}
              className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white font-semibold py-2.5 rounded-lg transition-all mb-5 shadow-sm text-sm"
            >
              Add to Cart
            </button>

            {features.length > 0 && (
              <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                {features.map(feat => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-[#333333]">
                    {/* CheckCircle inline to avoid extra import dependency */}
                    <svg className="w-4 h-4 text-[#E8352A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={onViewMore}
              className="w-full border border-[#E8352A] text-[#E8352A] hover:bg-[#FFF3F2] font-semibold py-2.5 rounded-lg transition-all text-sm"
            >
              View More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
