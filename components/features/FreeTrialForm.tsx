"use client";

import { useState, ChangeEvent, FormEvent } from "react";

const serviceOptions = [
  "Real Estate Retouch",
  "Wedding Photo Editing",
  "Product Photography",
  "Sky Replacement",
  "Background Removal",
  "Custom Photo Editing",
];

export default function FreeTrialForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(serviceOptions[0]);
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

  return (
    <section className="bg-[#f3f4f6] flex min-h-[50vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[1.5rem] bg-white shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-5 md:p-6 lg:p-8">
          <div className="mx-auto space-y-6">
            {submitted ? (
              <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center shadow-sm">
                <h2 className="text-3xl font-semibold text-red-700">Request Sent!</h2>
                <p className="mt-4 text-slate-700">
                  Thank you for requesting your free trial. Our team will reach out shortly with next steps.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-red-600">Free Trial</p>
                  <h2 className="text-2xl font-bold text-slate-900">Start your photo editing free trial</h2>
                  <p className="mx-auto max-w-lg text-sm text-slate-600">
                    Send us your details and sample images, and we&apos;ll review your request to kick off a professional photo editing trial.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">First Name</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
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

                  <div className="grid gap-4 sm:grid-cols-2">
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
                        className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Service Type</span>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Upload Sample Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="mt-2 w-full text-sm text-slate-700 file:rounded-full file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-white hover:file:bg-red-700"
                    />
                    <p className="mt-2 text-sm text-slate-600">
                      Upload up to 5 sample photos to help us review your trial request.
                    </p>
                    {files.length > 0 && (
                      <p className="mt-2 text-sm text-slate-600">
                        {files.length} file{files.length !== 1 ? "s" : ""} selected.
                      </p>
                    )}
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Tell us about your project</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 focus:border-red-500 focus:bg-white focus:outline-none"
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
