"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Mail, Link as LinkIcon, Download, Send, Plus, CreditCard } from "lucide-react";

export default function HowItWorks() {
  const containerRef = useRef(null);

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 mb-6 hover:bg-slate-100 transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-slate-900 animate-pulse"></span>
              How It Works
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Get paid in 3 simple steps
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Our streamlined process takes the hassle out of billing so you can focus on your work.
            </p>
          </motion.div>
        </div>

        {/* Steps Container */}
        <div className="space-y-40">

          {/* Step 1: Create */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              {/* Sleek Invoice Builder Card */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 relative z-10 flex flex-col gap-6">
                {/* Top: Client Selection */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-lg font-bold text-blue-600 shadow-sm border border-slate-100">
                    AC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">BILL TO</div>
                    <div className="text-lg font-bold text-slate-900">Acme Corp Inc.</div>
                  </div>
                </div>

                {/* Middle: Adding Item - High Focus */}
                <div className="bg-white rounded-2xl border-2 border-slate-900 p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">EDITING</div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 mb-1">SERVICE</div>
                      <div className="text-xl font-bold text-slate-900">Web Development</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-1">RATE</div>
                        <div className="text-lg font-medium text-slate-700">$125.00 / hr</div>
                      </div>
                      <div className="text-2xl font-black text-slate-900">$2,500.00</div>
                    </div>
                  </div>
                </div>

                {/* Bottom: Add Button */}
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer">
                    <Plus className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 pl-0 lg:pl-10"
            >
              <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-900/20 mb-8">1</div>
              <h3 className="text-4xl font-bold text-slate-900 mb-6">Create invoice</h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-8">
                Choose from our professional templates or build your own. Add line items, taxes, and client details in a few clicks.
              </p>
              <div className="flex flex-col gap-4">
                {['Smart auto-complete', 'Save services & rates', 'Custom branding'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 font-medium group">
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Step 2: Share */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="pr-0 lg:pr-10"
            >
              <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-900/20 mb-8">2</div>
              <h3 className="text-4xl font-bold text-slate-900 mb-6">Send instantly</h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-8">
                Deliver via Email, WhatsApp, or a direct link. Your clients get a professional payment page that looks great on any device.
              </p>
              <div className="flex flex-col gap-4">
                {['One-click sending', 'Real-time read receipts', 'Automated reminders'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 font-medium group">
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* 'Sent Success' Card Style */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 max-w-md mx-auto relative z-10 text-center">
                {/* Plane Icon */}
                <div className="h-20 w-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/30">
                  <Send className="h-8 w-8 text-white ml-1" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">Invoice Sent!</h3>
                <p className="text-slate-500 mb-8">Delivered to client@acme.com</p>

                {/* Status Timeline */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-slate-700">Sent via Email</span>
                    <span className="ml-auto text-xs text-slate-400">10:42 AM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-slate-700">Delivered</span>
                    <span className="ml-auto text-xs text-slate-400">10:42 AM</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                    <span className="text-sm font-semibold text-slate-900">Opened by Client</span>
                    <span className="ml-auto text-xs text-slate-400">...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 3: Get Paid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              {/* Payment Card */}
              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 max-w-sm mx-auto text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30"
                >
                  <Check className="h-12 w-12 text-white stroke-[3]" />
                </motion.div>

                <h4 className="text-3xl font-black text-slate-900 mb-2">$2,450.00</h4>
                <p className="text-slate-500 font-medium mb-8">Payment Success</p>

                <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100">
                      <Download className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Download Receipt</div>
                      <div className="text-xs text-slate-400">PDF • 1.2 MB</div>
                    </div>
                  </div>
                </div>

                {/* Confetti Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -100], opacity: [0, 1, 0], x: (i % 2 === 0 ? 1 : -1) * 50 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-blue-400' : 'bg-yellow-400'}`}
                    style={{ top: '40%', left: '50%' }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 pl-0 lg:pl-10"
            >
              <div className="h-14 w-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-900/20 mb-8">3</div>
              <h3 className="text-4xl font-bold text-slate-900 mb-6">Get paid instantly</h3>
              <p className="text-xl text-slate-500 leading-relaxed mb-8">
                Accept credit cards, bank transfers, and Apple Pay. Clients pay faster when it's easy, and you get notified instantly.
              </p>
              <div className="flex flex-col gap-4">
                {['Accept 135+ currencies', 'Bank-grade security', 'Instant payout options'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700 font-medium group">
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-40"
        >
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 hover:scale-105 transition-all"
          >
            Start Your Free Trial
          </a>
          <p className="mt-6 text-slate-500 font-medium">No credit card required</p>
        </motion.div>

      </div>
    </section>
  );
}