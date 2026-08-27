import Link from 'next/link';
import { ArrowUpRight, Building2, House, LockKeyhole, Sparkles, Timer } from 'lucide-react';
import AutoBeforeAfterImage from '../../../components/shared/AutoBeforeAfterImage';

const realEstateServices = [
  { title: 'HDR Basic', href: '/service/real-estate/hdr-basic', description: 'Enhanced property photos with rich tones, sharp detail, and balanced exposure.', beforeImage: '/images/real-estate-basic-sky-explosure-before.webp', afterImage: '/images/real-estate-basic-sky-explosure-after.webp', badge: 'HDR Basic' },
  { title: 'Virtual Staging', href: '/service/real-estate/virtual-staging', description: 'Stage interiors digitally for better listing appeal without costly furniture or styling.', beforeImage: '/images/Virtual-Staging-SPH-Raw-1.webp', afterImage: '/images/Virtual-Staging-SPH-Corrected-1.webp', badge: 'Virtual Staging' },
  { title: 'Day To Dusk', href: '/service/real-estate/day-to-dusk', description: 'Convert daytime property photos into warm golden-hour images that command attention.', beforeImage: '/images/Day-to-Dusk-SHP-Raw-1.webp', afterImage: '/images/Day-to-Dusk-SHP-Corrected-1.webp', badge: 'Day To Dusk' },
  { title: 'Flambient Editing', href: '/service/real-estate/flambient-editing', description: 'Blend flash and ambient lighting for perfectly lit architectural imagery.', beforeImage: '/images/real-estate-raw.jpg', afterImage: '/images/real-estate-corrected.jpg', badge: 'Flambient Editing' },
  { title: 'Architecture Retouch', href: '/service/real-estate/architecture-retouch', description: 'Fine-tune architectural detail and perspective for polished real estate marketing.', beforeImage: '/images/Single-Exposure/1-before.webp', afterImage: '/images/Single-Exposure/1-after.webp', badge: 'Architecture Retouch' },
  { title: 'Digital De-Clutter', href: '/service/real-estate/digital-declutter', description: 'Remove distractions and unwanted objects while preserving natural room flow.', beforeImage: '/images/Declutter-SPH-Raw-2.webp', afterImage: '/images/Declutter-SPH-Corrected-2.webp', badge: 'Digital De-Clutter' },
];

export default function RealEstateServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F44336]/20 bg-[#FFEBEE] px-4 py-2 text-sm font-semibold text-[#C62828]">
              <Building2 className="h-5 w-5" aria-hidden="true" />
              <span>REAL ESTATE SERVICES</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-tight">
                Property photography editing for <span className="text-[#F44336]">faster, cleaner</span> listings.
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
                Explore our real estate photography packages that improve brightness, color, staging, and overall listing appeal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/service/real-estate/hdr-basic"
                className="inline-flex items-center justify-center rounded-full bg-[#F44336] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#F44336]/25 transition hover:bg-[#D32F2F] hover:shadow-xl"
              >
                Explore HDR Basic
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/service/real-estate/virtual-staging"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-[#F44336] hover:text-[#F44336]"
              >
                View Virtual Staging
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFEBEE] text-[#C62828]"><Sparkles className="h-6 w-6" aria-hidden="true" /></div>
                <p className="font-semibold text-slate-950">Professional Finish</p>
                <p className="mt-2 text-sm text-slate-500">High-end, listing-ready imagery.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F6FF] text-[#0F62FE]"><Timer className="h-6 w-6" aria-hidden="true" /></div>
                <p className="font-semibold text-slate-950">Fast Turnaround</p>
                <p className="mt-2 text-sm text-slate-500">Delivered quickly for fast listings.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF3E4] text-[#B45309]"><LockKeyhole className="h-6 w-6" aria-hidden="true" /></div>
                <p className="font-semibold text-slate-950">Secure Delivery</p>
                <p className="mt-2 text-sm text-slate-500">Safe file transfers and storage.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="relative h-[520px] w-full">
                <AutoBeforeAfterImage
                  beforeImage="/images/real-estate-raw.jpg"
                  afterImage="/images/real-estate-corrected.jpg"
                  alt="Real estate photo editing examples"
                  className="h-[520px] w-full"
                />
              </div>
        
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F44336]">Explore our real estate services</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">
              Choose the service that fits your <span className="text-[#F44336]">property marketing</span> needs.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {realEstateServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="grid items-center gap-6 p-6 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr]">
                  <AutoBeforeAfterImage
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    alt={service.title}
                    className="h-40 rounded-3xl bg-slate-100 sm:h-48"
                  />
                  <div className="flex flex-col justify-between gap-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#FFE9E9] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D32F2F] shadow-sm">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F44336]/10 text-[#F44336]"><House className="h-4 w-4" aria-hidden="true" /></span>
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold text-slate-950">{service.title}</h3>
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">{service.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#F44336] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#F44336]/20 transition group-hover:bg-[#DC2626]">
                        Explore service
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                      {/* <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#F44336]" />
                        Fast delivery
                      </span> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F44336] py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Ready to transform your listings?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-red-100">
            Start with a free trial and see the difference professional editing makes for your property photos.
          </p>
          <Link
            href="/free-trial"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-9 py-4 text-base font-semibold text-[#F44336] shadow-xl transition hover:bg-slate-100"
          >
            Get started free
            <ArrowUpRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}