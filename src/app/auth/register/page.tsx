"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/api";

function RegisterContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (!formData.email.includes('@')) {
        toast.error('Please enter a valid email address');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
      }

      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password
      };

      const response = await api.post('/auth/register', registrationData);
      const responseData = response.data;
      const data = responseData.data || responseData;

      if (!data.token || !data.user) {
        throw new Error('Invalid response from server');
      }

      if (planParam) {
        localStorage.setItem('intendedPlan', planParam);
      }

      login(data.token, data.user);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error: any) {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Registration error:', error);
      }

      // Handle different error response structures
      let errorMessage = 'Registration failed. Please try again.';

      if (error.response?.data?.error) {
        const errorData = error.response.data.error;
        // Check if error is an object with message property
        errorMessage = typeof errorData === 'string'
          ? errorData
          : errorData.message || errorMessage;
      } else if (error.response?.data?.details) {
        errorMessage = typeof error.response.data.details === 'string'
          ? error.response.data.details
          : errorMessage;
      } else if (error.response?.status === 403) {
        errorMessage = 'Registration is currently unavailable. Please contact support.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.message && !error.message.includes('status code')) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Logo */}
      <div className="text-center mb-10">
        <Link href="/" className="inline-block">
          <span className="text-4xl font-black text-slate-900 tracking-tighter">
            Billio.
          </span>
        </Link>
      </div>

      {/* Register Card */}
      <Card className="border border-slate-200 bg-white shadow-none rounded-[2rem]">
        <CardHeader className="text-center pb-8 px-8 pt-10">
          <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Create your account</CardTitle>
          <CardDescription className="text-slate-500 text-base">
            Get started with Billio today
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  required
                  className="h-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  required
                  className="h-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 801 234 5678"
                required
                className="h-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    required
                    className="h-12 pr-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    required
                    className="h-12 pr-12 rounded-xl bg-white border-slate-200 focus:border-slate-900 focus:ring-0 text-slate-900 placeholder:text-slate-400"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <Label htmlFor="terms" className="text-sm text-slate-600 leading-tight">
                I agree to the{" "}
                <Link href="/terms" className="text-slate-900 font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-slate-900 font-bold hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-none transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-slate-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-slate-900 font-bold hover:underline transition-all"
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <Suspense fallback={<div className="flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <RegisterContent />
      </Suspense>
    </div>
  );
}
