"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clapperboard,
  CreditCard,
  Gem,
  ImageIcon,
  Layers3,
  Rotate3D,
  Scissors,
  Sparkles,
  UserRound,
} from "lucide-react";

type ServiceCategory = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  offerTitle: string;
  features: string[];
  hoverColor: string;
  hoverGlow: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    title: "Real Estate",
    description:
      "Property photography enhancements and listing-ready edits for agents, photographers, and real estate teams.",
    href: "/service/real-estate",
    icon: ImageIcon,
    offerTitle: "Property Editing",
    features: [
      "HDR photo enhancement",
      "Single exposure editing",
      "Virtual staging",
      "Sky replacement",
    ],
    hoverColor: "#dc2626",
    hoverGlow: "#f87171",
  },
  {
    title: "3D Services",
    description:
      "Architectural rendering, floor plan visualization, virtual staging, and polished 3D presentation services.",
    href: "/service/3d-services",
    icon: Layers3,
    offerTitle: "3D Visualization",
    features: [
      "3D floor plans",
      "Architectural rendering",
      "Virtual staging",
      "Property visualization",
    ],
    hoverColor: "#2563eb",
    hoverGlow: "#60a5fa",
  },
  {
    title: "Wedding Retouching",
    description:
      "Elegant wedding photo retouching and event image enhancement while keeping every important moment natural.",
    href: "/service/wedding-events/wedding-events-retouch",
    icon: Sparkles,
    offerTitle: "Wedding Editing",
    features: [
      "Wedding retouching",
      "Color correction",
      "Skin retouching",
      "Event photo enhancement",
    ],
    hoverColor: "#db2777",
    hoverGlow: "#f472b6",
  },
  {
    title: "Product Ecommerce",
    description:
      "Professional product image editing for fashion, jewelry, ecommerce catalogs, marketplaces, and brands.",
    href: "/service/commercial",
    icon: Gem,
    offerTitle: "Product Editing",
    features: [
      "Product retouching",
      "Background removal",
      "Color correction",
      "Ecommerce-ready images",
    ],
    hoverColor: "#9333ea",
    hoverGlow: "#c084fc",
  },
  {
    title: "People Retouching",
    description:
      "Professional portrait, newborn, maternity, sports, and people retouching with natural-looking results.",
    href: "/service/people",
    icon: UserRound,
    offerTitle: "Portrait Editing",
    features: [
      "Portrait retouching",
      "Skin enhancement",
      "Newborn & maternity",
      "Sports retouching",
    ],
    hoverColor: "#059669",
    hoverGlow: "#34d399",
  },
  {
    title: "Clipping Path",
    description:
      "Precise background removal, clipping paths, masking, cutouts, and image extraction for professional workflows.",
    href: "/service/clipping-path-extraction",
    icon: Scissors,
    offerTitle: "Image Extraction",
    features: [
      "Clipping paths",
      "Background removal",
      "Image masking",
      "Professional cutouts",
    ],
    hoverColor: "#ea580c",
    hoverGlow: "#fb923c",
  },
  {
    title: "Custom Payment",
    description:
      "Need a custom editing package? Choose a tailored payment option built around your specific project requirements.",
    href: "/pay",
    icon: CreditCard,
    offerTitle: "Flexible Payments",
    features: [
      "Custom project pricing",
      "Bulk editing orders",
      "Flexible requirements",
      "Tailored payment options",
    ],
    hoverColor: "#4f46e5",
    hoverGlow: "#818cf8",
  },
];

const benefits = [
  "Professional photo editing",
  "Fast turnaround time",
  "Consistent quality",
  "Flexible service packages",
];

function ServiceFlipCard({
  category,
}: {
  category: ServiceCategory;
}) {
  const [flipped, setFlipped] = useState(false);
  const Icon = category.icon;

  const toggleCard = () => {
    setFlipped((current) => !current);
  };

  return (
    <div
      className="group h-[310px] w-full"
      style={{ perspective: "1200px" }}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* =====================================================
            FRONT
        ===================================================== */}
        <div
          className="
            absolute inset-0
            flex h-full w-full flex-col
            overflow-hidden
            rounded-[1.75rem]
            border border-slate-200
            bg-white
            p-7
            shadow-sm
            transition-all duration-500 ease-out
            [backface-visibility:hidden]
            group-hover:-translate-y-1
            group-hover:border-transparent
            group-hover:shadow-2xl
          "
        >
          {/* Full-card hover background */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              opacity-0
              transition-opacity duration-500
              group-hover:opacity-100
            "
            style={{
              backgroundColor: category.hoverColor,
            }}
          />

          {/* Decorative circle */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              -right-20
              h-56
              w-56
              rounded-full
              opacity-0
              transition-all
              duration-700
              group-hover:scale-110
              group-hover:opacity-100
            "
            style={{
              backgroundColor: category.hoverGlow,
            }}
          />

          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-8
              top-16
              h-28
              w-28
              rounded-full
              opacity-0
              blur-2xl
              transition-opacity
              duration-500
              group-hover:opacity-30
            "
            style={{
              backgroundColor: category.hoverGlow,
            }}
          />

          {/* Top icon */}
          <button
            type="button"
            onClick={toggleCard}
            aria-label={`View more information about ${category.title}`}
            className="
              relative z-10
              flex h-12 w-12
              cursor-pointer
              items-center justify-center
              rounded-2xl
              bg-slate-50
              text-slate-700
              transition-all duration-500
              group-hover:bg-white/15
              group-hover:text-white
            "
          >
            <Icon
              className="h-6 w-6"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </button>

          {/* Main content */}
          <button
            type="button"
            onClick={toggleCard}
            className="
              relative z-10
              mt-7
              flex-1
              cursor-pointer
              text-left
            "
            aria-label={`Flip ${category.title} card`}
          >
            <h3
              className="
                text-xl
                font-bold
                tracking-tight
                text-slate-900
                transition-colors
                duration-500
                group-hover:text-white
              "
            >
              {category.title}
            </h3>

            <p
              className="
                mt-3
                max-w-[95%]
                text-sm
                leading-6
                text-slate-500
                transition-colors
                duration-500
                group-hover:text-white/90
              "
            >
              {category.description}
            </p>
          </button>

          {/* Bottom action */}
          <div
            className="
              relative z-10
              flex items-center justify-between
              border-t
              border-slate-100
              pt-5
              transition-colors
              duration-500
              group-hover:border-white/20
            "
          >
            {/* Direct redirect */}
            <Link
              href={category.href}
              className="
                group/link
                inline-flex
                items-center
                gap-2
                rounded-full
                text-sm
                font-bold
                text-red-600
                transition-all
                duration-300
                group-hover:bg-white
                group-hover:px-5
                group-hover:py-2.5
                group-hover:text-slate-900
              "
            >
              <span>Explore details</span>

              <ArrowRight
                className="
                  h-4 w-4
                  transition-transform
                  duration-300
                  group-hover/link:translate-x-1
                "
                aria-hidden="true"
              />
            </Link>

            {/* Single flip button */}
            <button
              type="button"
              onClick={toggleCard}
              aria-label={`Flip ${category.title} card`}
              className="
                flex h-9 w-9
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-slate-50
                text-slate-500
                transition-all
                duration-500
                group-hover:bg-white/15
                group-hover:text-white
              "
            >
              <Rotate3D
                className="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* =====================================================
            BACK
        ===================================================== */}
        <div
          className="
            absolute inset-0
            flex h-full w-full flex-col
            overflow-hidden
            rounded-[1.75rem]
            border border-slate-800
            bg-slate-950
            p-7
            text-white
            shadow-xl
            [backface-visibility:hidden]
          "
          style={{
            transform: "rotateY(180deg)",
          }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-red-600/20
              blur-3xl
            "
          />

          {/* Header */}
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-red-400">
                <Icon
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-lg font-bold text-white">
                {category.title}
              </h3>
            </div>

            {/* ONLY ONE BACK BUTTON */}
            <button
              type="button"
              onClick={toggleCard}
              aria-label={`Return to ${category.title}`}
              className="
                flex h-9 w-9
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-slate-300
                transition
                hover:bg-white/15
                hover:text-white
              "
            >
              <ArrowLeft
                className="h-4 w-4"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Offer */}
          <div className="relative mt-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              What we offer
            </p>

            <h4 className="mt-1 text-xl font-bold text-white">
              {category.offerTitle}
            </h4>
          </div>

          {/* Features */}
          <ul className="relative mt-4 grid gap-2">
            {category.features.map((feature) => (
              <li
                key={feature}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-slate-300
                "
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-red-400"
                  aria-hidden="true"
                />

                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ServiceIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/40">
            {/* Hero glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-72
                w-72
                rounded-full
                bg-red-50
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-32
                -left-24
                h-64
                w-64
                rounded-full
                bg-slate-100
                blur-3xl
              "
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  Our Services
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
                  Professional editing services,
                  <span className="text-red-600"> made simple.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Explore our editing services, compare packages, and choose
                  the right solution for your photography and creative
                  workflow.
                </p>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />

                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-slate-100 pt-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Explore
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    7 service categories
                  </p>
                </div>

                <Link
                  href="/contact-us"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-red-600 transition hover:text-red-700"
                >
                  Need something custom?

                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-600">
                Service Categories
              </p>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Find the service you need
              </h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Rotate3D
                className="h-4 w-4 text-red-500"
                aria-hidden="true"
              />

              <span>Click a card to explore</span>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <ServiceFlipCard
                key={category.href}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CUSTOM CTA
      ===================================================== */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-10 text-white sm:px-10 lg:px-14 lg:py-12">
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                h-64
                w-64
                rounded-full
                bg-red-600/20
                blur-3xl
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-32
                left-1/3
                h-64
                w-64
                rounded-full
                bg-slate-700/30
                blur-3xl
              "
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-red-400">
                  <Clapperboard
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  Have a special requirement?
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Need a custom editing solution?
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                  Tell us what you need and we can help create a workflow
                  around your project, volume, and turnaround requirements.
                </p>
              </div>

              <Link
                href="/pay"
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-red-600
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-red-950/20
                  transition
                  hover:bg-red-500
                "
              >
                View Custom Payment

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}