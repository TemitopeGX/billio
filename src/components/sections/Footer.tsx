"use client";

export default function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Templates", href: "/templates" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Legal", href: "/legal" },
    ],
    resources: [
      { name: "Help Center", href: "/support" },
      { name: "API Documentation", href: "/api" },
      { name: "System Status", href: "/status" },
      { name: "Blog", href: "/blog" },
    ]
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 lg:pt-24 pb-0 font-sans relative overflow-hidden flex flex-col">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-20">

          {/* Brand Info */}
          <div className="lg:w-1/3 pr-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-6">Billio<span className="text-white">.</span></h2>
            <p className="text-slate-400 text-balance leading-relaxed mb-8 max-w-sm">
              The ultimate invoicing platform designed for freelancers, agencies, and modern businesses. Simplify your billing operations today.
            </p>
          </div>

          {/* Nav Links */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            <div>
              <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Product</h4>
              <ul className="space-y-4">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Company</h4>
              <ul className="space-y-4">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 tracking-wide text-sm uppercase">Resources</h4>
              <ul className="space-y-4">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-800/60 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-sm text-slate-500 mb-12 lg:mb-20">
          <p className="font-medium text-center md:text-left">&copy; {new Date().getFullYear()} Billio Inc. All rights reserved.</p>

          {/* Developer Outro */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 ml-2">Developed By</span>
            <div className="flex items-center gap-5 saturate-0 hover:saturate-100 transition-all duration-500 group">
              <a href="https://devluxestudio.site/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity hover:-translate-y-0.5 transform duration-300">
                <img src="/DEVELOPER/devluxe.png" alt="DevLuxe Studio" className="h-5 lg:h-6 w-auto object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
              </a>
              <span className="text-slate-700 italic font-serif text-xs">x</span>
              <a href="https://github.com/TemitopeGX" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity hover:-translate-y-0.5 transform duration-300">
                <img src="/DEVELOPER/temitopegx.png" alt="TemitopeGX" className="h-5 lg:h-6 w-auto object-contain filter group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Edge-to-Edge Bottom Graphic */}
      <div className="w-full pointer-events-none mt-auto flex overflow-hidden">
        <img
          src="/Manage%20With%20Billio.png"
          alt="Manage With Billio"
          className="w-full h-auto object-cover opacity-90 translate-y-1 sm:translate-y-2 lg:translate-y-4"
        />
      </div>
    </footer>
  );
}