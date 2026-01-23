"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsTeamPage() {
  return (
    <div className="p-4 space-y-4">
      <Card className="border-0 shadow-sm max-w-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Team</CardTitle>
          <CardDescription>Manage team members and roles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3 bg-white/60">
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Owner</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <Button size="sm">Invite Member</Button>
        </CardContent>
      </Card>
    </div>
  );
}
