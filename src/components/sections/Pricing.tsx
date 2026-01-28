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
                className={`relative rounded-[2rem] p-8 flex flex-col ${highlight
                  ? 'bg-slate-900 text-white ring-4 ring-slate-900/5 transform md:-translate-y-4 shadow-xl'
                  : 'bg-white text-slate-900 border border-slate-200'
                  }`}
              >
                {isPopular && (
                  <div className="absolute top-0 right-0 left-0 mx-auto w-max -mt-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full border border-slate-800">
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                    {plan.description || "The perfect plan for you."}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline">
                  <span className="text-4xl lg:text-5xl font-bold tracking-tight">
                    {Number(plan.price) === 0 ? 'Free' : `₦${Number(plan.price).toLocaleString()}`}
                  </span>
                  {Number(plan.price) !== 0 && (
                    <span className={`ml-2 text-sm font-semibold ${highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                      /{isAnnual ? 'yr' : 'mo'}
                    </span>
                  )}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.slice(0, 6).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-0.5 ${highlight ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <Check className={`w-3.5 h-3.5 ${highlight ? 'text-white' : 'text-slate-900'}`} />
                      </div>
                      <span className={`text-sm ${highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.slug)}
                  className={`w-full py-4 rounded-xl font-bold transition-all text-sm ${highlight
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                >
                  {Number(plan.price) === 0 ? "Get Started" : `Choose ${plan.name}`}
                </button>
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
