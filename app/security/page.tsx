import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Security | SnappEditt",
  description:
    "Learn about the security practices used by SnappEditt to protect customer information and uploaded files.",
};

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Security"
      title="Security at SnappEditt"
      description="Protecting customer information and uploaded images is an important part of how we operate our post-production services."
      sections={[
        {
          id: "approach",
          title: "Our Security Approach",
          content: (
            <p>
              SnappEditt uses administrative, technical, and organizational
              safeguards designed to protect customer information, accounts,
              uploaded files, and business systems against unauthorized access,
              misuse, alteration, or loss.
            </p>
          ),
        },

        {
          id: "image-security",
          title: "Protection of Customer Images",
          content: (
            <>
              <p>
                Customer images and files submitted for editing are treated as
                private customer content and are not intended to be publicly
                accessible.
              </p>

              <p>
                Access should be limited to personnel and systems that require
                it to complete the requested editing work or maintain the
                services used to deliver that work.
              </p>
            </>
          ),
        },

        {
          id: "production",
          title: "Production Environment Controls",
          content: (
            <>
              <p>
                SnappEditt maintains operational controls intended to reduce
                unauthorized access to customer content in its production
                environment.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Access to customer files is restricted based on operational
                  requirements.
                </li>
                <li>
                  Customer content is handled through controlled production
                  workflows.
                </li>
                <li>
                  Access to systems and files may be protected through
                  authentication and authorization controls.
                </li>
                <li>
                  Physical and operational safeguards are used to reduce
                  unauthorized copying or access.
                </li>
              </ul>
            </>
          ),
        },

        {
          id: "account-security",
          title: "Account Security",
          content: (
            <p>
              Customers are responsible for maintaining the confidentiality of
              their passwords and account credentials. We recommend using a
              unique, strong password and contacting us immediately if you
              suspect unauthorized access to your account.
            </p>
          ),
        },

        {
          id: "payments",
          title: "Payment Security",
          content: (
            <p>
              Payment information may be processed through third-party payment
              providers. Where applicable, payment details are handled
              according to the security and privacy practices of the relevant
              payment provider rather than being unnecessarily stored within
              SnappEditt systems.
            </p>
          ),
        },

        {
          id: "employees",
          title: "Personnel and Access",
          content: (
            <p>
              Access to customer information should be provided only to people
              who need it to perform their assigned responsibilities. Personnel
              handling customer information are expected to follow applicable
              confidentiality and security requirements.
            </p>
          ),
        },

        {
          id: "incident",
          title: "Security Incidents",
          content: (
            <p>
              If we identify a security incident affecting customer information,
              we will assess the incident and take reasonable steps to contain,
              investigate, and address it. Where required by applicable law, we
              will provide relevant notifications.
            </p>
          ),
        },

        {
          id: "customer-responsibility",
          title: "Customer Responsibilities",
          content: (
            <>
              <p>
                Customers should also take reasonable steps to protect their
                information.
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Use strong and unique account credentials.</li>
                <li>Do not share account passwords.</li>
                <li>
                  Keep uploaded files and links protected when using external
                  file-transfer services.
                </li>
                <li>
                  Contact SnappEditt if suspicious activity is detected.
                </li>
              </ul>
            </>
          ),
        },

        {
          id: "contact",
          title: "Report a Security Concern",
          content: (
            <>
              <p>
                If you believe there is a security vulnerability or unauthorized
                access involving SnappEditt services, please contact us so the
                issue can be investigated.
              </p>

              <p>
                Email:{" "}
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