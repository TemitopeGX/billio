"use client";

import { CheckCircle2, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-white w-full min-h-[110vh] flex flex-col pt-32 lg:pt-48 pb-20">
            {/* Background Texture - Dot Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]" style={{
                backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}></div>

            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-0 pointer-events-none"></div>

            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Typography & CTAs */}
                    <div className="space-y-10 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            <span className="text-sm font-semibold text-slate-600 tracking-wide uppercase">v2.0 Now Live</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 leading-[0.95]"
                        >
                            Get paid <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">instantly.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl sm:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl"
                        >
                            The financial operating system for the next generation of business. Invoicing, payments, and cashflow management in one stunning workspace.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="/signup"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-slate-800"
                            >
                                Start Free Trial
                            </a>
                            <a
                                href="#demo"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white border border-slate-200 px-8 text-lg font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300"
                            >
                                See How It Works
                            </a>
                        </motion.div>

                        <div className="pt-8 flex items-center gap-8 text-sm font-medium text-slate-400">
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces"
                                ].map((src, i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden relative">
                                        <Image
                                            src={src}
                                            alt="User"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="flex text-yellow-500 gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                                </div>
                                <span className="text-slate-600">Trusted by 10,000+ businesses</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Complex Visual Composition */}
                    <div className="relative h-[600px] hidden lg:block perspective-1000">
                        {/* Floating Elements Animation Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full h-full"
                        >
                            {/* Main Dashboard Card */}
                            <div className="absolute top-10 left-10 w-[110%] rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden transform rotate-y-12 transition-all hover:rotate-y-0 duration-700">
                                <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="relative aspect-[16/10] bg-slate-50">
                                    <Image
                                        src="/dashboard-screenshot.png"
                                        alt="Dashboard"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* Floating Stats Card 1 */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="absolute -left-12 top-32 p-5 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 w-64"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase">Revenue</p>
                                        <p className="font-bold text-slate-900">+24.5%</p>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[70%]"></div>
                                </div>
                            </motion.div>

                            {/* Floating Stats Card 2 */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -right-4 bottom-24 p-5 bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 w-56 flex items-center gap-4"
                            >
                                <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/30">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">2s</p>
                                    <p className="text-xs text-slate-500 font-medium">Payment Speed</p>
                                </div>
                            </motion.div>

                            {/* Abstract Blur Decor */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
