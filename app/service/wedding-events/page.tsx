import Link from 'next/link';
import { ArrowUpRight, Clock, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import AutoBeforeAfterImage from '../../../components/shared/AutoBeforeAfterImage';

const weddingServices = [
  {
    title: 'Wedding Retouch',
    href: '/service/wedding-events/wedding-events-retouch',
    description: 'Remove blemishes, refine skin tone, and preserve the natural emotion of every moment.',
    beforeImage: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=70',
    afterImage: 'https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Album Retouch',
    href: '/service/wedding-events/album-retouch',
    description: 'Prepare wedding albums with consistent color, balanced layouts, and polished final images.',
    beforeImage: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=900&q=85&auto=format&fit=crop&sat=-45&brightness=70',
    afterImage: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Perfect Color Balance',
    href: '/service/wedding-events/perfect-color-balance',
    description: 'Create a beautifully unified wedding gallery with crisp whites and vibrant tonal contrast.',
    beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop&sat=-40&brightness=75',
    afterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Color Balance + Culling',
    href: '/service/wedding-events/perfect-color-balance-culling',
    description: 'Cull the best frames and color-correct them for galleries, highlights, and client previews.',
    beforeImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85&auto=format&fit=crop&sat=-50&brightness=70',
    afterImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85&auto=format&fit=crop',
  },
];

export default function WeddingEventsServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE9E9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">
              Wedding Photo Services
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Wedding photography retouching and event image enhancement.
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Preserve the story, emotion, and beauty of every wedding day with polished edits, flawless skin tone, and consistent gallery-ready images.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEE4E2] text-[#B91C1C]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Wedding-ready styling</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Soft skin, crisp detail, and romantic color tones.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] text-[#0369A1]">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Fast turnaround</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Quick delivery for previews, albums, and client galleries.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#15803D]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Secure editing</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Confidential workflows and careful file handling.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/service/wedding-events/wedding-events-retouch"
                className="inline-flex items-center justify-center rounded-full bg-[#D32F2F] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#D32F2F]/20 transition hover:bg-[#B91C1C]"
              >
                Start Wedding Retouch
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/service/wedding-events/album-retouch"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              >
                Explore Album Retouch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink-100 blur-3xl" />
            <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="relative h-[520px] w-full overflow-hidden">
                <AutoBeforeAfterImage
                  beforeImage={weddingServices[0].beforeImage}
                  afterImage={weddingServices[0].afterImage}
                  alt="Wedding event photography preview"
                  className="h-[520px] w-full"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">Photographers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">Popular packages</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">Choose the perfect wedding editing package.</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {weddingServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid gap-6 lg:grid-cols-[240px_1fr] items-center">
                  <AutoBeforeAfterImage
                    beforeImage={service.beforeImage}
                    afterImage={service.afterImage}
                    alt={service.title}
                    className="h-48 rounded-3xl bg-slate-100 sm:h-56"
                  />
                  <div className="space-y-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#FFE9E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D32F2F]">
                        HDR Basic
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