import Image from "next/image";
import { cookies } from "next/headers";
import { Shield, Users, CheckCircle } from "lucide-react";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout – Single Exposure | Snappeditt",
  description:
    "Customize your Single Exposure photo editing order with add-ons.",
};

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");
  const isLoggedIn = !!userCookie?.value;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6 md:p-12">
      <div className="grid w-full max-w-7xl gap-8 md:gap-12 md:grid-cols-[1fr_1.2fr] items-start">
        
        {/* ══════════════════════════════════  LEFT PANEL  ══════════════════════════════════ */}
        <div className="relative">
          {/* Floating red shapes */}
          <div className="absolute -left-8 top-20 w-14 h-14 bg-[#E8352A] rounded-2xl opacity-80" 
            style={{ transform: 'rotate(12deg)' }} />
          <div className="absolute -right-4 top-48 w-10 h-10 bg-[#E8352A] rounded-xl opacity-60" 
            style={{ transform: 'rotate(-15deg)' }} />
          <div className="absolute left-16 bottom-32 w-6 h-6 bg-[#E8352A] rounded-lg opacity-40" 
            style={{ transform: 'rotate(25deg)' }} />
          <div className="absolute -left-6 bottom-16 w-20 h-20 bg-[#FFA69E] rounded-3xl opacity-30 blur-sm" 
            style={{ transform: 'rotate(-8deg)' }} />

          <div className="relative z-10 space-y-6">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-[#FFEBE8] text-[#E8352A] px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                📌 Single Exposure Checkout
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Professional Edits.<br />
                <span className="text-[#E8352A]">Stunning Results.</span>
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm max-w-md">
                Our experts use advanced tools and proven techniques to deliver natural, high-end results every time.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid gap-3">
              {[
                { icon: '🎨', title: 'Color Correction', description: 'Perfect balance and natural tones' },
                { icon: '✂️', title: 'Clutter Removal', description: 'Clean, distraction-free images' },
                { icon: '📐', title: 'Lens Correction', description: 'Fix distortion and perspective' },
                { icon: '📂', title: 'Export in Multiple Formats', description: 'JPEG, TIFF, PSD & more' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Property image */}
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
              <div className="relative h-64">
                <Image
                  src="/images/real-estate-basic-sky-explosure-after.webp"
                  alt="Single Exposure preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white px-6 py-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[#E8352A] mb-1">
                  <span className="text-xl">⏱️</span>
                  <p className="text-sm font-bold">24-48h Estimated Delivery</p>
                </div>
                <p className="text-xs text-gray-600">High-quality single exposure editing with fast turnaround.</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-around border border-gray-200 rounded-2xl bg-gray-50 py-4 px-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-6 h-6 text-[#E8352A]" />
                <p className="text-[10px] font-semibold text-gray-700">100% Secure</p>
                <p className="text-[9px] text-gray-500">Safe & safe</p>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="flex flex-col items-center gap-1">
                <Users className="w-6 h-6 text-[#E8352A]" />
                <p className="text-[10px] font-semibold text-gray-700">Expert Editors</p>
                <p className="text-[9px] text-gray-500">Quality you can trust</p>
              </div>
              <div className="w-px h-10 bg-gray-300" />
              <div className="flex flex-col items-center gap-1">
                <CheckCircle className="w-6 h-6 text-[#E8352A]" />
                <p className="text-[10px] font-semibold text-gray-700">Satisfaction</p>
                <p className="text-[9px] text-gray-500">100% guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════  RIGHT FORM  ══════════════════════════════════ */}
        <CheckoutClient isLoggedIn={isLoggedIn} />
      </div>
    </main>
  );
}
