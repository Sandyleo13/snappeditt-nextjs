'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-16 text-slate-900">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-lg shadow-slate-200/50">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">404 Error</p>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">Page Not Found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
