"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
 <section className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">
  <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

    {/* LEFT SIDE IMAGE */}
    <div className="relative hidden md:block bg-gradient-to-br from-red-500 to-red-600">
      <div className="absolute inset-0 bg-black/20" />


      <div className="absolute bottom-12 left-12 max-w-md text-white">
        <h2 className="text-4xl font-bold leading-tight">
          Welcome Back to Snappeditt
        </h2>

        <p className="mt-4 text-lg text-gray-200">
          Access your dashboard, upload images, track orders, and manage your
          professional photo editing projects.
        </p>

        <div className="mt-8 flex gap-8">
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-sm text-gray-300">Images Edited</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">24h</h3>
            <p className="text-sm text-gray-300">Delivery Time</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">99%</h3>
            <p className="text-sm text-gray-300">Happy Clients</p>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE LOGIN FORM */}
    <div className="flex items-center p-8 md:p-12">
      <div className="mx-auto w-full max-w-md">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your Snappeditt account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="you@snappeditt.com"
              className="
                mt-1
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                focus:border-red-500
                focus:outline-none
              "
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
            </div>

            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="
                mt-1
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                focus:border-red-500
                focus:outline-none
              "
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="rounded border-gray-300"
              />
              Remember me
            </label>
               <a
                href="/forgot-password"
                className="text-sm text-red-500 hover:text-red-600"
              >
                Forgot Password?
              </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-red-600
              py-3
              font-semibold
              text-white
              shadow-lg
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-red-500 hover:text-red-600"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  </div>
</section>
  );
}
