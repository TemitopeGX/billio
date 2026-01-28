"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroVisual } from "@/components/ui/visuals/HeroVisual";

export default function Hero() {
    return (
        <section className="relative bg-white pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-4 items-start">

                    {/* Left Column: Content */}
                    <div className="max-w-full lg:max-w-2xl">

                        {/* Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap gap-3 mb-8"
                        >

                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-6xl sm:text-7xl lg:text-[5rem] font-bold text-slate-900 leading-tight tracking-tight mb-8"
                        >
                            Unlocking <span className="text-blue-600">Cashflow</span>, Maximizing Profit.
                        </motion.h1>

                        {/* Subhead */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-slate-500 leading-relaxed mb-10 max-w-md font-medium"
                        >
                            Professional invoicing software designed to streamline payments and maximize your business's earning potential.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex items-center gap-6 mb-16"
                        >
                            <a href="/signup" className="h-14 px-8 rounded-full bg-slate-900 text-white font-bold text-lg flex items-center justify-center hover:bg-slate-800 transition-colors">
                                Get Started
                            </a>
                            <a href="#how-it-works" className="text-slate-600 font-bold text-lg underline hover:text-slate-900 decoration-2 underline-offset-4">
                                How it works
                            </a>
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex items-center gap-8"
                        >
                            <div>
                                <p className="text-xs text-slate-500 font-bold mb-1">Trusted by_</p>
                                <p className="text-4xl font-black text-slate-900">10K<span className="text-blue-600">+</span></p>
                                <p className="text-xs text-slate-500 font-medium mt-1">Happy businesses</p>
                            </div>

                            <div className="h-12 w-px bg-slate-200"></div>

                            <div className="bg-white border border-slate-100 shadow-lg rounded-2xl p-4 flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative">
                                            <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" fill className="object-cover" />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold border-2 border-white relative z-10">
                                        +
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-900">5.0</p>
                                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual */}
                    <div className="w-full flex justify-center lg:justify-end">
                        <HeroVisual />
                    </div>
                </div>
            </div>
        </section>
    );
}
