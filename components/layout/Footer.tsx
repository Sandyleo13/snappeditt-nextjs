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
  MapPin,
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
  Star
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
    { name: "Day to Dusk", href: "/services/day-to-dusk" },
    { name: "Real Estate Editing", href: "/services/real-estate" },
    { name: "Wedding Album Editing", href: "/services/wedding" },
    { name: "Sky Replacement", href: "/services/sky-replacement" },
    { name: "Extraction & Clipping Path", href: "/services/extraction" },
    { name: "Batch Processing", href: "/services/batch" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  const resources = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "Support", href: "/support" },
    { name: "Status", href: "/status" },
    { name: "Community", href: "/community" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "GDPR", href: "/gdpr" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "text-[var(--primary)]" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "text-[var(--primary)]" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "text-[var(--primary)]" },
    // { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "text-[var(--primary)]" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "text-[var(--primary)]" },
    // { name: "GitHub", icon: Github, href: "https://github.com", color: "text-[var(--primary)]" },
  ];

  return (
    <footer className="relative bg-black overflow-hidden border border-black/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute -top-36 -left-36 w-80 h-80 bg-[var(--primary)]/10 rounded-full mix-blend-screen filter blur-3xl opacity-40" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[var(--primary-dark)]/10 rounded-full mix-blend-screen filter blur-3xl opacity-40" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-lg shadow-[var(--primary)]/15 border border-slate-200">
                  <Image
                    src="/toWEBP/snappeditt.webp"
                    alt="SnapEdit logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight text-white">SnappEditt</div>

                </div>
              </Link>
              <p className="text-[var(--footer-muted)] text-sm leading-relaxed max-w-xs">
                Professional photo editing and retouching services trusted by photographers, studios, brands, and creative professionals worldwide.
              </p>

              {/* Newsletter Subscription */}
              <div className="pt-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  {/* <Mail className="w-4 h-4 text-[var(--primary)]" /> */}
                  Newsletter
                </h4>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="flex-1 px-3 py-2 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                      required
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl text-white hover:shadow-xl hover:shadow-[var(--primary)]/25 transition-all duration-300"
                    >
                      {subscribed ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  {subscribed && (
                    <div className="text-xs text-green-400 flex items-center gap-2">
                      {/* <CheckCircle className="w-3 h-3" /> */}
                      Subscribed!
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Services Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {/* <Zap className="w-4 h-4 text-[var(--primary)]" /> */}
                Services
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-sm text-slate-200 hover:text-white hover:translate-x-0.5 transition-all duration-300 flex items-center gap-2 group"
                    >
                      {/* <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all" /> */}
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {/* <Sparkles className="w-4 h-4 text-[var(--primary)]" /> */}
                Company
              </h3>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-200 hover:text-white hover:translate-x-0.5 transition-all duration-300 flex items-center gap-2 group"
                    >
                      {/* <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all" /> */}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {/* <Globe className="w-4 h-4 text-teal-400" /> */}
                Resources
              </h3>
              <ul className="space-y-2">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <Link
                      href={resource.href}
                      className="text-sm text-slate-200 hover:text-white hover:translate-x-0.5 transition-all duration-300 flex items-center gap-2 group"
                    >
                      {/* <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-all" /> */}
                      {resource.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                {/* <MapPin className="w-4 h-4 text-[var(--primary)]" /> */}
                Contact
              </h3>
              <div className="space-y-2">
                <a href="mailto:hello@snapeedt.com" className="flex items-start gap-3 group">
                  {/* <Mail className="w-4 h-4 text-slate-300 group-hover:text-[var(--primary)] mt-0.5 transition-colors flex-shrink-0" /> */}
                  <div className="text-sm text-[var(--footer-muted)] group-hover:text-white transition-colors">
                    hello@snapeedt.com
                  </div>
                </a>
                <a href="tel:+11234567890" className="flex items-start gap-3 group">
                  <Phone className="w-4 h-4 text-slate-300 group-hover:text-[var(--primary)] mt-0.5 transition-colors flex-shrink-0" />
                  <div className="text-sm text-[var(--footer-muted)] group-hover:text-white transition-colors">
                    +1 (123) 456-7890
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-[var(--footer-muted)]">
                    <div>123 Creative Street</div>
                    <div>San Francisco, CA 94107</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Middle Section - Trust & Security */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Security Badges */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                Security & Compliance
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-slate-300">SSL 256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-slate-300">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-slate-300">ISO 27001 Certified</span>
                </div>
              </div>
            </div>

    {/* Why Choose Us */}
<div className="space-y-4">
  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
    {/* <Award className="w-4 h-4 text-yellow-500" /> */}
    Why Choose Us
  </h4>

  <div className="space-y-3">
    <div className="flex items-center gap-3 text-sm">
      {/* <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" /> */}
      <span className="text-slate-300">Professional Photo Editing</span>
    </div>

    <div className="flex items-center gap-3 text-sm">
      {/* <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" /> */}
      <span className="text-slate-300">Fast Turnaround Time</span>
    </div>

    <div className="flex items-center gap-3 text-sm">
      {/* <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" /> */}
      <span className="text-slate-300">High-Quality Results</span>
    </div>
  </div>
</div>
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
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
                      className={`w-10 h-10 rounded-lg bg-white/90 hover:bg-slate-100 flex items-center justify-center text-slate-900 ${social.color} transition-all duration-300 hover:shadow-lg hover:scale-110`}
                      aria-label={social.name}
                      title={social.name}
                    >
                      <Icon className="w-5 h-5" />
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Copyright */}
            <div className="text-center md:text-left space-y-4">
              <div className="text-sm text-slate-300">
                © {new Date().getFullYear()} SnapEdit AI. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-xs text-[var(--footer-muted)] hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2 text-sm text-[var(--footer-muted)]">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[var(--primary)] fill-[var(--primary)] animate-pulse" />
              <span>by SnappEditt Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
