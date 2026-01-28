import React from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-500 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-slate prose-lg max-w-none hover:prose-a:text-blue-600 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600">
            <p className="lead">
              Welcome to Billio. By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy.
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using Billio ("Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>

            <h3>2. Service Description</h3>
            <p>
              Billio provides invoicing, payment processing, and financial management tools for businesses. We reserve the right to modify, suspend, or discontinue the Service at any time, with or without notice.
            </p>

            <h3>3. User Accounts</h3>
            <p>
              To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>

            <h3>4. Payment and Subscription</h3>
            <p>
              Certain aspects of the Service may be provided for a fee or other charge. If you elect to use paid aspects of the Service, you agree to the pricing and payment terms as we may update them from time to time.
            </p>

            <h3>5. Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Billio and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h3>6. Termination</h3>
            <p>
              We may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with you.
            </p>

            <h3>7. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:legal@billio.website">legal@billio.website</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
