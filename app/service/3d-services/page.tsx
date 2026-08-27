import Link from 'next/link';
import { ChevronRight, ShieldCheck, Sparkles, Clock3 } from 'lucide-react';
import AutoBeforeAfterImage from '../../../components/shared/AutoBeforeAfterImage';

const serviceItems = [
  {
    title: '3D Rendering',
    href: '/service/3d-services/3d-rendering',
    description: 'Photorealistic renders for architecture, interiors, and product visualization.',
    beforeImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: '3D Floor Plan',
    href: '/service/3d-services/3d-floor-plan',
    description: 'Detailed 2D to 3D floor plan transformation with furniture, lighting, and realistic materials.',
    beforeImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85&auto=format&fit=crop',
  },
];

export default function ThreeDServicesPage() {
  return (
    <main className="min-h-screen bg-[#F9F8F6] text-slate-900">
      <div className="relative overflow-hidden">
        {/* <div className="hidden xl:block absolute left-6 top-1/3 rounded-full bg-[#F44336] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(244,67,54,0.18)]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white" />
            Checkout
          </span>
        </div> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="relative overflow-hidden rounded-[2rem] bg-white px-6 py-10 shadow-[0_40px_80px_rgba(15,23,42,0.08)] sm:px-10 sm:py-14">
            <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-[#F44336]/10 blur-3xl" />
            <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-[#FFCDD2]/20 blur-3xl" />

            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.9fr_1.1fr] items-center">
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F44336]/20 bg-[#FFEBEE] px-4 py-2 text-sm font-semibold text-[#C62828]">
                  <span>3D SERVICES</span>
                  <span className="h-px flex-1 bg-[#F44336]/20" />
                </div>
                <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                  Architectural 3D rendering and floor plan visualization.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Browse our 3D rendering and floor plan packages for real estate presentations and design reviews.
                </p>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFEBEE] text-[#D32F2F]">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-950">High Quality</p>
                    <p className="mt-2 text-sm text-slate-600">Photo-realistic output</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFEBEE] text-[#D32F2F]">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-950">Fast Delivery</p>
                    <p className="mt-2 text-sm text-slate-600">On-time, every time</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFEBEE] text-[#D32F2F]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-950">100% Secure</p>
                    <p className="mt-2 text-sm text-slate-600">Your files are safe</p>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/service/3d-services/3d-rendering"
                    className="inline-flex items-center justify-center rounded-full bg-[#F44336] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F]"
                  >
                    3D Rendering
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href="/service/3d-services/3d-floor-plan"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-[#F44336] hover:text-[#F44336]"
                  >
                    3D Floor Plan
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-4 shadow-xl shadow-slate-200/70">
                <div className="absolute -left-10 top-6 h-28 w-28 rounded-full bg-[#F44336]/10 blur-3xl" />
                <div className="absolute right-6 bottom-10 h-24 w-24 rounded-full bg-[#FFCDD2]/30 blur-3xl" />
                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/0 via-[#000000]/10 to-[#000000]/20" />
                  <AutoBeforeAfterImage
                    beforeImage={serviceItems[0].beforeImage}
                    afterImage={serviceItems[0].afterImage}
                    alt="3D architectural render"
                    className="h-[420px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <section className="mt-14">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F44336]">Explore Our 3D Services</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">Choose the service that fits your project needs.</h2>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {serviceItems.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="grid gap-6 lg:grid-cols-[220px_1fr] p-6">
                    <AutoBeforeAfterImage
                      beforeImage={service.beforeImage}
                      afterImage={service.afterImage}
                      alt={service.title}
                      className="h-48 rounded-[1.75rem] bg-slate-100"
                    />

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#FFEBEE] px-3 py-2 text-sm font-semibold text-[#C62828]">
                          <span>{service.title}</span>
                        </div>
                        <h3 className="mt-5 text-2xl font-semibold text-slate-950">{service.title}</h3>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFEBEE] px-4 py-2 text-sm font-semibold text-[#C62828]">
                          Explore service
                          <ChevronRight className="h-4 w-4" />
                        </span>
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                          <Clock3 className="h-4 w-4 text-[#F44336]" />
                          24-48h turnaround
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}