"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
    {
        number: "01",
        title: "Automated Invoicing",
        description: "Set recurring schedules and never miss a billing cycle.",
        visual: (
            <>
                {/* Invoice stack illustration */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44">
                    <div className="relative">
                        {/* Back invoice */}
                        <div className="absolute top-4 left-4 w-full h-48 bg-slate-200/50 rounded-xl"></div>
                        {/* Middle invoice */}
                        <div className="absolute top-2 left-2 w-full h-48 bg-slate-200/80 rounded-xl"></div>
                        {/* Front invoice */}
                        <div className="relative w-full bg-white border border-slate-200 rounded-xl shadow-sm p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-slate-900"></div>
                                <div>
                                    <div className="h-2.5 w-20 bg-slate-200 rounded mb-1.5"></div>
                                    <div className="h-2 w-14 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-2 mb-4">
                                <div className="h-2 w-full bg-slate-100 rounded"></div>
                                <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="h-6 w-16 bg-slate-900 rounded-md flex items-center justify-center">
                                    <span className="text-[10px] text-white font-bold">SENT</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold text-slate-900">$2,400</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        number: "02",
        title: "Global Payments",
        description: "Accept payments from 190+ countries seamlessly.",
        visual: (
            <>
                {/* Currency orbs */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        {/* Orbiting currencies */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                        >
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl font-bold text-slate-900">$</div>
                            <div className="absolute top-1/2 -right-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-lg font-bold text-slate-800">€</div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl font-bold text-slate-900">£</div>
                            <div className="absolute top-1/2 -left-2 -translate-y-1/2 h-12 w-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-lg font-bold text-slate-800">₦</div>
                        </motion.div>
                        {/* Center globe */}
                        <div className="absolute inset-8 rounded-full bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
                            <div className="w-full h-full rounded-full border-2 border-slate-300/30 relative overflow-hidden">
                                <div className="absolute inset-0 border-t-2 border-slate-300/30 rounded-full"></div>
                                <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300/30"></div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-300/30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        number: "03",
        title: "Instant Alerts",
        description: "Get notified the moment your client views or pays.",
        visual: (
            <>
                {/* Notification cards */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-52 space-y-3">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-3"
                    >
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-lg">✓</div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-slate-900">Payment Received</div>
                            <div className="text-[10px] text-slate-500">$1,200 from John D.</div>
                        </div>
                        <div className="text-[10px] text-slate-400">now</div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-3"
                    >
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-lg">👁</div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-slate-900">Invoice Viewed</div>
                            <div className="text-[10px] text-slate-500">INV-0042 opened</div>
                        </div>
                        <div className="text-[10px] text-slate-400">2m</div>
                    </motion.div>
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-3"
                    >
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 text-lg">🔔</div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-slate-900">Reminder Sent</div>
                            <div className="text-[10px] text-slate-500">Auto-reminder active</div>
                        </div>
                        <div className="text-[10px] text-slate-400">5m</div>
                    </motion.div>
                </div>
            </>
        )
    },
    {
        number: "04",
        title: "Smart Analytics",
        description: "Visual insights into your revenue and growth trends.",
        visual: (
            <>
                {/* Analytics dashboard */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-56">
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-xs font-bold text-slate-700">Revenue</div>
                            <div className="text-xs font-bold text-slate-900">+24%</div>
                        </div>
                        {/* Chart */}
                        <div className="flex items-end gap-1.5 h-24 mb-3">
                            {[35, 50, 40, 65, 55, 80, 70, 95].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: `${h}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className={`flex-1 rounded-t-sm ${i === 7 ? 'bg-slate-800' : 'bg-slate-200'}`}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                                <div className="text-sm font-bold text-slate-900">$48.2k</div>
                                <div className="text-[10px] text-slate-500">This Month</div>
                            </div>
                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                                <div className="text-sm font-bold text-slate-900">142</div>
                                <div className="text-[10px] text-slate-500">Invoices</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        number: "05",
        title: "Bank-Grade Security",
        description: "256-bit encryption protects every transaction.",
        visual: (
            <>
                {/* Security visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Outer ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-40 h-40 rounded-full border-2 border-dashed border-slate-300"
                        ></motion.div>
                        {/* Middle ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 rounded-full border-2 border-slate-200"
                        ></motion.div>
                        {/* Shield center */}
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <div className="h-20 w-20 rounded-2xl bg-slate-900 shadow-xl flex items-center justify-center">
                                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            {/* Checkmark badge */}
                            <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg">
                                <svg className="h-4 w-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    {
        number: "06",
        title: "Lightning Fast",
        description: "Generate professional invoices in under 30 seconds.",
        visual: (
            <>
                {/* Speed visualization */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    {/* Speed lines */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -200, opacity: 0 }}
                            animate={{ x: 400, opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
                            className="absolute h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent rounded-full"
                            style={{ top: `${15 + i * 10}%`, width: '100px' }}
                        />
                    ))}
                    {/* Center timer */}
                    <div className="relative z-10 h-28 w-28 rounded-full bg-slate-900 shadow-2xl flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">30</div>
                            <div className="text-xs font-semibold text-white/80">seconds</div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
];

export default function Features() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section id="features" className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-slate-500">
                            Everything you need to manage invoices and grow your business.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-default"
                        >
                            {/* Card */}
                            <div className="relative h-96 bg-slate-50 rounded-3xl overflow-hidden border border-slate-100/50">

                                {/* Visual content */}
                                {feature.visual}

                                {/* Reduced Gradient overlay: Reduced height (h-3/5) to reveal more illustration */}
                                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

                                {/* Text Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="text-sm text-slate-400 font-semibold tracking-wider">{feature.number} —</span>
                                    <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
