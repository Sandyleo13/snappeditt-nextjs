'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Addon = {
  name: string;
  price: number;
};

const ADDONS: Addon[] = [
  { name: 'Additional Camera Angle', price: 150 },
  { name: 'Post-Processing Effects', price: 50 },
  { name: 'Animation (5s loop)',     price: 300 },
  { name: '360° Turntable Video',    price: 200 },
  { name: 'Material Variations',     price: 75 },
  { name: 'Lighting Setup Tweaks',   price: 100 },
  { name: 'Background Replacement',  price: 40 },
  { name: 'Depth of Field Pass',     price: 30 },
  { name: 'Alpha Channel Output',    price: 25 },
];

type Props = {
  isLoggedIn: boolean;
};

export default function CheckoutClient({ isLoggedIn }: Props) {
  const router = useRouter();

  const [renderType, setRenderType] = useState<'interior' | 'exterior' | 'product'>('interior');
  const [orderName, setOrderName] = useState('');
  const [orderImages, setOrderImages] = useState(1);
  const [additionalComment, setAdditionalComment] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const renderPrices = {
    interior: 200,
    exterior: 250,
    product:  150,
  };

  const basePrice = renderPrices[renderType];

  const addonsTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
    const addon = ADDONS.find(a => a.name === name);
    return addon ? sum + addon.price * qty : sum;
  }, 0);

  const total = (orderImages * basePrice) + addonsTotal;

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
      service_name: "3D Rendering",
      qty: orderImages,
      price: basePrice,
      total,
      retouching: "standard",
      renderType,
      order_name: orderName,
      order_images: orderImages,
      order_details: additionalComment,
      addons: addonsPayload,
    };

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cartData))}; path=/`;
    router.push("/cart");
  };

  return (
    <section className="bg-[var(--white)] shadow-[var(--shadow-card)] rounded-[var(--radius)] p-8 border border-[var(--border)]">
      <h1 className="text-slate-900 text-2xl font-bold mb-6">Place Your Order</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={e => { e.preventDefault(); handleSubmit(); }}
      >
        {/* Render Type */}
        <div className="md:col-span-1">
          <label className="mb-2 text-sm font-medium text-slate-900 inline-block">Render Type</label>
          <select
            value={renderType}
            onChange={e => setRenderType(e.target.value as any)}
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300 outline-1 outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--primary)] transition-all"
          >
            <option value="interior">Interior ($200)</option>
            <option value="exterior">Exterior ($250)</option>
            <option value="product">Product ($150)</option>
          </select>
        </div>

        {/* Order Name */}
        <div className="md:col-span-1">
          <label className="mb-2 text-sm font-medium text-slate-900 inline-block">Order Name</label>
          <input
            type="text"
            value={orderName}
            onChange={e => setOrderName(e.target.value)}
            placeholder="e.g. Living Room Render"
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300 outline-1 outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--primary)] transition-all"
          />
        </div>

        {/* Number of Images */}
        <div className="md:col-span-1">
          <label className="mb-2 text-sm font-medium text-slate-900 inline-block">Number of Images</label>
          <input
            type="number"
            min={1}
            value={orderImages}
            onChange={e => setOrderImages(Math.max(1, Number(e.target.value)))}
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300 outline-1 outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--primary)] transition-all"
          />
        </div>

        {/* Additional Comment */}
        <div className="md:col-span-2">
          <label className="mb-2 text-sm font-medium text-slate-900 inline-block">Additional Comment (Optional)</label>
          <textarea
            value={additionalComment}
            onChange={e => setAdditionalComment(e.target.value)}
            placeholder="Tell us about your render requirements..."
            className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full border border-slate-300 outline-1 outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--primary)] transition-all min-h-[6rem]"
          />
        </div>

        {/* Add-ons */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-4 text-slate-900">Add-ons</h3>
          <div className="space-y-3">
            {ADDONS.map(addon => (
              <div
                key={addon.name}
                className="flex items-center justify-between gap-4 rounded-md border border-slate-300 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{addon.name}</p>
                  <p className="text-sm text-slate-500">${addon.price.toFixed(2)} per image</p>
                </div>
                <input
                  type="number"
                  min={0}
                  value={quantities[addon.name] || 0}
                  onChange={e =>
                    setQuantities(prev => ({
                      ...prev,
                      [addon.name]: Number(e.target.value)
                    }))
                  }
                  className="w-24 border border-slate-300 bg-white p-2 rounded-md outline-1 outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--primary)] transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Total */}
        <div className="md:col-span-2">
          <div className="rounded-md bg-slate-50 border border-slate-200 p-4 text-sm text-slate-900">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Estimated Total</span>
              <span className="text-2xl font-semibold">${total.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-slate-500">
              Pricing updates automatically based on your selections.
            </p>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-3.5 text-sm rounded-md font-semibold tracking-wide text-[var(--white)] border border-[var(--primary)] bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
