"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Smartphone, Zap, Shield, CheckCircle2 } from "lucide-react";

export default function About() {
  const benefits = [
    {
      title: "Effortless Setup",
      description: "Get started in under 2 minutes. No complex configurations or training required.",
      icon: Smartphone
    },
    {
      title: "Lightning Fast",
      description: "Send invoices instantly and get paid up to 3x faster with automated reminders.",
      icon: Zap
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade 256-bit encryption protects every transaction and data point.",
      icon: Shield
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100">
              <div className="aspect-square bg-slate-50">
                <Image
                  src="/about-dashboard.png"
                  alt="Billio Dashboard Interface"
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 lg:bottom-8 lg:right-8 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-[220px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-600">This Month</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">$124,500</p>
                <p className="text-sm text-green-600 font-medium mt-1">↑ 12.5% vs last month</p>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-10 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 text-sm font-semibold text-blue-700">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                Why Choose Billio
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                The smarter way to manage your finances
              </h2>

              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Billio is more than invoicing software—it's a complete financial operations platform. We combine automation, analytics, and beautiful design to help you work smarter.
              </p>
            </div>

            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex gap-5 p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm border border-slate-100">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="/signup"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-lg font-semibold text-white transition-all hover:bg-slate-800 hover:scale-105"
              >
                Get Started Free
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}