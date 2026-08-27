import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated?: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  lastUpdated = "August 25, 2026",
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
              {eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {description}
            </p>

            <p className="mt-6 text-sm text-slate-500">
              Last updated:{" "}
              <span className="font-medium text-slate-700">
                {lastUpdated}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                On this page
              </p>

              <nav className="mt-5 space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-white hover:text-red-600"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Legal content */}
          <article className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="space-y-12">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-1 shrink-0 font-mono text-xs text-red-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                          {section.title}
                        </h2>

                        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                Questions?
              </p>

              <h2 className="mt-3 text-xl font-bold text-slate-900">
                Need help with your data or account?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                If you have questions about privacy, security, your account,
                uploaded files, or any of these policies, contact the SnappEditt
                team.
              </p>

              <a
                href="mailto:sales@snappeditt.com"
                className="mt-5 inline-flex items-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Contact SnappEditt
              </a>
            </div>

            {/* Back links */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link
                href="/"
                className="font-medium text-slate-600 hover:text-red-600"
              >
                ← Back to home
              </Link>

              <Link
                href="/privacy"
                className="text-slate-500 hover:text-red-600"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="text-slate-500 hover:text-red-600"
              >
                Terms
              </Link>

              <Link
                href="/security"
                className="text-slate-500 hover:text-red-600"
              >
                Security
              </Link>

              <Link
                href="/gdpr"
                className="text-slate-500 hover:text-red-600"
              >
                GDPR
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}