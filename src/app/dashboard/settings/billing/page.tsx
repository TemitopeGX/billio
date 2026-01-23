"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsBillingPage() {
  return (
    <div className="p-4 space-y-4">
      <Card className="border-0 shadow-sm max-w-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Billing</CardTitle>
          <CardDescription>Manage your subscription and payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border p-3 bg-white/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-muted-foreground">Starter • ₦2,500/month</p>
              </div>
              <Button variant="outline" size="sm">Change plan</Button>
            </div>
          </div>
          <div className="rounded-lg border p-3 bg-white/60">
            <p className="font-medium mb-2">Payment Method</p>
            <Button size="sm">Add card</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
