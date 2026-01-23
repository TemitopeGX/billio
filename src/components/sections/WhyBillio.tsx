"use client";

import { CheckCircle2, Zap, Shield, Clock, TrendingUp, Users, BarChart3, FileText, CreditCard, Star, Award, Globe, Lock, ArrowRight, Sparkles, Target, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyBillio() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header animation
    if (headerRef.current) {
      gsap.fromTo(headerRef.current.children, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cards animation
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.9,
          rotationY: 15
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.2, 
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stats animation
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, 
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      subtitle: "Bank-level protection",
      description: "Your data is protected with military-grade encryption, regular security audits, and compliance with international standards including ISO 27001 and SOC 2 Type II.",
      highlights: ["256-bit SSL encryption", "GDPR compliant", "Regular security audits", "SOC 2 Type II certified"],
      primaryColor: "#121566",
      secondaryColor: "#ff6600",
      bgColor: "#f8f9fa"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      subtitle: "Data-driven insights",
      description: "Get detailed reports on revenue trends, client behavior, and payment patterns with our AI-powered analytics dashboard.",
      highlights: ["₦2.4M processed this month", "98% success rate", "24h average payment time", "AI-powered insights"],
      primaryColor: "#121566",
      secondaryColor: "#ff6600",
      bgColor: "#f8f9fa"
    },
    {
      icon: Users,
      title: "24/7 Support",
      subtitle: "Always here for you",
      description: "Our dedicated success team ensures you get the most out of Billio with personalized onboarding and ongoing optimization.",
      highlights: ["Round-the-clock assistance", "Growth insights", "Lightning fast processing", "Success guarantee"],
      primaryColor: "#121566",
      secondaryColor: "#ff6600",
      bgColor: "#f8f9fa"
    },
    {
      icon: FileText,
      title: "Smart Invoicing",
      subtitle: "AI-powered generation",
      description: "Our AI automatically suggests pricing, detects duplicates, and learns from your patterns to create smarter invoices.",
      highlights: ["Auto-generate from templates", "Custom branding & logos", "Multi-currency support", "Automated follow-ups"],
      primaryColor: "#121566",
      secondaryColor: "#ff6600",
      bgColor: "#f8f9fa"
    },
    {
      icon: CreditCard,
      title: "Global Payments",
      subtitle: "Seamless processing",
      description: "Accept payments from anywhere in the world with support for 50+ currencies and local payment methods.",
      highlights: ["Multiple payment methods", "Instant notifications", "Recurring billing", "Fraud protection"],
      primaryColor: "#121566",
      secondaryColor: "#ff6600",
      bgColor: "#f8f9fa"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-6 border border-blue-200">
            <Target className="h-4 w-4" />
            Why Choose Billio?
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why choose
            </span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Billio?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of businesses that trust Billio to streamline their invoicing and get paid faster.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group text-center bg-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 card-shadow hover:border-blue-300">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="text-5xl font-black text-foreground mb-2 group-hover:text-blue-600 transition-colors">10,000+</div>
            <div className="text-muted-foreground font-semibold">Happy Customers</div>
            <div className="w-full h-1 bg-blue-200 rounded-full mt-4">
              <div className="w-4/5 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="group text-center bg-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 card-shadow hover:border-green-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <div className="text-5xl font-black text-foreground mb-2 group-hover:text-green-600 transition-colors">₦50M+</div>
            <div className="text-muted-foreground font-semibold">Invoices Processed</div>
            <div className="w-full h-1 bg-green-200 rounded-full mt-4">
              <div className="w-full h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="group text-center bg-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 card-shadow hover:border-orange-300">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="text-5xl font-black text-foreground mb-2 group-hover:text-orange-600 transition-colors">99.9%</div>
            <div className="text-muted-foreground font-semibold">Uptime</div>
            <div className="w-full h-1 bg-orange-200 rounded-full mt-4">
              <div className="w-5/6 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-black text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
              Join thousands of businesses already using Billio to streamline their invoicing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-card text-blue-600 font-bold rounded-xl hover:bg-muted transform hover:scale-105 transition-all duration-300 shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-card hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}