import Link from 'next/link';

const serviceCategories = [
  { title: 'Real Estate', description: 'Property photography enhancements and listing-ready edits.', href: '/service/real-estate' },
  { title: '3D Services', description: 'Architectural rendering and floor plan visualizations.', href: '/service/3d-services' },
  { title: 'Wedding Retouching', description: 'Wedding photo retouching and event image enhancement.', href: '/service/wedding-retouching' },
  { title: 'Product Ecommerce', description: 'Commercial product retouching for fashion, jewelry, and brands.', href: '/service/commercial' },
  { title: 'People Retouching', description: 'Portrait, newborn, maternity and sports retouching services.', href: '/service/people' },
  { title: 'Clipping Path', description: 'Background removal and image extraction services.', href: '/service/clipping-path-extraction' },
];

export default function ServiceIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl bg-white p-10 shadow-xl shadow-slate-200/40">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Service Categories</p>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Choose a service category to explore packages and pricing.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Our service pages give you fast access to category-level packages and specializations. Select a category to see the related packages.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group block rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-slate-900 transition group-hover:text-red-600">{category.title}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{category.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-600">Explore category<span aria-hidden>→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
