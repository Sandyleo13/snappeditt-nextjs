"use client";

import {
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Gift,
  Heart,
  Home,
  Image as ImageIcon,
  Link2,
  LockKeyhole,
  Scissors,
  Shield,
  Sparkles,
  Upload,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

const serviceOptions: Array<{
  id: string;
  name: string;
  icon: LucideIcon;
  time: string;
}> = [
  {
    id: "portrait",
    name: "Portrait",
    icon: Heart,
    time: "2–3 min",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: Sparkles,
    time: "4–5 min",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    time: "3–4 min",
  },
  {
    id: "product",
    name: "Product",
    icon: ImageIcon,
    time: "2–3 min",
  },
  {
    id: "background-removal",
    name: "Background Removal",
    icon: Scissors,
    time: "1–2 min",
  },
];

const benefitItems: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Secure & Private",
    description:
      "Your images are handled through a secure and confidential workflow.",
    icon: Shield,
  },
  {
    title: "Fast Turnaround",
    description:
      "Get professional-quality edits without unnecessary delays.",
    icon: Zap,
  },
  {
    title: "Professional Quality",
    description:
      "High-quality editing prepared for professional photography workflows.",
    icon: CheckCircle,
  },
  {
    title: "No Watermark",
    description:
      "Receive clean, professional images without unwanted branding.",
    icon: ImageIcon,
  },
  {
    title: "5 Images Included",
    description:
      "Submit up to five images so you can properly evaluate the service.",
    icon: Gift,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Choose your service",
    description:
      "Select the type of photo editing you need from the available services.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Upload your images",
    description:
      "Send up to five sample images through the secure trial form.",
    icon: Upload,
  },
  {
    number: "03",
    title: "Tell us where to send them",
    description:
      "Enter your email address so we can follow up with your edited images.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Review the quality",
    description:
      "See the results and decide whether our editing workflow fits your needs.",
    icon: ArrowRight,
  },
];

const serviceHighlights = [
  "Real Estate Photo Editing",
  "Wedding Photo Retouching",
  "Product & Ecommerce Editing",
  "Portrait Retouching",
  "Background Removal",
  "Professional Image Enhancement",
];

export function FreeTrialUpload() {
  const [selectedService, setSelectedService] = useState("portrait");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [isDragging, setIsDragging] = useState(false);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalImages = uploadedFiles.length + imageLinks.length;

  const remainingImages = Math.max(0, 5 - totalImages);

  /* =========================================================
     FILE UPLOAD
  ========================================================= */

  const openFilePicker = () => {
    if (remainingImages <= 0) return;

    fileInputRef.current?.click();
  };

  const handleNewFiles = (files: File[]) => {
    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (!imageFiles.length) return;

    setUploadedFiles((prev) => {
      const availableSlots = Math.max(
        0,
        5 - imageLinks.length - prev.length
      );

      const allowedFiles = imageFiles.slice(
        0,
        availableSlots
      );

      return [...prev, ...allowedFiles];
    });
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      handleNewFiles(Array.from(e.target.files));
    }

    e.target.value = "";
  };

  /* =========================================================
     DRAG & DROP
  ========================================================= */

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsDragging(false);

    if (remainingImages <= 0) return;

    handleNewFiles(
      Array.from(e.dataTransfer.files)
    );
  };

  /* =========================================================
     REMOVE FILES
  ========================================================= */

  const removeFile = (index: number) => {
    setUploadedFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const removeImageLink = (index: number) => {
    setImageLinks((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* =========================================================
     IMAGE LINK
  ========================================================= */

  const isValidImageUrl = (url: string) => {
    try {
      const parsed = new URL(url);

      return (
        parsed.protocol === "http:" ||
        parsed.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  const addImageLink = () => {
    const trimmedUrl = imageUrl.trim();

    if (!trimmedUrl) return;

    if (remainingImages <= 0) return;

    if (!isValidImageUrl(trimmedUrl)) return;

    if (imageLinks.includes(trimmedUrl)) {
      setImageUrl("");
      return;
    }

    setImageLinks((prev) => [
      ...prev,
      trimmedUrl,
    ]);

    setImageUrl("");
  };

  const handleImageUrlKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageLink();
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f6] text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-red-100/70 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/2 h-[360px] w-[360px] rounded-full bg-orange-100/50 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[#E53935] shadow-sm">
              <Gift className="h-4 w-4" />

              Free Photo Editing Trial
            </div>

            {/* H1 */}
            <h1 className="mt-7 text-4xl font-extrabold leading-[1.03] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Professional Photo Editing.
              <span className="block text-[#E53935]">
                Try Us Free.
              </span>
            </h1>

            {/* SEO copy */}
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Experience professional photo editing with Snapedit.
              Send us your images and see how our editors can transform
              real estate photos, wedding photography, product images,
              portraits, and more before you commit to a paid service.
            </p>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Up to 5 images
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Shield className="h-4 w-4 text-emerald-500" />
                Secure workflow
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CreditCard className="h-4 w-4 text-emerald-500" />
                No credit card
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ImageIcon className="h-4 w-4 text-emerald-500" />
                No watermark
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN TRIAL AREA
      ===================================================== */}
      <section
        id="start-free-trial"
        className="relative px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.75fr)]">

            {/* =================================================
                LEFT: TRIAL FORM
            ================================================= */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-7 lg:p-9">

              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >

                {/* =================================================
                    STEP 1
                ================================================= */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDE8E5] text-sm font-bold text-[#D32F2F]">
                      1
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E53935]">
                        Step 1
                      </p>

                      <h2 className="mt-0.5 text-lg font-bold text-slate-950">
                        Choose your editing service
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {serviceOptions.map((service) => {
                      const ServiceIcon = service.icon;

                      const isSelected =
                        selectedService === service.id;

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() =>
                            setSelectedService(service.id)
                          }
                          className={`group rounded-2xl border p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-[#F44336] bg-[#FFF1EF] shadow-sm"
                              : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-[#F44336]/50 hover:shadow-sm"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                              isSelected
                                ? "bg-[#F44336] text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-[#F44336]/10 group-hover:text-[#F44336]"
                            }`}
                          >
                            <ServiceIcon className="h-5 w-5" />
                          </div>

                          <p className="mt-3 text-sm font-bold text-slate-900">
                            {service.name}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="h-3.5 w-3.5" />
                            {service.time}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* =================================================
                    STEP 2
                ================================================= */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDE8E5] text-sm font-bold text-[#D32F2F]">
                      2
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E53935]">
                        Step 2
                      </p>

                      <h2 className="mt-0.5 text-lg font-bold text-slate-950">
                        Upload your images
                      </h2>
                    </div>
                  </div>

                  {/* Upload box */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`rounded-[1.75rem] border-2 border-dashed p-7 text-center transition-all sm:p-10 ${
                      isDragging
                        ? "border-[#F44336] bg-[#FFF0EE] shadow-inner"
                        : "border-[#F2B0AA] bg-[#FFF7F5] hover:border-[#F44336]/60"
                    }`}
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F44336]/10 text-[#F44336]">
                      <Upload className="h-7 w-7" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-950">
                      Drop your images here
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                      Drag and drop your photos or browse your device.
                    </p>

                    <button
                      type="button"
                      onClick={openFilePicker}
                      disabled={remainingImages <= 0}
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#F44336] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Upload className="h-4 w-4" />
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

                    {/* OR */}
                    <div className="mx-auto mt-7 flex max-w-md items-center gap-4">
                      <div className="h-px flex-1 bg-slate-200" />

                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                        Or
                      </span>

                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    {/* URL */}
                    <div className="mx-auto mt-5 max-w-xl text-left">
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Paste an image link
                      </label>

                      <div className="relative">
                        <Link2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) =>
                            setImageUrl(e.target.value)
                          }
                          onKeyDown={handleImageUrlKeyDown}
                          placeholder="https://example.com/image.jpg"
                          disabled={remainingImages <= 0}
                          className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-14 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F44336] focus:ring-4 focus:ring-[#F44336]/10 disabled:bg-slate-100"
                        />

                        <button
                          type="button"
                          onClick={addImageLink}
                          disabled={
                            !imageUrl.trim() ||
                            remainingImages <= 0
                          }
                          aria-label="Add image link"
                          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-[#F44336] transition hover:bg-[#FFF0EF] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                        Up to 5 images
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                        Up to 10MB each
                      </span>

                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                        JPG, PNG, WEBP
                      </span>
                    </div>
                  </div>

                  {/* Uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-950">
                            Uploaded images
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Your selected files
                          </p>
                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          {totalImages}/5
                        </span>
                      </div>

                      <div className="space-y-2">
                        {uploadedFiles.map(
                          (file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#F44336]">
                                  <ImageIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-slate-800">
                                    {file.name}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-500">
                                    {(
                                      file.size /
                                      1024 /
                                      1024
                                    ).toFixed(1)}{" "}
                                    MB
                                  </p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeFile(index)
                                }
                                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-[#F44336] transition hover:bg-[#FFF0EF]"
                              >
                                Remove
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image links */}
                  {imageLinks.length > 0 && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-slate-950">
                            Linked images
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            Images added by URL
                          </p>
                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          {totalImages}/5
                        </span>
                      </div>

                      <div className="space-y-2">
                        {imageLinks.map(
                          (link, index) => (
                            <div
                              key={`${link}-${index}`}
                              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                            >
                              <div className="flex min-w-0 items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#F44336]">
                                  <Link2 className="h-5 w-5" />
                                </div>

                                <p className="truncate text-sm font-medium text-slate-700">
                                  {link}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeImageLink(index)
                                }
                                aria-label="Remove image link"
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#FFF0EF] hover:text-[#F44336]"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* =================================================
                    STEP 3
                ================================================= */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDE8E5] text-sm font-bold text-[#D32F2F]">
                      3
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E53935]">
                        Step 3
                      </p>

                      <h2 className="mt-0.5 text-lg font-bold text-slate-950">
                        Enter your email
                      </h2>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F44336] focus:ring-4 focus:ring-[#F44336]/10"
                    />

                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* =================================================
                    SUBMIT
                ================================================= */}
                <div>
                  <button
                    type="submit"
                    disabled={
                      totalImages === 0 ||
                      !email
                    }
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F44336] px-6 py-4 text-base font-bold text-white shadow-xl shadow-[#F44336]/20 transition-all hover:-translate-y-0.5 hover:bg-[#D32F2F] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    Start My Free Trial

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <LockKeyhole className="h-3.5 w-3.5" />

                    No credit card required. No long-term commitment.
                  </div>
                </div>

                {/* Submitted */}
                {submitted && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                      <div>
                        <p className="font-bold text-emerald-900">
                          Your free trial request has been received.
                        </p>

                        <p className="mt-1 text-sm leading-6 text-emerald-800">
                          We&apos;ll review your trial details and get back
                          to you shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* =================================================
                RIGHT: VALUE / TRUST
            ================================================= */}
            <aside className="xl:sticky xl:top-6">

              {/* Trial card */}
              <div className="overflow-hidden rounded-[2rem] border border-red-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.08)]">

                <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF0ED] via-[#FFF7F5] to-white p-7 sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-200/50 blur-3xl"
                  />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F44336] text-white shadow-lg shadow-[#F44336]/20">
                      <Gift className="h-7 w-7" />
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-[#D32F2F]">
                      Your free trial
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                      See our editing quality before you commit.
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Submit sample images and experience a professional
                      editing workflow for yourself.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xl font-extrabold text-slate-950">
                          5
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Images
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white p-4 shadow-sm">
                        <p className="text-xl font-extrabold text-slate-950">
                          $0
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Trial cost
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-base font-bold text-slate-950">
                    What&apos;s included
                  </h3>

                  <div className="mt-5 space-y-3">
                    {benefitItems.map((item) => {
                      const BenefitIcon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#F44336] shadow-sm">
                            <BenefitIcon className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {item.title}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="border-y border-slate-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Your free photo editing trial in four simple steps.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              No complicated setup. Choose a service, send your images,
              and see the quality for yourself.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#F44336] shadow-sm transition group-hover:bg-[#F44336] group-hover:text-white">
                      <StepIcon className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-extrabold text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES SEO SECTION
      ===================================================== */}
      <section className="bg-[#f8f7f6] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
                Professional Photo Editing
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                One editing partner for your entire photography workflow.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Whether you photograph properties, weddings, products,
                people, or ecommerce catalogs, Snapedit helps you turn
                your original images into polished, professional-ready
                photographs.
              </p>

              <Link
                href="#start-free-trial"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#F44336] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F]"
              >
                Try Photo Editing Free

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {serviceHighlights.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0ED] text-[#F44336]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <p className="text-sm font-bold text-slate-800">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TRUST / STATS
      ===================================================== */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0ED] text-[#F44336]">
                <Users className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-extrabold text-slate-950">
                500+
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Happy Clients
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0ED] text-[#F44336]">
                <ImageIcon className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-extrabold text-slate-950">
                25K+
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Images Edited
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0ED] text-[#F44336]">
                <Sparkles className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-extrabold text-slate-950">
                4.9/5
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Customer Rating
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0ED] text-[#F44336]">
                <Shield className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-extrabold text-slate-950">
                100%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Secure & Private
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <section className="bg-[#f8f7f6] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E53935]">
              Free Trial FAQs
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Questions before you start?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Here are answers to some of the most common questions
              about the Snapedit photo editing trial.
            </p>
          </div>

          <div className="mt-10 space-y-3">

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                Is the Snapedit photo editing trial free?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. The purpose of the free trial is to let you
                experience our professional photo editing quality before
                choosing a paid service.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                How many images can I submit?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                The current trial form allows up to five images,
                including uploaded files and image links combined.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                What types of photo editing are available?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                You can request services including portrait retouching,
                wedding photo editing, real estate photo editing,
                product editing, and background removal.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                Do I need a credit card?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                No credit card is required to submit your free trial
                request.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                Can I use the trial for my photography business?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. The trial is designed to help photographers,
                ecommerce businesses, agencies, and creative teams
                evaluate whether our editing workflow fits their needs.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                What happens after the free trial?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                After reviewing the results, you can continue with the
                editing service and workflow that best fits your project.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-slate-950 px-7 py-12 text-white sm:px-10 lg:px-14 lg:py-16">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/20 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-red-500/10 blur-3xl"
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">
                  Ready to try?
                </p>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  See the difference professional editing can make.
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Send your photos today and experience Snapedit before
                  committing to a paid editing workflow.
                </p>
              </div>

              <Link
                href="#start-free-trial"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#F44336] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-red-950/30 transition hover:bg-[#EF5350]"
              >
                Start Free Trial

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}