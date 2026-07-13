'use client';

import Link from 'next/link';

const packagePages = [
  {
    title: 'Real Estate Editing',
    description: 'Modern real estate photo editing and virtual staging services.',
    href: '/service/real-estate/hdr-basic',
  },
  {
    title: '3D Services',
    description: 'High-quality 3D renderings and floor plan visualizations.',
    href: '/service/3d-services/3d-rendering',
  },
  {
    title: 'Wedding Retouching',
    description: 'Perfect your wedding images with professional retouching.',
    href: '/service/wedding-events/wedding-events-retouch',
  },
  {
    title: 'Product Ecommerce',
    description: 'Product retouching for e-commerce, apparel, and jewelry.',
    href: '/service/commercial/products-apparel-footwear-furniture',
  },
  {
    title: 'People Retouching',
    description: 'Portrait and people photo editing for studio-quality results.',
    href: '/service/people/portrait-headshots-studio',
  },
  {
    title: 'Clipping Path',
    description: 'Fast background removal and clipping path extraction.',
    href: '/service/clipping-path-extraction/clipping-path',
  },
  {
    title: 'Day to Dusk',
    description: 'Transform daytime photos into sunset-ready masterpieces.',
    href: '/service/real-estate/day-to-dusk',
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/40">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Explore Packages</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Choose the service package that fits your project.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Browse our most popular photo editing packages and go to the service page for details and pricing.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packagePages.map((pkg) => (
            <Link
              key={pkg.href}
              href={pkg.href}
              className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-red-600">
                {pkg.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{pkg.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                Explore package
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
