"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Loader2,
  Receipt,
} from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

interface Invoice {
  id: string;
  number: string;
  status: string;
  total: number;
  dueAt?: string;
  dueDate?: string;
}

export default function ClientDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const [clientResponse, invoicesResponse] = await Promise.all([
          api.get(`/clients/${id}`),
          api.get(`/invoices?clientId=${id}`),
        ]);

        // Handle both response formats: direct client data or nested under data.client
        const clientData = clientResponse.data.data?.client || clientResponse.data;
        let rawInvoices = invoicesResponse.data.data?.invoices || invoicesResponse.data;

        // Normalize invoice data
        const normalizedInvoices = (Array.isArray(rawInvoices) ? rawInvoices : []).map((inv: any) => ({
          ...inv,
          dueDate: inv.dueAt || inv.dueDate,
          total: Number(inv.total || inv.amount || 0)
        }));

        setClient(clientData);
        setInvoices(normalizedInvoices);
      } catch (error) {
        console.error("Error fetching client details:", error);
        toast.error("Failed to load client details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Client not found</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
      case "sent":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Top Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        <Link href={`/dashboard/clients/${id}/edit`}>
          <Button className="bg-slate-900 text-white hover:bg-slate-800">
            <Pencil className="h-4 w-4 mr-2" /> Edit Client
          </Button>
        </Link>
      </div>

      {/* Main Client Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {/* Dark Header */}
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-slate-800 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-400">
              {client.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{client.name}</h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Building2 className="h-4 w-4" />
                {client.company || "No Company"}
              </div>
            </div>
          </div>

          {/* Quick Stats (Mock for now, could be real later) */}
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8 mt-4 md:mt-0">
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Invoiced</p>
              <p className="text-xl font-bold">{formatCurrency(invoices.reduce((sum, inv) => sum + (inv.total || 0), 0))}</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Invoices</p>
              <p className="text-xl font-bold">{invoices.length}</p>
            </div>
          </div>
        </div>

        {/* Client Info Grid */}
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
              <Mail className="h-5 w-5 text-slate-400 mt-1" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium text-slate-900">{client.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
              <Phone className="h-5 w-5 text-slate-400 mt-1" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="font-medium text-slate-900">{client.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
              <MapPin className="h-5 w-5 text-slate-400 mt-1" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Address</p>
                <p className="font-medium text-slate-900 whitespace-pre-line">{client.address || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Invoices</h3>
          <Link href={`/dashboard/invoices/new?client=${client.id}`}>
            <Button variant="outline" size="sm" className="font-bold">
              <Receipt className="h-4 w-4 mr-2" /> New Invoice
            </Button>
          </Link>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="h-12 w-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No invoices for this client yet</p>
            <Link href={`/dashboard/invoices/new?client=${client.id}`}>
              <Button variant="outline" className="mt-4">Create Invoice</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice #</th>
                  <th className="text-left py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="text-right py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="text-right py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <Link href={`/dashboard/invoices/${invoice.id}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        {invoice.number}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">
                      {formatCurrency(invoice.total)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link href={`/dashboard/invoices/${invoice.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
