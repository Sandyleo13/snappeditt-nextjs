"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Mail,
  Phone,
  Heart,
  Send,
  Shield,
  Lock,
  CheckCircle,
} from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);
      setEmail("");

      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const services = [
    {
      name: "Real Estate",
      href: "/service/real-estate",
    },
    {
      name: "3D Services",
      href: "/service/3d-services",
    },
    {
      name: "Wedding Retouching",
      href: "/service/wedding-events/wedding-events-retouch",
    },
    {
      name: "Product Ecommerce",
      href: "/service/commercial",
    },
    {
      name: "People Retouching",
      href: "/service/people",
    },
    {
      name: "Clipping Path",
      href: "/service/clipping-path-extraction",
    },
  ];

  const company = [
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "How It Works",
      href: "/features",
    },
    {
      name: "Before & After",
      href: "/before-after",
    },
    {
      name: "Contact Us",
      href: "/contact-us",
    },
    {
      name: "Free Trial",
      href: "/free-trial",
    },
  ];

  const resources = [
    {
      name: "Support",
      href: "/contact-us",
    },
    {
      name: "Login",
      href: "/login",
    },
    {
      name: "Register",
      href: "/register",
    },
    {
      name: "Cart",
      href: "/cart",
    },
  ];

  const legalLinks = [
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
    {
      name: "Security",
      href: "/security",
    },
    {
      name: "GDPR",
      href: "/gdpr",
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
    },
  ];

  return (
    <footer className="relative overflow-hidden border border-black/10 bg-black">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="pointer-events-none absolute -left-36 -top-36 h-80 w-80 rounded-full bg-[var(--primary)]/10 opacity-40 mix-blend-screen blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--primary-dark)]/10 opacity-40 mix-blend-screen blur-3xl" />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            TOP SECTION
        ======================================================= */}

        <div className="pb-16 pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {/* ===================================================
                BRAND
            =================================================== */}

            <div className="space-y-6 lg:col-span-1">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-[var(--primary)]/15">
                  <Image
                    src="/toWEBP/snappeditt.webp"
                    alt="SnappEditt logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="text-xl font-bold tracking-tight text-white">
                    SnappEditt
                  </div>
                </div>
              </Link>

              <p className="max-w-xs text-sm leading-relaxed text-[var(--footer-muted)]">
                Professional photo editing and retouching services trusted by
                photographers, studios, brands, and creative professionals
                worldwide.
              </p>

              {/* Newsletter */}
              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-semibold text-white">Newsletter</h4>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                      required
                    />

                    <button
                      type="submit"
                      aria-label="Subscribe to newsletter"
                      className="shrink-0 rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] px-3 py-2 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/25"
                    >
                      {subscribed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {subscribed && (
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      Subscribed!
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* ===================================================
                SERVICES
            =================================================== */}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Services
              </h3>

              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-2 text-sm text-slate-200 transition-all duration-300 hover:translate-x-0.5 hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===================================================
                COMPANY
            =================================================== */}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Company
              </h3>

              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-slate-200 transition-all duration-300 hover:translate-x-0.5 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===================================================
                RESOURCES
            =================================================== */}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Resources
              </h3>

              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="group flex items-center gap-2 text-sm text-slate-200 transition-all duration-300 hover:translate-x-0.5 hover:text-white"
                    >
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===================================================
                CONTACT
            =================================================== */}

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </h3>

              <div className="space-y-3">
                {/* Email */}
                <a
                  href="mailto:support@snappeditt.com"
                  className="group flex items-start gap-3"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[var(--primary)]" />

                  <span className="min-w-0 break-all text-sm text-[var(--footer-muted)] transition-colors group-hover:text-white">
                    support@snappeditt.com
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+17869811712"
                  className="group flex items-start gap-3"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[var(--primary)]" />

                  <span className="text-sm text-[var(--footer-muted)] transition-colors group-hover:text-white">
                    +1 786 981 1712
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            DIVIDER
        ========================================================= */}

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* =========================================================
            SECURITY / TRUST
        ========================================================= */}

        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Security */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                <Lock className="h-4 w-4 text-green-500" />
                Security &amp; Compliance
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-slate-300">SSL 256-bit Encryption</span>
                </div>

                <Link
                  href="/gdpr"
                  className="group flex items-center gap-3 text-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />

                  <span className="text-slate-300 transition-colors group-hover:text-white">
                    GDPR
                  </span>
                </Link>

                <Link
                  href="/security"
                  className="group flex items-center gap-3 text-sm"
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />

                  <span className="text-slate-300 transition-colors group-hover:text-white">
                    Security
                  </span>
                </Link>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Why Choose Us
              </h4>

              <div className="space-y-3">
                <div className="text-sm">
                  <span className="text-slate-300">
                    Professional Photo Editing
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-slate-300">Fast Turnaround Time</span>
                </div>

                <div className="text-sm">
                  <span className="text-slate-300">High-Quality Results</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Follow Us
              </h4>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-slate-900 transition-all duration-300 hover:scale-110 hover:bg-slate-100 hover:shadow-lg"
                      aria-label={social.name}
                      title={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            FINAL DIVIDER
        ========================================================= */}

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* =========================================================
            BOTTOM FOOTER
            Matches the provided screenshot
        ========================================================= */}

        <div className="py-8 sm:py-9">
          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
            {/* =====================================================
                LEFT
            ===================================================== */}

            <div className="min-w-0">
              <p className="text-sm text-slate-300">
                © {new Date().getFullYear()} SnappEditt AI. All rights reserved.
              </p>

              {/* Legal Links */}
              <nav
                aria-label="Legal"
                className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                {legalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-xs font-medium text-slate-300 transition-colors duration-200 hover:text-white sm:text-sm"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* =====================================================
                RIGHT
            ===================================================== */}

            <a
              href="https://atriawebsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center gap-2 text-sm text-[var(--footer-muted)] transition-colors duration-200 hover:text-white md:justify-end"
            >
              <span>Made with</span>

              <Heart
                className="h-4 w-4 animate-pulse fill-[var(--primary)] text-[var(--primary)] transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />

              <span>by Atria Web Solutions</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
