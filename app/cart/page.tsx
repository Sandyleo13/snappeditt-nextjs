'use client';

import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, Tag } from 'lucide-react';

type Addon = {
  name: string;
  price: number;
  qty: number;
};

type CartType = {
  service_name: string;
  qty: number;
  price: number;
  retouching: string;
  declutterType?: string;
  order_name: string;
  order_images: number;
  order_details: string;
  addons: Addon[];
  total: number;
};

declare global {
  interface Window { paypal?: any; }
}

/* ── service icon label ── */
const SERVICE_ABBR: Record<string, string> = {
  'HDR Premium':          'HDR',
  'HDR Basic':            'HDR',
  'Single Exposure':      'SE',
  'Manual Blending':      'MB',
  'Virtual Staging':      'VS',
  'Architecture Retouch': 'AR',
  'Day to Dusk':          'DTD',
  '3D Rendering':         '3D',
  '3D Floor Plan':        '3D',
  'Photo Composite':      'PC',
  'Ghost Mannequin':      'GM',
  'Jewelry':              'JW',
  'default':              'SVC',
};

function ServiceIcon({ name }: { name: string }) {
  const abbr = SERVICE_ABBR[name] ?? SERVICE_ABBR.default;
  return (
    <div className="w-12 h-12 rounded-xl bg-[#FFF0EE] border border-[#FFD5CE] flex items-center justify-center flex-shrink-0">
      <span className="text-[10px] font-extrabold text-[#E8352A] leading-none text-center">{abbr}</span>
    </div>
  );
}

export default function CartPage() {
  const [cart, setCart]           = useState<CartType[]>([]);
  const [paypalReady, setPaypalReady] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'paypal' | 'paylater'>('paypal');
  const [quantities, setQuantities]   = useState<number[]>([]);
  const paypalRendered = useRef(false);

  /* read cookie */
  useEffect(() => {
    try {
      const match = document.cookie.match(/(^| )cart=([^;]+)/);
      if (!match) return;
      const parsed = JSON.parse(decodeURIComponent(match[2]));
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      setCart(arr);
      setQuantities(arr.map(i => i.qty ?? 1));
    } catch { /* empty */ }
  }, []);

  const updateCookie = (c: CartType[]) => {
    document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(c)) + '; path=/';
  };

  const removeItem = (idx: number) => {
    const updated = cart.filter((_, i) => i !== idx);
    const updatedQty = quantities.filter((_, i) => i !== idx);
    setCart(updated);
    setQuantities(updatedQty);
    updateCookie(updated);
  };

  const changeQty = (idx: number, delta: number) => {
    const newQty = Math.max(1, quantities[idx] + delta);
    const newQtys = quantities.map((q, i) => i === idx ? newQty : q);
    setQuantities(newQtys);
    const updatedCart = cart.map((item, i) =>
      i === idx ? { ...item, qty: newQty, total: item.price * newQty } : item
    );
    setCart(updatedCart);
    updateCookie(updatedCart);
  };

  const subtotal   = cart.reduce((s, item, i) => s + item.price * quantities[i], 0);
  const discount   = 0;
  const grandTotal = subtotal - discount;

  /* load paypal */
  useEffect(() => {
    if (paypalReady || paymentMode !== 'paypal') return;
    const s = document.createElement('script');
    s.src = 'https://www.paypal.com/sdk/js?client-id=AUQFal8mDJYx18ufsO3MBLYtiuIX1bHrdho091_nPiaYj12gVGCqecYVXyQLe0DQ3st2LeU48evTVILl&currency=USD&intent=capture';
    s.async = true;
    s.onload = () => setPaypalReady(true);
    document.body.appendChild(s);
  }, [paypalReady, paymentMode]);

  /* render paypal buttons */
  useEffect(() => {
    if (!paypalReady || cart.length === 0 || paypalRendered.current || paymentMode !== 'paypal') return;
    window.paypal?.Buttons({
      createOrder: (_: any, actions: any) =>
        actions.order.create({ purchase_units: [{ amount: { value: grandTotal.toFixed(2) } }] }),
      onApprove: async (_: any, actions: any) => {
        const details = await actions.order.capture();
        for (const item of cart) {
          await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paypal_order_id: details.id, payment_mode: 'paypal', ...item }),
          });
        }
        document.cookie = 'cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/thank-you';
      },
    }).render('#paypal-buttons');
    paypalRendered.current = true;
  }, [paypalReady, cart, grandTotal, paymentMode]);

  const handlePayLater = async () => {
    const id = 'PAYLATER-' + Date.now();
    for (const item of cart) {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paypal_order_id: id, payment_mode: 'paylater', ...item }),
      });
    }
    document.cookie = 'cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/thank-you';
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Your Cart</h1>
          <div className="w-10 h-0.5 bg-[#E8352A] mt-2 mb-2" />
          <p className="text-sm text-gray-500">Review your selected services and proceed to checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
              <ShoppingCart className="w-9 h-9 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 max-w-xs">Add services to get started with your order.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ── LEFT: item list ── */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Items</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Price</span>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 px-5 py-4">
                    <ServiceIcon name={item.service_name} />

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{item.service_name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {item.order_images} Image{item.order_images !== 1 ? 's' : ''} • {item.retouching}
                      </p>
                      <button
                        onClick={() => removeItem(idx)}
                        className="flex items-center gap-1 text-[#E8352A] text-xs font-semibold mt-2 hover:underline"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>

                    {/* qty stepper */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => changeQty(idx, -1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
                      >
                        <Minus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-gray-900">{quantities[idx]}</span>
                      <button
                        onClick={() => changeQty(idx, 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
                      >
                        <Plus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>

                    {/* price */}
                    <p className="font-bold text-gray-900 text-sm flex-shrink-0 w-16 text-right">
                      ${(item.price * quantities[idx]).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: order summary + payment ── */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
              <h2 className="text-base font-extrabold text-gray-900">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-semibold text-green-600">- ${discount.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between font-extrabold text-base">
                  <span className="text-gray-900">Grand Total</span>
                  <span className="text-[#E8352A]">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Select Payment Method
                </p>
                <div className="space-y-2">
                  {[
                    { value: 'paypal',   label: 'Pay Now (PayPal)' },
                    { value: 'paylater', label: 'Pay Later (Invoice)' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          paymentMode === opt.value ? 'border-[#E8352A]' : 'border-gray-300'
                        }`}
                        onClick={() => setPaymentMode(opt.value as 'paypal' | 'paylater')}
                      >
                        {paymentMode === opt.value && (
                          <div className="w-2 h-2 rounded-full bg-[#E8352A]" />
                        )}
                      </div>
                      <span
                        className="text-sm font-medium text-gray-700"
                        onClick={() => setPaymentMode(opt.value as 'paypal' | 'paylater')}
                      >
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PayPal buttons or invoice */}
              {paymentMode === 'paypal' ? (
                <div id="paypal-buttons" className="pt-1" />
              ) : (
                <button
                  onClick={handlePayLater}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all"
                >
                  Generate Invoice
                </button>
              )}

              <p className="text-center text-[10px] text-gray-400 pt-1">
                Powered by <span className="font-bold text-gray-500">PayPal</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
