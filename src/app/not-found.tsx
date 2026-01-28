import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/sections/Navbar";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-blue-100 overflow-hidden relative">

            {/* Background Gradient - Darker at bottom (Brand Blue), White at top */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-100 via-blue-50/50 to-white"></div>

            {/* Navbar */}
            <div className="relative z-50">
                <Navbar />
            </div>

            <main className="flex-1 flex flex-col items-center justify-center relative w-full pt-16 min-h-[calc(100vh-80px)]">

                {/* Massive 404 Background Text - Centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none select-none z-10">
                    <h1 className="text-[35vw] font-black text-white leading-none tracking-tighter drop-shadow-sm opacity-80">
                        404
                    </h1>
                </div>

                <div className="relative z-20 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center pb-12">

                    {/* Character Image - Centered */}
                    <div className="flex justify-center lg:justify-end order-1">
                        <div className="relative w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[600px] aspect-square">
                            <Image
                                src="/404-character.png"
                                alt="Confused cute monster holding a map"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Text Content - Right Side */}
                    <div className="text-center lg:text-left space-y-6 lg:space-y-8 lg:pl-4 order-2">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                            You've hit a dead end.
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-lg mx-auto lg:mx-0">
                            We can't find the page you're looking for. It might have been removed, renamed, or doesn't exist.
                        </p>

                        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/">
                                <Button size="lg" className="h-12 sm:h-14 px-8 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base font-bold">
                                    Go Back Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
