"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPreferencesPage() {
  return (
    <div className="p-4 space-y-4">
      <Card className="border-0 shadow-sm max-w-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3 bg-white/60">
            <p>Email notifications</p>
            <Button variant="outline" size="sm">Toggle</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3 bg-white/60">
            <p>Dark mode</p>
            <Button variant="outline" size="sm">Toggle</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
