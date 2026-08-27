import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SnappEditt",
  description:
    "Learn how SnappEditt collects, uses, protects, and manages personal information and uploaded content.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      description="At SnappEditt, we take the privacy of our customers, their information, and their uploaded images seriously. This policy explains how information is collected, used, protected, and handled when you use our website and services."
      sections={[
        {
          id: "information",
          title: "Information We Collect",
          content: (
            <>
              <p>
                We may collect information that you provide when creating an
                account, requesting a quote, contacting us, placing an order,
                requesting a free trial, or using our services.
              </p>

              <p>
                This may include your name, email address, phone number,
                billing or account information, service preferences, order
                information, and communications with our team.
              </p>

              <p>
                When you upload images, files, references, or other material
                for editing, we process that content solely as necessary to
                provide the requested service.
              </p>
            </>
          ),
        },

        {
          id: "use",
          title: "How We Use Information",
          content: (
            <>
              <p>
                We use information to provide and operate our services,
                process orders, communicate with customers, provide support,
                manage accounts, and improve our products and workflows.
              </p>

              <p>
                We may also use information to maintain website security,
                prevent misuse, troubleshoot technical issues, and comply with
                applicable legal obligations.
              </p>
            </>
          ),
        },

        {
          id: "images",
          title: "Uploaded Images and Files",
          content: (
            <>
              <p>
                Images and files submitted for editing are treated as customer
                content and are not intended to be publicly accessible.
              </p>

              <p>
                Access to customer content should be limited to personnel and
                service providers who require access to perform the requested
                work or maintain the systems used to provide the service.
              </p>

              <p>
                Customers should not upload content that they do not have the
                right or permission to provide for processing.
              </p>
            </>
          ),
        },

        {
          id: "sharing",
          title: "Information Sharing",
          content: (
            <>
              <p>
                SnappEditt does not sell or rent personal information to third
                parties.
              </p>

              <p>
                Information may be shared with trusted service providers when
                reasonably necessary to operate our website, process payments,
                provide hosting or infrastructure, deliver customer support,
                or otherwise provide a service requested by you.
              </p>

              <p>
                We may also disclose information where required by applicable
                law, legal process, or to protect our rights, customers, or
                systems.
              </p>
            </>
          ),
        },

        {
          id: "cookies",
          title: "Cookies and Similar Technologies",
          content: (
            <>
              <p>
                Our website may use cookies and similar technologies to
                maintain functionality, remember preferences, understand
                website usage, and improve the user experience.
              </p>

              <p>
                Depending on your browser and applicable law, you may be able
                to control or delete cookies through your browser settings.
              </p>
            </>
          ),
        },

        {
          id: "security",
          title: "Data Security",
          content: (
            <>
              <p>
                We use reasonable administrative, technical, and organizational
                measures designed to protect personal information and customer
                content against unauthorized access, misuse, alteration, loss,
                or disclosure.
              </p>

              <p>
                No internet-based service can guarantee absolute security.
                Customers should use strong passwords and protect their
                account credentials.
              </p>
            </>
          ),
        },

        {
          id: "retention",
          title: "Data Retention",
          content: (
            <>
              <p>
                We retain information for as long as reasonably necessary for
                the purpose for which it was collected, including providing
                services, maintaining business records, resolving disputes,
                enforcing agreements, and meeting legal or regulatory
                obligations.
              </p>

              <p>
                Retention periods may vary depending on the type of information
                and the reason it is being retained.
              </p>
            </>
          ),
        },

        {
          id: "rights",
          title: "Your Privacy Rights",
          content: (
            <>
              <p>
                Depending on your location and applicable law, you may have
                rights to request access to, correction of, deletion of, or
                information about personal data associated with you.
              </p>

              <p>
                You may contact us if you want to exercise an applicable
                privacy right or ask questions about information associated
                with your account.
              </p>
            </>
          ),
        },

        {
          id: "changes",
          title: "Changes to This Policy",
          content: (
            <p>
              We may update this Privacy Policy from time to time. When
              changes are made, we will update the effective date shown on this
              page. Continued use of the website after an updated policy is
              published may be subject to the revised policy.
            </p>
          ),
        },

        {
          id: "contact",
          title: "Contact Us",
          content: (
            <>
              <p>
                If you have questions about this Privacy Policy or the handling
                of your personal information, contact SnappEditt.
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