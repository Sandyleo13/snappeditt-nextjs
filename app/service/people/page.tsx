import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';

const peopleServices = [
  {
    title: 'Portrait Headshots Studio',
    href: '/service/people/portrait-headshots-studio',
    description: 'Polished professional headshots with natural skin tones and crisp lighting.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'Corporate & Professional Headshots',
    href: '/service/people/corporate-professional-headshots',
    description: 'Business and executive portraits optimized for websites, LinkedIn, and branding.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'Maternity & Pregnancy Retouch',
    href: '/service/people/maternity-pregnancy-retouch',
    description: 'Soft, elegant retouching that celebrates the beauty of every pregnancy moment.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'Newborn Retouch',
    href: '/service/people/new-born',
    description: 'Gentle newborn editing with skin smoothing, color correction, and emotional tone.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'School Retouching',
    href: '/service/people/school',
    description: 'Bright, clean school portraits with consistent color and polished looks.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'Sports Retouching',
    href: '/service/people/sports',
    description: 'Dynamic athlete images refined for energy, contrast, and visual impact.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
  {
    title: 'Fashion & Glamour Retouch',
    href: '/service/people/fashion-glamour',
    description: 'High-end fashion retouching with flawless skin, texture, and color control.',
    image: '/images/Baby-SPH-Corrected-3.webp',
  },
];

export default function PeopleServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFE9E9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">
              People Retouching Services
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Studio-quality portrait retouching for every project.
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Bring out the best in every face, moment, and portrait with our expert people photo edits for headshots, fashion, newborns, and more.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E0F2FE] text-[#0369A1]">
                  <Clock className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Fast turnaround</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Quick edits for headshots, events, and client galleries.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#B45309]">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Professional polish</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Retouching that looks natural and beautifully finished.</p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-[#15803D]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-950">Trusted editing</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Reliable quality and secure handling for every portrait shoot.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/service/people/portrait-headshots-studio"
                className="inline-flex items-center justify-center rounded-full bg-[#D32F2F] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#D32F2F]/20 transition hover:bg-[#B91C1C]"
              >
                Start Headshots
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/service/people/fashion-glamour"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition hover:border-[#D32F2F] hover:text-[#D32F2F]"
              >
                Explore Fashion Retouch
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink-100 blur-3xl" />
            <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full bg-slate-200/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
              <div className="relative h-[520px] w-full overflow-hidden">
                <Image
                  src="/images/Baby-SPH-Corrected-3.webp"
                  alt="Portrait photography sample"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">Photographers and studios worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D32F2F]">Popular packages</p>
            <h2 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">Choose the service that fits your portrait photography needs.</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {peopleServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="grid gap-6 lg:grid-cols-[220px_1fr] items-center">
                  <div className="relative h-48 overflow-hidden rounded-3xl bg-slate-100 sm:h-56">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-5">
                    <div>
                      <span className="inline-flex rounded-full bg-[#FFE9E9] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D32F2F]">
                        People Retouch
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
