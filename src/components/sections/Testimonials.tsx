"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    content: "Billio completely transformed how we handle invoicing. We used to spend hours every Friday; now it's automated and takes minutes.",
    author: "Sarah Jenks",
    role: "Founder, Studio Design",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
    company: "DesignCo"
  },
  {
    content: "The best investment we made this year. Clients pay faster because the invoices look professional and the payment links just work.",
    author: "Michael Chen",
    role: "Freelance Developer",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces",
    company: "DevStream"
  },
  {
    content: "I love the notification feature. Knowing exactly when a client views an invoice removes so much anxiety from the process.",
    author: "Jessica Lee",
    role: "Marketing Consultant",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
    company: "GrowthLabs"
  },
  {
    content: "Simple, clean, and fast. Exactly what a small business needs without the bloat of enterprise software.",
    author: "David Ross",
    role: "Owner, Ross Plumbing",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    company: "RossFix"
  },
  {
    content: "The production quality of the invoices is unmatched. My clients actually compliment me on them!",
    author: "Emily Watson",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=100&h=100&fit=crop&crop=faces",
    company: "EW Photo"
  },
  {
    content: "Customer support is incredible. They helped me set up my complex tax requirements in no time.",
    author: "James Miller",
    role: "E-commerce Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    company: "ShopifyPlus"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Loved by businesses everywhere
            </h2>
            <p className="text-xl text-slate-500">
              Join thousands of freelancers and agencies who trust Billio.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 flex-1">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-100 relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}