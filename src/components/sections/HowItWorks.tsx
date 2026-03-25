"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, User, Send, DollarSign, Receipt, ChevronRight } from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Sign Up", "Complete Setup", "Create Invoice", "Send Invoice", "Issue Receipt"];

  const steps = [
    {
      title: "Sign up in seconds.",
      description: "Get started instantly. No credit card required, just enter your email and you're ready to modernize your billing.",
      action: "Create an Account now",
      visual: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="text-2xl font-black tracking-tighter text-slate-900 mb-6">Billio.</div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Create your account</h4>
            <p className="text-xs text-slate-400">Get started with Billio today</p>
          </div>
          <div className="space-y-4 max-w-sm mx-auto w-full">
            <div>
              <div className="text-[10px] font-semibold text-slate-500 mb-1.5 ml-1">Full name</div>
              <div className="h-10 w-full bg-[#f4f7fb] border border-[#e5e9f0] rounded-lg px-4 flex items-center">
                <span className="text-xs font-medium text-slate-600">John Doe</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 mb-1.5 ml-1">Email address</div>
              <div className="h-10 w-full bg-[#f4f7fb] border border-[#e5e9f0] rounded-lg px-4 flex items-center">
                <span className="text-xs font-medium text-slate-600">john@example.com</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-10 bg-slate-200 rounded-lg animate-pulse opacity-50"></div>
              <div className="h-10 bg-slate-200 rounded-lg animate-pulse opacity-50"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Complete business profile.",
      description: "Add your business details, logo, and payment preferences once. Every future invoice will automatically reflect your professional branding.",
      action: "Set up your brand",
      visual: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] p-8 sm:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-6 mb-10 max-w-sm mx-auto w-full">
            <div className="h-20 w-20 bg-slate-50 rounded-full border border-dashed border-slate-300 flex items-center justify-center">
              <User className="h-8 w-8 text-slate-300" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/4 bg-slate-200 rounded-full"></div>
              <div className="h-3 w-1/2 bg-slate-100 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 max-w-sm mx-auto w-full">
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm">
                  <DollarSign className="h-4 w-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">Bank Account</span>
              </div>
              <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Create beautiful invoices.",
      description: "Use our lightning-fast, keyboard-friendly editor to draft professional invoices. Add line items and apply taxes instantly.",
      action: "Explore the editor",
      visual: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] p-0 overflow-hidden flex flex-col">
          <div className="bg-[#f8f9fc] border-b border-slate-200 p-5 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Invoice #INV-001</span>
            <span className="text-xs font-bold px-3 py-1 bg-slate-200/50 text-slate-600 rounded-full">Draft</span>
          </div>
          <div className="p-8 space-y-8 flex-1 flex flex-col justify-center">
            <div className="flex justify-between">
              <div className="space-y-3">
                <div className="h-3 w-20 bg-slate-200 rounded"></div>
                <div className="h-3 w-32 bg-slate-100 rounded"></div>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-[#f8f9fc] p-4 border-b border-slate-200 flex justify-between">
                <span className="text-xs font-semibold text-slate-500">Item Description</span>
                <span className="text-xs font-semibold text-slate-500">Amount</span>
              </div>
              <div className="p-4 flex justify-between items-center bg-white">
                <span className="text-sm font-semibold text-slate-900">Web Dashboard Design</span>
                <span className="text-sm font-black text-slate-900">$4,500</span>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <span className="text-3xl font-black tracking-tighter text-slate-900">$4,500.00</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Send and track instantly.",
      description: "Deliver your invoice securely via email or generate a private link to share in WhatsApp or Slack. See when your client views it.",
      action: "See tracking options",
      visual: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] p-8 sm:p-12 flex flex-col justify-center items-center bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px]">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white border text-center border-slate-200 rounded-2xl shadow-xl p-8 w-full max-w-sm"
          >
            <div className="mx-auto h-16 w-16 bg-[#ebf5ff] text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Send className="h-6 w-6 ml-1" />
            </div>
            <h4 className="text-xl font-black tracking-tight text-slate-900 mb-2">Invoice Dispatched!</h4>
            <p className="text-sm text-slate-500 mb-8 font-medium">client@acmefinance.com</p>
            <div className="h-12 w-full bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Viewed 2 mins ago
              </span>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Automate your receipts.",
      description: "The absolute moment an invoice is marked paid, Billio automatically generates and dispatches a branded, compliant receipt.",
      action: "Start getting paid",
      visual: (
        <div className="w-full h-full bg-white border border-slate-200 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col">
          <div className="bg-[#ecfdf5] border-b border-[#d1fae5] py-10 flex flex-col items-center justify-center text-center">
            <div className="h-14 w-14 bg-white shadow-sm text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
              <Receipt className="h-6 w-6" />
            </div>
            <h4 className="text-emerald-900 font-black text-xl tracking-tight">Payment Successful</h4>
            <p className="text-emerald-600/80 text-sm font-medium mt-1">Receipt #REC-001</p>
          </div>
          <div className="p-10 bg-white space-y-6 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500 text-sm font-medium">Amount Paid</span>
              <span className="text-slate-900 font-black text-xl tracking-tighter">$4,500.00</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500 text-sm font-medium">Date Paid</span>
              <span className="text-slate-900 font-semibold text-sm">Today, 2:40 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-sm font-medium">Method</span>
              <span className="text-slate-900 font-semibold text-sm">Card ending in 4242</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="w-full bg-white font-sans py-24 md:py-32 overflow-hidden border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Header Block */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 font-sans">
            How it works.
          </h2>
          <p className="text-lg md:text-xl text-slate-800 max-w-3xl mx-auto font-medium leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
            A truly frictionless five-step workflow built to take your freelance or agency business from onboarding to getting paid instantly.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-0 lg:justify-start lg:border lg:border-slate-200 lg:rounded-full lg:p-1.5 w-fit mx-auto lg:mx-0 mb-16 md:mb-24 shadow-sm bg-white">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === idx
                  ? "bg-[#0e0f2b] text-white shadow-md transform scale-105"
                  : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Active Content Body */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              {/* Left Side: Text Details */}
              <div className="flex flex-col relative">
                {/* Decorative left line */}
                <div className="absolute left-[-32px] md:left-[-48px] top-0 bottom-0 w-px bg-slate-200 hidden lg:block"></div>

                <h3 className="text-3xl md:text-[2.5rem] font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  {steps[activeTab].title}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
                  {steps[activeTab].description}
                </p>
                <a href="#" className="inline-flex items-center text-[15px] font-bold text-[#0e0f2b] hover:text-blue-600 transition-colors group w-fit">
                  {steps[activeTab].action}
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Right Side: Visual Mockup */}
              <div className="h-[400px] sm:h-[480px] w-full relative">
                {steps[activeTab].visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}