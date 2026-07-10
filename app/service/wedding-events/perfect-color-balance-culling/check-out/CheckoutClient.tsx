'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Addon = {
  name: string;
  price: number;
};

const ADDONS: Addon[] = [
  { name: 'Indoor Sky Replacement', price: 0.15 },
  { name: 'Outdoor Sky Replacement', price: 0.25 },
  { name: 'Window Masking', price: 0.40 },
  { name: 'Grass Replacement', price: 0.40 },
  { name: 'Grass Color Enhancement', price: 0.20 },
  { name: 'Reflection Removal', price: 0.50 },
  { name: 'Add TV Images', price: 0.15 },
  { name: 'Add Fire To Fireplace', price: 0.15 },
  { name: 'Color Cast Removal', price: 1.0 },
];

type Props = {
  isLoggedIn: boolean;
};

export default function CheckoutClient({ isLoggedIn }: Props) {
  const router = useRouter();

  /* ===========================
     STATES
  ============================ */

  const [detailing, setDetailing] = useState<
    '70-80' | '50-60' | '40-50' | '30-40'
  >('70-80');

  const [orderName, setOrderName] = useState('');
  const [orderImages, setOrderImages] = useState(1);
  const [additionalComment, setAdditionalComment] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  /* ===========================
     PRICING
  ============================ */

  const detailingPrices = {
    '70-80': 0.08,
    '50-60': 0.09,
    '40-50': 0.10,
    '30-40': 0.11,
  };

  const basePrice = detailingPrices[detailing];

  /* ===========================
     ADDONS TOTAL
  ============================ */

  const addonsTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
    const addon = ADDONS.find(a => a.name === name);
    return addon ? sum + addon.price * qty : sum;
  }, 0);

  const total = (orderImages * basePrice) + addonsTotal;

  /* ===========================
     SUBMIT
  ============================ */

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
        return {
          name,
          price: addon.price,
          qty,
        };
      });

    const cartData = {
      service_name: "Perfect Color Balance Culling",
      detailing, // percentage range
      qty: orderImages,
      price: basePrice,
      total,
      retouching: "standard",
      order_name: orderName,
      order_images: orderImages,
      order_details: additionalComment,
      addons: addonsPayload,
    };

    document.cookie = `cart=${encodeURIComponent(
      JSON.stringify(cartData)
    )}; path=/`;

    router.push("/cart");
  };

  return (
    <section className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        Perfect Color Balance Culling
      </h2>

      {/* Retouching Type (Fixed) */}
      <label className="block mb-2 font-medium">Retouching Type</label>
      <input
        type="text"
        value="Standard"
        disabled
        className="w-full border p-2 rounded mb-4 bg-gray-100"
      />

      {/* Detailing Percentage */}
      <label className="block mb-2 font-medium">Detailing</label>
      <select
        value={detailing}
        onChange={e => setDetailing(e.target.value as any)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="70-80">70% - 80% </option>
        <option value="50-60">50% - 60% </option>
        <option value="40-50">40% - 50% </option>
        <option value="30-40">30% - 40% </option>
      </select>

      {/* Order Name */}
      <label className="block mb-2 font-medium">Order Name</label>
      <input
        type="text"
        value={orderName}
        onChange={e => setOrderName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Number of Images */}
      <label className="block mb-2 font-medium">Number of Images</label>
      <input
        type="number"
        min={1}
        value={orderImages}
        onChange={e => setOrderImages(Math.max(1, Number(e.target.value)))}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Additional Details */}
      <label className="block mb-2 font-medium">Additional Order Details</label>
      <textarea
        value={additionalComment}
        onChange={e => setAdditionalComment(e.target.value)}
        className="w-full border p-2 rounded mb-6"
      />

      {/* Add-ons */}
      <h3 className="font-semibold mb-3">Add-ons</h3>
      {ADDONS.map(addon => (
        <div key={addon.name} className="flex justify-between mb-2">
          <span>{addon.name} (${addon.price})</span>
          <input
            type="number"
            min={0}
            value={quantities[addon.name] || 0}
            onChange={e =>
              setQuantities(prev => ({
                ...prev,
                [addon.name]: Number(e.target.value),
              }))
            }
            className="w-20 border p-1 rounded"
          />
        </div>
      ))}

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mt-6 border-t pt-4">
        <span>Total</span>
        <span className="text-red-500">${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg"
      >
        Proceed to Checkout
      </button>
    </section>
  );
}
