"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Orders",        href: "/user/orders" },
  { label: "Order History", href: "/user/order-history" },
  { label: "Payments",      href: "/user/payments" },
];

export default function TabNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              active
                ? "bg-[#E53E3E] text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
