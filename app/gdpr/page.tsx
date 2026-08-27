import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "GDPR & Data Protection | SnappEditt",
  description:
    "Information about data protection rights and requests under the GDPR and other applicable privacy laws.",
};

export default function GDPRPage() {
  return (
    <LegalPage
      eyebrow="Data Protection"
      title="GDPR & Data Protection"
      description="SnappEditt respects privacy rights and aims to handle personal information responsibly. This page explains the rights and data-protection principles that may apply to customers located in the European Economic Area, the United Kingdom, and other jurisdictions with similar privacy laws."
      sections={[
        {
          id: "scope",
          title: "Who This Applies To",
          content: (
            <p>
              This page is intended to explain how SnappEditt approaches
              privacy rights that may apply under the General Data Protection
              Regulation (GDPR), UK GDPR, or similar applicable data-protection
              laws. The specific rights available to an individual depend on
              their location and circumstances.
            </p>
          ),
        },

        {
          id: "data",
          title: "Personal Data We May Process",
          content: (
            <>
              <p>
                Depending on how you interact with SnappEditt, personal data
                may include your name, contact details, account information,
                order information, communications, billing information, and
                technical information associated with your use of the website.
              </p>

              <p>
                Images and files submitted for editing may also contain
                information relating to identifiable individuals. Customers
                remain responsible for ensuring that they have an appropriate
                legal basis and permissions to provide such content to us.
              </p>
            </>
          ),
        },

        {
          id: "purposes",
          title: "Why We Process Personal Data",
          content: (
            <>
              <p>Personal information may be processed to:</p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Provide requested editing and post-production services.</li>
                <li>Manage customer accounts and orders.</li>
                <li>Communicate about orders and customer support.</li>
                <li>Process payments and related transactions.</li>
                <li>Maintain website and system security.</li>
                <li>Improve services and operational workflows.</li>
                <li>Meet applicable legal and regulatory requirements.</li>
              </ul>
            </>
          ),
        },

        {
          id: "legal-bases",
          title: "Legal Bases",
          content: (
            <p>
              Where GDPR or similar legislation applies, processing may rely
              on an appropriate legal basis such as performance of a contract,
              compliance with a legal obligation, legitimate interests, or
              consent where consent is required.
            </p>
          ),
        },

        {
          id: "rights",
          title: "Your Data Protection Rights",
          content: (
            <>
              <p>
                Depending on applicable law, you may have the right to:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>Request access to personal information.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of personal information.</li>
                <li>
                  Request restriction of processing in certain circumstances.
                </li>
                <li>
                  Object to certain processing, including processing based on
                  legitimate interests.
                </li>
                <li>
                  Request portability of certain information where applicable.
                </li>
                <li>
                  Withdraw consent where processing is based on consent.
                </li>
              </ul>
            </>
          ),
        },

        {
          id: "requests",
          title: "How to Make a Request",
          content: (
            <>
              <p>
                To submit a privacy or data-protection request, contact us
                using the details below. Please provide enough information for
                us to understand the request and verify the relevant account or
                identity where reasonably necessary.
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

        {
          id: "verification",
          title: "Identity Verification",
          content: (
            <p>
              To protect customer information, we may need to verify the
              identity of a person making a data request before providing
              personal information or making significant changes to an
              account.
            </p>
          ),
        },

        {
          id: "retention",
          title: "Data Retention",
          content: (
            <p>
              We retain personal information only for as long as reasonably
              necessary for the purposes for which it was collected, including
              providing services, maintaining business records, handling
              disputes, and meeting applicable legal obligations.
            </p>
          ),
        },

        {
          id: "transfers",
          title: "International Data Transfers",
          content: (
            <p>
              Depending on the services and infrastructure used to operate
              SnappEditt, information may be processed in countries outside
              your country of residence. Where applicable law requires
              safeguards for international transfers, appropriate measures
              should be used to protect the transferred information.
            </p>
          ),
        },

        {
          id: "complaints",
          title: "Complaints",
          content: (
            <p>
              If you believe your privacy rights have not been properly
              addressed, you may have the right to contact the data-protection
              or supervisory authority in your country or region.
            </p>
          ),
        },

        {
          id: "contact",
          title: "Contact SnappEditt",
          content: (
            <>
              <p>
                For privacy and data-protection questions, contact:
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