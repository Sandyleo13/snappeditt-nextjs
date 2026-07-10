"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ShoppingCart, ChevronDown, ChevronRight, ChevronUp,
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trialOpen, setTrialOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const serviceRef = useRef<HTMLLIElement | null>(null);

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
    };
  }, []);

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
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-lm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="text-lm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                About Us
              </Link>

              {/* Services mega-dropdown */}
              <li className="list-none relative" ref={serviceRef}>
                <button
                  onClick={() => { setServiceOpen(!serviceOpen); setActiveService(null); }}
                  className="flex items-center gap-1 text-lm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200"
                >
                  Services
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={`absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 transition-all duration-200 z-50 ${
                    serviceOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rotate-45 border-l border-t border-gray-100 rounded-sm z-10" />

                  <div className="relative flex rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white min-w-[600px]">

                    {/* Left — category list */}
                    <div className="w-52 bg-gray-50 border-r border-gray-100 py-2">
                      <p className="px-4 pt-2 pb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Categories
                      </p>
                      {services.map((s) => (
                        <button
                          key={s.name}
                          onMouseEnter={() => setActiveService(s.name)}
                          onClick={() => setActiveService(s.name)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-lg mx-1 ${
                            activeService === s.name
                              ? "bg-red-500 text-white shadow-sm"
                              : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                          }`}
                          style={{ width: "calc(100% - 8px)" }}
                        >
                          <span>{s.name}</span>
                          <ChevronRight size={13} className={activeService === s.name ? "opacity-80" : "opacity-40"} />
                        </button>
                      ))}
                    </div>

                    {/* Right — submenu items */}
                    <div className="flex-1 bg-white py-2 px-2 min-w-[280px]">
                      {activeService ? (
                        <>
                          <p className="px-3 pt-2 pb-2 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                            {activeService}
                          </p>
                          <div className="grid grid-cols-1 gap-0.5">
                            {services
                              .find((s) => s.name === activeService)
                              ?.submenu.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => { setServiceOpen(false); setActiveService(null); }}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-150 group"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 group-hover:bg-red-500 transition-colors" />
                                  {item.name}
                                  <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
                                </Link>
                              ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm px-6 py-8 gap-2">
                          <ChevronRight size={20} className="text-red-300" />
                          <span>Hover a category to explore</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>

              <Link
                href="/contact-us"
                className="text-lm font-medium text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </nav>

            {/* ── Right Actions ── */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/cart"
                className="relative p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
              </Link>

              <Navbarfetchname />

              <button
                onClick={() => setTrialOpen(true)}
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-red-500/30 transition-all duration-200"
              >
                Free Trial
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
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
              className="py-3 text-sm font-medium text-gray-700 hover:text-red-500 border-b border-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about-us"
              onClick={closeAll}
              className="py-3 text-sm font-medium text-gray-700 hover:text-red-500 border-b border-gray-50 transition-colors"
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
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
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

            <p className="text-center text-sm text-gray-500">
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
