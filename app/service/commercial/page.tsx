import Link from 'next/link';
import { ArrowUpRight, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import AutoBeforeAfterImage from '../../../components/shared/AutoBeforeAfterImage';

const commercialServices = [
  {
    title: 'Product Apparel & Footwear',
    href: '/service/commercial/products-apparel-footwear-furniture',
    description: 'High-volume retail editing with crisp color, clean backgrounds, and polished shadows.',
    beforeImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=70',
    afterImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Jewelry Retouching',
    href: '/service/commercial/jewelry',
    description: 'Premium gem, metal, and sparkle enhancement for luxury product imagery.',
    beforeImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=65',
    afterImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Ghost Mannequin',
    href: '/service/commercial/ghost-mannequin',
    description: 'Invisible mannequin compositing that keeps apparel shapes crisp and professional.',
    beforeImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop&sat=-30&brightness=75',
    afterImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Photo Composite',
    href: '/service/commercial/photo-composite',
    description: 'Seamless composites for lifestyle, catalog, and advertising imagery.',
    beforeImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    afterImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85&auto=format&fit=crop',
  },
];

export default function CommercialServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE9E9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">
              Commercial Photo Services
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Professional retouching for e-commerce, jewelry, and brand photography.
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Boost conversions and brand confidence with polished product visuals, premium compositing, and commercial-grade image refinement.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEE4E2] text-[#B91C1C]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Premium polish</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Clean, consistent product imagery for every catalog.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] text-[#0369A1]">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Fast turnaround</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Quick edits for launches, marketplaces, and ads.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#15803D]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Reliable quality</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Attention to detail on every SKU, stone, and product shot.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/service/commercial/products-apparel-footwear-furniture"
                className="inline-flex items-center justify-center rounded-full bg-[#D32F2F] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#D32F2F]/20 transition hover:bg-[#B91C1C]"
              >
                Start Product Retouch
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/service/commercial/jewelry"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              >
                Explore Jewelry Retouch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink-100 blur-3xl" />
            <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="relative h-[520px] w-full overflow-hidden">
                <AutoBeforeAfterImage
                  beforeImage={commercialServices[0].beforeImage}
                  afterImage={commercialServices[0].afterImage}
                  alt="Product photography sample"
                  className="h-[520px] w-full"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">E-commerce brands and creators</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">Commercial packages</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">Choose the service that fits your product photography needs.</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {commercialServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] items-center">
                  <AutoBeforeAfterImage
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    alt={service.title}
                    className="h-48 rounded-3xl bg-slate-100 sm:h-56"
                  />
                  <div className="space-y-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#FFE9E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D32F2F]">
                        Commercial
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#D32F2F] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#D32F2F]/20 transition group-hover:bg-[#DC2626]">
                        Explore service
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#D32F2F]" />
                        Fast delivery
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}