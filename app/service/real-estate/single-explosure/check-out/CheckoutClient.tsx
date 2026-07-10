'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

type Addon = {
  name: string;
  price: number;
};

const ADDONS: Addon[] = [
  { name: 'Indoor Sky Replacement',     price: 0.15 },
  { name: 'Outdoor Sky Replacement',    price: 0.25 },
  { name: 'Window Masking',             price: 0.40 },
  { name: 'Grass Replacement',          price: 0.40 },
  { name: 'Grass Color Enhancement',    price: 0.20 },
  { name: 'Reflection Removal',         price: 0.50 },
  { name: 'Add TV Images',              price: 0.15 },
  { name: 'Add Fire To Fireplace',      price: 0.15 },
  { name: 'Color Cast Removal',         price: 1.0 },
];

type Props = {
  isLoggedIn: boolean;
};

export default function CheckoutClient({ isLoggedIn }: Props) {
  const router = useRouter();

  const [retouching, setRetouching] = useState('basic');
  const [orderName, setOrderName] = useState('');
  const [orderImages, setOrderImages] = useState(1);
  const [additionalComment, setAdditionalComment] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const basePrice = retouching === 'standard' ? 0.60 : 0.40;

  const addonsTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
    const addon = ADDONS.find(a => a.name === name);
    return addon ? sum + addon.price * qty : sum;
  }, 0);

  const total = (basePrice * orderImages) + addonsTotal;

  const handleSubmit = () => {
    if (!isLoggedIn) {
      alert("Please login to checkout.");
      router.push("/login?redirect=/cart");
      return;
    }

    const addonsPayload = Object.entries(quantities)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => {
        const addon = ADDONS.find(a => a.name === name)!;
        return { name, price: addon.price, qty };
      });

    const cartData = {
      service_name: "Single Exposure",
      qty: orderImages,
      price: total,
      retouching,
      order_name: orderName,
      order_images: orderImages,
      order_details: additionalComment,
      addons: addonsPayload,
      total
    };

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cartData))}; path=/`;
    router.push("/cart");
  };

  return (
    <section className="relative bg-white border border-gray-200 rounded-3xl shadow-xl p-6 md:p-8">
      
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-3">
          {[
            { num: 1, label: 'Service & Details', active: true },
            { num: 2, label: 'Review Order', active: false },
            { num: 3, label: 'Payment', active: false },
            { num: 4, label: 'Confirmation', active: false },
          ].map((step, i) => (
            <div key={step.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.active 
                    ? 'bg-[#E8352A] text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.num}
                </div>
                <p className={`text-[9px] mt-1 font-semibold ${
                  step.active ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.label}
                </p>
              </div>
              {i < 3 && <div className="w-12 h-px bg-gray-300 mx-2 mb-5" />}
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h2>

      <form className="space-y-5" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        
        {/* Retouching */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-900">Retouching</label>
          <select
            value={retouching}
            onChange={e => setRetouching(e.target.value)}
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8352A] transition-all"
          >
            <option value="basic">Basic ($0.40)</option>
          </select>
        </div>

        {/* Order Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-900">Order Name</label>
          <input
            type="text"
            value={orderName}
            onChange={e => setOrderName(e.target.value)}
            placeholder="e.g. Living Room Images"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8352A] transition-all"
          />
        </div>

        {/* Number of Images */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-900">Number of Images</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOrderImages(Math.max(1, orderImages - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>
            <input
              type="number"
              min={1}
              value={orderImages}
              onChange={e => setOrderImages(Math.max(1, Number(e.target.value)))}
              className="flex-1 px-4 py-3 text-sm text-center font-bold text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8352A] transition-all"
            />
            <button
              type="button"
              onClick={() => setOrderImages(orderImages + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Additional Comment */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-900">
            Additional Comment <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <textarea
            value={additionalComment}
            onChange={e => setAdditionalComment(e.target.value)}
            placeholder="Tell us about your requirements..."
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8352A] transition-all min-h-[5rem] resize-none"
          />
        </div>

        {/* Add-ons */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">Add-ons</h3>
          <div className="space-y-3">
            {ADDONS.map(addon => {
              const qty = quantities[addon.name] || 0;
              return (
                <div
                  key={addon.name}
                  className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs">
                      🏠
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{addon.name}</p>
                      <p className="text-xs text-gray-500">${addon.price.toFixed(2)} per image</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantities(prev => ({
                          ...prev,
                          [addon.name]: Math.max(0, qty - 1)
                        }))
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-white transition-all"
                    >
                      <Minus className="w-3 h-3 text-gray-700" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-gray-900">{qty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantities(prev => ({
                          ...prev,
                          [addon.name]: qty + 1
                        }))
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-white transition-all"
                    >
                      <Plus className="w-3 h-3 text-gray-700" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Estimated Total */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Estimated Total</span>
            <span className="text-3xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500">
            Pricing updates automatically based on your selections.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#E8352A] text-white font-bold text-sm hover:bg-[#C62B20] transition-all shadow-lg hover:shadow-xl"
        >
          <ShoppingBag className="w-4 h-4" />
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
}
