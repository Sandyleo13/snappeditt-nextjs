"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Package, Hash, DollarSign, Layers,
  Tag, FileText, CheckCircle2, AlertCircle, Clock, XCircle,
} from "lucide-react";

const STATUS_OPTIONS = ["In Process", "Hold", "Cancel", "Completed"];

function formatMoney(value: number | string | null | undefined) {
  const amount = typeof value === "number" ? value : Number(value || 0);
  return amount.toFixed(2);
}

type OrderListRow = {
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

function statusStyle(s: string) {
  const m: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    "in process": "bg-blue-100 text-blue-700",
    hold: "bg-yellow-100 text-yellow-700",
    cancel: "bg-red-100 text-red-700",
    pending: "bg-slate-100 text-slate-600",
  };
  return m[s?.toLowerCase()] ?? "bg-slate-100 text-slate-600";
}

function StatusIcon({ s }: { s: string }) {
  const l = s?.toLowerCase();
  if (l === "completed")  return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (l === "in process") return <Clock className="h-4 w-4 text-blue-500" />;
  if (l === "hold")       return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  if (l === "cancel")     return <XCircle className="h-4 w-4 text-red-500" />;
  return <Clock className="h-4 w-4 text-slate-400" />;
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const sp = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const id = sp ? (sp.get('order_id') || sp.get('id')) : null;
      setOrderId(id);
    } catch (e) {
      setOrderId(null);
    }
  }, []);

  const [order, setOrder] = useState<any>(null);
  const [ordersList, setOrdersList] = useState<OrderListRow[]>([]);
  const [loadingOrdersList, setLoadingOrdersList] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setLoadingOrdersList(true);
      fetch('/api/admin/payments')
        .then((r) => r.json())
        .then((d) => {
          if (d.success && Array.isArray(d.payments)) {
            setOrdersList(d.payments);
          }
        })
        .catch((error) => {
          console.error('Failed to load orders list:', error);
        })
        .finally(() => setLoadingOrdersList(false));
      return;
    }

    let cancelled = false;
    setLoadingOrder(true);
    setOrder(null);

    fetch(`/api/admin/order-details?order_id=${orderId}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.success && d.orderDetails?.[0]) {
          setOrder(d.orderDetails[0]);
          setStatus(d.orderDetails[0].status || "");
        } else {
          setOrder(null);
          setStatus("");
        }
      })
      .catch((error) => {
        console.error('Failed to load order details:', error);
        if (!cancelled) {
          setOrder(null);
          setStatus("");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingOrder(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const updateStatus = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/orders/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status, comment }),
    });
    setSaving(false);
    if ((await res.json()).success) {
      setSaved(true);
      setTimeout(() => { setSaved(false); router.push("/admin/payments"); }, 1200);
    }
  };

  const parseAddons = (raw: string | null) => {
    if (!raw) return [];
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p)) return p.map((x: any) => typeof x === "string" ? x : x.name || "Addon");
      return [];
    } catch { return raw.split(",").map((s) => s.trim()); }
  };

  if (!orderId) return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-sm text-slate-500">Select an order to view full detail.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {loadingOrdersList ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
          </div>
        ) : ordersList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
            No orders available yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-slate-500">Order</th>
                  <th className="px-4 py-3 text-slate-500">Customer</th>
                  <th className="px-4 py-3 text-slate-500">Service</th>
                  <th className="px-4 py-3 text-slate-500">Amount</th>
                  <th className="px-4 py-3 text-slate-500">Date</th>
                  <th className="px-4 py-3 text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ordersList.map((order) => (
                  <tr key={order.order_id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">#{order.order_id}</td>
                    <td className="px-4 py-3 text-slate-600">{order.user_name}</td>
                    <td className="px-4 py-3 text-slate-600">{order.service_name}</td>
                    <td className="px-4 py-3 text-slate-600">${formatMoney(order.total)}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/order-details?order_id=${order.order_id}`} className="text-sm font-semibold text-[#E53E3E] hover:text-[#C53030]">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  if (loadingOrder) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
    </div>
  );

  if (!order) return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/payments"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition">
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Order #{orderId}</h1>
          <p className="text-sm text-slate-500 mt-0.5">No detail record was found for this order.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        The order exists, but there is no matching detail row in the database yet.
      </div>
    </div>
  );

  const addons = parseAddons(order.addons);
  const images = order.order_images ? (() => { try { return JSON.parse(order.order_images); } catch { return []; } })() : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/payments"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition">
          <ArrowLeft className="h-4 w-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Order #{orderId}</h1>
          <p className="text-sm text-slate-500 mt-0.5">View and update order details</p>
        </div>
        <div className="ml-auto">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(order.status)}`}>
            <StatusIcon s={order.status} />{order.status || "Pending"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left: Order info */}
        <div className="xl:col-span-2 space-y-5">

          {/* Info grid */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Order Information</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Hash,       label: "Order ID",   value: `#${order.order_id}` },
                { icon: Package,    label: "Service",    value: order.service_name },
                { icon: Layers,     label: "Quantity",   value: order.qty },
                { icon: DollarSign, label: "Price",      value: `$${order.price}` },
                { icon: Tag,        label: "Retouching", value: order.retouching || "—" },
                { icon: Tag,        label: "Order Name", value: order.order_name  || "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <Icon className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customisations */}
          {(order.declutterType || order.color || order.detailing || order.extra_options) && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-sm font-bold text-slate-800 mb-4">Customisations</h2>
              <div className="space-y-2 text-sm">
                {order.declutterType  && <Row label="Declutter Type"  value={order.declutterType} />}
                {order.color          && <Row label="Color"           value={order.color} />}
                {order.detailing      && <Row label="Detailing"       value={order.detailing} />}
                {order.extra_options  && <Row label="Extra Options"   value={order.extra_options} />}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {addons.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-sm font-bold text-slate-800 mb-3">Add-ons</h2>
              <div className="flex flex-wrap gap-2">
                {addons.map((a: string, i: number) => (
                  <span key={i} className="rounded-full bg-violet-50 border border-violet-100 px-3 py-1 text-xs font-medium text-violet-700">{a}</span>
                ))}
              </div>
            </div>
          )}

          {/* Order details / notes */}
          {order.order_details && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" /> Order Notes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{order.order_details}</p>
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-sm font-bold text-slate-800 mb-3">Images ({images.length})</h2>
              <div className="flex flex-wrap gap-2">
                {images.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 transition">
                    Image {i + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Update status */}
        <div className="space-y-5">
          {order.status_comment && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
              <p className="text-xs font-semibold text-amber-700 mb-1">Status Comment</p>
              <p className="text-sm text-amber-800">{order.status_comment}</p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Update Status</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Order Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA]">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {(status === "Hold" || status === "Cancel") && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Comment (required)</label>
                  <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)}
                    placeholder="Reason for hold / cancellation…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#E53E3E] focus:ring-2 focus:ring-[#FEEAEA] resize-none" />
                </div>
              )}

              <button onClick={updateStatus} disabled={saving || saved}
                className="w-full rounded-xl bg-[#E53E3E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#C53030] disabled:opacity-60">
                {saved ? "✓ Updated!" : saving ? "Saving…" : "Save Status"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-2.5">
      <span className="w-28 flex-shrink-0 text-xs text-slate-500 font-medium pt-0.5">{label}</span>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}
