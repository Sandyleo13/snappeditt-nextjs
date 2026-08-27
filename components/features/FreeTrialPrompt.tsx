"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Gift,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

const STORAGE_KEY = "snappeditt-free-trial-prompt-seen";

export default function FreeTrialPrompt() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const alreadySeen = localStorage.getItem(STORAGE_KEY);

      if (alreadySeen === "true") {
        return;
      }

      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => window.clearTimeout(timer);
    } catch {
      // Ignore localStorage errors.
    }
  }, []);

  const closePrompt = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore localStorage errors.
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-950/60
        p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="free-trial-title"
    >
      {/* Click outside to close */}
      <button
        type="button"
        aria-label="Close free trial popup"
        onClick={closePrompt}
        className="absolute inset-0 cursor-default"
      />

      <div
        className="
          relative z-10
          w-full max-w-lg
          overflow-hidden
          rounded-[2rem]
          border border-white/70
          bg-white
          shadow-[0_40px_100px_rgba(15,23,42,0.25)]
          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
      >
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-24 -top-24
            h-64 w-64
            rounded-full
            bg-red-100
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-24 -left-24
            h-56 w-56
            rounded-full
            bg-orange-100/70
            blur-3xl
          "
        />

        {/* Close */}
        <button
          type="button"
          onClick={closePrompt}
          aria-label="Close"
          className="
            absolute right-4 top-4 z-20
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-slate-100
            text-slate-500
            transition
            hover:bg-slate-200
            hover:text-slate-900
          "
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative p-7 sm:p-9">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F44336] text-white shadow-lg shadow-[#F44336]/20">
            <Gift className="h-8 w-8" />
          </div>

          {/* Heading */}
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#E53935]">
            Special Offer
          </p>

          <h2
            id="free-trial-title"
            className="
              mt-2
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-slate-950
              sm:text-4xl
            "
          >
            Try Snapedit Free
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Want to experience our professional photo editing before
            committing to a paid service?
          </p>

          {/* Benefits */}
          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

              <span className="text-sm font-semibold text-slate-700">
                Upload up to 5 images
              </span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-500" />

              <span className="text-sm font-semibold text-slate-700">
                Secure and professional workflow
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 shrink-0 text-emerald-500" />

              <span className="text-sm font-semibold text-slate-700">
                Fast, professional-quality editing
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/free-trial"
            onClick={() => {
              try {
                localStorage.setItem(
                  STORAGE_KEY,
                  "true"
                );
              } catch {
                // Ignore localStorage errors.
              }
            }}
            className="
              group
              mt-8
              flex w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#F44336]
              px-6 py-4
              text-base
              font-bold
              text-white
              shadow-xl
              shadow-[#F44336]/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#D32F2F]
            "
          >
            Start Free Trial

            <ArrowRight
              className="
                h-5 w-5
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>

          {/* Continue */}
          <button
            type="button"
            onClick={closePrompt}
            className="
              mt-4
              w-full
              cursor-pointer
              text-center
              text-sm
              font-semibold
              text-slate-500
              transition
              hover:text-slate-900
            "
          >
            Continue to website
          </button>

          <p className="mt-5 text-center text-xs text-slate-400">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}