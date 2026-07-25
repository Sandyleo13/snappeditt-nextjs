"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ShoppingCart, ChevronDown, ChevronRight, ChevronUp, ImageIcon,
  Home, Layout, Heart, Box, User, Scissors, Camera,
} from "lucide-react";
import Navbarfetchname from "../shared/NavbarFetchName";

const services = [
  {
    name: "Real Estate",
    submenu: [
      { name: "Single Exposure", href: "/service/real-estate/single-explosure" },
      { name: "HDR Basic", href: "/service/real-estate/hdr-basic" },
      { name: "HDR Premium", href: "/service/real-estate/hdr-preminum" },
      { name: "Flambient Editing", href: "/service/real-estate/flambient-editing" },
      { name: "Manual Blending", href: "/service/real-estate/manual-blending" },
      { name: "Architecture Retouching", href: "/service/real-estate/architecture-retouch" },
      { name: "Day To Dusk", href: "/service/real-estate/day-to-dusk" },
      { name: "De-Clutter Objects", href: "/service/real-estate/digital-declutter" },
      { name: "UAV Retouching", href: "/service/real-estate/uav-retouching" },
      { name: "Virtual Staging", href: "/service/real-estate/virtual-staging" },
      { name: "Floor Plans", href: "/service/real-estate/2d-3d-floor-plans" },
    ],
  },
  {
    name: "3D Services",
    submenu: [
      { name: "3D Floor Plan", href: "/service/3d-services/3d-floor-plan" },
      { name: "3D Rendering", href: "/service/3d-services/3d-rendering" },
    ],
  },
  {
    name: "Wedding & Events",
    submenu: [
      { name: "Perfect Color Balance", href: "/service/wedding-events/perfect-color-balance" },
      { name: "Color Balance + Culling", href: "/service/wedding-events/perfect-color-balance-culling" },
      { name: "Wedding Retouch", href: "/service/wedding-events/wedding-events-retouch" },
      { name: "Album Retouch", href: "/service/wedding-events/album-retouch" },
    ],
  },
  {
    name: "Product Ecommerce",
    submenu: [
      { name: "Product Retouching", href: "/service/commercial/products-apparel-footwear-furniture" },
      { name: "Jewelry", href: "/service/commercial/jewelry" },
      { name: "Ghost Mannequin", href: "/service/commercial/ghost-mannequin" },
      { name: "Product Composite", href: "/service/commercial/photo-composite" },
    ],
  },
  {
    name: "People Retouching",
    submenu: [
      { name: "Portrait Retouch", href: "/service/people/portrait-headshots-studio" },
      { name: "Corporate Headshots", href: "/service/people/corporate-professional-headshots" },
      { name: "Pregnancy Retouch", href: "/service/people/maternity-pregnancy-retouch" },
      { name: "Baby Retouch", href: "/service/people/new-born" },
      { name: "School Retouching", href: "/service/people/school" },
      { name: "Sports Retouching", href: "/service/people/sports" },
      { name: "Fashion Retouching", href: "/service/people/fashion-glamour" },
    ],
  },
  {
    name: "Clipping Path",
    submenu: [
      { name: "Clipping Path", href: "/service/clipping-path-extraction/clipping-path" },
      { name: "Extraction", href: "/service/clipping-path-extraction/extraction" },
    ],
  },
  {
    name: "Custom Payment",
    submenu: [
      { name: "Pay Now", href: "/pay" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const serviceRef = useRef<HTMLLIElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target as Node)) {
        setServiceOpen(false);
        setActiveService(null);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, []);

  const isServiceRoute = pathname?.startsWith("/service/") ?? false;
  const currentServiceCategory = services.find((service) =>
    service.submenu.some((item) => item.href === pathname),
  )?.name ?? null;
  const dropdownActiveService = activeService ?? currentServiceCategory ?? services[0]?.name;
  const activeCategory = services.find((service) => service.name === dropdownActiveService) ?? services[0];
  const selectedServiceItem =
    activeCategory.submenu.find((item) => item.href === pathname) ?? activeCategory.submenu[0];

  const categoryIcon = (name: string) => {
    switch (true) {
      case name.includes("Real Estate"):
        return <Home size={16} className="text-red-500" />;
      case name.includes("3D"):
        return <Layout size={16} className="text-red-500" />;
      case name.includes("Wedding"):
        return <Heart size={16} className="text-red-500" />;
      case name.includes("Product"):
        return <Box size={16} className="text-red-500" />;
      case name.includes("People"):
        return <User size={16} className="text-red-500" />;
      case name.includes("Clipping"):
        return <Scissors size={16} className="text-red-500" />;
      default:
        return <Camera size={16} className="text-red-500" />;
    }
  };

  const closeAll = () => {
    setMobileOpen(false);
    setMobileServiceOpen(false);
    setMobileActiveService(null);
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white border-b border-gray-100 shadow-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/toWEBP/snappeditt.webp"
                alt="Snappeditt Logo"
                width={160}
                height={160}
                priority
                className="w-[160px] h-[160px] object-contain"
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className={`hidden lg:flex items-center gap-8 transition duration-200 ${serviceOpen ? "bg-red-50 ring-1 ring-red-100 rounded-full px-4 py-2 shadow-sm" : ""}`}>
              <Link
                href="/"
                className={`text-lm font-medium font-blod transition-colors duration-200 ${pathname === "/" ? "text-red-500" : "text-black hover:text-red-500"}`}
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className={`text-lm font-medium transition-colors duration-200 ${pathname === "/about-us" ? "text-red-500" : "text-black hover:text-red-500"}`}
              >
                About Us
              </Link>

              {/* Services mega-dropdown */}
              <li className="list-none relative" ref={serviceRef}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) { window.clearTimeout(closeTimeoutRef.current); closeTimeoutRef.current = null; }
                  setServiceOpen(true);
                  setActiveService(currentServiceCategory ?? services[0]?.name ?? null);
                }}
                onMouseLeave={() => {
                  closeTimeoutRef.current = window.setTimeout(() => {
                    setServiceOpen(false);
                    setActiveService(null);
                    closeTimeoutRef.current = null;
                  }, 200);
                }}>
                <button
                  onClick={() => {
                    setServiceOpen(true);
                    setActiveService(currentServiceCategory);
                  }}
                  className={`flex items-center gap-1 text-lm font-medium transition-colors duration-200 ${serviceOpen || isServiceRoute ? "text-red-500" : "text-black hover:text-red-500"}`}
                >
                  Services
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""} ${serviceOpen || isServiceRoute ? "text-red-500" : "text-black"}`}
                  />
                </button>

                {/* Invisible hover bridge to prevent accidental close when moving cursor */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-4 w-[760px] max-w-full pointer-events-auto" />

                {/* Dropdown panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 z-50 ${
                    serviceOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45 border-l border-t border-gray-100 rounded-sm z-10" />

                  <div className="relative grid min-w-[760px] grid-cols-[220px_260px_1fr] overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white">

                    {/* Left — category list */}
                    <div className="bg-gray-50 border-r border-gray-100 py-4 px-3">
                      <p className="px-3 pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Categories
                      </p>
                      <div className="space-y-1">
                        {services.map((s) => {
                          const isActive = dropdownActiveService === s.name;
                          return (
                            <button
                              key={s.name}
                              onMouseEnter={() => setActiveService(s.name)}
                              onClick={() => setActiveService(s.name)}
                              className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-150 ${
                                isActive
                                  ? "bg-red-500 text-white shadow-sm"
                                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                              }`}
                            >
                              <span className="text-base">{categoryIcon(s.name)}</span>
                              <span>{s.name.replace(" & Events", "")}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Middle — editing services list */}
                    <div className="bg-white py-4 px-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Editing Services
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-slate-950">{activeCategory.name}</h3>
                        </div>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                          Featured
                        </span>
                      </div>
                      <div className="mt-4 grid gap-2">
                        {activeCategory.submenu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setServiceOpen(false);
                              setActiveService(null);
                            }}
                            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-150 ${
                              pathname === item.href
                                ? "border-red-200 bg-red-50 text-red-600"
                                : "border-gray-100 text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronRight size={14} className="opacity-50" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right — featured service panel */}
                    <div className="bg-slate-950 text-white p-5 flex flex-col justify-between min-h-[340px]">
                      <div>
                        <span className="inline-flex rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
                          Featured Service
                        </span>
                        <h4 className="mt-5 text-xl font-semibold tracking-tight text-white">
                          {selectedServiceItem?.name ?? "Service Preview"}
                        </h4>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          Explore how our {activeCategory.name.toLowerCase()} workflow transforms your images with sharp color, clean edits, and fast delivery.
                        </p>
                      </div>

                      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Before / After</span>
                          <span className="rounded-full bg-red-500/15 px-2 py-1 text-[11px] font-semibold text-red-200">Live Preview</span>
                        </div>
                        <div className="flex h-32 items-center justify-center rounded-2xl bg-slate-900">
                          <ImageIcon size={38} className="text-red-500" />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() => {
                            setServiceOpen(false);
                            setActiveService(null);
                          }}
                          className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                          Explore Service
                        </button>
                        <span className="text-xs text-slate-400">Instant quote available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <Link
                href="/contact-us"
                className={`text-lm font-medium transition-colors duration-200 ${pathname === "/contact-us" ? "text-red-500" : "text-black hover:text-red-500"}`}
              >
                Contact Us
              </Link>
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden lg:flex text-black text-sm items-center gap-4">
              <Link
                href="/cart"
                className="relative p-2 text-black hover:text-red-500 transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingCart size={24} />
              </Link>

              <Navbarfetchname/>

              <button
                onClick={() => setTrialOpen(true)}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-red-500/30 transition-all duration-200"
              >
                Free Trial
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden p-2 text-gray-900 hover:text-black transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[100vh]" : "max-h-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeAll}
              className="py-3 text-sm font-medium text-gray-900 hover:text-red-500 border-b border-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={closeAll}
              className="py-3 text-sm font-medium text-gray-900 hover:text-red-500 border-b border-gray-50 transition-colors"
            >
              About Us
            </Link>

            {/* Mobile Services accordion */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700 hover:text-red-500 transition-colors"
              >
                Services
                {mobileServiceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {mobileServiceOpen && (
                <div className="pb-2 pl-2 flex flex-col gap-0.5">
                  {services.map((s) => (
                    <div key={s.name}>
                      <button
                        onClick={() => setMobileActiveService(mobileActiveService === s.name ? null : s.name)}
                        className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-colors"
                      >
                        {s.name}
                        {mobileActiveService === s.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {mobileActiveService === s.name && (
                        <div className="pl-4 flex flex-col gap-0.5 mb-1">
                          {s.submenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeAll}
                              className="flex items-center gap-2 py-2 px-3 rounded-lg text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              onClick={closeAll}
              className="py-3 text-sm font-medium text-gray-700 hover:text-red-500 border-b border-gray-50 transition-colors"
            >
              Contact Us
            </Link>

            {/* Mobile bottom actions */}
            <div className="flex items-center justify-between pt-3 gap-3">
              <div className="flex items-center gap-3">
                <Link
                  href="/cart"
                  onClick={closeAll}
                  className="p-2 text-gray-900 hover:text-red-500 transition-colors"
                >
                  <ShoppingCart size={20} />
                </Link>
                <Navbarfetchname />
              </div>
              <button
                onClick={() => { setTrialOpen(true); closeAll(); }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                Free Trial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Free Trial Modal ── */}
      <FreeTrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
    </>
  );
}

/* ─────────────────────────────── Free Trial Modal ─────────────────────────────── */
function FreeTrialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Start Your Free Trial</h3>
              <p className="text-xs text-gray-500 mt-0.5">No credit card required</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <form
            className="px-6 py-5 flex flex-col gap-4"
            onSubmit={(e) => { e.preventDefault(); onClose(); }}
          >
            <div>
              <label htmlFor="trial-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="trial-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder:text-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="trial-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="trial-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder:text-gray-400 transition"
              />
            </div>

            <div>
              <label htmlFor="trial-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="trial-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent placeholder:text-gray-400 transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-400"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-red-500 hover:underline font-medium">
                Lost Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md hover:shadow-red-500/30"
            >
              Create free account
            </button>

            <p className="text-center text-sm text-gray-900">
              Already have an account?{" "}
              <Link href="/login" onClick={onClose} className="text-red-500 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
