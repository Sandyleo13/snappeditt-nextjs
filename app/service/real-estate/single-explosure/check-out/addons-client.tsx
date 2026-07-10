'use client';

import { useState } from 'react';

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
  basePrice: number;
  orderImages: number;
  onSubmit: (addons: any[], addonsTotal: number) => void;
};

export default function AddonsClient({
  basePrice,
  orderImages,
  onSubmit,
}: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeAddon, setActiveAddon] = useState<Addon | null>(null);
  const [tempQty, setTempQty] = useState(1);

  const addonsTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
    const addon = ADDONS.find(a => a.name === name);
    return addon ? sum + addon.price * qty : sum;
  }, 0);

  const total = orderImages * basePrice + addonsTotal;

  const addonsPayload = Object.entries(quantities).map(([name, qty]) => {
    const addon = ADDONS.find(a => a.name === name)!;
    return { name, price: addon.price, qty };
  });

  const handleProceed = () => {
    onSubmit(addonsPayload, addonsTotal);
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Add-ons</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Addon Cards */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ADDONS.map(addon => (
              <button
                key={addon.name}
                onClick={() => {
                  setActiveAddon(addon);
                  setTempQty(quantities[addon.name] || 1);
                }}
                className="border rounded-lg p-4 text-left hover:border-red-500 w-full text-left"
              >
                <p className="font-medium">{addon.name}</p>
                <p className="text-sm text-gray-500">${addon.price.toFixed(2)} / image</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Summary & Checkout */}
        <aside className="rounded-lg border border-[var(--border)] bg-[var(--white)] p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium">Selected add-ons</h3>
            <div className="mt-3">
              {Object.keys(quantities).length === 0 ? (
                <p className="text-sm text-slate-500">No add-ons selected</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--text-paragraph)]">
                  {Object.entries(quantities).map(([name, qty]) => (
                    <div key={name} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                      <div className="text-sm">
                        <div className="font-medium">{name}</div>
                        <div className="text-slate-500 text-xs">x{qty}</div>
                      </div>
                      <div className="font-medium">${(ADDONS.find(a => a.name === name)!.price * qty).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="text-red-500 font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>

      {activeAddon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="font-semibold mb-2">{activeAddon.name}</h3>

            <input
              type="number"
              min={1}
              value={tempQty}
              onChange={e => setTempQty(Number(e.target.value))}
              className="border px-3 py-2 w-full mb-4"
            />

            <button
              onClick={() => {
                setQuantities(prev => ({
                  ...prev,
                  [activeAddon.name]: tempQty,
                }));
                setActiveAddon(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
}
