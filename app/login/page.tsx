"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Upload, Clock, Shield, Image as ImageIcon, Smile } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/login", { method: "POST", body: formData });
      if (res.redirected) { window.location.href = res.url; return; }
      const data = await res.json();
      if (!res.ok) setError(data.error || "Login failed");
      else window.location.href = "/";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl grid md:grid-cols-[1.15fr_1fr]">

        {/* ══════════════  LEFT PANEL  ══════════════ */}
        <div className="relative hidden md:flex flex-col bg-gradient-to-br from-[#E8352A] via-[#d42d22] to-[#b71c1c] overflow-hidden p-8 xl:p-10 min-h-[640px]">

          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.10] pointer-events-none">
            <defs>
              <pattern id="lgdots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lgdots)" />
          </svg>

          {/* Glow blobs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/15 blur-3xl pointer-events-none" />

          {/* Floating spheres */}
          <motion.div animate={{ y: [-12, 12, -12] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[8%] right-[8%] w-12 h-12 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at 35% 30%, #ffb3aa 0%, #E8352A 50%, #8b1a0f 100%)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }} />
          <motion.div animate={{ y: [8, -8, 8] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 0.6 }}
            className="absolute top-[42%] right-[5%] w-5 h-5 rounded-full bg-white/35 pointer-events-none" />
          <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[28%] left-[4%] w-4 h-4 rounded-full bg-white/25 pointer-events-none" />

          {/* AI Powered badge */}
          {/* <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1.5 z-20">
            <div className="w-4 h-4 rounded-full bg-white/80 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#E8352A]" />
            </div>
            <span className="text-white text-xs font-bold tracking-wide">AI Powered</span>
          </motion.div> */}

          {/* Heading + description */}
          <div className="relative z-10 mt-4">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl xl:text-3xl font-extrabold text-white leading-tight">
              Welcome Back to<br />SnappEditt
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-2.5 text-white/75 text-[13px] leading-relaxed max-w-[260px]">
              Access your dashboard, upload images, track orders, and manage your professional photo editing projects.
            </motion.p>

            {/* Feature pills */}
            <div className="mt-5 flex flex-col gap-2">
              {[
                { icon: <Upload className="w-3.5 h-3.5" />, label: "Fast Upload" },
                { icon: <Clock  className="w-3.5 h-3.5" />, label: "24hr Delivery" },
                { icon: <Shield className="w-3.5 h-3.5" />, label: "Secure & Private" },
              ].map((p, i) => (
                <motion.div key={p.label}
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.45 }}
                  className="flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-3.5 py-2 w-fit">
                  <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-white flex-shrink-0">{p.icon}</div>
                  <span className="text-white text-sm font-semibold">{p.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Laptop mockup ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65, ease: "easeOut" }}
            className="relative z-10 mt-6 flex-1 flex items-end">

            {/* Laptop frame */}
            <div className="relative w-full">
              {/* Screen */}
              <div className="relative mx-auto w-[88%] bg-[#1a1a2e] rounded-t-xl overflow-hidden shadow-2xl border-2 border-white/20"
                style={{ aspectRatio: "16/10" }}>
                {/* Dashboard screenshot */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-2">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-[8px] font-bold">Snapp Ed'tt</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                  </div>
                  {/* Dashboard body */}
                  <div className="grid grid-cols-[32px_1fr] gap-1.5 h-[calc(100%-18px)]">
                    {/* Sidebar */}
                    <div className="bg-[#E8352A]/20 rounded-lg p-1 flex flex-col gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full ${i === 0 ? 'bg-[#E8352A]' : 'bg-white/20'}`} />
                      ))}
                    </div>
                    {/* Main */}
                    <div className="flex flex-col gap-1.5">
                      {/* Stats row */}
                      <div className="grid grid-cols-4 gap-1">
                        {[250, 18, 232, "99%"].map((v, i) => (
                          <div key={i} className="bg-white/10 rounded p-1 text-center">
                            <p className="text-white text-[7px] font-bold">{v}</p>
                          </div>
                        ))}
                      </div>
                      {/* Recent orders label */}
                      <p className="text-white/60 text-[6px] font-semibold">Recent Orders</p>
                      {/* Order rows */}
                      {["Living Room Photo", "Villa Exterior", "Kitchen Design"].map((name, i) => (
                        <div key={i} className="flex items-center gap-1 bg-white/8 rounded px-1 py-0.5">
                          <div className="w-3 h-3 rounded bg-white/20 flex-shrink-0" />
                          <p className="text-white/70 text-[6px] flex-1 truncate">{name}</p>
                          <div className={`w-5 h-1 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Before/After card floating over screen */}
                <div className="absolute top-2 right-2 w-[52%] rounded-lg overflow-hidden shadow-xl border border-white/20"
                  style={{ aspectRatio: "4/3" }}>
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80&auto=format&fit=crop"
                    alt="after" className="absolute inset-0 w-full h-full object-cover" />
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80&auto=format&fit=crop&sat=-80&brightness=65"
                    alt="before" className="absolute inset-0 w-1/2 h-full object-cover" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/70 -translate-x-1/2 z-10" />
                  <span className="absolute top-1 left-1.5 z-10 bg-black/60 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">Before</span>
                  <span className="absolute top-1 right-1.5 z-10 bg-[#E8352A] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full">After</span>
                  {/* Enhanced badge */}
                  <div className="absolute bottom-1.5 right-1.5 z-10 flex items-center gap-1 bg-white/95 rounded-lg px-1.5 py-0.5 shadow">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8352A]" />
                    <span className="text-[7px] font-bold text-gray-700">✦ Enhanced</span>
                  </div>
                </div>

                {/* Editing in progress card */}
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute bottom-2 right-2 z-20 bg-white rounded-xl px-2 py-1.5 shadow-lg flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border-2 border-[#E8352A] flex items-center justify-center flex-shrink-0">
                    <span className="text-[7px] font-extrabold text-[#E8352A]">75%</span>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-800 leading-none">Editing in Progress</p>
                    <p className="text-[7px] text-gray-400 mt-0.5">High Quality Output</p>
                    <p className="text-[7px] text-gray-400">Almost Done...</p>
                  </div>
                </motion.div>
              </div>

              {/* Laptop base */}
              <div className="mx-auto w-[92%] h-2 bg-white/25 rounded-b-md" />
              <div className="mx-auto w-[60%] h-1.5 bg-white/15 rounded-b-xl" />

              {/* Plant decoration */}
              <div className="absolute -left-2 bottom-4 w-10 h-12 opacity-80">
                <div className="w-6 h-6 rounded-full bg-[#2d5a27] absolute bottom-3 left-2" />
                <div className="w-4 h-4 rounded-full bg-[#3a7a32] absolute bottom-5 left-4" />
                <div className="w-5 h-5 rounded-full bg-[#4a9a40] absolute bottom-6 left-1" />
                <div className="w-7 h-3 rounded-b-xl bg-gray-100 absolute bottom-0 left-1" />
              </div>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="relative z-10 mt-4 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 grid grid-cols-3 gap-3">
            {[
              { icon: <ImageIcon className="w-4 h-4" />, value: "50K+", label: "Images Edited" },
              { icon: <Clock     className="w-4 h-4" />, value: "24hr", label: "Delivery Time" },
              { icon: <Smile     className="w-4 h-4" />, value: "99%",  label: "Happy Clients" },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="text-white/70 flex-shrink-0">{s.icon}</div>
                <div>
                  <p className="text-white font-extrabold text-base leading-none">{s.value}</p>
                  <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════  RIGHT PANEL  ══════════════ */}
        <div className="bg-white flex items-center justify-center p-8 sm:p-10 md:p-12">
          <div className="w-full max-w-sm">

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome Back</h1>
              <p className="mt-1.5 text-gray-500 text-sm">Login to your Snappeditt account</p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" name="email" required placeholder="atriva@example.com"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E8352A]/20 focus:border-[#E8352A] transition-all" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} name="password" required placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E8352A]/20 focus:border-[#E8352A] transition-all" />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#E8352A]" />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-sm text-[#E8352A] font-semibold hover:text-[#C62B20] transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-[0_8px_24px_rgba(232,53,42,0.28)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                {loading ? "Logging in…" : <><span>Login</span><ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            {/* Register */}
            <p className="mt-5 text-center text-sm text-gray-500">
              {"Don't have an account? "}
              <a href="/register" className="font-bold text-[#E8352A] hover:text-[#C62B20] transition-colors">Create Account</a>
            </p>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Google",   src: "https://www.svgrepo.com/show/475656/google-color.svg" },
                { label: "Facebook", src: "https://www.svgrepo.com/show/475647/facebook-color.svg" },
                { label: "Apple",    src: "https://www.svgrepo.com/show/452195/apple.svg" },
              ].map(s => (
                <button key={s.label}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-xs font-semibold text-gray-700">
                  <img src={s.src} alt={s.label} className="w-5 h-5" />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
