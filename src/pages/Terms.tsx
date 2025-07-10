import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-foreground">
    <h1 className="text-3xl font-bold mb-6 text-center">Terms of Use</h1>
    <div className="space-y-6 text-base leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Sharify ("the Service"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">2. Use of Service</h2>
        <p>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for your conduct and any content you submit, post, or display on or through the Service.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">3. User Content</h2>
        <p>
          You retain ownership of any content you submit to Sharify, but you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content in connection with the Service. You are solely responsible for your content and its accuracy.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All content, trademarks, logos, and intellectual property on Sharify, except user-generated content, are the property of Sharify or its licensors. You may not use, reproduce, or distribute any content from the Service without our prior written permission.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">5. Disclaimers</h2>
        <p>
          The Service is provided on an "as is" and "as available" basis. Sharify makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">6. Limitation of Liability</h2>
        <p>
          In no event shall Sharify or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service, even if Sharify or a Sharify authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
        <p>
          Sharify reserves the right to revise these Terms of Use at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these Terms of Use.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:supportsharify@gmail.com" className="text-blue-600 underline">supportsharify@gmail.com</a>.
        </p>
      </section>
    </div>
    <div className="mt-10 text-center">
      <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
    </div>
  </div>
);

export default Terms; 