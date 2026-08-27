"use client";

import {
  useState,
  useRef,
  type DragEvent,
  type FormEvent,
} from "react";

import {
  Upload,
  Gift,
  Heart,
  Home,
  Image as ImageIcon,
  Scissors,
  Shield,
  Zap,
  CheckCircle,
  Link2,
  X,
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
    time: "2-3 min",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: Heart,
    time: "4-5 min",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Home,
    time: "3-4 min",
  },
  {
    id: "product",
    name: "Product",
    icon: ImageIcon,
    time: "2-3 min",
  },
  {
    id: "background-removal",
    name: "Background Removal",
    icon: Scissors,
    time: "1-2 min",
  },
];

const benefitItems: Array<{
  title: string;
  description: string;
  icon: typeof Upload;
}> = [
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
  const [selectedService, setSelectedService] =
    useState("portrait");

  const [uploadedFiles, setUploadedFiles] =
    useState<File[]>([]);

  const [imageLinks, setImageLinks] =
    useState<string[]>([]);

  const [imageUrl, setImageUrl] = useState("");

  const [isDragging, setIsDragging] =
    useState(false);

  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const totalImages =
    uploadedFiles.length + imageLinks.length;

  const remainingImages = Math.max(
    0,
    5 - totalImages
  );

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

    if (remainingImages <= 0) {
      return;
    }

    if (!isValidImageUrl(trimmedUrl)) {
      return;
    }

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
    <section className="relative w-full overflow-hidden bg-[#f8f7f6] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#F44336]">
            Free Trial
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Try{" "}
            <span className="text-[#F44336]">
              SnappEditt
            </span>{" "}
            Free
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Upload your photos and receive professional,
            high-quality edits — fast, secure, and hassle-free.
          </p>
        </div>

        {/* Main Grid */}

        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">

          {/* LEFT */}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* STEP 1 */}

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">

                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE8E5] text-[#E04632]">
                    1
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Select Editing Service
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">

                  {serviceOptions.map(
                    (service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() =>
                          setSelectedService(
                            service.id
                          )
                        }
                        className={`group rounded-3xl border px-4 py-4 text-center transition ${
                          selectedService ===
                          service.id
                            ? "border-[#F44336] bg-[#FFF0EF]"
                            : "border-slate-200 bg-white hover:border-[#F44336]"
                        }`}
                      >

                        <div
                          className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${
                            selectedService ===
                            service.id
                              ? "bg-[#F44336]/10 text-[#F44336]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <service.icon className="h-5 w-5" />
                        </div>

                        <div className="text-sm font-semibold text-slate-900">
                          {service.name}
                        </div>

                        <div className="text-xs text-slate-500">
                          {service.time}
                        </div>

                      </button>
                    )
                  )}

                </div>
              </div>

              {/* STEP 2 */}

              <div>

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE8E5] text-[#E04632]">
                    2
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Upload Your Images
                  </p>
                </div>

                {/* Upload Box */}

                <div
                  className={`rounded-[1.75rem] border border-dashed p-8 text-center transition ${
                    isDragging
                      ? "border-[#F44336] bg-[#FFF2F0]"
                      : "border-[#F4A19B] bg-[#fff5f3]"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >

                  {/* Upload Icon */}

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F44336]/10 text-[#F44336]">
                    <Upload className="h-7 w-7" />
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Drag & drop your images here
                  </h2>

                  <p className="mt-2 text-sm text-slate-600">
                    or browse files
                  </p>

                  {/* Browse */}

                  <button
                    type="button"
                    onClick={openFilePicker}
                    disabled={
                      remainingImages <= 0
                    }
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-[#F44336] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F] disabled:cursor-not-allowed disabled:opacity-50"
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

                  {/* Divider */}

                  <div className="mx-auto mt-6 flex max-w-md items-center gap-4">
                    <div className="h-px flex-1 bg-slate-200" />

                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      or
                    </span>

                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  {/* Image Link */}

                  <div className="mx-auto mt-5 max-w-lg">

                    <p className="mb-2 text-sm font-medium text-slate-700">
                      Or paste image link
                    </p>

                    <div className="relative">

                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) =>
                          setImageUrl(
                            e.target.value
                          )
                        }
                        onKeyDown={
                          handleImageUrlKeyDown
                        }
                        placeholder="https://example.com/image.jpg"
                        disabled={
                          remainingImages <= 0
                        }
                        className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20 disabled:bg-slate-100"
                      />

                      <button
                        type="button"
                        onClick={addImageLink}
                        disabled={
                          !imageUrl.trim() ||
                          remainingImages <= 0
                        }
                        aria-label="Add image link"
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-[#F44336] transition hover:bg-[#FFF0EF] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Link2 className="h-5 w-5" />
                      </button>

                    </div>

                  </div>

                  {/* Upload Info */}

                  <p className="mt-5 text-xs text-slate-500">
                    Max 5 images • Up to 10MB each
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Files + image links combined
                  </p>

                  {/* Selected Files */}

                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm">

                      <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                        <span>
                          Uploaded Images
                        </span>

                        <span>
                          {totalImages}/5
                        </span>
                      </div>

                      <div className="space-y-3">

                        {uploadedFiles.map(
                          (file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700"
                            >

                              <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#F44336]">
                                  <ImageIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">

                                  <p className="truncate font-medium">
                                    {file.name}
                                  </p>

                                  <p className="text-xs text-slate-500">
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
                                className="shrink-0 text-sm font-semibold text-[#F44336] hover:text-[#D32F2F]"
                              >
                                Remove
                              </button>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  {/* Linked Images */}

                  {imageLinks.length > 0 && (
                    <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm">

                      <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-900">
                        <span>
                          Linked Images
                        </span>

                        <span>
                          {totalImages}/5
                        </span>
                      </div>

                      <div className="space-y-3">

                        {imageLinks.map(
                          (link, index) => (
                            <div
                              key={`${link}-${index}`}
                              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                            >

                              <div className="flex min-w-0 items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#F44336]">
                                  <Link2 className="h-5 w-5" />
                                </div>

                                <p className="truncate text-sm font-medium text-slate-700">
                                  {link}
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeImageLink(
                                    index
                                  )
                                }
                                aria-label="Remove image link"
                                className="shrink-0 text-slate-400 transition hover:text-[#F44336]"
                              >
                                <X className="h-5 w-5" />
                              </button>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* STEP 3 */}

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">

                <div className="mb-3 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FDE8E5] text-[#E04632]">
                    3
                  </div>

                  <p className="text-sm font-semibold text-slate-900">
                    Enter Email Address
                  </p>

                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="youremail@example.com"
                  required
                  className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={
                  totalImages === 0 ||
                  !email
                }
                className="w-full rounded-3xl bg-[#F44336] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#F44336]/20 transition hover:bg-[#D32F2F] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start Free Editing
              </button>

              <p className="text-center text-xs text-slate-500">
                No credit card required. No spam.
                Just great edits.
              </p>

              {/* Submitted */}

              {submitted && (
                <div className="rounded-3xl border border-[#F4C0B9] bg-[#FFF2EF] px-5 py-4 text-sm text-[#B23125]">
                  Thank you! We will review your
                  trial request and get back to you
                  shortly.
                </div>
              )}

            </form>

          </div>

          {/* RIGHT */}

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">

            {/* Trial */}

            <div className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-[#F1DCDA] bg-[#FFF4F1] p-8 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F44336]/10 text-[#F44336]">
                <Gift className="h-7 w-7" />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Your Free Trial Includes
              </h2>

              <p className="text-sm text-slate-600">
                5 Images • Full Access • No Credit Card
              </p>

            </div>

            {/* Benefits */}

            <div className="mt-8 space-y-4">

              {benefitItems.map(
                (item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-4"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F44336]/10 text-[#F44336]">
                      <item.icon className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="font-semibold text-slate-900">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-600">
                        {item.description}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">
              4.9 / 5
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Customer Rating
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">
              25K+
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Images Edited
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">
              500+
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Happy Clients
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-2xl font-bold text-slate-950">
              100%
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Secure & Private
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}