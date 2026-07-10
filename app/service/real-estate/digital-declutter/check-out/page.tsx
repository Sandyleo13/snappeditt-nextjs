import { cookies } from "next/headers";

import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout – Portrait headshot | Snappeditt",
  description:
    "Customize your Portrait headshot photo editing order with add-ons.",
};

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("snappeditt_user");
  const isLoggedIn = !!userCookie?.value;

  return (
    <>


      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT SIDE */}
          <section>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/single-exposure.jpg"
                alt="Single Exposure"
                className="w-full"
              />
            </div>

            <div className="mt-6 text-sm text-gray-700 space-y-4">
              <p>
                This service is suitable for clients who need perfect and
                natural color tone. Our professional editors work with modern
                digital tools to provide the best possible result.
              </p>

              <div>
                <h3 className="font-semibold mb-2">
                  Our experts follow the steps:
                </h3>

                <ol className="list-decimal ml-5 space-y-1">
                  <li>Color Correction</li>
                  <li>Color Cast Removal – Minimal</li>
                  <li>Lens Correction</li>
                  <li>Perspective Correction</li>
                  <li>Sharpening</li>
                  <li>Output: JPEG, TIFF, PSD</li>
                </ol>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE FORM */}
          <CheckoutClient isLoggedIn={isLoggedIn} />
        </div>

     
      </main>

      
    </>
  );
}
