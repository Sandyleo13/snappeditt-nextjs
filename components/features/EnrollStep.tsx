'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Create Account',
    description:
      'Sign up and tell us what you need so we can match the right editor and service.',
  },
  {
    step: '02',
    title: 'Choose Services',
    description:
      'Select the retouching, staging, or enhancement options that suit your project.',
  },
  {
    step: '03',
    title: 'Upload Files',
    description:
      'Send us your images and details. We handle everything from raw to ready-to-publish.',
  },
  {
    step: '04',
    title: 'Review Preview',
    description:
      'Check your sample preview and request refinements until it is perfect.',
  },
  {
    step: '05',
    title: 'Download Assets',
    description:
      'Get the final files in high resolution, optimized for web or print.',
  },
  {
    step: '06',
    title: 'Approve Output',
    description:
      'Approve the final images or request one more round of tweaks.',
  },
  {
    step: '07',
    title: 'Start Working',
    description:
      'Use your polished photos to grow listings, campaigns, and client trust.',
  },
];

function StepCard({
  item,
  isActive,
  onNext,
  isLast,
}: {
  item: typeof steps[number];
  isActive: boolean;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div
      className={`rounded-[2rem] border p-5 sm:p-7 shadow-xl transition-all duration-300 ${
        isActive
          ? 'border-[#F44336] bg-[#FFF1EF] shadow-[#F44336]/10'
          : 'border-slate-200 bg-white'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
        Step {item.step}
      </p>
      <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {item.description}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
          {isLast ? 'Done!' : 'Next'}
        </span>
        {!isLast && (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#F44336] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#E53935] sm:w-auto"
          >
            Next step
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function EnrollStep() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const userClickedRef = useRef(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !userClickedRef.current) {
            setActiveStep(index);
          }
        },
        {
          root: null,
          rootMargin: '-35% 0px -35% 0px',
          threshold: 0,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const goToStep = (index: number) => {
    userClickedRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      userClickedRef.current = false;
    }, 800);

    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const nextStep = () => goToStep(Math.min(activeStep + 1, steps.length - 1));

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,67,54,0.08),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.05),_transparent_20%)] pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl text-slate-900">
            A simple, visual step-by-step enrollment flow
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Scroll through the steps or tap a dot to jump straight to it.
          </p>
        </div>

        <div className="sticky top-4 z-20 mb-10">
          <div className="mx-auto flex w-full max-w-[40rem] overflow-x-auto rounded-2xl border border-slate-100 bg-white/90 backdrop-blur-md px-3 py-3 shadow-md scrollbar-none">
            <div className="flex min-w-full items-center justify-center gap-2">
              {steps.map((item, index) => {
                const isActive = index === activeStep;
                const isVisited = index < activeStep;
                return (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => goToStep(index)}
                    aria-label={`Step ${item.step}`}
                    className={`inline-flex min-w-[44px] h-11 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? 'border-[#F44336] bg-[#F44336] text-white shadow-lg shadow-[#F44336]/20 scale-110'
                        : isVisited
                        ? 'border-[#F44336] bg-[#FEE2E2] text-[#B91C1C]'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-[#F44336]/50 hover:bg-slate-50'
                    }`}
                  >
                    {item.step}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-200 hidden lg:block" />

          <div
            className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#F44336] transition-all duration-500 hidden lg:block"
            style={{ height: `${((activeStep + 0.5) / steps.length) * 100}%` }}
          />

          <div className="space-y-10">
            {steps.map((item, index) => {
              const isActive = index === activeStep;
              const isComplete = index < activeStep;
              const isLeft = index % 2 === 0;

              return (
                <div
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  key={item.step}
                  className="grid gap-6 lg:grid-cols-[1fr_80px_1fr] items-center"
                >
                  <div className={isLeft ? 'block' : 'hidden lg:block lg:invisible'}>
                    {isLeft && (
                      <StepCard
                        item={item}
                        isActive={isActive}
                        onNext={nextStep}
                        isLast={index === steps.length - 1}
                      />
                    )}
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-300 z-10 relative ${
                        isActive
                          ? 'border-[#F44336] bg-[#F44336] text-white shadow-xl shadow-[#F44336]/30 scale-115'
                          : isComplete
                          ? 'border-[#F44336] bg-[#FEE2E2] text-[#B91C1C]'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {item.step}
                    </button>
                  </div>

                  <div className={!isLeft ? 'block' : 'hidden lg:block lg:invisible'}>
                    {!isLeft && (
                      <StepCard
                        item={item}
                        isActive={isActive}
                        onNext={nextStep}
                        isLast={index === steps.length - 1}
                      />
                    )}
                  </div>

                  <div className="lg:hidden col-span-full">
                    <StepCard
                      item={item}
                      isActive={isActive}
                      onNext={nextStep}
                      isLast={index === steps.length - 1}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a
            href="/register"
            className="inline-flex w-full max-w-[18rem] items-center justify-center rounded-full bg-[#F44336] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#E53935] mx-auto"
          >
            Start Enrollment
          </a>
        </div>
      </div>
    </section>
  );
}
