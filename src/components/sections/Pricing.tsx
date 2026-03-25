"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/api";

interface Plan {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  interval: string;
  billing_period?: string;
  features: string[];
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/subscriptions/plans');
        // Handle different possible response structures
        const fetchedPlans = response.data?.data?.plans || response.data?.data || [];
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (slug: string) => {
    if (user) {
      router.push('/dashboard/settings?tab=billing');
    } else {
      router.push(`/auth/register?plan=${slug}`);
    }
  };

  const displayedPlans = plans.filter(p => {
    // Show free plan always? Or maybe Free doesn't have a billing period in DB
    if (p.name === 'Free') return true;

    // Check billing period or interval
    const cycle = isAnnual ? 'yearly' : 'monthly';
    return (p.billing_period === cycle || p.interval === cycle);
  }).sort((a, b) => {
    // Ensure Free is first, then ordered by price
    if (Number(a.price) === 0) return -1;
    if (Number(b.price) === 0) return 1;
    return Number(a.price) - Number(b.price);
  });

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
              Yearly <span className="text-emerald-600 ml-1 font-bold">(Save 17%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="col-span-3 flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
          ) : displayedPlans.map((plan, index) => {
            const isPopular = plan.name === 'Starter';
            const highlight = isPopular;

            return (
              <motion.div
                key={plan.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-[2rem] flex flex-col bg-white border ${highlight ? 'border-transparent shadow-[0_0_40px_-15px_rgba(0,0,0,0.1)]' : 'border-slate-200 shadow-sm'
                  }`}
              >
                {/* Soft gradient background for highlighted card */}
                {highlight && (
                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[2rem]">
                    <div className="absolute -top-12 -left-4 w-48 h-48 bg-blue-400/20 blur-[40px] rounded-full" />
                    <div className="absolute top-8 right-0 w-48 h-48 bg-orange-400/20 blur-[40px] rounded-full" />
                    <div className="absolute top-20 left-10 w-40 h-40 bg-yellow-400/30 blur-[40px] rounded-full" />
                  </div>
                )}

                <div className="p-8 pb-6 flex flex-col relative z-10 w-full">
                  <h3 className={`text-xl font-bold mb-4 ${!highlight ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-400' : 'text-slate-900'
                    }`}>
                    {plan.name}
                  </h3>

                  <div className="flex items-center mb-6">
                    <span className="text-[3rem] font-extrabold text-slate-900 tracking-tight leading-none">
                      {Number(plan.price) === 0 ? 'Free' : `₦${Number(plan.price).toLocaleString()}`}
                    </span>
                    {Number(plan.price) !== 0 && (
                      <div className="ml-3 flex flex-col text-[13px] font-medium text-slate-500 leading-tight">
                        <span>per user / month</span>
                        <span>billed {isAnnual ? 'annually' : 'monthly'}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handlePlanSelect(plan.slug)}
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all text-sm ${highlight
                        ? 'bg-[#1c1c1c] text-white hover:bg-black shadow-md'
                        : 'bg-slate-100/80 text-slate-900 border border-slate-200/60 shadow-sm hover:bg-slate-200'
                      }`}
                  >
                    Get started
                  </button>
                </div>

                <div className="px-8 pb-8 flex-1 flex flex-col relative z-10">
                  <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />
                  <div className="space-y-4 flex-1 pt-6">
                    {plan.features.slice(0, 6).map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm font-medium text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-4">
                    <button className="text-[13px] font-medium text-slate-400 hover:text-slate-600 transition-colors">
                      Need higher limits?
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
