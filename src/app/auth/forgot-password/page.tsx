"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Assuming a backend endpoint POST /auth/forgot-password exists
            await api.post('/auth/forgot-password', { email });
            setIsSuccess(true);
            toast.success('Password reset link sent!');
        } catch (error: any) {
            console.error('Forgot password error:', error);
            toast.error(error.response?.data?.message || 'Failed to send reset link.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">
                                Billio.
                            </span>
                        </Link>
                    </div>
                    <Card className="border border-slate-200 bg-white shadow-none rounded-[2rem]">
                        <CardHeader className="text-center pb-8 px-8 pt-10">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Check your email</CardTitle>
                            <CardDescription className="text-slate-500 text-base">
                                We have sent a password reset link to <span className="font-semibold text-slate-900">{email}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-10">
                            <div className="space-y-4">
                                <p className="text-sm text-center text-slate-500">
                                    Didn't receive the email? <button onClick={handleSubmit} disabled={isLoading} className="text-slate-900 font-bold hover:underline">Click to resend</button>
                                </p>
                                <Button
                                    onClick={() => router.push('/auth/login')}
                                    className="w-full h-12 bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 rounded-xl font-bold text-base shadow-none transition-all"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to login
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block">
                        <span className="text-4xl font-black text-slate-900 tracking-tighter">
                            Billio.
                        </span>
                    </Link>
                </div>

                {/* Forgot Password Card */}
                <Card className="border border-slate-200 bg-white shadow-none rounded-[2rem]">
                    <CardHeader className="text-center pb-8 px-8 pt-10">
                        <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Reset password</CardTitle>
                        <CardDescription className="text-slate-500 text-base">
                            Enter your email address and we'll send you instructions to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="h-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-none transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Sending link...
                                    </>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center text-slate-500 hover:text-slate-900 font-medium transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
