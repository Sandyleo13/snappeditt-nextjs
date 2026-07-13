'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Mail, Phone,
  ChevronDown, Send,
  Headphones, Clock, Shield,
  MessageCircle, MessageSquare, User,
} from 'lucide-react';

/* ─────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────── */
const faqServices = [
  { q: 'What types of services do you offer?' },
  { q: 'What is the process or workflow for a new job?' },
  { q: 'What is turnaround time?' },
  { q: 'Do you have any preferences on input files?' },
  { q: 'What is a Rush service?' },
  { q: 'What if I have very urgent requests or requirements which is not listed on your website?' },
  { q: 'What are the methods of transferring the files?' },
];

const faqGeneral = [
  {
    q: 'How secure are my files?',
    a: 'Your files are stored on encrypted servers and never shared with third parties. We use secure FTP and cloud transfers.',
  },
  {
    q: 'What if the quality is not up to my expectations?',
    a: "We offer unlimited revisions until you're 100% satisfied. Your satisfaction is our top priority.",
  },
  {
    q: 'How many editors will be working on my images?',
    a: 'Depending on the volume, a dedicated team of 1–5 specialist editors is assigned to your project.',
  },
  {
    q: 'Do you offer volume discounts?',
    a: 'Yes! Discounts are available for bulk orders. Contact us for a custom quote based on your volume.',
  },
  {
    q: 'What are the payment options?',
    a: 'We accept major credit cards, PayPal, bank wire transfers, and invoice-based billing for enterprise clients.',
  },
];

/* ─────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-gray-900">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#E8352A] flex-shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && a && (
        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   FLOATING BADGE
───────────────────────────────────────── */
function FloatingBadge({
  icon, label, className, delay,
}: { icon: React.ReactNode; label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className={`absolute z-20 flex items-center justify-center rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${className}`}
    >
      <div className="flex flex-col items-center gap-1 p-3">
        {icon}
        {label && <span className="text-white text-[9px] font-bold tracking-wider">{label}</span>}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">

      {/* ══════════════  HERO — full-width dark  ══════════════ */}
      <section className="relative bg-[#fff] overflow-hidden min-h-[420px] sm:min-h-[520px] flex items-center">

        {/* ── Animated background elements ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Red dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
            <defs>
              <pattern id="cdots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#E8352A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cdots)" />
          </svg>

          {/* Orbit rings, sphere, logo — desktop only */}
          {isDesktop && (
            <div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid meet">
                <ellipse cx="820" cy="300" rx="280" ry="210" stroke="#E8352A" strokeWidth="0.8" opacity="0.10" />
                <ellipse cx="820" cy="300" rx="200" ry="150" stroke="#E8352A" strokeWidth="0.6" opacity="0.08" />
                <ellipse cx="820" cy="300" rx="280" ry="210" stroke="#E8352A" strokeWidth="1.5" opacity="0.35"
                  strokeDasharray="160 1800"
                  style={{ animation: 'ctCW 8s linear infinite', transformOrigin: '820px 300px' }}
                />
              </svg>
              <div className="absolute right-[28%] top-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(232,53,42,0.30) 0%, transparent 70%)' }} />
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute right-[32%] top-[38%] w-16 h-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #ff8a7a 0%, #E8352A 55%, #8B1A10 100%)',
                  boxShadow: '0 0 60px rgba(232,53,42,0.6), 0 0 120px rgba(232,53,42,0.25)',
                }}
              />
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                className="absolute right-[22%] top-1/2 -translate-y-1/2 w-52 h-52 opacity-90"
              >
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="logoGrad" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#555" />
                      <stop offset="100%" stopColor="#111" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="100" cy="100" rx="72" ry="72" fill="url(#logoGrad)" />
                  <ellipse cx="100" cy="100" rx="72" ry="72" stroke="#E8352A" strokeWidth="1" opacity="0.4" />
                  <circle cx="100" cy="92" r="22" fill="none" stroke="#E8352A" strokeWidth="3" opacity="0.8" />
                  <circle cx="100" cy="92" r="12" fill="#E8352A" opacity="0.9" />
                  <path d="M 60 120 Q 100 150 140 120" stroke="#666" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d="M 68 80 Q 55 100 68 120" stroke="#555" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M 132 80 Q 145 100 132 120" stroke="#555" strokeWidth="5" strokeLinecap="round" fill="none" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>

        {/* CSS keyframe */}
        <style>{`@keyframes ctCW { to { stroke-dashoffset: -1960; } }`}</style>

        {/* Floating icon badges — desktop only */}
        {isDesktop && (
          <>
            <FloatingBadge icon={<MessageSquare className="w-5 h-5 text-[#E8352A]" />} label="" className="w-14 h-14 right-[40%] top-[18%]" delay={0.6} />
            <FloatingBadge icon={<><span className="text-gray-800 text-xs font-extrabold">24/7</span></>} label="" className="w-16 h-16 right-[10%] top-[16%]" delay={0.8} />
            <FloatingBadge icon={<Mail className="w-5 h-5 text-[#E8352A]" />} label="" className="w-14 h-14 right-[44%] bottom-[22%]" delay={1.0} />
            <FloatingBadge icon={<User className="w-5 h-5 text-[#E8352A]" />} label="" className="w-12 h-12 right-[8%] bottom-[28%]" delay={1.1} />
          </>
        )}

        {/* Left text content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="max-w-xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4 sm:mb-5"
            >
              <div className="w-7 h-0.5 bg-[#E8352A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8352A]">Get In Touch</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.08] mb-4 sm:mb-5"
            >
              Let's Connect and<br />
              Create Something{' '}
              <span className="text-[#E8352A]">Great</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-500 text-sm leading-relaxed mb-8 sm:mb-10 max-w-sm"
            >
              {"We'd love to hear from you! Whether you have a question, need a quote, or just want to say hello, we're here to help."}
            </motion.p>

            {/* Trust badges row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            >
              {[
                { icon: <Headphones className="w-5 h-5 text-[#E8352A]" />, title: '24/7 Support',    sub: "We're always here to help" },
                { icon: <Clock      className="w-5 h-5 text-[#E8352A]" />, title: 'Fast Response',   sub: 'Average response within 2 hours' },
                { icon: <Shield     className="w-5 h-5 text-[#E8352A]" />, title: 'Trusted Service', sub: '100% satisfaction guaranteed' },
              ].map(b => (
                <div key={b.title} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFF0EE] border border-[#FFD5CE] flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-bold leading-none mb-1">{b.title}</p>
                    <p className="text-gray-500 text-xs leading-snug">{b.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Slide indicator dots */}
            <div className="flex items-center gap-2 mt-8 sm:mt-10">
              <div className="w-3 h-3 rounded-full bg-[#E8352A]" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
              <div className="w-3 h-3 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════  CONTACT + FORM  ══════════════ */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14">

          {/* Left */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
              Where You Can <span className="text-[#E8352A]">Find Us</span>
            </h2>
            <div className="w-10 h-0.5 bg-[#E8352A] mb-4" />
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              We are here to assist you with all your Photo Post-Production needs.
            </p>

            <div className="space-y-6">
              {[
                { icon: <MapPin className="w-4 h-4 text-[#E8352A]" />, title: 'Address',
                  lines: ['123 Business Avenue, Suite 100,', 'New York, NY 10001, United States'] },
                { icon: <Phone className="w-4 h-4 text-[#E8352A]" />, title: 'Phone',
                  lines: ['+1 (212) 456 7890', 'Mon – Fri: 9:00 AM – 6:00 PM (EST)'] },
                { icon: <Mail className="w-4 h-4 text-[#E8352A]" />, title: 'Email',
                  lines: ['support@snappeditt.com', 'We reply within 2–4 hours'] },
              ].map(c => (
                <div key={c.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFF0EE] border border-[#FFD5CE] flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">{c.title}</p>
                    {c.lines.map((l, i) => (
                      <p key={i} className="text-sm text-gray-500 leading-relaxed">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 self-start">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Send Us a Message</h3>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-green-500" />
                </div>
                <p className="font-bold text-gray-900 mb-1">Message Sent!</p>
                <p className="text-sm text-gray-500 mb-4">{"We'll get back to you within 2 hours."}</p>
                <button onClick={() => setSubmitted(false)} className="text-sm text-[#E8352A] font-semibold hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Full Name',     name: 'name',  type: 'text',  placeholder: 'Enter your full name' },
                  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Enter your email' },
                  { label: 'Phone Number',  name: 'phone', type: 'tel',   placeholder: 'Enter your phone' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">{f.label}</label>
                    <input
                      type={f.type} name={f.name}
                      value={(form as Record<string, string>)[f.name]}
                      onChange={handleChange}
                      required={f.name !== 'phone'}
                      placeholder={f.placeholder}
                      className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8352A]/20 focus:border-[#E8352A] transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Select Service</label>
                  <select
                    name="service" value={form.service} onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8352A]/20 focus:border-[#E8352A] transition-all bg-white"
                  >
                    <option value="">— Choose a Service —</option>
                    <option value="real-estate">Real Estate Editing</option>
                    <option value="wedding">Wedding Album Editing</option>
                    <option value="people">People Retouching</option>
                    <option value="commercial">Commercial / Product</option>
                    <option value="clipping">Clipping Path & Extraction</option>
                    <option value="3d">3D Rendering</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Your Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8352A]/20 focus:border-[#E8352A] transition-all resize-none"
                  />
                </div>

                {/* reCAPTCHA mock */}
                <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                  <input type="checkbox" id="robot" className="w-4 h-4 accent-[#E8352A]" />
                  <label htmlFor="robot" className="text-sm text-gray-700 cursor-pointer select-none">{"I'm not a robot"}</label>
                  <div className="ml-auto text-right">
                    <p className="text-[9px] font-bold text-gray-400 tracking-wide">reCAPTCHA</p>
                    <p className="text-[8px] text-gray-300">Privacy · Terms</p>
                  </div>
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : <><span>Send Message</span><Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════  FAQ — Services  ══════════════ */}
      <section className="py-12 px-4 sm:px-6 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-[#E8352A]" />
            <h2 className="text-xl font-extrabold text-gray-900">
              Frequently Asked <span className="text-[#E8352A]">Questions</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Find answers to common questions about our services.</p>
          <div className="space-y-2">
            {faqServices.map((item, i) => <FAQItem key={i} q={item.q} />)}
          </div>
        </div>
      </section>

      {/* ══════════════  FAQ — General  ══════════════ */}
      <section className="py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <MessageCircle className="w-5 h-5 text-[#E8352A]" />
            <h2 className="text-xl font-extrabold text-gray-900">
              General <span className="text-[#E8352A]">Queries</span>
            </h2>
          </div>
          <div className="space-y-2">
            {faqGeneral.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

    </main>
  );
}
