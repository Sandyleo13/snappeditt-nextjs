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

  const [retouching, setRetouching] = useState('basic');
  const [orderName, setOrderName] = useState('');
  const [orderImages, setOrderImages] = useState(1);
  const [additionalComment, setAdditionalComment] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const basePrice = retouching === 'standard' ? 0.00 : 0.00

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

  const addonsPayload = Object.entries(quantities).map(([name, qty]) => {
    const addon = ADDONS.find(a => a.name === name)!;
    return {
      name,
      price: addon.price,
      qty
    };
  });

  const cartData = {
  service_name: "Photo Composite",
  qty: orderImages,
  price: total,
  retouching,
  order_name: orderName,
  order_images: orderImages,
  order_details: additionalComment,
  addons: addonsPayload,
  total
};


  document.cookie = `cart=${encodeURIComponent(
  JSON.stringify(cartData)
)}; path=/`;


  router.push("/cart");
};



  return (
    <section className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Place Your Order</h2>

      {/* Retouching */}
      <label className="block mb-2 font-medium">Retouching</label>
      <select
        value={retouching}
        onChange={e => setRetouching(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
         {/* <option value="select">Select</option> */}
        <option value="standard">Standard ($0.00)</option>
        {/* <option value="custom">Custom ($0.00)</option> */}
        {/* <option value="standard">Standard ($0.60)</option> */}
      </select>

      {/* Order Name */}
      <label className="block mb-2 font-medium">Order Name</label>
      <input
        type="text"
        value={orderName}
        onChange={e => setOrderName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Order Images */}
      <label className="block mb-2 font-medium">Number of Images</label>
      <input
        type="number"
        min={1}
        value={orderImages}
        onChange={e => setOrderImages(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4"
      />

      {/* Additional Comment */}
      <label className="block mb-2 font-medium">Additional Comment</label>
      <textarea
        value={additionalComment}
        onChange={e => setAdditionalComment(e.target.value)}
        className="w-full border p-2 rounded mb-6"
      />

      {/* Addons */}
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
                [addon.name]: Number(e.target.value)
              }))
            }
            className="w-20 border p-1 rounded"
          />
        </div>
      ))}

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mt-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg"
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </section>
  );
}
