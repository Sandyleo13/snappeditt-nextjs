"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Facebook,
  Github,
  Mail,
  Phone,
  Heart,
  Zap,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Send,
  Shield,
  Globe,
  Lock,
  Award,
  Star,
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
    { name: "About Us", href: "/about-us" },
    { name: "How It Works", href: "/features" },
    { name: "Before & After", href: "/before-after" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Free Trial", href: "/free-trial" },
  ];

  const resources = [
    { name: "Support", href: "/contact-us" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Cart", href: "/cart" },
  ];
  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com",
      color: "text-[var(--primary)]",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com",
      color: "text-[var(--primary)]",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com",
      color: "text-[var(--primary)]",
    },
    // {
    //   name: "LinkedIn",
    //   icon: Linkedin,
    //   href: "https://linkedin.com",
    //   color: "text-[var(--primary)]",
    // },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com",
      color: "text-[var(--primary)]",
    },
    // {
    //   name: "GitHub",
    //   icon: Github,
    //   href: "https://github.com",
    //   color: "text-[var(--primary)]",
    // },
  ];

  return (
    <footer className="relative overflow-hidden border border-black/10 bg-black">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute -left-36 -top-36 h-80 w-80 rounded-full bg-[var(--primary)]/10 opacity-40 mix-blend-screen blur-3xl filter" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--primary-dark)]/10 opacity-40 mix-blend-screen blur-3xl filter" />

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="pb-16 pt-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {/* Brand Column */}
            <div className="space-y-6 lg:col-span-1">
              <Link href="/" className="group inline-flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-[var(--primary)]/15">
                  <Image
                    src="/toWEBP/snappeditt.webp"
                    alt="SnapEdit logo"
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

              {/* Newsletter Subscription */}
              <div className="space-y-3 pt-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-white">
                  Newsletter
                </h4>

                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                      required
                    />

                    <button
                      type="submit"
                      className="rounded-2xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] px-3 py-2 text-white transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/25"
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

            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
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

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
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

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
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

            {/* =====================================================
                CONTACT COLUMN
            ===================================================== */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Contact
              </h3>

              <div className="space-y-2">
                {/* Email */}
                <a
                  href="mailto:sales@snappeditt.com"
                  className="group flex items-start gap-3"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[var(--primary)]" />

                  <div className="text-sm text-[var(--footer-muted)] transition-colors group-hover:text-white">
                    sales@snappeditt.com
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+11234567890"
                  className="group flex items-start gap-3"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[var(--primary)]" />

                  <div className="text-sm text-[var(--footer-muted)] transition-colors group-hover:text-white">
                    +1 (123) 456-7890
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Middle Section - Trust & Security */}
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Security Badges */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white">
                <Lock className="h-4 w-4 text-green-500" />
                Security & Compliance
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-slate-300">SSL 256-bit Encryption</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-slate-300">GDPR Compliant</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-slate-300">ISO 27001 Certified</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Why Choose Us
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-300">
                    Professional Photo Editing
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-300">Fast Turnaround Time</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-300">High-Quality Results</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Follow Us
              </h4>

              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-slate-900 transition-all duration-300 hover:scale-110 hover:bg-slate-100 hover:shadow-lg ${social.color}`}
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <div className="text-sm text-slate-300">
                © {new Date().getFullYear()} SnappEditt rights reserved.
              </div>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-[var(--footer-muted)]">
              <span>Made with</span>

              <Heart className="h-4 w-4 animate-pulse fill-[var(--primary)] text-[var(--primary)]" />

              <span>by Atria Web Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
