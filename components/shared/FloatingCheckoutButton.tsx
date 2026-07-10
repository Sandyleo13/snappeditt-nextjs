"use client";

import { usePathname, useRouter } from "next/navigation";

export default function FloatingCheckoutButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname.startsWith("/service/")) return null;
  if (pathname.includes("/check-out")) return null;

  const handleClick = () => {
    router.push(`${pathname}/check-out`);
  };

  return (
    <div className="floating-wrapper">
      <button onClick={handleClick} className="floating-btn">
        Checkout
      </button>

      <style jsx>{`
        .floating-wrapper {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
        }

        .floating-btn {
          position: relative;
          padding: 14px 22px;
          font-weight: 600;
          color: white;
          background: #111;
          border-radius: 0 14px 14px 0;
          border: none;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
        }

        /* Animated LED Border */
        .floating-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 0 16px 16px 0;
          background: linear-gradient(
            270deg,
            #ff0080,
            #7928ca,
            #2afadf,
            #ff8c00,
            #ff0080
          );
          background-size: 400% 400%;
          animation: ledMove 6s linear infinite;
          z-index: -1;
        }

        .floating-btn::after {
          content: "";
          position: absolute;
          inset: 2px;
          background: #111;
          border-radius: 0 12px 12px 0;
          z-index: -1;
        }

        @keyframes ledMove {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }

        .floating-btn:hover {
          transform: translateX(4px);
          transition: 0.3s ease;
        }
      `}</style>
    </div>
  );
}
