"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ShoppingBag,
  Users,
  DollarSign,
  Wrench,
  CreditCard,
  TrendingUp,
  Eye,
} from "lucide-react";

type RevenuePoint = { date: string; total: number };

type AdminDashboardData = {
  stats?: {
    totalOrders?: number;
    totalCustomers?: number;
    totalRevenue?: number;
    growth?: number;
    averageOrderValue?: number;
    unpaidRevenue?: number;
    paidRevenue?: number;
  };
  salesData?: Array<{ date?: string; total?: number }>;
  orderStatus?: Array<{ status?: string; count?: number }>;
  topServices?: Array<{ service_name?: string; orders?: number; revenue?: number }>;
  recentOrders?: Array<any>;
  paymentMethods?: Array<{ payment_type?: string; revenue?: number }>;
  topCustomers?: Array<{ user_name?: string; user_email?: string; order_count?: number }>;
};

function statusColor(status?: string) {
  if (!status) return "bg-yellow-100 text-yellow-700";
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "processing":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState('Month');
  const [rangeOpen, setRangeOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((payload) => {
        if (!payload.success) {
          router.push("/admin");
          return;
        }
        setData(payload);
      })
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const revenueData: RevenuePoint[] = (data?.salesData || []).slice(-7).map((item) => ({
    date: item?.date || "",
    total: Number(item?.total) || 0,
  }));
  const maxRevenue = Math.max(...revenueData.map((item) => item.total), 1);

  const statusCounts: Record<string, number> = {};
  (data?.orderStatus || []).forEach((item) => {
    if (item?.status) statusCounts[item.status] = Number(item.count) || 0;
  });
  const completed = statusCounts["Completed"] || statusCounts["completed"] || 0;
  const processing = statusCounts["Processing"] || statusCounts["processing"] || 0;
  const pending = statusCounts["Pending"] || statusCounts["pending"] || 0;
  const cancelled = statusCounts["Cancelled"] || statusCounts["cancelled"] || 0;
  const totalStatus = completed + processing + pending + cancelled || 1;
  const totalRevenue = Number(stats.totalRevenue || 0);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">Welcome back! Here is a quick summary of your business performance.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search services, orders, customers..."
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 shadow-sm outline-none focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]"
            />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setRangeOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm hover:bg-slate-50 transition"
            >
              <span>{range}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {rangeOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                {['Month', '6 Months', 'Year'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setRange(option);
                      setRangeOpen(false);
                    }}
                    className={`block w-full rounded-xl px-3 py-2 text-left text-sm ${range === option ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 xl:grid-cols-6 gap-4">
        <StatCard icon={<ShoppingBag className="h-5 w-5 text-[#E53E3E]" />} iconBg="bg-[#FFF1F0]" label="Total Orders" value={stats.totalOrders ?? 0} sub="All orders" />
        <StatCard icon={<Users className="h-5 w-5 text-teal-500" />} iconBg="bg-teal-50" label="Total Customers" value={stats.totalCustomers ?? 0} sub="Active customers" />
        <StatCard icon={<DollarSign className="h-5 w-5 text-yellow-500" />} iconBg="bg-yellow-50" label="Total Revenue" value={`$${(stats.totalRevenue || 0).toFixed(2)}`} sub="Revenue collected" />
        <StatCard icon={<Wrench className="h-5 w-5 text-blue-500" />} iconBg="bg-blue-50" label="Total Services" value={data?.topServices?.length ?? 0} sub="Service offerings" />
        <StatCard icon={<CreditCard className="h-5 w-5 text-violet-500" />} iconBg="bg-violet-50" label="Paid Revenue" value={`$${(stats.paidRevenue || 0).toFixed(2)}`} sub="Paid orders" />
        <StatCard icon={<TrendingUp className="h-5 w-5 text-slate-700" />} iconBg="bg-slate-100" label="Growth" value={`${stats.growth ?? 0}%`} sub="Weekly change" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Revenue Chart</h2>
              <p className="text-xs text-slate-500">Last 7 days</p>
            </div>
            <button className="rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-50 transition">Last 7 Days</button>
          </div>
          <div className="h-44 rounded-3xl bg-slate-50 p-4">
            {revenueData.length > 0 ? (
              <div className="flex h-full items-end gap-2">
                {revenueData.map((item, index) => {
                  const height = Math.max(12, Math.round((item.total / maxRevenue) * 100));
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full overflow-hidden rounded-xl bg-slate-100">
                        <div className="absolute inset-x-0 bottom-0 bg-[#E53E3E]" style={{ height: `${height}%` }} />
                        <div className="h-2 w-full opacity-0" />
                      </div>
                      <span className="text-[9px] text-slate-400">{item.date.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-500">No revenue data available</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Orders by Status</h2>
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg viewBox="0 0 80 80" className="h-28 w-28 -rotate-90">
                <DonutSegment total={totalStatus} value={completed} offset={0} color="#22C55E" />
                <DonutSegment total={totalStatus} value={processing} offset={completed} color="#3B82F6" />
                <DonutSegment total={totalStatus} value={pending} offset={completed + processing} color="#F59E0B" />
                <DonutSegment total={totalStatus} value={cancelled} offset={completed + processing + pending} color="#EF4444" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold text-slate-900">{stats.totalOrders ?? 0}</p>
                <p className="text-[9px] text-slate-500">Total</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <StatusLegend color="bg-green-500" label="Completed" count={completed} pct={totalStatus} />
              <StatusLegend color="bg-blue-500" label="Processing" count={processing} pct={totalStatus} />
              <StatusLegend color="bg-yellow-400" label="Pending" count={pending} pct={totalStatus} />
              <StatusLegend color="bg-red-500" label="Cancelled" count={cancelled} pct={totalStatus} />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Sales Summary</h2>
          <div className="space-y-3 text-sm">
            <SummaryRow label="Total Sales" value={`$${(stats.totalRevenue || 0).toFixed(2)}`} />
            <SummaryRow label="Total Orders" value={stats.totalOrders ?? 0} />
            <SummaryRow label="Average Order" value={`$${(stats.averageOrderValue || 0).toFixed(2)}`} />
            <SummaryRow label="Refunds" value={`-$${(stats.unpaidRevenue || 0).toFixed(2)}`} />
            <SummaryRow label="Conversion Rate" value="3.42%" />
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-xs font-bold text-slate-700 mb-3">Payment Overview</h3>
            <div className="space-y-2 text-xs">
              {(data?.paymentMethods || []).map((method, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-slate-600">{method.payment_type}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">${Number(method.revenue || 0).toFixed(2)}</span>
                    <span className="text-slate-400">{totalRevenue ? ((Number(method.revenue || 0) / totalRevenue) * 100).toFixed(1) : 0}%</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between border-t border-slate-100 pt-2 mt-1 font-semibold">
                <span className="text-slate-700">Total</span>
                <span className="text-slate-900">${(stats.totalRevenue || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Latest Orders</h2>
            <Link href="/admin/order-details" className="text-xs font-semibold text-[#E53E3E] hover:underline flex items-center gap-1">
              View All <Eye className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Order ID</th>
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Customer</th>
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Service</th>
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Amount</th>
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Status</th>
                  <th className="py-2 px-2 text-left text-slate-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(data?.recentOrders || []).slice(0, 6).map((order, index) => (
                  <tr key={order?.id ?? index} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-2 font-mono font-semibold text-slate-800">#{order?.id ?? "--"}</td>
                    <td className="py-2.5 px-2 font-medium text-slate-700">{order?.user_name ?? "Unknown"}</td>
                    <td className="py-2.5 px-2 text-slate-500 max-w-[120px] truncate">{order?.service_name ?? "-"}</td>
                    <td className="py-2.5 px-2 font-semibold text-slate-800">${order?.total ?? 0}</td>
                    <td className="py-2.5 px-2">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColor(order?.status)}`}>
                        {order?.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-400">{order?.created_at ? new Date(order.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Top Services</h2>
              <Link href="/admin/sales" className="text-xs font-semibold text-[#E53E3E] hover:underline">View All</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[10px] text-slate-400 font-medium pb-2 border-b border-slate-100">
              <span>Service</span>
              <span className="text-center">Orders</span>
              <span className="text-right">Revenue</span>
            </div>
            <div className="space-y-2 mt-2">
              {(data?.topServices || []).slice(0, 4).map((service, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 text-xs border-b border-slate-100 py-2">
                  <span className="truncate text-slate-700">{service?.service_name ?? "-"}</span>
                  <span className="text-center text-slate-500">{service?.orders ?? 0}</span>
                  <span className="text-right font-semibold text-slate-900">${service?.revenue ?? 0}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">Recent Customers</h2>
              <Link href="/admin/users" className="text-xs font-semibold text-[#E53E3E] hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {(data?.topCustomers || []).slice(0, 4).map((customer, index) => {
                const initials = (customer?.user_name || customer?.user_email || "U")[0].toUpperCase();
                const colors = ["bg-blue-500", "bg-teal-500", "bg-red-500", "bg-violet-500"];
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-9 w-9 flex-shrink-0 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-xs font-bold text-white`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-900">{customer?.user_name ?? "Unknown"}</p>
                      <p className="truncate text-[10px] text-slate-500">{customer?.user_email ?? ""}</p>
                    </div>
                    <p className="text-[10px] text-slate-400">{customer?.order_count ?? 0} orders</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, iconBg, label, value, sub }: { icon: ReactNode; iconBg: string; label: string; value: string | number; sub: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${iconBg} mb-4`}>
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-[11px] text-slate-500">{sub}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function StatusLegend({ color, label, count, pct }: { color: string; label: string; count: number; pct: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="w-20 truncate">{label}</span>
      <span className="font-semibold text-slate-900">{count}</span>
      <span>({pct > 0 ? ((count / pct) * 100).toFixed(0) : 0}%)</span>
    </div>
  );
}

function DonutSegment({ total, value, offset, color }: { total: number; value: number; offset: number; color: string }) {
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const dash = (value / total) * circumference;
  const dashOffset = (offset / total) * circumference;
  return (
    <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-dashOffset} strokeLinecap="butt" />
  );
}
