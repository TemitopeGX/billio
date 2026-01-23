"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wallet, Building, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PayoutsPage() {
  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Payouts</h1>
          <p className="text-slate-500 text-lg">Manage and view your payouts to bank accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500">Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-0 pb-6">
            <p className="text-3xl font-black text-slate-900">₦540,250</p>
            <div className="p-3 bg-slate-50 rounded-xl">
              <Wallet className="h-6 w-6 text-slate-900" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500">Next Payout</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between pt-0 pb-6">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900">₦120,000</p>
              <p className="text-sm font-medium text-slate-400">Scheduled for Feb 05, 2024</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <ArrowUpRight className="h-6 w-6 text-slate-900" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3 pt-2 pb-6">
            <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold shadow-none">
              Request Payout
            </Button>
            <Button variant="outline" className="flex-1 border-slate-200 hover:bg-slate-50 rounded-xl h-12 font-bold text-slate-700">
              Add Bank
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="pb-6 border-b border-slate-100">
          <CardTitle className="text-xl font-bold text-slate-900">Payout History</CardTitle>
          <CardDescription className="text-slate-500 font-medium">Your recent payouts to bank</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-transparent border-b border-slate-100 hover:bg-transparent">
                  <TableHead className="font-bold text-slate-900 py-4 pl-6">Date</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Reference</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Bank</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-900 py-4 pr-6">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-slate-50 hover:bg-slate-50/50">
                  <TableCell className="py-4 pl-6 text-slate-600 font-medium">2024-02-01</TableCell>
                  <TableCell className="py-4 text-slate-900 font-medium">PAYOUT-20240201-01</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Building className="h-4 w-4 text-slate-400" />
                      GTBank •••• 4321
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-emerald-50 text-emerald-700 border-none shadow-none font-bold">Processed</Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6 font-bold text-slate-900">₦100,000</TableCell>
                </TableRow>
                <TableRow className="border-b border-transparent hover:bg-slate-50/50">
                  <TableCell className="py-4 pl-6 text-slate-600 font-medium">2024-01-25</TableCell>
                  <TableCell className="py-4 text-slate-900 font-medium">PAYOUT-20240125-02</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Building className="h-4 w-4 text-slate-400" />
                      Access Bank •••• 1180
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-emerald-50 text-emerald-700 border-none shadow-none font-bold">Processed</Badge>
                  </TableCell>
                  <TableCell className="text-right py-4 pr-6 font-bold text-slate-900">₦250,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
