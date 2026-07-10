"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); setLoading(false); return; }
      setTimeout(() => router.push("/admin/dashboard"), 100);
    } catch {
      setError("Server error, try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        {/* <div className="flex justify-center mb-8">
          <Image src="/toWEBP/snappeditt.webp" alt="Snapp Ed't" width={160}
              height={160} priority className="h-14 w-auto object-contain" />
        </div> */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1F0] mb-4">
              <Lock className="h-5 w-5 text-[#E53E3E]" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to your admin panel</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type={showPw ? "text" : "password"} autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-10 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-[#E53E3E] py-3 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/admin/register" className="font-semibold text-[#E53E3E] hover:underline">Register</Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">© 2026 SnappEditt. All rights reserved.</p>
      </div>
    </div>
  );
}
