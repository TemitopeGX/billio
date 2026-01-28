"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import { Tag } from "lucide-react";

export default function SettingsBillingPage() {
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      setLoading(true);
      setCouponMessage("");

      const response = await api.post('/coupons/apply', {
        code: couponCode
      });

      const { message } = response.data.data;

      setCouponSuccess(true);
      setCouponMessage(message);
      toast.success(message);

      // Here you would typically save the applied coupon to the subscription context

    } catch (error: any) {
      setCouponSuccess(false);
      const msg = error.response?.data?.error?.message || "Invalid coupon";
      setCouponMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="border-0 shadow-sm max-w-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Billing</CardTitle>
          <CardDescription>Manage your subscription and payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border p-4 bg-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-slate-500">Starter • ₦2,500/month</p>
              </div>
              <Button variant="outline" size="sm">Change plan</Button>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-white/60">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium">Payment Method</p>
              <Button variant="ghost" size="sm" className="h-8">Update</Button>
            </div>
            <p className="text-sm text-slate-500">No payment method added.</p>
            <Button size="sm" className="mt-3">Add card</Button>
          </div>

          <div className="rounded-lg border p-4 bg-white/60">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-slate-500" />
              <p className="font-medium">Promo Code</p>
            </div>
            <div className="flex gap-3 max-w-sm">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900 uppercase"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button size="sm" onClick={handleApplyCoupon} disabled={loading || !couponCode}>
                {loading ? 'Checking...' : 'Apply'}
              </Button>
            </div>
            {couponMessage && (
              <p className={`text-sm mt-2 ml-1 font-medium ${couponSuccess ? 'text-green-600' : 'text-red-500'}`}>
                {couponMessage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
