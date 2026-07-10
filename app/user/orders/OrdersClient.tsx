"use client";

import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  Wallet,
  ChevronRight,
  PlusCircle,
  History,
  CreditCard,
  Download,
} from "lucide-react";
import TabNav from "./TabNav";

type Order = {
  id: number;
  status: string;
  total: number;
  paypal_order_id: string | null;
  created_at: string;
  service_name: string;
  quantity: number;
};

type Props = {
  orders: Order[];
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalSpent: number;
};

type Tab = { label: string; href: string }; // eslint-disable-line @typescript-eslint/no-unused-vars

export default function OrdersClient({
  orders,
  totalOrders,
  completedOrders,
  pendingOrders,
  cancelledOrders,
  totalSpent,
}: Props) {
  const completionRate =
    totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
  const pendingRate =
    totalOrders > 0 ? Math.round((pendingOrders / totalOrders) * 100) : 0;
  const cancelledRate =
    totalOrders > 0 ? Math.round((cancelledOrders / totalOrders) * 100) : 0;

  // Donut chart values
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const completedDash = (completedOrders / Math.max(totalOrders, 1)) * circumference;
  const pendingDash = (pendingOrders / Math.max(totalOrders, 1)) * circumference;

  const getOrderStatus = (order: Order): { label: string; cls: string } => {
    if (order.status === "Cancelled") return { label: "Cancelled", cls: "bg-red-100 text-red-600" };
    if (order.paypal_order_id?.startsWith("PAYLATER-"))
      return { label: "Pending", cls: "bg-amber-100 text-amber-600" };
    if (order.status === "Completed")
      return { label: "Completed", cls: "bg-emerald-100 text-emerald-700" };
    return { label: "Processing", cls: "bg-blue-100 text-blue-600" };
  };

  return (
    <div className="space-y-6">
      {/* ── Header + Tabs ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your latest orders, payments, and activity in one place.
          </p>
        </div>
        <TabNav />
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          icon={<ShoppingBag className="h-5 w-5 text-[#E53E3E]" />}
          iconBg="bg-[#FFF1F0]"
          label="Total Orders"
          value={totalOrders}
          sub="All time orders"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
          iconBg="bg-emerald-50"
          label="Completed Orders"
          value={completedOrders}
          sub={`${completionRate}% completion rate`}
          subColor="text-emerald-600"
        />
        <StatCard
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          iconBg="bg-amber-50"
          label="Pending Orders"
          value={pendingOrders}
          sub="Currently in progress"
          subColor="text-amber-500"
        />
        <StatCard
          icon={<Wallet className="h-5 w-5 text-blue-500" />}
          iconBg="bg-blue-50"
          label="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          sub="All time spending"
        />
      </div>

      {/* ── Orders list + Sidebar ── */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Orders list */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Current Orders</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Track your recent and ongoing orders.
              </p>
            </div>
            <button className="rounded-full bg-[#E53E3E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#C53030]">
              View all orders
            </button>
          </div>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-8 text-center text-sm text-slate-500">
                No orders yet.
              </div>
            ) : (
              orders.map((order) => {
                const { label, cls } = getOrderStatus(order);
                return (
                  <Link
                    key={order.id}
                    href={`/user/orders/${order.id}`}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 transition hover:border-[#E53E3E]/30 hover:bg-white hover:shadow-sm"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#FFF1F0]">
                      <ShoppingBag className="h-5 w-5 text-[#E53E3E]" />
                    </div>

                    {/* Order info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          Order #{order.id}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Date: {order.created_at}
                      </p>
                    </div>

                    {/* Service + qty */}
                    <div className="hidden sm:block text-right min-w-[120px]">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {order.service_name}
                      </p>
                      {order.quantity > 0 && (
                        <p className="text-xs text-slate-500">Qty: {order.quantity}</p>
                      )}
                    </div>

                    {/* Price + status */}
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-sm font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}
                      >
                        {label}
                      </span>
                    </div>

                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-slate-300" />
                  </Link>
                );
              })
            )}
          </div>

          {orders.length > 0 && (
            <div className="mt-5 text-center">
              <button className="text-sm font-semibold text-[#E53E3E] hover:underline">
                View all orders
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Order Summary donut */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
            <p className="mt-0.5 text-xs text-slate-500">Overview of your order activity.</p>

            {/* Donut chart */}
            <div className="my-5 flex justify-center">
              <div className="relative">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  {/* Background track */}
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="16"
                  />
                  {/* Pending (amber) */}
                  {pendingOrders > 0 && (
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="16"
                      strokeDasharray={`${pendingDash} ${circumference - pendingDash}`}
                      strokeDashoffset={-completedDash}
                      strokeLinecap="round"
                      transform="rotate(-90 70 70)"
                    />
                  )}
                  {/* Completed (green) */}
                  {completedOrders > 0 && (
                    <circle
                      cx="70"
                      cy="70"
                      r={radius}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="16"
                      strokeDasharray={`${completedDash} ${circumference - completedDash}`}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                      transform="rotate(-90 70 70)"
                    />
                  )}
                </svg>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900">{totalOrders}</span>
                  <span className="text-[11px] text-slate-500">Total</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <LegendRow dot="bg-emerald-500" label="Completed" value={`${completedOrders} (${completionRate}%)`} />
              <LegendRow dot="bg-amber-400" label="Pending" value={`${pendingOrders} (${pendingRate}%)`} />
              <LegendRow dot="bg-red-400" label="Cancelled" value={`${cancelledOrders} (${cancelledRate}%)`} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <QuickAction
                icon={<PlusCircle className="h-4 w-4 text-[#E53E3E]" />}
                iconBg="bg-[#FFF1F0]"
                label="Place New Order"
                href="/cart"
              />
              <QuickAction
                icon={<History className="h-4 w-4 text-blue-500" />}
                iconBg="bg-blue-50"
                label="Order History"
                href="/user/order-history"
              />
              <QuickAction
                icon={<CreditCard className="h-4 w-4 text-purple-500" />}
                iconBg="bg-purple-50"
                label="Payment Methods"
                href="/user/payments"
              />
              <QuickAction
                icon={<Download className="h-4 w-4 text-emerald-500" />}
                iconBg="bg-emerald-50"
                label="Download Invoices"
                href="/user/orders"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function StatCard({
  icon,
  iconBg,
  label,
  value,
  sub,
  subColor = "text-slate-500",
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string | number;
  sub: string;
  subColor?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      <p className={`mt-1 text-xs font-medium ${subColor}`}>{sub}</p>
    </div>
  );
}

function LegendRow({
  dot,
  label,
  value,
}: {
  dot: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
        <span className="text-slate-600">{label}</span>
      </div>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function QuickAction({
  icon,
  iconBg,
  label,
  href,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
    >
      <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <ChevronRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}
