"use client";

import { ChevronDown, HelpCircle, MessageCircle, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the free launch period work?",
      answer:
        "During our launch period, Billio is completely free for all users. No credit card is required to start. You'll have access to all features including unlimited invoices, payment tracking, and customer support. This is our way of introducing you to the platform.",
    },
    {
      question: "Can I cancel anytime after the free period?",
      answer:
        "Yes, you can cancel your subscription at any time after the free launch period ends. There are no long-term contracts or cancellation fees. If you cancel, you'll continue to have access until the end of your current billing period.",
    },
    {
      question: "Is my data secure with Billio?",
      answer:
        "Absolutely. We use bank-level security with 256-bit encryption to protect your data. Our systems are regularly audited and we're compliant with major security standards including SOC 2 and GDPR. Your financial data is never shared with third parties.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, we provide 24/7 customer support through email, chat, and phone. During the free launch period, all users get priority support. Our team is always ready to help you get the most out of Billio.",
    },
    {
      question: "What happens after the free launch period?",
      answer:
        "After the free launch period, we'll introduce our affordable pricing plans. You'll be notified well in advance and can choose to continue with a paid plan or export your data. We'll make the transition as smooth as possible.",
    },
  ];

  return (
    <section className="relative bg-white py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:64px_64px] opacity-30"></div>
      </div>

      <div className="mx-auto max-w-[90rem] px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-500 mb-6">
            <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-slate-900"></span>
            FAQ
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl text-slate-500 max-w-3xl mx-auto">
            Everything you need to know about Billio. Can't find what you're looking for?{" "}
            <a href="/support" className="text-slate-900 font-bold underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 transition-all">
              Contact our support team
            </a>.
          </p>
        </motion.div>

        {/* FAQ Stack */}
        <div className="max-w-4xl mx-auto space-y-4 relative z-10 w-full">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${isOpen ? "border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left p-6 sm:p-8"
                  >
                    <span className={`text-lg sm:text-xl font-bold transition-colors pr-8 ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${isOpen ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}>
                      <ChevronDown
                        strokeWidth={2.5}
                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 sm:px-8 pb-8 pt-0">
                          <p className="text-base sm:text-lg leading-relaxed text-slate-500">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
