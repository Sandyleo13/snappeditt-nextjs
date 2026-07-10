"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CheckoutButton({
  checkoutData,
}: {
  checkoutData: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/check");
      const data = await res.json();
      setIsLoggedIn(data.loggedIn);
    };

    checkAuth();
  }, []);

  const handleClick = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/cart");
      return;
    }

    setLoading(true);

    // Save checkout data in cookie
    document.cookie = `checkout_data=${encodeURIComponent(
      JSON.stringify(checkoutData)
    )}; path=/`;

    router.push("/cart");
  };

  if (isLoggedIn === null) {
    return (
      <button
        disabled
        className="mt-6 w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium"
      >
        Checking...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isLoggedIn || loading}
      className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium"
    >
      {loading ? "Processing..." : "Proceed to Checkout"}
    </button>
  );
}
