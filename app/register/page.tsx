import type { Metadata } from "next";
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Your Snappeditt Account",
  description:
    "Register on Snappeditt to access professional photo editing services. Create your account in seconds.",
};

export default function RegisterPage() {
   
  return (
        
    <section className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6">
  <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2">

    {/* LEFT SIDE IMAGE */}
    <div className="relative bg-[#F44336] hidden md:block">
      {/* <img
        src="/images/register-banner.jpg"
        alt="Photo Editing"
        className="h-full w-full object-cover"
      /> */}

    

      <div className="absolute bottom-12 left-12 text-white max-w-md">
        <h2 className="text-4xl font-bold leading-tight">
          Professional Photo Editing Services
        </h2>

        <p className="mt-4 text-gray-200 text-lg">
          Join thousands of photographers, real estate agents and ecommerce
          brands using Snappeditt.
        </p>

        <div className="mt-8 flex gap-6">
          <div>
            <h3 className="text-3xl font-bold">50K+</h3>
            <p className="text-sm text-gray-300">Images Edited</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">24h</h3>
            <p className="text-sm text-gray-300">Fast Delivery</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">99%</h3>
            <p className="text-sm text-gray-300">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE FORM */}
    <div className="p-8 md:p-12 flex items-center">
      <div className="w-full max-w-md mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Start your free journey with Snappeditt
          </p>
        </div>

        <form
          action="/api/register"
          method="POST"
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                required
                placeholder="John"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                required
                placeholder="Doe"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              required
              placeholder="+91 98765 43210"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-red-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
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
            "
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-red-500 hover:text-red-600"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </div>
</section>
  );

}
