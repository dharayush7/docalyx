import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export default function Page() {
  return (
    <div className="mx-auto max-w-xl w-full">
      <p className="mt-[40vh] text-lg text-center font-medium mb-10 w-full">
        Updated: 23 December, 2025
      </p>

      <h1 className="text-6xl text-center font-semibold w-full">
        Terms & Conditions
      </h1>

      <div className="mt-15">
        <p className="text-justify">
          These Terms and Conditions (“Terms”) govern your access to and use of
          Docalyx (“we”, “our”, or “us”), including our website, applications,
          and services (collectively, the “Services”). By accessing or using the
          Services, you agree to be bound by these Terms.
        </p>
        <p className="mt-4">
          If you do not agree to these Terms, you must not use the Services.
        </p>
      </div>

      {/* 1 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">1. Eligibility</h1>
        <div className="pl-5 mt-3">
          <p>
            You must be at least 13 years old to use Docalyx. By using the
            Services, you represent and warrant that you meet this requirement
            and have the legal capacity to enter into these Terms.
          </p>
        </div>
      </div>

      {/* 2 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">2. Account Registration</h1>
        <div className="pl-5 mt-3">
          <p>
            To access certain features of the Services, you may be required to
            create an account using email-based authentication or third-party
            login services.
          </p>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>
        </div>
      </div>

      {/* 3 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">3. Use of the Services</h1>
        <div className="pl-5 mt-3">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Use the Services for unlawful or harmful purposes</li>
            <li>Upload content you do not have the right to use or share</li>
            <li>Attempt to reverse engineer or disrupt the Services</li>
            <li>Misuse the AI system or attempt to bypass safeguards</li>
          </ul>
        </div>
      </div>

      {/* 4 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">4. User Content</h1>
        <div className="pl-5 mt-3">
          <p>
            You retain ownership of any documents, files, or content you upload
            to Docalyx (“User Content”).
          </p>
          <p className="mt-2">
            By using the Services, you grant us a limited, non-exclusive license
            to process your User Content solely for the purpose of operating and
            improving the Services.
          </p>
        </div>
      </div>

      {/* 5 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">
          5. AI-Generated Content Disclaimer
        </h1>
        <div className="pl-5 mt-3">
          <p>
            Docalyx uses artificial intelligence to generate responses based on
            uploaded documents and user queries.
          </p>
          <p className="mt-2">
            AI-generated responses may be inaccurate, incomplete, or outdated.
            You acknowledge that outputs are provided for informational purposes
            only and should not be relied upon as professional, legal, medical,
            or financial advice.
          </p>
        </div>
      </div>

      {/* 6 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">6. Data Storage & Retention</h1>
        <div className="pl-5 mt-3">
          <p>
            Uploaded documents and chat history may be stored to provide the
            Services. We do not guarantee permanent availability of any content.
          </p>
        </div>
      </div>

      {/* 7 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">7. Third-Party Services</h1>
        <div className="pl-5 mt-3">
          <p>
            The Services may rely on third-party providers for authentication,
            analytics, hosting, and AI processing. We are not responsible for
            the practices or availability of third-party services.
          </p>
        </div>
      </div>

      {/* 8 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">8. Intellectual Property</h1>
        <div className="pl-5 mt-3">
          <p>
            All intellectual property related to the Services, including
            software, branding, and design, is owned by Docalyx or its licensors
            and may not be used without prior written permission.
          </p>
        </div>
      </div>

      {/* 9 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">9. Termination</h1>
        <div className="pl-5 mt-3">
          <p>
            We may suspend or terminate your access to the Services at any time
            if you violate these Terms or misuse the Services.
          </p>
        </div>
      </div>

      {/* 10 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">10. Disclaimer of Warranties</h1>
        <div className="pl-5 mt-3">
          <p>
            The Services are provided on an “as is” and “as available” basis. We
            make no warranties of any kind regarding reliability, accuracy, or
            availability.
          </p>
        </div>
      </div>

      {/* 11 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">11. Limitation of Liability</h1>
        <div className="pl-5 mt-3">
          <p>
            To the maximum extent permitted by law, Docalyx shall not be liable
            for any indirect, incidental, or consequential damages arising from
            your use of the Services.
          </p>
        </div>
      </div>

      {/* 12 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">12. Governing Law</h1>
        <div className="pl-5 mt-3">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to conflict of law principles.
          </p>
        </div>
      </div>

      {/* 13 */}
      <div className="mt-8">
        <h1 className="text-lg font-medium">13. Contact Information</h1>
        <div className="pl-5 mt-3">
          <p className="">
            For questions about these Terms:
            <br />
            <Link
              href="mailto:legal@ayushdhar.com"
              target="_blank"
              className="hover:text-primary transition-colors ease-in font-medium"
            >
              legal@ayushdhar.com
            </Link>
          </p>
        </div>
      </div>

      {/* 14 */}
      <div className="mt-8 mb-20">
        <h1 className="text-lg font-medium">14. Changes to These Terms</h1>
        <div className="pl-5 mt-3">
          <p>
            We may update these Terms from time to time. Continued use of the
            Services after changes are posted constitutes acceptance of the
            updated Terms.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Understand the terms governing your use of Docalyx and its services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: { index: true, follow: true },
};
