"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const plans = [
  {
    name: "Free",
    slug: "free",
    price: 0,
    description: "Perfect for freelancers just starting out.",
    features: [
      "5 Invoices / month",
      "3 Clients",
      "Basic reporting",
      "Email support"
    ],
    highlight: false
  },
  {
    name: "Starter",
    slug: "starter",
    price: 3000,
    description: "Great for growing small businesses.",
    features: [
      "50 Invoices / month",
      "20 Clients",
      "PDF Export",
      "Payment Tracking",
      "Priority Support"
    ],
    highlight: true
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: 15000,
    description: "For established businesses needing full power.",
    features: [
      "Unlimited Invoices",
      "Unlimited Clients",
      "Advanced Analytics",
      "Custom Branding",
      "Multi-user Access"
    ],
    highlight: false
  }
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handlePlanSelect = (slug: string) => {
    if (user) {
      router.push('/dashboard/settings?tab=billing');
    } else {
      router.push(`/auth/register?plan=${slug}`);
    }
  };

  return (
    <section id="pricing" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-500 mb-10">
            Start for free, upgrade when you need to.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300 focus:outline-none"
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-white rounded-full shadow-sm"
              />
            </button>
            <span className={`text-sm font-semibold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly <span className="text-green-600 ml-1 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-[2rem] p-8 flex flex-col ${plan.highlight
                ? 'bg-slate-900 text-white ring-4 ring-slate-900/5 transform md:-translate-y-4'
                : 'bg-white text-slate-900 border border-slate-200'
                }`}
            >
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-4xl lg:text-5xl font-bold tracking-tight">
                  {plan.price === 0 ? 'Free' : `₦${(isAnnual ? Math.round(plan.price * 12 * 0.8 / 12) : plan.price).toLocaleString()}`}
                </span>
                <span className={`ml-2 text-sm font-semibold ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.highlight ? 'text-white' : 'text-slate-900'}`} />
                    </div>
                    <span className={`text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePlanSelect(plan.slug)}
                className={`w-full py-4 rounded-xl font-bold transition-all text-sm ${plan.highlight
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
              >
                {plan.price === 0 ? "Get Started" : `Choose ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>

      </div>
    </section>
  );
}
