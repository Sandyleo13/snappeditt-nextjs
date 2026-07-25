"use client";

import { useState, useRef, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { Upload, Gift, Heart, Home, Image as ImageIcon, Scissors, Shield, Zap, CheckCircle, type LucideIcon } from "lucide-react";

const serviceOptions: Array<{ id: string; name: string; icon: LucideIcon; time: string }> = [
  { id: "portrait", name: "Portrait", icon: Heart, time: "2-3 min" },
  { id: "wedding", name: "Wedding", icon: Heart, time: "4-5 min" },
  { id: "real-estate", name: "Real Estate", icon: Home, time: "3-4 min" },
  { id: "product", name: "Product", icon: ImageIcon, time: "2-3 min" },
  { id: "background-removal", name: "Background Removal", icon: Scissors, time: "1-2 min" },
];

const benefitItems: Array<{ title: string; description: string; icon: typeof Upload }> = [
  {
    title: "Secure & Private Upload",
    description: "Your images are encrypted and never shared",
    icon: Shield,
  },
  {
    title: "Lightning Fast Delivery",
    description: "AI-powered workflow + expert edits",
    icon: Zap,
  },
  {
    title: "High Quality Results",
    description: "Professional edits with full resolution",
    icon: CheckCircle,
  },
  {
    title: "No Watermark",
    description: "Clean, professional images every time",
    icon: Upload,
  },
  {
    title: "7-Day Access",
    description: "Download your edits anytime within 7 days",
    icon: Gift,
  },
];

export function FreeTrialUpload() {
  const [selectedService, setSelectedService] = useState("portrait");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleNewFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;
    setUploadedFiles((prev) => {
      const combined = [...prev, ...imageFiles];
      return combined.slice(0, 5);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleNewFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleNewFiles(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f7f6] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#F44336]">Free Trial</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Try <span className="text-[#F44336]">SnappEditt</span> Free
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Upload your photos and receive professional, high-quality edits � fast, secure, and hassle-free.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE8E5] text-[#E04632]">1</div>
                  <p className="text-sm font-semibold text-slate-900">Select Editing Service</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {serviceOptions.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`group rounded-3xl border px-4 py-4 text-center transition ${
                        selectedService === service.id
                          ? "border-[#F44336] bg-[#FFF0EF]"
                          : "border-slate-200 bg-white hover:border-[#F44336]"
                      }`}
                    >
                      <div
                        className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${
                          selectedService === service.id ? "bg-[#F44336]/10 text-[#F44336]" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{service.name}</div>
                      <div className="text-xs text-slate-500">{service.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-[1.75rem] border border-dashed p-8 text-center transition ${
                  isDragging ? "border-[#F44336] bg-[#FFF2F0]" : "border-[#F4A19B] bg-[#fff5f3]"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFilePicker}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F44336]/10 text-[#F44336]">
                  <Upload className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Drag & drop your images here</h2>
                <p className="mt-2 text-sm text-slate-600">or browse files</p>
                <button
                  type="button"
                  onClick={() => openFilePicker()}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#F44336] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F]"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <p className="mt-6 text-xs text-slate-500">
                  JPG, PNG, WEBP, RAW � Max 5 images � Up to 10MB each
                </p>

                {uploadedFiles.length > 0 && (
                  <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>Selected Images</span>
                      <span>{uploadedFiles.length}/5</span>
                    </div>
                    <div className="space-y-3">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#F44336]">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{file.name}</p>
                              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(index);
                            }}
                            className="text-sm font-semibold text-[#F44336] hover:text-[#D32F2F]"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE8E5] text-[#E04632]">3</div>
                  <p className="text-sm font-semibold text-slate-900">Enter Email Address</p>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-3xl bg-[#F44336] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F]"
              >
                Start Free Editing
              </button>

              <p className="text-center text-xs text-slate-500">No credit card required. No spam. Just great edits.</p>

              {submitted && (
                <div className="rounded-3xl border border-[#F4C0B9] bg-[#FFF2EF] px-5 py-4 text-sm text-[#B23125]">
                  Thank you! We will review your trial request and get back to you shortly.
                </div>
              )}
            </form>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-[#F1DCDA] bg-[#FFF4F1] p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F44336]/10 text-[#F44336]">
                <Gift className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Your Free Trial Includes</h2>
              <p className="text-sm text-slate-600">5 Images � Full Access � No Credit Card</p>
            </div>
            <div className="mt-8 space-y-4">
              {benefitItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F44336]/10 text-[#F44336]">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">4.9 / 5</p>
            <p className="mt-2 text-sm text-slate-600">Customer Rating</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">25K+</p>
            <p className="mt-2 text-sm text-slate-600">Images Edited</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">500+</p>
            <p className="mt-2 text-sm text-slate-600">Happy Clients</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">100%</p>
            <p className="mt-2 text-sm text-slate-600">Secure & Private</p>
          </div>
        </div>
      </div>
    </section>
  );
}
