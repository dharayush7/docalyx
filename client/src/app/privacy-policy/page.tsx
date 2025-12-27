import Link from "next/link";
import type { Metadata } from "next";

export default function Page() {
  return (
    <div className="mx-auto max-w-xl w-full">
      <p className="mt-[40vh] text-lg text-center font-medium mb-10 w-full">
        Updated: 23 December, 2025
      </p>
      <h1 className="text-6xl text-center font-semibold w-full">
        Privacy Policy
      </h1>
      <div className="mt-15">
        <p className="text-justify">
          Docalyx (“we”, “our”, or “us”) respects your privacy and is committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, store, and share information when you use our
          website, applications, and services (collectively, the “Services”).
        </p>
        <p className="mt-4">
          Docalyx is operated by an individual based in India.
        </p>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-medium">1. Information We Collect:</h1>
        <div className="pl-5 mt-5">
          <h2 className="text-lg font-medium">
            1.1 Information You Provide to Us:
          </h2>
          <div className="pl-2 mt-3">
            <p>
              We collect personal information you voluntarily provide when using
              our Services, including:
            </p>
            <p className="mt-2 font-medium">Account Information:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>Name</li>
              <li>Email Address</li>
              <li>Profile photo (if provided via Google login)</li>
              <li>
                Authentication details (email + OTP or third-party login via
                Kinde)
              </li>
            </ul>
            <p className="mt-2 font-medium">User Content:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>PDF files uploaded by you</li>
              <li>Text queries you submit</li>
              <li>Chat conversations generated through the Service</li>
            </ul>
            <p className="mt-2 font-medium">Communications</p>
            <ul className="list-disc pl-4 mt-1">
              <li>
                Information you provide when contacting us via email for
                support, privacy, or legal inquiries
              </li>
            </ul>
          </div>
        </div>
        <div className="pl-5 mt-5">
          <h2 className="text-lg font-medium">
            1.2 Information Collected Automatically:
          </h2>
          <div className="pl-2 mt-3">
            <p>
              When you use the Services, we automatically collect certain
              technical information, including:
            </p>
            <p className="mt-2 font-medium">Log & Usage Data:</p>
            <ul className="list-disc pl-4 mt-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Date and time of access</li>
              <li>Pages visited and features used</li>
            </ul>
            <p className="mt-2 font-medium">
              Cookies & Tracking Technologies We use cookies and similar
              technologies for:
            </p>
            <ul className="list-disc pl-4 mt-1">
              <li>Authentication and session management</li>
              <li>Analytics and performance monitoring</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Disabling
              cookies may affect functionality.
            </p>

            <p className="mt-2 font-medium">
              Analytics We use third-party analytics services such as:
            </p>
            <ul className="list-disc pl-4 mt-1">
              <li>Google Analytics</li>
              <li>Microsoft Clarity</li>
            </ul>
            <p>
              These tools help us understand how users interact with our
              Services and improve performance and usability.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-medium">2. How We Use Your Information</h1>
        <div className="pl-5 mt-3">
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>To provide, operate, and maintain the Services</li>
            <li>To process uploaded PDFs and generate AI-based responses</li>
            <li>To store document embeddings and chat history</li>
            <li>To improve and optimize the performance of our Services</li>
            <li>To communicate with you regarding updates or support</li>
            <li>To prevent fraud, abuse, or security issues</li>
            <li>To comply with applicable legal obligations</li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">
          3. AI Processing & Use of Content
        </h1>
        <div className="pl-5 mt-3">
          <p>
            Docalyx uses third-party AI service providers, including OpenAI and
            Google Gemini, to analyze documents and generate responses.
          </p>
          <p className="mt-2">
            Uploaded PDF files are processed by splitting them into smaller
            chunks, which are stored securely and used to retrieve relevant
            context when you submit a query.
          </p>
          <p className="mt-2">
            We may use anonymized or aggregated data to improve our Services. We
            do not sell user data or use it for advertising purposes.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">4. Data Storage & Retention</h1>
        <div className="pl-5 mt-3">
          <p>
            Uploaded documents, generated embeddings, and chat history are
            stored securely using third-party infrastructure providers.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>File storage: Cloudflare R2</li>
            <li>Databases: PostgreSQL and Qdrant</li>
            <li>Hosting: Heroku</li>
          </ul>
          <p className="mt-2">
            We retain personal information only as long as necessary to provide
            the Services or comply with legal obligations.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">5. Sharing of Information</h1>
        <div className="pl-5 mt-3">
          <p>
            We do not sell your personal information. We may share information
            only in the following circumstances:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              With trusted service providers who assist in operating the
              Services (such as authentication, analytics, hosting, and AI
              providers)
            </li>
            <li>When required by law, regulation, or legal process</li>
            <li>
              To protect the rights, safety, and security of Docalyx and its
              users
            </li>
            <li>
              In connection with a business transfer, merger, or acquisition
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">6. Cookies & Analytics</h1>
        <div className="pl-5 mt-3">
          <p>
            We use cookies and similar technologies for authentication, session
            management, and analytics.
          </p>
          <p className="mt-2">
            Analytics tools used include Google Analytics and Microsoft Clarity
            to understand user behavior and improve the Services.
          </p>
          <p className="mt-2">
            You may control cookies through your browser settings. Disabling
            cookies may affect certain features.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">7. Your Rights</h1>
        <div className="pl-5 mt-3">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>
              Request deletion of personal information, subject to limitations
            </li>
            <li>Object to certain data processing activities</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at:
            <br />
            <span className="font-medium">privacy@ayushdhar.com</span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">8. Children’s Privacy</h1>
        <div className="pl-5 mt-3">
          <p>
            Docalyx is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under 13.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">9. Security</h1>
        <div className="pl-5 mt-3">
          <p>
            We implement reasonable technical and organizational safeguards to
            protect your information. However, no system is completely secure,
            and we cannot guarantee absolute security.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">10. International Users</h1>
        <div className="pl-5 mt-3">
          <p>
            By using the Services, you acknowledge that your information may be
            processed and stored in jurisdictions outside your country of
            residence.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-lg font-medium">11. Contact Us</h1>
        <div className="pl-5 mt-3">
          <p>
            For privacy-related inquiries:
            <br />
            <Link
              href="mailto:privacy@ayushdhar.com"
              target="_blank"
              className="font-medium hover:text-primary transition-colors ease-in"
            >
              privacy@ayushdhar.com
            </Link>
          </p>
          <p className="mt-2">
            For legal inquiries:
            <br />
            <Link
              href="mailto:legal@ayushdhar.com"
              target="_blank"
              className="font-medium hover:text-primary transition-colors ease-in"
            >
              legal@ayushdhar.com
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 mb-20">
        <h1 className="text-lg font-medium">
          12. Changes to This Privacy Policy
        </h1>
        <div className="pl-5 mt-3">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Docalyx collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: { index: true, follow: true },
};
