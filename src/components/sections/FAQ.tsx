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

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-0 overflow-hidden hover:border-slate-300 transition-colors duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-start justify-between text-left p-6 transition-colors duration-200 hover:bg-slate-50"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 flex-shrink-0 mt-1">
                      <HelpCircle className="h-4 w-4 text-slate-500" />
                    </div>
                    <span className="text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 flex-none text-slate-400 transition-transform ml-4 ${openIndex === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-slate-50/50"
                    >
                      <div className="p-6 pt-2 pl-16">
                        <p className="text-base leading-relaxed text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

            <div className="max-w-3xl mx-auto relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Still have questions?
              </h3>
              <p className="text-xl text-slate-400 mb-10">
                Our support team is here to help you 24/7. Get answers to your questions quickly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/support"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 hover:bg-slate-100 transition-all"
                >
                  <HelpCircle className="h-5 w-5" />
                  Visit Help Center
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-8 py-4 text-base font-bold text-white hover:bg-slate-800 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Live Chat
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
