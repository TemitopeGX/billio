"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroVisual } from "@/components/ui/visuals/HeroVisual";

export default function Hero() {
    return (
        <section className="relative bg-white pt-32 pb-20 lg:pt-[12.5rem] lg:pb-32 overflow-hidden w-full font-sans">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                {/* Hero Text Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20 mb-20 lg:mb-24">
                    <div className="flex-1 lg:max-w-4xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[3.5rem] sm:text-[5rem] lg:text-[7rem] font-bold text-slate-900 leading-[0.9] tracking-[-0.05em]"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}
                        >
                            Unlocking Cashflow,<br /> Maximizing Profit.
                        </motion.h1>
                    </div>
                    <div className="lg:max-w-md">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-lg sm:text-xl text-slate-800 leading-snug font-medium tracking-tight"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}
                        >
                            Professional invoicing software designed to streamline payments and maximize your business's earning potential.
                        </motion.p>
                    </div>
                </div>

                {/* Dashboard Preview Section */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="relative bg-[#F8F9FB] border border-slate-200/60 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
                        {/* Mock Dashboard UI */}
                        <div className="w-full aspect-[16/9] lg:aspect-[16/8.5] bg-[#F8F9FB] relative overflow-hidden">
                            {/* Dashboard Header Mockup */}
                            <div className="h-14 sm:h-20 bg-white border-b border-slate-100 px-4 sm:px-10 flex items-center justify-between">
                                <div className="flex items-center gap-6 sm:gap-14">
                                    <div className="text-xl font-black tracking-tighter">Billio.</div>
                                    <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 min-w-[200px] sm:min-w-[350px]">
                                        <div className="h-3 w-3 bg-slate-300 rounded-full"></div>
                                        <div className="h-3 w-32 sm:w-48 bg-slate-100 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-4 font-bold text-xs uppercase tracking-tight">
                                    <div className="h-9 w-20 sm:w-28 bg-slate-900 rounded-lg hidden sm:flex items-center justify-center text-white">New Invoice</div>
                                    <div className="h-9 w-18 sm:w-24 border border-slate-200 rounded-lg hidden sm:flex items-center justify-center text-slate-600">Add Client</div>
                                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-900 border-2 border-slate-100"></div>
                                </div>
                            </div>

                            {/* Secondary Nav Mockup */}
                            <div className="h-12 bg-white border-b border-slate-50 px-4 sm:px-10 flex items-center gap-4 sm:gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <div className="text-slate-900 border-b-2 border-slate-900 h-full flex items-center">Dashboard</div>
                                {['Invoices', 'Clients', 'Verify', 'History', 'Reports', 'Expenses', 'Settings'].map(item => (
                                    <div key={item} className="hidden md:block py-1 px-2 hover:text-slate-600 cursor-pointer">{item}</div>
                                ))}
                            </div>

                            {/* Dashboard Content Mockup */}
                            <div className="p-4 sm:p-10 space-y-6 sm:space-y-10">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">Welcome back!</h2>
                                    <p className="text-slate-400 text-xs sm:text-sm font-medium">Here's what's happening with your business today.</p>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                    {/* Earnings Card */}
                                    <div className="bg-[#121826] rounded-2xl p-4 sm:p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden h-[120px] sm:h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Billio</span>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+12%</span>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-3xl font-black tracking-tight mb-1">₦450,000</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">This month's earnings</div>
                                        </div>
                                    </div>
                                    {/* Invoices Sent */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm h-[120px] sm:h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-sm"></div>
                                            </div>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+8%</span>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black tracking-tight mb-1">5</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Invoices Sent</div>
                                        </div>
                                    </div>
                                    {/* Active Clients */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm h-[120px] sm:h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                                            </div>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+15%</span>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black tracking-tight mb-1">2</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Active Clients</div>
                                        </div>
                                    </div>
                                    {/* Outstanding */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-sm h-[120px] sm:h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                                            </div>
                                            <span className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">-3%</span>
                                        </div>
                                        <div>
                                            <div className="text-xl sm:text-2xl font-black tracking-tight mb-1">₦0</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400">Outstanding</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
