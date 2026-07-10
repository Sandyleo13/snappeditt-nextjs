"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  ShoppingCart,
  Home,
  Package,
  User,
  CreditCard,
  Clock,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { href: "/user", label: "Dashboard", icon: Home },
  { href: "/user/orders", label: "Orders", icon: Package },
  { href: "/user/order-history", label: "Order History", icon: Clock },
  { href: "/user/payments", label: "Payments", icon: CreditCard },
  { href: "/user/profile", label: "Profile", icon: User },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("User");
  const [userInitial, setUserInitial] = useState("U");
  const [cartCount, setCartCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((d) => {
        if (d?.loggedIn && d.first_name) {
          setUserName(d.first_name);
          setUserInitial(d.first_name[0].toUpperCase());
        }
      })
      .catch(() => {});

    fetch("/api/cart")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.items)) setCartCount(d.items.length);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-900 flex">
      {/* ── Sidebar ── */}
      <aside className="hidden xl:flex w-[240px] flex-col bg-white border-r border-slate-100 py-6 px-4 fixed h-full z-30">
        {/* Logo */}
        <div className="mb-8 px-2 pb-8 border-b border-slate-100">
          <Link href="/" className="flex items-center">
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

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active =
              item.href === "/user"
                ? pathname === "/user"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#FFF1F0] text-[#E53E3E]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    active ? "text-[#E53E3E]" : "text-slate-400"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-6">
          <a
            href="/api/logout"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 bg-[#F44336] text-sm font-medium text-white transition-all duration-200 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="h-5 w-5  flex-shrink-0" />
            Logout
          </a>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 xl:ml-[240px] flex flex-col min-h-screen">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            {/* <div className="relative flex-1 max-w-md">
              <input
                type="search"
                placeholder="Search for orders, services..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 pl-4 pr-10 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#F44336] focus:ring-2 focus:ring-[#FEEAEA]"
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div> */}

            <div className="ml-auto flex items-center gap-3">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F44336] text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Bell */}
              {/* <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F44336] text-[10px] font-bold text-white">
                  2
                </span>
              </button> */}

              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 pl-1 pr-3 py-1 hover:bg-slate-100 transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F44336] text-sm font-bold text-white">
                    {userInitial}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900 leading-none">{userName}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Premium Member</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F44336] text-sm font-bold text-white">
                          {userInitial}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
                          <p className="text-[11px] text-slate-500">Premium Member</p>
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <Link
                        href="/user"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Home className="h-4 w-4 text-slate-400" />
                        Dashboard
                      </Link>
                      <Link
                        href="/user/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <User className="h-4 w-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/user/orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Package className="h-4 w-4 text-slate-400" />
                        My Orders
                      </Link>
                      <Link
                        href="/user/payments"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <CreditCard className="h-4 w-4 text-slate-400" />
                        Payments
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 pt-1">
                      <a
                        href="/api/logout"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
