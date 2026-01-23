import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

import Features from "@/components/sections/Features";

import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";

import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
 
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />

      <Footer />
    </div>
  );
}