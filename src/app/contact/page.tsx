"use client";

import { Mail, Phone, MapPin, MessageCircle, Send, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/sections/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "support@billio.com",
      description: "Send us an email and we'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM to 6 PM GMT+1"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Street, Lagos, Nigeria",
      description: "Come say hello at our office"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Get instant help from our support team"
    }
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "partnership", label: "Partnership" },
    { value: "feedback", label: "Feedback" }
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
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our team. We're here to help you succeed with Billio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-600">Choose your preferred way to reach us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E3A8A]/5 mx-auto mb-6">
                  <info.icon className="h-8 w-8 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-[#1E3A8A] mb-2">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
            <p className="mt-4 text-lg text-gray-600">Fill out the form below and we'll get back to you soon</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-900 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1E3A8A] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#1E3A8A]/90 hover:shadow-xl"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Response Time Info */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]/90 rounded-3xl p-8 text-center text-white"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Response Times</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">24 Hours</div>
                <div className="text-blue-100">Email Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">Instant</div>
                <div className="text-blue-100">Live Chat</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200 mb-2">2 Hours</div>
                <div className="text-blue-100">Phone Support</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              During the free launch period, all users receive priority support with faster response times.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Quick Answers?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Check out our FAQ section for instant answers to common questions.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-8 py-4 text-base font-semibold text-gray-900 transition-all hover:bg-gray-200"
            >
              <CheckCircle className="h-5 w-5" />
              Visit Help Center
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
