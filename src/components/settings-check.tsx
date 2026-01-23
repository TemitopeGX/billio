"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Settings } from "lucide-react";
import { useCompanySettings, isCompanySettingsComplete } from "@/hooks/useCompanySettings";

export function SettingsCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: settings, isLoading } = useCompanySettings();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isCompanySettingsComplete(settings)) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle>Company Settings Required</CardTitle>
                <CardDescription>
                  Please complete your company settings before creating invoices
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                To ensure your invoices look professional and include all necessary information,
                you need to set up your company profile first. This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Company name and logo</li>
                <li>Business address</li>
                <li>Contact information</li>
                <li>Invoice customization</li>
              </ul>
              <Button 
                onClick={() => router.push('/dashboard/settings')}
                className="w-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                Complete Company Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
