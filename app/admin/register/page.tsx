"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.error); setLoading(false); return; }
      alert("Admin registered successfully! Please login.");
      router.push("/admin");
    } catch {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* <div className="flex justify-center mb-8">
          <Image src="/toWEBP/snappeditt.webp" alt="Snapp Ed't" width={160} height={56} priority className="h-14 w-auto object-contain" />
        </div> */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="mb-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1F0] mb-4">
              <ShieldCheck className="h-5 w-5 text-[#E53E3E]" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Create Admin Account</h1>
            <p className="text-sm text-slate-500 mt-1">Register a new administrator</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 text-center">{error}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
              </div>
            </div>

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
                <input type={showPw ? "text" : "password"} autoComplete="new-password"
                  value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-10 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-[#E53E3E] py-3 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60">
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/admin" className="font-semibold text-[#E53E3E] hover:underline">Sign in</Link>
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">© 2026 SnappEditt. All rights reserved.</p>
      </div>
    </div>
  );
}
