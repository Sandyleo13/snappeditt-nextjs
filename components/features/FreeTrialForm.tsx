"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Upload,
  ImageIcon,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

const serviceOptions = [
  {
    title: "Real Estate",
    desc: "HDR • Window Pull • Sky",
    value: "Real Estate Retouch",
    icon: "??",
  },
  {
    title: "Wedding",
    desc: "Color • Skin • Culling",
    value: "Wedding Photo Editing",
    icon: "??",
  },
  {
    title: "Product",
    desc: "Ecommerce • Amazon",
    value: "Product Photography",
    icon: "??",
  },
  {
    title: "Sky Replace",
    desc: "Natural Sky Editing",
    value: "Sky Replacement",
    icon: "??",
  },
  {
    title: "Background",
    desc: "Cutout & Masking",
    value: "Background Removal",
    icon: "??",
  },
  {
    title: "Custom",
    desc: "Any Editing Service",
    value: "Custom Photo Editing",
    icon: "?",
  },
];

export default function FreeTrialForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(serviceOptions[0].value);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFiles(Array.from(event.target.files).slice(0, 5));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("service", service);
    formData.append("message", message);
    files.forEach((file, index) => {
      formData.append(`file_${index + 1}`, file);
    });

    try {
      const response = await fetch("/api/free-trial", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Unable to submit request.");
      }

      setSubmitted(true);
    } catch (error: any) {
      setSubmitError(error?.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-slate-100 py-24">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-12 text-center shadow-xl">
          <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-green-500" />
          <h2 className="text-3xl font-bold">Request Submitted Successfully</h2>
          <p className="mt-4 text-slate-600">
            Thank you for requesting your free trial. Our team will contact you shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-100 py-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xl font-semibold text-red-600">
            FREE TRIAL
          </span>
          <h2 className="mt-5 text-5xl font-black text-slate-900">
            Try Our Professional
            <span className="text-red-600"> Photo Editing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Upload up to five images and experience studio-quality editing before placing your first order.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
          <div className="rounded-[34px] bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold">Choose Your Service</h3>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {serviceOptions.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setService(item.value)}
                  className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                    service === item.value
                      ? "border-red-500 bg-red-50 shadow-lg"
                      : "border-slate-200 bg-white hover:border-red-300 hover:-translate-y-1"
                  }`}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h4 className="mt-3 font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                    placeholder="John"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                    placeholder="Doe"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Email Address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Phone Number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Upload Sample Images</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mt-2 w-full text-sm text-slate-700 file:rounded-full file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-white hover:file:bg-red-700"
                />
                <p className="mt-2 text-sm text-slate-600">Upload up to 5 sample photos to help us review your trial request.</p>
                {files.length > 0 && (
                  <p className="mt-2 text-sm text-slate-600">{files.length} file{files.length !== 1 ? "s" : ""} selected.</p>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Tell us about your project</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                  placeholder="Share your editing goals, style preferences, or any special requests."
                />
              </label>

              {submitError && (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-3xl bg-red-600 px-5 py-3 text-white font-semibold shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting Request..." : "Submit Free Trial Request"}
              </button>
            </form>
          </div>

          <div className="rounded-[34px] border border-slate-200 bg-white p-8 shadow-xl">
            <div className="rounded-[26px] bg-red-50 p-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-600">
                <Upload className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Your Free Trial Includes</h3>
              <p className="mt-2 text-sm text-slate-600">5 Images • Full Access • No Credit Card</p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Secure & Private Upload</p>
                  <p className="text-sm text-slate-600">Your images are encrypted and never shared.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Lightning Fast Delivery</p>
                  <p className="text-sm text-slate-600">AI-powered workflow + expert edits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white p-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">High Quality Results</p>
                  <p className="text-sm text-slate-600">Professional edits with full resolution.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
