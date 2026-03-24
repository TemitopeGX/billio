"use client";

import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "API Docs", href: "/api" },
      { name: "Changelog", href: "/changelog" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    resources: [
      { name: "Help Center", href: "/support" },
      { name: "System Status", href: "/status" },
      { name: "Community", href: "/community" },
      { name: "Blog", href: "/blog" },
      { name: "Invoice Templates", href: "/templates" },
    ]
  };

  const social = [
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
  ];

  return (
    <footer className="bg-[#0F172A] text-white relative py-20 overflow-hidden font-sans border-t border-slate-800 shadow-[inset_0_20px_40px_rgba(0,0,0,0.3)]">

      {/* Premium Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Massive Pre-Footer CTA */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-10 md:p-16 mb-24 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 group">

          {/* Internal Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] group-hover:bg-blue-400/30 transition-colors duration-700 pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif' }}>
              Ready to modernize your billing?
            </h3>
            <p className="text-slate-400 text-lg md:text-xl">
              Join thousands of professionals getting paid faster. Set up your account in under 2 minutes.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col gap-4">
            <a href="/auth/register" className="h-14 px-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all transform hover:-translate-y-1">
              Start for free
              <ArrowRight className="h-5 w-5" />
            </a>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              No credit card required
            </div>
          </div>
        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl font-black tracking-tight text-white">Billio.</div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
              The ultimate invoicing platform designed for freelancers, agencies, and modern businesses who value speed and pure aesthetics.
            </p>

            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full w-fit px-4 py-2 hover:bg-slate-800 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">All systems operational</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase text-xs mb-6">Product</h4>
            <ul className="space-y-4">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-transform">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase text-xs mb-6">Company</h4>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-transform">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white tracking-wider uppercase text-xs mb-6">Resources</h4>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-transform">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

        {/* Bottom Bar: Copyright & Developers */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          {/* Copyright & Social */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <span>&copy; {new Date().getFullYear()} Billio Inc.</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            </div>

            <div className="hidden sm:block h-4 w-px bg-slate-700"></div>

            <div className="flex items-center gap-4">
              {social.map((item, i) => (
                <a key={i} href={item.href} className="text-slate-500 hover:text-white hover:-translate-y-1 transition-all">
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Dev Companies Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Proudly Built By</span>

            <div className="flex items-center gap-3">
              {/* DevLuxe Studio Logo */}
              <a href="#" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <img src="/DEVELOPER/devluxe.png" alt="DevLuxe Studio" className="h-6 w-auto object-contain" />
              </a>

              <span className="text-slate-600 text-[10px] font-bold">x</span>

              {/* TemitopeGX Logo */}
              <a href="#" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <img src="/DEVELOPER/temitopegx.png" alt="TemitopeGX" className="h-6 w-auto object-contain" />
              </a>
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}