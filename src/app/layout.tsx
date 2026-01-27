
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Billio - Modern Invoicing for SaaS",
    description: "Automated invoicing, payments, and financial tracking for modern businesses.",
    appleWebApp: {
        title: "Billio.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={outfit.className} suppressHydrationWarning>
                <Providers>
                    {children}
                </Providers>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
