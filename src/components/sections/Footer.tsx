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
    <footer className="bg-[#0F172A] text-white pt-20 pb-12 font-sans">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 pr-8">
            <div className="text-2xl font-bold tracking-tight text-white mb-6">Billio.</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              The ultimate invoicing platform designed for freelancers, agencies, and businesses.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-white text-sm mb-6">Product</h4>
            <ul className="space-y-4">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-white text-sm mb-6">Company</h4>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="font-semibold text-white text-sm mb-6">Resources</h4>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-800 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>&copy; {new Date().getFullYear()} Billio Inc.</span>
          </div>

          {/* Developer Outro */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">Developed by</span>
            <div className="flex items-center gap-3">
              <a href="https://devluxestudio.site/" target="_blank" className="opacity-70 hover:opacity-100 transition-opacity">
                <img src="/DEVELOPER/devluxe.png" alt="DevLuxe Studio" className="h-5 w-auto object-contain" />
              </a>
              <span className="text-slate-600 text-xs">x</span>
              <a href="https://github.com/TemitopeGX" target="_blank" className="opacity-70 hover:opacity-100 transition-opacity">
                <img src="/DEVELOPER/temitopegx.png" alt="TemitopeGX" className="h-5 w-auto object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}