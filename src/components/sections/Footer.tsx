"use client";

import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "API Docs", href: "/api" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Status", href: "/status" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
    ],
  };

  const social = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
  ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden pt-24 pb-12">
      <div className="mx-auto max-w-[90rem] px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-24">
          {/* Newsletter & Bio */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-4">Stay ahead of the curve.</h3>
              <p className="text-slate-400 max-w-md text-lg">
                Join our newsletter for tips on financial operations and product updates.
              </p>
            </div>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-none rounded-lg px-4 py-3 w-full text-white placeholder-slate-500 focus:ring-1 focus:ring-white/50"
              />
              <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                Join
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              {social.map((item, i) => (
                <a key={i} href={item.href} className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Product</h4>
              <ul className="space-y-4">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Company</h4>
              <ul className="space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-slate-200">Legal</h4>
              <ul className="space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <p className="text-slate-500 text-sm">Developed by TemitopeGX</p>
            <p className="text-slate-500 text-sm">&copy; 2024 Billio Inc. All rights reserved.</p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300">All systems operational</span>
          </div>
        </div>

      </div>

      {/* Massive Background Title */}
      <h1 className="absolute bottom-[-5vw] left-1/2 -translate-x-1/2 text-[25vw] font-black text-white/5 tracking-tighter pointer-events-none select-none leading-none z-0">
        Billio.
      </h1>
    </footer>
  );
}