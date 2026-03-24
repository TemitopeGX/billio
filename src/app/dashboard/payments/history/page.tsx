"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, CreditCard, FileText, Loader2, ArrowRight } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";
import { toast } from "sonner";

interface Payment {
  id: string;
  paymentReference: string;
  clientName: string;
  createdAt: string;
  status: string;
  paymentAmount: string;
}

export default function PaymentsHistoryPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/payments?limit=50'); // Fetch last 50
      if (response.data.success) {
        setPayments(response.data.data.payments);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'verified':
      case 'success':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-none px-3 py-1 rounded-full text-xs font-bold">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 shadow-none px-3 py-1 rounded-full text-xs font-bold">Pending</Badge>;
      case 'failed':
      case 'rejected':
        return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 shadow-none px-3 py-1 rounded-full text-xs font-bold">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 sm:mb-2 tracking-tight text-center sm:text-left">Payment History</h1>
          <p className="text-slate-500 text-sm sm:text-lg text-center sm:text-left">Track and manage your transaction history.</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search payments by reference or customer..."
                className="pl-12 pr-4 py-6 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select>
              <SelectTrigger className="w-40 bg-white border-slate-200 rounded-xl h-full font-medium">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-6 font-medium">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Transactions</h3>
            <p className="text-slate-500 font-medium mt-1 text-xs sm:text-sm">Showing latest transactions</p>
          </div>
          <Button variant="ghost" size="sm" onClick={fetchPayments} className="text-slate-500 h-8 sm:h-10 text-xs sm:text-sm">
            Refresh
          </Button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
            </div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No payments found.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 hover:bg-transparent">
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 pl-4 sm:pl-6 text-xs sm:text-sm whitespace-nowrap">Reference</TableHead>
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Customer</TableHead>
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Date</TableHead>
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-right text-xs sm:text-sm whitespace-nowrap">Amount</TableHead>
                  <TableHead className="font-bold text-slate-900 py-3 sm:py-4 pr-4 sm:pr-6 text-right text-xs sm:text-sm whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="py-3 sm:py-4 pl-4 sm:pl-6 font-medium text-slate-900 whitespace-nowrap">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="p-1.5 sm:p-2 bg-slate-50 rounded-lg shrink-0">
                          <CreditCard className="h-4 w-4 text-slate-900" />
                        </div>
                        <span className="font-mono text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">{payment.paymentReference || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 text-slate-600 font-medium text-xs sm:text-sm whitespace-nowrap">{payment.clientName}</TableCell>
                    <TableCell className="py-3 sm:py-4 text-slate-500 text-xs sm:text-sm whitespace-nowrap">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 text-right font-bold text-slate-900 text-xs sm:text-sm whitespace-nowrap">
                      ₦{Number(payment.paymentAmount).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-3 sm:py-4 pr-4 sm:pr-6 text-right whitespace-nowrap">
                      {(payment.status === 'paid' || payment.status === 'verified') && (
                        <Link href={`/dashboard/payments/receipts/${payment.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 p-0 sm:p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm">
                            <FileText className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Receipt</span>
                          </Button>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
