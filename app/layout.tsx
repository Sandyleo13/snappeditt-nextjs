"use client";
 
import { useLayoutEffect } from "react";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import AccessibilityWidget from "../components/shared/AccessibilityWidget";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import { usePathname } from "next/navigation";
import CrispChat from "../components/shared/CrispChat";
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8F9FB]">
        <ConditionalLayout>{children}</ConditionalLayout>
        <AccessibilityWidget />
        <WhatsAppButton />
        <CrispChat />
      </body>
    </html>
  );
}
 
function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isUserRoute = pathname.startsWith("/user");
 
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
 
  if (isAdminRoute || isUserRoute) {
    return <>{children}</>;
  }
 
  return (
    <>
      <Navbar />
      <main className="bg-[#F8F9FB]">{children}</main>
      <Footer />
      {/* <FloatingCheckoutButton /> */}
         
    </>
  );
}