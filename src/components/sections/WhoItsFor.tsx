"use client";

import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function WhoItsFor() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("Freelancers & Creators");

    const categories = [
        {
            id: "Freelancers & Creators",
            title: "Freelancers & Creators",
            description: "Create professional invoices and receive international payments easily from global clients.",
            image: "/images/who-its-for/freelancers.webp",
            imageClass: "bg-slate-800"
        },
        {
            id: "Agencies",
            title: "Agencies",
            description: "Manage billing for multiple retainers and scale your operations without administrative friction.",
            image: "/images/who-its-for/agencies.webp",
            imageClass: "bg-slate-700"
        },
        {
            id: "Consultants",
            title: "Consultants",
            description: "Bill accurately for your time and expertise with automated milestone invoicing.",
            image: "/images/who-its-for/consultants.webp",
            imageClass: "bg-slate-900"
        },
        {
            id: "Startups",
            title: "Startups",
            description: "Keep your cash flow positive with instant payment links and automated receipt generation.",
            image: "/images/who-its-for/startups.webp",
            imageClass: "bg-blue-900"
        },
        {
            id: "Small Businesses",
            title: "Small Businesses",
            description: "Consolidate all your client billing into one centralized, pristine dashboard.",
            image: "/images/who-its-for/business.webp",
            imageClass: "bg-slate-800"
        }
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
        }
    };

    return (
        <section className="w-full bg-white py-24 md:py-32 overflow-hidden border-t border-slate-100 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header and Controls */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12 gap-8">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 leading-none">
                        Billio for everyone
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 border border-slate-200 rounded-full p-1.5 shadow-sm bg-white overflow-x-auto max-w-full no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveTab(cat.id);
                                    // Scroll to the item in the carousel
                                    const index = categories.findIndex(c => c.id === cat.id);
                                    if (scrollContainerRef.current) {
                                        const width = scrollContainerRef.current.offsetWidth > 600 ? 624 : scrollContainerRef.current.offsetWidth * 0.85 + 24;
                                        scrollContainerRef.current.scrollTo({ left: index * width, behavior: 'smooth' });
                                    }
                                }}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${activeTab === cat.id
                                    ? "bg-[#0e0f2b] text-white shadow"
                                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                {cat.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    {/* Scroll Buttons - Hidden on Mobile, shown on Hover on Desktop */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 rounded-full flex flex-col items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    >
                        <ChevronLeft className="h-5 w-5 mr-0.5" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-800 rounded-full flex flex-col items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    >
                        <ChevronRight className="h-5 w-5 ml-0.5" />
                    </button>

                    {/* Scrolling Track */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 no-scrollbar scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className={`relative flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] h-[400px] lg:h-[480px] rounded-[2rem] overflow-hidden snap-center flex flex-col justify-between p-8 sm:p-12 transition-all duration-300 ${cat.imageClass}`}
                            >
                                {/* Background Image */}
                                {cat.image && (
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="absolute inset-0 w-full h-full object-cover z-0"
                                        onError={(e) => {
                                            // Fallback if image doesn't exist
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                )}

                                {/* Gradient Overlay for Text Contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0"></div>

                                {/* Top Title */}
                                <h3 className="text-xl sm:text-2xl font-bold text-white relative z-10 tracking-tight">
                                    {cat.title}
                                </h3>

                                {/* Bottom Description */}
                                <p className="text-sm sm:text-base text-white/90 font-medium leading-relaxed relative z-10 max-w-sm mt-auto">
                                    {cat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
