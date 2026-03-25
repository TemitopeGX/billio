"use client";

import React, { useState } from "react";
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Smartphone,
    LogOut,
    ChevronRight,
    Globe,
    Mail,
    Building
} from "lucide-react";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("profile");

    const subscription = {
        plan: {
            name: "Professional Plan",
            price: "₦5,000 / month",
        },
        status: "Active",
        nextBilling: "Oct 24, 2025"
    };

    const sections = [
        { id: "profile", name: "Profile Details", icon: User },
        { id: "billing", name: "Billing & Subscription", icon: CreditCard },
        { id: "notifications", name: "Notifications", icon: Bell },
        { id: "security", name: "Security", icon: Shield },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
                <p className="text-slate-500 font-medium">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3">
                    <nav className="flex flex-col gap-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === section.id
                                        ? "bg-[#0e0f2b] text-white shadow-lg"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <section.icon className="h-4 w-4" />
                                {section.name}
                            </button>
                        ))}
                        <div className="h-px bg-slate-100 my-4"></div>
                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-all">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </nav>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-9 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
                    {activeSection === "profile" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Profile Details</h3>
                                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                                    <div className="h-20 w-20 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                                        <User className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg">John Doe</h4>
                                        <p className="text-slate-500 text-sm">Owner at Acme Finance</p>
                                        <button className="mt-2 text-xs font-bold text-blue-600 hover:underline">Change avatar</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                        <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" defaultValue="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                                        <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" defaultValue="john@example.com" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "billing" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-6 font-sans">Billing & Subscription</h3>

                                <div className="bg-[#0e0f2b] rounded-2xl p-8 text-white mb-10 overflow-hidden relative">
                                    <div className="relative z-10">
                                        <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Current Plan</div>
                                        <h4 className="text-3xl font-black mb-6">{subscription.plan.name}</h4>
                                        <div className="flex items-center gap-6">
                                            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                                <div className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-1">Status</div>
                                                <div className="text-sm font-bold">{subscription.status}</div>
                                            </div>
                                            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                                <div className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-1">Price</div>
                                                <div className="text-sm font-bold">{subscription.plan.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
                                </div>

                                <div className="border border-slate-100 rounded-xl overflow-hidden">
                                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                        <h5 className="font-bold text-slate-700 text-sm">Payment History</h5>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 12 months</span>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        <div className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">September 2025</div>
                                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Receipt #8271</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-slate-900">₦5,000</div>
                                                <button className="text-[10px] font-bold text-blue-600 hover:underline tracking-widest uppercase">Download</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
