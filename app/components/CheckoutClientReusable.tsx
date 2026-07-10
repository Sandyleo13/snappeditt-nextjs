'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceCheckoutConfig } from '@/lib/checkoutConfig';
import { ShoppingCart, Plus, Minus, Lock, RefreshCw, Headphones } from 'lucide-react';

type Props = {
  isLoggedIn: boolean;
  config: ServiceCheckoutConfig;
};

export default function CheckoutClient({ isLoggedIn, config }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (name: string) => {
    setSelectedAddons(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const addonTotal = config.addons
    .filter(a => selectedAddons.includes(a.name))
    .reduce((sum, a) => sum + a.price, 0);

  const total = (config.basePrice + addonTotal) * quantity;

  const handleCheckout = () => {
    if (!isLoggedIn) { router.push('/login'); return; }
    console.log({ service: config.serviceName, quantity, selectedAddons, total });
  };

  return (
    <div className="space-y-7">

      {/* ── Quantity ── */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Number of Images
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#E8352A] hover:text-[#E8352A] flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-3xl font-extrabold text-slate-900">{quantity}</span>
            <p className="text-xs text-slate-400 mt-0.5">images</p>
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#E8352A] hover:text-[#E8352A] flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick pick buttons */}
        <div className="flex gap-2 mt-3">
          {[10, 25, 50, 100].map(n => (
            <button
              key={n}
              onClick={() => setQuantity(n)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                quantity === n
                  ? 'bg-[#E8352A] text-white border-[#E8352A]'
                  : 'border-slate-200 text-slate-600 hover:border-[#E8352A] hover:text-[#E8352A]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* ── Add-ons ── */}
      {config.addons.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Add-ons <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="space-y-2">
            {config.addons.map((addon) => {
              const checked = selectedAddons.includes(addon.name);
              return (
                <label
                  key={addon.name}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? 'border-[#E8352A] bg-[#FFF8F7]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    checked ? 'bg-[#E8352A] border-[#E8352A]' : 'border-slate-300'
                  }`}>
                    {checked && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleAddon(addon.name)} />
                  <span className="flex-1 text-sm font-medium text-slate-800">{addon.name}</span>
                  <span className={`text-sm font-bold ${checked ? 'text-[#E8352A]' : 'text-slate-500'}`}>
                    +${addon.price.toFixed(2)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Price Summary ── */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Order Summary</p>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">
            Base price × {quantity} image{quantity !== 1 ? 's' : ''}
          </span>
          <span className="font-semibold text-slate-800">${(config.basePrice * quantity).toFixed(2)}</span>
        </div>

        {addonTotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Add-ons × {quantity}</span>
            <span className="font-semibold text-slate-800">+${(addonTotal * quantity).toFixed(2)}</span>
          </div>
        )}

        <div className="h-px bg-slate-200" />

        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-slate-900">Total</span>
          <span className="text-2xl font-extrabold text-[#E8352A]">${total.toFixed(2)}</span>
        </div>

        <p className="text-xs text-slate-400 text-center">
          ${config.basePrice.toFixed(2)} per image
          {addonTotal > 0 && ` + $${addonTotal.toFixed(2)} add-ons`}
        </p>
      </div>

      {/* ── CTA ── */}
      <button
        onClick={handleCheckout}
        className="w-full bg-[#E8352A] hover:bg-[#C62B20] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] shadow-[0_8px_24px_rgba(232,53,42,0.28)]"
      >
        <ShoppingCart className="w-5 h-5" />
        {isLoggedIn ? 'Place Order' : 'Login to Order'}
      </button>

      {/* ── Trust row ── */}
      <div className="flex items-center justify-center gap-6 pt-2">
        {[
          { icon: Lock,        label: 'Secure Payment' },
          { icon: RefreshCw,   label: 'Free Revisions' },
          { icon: Headphones,  label: '24/7 Support' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <Icon className="w-3.5 h-3.5 text-[#E8352A]" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
