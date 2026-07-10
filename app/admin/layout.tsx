"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Package, CreditCard, TrendingUp,
  Users, LogOut, Menu, X, Star,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard",    label: "Dashboard",  icon: LayoutDashboard },
  { href: "/admin/order-details",label: "Orders",     icon: Package },
  { href: "/admin/payments",     label: "Payments",   icon: CreditCard },
  { href: "/admin/sales",        label: "Sales",      icon: TrendingUp },
  { href: "/admin/users",        label: "Users",      icon: Users },
  { href: "/admin/profile",     label: "Profile",    icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const isAuth = pathname === "/admin" || pathname === "/admin/register";

  const handleLogout = async () => {
    await fetch("/api/admin/logout");
    router.push("/admin");
  };

  const activeItem = navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "?"));
  const activeLabel = activeItem ? activeItem.label : "Admin Panel";

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!accountRef.current) return;
      if (accountRef.current.contains(e.target as Node)) return;
      setAccountOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  if (isAuth) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#F7F8FA]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[220px] flex-col bg-white border-r border-slate-100 fixed h-full z-30 py-6">
        <div className="px-5 mb-6 pb-6 border-b border-slate-100">
          <Link href="/">
           <Image
                         src="/toWEBP/snappeditt.png"
                         alt="Snapp Ed'tt"
                         width={160}
                         height={160}
                         priority
                         className="h-15 w-full object-contain"
                       />
          </Link>   
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "?");
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-[#FFF1F0] text-[#E53E3E] border-l-4 border-[#E53E3E]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}>
                <Icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-[#E53E3E]" : "text-slate-400"}`} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 mt-4 space-y-3">
          {/* <div className="rounded-2xl bg-[#FFF8E1] p-4 text-center">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-400 mx-auto mb-1.5" />
            <p className="text-xs font-bold text-slate-800">Premium Plan</p>
            <p className="text-[10px] text-slate-500 mt-0.5">You are on Premium plan.</p>
            <button className="mt-2.5 w-full rounded-xl bg-[#E53E3E] py-1.5 text-xs font-semibold text-white hover:bg-[#C53030] transition">View Plan</button>
          </div> */}
          <button onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl bg-[#F44336] px-4 py-2.5 text-sm font-medium text-white hover:bg-red-500 transition">
            <LogOut className="h-4 w-4" /> Logout
          </button>
          <p className="text-[10px] text-center text-slate-400">© 2026 Snapp Ed't. All rights reserved.</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col py-6 px-4">
            <div className="flex justify-between items-center mb-6">
              <Image src="/toWEBP/snappeditt.webp" alt="logo" width={110} height={38} className="h-9 w-auto object-contain" />
              <button onClick={() => setOpen(false)}><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition">
                  <Icon className="h-4 w-4 text-slate-400" />{label}
                </Link>
              ))}
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 mt-4">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-[220px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-5 py-3 flex items-center gap-3">
          <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
          <span className="text-sm font-semibold text-slate-900 ml-1">Admin Panel</span>
          <span className="text-sm text-slate-400">&rsaquo;</span>
          <span className="text-sm font-semibold text-slate-900">{activeLabel}</span>

          <div className="ml-auto flex items-center gap-2" ref={accountRef}>
            <div className="relative">
              <button onClick={() => setAccountOpen(!accountOpen)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E53E3E] text-sm font-bold text-white">
                A
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">Admin</p>
                    <p className="text-xs text-slate-500">Super Administrator</p>
                  </div>
                  <Link href="/admin/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 leading-none">Admin</p>
              <p className="text-[10px] text-slate-500">Super Administrator</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
