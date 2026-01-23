"use client";

import { Search, HelpCircle, MessageCircle, Mail, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/sections/Navbar";

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      articles: [
        "How to create your first invoice",
        "Setting up your account",
        "Adding your business information",
        "Understanding the dashboard"
      ]
    },
    {
      title: "Billing & Payments",
      icon: CheckCircle,
      articles: [
        "Payment methods accepted",
        "Understanding pricing",
        "Billing cycle information",
        "Payment processing fees"
      ]
    },
    {
      title: "Account Management",
      icon: MessageCircle,
      articles: [
        "Updating profile information",
        "Changing password",
        "Account security settings",
        "Data export options"
      ]
    },
    {
      title: "Technical Support",
      icon: Phone,
      articles: [
        "Browser compatibility",
        "Mobile app troubleshooting",
        "Integration issues",
        "Performance optimization"
      ]
    }
  ];

  const popularArticles = [
    "How to create and send your first invoice",
    "Setting up payment methods for your clients",
    "Understanding invoice statuses and tracking",
    "Customizing invoice templates",
    "Managing client information",
    "Exporting your data and reports"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] to-[#1E3A8A]/90 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Help Center
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Find answers to your questions and get the support you need to make the most of Billio.
            </p>
            
            {/* Search Bar */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-600">Get instant help from our support team</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="mailto:support@billio.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                  <p className="text-sm text-gray-600">Send us a detailed message</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+1234567890"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-sm text-gray-600">Call us for urgent issues</p>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]/90 rounded-3xl p-8 text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Support Hours</h2>
            </div>
            <p className="text-blue-100 text-lg">
              Monday - Friday: 9:00 AM - 6:00 PM (GMT+1)<br />
              Saturday: 10:00 AM - 4:00 PM (GMT+1)<br />
              Sunday: Closed
            </p>
            <p className="text-blue-200 text-sm mt-4">
              During the free launch period, we provide 24/7 priority support for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mt-4 text-lg text-gray-600">Find help articles organized by topic</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E3A8A]/5 mb-4">
                  <category.icon className="h-6 w-6 text-[#1E3A8A]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex} className="text-sm text-gray-600 hover:text-[#1E3A8A] cursor-pointer">
                      {article}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Popular Articles</h2>
            <p className="mt-4 text-lg text-gray-600">Most viewed help articles</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="text-gray-900 font-medium">{article}</span>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1E3A8A] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 bg-[#1E3A8A]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#1E3A8A] shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </a>
              <a
                href="mailto:support@billio.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/20"
              >
                <Mail className="h-5 w-5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
