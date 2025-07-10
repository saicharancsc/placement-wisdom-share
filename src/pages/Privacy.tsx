import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-foreground">
    <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
    <div className="space-y-6 text-base leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          This Privacy Policy explains how Sharify ("we", "us", or "our") collects, uses, and protects your information when you use our Service. By accessing or using Sharify, you agree to the terms of this Privacy Policy.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
        <p>
          We may collect personal information that you provide directly to us, such as your name, email address, and any content you submit. We may also collect information automatically, such as your IP address, browser type, and usage data through cookies and similar technologies.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">3. Use of Information</h2>
        <p>
          We use your information to provide, maintain, and improve our Service, communicate with you, personalize your experience, and ensure the security of our platform. We may also use your information to send you updates or promotional materials, with your consent.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information. We may share your information with trusted third-party service providers who assist us in operating our Service, or when required by law. We may also share aggregated, non-personal information for analytics or research purposes.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience, analyze usage, and deliver relevant content. You can control cookies through your browser settings, but disabling them may affect your use of the Service.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
        <p>
          Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will take steps to remove such information.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. Your continued use of the Service after changes are made constitutes your acceptance of the new policy.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@sharify.com" className="text-blue-600 underline">support@sharify.com</a>.
        </p>
      </section>
    </div>
    <div className="mt-10 text-center">
      <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
    </div>
  </div>
);

export default Privacy; 