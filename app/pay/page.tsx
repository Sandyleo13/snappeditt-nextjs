'use client';

import { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ShoppingBag, Clock, CreditCard, ImageIcon, Calendar, RefreshCw, X } from 'lucide-react';

type Order = {
  id: number;
  total: number | string;
  created_at: string;
  paypal_order_id: string;
  service_name: string;
  order_images: number;
};

const DEMO_ORDERS: Order[] = [
  {
    id: 1021,
    total: 4.80,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    paypal_order_id: 'paylater-demo-1',
    service_name: 'Single Exposure',
    order_images: 12,
  },
  {
    id: 1034,
    total: 9.60,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    paypal_order_id: 'paylater-demo-2',
    service_name: 'HDR Basic',
    order_images: 24,
  },
  {
    id: 1042,
    total: 0.00,
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    paypal_order_id: 'PAYID-COMPLETED-789',
    service_name: 'Real Estate Enhancement',
    order_images: 8,
  },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-28" />
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-5 bg-gray-100 rounded w-16" />
          <div className="h-4 bg-gray-100 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function PayLaterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    try {
      const res = await fetch('/api/paylater-orders');
      const data = await res.json();
      if (data.success && data.orders?.length > 0) {
        setOrders(data.orders);
        setIsDemo(false);
      } else {
        setOrders(DEMO_ORDERS);
        setIsDemo(true);
      }
    } catch {
      setOrders(DEMO_ORDERS);
      setIsDemo(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const pendingOrders = orders.filter(o => o.paypal_order_id?.toLowerCase().startsWith('paylater'));
  const totalDue = pendingOrders.reduce((s, o) => s + Number(o.total), 0);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AUQFal8mDJYx18ufsO3MBLYtiuIX1bHrdho091_nPiaYj12gVGCqecYVXyQLe0DQ3st2LeU48evTVILl",
        currency: "USD",
      }}
    >
      <main className="min-h-screen bg-[#F7F8FA] px-4 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* ── Page header ── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#E8352A] bg-[#FFEBE8] px-3 py-1 rounded-full mb-3">
                Pay Later
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Outstanding Orders
              </h1>
              <p className="mt-1.5 text-sm text-gray-500">
                Review and pay for orders you deferred at checkout.
              </p>
            </div>
            <button
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 shadow-sm transition-all disabled:opacity-50 whitespace-nowrap mt-1"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* ── Demo banner ── */}
          {isDemo && showBanner && !loading && (
            <div className="flex items-start sm:items-center justify-between gap-3 bg-[#FFF8F0] border border-amber-200 rounded-2xl px-4 sm:px-5 py-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-lg flex-shrink-0">🔔</span>
                <p className="text-sm text-amber-900">
                  <span className="font-bold">Demo mode —</span>{' '}
                  No real pay-later orders found. Showing sample data so you can preview the layout.
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-amber-400 hover:text-amber-600 transition-colors flex-shrink-0 mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Summary stats ── */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: 'Total Orders',      value: orders.length,              icon: <ShoppingBag className="w-5 h-5" />, iconBg: 'bg-[#FFF0EE] text-[#E8352A]' },
                { label: 'Pending Payment',   value: pendingOrders.length,       icon: <Clock        className="w-5 h-5" />, iconBg: 'bg-amber-50 text-amber-500'  },
                { label: 'Amount Due',        value: `$${totalDue.toFixed(2)}`,  icon: <CreditCard   className="w-5 h-5" />, iconBg: 'bg-green-50 text-green-600'  },
              ].map(stat => (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Order list ── */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-base font-bold text-gray-700">No pay-later orders found.</p>
              <p className="text-sm text-gray-400 mt-1">
                Orders deferred at checkout will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => {
                const isPending = order.paypal_order_id?.toLowerCase().startsWith('paylater');

                return (
                  <div
                    key={`${order.id}-${order.paypal_order_id}`}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                  >
                    {/* Colored left accent bar */}
                    <div className="flex">
                      <div className={`w-1 flex-shrink-0 ${isPending ? 'bg-[#E8352A]' : 'bg-green-400'}`} />

                      <div className="flex-1 p-4 sm:p-6">
                        {/* Top row: icon + order info */}
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isPending ? 'bg-[#FFF0EE]' : 'bg-green-50'}`}>
                            <ShoppingBag className={`w-5 h-5 ${isPending ? 'text-[#E8352A]' : 'text-green-500'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="font-bold text-gray-900 text-[15px]">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">{order.service_name}</p>
                              </div>
                              {/* Amount + status — top-right on all sizes */}
                              <div className="flex flex-col items-end flex-shrink-0">
                                <p className="text-xl font-extrabold text-gray-900">
                                  ${Number(order.total).toFixed(2)}
                                </p>
                                {isPending ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#E8352A] mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8352A] inline-block" />
                                    Pending
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                    Paid
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Pills */}
                            <div className="flex flex-wrap items-center gap-2 mt-2.5">
                              <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                                <ImageIcon className="w-3 h-3" />
                                {order.order_images} image{order.order_images !== 1 ? 's' : ''}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                  month: 'short', day: 'numeric', year: 'numeric'
                                })}
                              </span>
                            </div>

                            {isPending && (
                              <p className="text-xs text-gray-400 mt-2">
                                Complete your payment securely via PayPal.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* PayPal button — full width below, only for pending */}
                        {isPending && (
                          <div className="mt-4 w-full max-w-xs">
                            <PayPalButtons
                              style={{ layout: "horizontal", height: 44, tagline: false, label: "pay" }}
                              createOrder={async (_d, actions) => {
                                if (!actions.order) throw new Error("PayPal actions.order is undefined");
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [{
                                    amount: {
                                      currency_code: "USD",
                                      value: Number(order.total || 0).toFixed(2),
                                    },
                                  }],
                                });
                              }}
                              onApprove={async (_d, actions) => {
                                const details = await actions.order?.capture();
                                await fetch("/api/paylater-pay", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ orderId: order.id, paypalOrderId: details?.id }),
                                });
                                fetchOrders();
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </PayPalScriptProvider>
  );
}
