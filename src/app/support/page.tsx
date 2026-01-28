import React from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { LifeBuoy, Mail, MessageCircle, FileText } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">How can we help?</h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Search our knowledge base or get in touch with our support team. We're here to help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <FileText className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Documentation</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Everything you need to know about setting up and using Billio.</p>
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                Read Guides &rarr;
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <MessageCircle className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Community Forum</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Join the conversation with other Billio users and share tips.</p>
              <a href="#" className="text-purple-600 font-semibold hover:text-purple-700 inline-flex items-center">
                Visit Community &rarr;
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                <LifeBuoy className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Contact Support</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">Need personal assistance? Our team is ready to help 24/7.</p>
              <a href="/contact" className="text-emerald-600 font-semibold hover:text-emerald-700 inline-flex items-center">
                Get in Touch &rarr;
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "How do I reset my password?", a: "You can reset your password by clicking on the 'Forgot Password' link on the login page." },
                { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings." },
                { q: "Is my data secure?", a: "Absolutely. We use bank-level encryption to ensure your data is always safe and secure." },
                { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee for all new subscriptions." }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                  <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
