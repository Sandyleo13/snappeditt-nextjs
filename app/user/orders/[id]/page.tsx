"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  CalendarDays,
  Clock,
  CreditCard,
  Package,
  FileText,
  Tag,
  Layers,
  Palette,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  X,
} from "lucide-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function UserOrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [item, setItem]         = useState<any>(null);
  const [payment, setPayment]   = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  // Pay modal state
  const [showPayModal, setShowPayModal] = useState(false);
  const [paySuccess, setPaySuccess]     = useState(false);
  const [isPaylater, setIsPaylater]     = useState(false);

  useEffect(() => {
    if (!orderId) return;

    // Fetch order details from the user-facing endpoint
    const fetchItem = fetch(`/api/user/order-detail?order_id=${orderId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.items?.length) {
          setItem(d.items[0]);
          if (d.order?.paypal_order_id) {
            setIsPaylater(d.order.paypal_order_id.startsWith("PAYLATER-"));
          }
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));

    // Fetch payment info to know if paylater + get total
    const fetchPayment = fetch(`/api/user/order-payment?order_id=${orderId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.payment) {
          setPayment(d.payment);
          setIsPaylater(d.payment.paypal_order_id?.startsWith("PAYLATER-") ?? false);
        }
      })
      .catch(() => {});

    Promise.all([fetchItem, fetchPayment]).finally(() => setLoading(false));
  }, [orderId]);

  const handlePaySuccess = (newPaypalId: string) => {
    setPayment((prev: any) => ({ ...prev, paypal_order_id: newPaypalId }));
    setIsPaylater(false);
    setPaySuccess(true);
    setTimeout(() => {
      setShowPayModal(false);
      setPaySuccess(false);
    }, 2200);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#E53E3E]" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="space-y-4">
        <Link href="/user/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft className="h-4 w-4" /> Back to Orders
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Order not found or you don&apos;t have access.
        </div>
      </div>
    );
  }

  // Parse JSON fields
  const images: string[] = (() => {
    try { return JSON.parse(item.order_images || "[]"); } catch { return []; }
  })();

  type AddonRaw = string | { name?: string; price?: number; qty?: number };
  const addons: string[] = (() => {
    try {
      const parsed: AddonRaw[] = JSON.parse(item.addons || "[]");
      return parsed.map((a) =>
        typeof a === "string"
          ? a
          : [a.name, a.qty ? `×${a.qty}` : null, a.price ? `$${a.price}` : null]
              .filter(Boolean).join(" ")
      );
    } catch { return []; }
  })();

  const statusLabel = item.status || "Processing";
  const statusCls: Record<string, string> = {
    Completed: "bg-emerald-100 text-emerald-700",
    Cancel:    "bg-red-100 text-red-600",
    Cancelled: "bg-red-100 text-red-600",
    Hold:      "bg-amber-100 text-amber-600",
    Pending:   "bg-amber-100 text-amber-600",
    paid:      "bg-blue-100 text-blue-600",
  };
  const statusClass = statusCls[statusLabel] ?? "bg-blue-100 text-blue-600";
  const totalAmount = Number(payment?.total || item.price || 0);

  return (
    <div className="space-y-6">
      {/* ── Back + Header ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/user/orders" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition">
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Order #{item.order_id}</h1>
          <p className="mt-1 text-sm text-slate-500">{item.service_name}</p>
        </div>

        <div className="flex items-center gap-3 self-start">
          <span className={`rounded-full px-4 py-1.5 text-sm font-semibold ${statusClass}`}>
            {statusLabel}
          </span>
          {/* Pay Now button — only for paylater */}
          {isPaylater && (
            <button
              onClick={() => setShowPayModal(true)}
              className="flex items-center gap-2 rounded-full bg-[#E53E3E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#C53030]"
            >
              <CreditCard className="h-4 w-4" />
              Pay Now
            </button>
          )}
        </div>
      </div>

      {/* ── Pay Later notice banner ── */}
      {isPaylater && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">Payment Pending</p>
              <p className="text-xs text-amber-600">
                This order was placed on Pay Later. Amount due:{" "}
                <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPayModal(true)}
            className="flex-shrink-0 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
          >
            Pay Now
          </button>
        </div>
      )}

      {/* ── 4 Summary cards ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <SummaryCard icon={<ShoppingBag className="h-5 w-5 text-[#E53E3E]" />} iconBg="bg-[#FFF1F0]" label="Order ID" value={`#${item.order_id}`} />
        <SummaryCard icon={<Layers className="h-5 w-5 text-blue-500" />} iconBg="bg-blue-50" label="Quantity" value={`${item.qty} image${item.qty !== 1 ? "s" : ""}`} />
        <SummaryCard icon={<CreditCard className="h-5 w-5 text-emerald-500" />} iconBg="bg-emerald-50" label="Total" value={`$${totalAmount.toFixed(2)}`} />
        <SummaryCard icon={<Clock className="h-5 w-5 text-amber-500" />} iconBg="bg-amber-50" label="Payment" value={isPaylater ? "Pay Later" : "Paid"} />
      </div>

      {/* ── Order Details card ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1F0]">
            <Package className="h-5 w-5 text-[#E53E3E]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{item.service_name}</h2>
            {item.order_name && <p className="text-sm text-slate-500">{item.order_name}</p>}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DetailChip icon={<Layers className="h-3.5 w-3.5" />} label="Quantity" value={item.qty} />
          <DetailChip icon={<CreditCard className="h-3.5 w-3.5" />} label="Price" value={`$${Number(item.price || 0).toFixed(2)}`} />
          {item.retouching  && <DetailChip icon={<Sparkles className="h-3.5 w-3.5" />}   label="Retouching"    value={item.retouching} />}
          {item.declutterType && <DetailChip icon={<Tag className="h-3.5 w-3.5" />}       label="Declutter Type" value={item.declutterType} />}
          {item.color       && <DetailChip icon={<Palette className="h-3.5 w-3.5" />}    label="Color"         value={item.color} />}
          {item.detailing   && <DetailChip icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Detailing"   value={item.detailing} />}
        </div>

        {addons.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Add-ons</p>
            <div className="flex flex-wrap gap-2">
              {addons.map((addon, i) => (
                <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{addon}</span>
              ))}
            </div>
          </div>
        )}

        {item.order_details && (
          <div className="mt-5 rounded-xl bg-slate-50 px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Order Notes</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">{item.order_details}</p>
          </div>
        )}

        {(item.status_comment || item.comment) && (
          <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-4">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">Editor Comment</span>
            </div>
            <p className="text-sm leading-relaxed text-amber-800">{item.status_comment || item.comment}</p>
          </div>
        )}
      </div>

      {/* ── Reference images ── */}
      {images.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <h3 className="text-base font-bold text-slate-900">
              Reference Images <span className="ml-1 text-sm font-normal text-slate-500">({images.length})</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="group relative h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 transition hover:border-[#E53E3E]/40 hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Image ${i + 1}`} className="h-full w-full object-cover transition duration-200 group-hover:scale-105" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── PayPal Payment Modal ── */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {paySuccess ? (
              /* Success state */
              <div className="flex flex-col items-center gap-3 py-12 px-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <p className="text-xl font-bold text-slate-900">Payment Successful!</p>
                <p className="text-sm text-slate-500">Order #{item.order_id} has been paid.</p>
                <p className="text-2xl font-bold text-emerald-600">${totalAmount.toFixed(2)}</p>
              </div>
            ) : (
              /* Payment form */
              <div className="p-6">
                {/* Modal header */}
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Complete Payment</h3>
                    <p className="mt-0.5 text-sm text-slate-500">Order #{item.order_id} · {item.service_name}</p>
                  </div>
                  <button onClick={() => setShowPayModal(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Order summary */}
                <div className="mb-5 space-y-2 rounded-xl bg-slate-50 px-4 py-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{item.service_name}</span>
                    <span>× {item.qty}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Total Due</span>
                    <span className="text-xl font-bold text-slate-900">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* PayPal buttons */}
                <PayPalScriptProvider options={{
                  clientId: "AUQFal8mDJYx18ufsO3MBLYtiuIX1bHrdho091_nPiaYj12gVGCqecYVXyQLe0DQ3st2LeU48evTVILl",
                  currency: "USD",
                }}>
                  <PayPalButtons
                    style={{ layout: "vertical", shape: "pill" }}
                    createOrder={(_data, actions) => {
                      if (!actions.order) throw new Error("PayPal actions.order is undefined");
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{ amount: { currency_code: "USD", value: totalAmount.toFixed(2) } }],
                      });
                    }}
                    onApprove={async (_data, actions) => {
                      const details = await actions.order?.capture();
                      await fetch("/api/paylater-pay", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderId: item.order_id, paypalOrderId: details?.id }),
                      });
                      handlePaySuccess(details?.id ?? "PAID");
                    }}
                    onError={() => alert("Payment failed. Please try again.")}
                  />
                </PayPalScriptProvider>

                <button onClick={() => setShowPayModal(false)}
                  className="mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ icon, iconBg, label, value }: { icon: React.ReactNode; iconBg: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>{icon}</div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function DetailChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}
