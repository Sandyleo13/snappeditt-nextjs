"use client";

import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, ChevronRight } from "lucide-react";

export default function FloatingCheckoutButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname.startsWith("/service/")) return null;
  if (pathname.includes("/check-out")) return null;

  const handleClick = () => {
    router.push(`${pathname}/check-out`);
  };

  return (
    <div className="floating-checkout-wrapper">
      <button onClick={handleClick} className="floating-checkout-btn">
        {/* Cart icon circle */}
        <span className="floating-checkout-icon">
          <ShoppingCart className="w-4 h-4 text-white" strokeWidth={2.2} />
        </span>

        {/* Label */}
        <span className="floating-checkout-label">Checkout</span>

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-white/60 flex-shrink-0" strokeWidth={2.5} />
      </button>
    </div>
  );
}
