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
        title: "Easy Client Management",
        description: "Organize client details, invoices, and history in one place.",
        visual: (
            <>
                {/* Client Profile Card */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">JD</div>
                            <div>
                                <div className="text-xs font-bold text-slate-900">John Doe</div>
                                <div className="text-[10px] text-slate-500">john@example.com</div>
                            </div>
                        </div>
                        {/* Activity List */}
                        <div className="p-4 space-y-3">
                            {/* Animated Items */}
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-[10px] font-medium text-slate-700">Invoice #1024</span>
                                </div>
                                <span className="text-[10px] text-emerald-600 font-bold">Paid</span>
                            </motion.div>

                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <span className="text-[10px] font-medium text-slate-700">Invoice #1025</span>
                                </div>
                                <span className="text-[10px] text-slate-400">Sent</span>
                            </motion.div>

                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "4rem" }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mt-2 pt-2 border-t border-slate-100 flex justify-center mx-auto"
                            >
                                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                            </motion.div>
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
        title: "Quote to Invoice",
        description: "Convert approved quotes into invoices with one click.",
        visual: (
            <>
                {/* Visual showing conversion flow */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-4 relative">
                        {/* Quote Doc */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-24 h-32 bg-white border border-slate-200 rounded-lg shadow-sm p-3 relative transform -rotate-6"
                        >
                            <div className="h-1.5 w-8 bg-slate-200 rounded mb-2"></div>
                            <div className="space-y-1.5 mb-2">
                                <div className="h-1 w-full bg-slate-100 rounded"></div>
                                <div className="h-1 w-full bg-slate-100 rounded"></div>
                                <div className="h-1 w-2/3 bg-slate-100 rounded"></div>
                            </div>
                            <div className="absolute top-2 right-2 text-[8px] font-bold text-slate-400">QUOTE</div>
                        </motion.div>

                        {/* Arrow */}
                        <div className="bg-slate-100 rounded-full p-2 z-10">
                            <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>

                        {/* Invoice Doc */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="w-24 h-32 bg-slate-900 border border-slate-800 rounded-lg shadow-lg p-3 relative transform rotate-6 text-white"
                        >
                            <div className="h-1.5 w-8 bg-slate-600 rounded mb-2"></div>
                            <div className="space-y-1.5 mb-2">
                                <div className="h-1 w-full bg-slate-800 rounded"></div>
                                <div className="h-1 w-full bg-slate-800 rounded"></div>
                                <div className="h-1 w-2/3 bg-slate-800 rounded"></div>
                            </div>
                            {/* Floating check */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -top-2 -right-2 h-6 w-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
                            >
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <div className="absolute bottom-3 left-3 right-3 h-6 bg-slate-800 rounded flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white">INVOICE</span>
                            </div>
                        </motion.div>
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
