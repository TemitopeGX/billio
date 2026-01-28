import React from "react";
import "./HeroVisual.css";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const HeroVisual = () => {
    return (
        <div className="relative w-full flex justify-center lg:justify-end">
            {/* The Component Container - now wider */}
            <div className="hero-visual">

                {/* Content: Dashboard Image */}
                <div className="hero-visual__dashboard">
                    <Image
                        src="/dashboard-screenshot.png"
                        alt="Dashboard"
                        fill
                        className="object-cover object-left-top"
                    />
                </div>

                {/* Text Content - Dark text now since bg is lighter blue */}

            </div>

            {/* Floating Arrow Button - Positioned absolutely relative to the wrapper */}
            <div className="absolute bottom-[32px] right-[10%] lg:right-[32px] z-30">
                <button className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer text-white">
                    <ArrowUpRight className="h-7 w-7" />
                </button>
            </div>
        </div>
    );
};
