"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  CreditCard,
  DollarSign,
  Calendar,
  Mail,
  User,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Hash,
  Package,
  Receipt,
  Plus,
  Tag,
} from "lucide-react";

// Extended order type with all fields from your table
type OrderDetail = {
  id: number;
  order_id: number;
  service_name: string;
  qty: number;
  price: number;
  retouching: string | null;
  order_name: string;
  order_images: string | null;
  order_details: string | null;
  addons: string | null; // This contains the add-ons (likely JSON string or comma-separated)
  status: string;
  comment: string | null;
  extra_options: string | null;
  declutterType: string | null;
  color: string | null;
  detailing: string | null;
  status_comment: string | null;
};
type AddonItem = {
  name: string;
  price?: number;
  qty?: number;
};

type Payment = {
  id: number;
  order_id: number;
  user_name: string;
  user_email: string;
  service_name: string;
  qty: number;
  total: number;
  paypal_order_id: string | null;
  created_at: string;
};

const calculateAddonsTotal = (addons: (AddonItem | string)[]): number => {
  return addons.reduce((total, addon) => {
    if (typeof addon === "string") return total;
    return total + (addon.price || 0) * (addon.qty || 1);
  }, 0);
};
/* ── Order Detail Modal ─────────────────────────────── */
/* ── Order Detail Modal ─────────────────────────────── */
function OrderDetailModal({
  order,
  allRows,
  onClose,
}: {
  order: Payment;
  allRows: Payment[];
  onClose: () => void;
}) {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const isPaid = !isPayLater(order.paypal_order_id);

  const overallStatus = orderDetails.find((d) => d.status && d.status.trim().length > 0)?.status || null;

  // Prevent background/body scrolling while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // All line-items belonging to this order
  const items = allRows.filter((p) => p.order_id === order.order_id);

  // Fetch full order details including add-ons
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoadingDetails(true);
      try {
        const response = await fetch(`/api/admin/order-details?order_id=${order.order_id}`);
        const data = await response.json();
        if (data.success) {
          setOrderDetails(data.orderDetails);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };
    
    fetchOrderDetails();
  }, [order.order_id]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  const parseAddons = (addons: string | null): AddonItem[] => {
    if (!addons) return [];

    try {
      const parsed = JSON.parse(addons);

      if (Array.isArray(parsed)) {
        return parsed.map((item) => {
          if (typeof item === "string") {
            return { name: item };
          }
          return {
            name: item.name || "Addon",
            price: item.price || 0,
            qty: item.qty || 1,
          };
        });
      }

      if (typeof parsed === "string") {
        return [{ name: parsed }];
      }

      return [];
    } catch {
      return addons.split(",").map((a) => ({
        name: a.trim(),
      }));
    }
  };

  return (
    <>
          {/* Backdrop */}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden relative">

          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl" style={{ backgroundColor: '#FFF5F6' }}>
                <div className="h-8 w-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#FEEAEA' }}>
                  <DollarSign className="w-4 h-4 text-[#E53E3E]" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Order #{order.order_id}</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                {!isPaid && (
                  <div className="px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-medium">
                    <Clock className="w-3 h-3 inline mr-1" /> Pay Later
                  </div>
                )}
                <button onClick={onClose} className="p-2 rounded-full bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto no-scrollbar">

            {/* Customer info */}
            <div className="rounded-xl bg-white p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Customer</p>
                {/* small placeholder for potential actions */}
                <div />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm flex-shrink-0">
                  {order.user_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.user_name}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Mail className="w-3 h-3" />
                    {order.user_email}
                  </p>
                </div>
              </div>
            </div>

            {/* Order items with add-ons */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Order Items & Add-ons
              </p>
              
              {loadingDetails ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 text-indigo-600 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Main items table */}
                  <div className="rounded-xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                            Service
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                            Qty
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                            Price
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {items.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-gray-900">{item.service_name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center text-gray-600">
                              {item.qty}
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600">
                              {formatCurrency(item.total / item.qty)}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-gray-900">
                              {formatCurrency(item.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add More services / add-ons CTA */}
                  <div className="mt-3">
                    <button className="w-full text-center border-2 border-dashed border-red-200 text-red-500 rounded-xl py-3 hover:bg-red-50 transition">
                      + Add More Services / Add-ons
                    </button>
                  </div>

                  {/* Add-ons section */}
                  {orderDetails.length > 0 && orderDetails.some(detail => detail.addons) && (
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      <div className="bg-purple-50 px-4 py-2 border-b border-purple-100">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-purple-600" />
                          <p className="text-xs font-semibold uppercase tracking-widest text-purple-700">
                            Selected Add-ons
                          </p>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {orderDetails.map((detail, idx) => {
                          const addonsList = parseAddons(detail.addons);
                          if (addonsList.length === 0) return null;
                          
                          return (
                            <div key={idx} className="p-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                For: <span className="text-indigo-600">{detail.service_name}</span>
                              </p>
                              <div className="space-y-2">
                                {addonsList.map((addon, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>{addon.name}</span>
                                  <span>
                                    {formatCurrency((addon.price || 0) * (addon.qty || 1))}
                                  </span>
                                </div>
                              ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Extra Options / Customizations */}
                  {orderDetails.some(detail => detail.extra_options || detail.declutterType || detail.color || detail.detailing) && (
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                          Customizations
                        </p>
                      </div>
                      <div className="p-4 space-y-3">
                        {orderDetails.map((detail, idx) => (
                          <div key={idx} className="space-y-2">
                            {detail.extra_options && (
                              <div className="flex gap-2 text-sm">
                                <span className="font-medium text-gray-600 min-w-[100px]">Extra Options:</span>
                                <span className="text-gray-700">{detail.extra_options}</span>
                              </div>
                            )}
                            {detail.declutterType && (
                              <div className="flex gap-2 text-sm">
                                <span className="font-medium text-gray-600 min-w-[100px]">Declutter Type:</span>
                                <span className="text-gray-700">{detail.declutterType}</span>
                              </div>
                            )}
                            {detail.color && (
                              <div className="flex gap-2 text-sm">
                                <span className="font-medium text-gray-600 min-w-[100px]">Color:</span>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: detail.color }}
                                  />
                                  <span className="text-gray-700">{detail.color}</span>
                                </div>
                              </div>
                            )}
                            {detail.detailing && (
                              <div className="flex gap-2 text-sm">
                                <span className="font-medium text-gray-600 min-w-[100px]">Detailing:</span>
                                <span className="text-gray-700">{detail.detailing}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Status summary (condensed) */}
                  {overallStatus && (
                    <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Status:</p>
                          <div className="mt-1">
                            <span className="inline-block bg-white px-3 py-1 rounded-full text-xs text-green-700 border border-green-100 font-medium">{overallStatus}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment info */}
            <div className="rounded-xl bg-white p-4 border border-gray-100 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                Payment Details
              </p>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5" /> Transaction ID
                </span>
                <span className="font-mono text-xs text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-1 max-w-[200px] truncate">
                  {order.paypal_order_id || "—"}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Date
                </span>
                <span className="text-gray-700">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-700">
                  {formatCurrency(
                    items.reduce((sum, i) => sum + Number(i.total), 0)
                  )}
                </span>
              </div>

              {/* Add-ons total if any */}
              {orderDetails.length > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Add-ons
                </span>
                <span className="text-gray-700">
                  {formatCurrency(
                    orderDetails.reduce((sum, detail) => {
                      const addons = parseAddons(detail.addons);
                      return sum + calculateAddonsTotal(addons);
                    }, 0)
                  )}
                </span>
              </div>
            )}

              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-semibold text-gray-700">Order Total</span>
                <span className="text-xl font-bold text-red-600">
                  {formatCurrency(
                    items.reduce((sum, i) => sum + (Number(i.total) || 0), 0) +
                    orderDetails.reduce((sum, detail) => {
                      const addonsList = parseAddons(detail.addons);
                      const addonsTotal = calculateAddonsTotal(addonsList);
                      return sum + addonsTotal;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Helpers ────────────────────────────────────────── */
function isPayLater(id: string | undefined | null) {
  return (id || "").trim().toLowerCase().startsWith("paylater");
}

/* ── Main Page ──────────────────────────────────────── */
export default function AdminPayments() {
  const router = useRouter();

  const [payments, setPayments]       = useState<Payment[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState<"all" | "paid" | "unpaid">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Payment | null>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    paidOrders: 0,
    payLaterOrders: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const res  = await fetch("/api/admin/check");
      const data = await res.json();
      if (!data.loggedIn) router.push("/admin");
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/payments");
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
        calculateStats(data.payments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (paymentsData: Payment[]) => {
    const uniqueOrders = new Map<number, Payment>();
    paymentsData.forEach((p) => {
      if (!uniqueOrders.has(p.order_id))
        uniqueOrders.set(p.order_id, { ...p, total: Number(p.total) || 0 });
    });
    const ordersArray     = Array.from(uniqueOrders.values());
    const paidOrders      = ordersArray.filter((p) => !isPayLater(p.paypal_order_id));
    const payLaterOrders  = ordersArray.filter((p) =>  isPayLater(p.paypal_order_id));
    const paidRevenue     = paidOrders.reduce((sum, p) => sum + (Number(p.total) || 0), 0);
    setStats({
      totalRevenue:   paidRevenue,
      totalOrders:    ordersArray.length,
      paidOrders:     paidOrders.length,
      payLaterOrders: payLaterOrders.length,
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout");
      router.push("/admin");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed. Try again.");
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  const filteredPayments = payments.filter((p) => {
    const searchMatch =
      p.user_name.toLowerCase().includes(search.toLowerCase()) ||
      p.user_email.toLowerCase().includes(search.toLowerCase()) ||
      p.order_id.toString().includes(search) ||
      p.service_name.toLowerCase().includes(search.toLowerCase());

    const orderId = (p.paypal_order_id || "").trim().toLowerCase();
    const filterMatch =
      filter === "all"   ? true
      : filter === "paid"  ? !orderId.startsWith("paylater")
      : orderId.startsWith("paylater");

    return searchMatch && filterMatch;
  });

  // Deduplicate for table rows — one row per order_id
  const uniqueFilteredOrders = Array.from(
    new Map(filteredPayments.map((p) => [p.order_id, p])).values()
  );

  return (
    <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage and track all payment transactions</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchPayments} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: formatCurrency(stats.totalRevenue), iconBg: "bg-[#FFF1F0]", iconColor: "text-[#E53E3E]", icon: DollarSign },
            { label: "Total Orders",  value: stats.totalOrders,                  iconBg: "bg-blue-50",    iconColor: "text-blue-500",    icon: ShoppingBag },
            { label: "Paid Orders",   value: stats.paidOrders,                   iconBg: "bg-green-50",   iconColor: "text-green-500",   icon: CheckCircle },
            { label: "Pay Later",     value: stats.payLaterOrders,               iconBg: "bg-yellow-50",  iconColor: "text-yellow-500",  icon: Clock },
          ].map(({ label, value, iconBg, iconColor, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} mb-3`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search by name, email, order ID, or service…"
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]" />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select value={filter} onChange={(e) => setFilter(e.target.value as "all"|"paid"|"unpaid")}
                className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 appearance-none outline-none focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]">
                <option value="all">All Payments</option>
                <option value="paid">Paid Only</option>
                <option value="unpaid">Pay Later Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
          </div>
        ) : uniqueFilteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
            <AlertCircle className="w-10 w-10 text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-600">No payments found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Qty</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {uniqueFilteredOrders.map((p) => {
                    const isPaid = !isPayLater(p.paypal_order_id);
                    // Count items in this order
                    const itemCount = payments.filter(x => x.order_id === p.order_id).length;

                    return (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-medium text-gray-900">#{p.order_id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-xs flex-shrink-0">
                                {p.user_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm">{p.user_name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Mail className="w-3 h-3" />{p.user_email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-900">{p.service_name}</span>
                          {itemCount > 1 && (
                            <span className="ml-1.5 text-xs text-indigo-500 font-medium">+{itemCount - 1} more</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-medium">{p.qty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{formatCurrency(p.total)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            isPaid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {isPaid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {isPaid ? "Paid" : "Pay Later"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(p.created_at).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedOrder(p)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 border-t border-slate-100 px-4 py-3">
              <p className="text-xs text-slate-500">
                Showing <span className="font-medium text-slate-700">{uniqueFilteredOrders.length}</span> of{" "}
                <span className="font-medium text-slate-700">{Array.from(new Map(payments.map(p => [p.order_id, p])).values()).length}</span> orders
              </p>
            </div>
          </div>
        )}

        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            allRows={payments}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
  );
}