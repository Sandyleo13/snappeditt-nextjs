import { cookies } from "next/headers";
import { getCheckoutConfig } from "@/lib/checkoutConfig";
import CheckoutClientReusable from "@/app/components/CheckoutClientReusable";
import { CheckCircle, Clock, Shield, Star } from "lucide-react";

interface PageProps {
  params: {
    service: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const config = getCheckoutConfig(params.service);
  return {
    title: config?.pageTitle || "Checkout | Snappeditt",
    description: config?.pageDescription || "Place your order with Snappeditt",
  };
}

export default async function CheckoutPage({ params }: PageProps) {
  const config = getCheckoutConfig(params.service);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Service Not Found</h1>
          <p className="text-slate-500 mt-2 text-sm">This service checkout is not available.</p>
        </div>
      </div>
    );
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");
  const isLoggedIn = !!userCookie?.value;

  return (
    <main className="min-h-screen bg-[#F8F9FB] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <p className="text-sm text-[#E8352A] font-semibold uppercase tracking-widest mb-1">Checkout</p>
          <h1 className="text-3xl font-extrabold text-slate-900">{config.serviceTitle}</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* ── LEFT: Order Form ── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-[#FFF0EE] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#E8352A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Place Your Order</h2>
                <p className="text-sm text-slate-500">Configure your editing service</p>
              </div>
            </div>

            <CheckoutClientReusable isLoggedIn={isLoggedIn} config={config} />
          </div>

          {/* ── RIGHT: Service Info Sidebar ── */}
          <div className="space-y-5">

            {/* Service details card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Red header */}
              <div className="bg-gradient-to-br from-[#E8352A] to-[#C62B20] px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-100 mb-1">Service</p>
                <h3 className="text-xl font-bold text-white">{config.sidebarTitle}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 leading-relaxed">{config.sidebarDescription}</p>

                {/* Steps */}
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Our Process</p>
                  <ol className="space-y-3">
                    {config.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFF0EE] text-[#E8352A] text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-slate-600 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Why Choose Us</p>
              <div className="space-y-3">
                {[
                  { icon: Clock,        text: '24–48 Hour Turnaround',       sub: 'Fast delivery guaranteed' },
                  { icon: CheckCircle,  text: 'Expert Photo Editors',        sub: '150+ professionals on staff' },
                  { icon: Shield,       text: '100% Secure & Confidential',  sub: 'Your files are safe with us' },
                  { icon: Star,         text: 'Satisfaction Guaranteed',     sub: 'Free revisions on every order' },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#FFF0EE] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#E8352A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{text}</p>
                      <p className="text-xs text-slate-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
