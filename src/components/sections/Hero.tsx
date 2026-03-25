"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, UserPlus, Bell, MessageSquare, Home, FileText, Users, ShieldCheck, Clock, BarChart2, Receipt, Settings as SettingsIcon, ChevronDown, Activity, CheckCircle, CreditCard } from "lucide-react";

export default function Hero() {
    const [showSearch, setShowSearch] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Scale logic for dashboard mockup
    const [mockupScale, setMockupScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                // Use 1280 as base width for a more expansive desktop mockup look
                setMockupScale(width / 1280);
            }
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <section className="relative bg-white pt-32 pb-20 lg:pt-[12.5rem] lg:pb-32 overflow-hidden w-full font-sans">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
                {/* Hero Text Section */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16 mb-16 lg:mb-24">
                    <div className="flex-1 lg:max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold text-slate-900 leading-[1.1] tracking-tight"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}
                        >
                            Create invoices, track payments, and manage<br className="hidden lg:block" /> your business in one place.<br className="hidden lg:block" />
                        </motion.h1>
                    </div>
                    <div className="lg:max-w-md w-full">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl sm:text-2xl text-slate-600 leading-snug font-medium tracking-tight"
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
                    className="relative w-full"
                >
                    <div ref={containerRef} className="relative bg-[#F8F9FB] border border-slate-200/60 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden" style={{ height: 900 * mockupScale }}>
                        <div className="origin-top-left absolute top-0 left-0 w-[1280px] bg-[#F8F9FB] pb-10" style={{ transform: `scale(${mockupScale})` }}>
                            {/* Dashboard Header Mockup */}
                            <div className="h-20 bg-white border-b border-slate-100 px-10 flex items-center justify-between relative">
                                <div className="flex items-center gap-14">
                                    <div className="text-2xl font-black tracking-tighter text-slate-900">Billio.</div>
                                    <div onClick={() => setShowSearch(true)} className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100/80 min-w-[400px] hover:bg-slate-100 transition-colors cursor-text">
                                        <Search className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm text-slate-400 font-medium select-none">Search invoices, clients, payments...</span>
                                        <div className="ml-auto flex items-center gap-1 opacity-50">
                                            <span className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-500 shadow-sm leading-none">⌘</span>
                                            <span className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold text-slate-500 shadow-sm leading-none">K</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Mock Search Popover */}
                                <AnimatePresence>
                                    {showSearch && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute top-16 left-1/2 -translate-x-1/2 w-[450px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                                                <Search className="h-5 w-5 text-slate-400" />
                                                <input autoFocus placeholder="Search invoices, clients..." className="flex-1 outline-none text-slate-900 text-sm font-medium" />
                                                <button onClick={() => setShowSearch(false)} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors">ESC</button>
                                            </div>
                                            <div className="p-2 text-sm text-slate-500 bg-slate-50/50">
                                                <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recent Searches</div>
                                                <div className="px-3 py-2.5 hover:bg-white hover:text-slate-900 hover:shadow-sm rounded-xl cursor-pointer transition-all flex items-center gap-3">
                                                    <FileText className="h-4 w-4 text-slate-400" /> INV-202512-383
                                                </div>
                                                <div className="px-3 py-2.5 hover:bg-white hover:text-slate-900 hover:shadow-sm rounded-xl cursor-pointer transition-all flex items-center gap-3">
                                                    <Users className="h-4 w-4 text-slate-400" /> Techcorp Industries
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-center gap-4">
                                    <button className="h-10 px-4 bg-slate-900 rounded-xl flex items-center gap-2 text-white text-sm font-bold shadow-sm hover:bg-slate-800 transition-colors cursor-pointer select-none">
                                        <Plus className="h-4 w-4" />
                                        New Invoice
                                    </button>
                                    <button className="h-10 px-4 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 text-sm font-bold bg-white hover:bg-slate-50 shadow-sm transition-colors cursor-pointer select-none">
                                        <UserPlus className="h-4 w-4 text-slate-500" />
                                        Add Client
                                    </button>

                                    <div className="relative">
                                        <button onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); setShowSearch(false); }} className="h-10 w-10 flex items-center justify-center relative hover:bg-slate-50 rounded-full transition-colors">
                                            <Bell className="h-[22px] w-[22px] text-slate-500" />
                                            <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold leading-none">3</span>
                                        </button>

                                        <AnimatePresence>
                                            {showNotifications && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-4 z-50"
                                                >
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h4 className="font-bold text-slate-900">Notifications</h4>
                                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100">Mark all read</span>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="flex gap-3 items-start">
                                                            <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                                                <Receipt className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-slate-900 font-bold">Payment Received ✨</p>
                                                                <p className="text-xs text-slate-500 font-medium">₦100,000 paid by Techcorp for INV-202510-924</p>
                                                                <p className="text-[10px] text-slate-400 mt-1">2 mins ago</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <button className="h-10 w-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full hidden sm:flex transition-colors">
                                        <MessageSquare className="h-5 w-5" />
                                    </button>

                                    <div className="relative">
                                        <button onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); setShowSearch(false); }} className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200 ml-1 group hover:opacity-80 transition-opacity">
                                            <div className="h-10 w-10 rounded-full bg-[#121826] flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all shadow-sm">
                                                TA
                                            </div>
                                            <div className="hidden md:block text-left">
                                                <div className="text-sm font-bold text-slate-900 leading-tight">Billio User</div>
                                                <div className="text-[10px] text-slate-500 font-medium tracking-wide mt-0.5">Business Owner</div>
                                            </div>
                                            <ChevronDown className={`h-4 w-4 text-slate-400 hidden xl:block ml-1 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
                                        </button>

                                        <AnimatePresence>
                                            {showProfileMenu && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/60 p-2 z-50 text-sm font-semibold text-slate-600"
                                                >
                                                    <div className="px-3 py-2.5 flex items-center gap-3 hover:text-slate-900 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"><SettingsIcon className="h-4 w-4" /> Profile Settings</div>
                                                    <div className="px-3 py-2.5 flex items-center gap-3 hover:text-slate-900 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"><CreditCard className="h-4 w-4" /> Subscription</div>
                                                    <div className="border-t border-slate-100 my-1"></div>
                                                    <div className="px-3 py-2.5 flex items-center gap-3 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors"><MessageSquare className="h-4 w-4" /> Sign Out</div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Nav Mockup */}
                            <div className="bg-white border-b border-slate-100/60 pl-10 flex items-center overflow-x-auto no-scrollbar pt-2">
                                {[
                                    { name: 'Dashboard', icon: Home, active: true },
                                    { name: 'Invoices', icon: FileText, active: false },
                                    { name: 'Clients', icon: Users, active: false },
                                    { name: 'Verify', icon: ShieldCheck, active: false },
                                    { name: 'History', icon: Clock, active: false },
                                    { name: 'Reports', icon: BarChart2, active: false },
                                    { name: 'Expenses', icon: Receipt, active: false },
                                    { name: 'Settings', icon: SettingsIcon, active: false },
                                ].map(item => (
                                    <div key={item.name} className={`flex items-center gap-2 px-4 py-3 text-[13px] font-bold whitespace-nowrap cursor-pointer transition-all ${item.active ? 'bg-slate-50 text-slate-900 border-b-2 border-slate-900 -mb-[1px] rounded-t-lg shadow-[inset_0_1px_0_rgba(0,0,0,0.02)]' : 'text-slate-500 hover:text-slate-900'}`}>
                                        <item.icon className={`h-4 w-4 ${item.active ? 'text-slate-900' : 'text-slate-400'}`} />
                                        {item.name}
                                    </div>
                                ))}
                            </div>

                            {/* Dashboard Content Mockup */}
                            <div className="p-10 space-y-10">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-1">Welcome back!</h2>
                                    <p className="text-slate-400 text-sm font-medium">Here's what's happening with your business today.</p>
                                </div>

                                <div className="grid grid-cols-4 gap-6">
                                    {/* Earnings Card */}
                                    <div className="bg-[#121826] rounded-2xl p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">Billio</span>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+12%</span>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-black tracking-tight mb-1">₦450,000</div>
                                            <div className="text-xs text-slate-400">This month's earnings</div>
                                        </div>
                                    </div>
                                    {/* Invoices Sent */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-sm"></div>
                                            </div>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+8%</span>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black tracking-tight mb-1">5</div>
                                            <div className="text-xs text-slate-400">Invoices Sent</div>
                                        </div>
                                    </div>
                                    {/* Active Clients */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                                            </div>
                                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">+15%</span>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black tracking-tight mb-1">2</div>
                                            <div className="text-xs text-slate-400">Active Clients</div>
                                        </div>
                                    </div>
                                    {/* Outstanding */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm h-[160px]">
                                        <div className="flex justify-between items-start">
                                            <div className="h-8 w-8 bg-slate-50 rounded-xl flex items-center justify-center">
                                                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                                            </div>
                                            <span className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">-3%</span>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black tracking-tight mb-1">₦0</div>
                                            <div className="text-xs text-slate-400">Outstanding</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue & Activity Row Mockup */}
                            <div className="grid grid-cols-3 gap-6 mt-6 px-10">
                                {/* Left Column (Revenue & Quick Actions) */}
                                <div className="col-span-2 flex flex-col gap-6">
                                    {/* Revenue Overview Mockup */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex-1">
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Last 7 days performance</p>
                                        </div>
                                        {/* Mock Chart Area */}
                                        <div className="w-full relative pt-6 pb-2">
                                            <div className="h-[200px] flex items-end relative border-b border-slate-100 pb-5">
                                                {/* Y-axis markers */}
                                                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-bold text-slate-400 h-full py-2">
                                                    <span>50k</span><span>40k</span><span>30k</span><span>20k</span><span>10k</span>
                                                </div>

                                                {/* Chart Area */}
                                                <div className="ml-8 w-full h-full relative border-l border-slate-100">
                                                    {/* Background Grid Lines */}
                                                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                                        <div className="w-full border-t border-slate-100 opacity-60 h-0"></div>
                                                        <div className="w-full border-t border-slate-100 opacity-60 h-0"></div>
                                                        <div className="w-full border-t border-slate-100 opacity-60 h-0"></div>
                                                        <div className="w-full border-t border-slate-100 opacity-60 h-0"></div>
                                                    </div>

                                                    {/* X-axis labels */}
                                                    <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-[10px] text-slate-400 font-bold px-4">
                                                        <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span>
                                                    </div>

                                                    {/* Cool Smooth SV Graph */}
                                                    <svg className="absolute bottom-[-1px] left-0 right-0 w-full h-full overflow-visible z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                                                        <path d="M 0 80 C 15 75, 20 40, 35 50 C 50 60, 60 20, 75 30 C 85 35, 95 5, 100 0 L 100 100 L 0 100 Z" fill="url(#gradientFillCool)" />
                                                        <path d="M 0 80 C 15 75, 20 40, 35 50 C 50 60, 60 20, 75 30 C 85 35, 95 5, 100 0" fill="none" stroke="#2563eb" strokeWidth="2.5" style={{ strokeLinecap: "round", strokeLinejoin: "round", filter: "drop-shadow(0px 8px 6px rgba(37,99,235,0.25))" }} vectorEffect="non-scaling-stroke" />
                                                        <defs>
                                                            <linearGradient id="gradientFillCool" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="rgb(37 99 235 / 0.15)" />
                                                                <stop offset="100%" stopColor="rgb(37 99 235 / 0)" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>

                                                    {/* Glowing Point at the end */}
                                                    <div className="absolute top-[0%] right-[0%] h-[12px] w-[12px] bg-white rounded-full border-[3px] border-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] z-10 translate-x-1/2 -translate-y-1/2"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions Mockup */}
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-4">Quick Actions</h3>
                                        <div className="grid grid-cols-4 gap-3">
                                            <Link href="/auth/register" className="bg-[#121826] text-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-colors">
                                                <Plus className="h-5 w-5" />
                                                <span className="text-[11px] font-bold">Create Invoice</span>
                                            </Link>
                                            <Link href="/auth/register" className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors">
                                                <UserPlus className="h-5 w-5 opacity-70" />
                                                <span className="text-[11px] font-bold">Add Client</span>
                                            </Link>
                                            <Link href="/auth/register" className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors">
                                                <CreditCard className="h-5 w-5 opacity-70" />
                                                <span className="text-[11px] font-bold">Log Expense</span>
                                            </Link>
                                            <Link href="/auth/register" className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm transition-colors">
                                                <BarChart2 className="h-5 w-5 opacity-70" />
                                                <span className="text-[11px] font-bold">Reports</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column (Recent Activity) */}
                                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Activity className="h-5 w-5 text-slate-600" />
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Activity</h3>
                                    </div>
                                    <div className="space-y-6 flex-1">
                                        {[
                                            { id: '585', date: '19 Jan 2026', amount: '₦20,000' },
                                            { id: '693', date: '31 Dec 2025', amount: '₦10,000' },
                                            { id: '924', date: '30 Dec 2025', amount: '₦100,000' },
                                            { id: '383', date: '30 Dec 2025', amount: '₦220,000' },
                                            { id: '625', date: '20 Oct 2025', amount: '₦100,000' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                                                <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                                                    <CheckCircle className="h-[14px] w-[14px] stroke-[3px]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900 mb-0.5">Payment received for INV-202512-{item.id}</p>
                                                    <p className="text-[10px] text-slate-500 font-medium">{item.amount} • {item.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Recent Invoices Table Mockup */}
                            <div className="mt-8 px-10 pb-10">
                                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-slate-900">Recent Invoices</h3>
                                        <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700">View All</button>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest px-6 py-4 border-b border-slate-50 bg-slate-50/50">
                                            <div className="col-span-1">Invoice</div>
                                            <div className="col-span-1">Client</div>
                                            <div className="col-span-1">Date</div>
                                            <div className="col-span-1">Amount</div>
                                            <div className="col-span-1 text-right">Status</div>
                                        </div>
                                        {[
                                            { id: 'INV-2026-001', client: 'Techcorp Industries', date: 'Mar 25, 2026', amount: '₦450,000', status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' },
                                            { id: 'INV-2026-002', client: 'Nexus Create', date: 'Mar 22, 2026', amount: '₦125,000', status: 'Pending', statusColor: 'bg-orange-100 text-orange-700' },
                                            { id: 'INV-2026-003', client: 'Global Logistics', date: 'Mar 18, 2026', amount: '₦890,000', status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-700' }
                                        ].map((inv, idx) => (
                                            <div key={idx} className="grid grid-cols-5 text-sm font-medium text-slate-700 px-6 py-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer items-center">
                                                <div className="col-span-1 font-bold text-slate-900">{inv.id}</div>
                                                <div className="col-span-1 flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex-shrink-0 border border-slate-300 overflow-hidden shadow-inner"></div>
                                                    {inv.client}
                                                </div>
                                                <div className="col-span-1 text-slate-500">{inv.date}</div>
                                                <div className="col-span-1 font-bold text-slate-900">{inv.amount}</div>
                                                <div className="col-span-1 text-right flex justify-end">
                                                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${inv.statusColor}`}>
                                                        {inv.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
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
