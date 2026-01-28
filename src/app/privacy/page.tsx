import React from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-500 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate prose-lg max-w-none hover:prose-a:text-blue-600 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600">
            <p className="lead">
              At Billio, we take your privacy seriously. This Privacy Policy describes how we collect, use, and handle your personal information when you use our websites, software, and services ("Services").
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, update your profile, request customer support, or otherwise communicate with us. This information may include your name, email address, phone number, and payment information.
            </p>

            <h3>2. How We Use Information</h3>
            <p>
              We use the information we collect to operate, maintain, and improve our Services, to process your transactions, to send you related information including confirmations and invoices, and to respond to your comments and questions.
            </p>

            <h3>3. Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>

            <h3>4. Sharing of Information</h3>
            <p>
              We do not share your personal information with third parties except as described in this policy. We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>

            <h3>5. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal information. You can usually do this through your account settings or by contacting us directly.
            </p>

            <h3>6. Changes to Policy</h3>
            <p>
              We may modify this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, providing you with additional notice.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@billio.website">privacy@billio.website</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
