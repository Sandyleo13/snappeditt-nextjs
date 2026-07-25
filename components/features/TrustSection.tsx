'use client';

import React from 'react';
import FloatingTrustCard from './FloatingTrustCard';
import styles from './trust-section.module.css';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function TrustSection() {
  return (
    <section className={`${styles.slantedSection} relative z-10 w-full overflow-hidden`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] -skew-y-6 bg-[linear-gradient(135deg,#D71920_0%,#EF4444_55%,#8B0A0A_100%)] origin-top-right" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr] items-center py-10 lg:py-12">
          <div className="relative">
            <FloatingTrustCard />
          </div>

          <div className="flex min-h-[420px] items-center">
            <div className="w-full max-w-2xl space-y-6 lg:space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/90 backdrop-blur-sm">
                WHY CHOOSE SNAPPEDITT
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_22px_40px_rgba(0,0,0,0.22)] leading-tight">
                A premium image workflow for agencies, studios, and enterprise brands.
              </h2>

              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/90">
                SnappEditt delivers editorial-grade photo editing with a refined, studio-quality process — built for photographers, ecommerce brands, and creative agencies who demand premium results.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Manual quality review</p>
                    <p className="text-xs text-white/70">Every image polished by hand.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-4">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Secure workflow</p>
                    <p className="text-xs text-white/70">Safe media handling end to end.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/about-us" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#D71920] shadow-lg shadow-[#D71920]/15 transition hover:scale-[1.02]">
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80">
                  Trusted Creative Studio
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-4">
          <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">E</div>
            <p className="text-sm font-semibold text-white">Expert Editors</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">S</div>
            <p className="text-sm font-semibold text-white">Secure Workflow</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">T</div>
            <p className="text-sm font-semibold text-white">On-Time Delivery</p>
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 text-[#EF4444]">Q</div>
            <p className="text-sm font-semibold text-white">Quality Assured</p>
          </div>
        </div>
      </div>
    </section>
  );
}
