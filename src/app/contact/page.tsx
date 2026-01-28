"use client";

import React, { useState } from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Message sent successfully! We'll get back to you soon.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* Left Column: Contact Info */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Let's talk.</h1>
              <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed">
                We'd love to hear from you. Whether you have a question about features, trials, pricing, or need a demo, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Email us</h3>
                    <p className="text-slate-500">Our friendly team is here to help.</p>
                    <a href="mailto:hello@billio.website" className="text-blue-600 font-medium hover:underline mt-1 block">hello@billio.website</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Office</h3>
                    <p className="text-slate-500">Come say hello at our office headquarters.</p>
                    <p className="text-slate-900 font-medium mt-1">100 Smith Street<br />Collingwood VIC 3066 AU</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Phone</h3>
                    <p className="text-slate-500">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+1(555)000-0000" className="text-slate-900 font-medium mt-1 block">+1 (555) 000-0000</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required className="bg-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="bg-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help..." className="min-h-[150px] bg-white resize-none" required />
                </div>

                <Button type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
