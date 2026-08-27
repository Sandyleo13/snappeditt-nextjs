import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | SnappEditt",
  description:
    "Terms governing the use of the SnappEditt website and professional photo editing services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      description="These Terms of Service describe the rules and conditions that apply when you access the SnappEditt website or use our photo editing and post-production services."
      sections={[
        {
          id: "acceptance",
          title: "Acceptance of Terms",
          content: (
            <p>
              By accessing the SnappEditt website, creating an account,
              submitting an order, or using our services, you agree to comply
              with these Terms of Service and any applicable policies referenced
              by them.
            </p>
          ),
        },

        {
          id: "services",
          title: "Our Services",
          content: (
            <>
              <p>
                SnappEditt provides professional photo editing and
                post-production services, including services for real estate,
                3D imagery, wedding and events, product and e-commerce,
                people retouching, clipping path and extraction, and related
                custom editing requirements.
              </p>

              <p>
                Service availability, turnaround times, pricing, deliverables,
                and technical requirements may vary depending on the selected
                service and order.
              </p>
            </>
          ),
        },

        {
          id: "accounts",
          title: "Accounts",
          content: (
            <>
              <p>
                If you create an account, you are responsible for providing
                accurate information and maintaining the confidentiality of
                your account credentials.
              </p>

              <p>
                You are responsible for activity performed through your
                account and should notify us if you believe your credentials
                have been compromised.
              </p>
            </>
          ),
        },

        {
          id: "customer-content",
          title: "Customer Content",
          content: (
            <>
              <p>
                You retain your rights in images, files, instructions,
                references, and other materials that you submit to SnappEditt.
              </p>

              <p>
                By submitting content, you represent that you have the
                necessary rights, permissions, and authority to provide that
                content to us for processing.
              </p>

              <p>
                You authorize SnappEditt to access, process, modify, and
                deliver the submitted content solely as reasonably necessary to
                provide the requested service.
              </p>
            </>
          ),
        },

        {
          id: "prohibited",
          title: "Prohibited Use",
          content: (
            <>
              <p>You must not use our services to:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Upload content you do not have the right to use.</li>
                <li>
                  Violate applicable laws, regulations, or third-party rights.
                </li>
                <li>
                  Attempt to gain unauthorized access to our systems or
                  accounts.
                </li>
                <li>
                  Interfere with the operation or security of the website.
                </li>
                <li>
                  Submit malicious files, software, or other harmful material.
                </li>
              </ul>
            </>
          ),
        },

        {
          id: "orders",
          title: "Orders and Deliverables",
          content: (
            <>
              <p>
                Orders are processed according to the service, package,
                instructions, files, and requirements submitted by the
                customer.
              </p>

              <p>
                Customers are responsible for reviewing submitted instructions
                and source materials before placing an order.
              </p>

              <p>
                Where revisions or corrections are included with a service,
                they will be handled according to the applicable service terms
                or order arrangement.
              </p>
            </>
          ),
        },

        {
          id: "payment",
          title: "Payments",
          content: (
            <>
              <p>
                Prices and payment requirements are presented during the
                applicable ordering or quotation process.
              </p>

              <p>
                You agree to provide valid payment information when payment is
                required and to pay applicable charges associated with your
                order.
              </p>
            </>
          ),
        },

        {
          id: "intellectual-property",
          title: "Intellectual Property",
          content: (
            <>
              <p>
                The SnappEditt website, branding, design, software, text,
                graphics, and other website materials are owned by or licensed
                to SnappEditt unless otherwise stated.
              </p>

              <p>
                These Terms do not transfer ownership of customer content to
                SnappEditt.
              </p>
            </>
          ),
        },

        {
          id: "availability",
          title: "Service Availability",
          content: (
            <p>
              We aim to keep our website and services available and reliable,
              but we do not guarantee uninterrupted or error-free availability.
              Maintenance, technical issues, network failures, or circumstances
              outside our reasonable control may temporarily affect service.
            </p>
          ),
        },

        {
          id: "liability",
          title: "Limitation of Liability",
          content: (
            <p>
              To the extent permitted by applicable law, SnappEditt will not be
              responsible for indirect, incidental, special, consequential, or
              similar losses arising from the use of the website or services.
              Nothing in these Terms is intended to exclude liability that
              cannot legally be excluded.
            </p>
          ),
        },

        {
          id: "changes",
          title: "Changes to These Terms",
          content: (
            <p>
              We may modify these Terms from time to time. Updated Terms will
              be published on this page with an updated effective date.
            </p>
          ),
        },

        {
          id: "contact",
          title: "Contact",
          content: (
            <>
              <p>
                Questions about these Terms can be sent to:
              </p>

              <p>
                <a
                  href="mailto:sales@snappeditt.com"
                  className="font-medium text-red-600 hover:underline"
                >
                  sales@snappeditt.com
                </a>
              </p>
            </>
          ),
        },
      ]}
    />
  );
}