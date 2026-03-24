"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Apple } from "lucide-react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-black relative overflow-hidden font-sans border-t border-white/10">

      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mb-6">
              How it works
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
              Just a few simple steps
            </h2>
          </motion.div>
        </div>

        {/* 2-Column Grid for larger cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mx-auto w-full">

          {/* Step 1: Create */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col rounded-[2rem] bg-[#0F0F0F] border border-white/[0.08] p-6 lg:p-10 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 z-10"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] pointer-events-none -z-10"></div>

            {/* Text Header */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-white mb-2">Craft your invoice</h3>
              <p className="text-sm text-white/50 leading-relaxed font-normal">
                Use our lightning-fast, keyboard-friendly editor. Pull from saved clients and items to draft invoices instantly.
              </p>
            </div>

            {/* Visual Bottom */}
            <div className="flex-1 rounded-2xl bg-[#050505] border border-white/[0.04] p-6 sm:p-8 flex flex-col justify-center min-h-[320px] relative overflow-hidden group-hover:border-white/10 transition-colors duration-500">
              {/* Decorative Ambient Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Minimal Form Mockup */}
              <div className="bg-[#111111] border border-white/10 rounded-xl p-5 shadow-2xl relative z-10 w-full transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="mb-3">
                  <div className="text-[10px] text-white/40 mb-1.5">Client Name</div>
                  <div className="bg-black/50 border border-white/5 rounded-md px-3 py-2 text-xs text-white/80">Acme Corp Inc.</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 mb-1.5">Line Items</div>
                  <div className="bg-black/50 border border-white/5 rounded-md px-3 py-2 flex justify-between items-center text-xs">
                    <span className="text-white/80">Web Development</span>
                    <span className="text-white/50">$2,500</span>
                  </div>
                </div>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
            </div>
          </motion.div>

          {/* Step 2: Send */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col rounded-[2rem] bg-[#0F0F0F] border border-white/[0.08] p-6 lg:p-10 hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] transition-all duration-500 z-10"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] pointer-events-none -z-10"></div>

            {/* Text Header */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-white mb-2">Send securely</h3>
              <p className="text-sm text-white/50 leading-relaxed font-normal">
                Deliver via email, WhatsApp, or unique secure links. See exactly when your client views the invoice.
              </p>
            </div>

            {/* Visual Bottom */}
            <div className="flex-1 rounded-2xl bg-[#050505] border border-white/[0.04] p-6 sm:p-8 flex flex-col justify-center items-center min-h-[320px] relative overflow-hidden group-hover:border-white/10 transition-colors duration-500">

              {/* Decorative Ambient Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Message Bubble Mockup */}
              <div className="w-full flex flex-col gap-3 relative z-10 transform group-hover:scale-[1.05] group-hover:-translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl rounded-tl-sm p-5 w-[85%] self-end shadow-2xl">
                  <div className="text-[10px] text-white/40 mb-2">10:42 AM</div>
                  <div className="text-xs text-white/80 leading-relaxed text-left">
                    Hi there! Your invoice for $2,500 is ready. You can view and pay it securely here: <br /><span className="text-blue-400 mt-1 inline-block bg-blue-500/10 px-2 py-0.5 rounded">bll.io/inv-2</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 self-end pr-2">
                  <div className="bg-[#111] border border-white/10 text-white/60 text-[10px] px-3 py-1.5 rounded-full flex items-center justify-center">
                    Copy Link
                  </div>
                  <div className="bg-white text-black font-semibold text-[10px] px-3 py-1.5 rounded-full flex items-center justify-center">
                    Send Email
                  </div>
                </div>
              </div>
              {/* Decorative Gradient */}
              <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
            </div>
          </motion.div>

          {/* Step 3: Get Paid - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col lg:flex-row md:col-span-2 rounded-[2rem] bg-[#0F0F0F] border border-white/[0.08] p-6 lg:p-12 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] transition-all duration-500 gap-12 lg:items-center z-10"
          >
            {/* Background Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem] pointer-events-none -z-10"></div>

            {/* Text Header (Left Side) */}
            <div className="flex-1">
              <h3 className="text-2xl font-medium text-white mb-4">Get paid instantly</h3>
              <p className="text-base text-white/50 leading-relaxed font-normal max-w-sm">
                Accept major credit cards, bank transfers, and Apple Pay directly on your invoice page. Funds clear directly to your bank account with lightning speed.
              </p>
            </div>

            {/* Visual Bottom (Right Side) */}
            <div className="flex-1 w-full rounded-2xl bg-[#050505] border border-white/[0.04] p-8 flex flex-col justify-center items-center min-h-[360px] relative overflow-hidden group-hover:border-white/10 transition-all duration-500">

              {/* Decorative Ambient Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Payment Methods Mockup */}
              <div className="w-full max-w-sm space-y-4 relative z-10 transform group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="bg-white text-black rounded-xl h-12 w-full flex items-center justify-center gap-2 shadow-2xl group-hover:-translate-y-2 transition-transform duration-700 delay-75">
                  <Apple className="h-5 w-5 fill-black" />
                  <span className="font-bold">Pay</span>
                </div>
                <div className="bg-[#1A1A1A] border border-white/10 rounded-xl h-12 w-full flex items-center justify-between px-5 group-hover:-translate-y-1 transition-transform duration-700 delay-150">
                  <span className="text-[10px] xl:text-xs text-white/60 font-medium tracking-wide">•••• •••• •••• 4242</span>
                  <div className="flex gap-1 opacity-50">
                    <div className="w-5 h-3 bg-white/20 rounded-sm"></div>
                    <div className="w-5 h-3 bg-white/20 rounded-sm"></div>
                  </div>
                </div>

                {/* Success State Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-2 pointer-events-none">
                  <div className="bg-[#111] border border-white/20 px-5 py-3 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-2 transform translate-y-8 opacity-0 group-hover:translate-y-2 group-hover:opacity-100 transition-all duration-500 delay-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white pr-2">Payment successful</span>
                  </div>
                </div>
              </div>
              {/* Decorative Gradient */}
              <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}