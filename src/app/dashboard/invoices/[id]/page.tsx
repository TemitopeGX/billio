"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  Download,
  Mail,
  Edit,
  Building2,
  Mail as MailIcon,
  Phone,
  MapPin,
  Calendar,
  Receipt,
  Loader2,
} from "lucide-react";
import api from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { useInvoiceActions } from "@/hooks/useInvoiceActions";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
  total: number;
}

interface Invoice {
  id: string;
  number: string;
  status: string;
  issuedAt: string;
  dueAt: string;
  notes?: string;
  items: InvoiceItem[];
  client: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
  };
  subtotal?: number;
  tax?: number;
  discount?: number;
  total?: number;
}

export default function InvoiceDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { downloadPDF, sendEmail, isLoading: isActionLoading } = useInvoiceActions();

  // Calculate invoice totals
  const calculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalTax = items.reduce((sum, item) =>
      sum + ((item.quantity * item.unitPrice) * (item.tax || 0) / 100), 0);
    const totalDiscount = items.reduce((sum, item) =>
      sum + ((item.quantity * item.unitPrice) * (item.discount || 0) / 100), 0);
    const total = subtotal + totalTax - totalDiscount;

    return { subtotal, tax: totalTax, discount: totalDiscount, total };
  };

  // Calculate item total
  const calculateItemTotal = (item: InvoiceItem) => {
    const baseAmount = item.quantity * item.unitPrice;
    const taxAmount = baseAmount * (item.tax || 0) / 100;
    const discountAmount = baseAmount * (item.discount || 0) / 100;
    return baseAmount + taxAmount - discountAmount;
  };

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const response = await api.get(`/invoices/${id}`);
        const invoiceData = response.data.data.invoice;

        // Calculate item totals
        const items = invoiceData.items.map((item: InvoiceItem) => ({
          ...item,
          total: calculateItemTotal(item)
        }));

        // Set invoice with calculated totals
        setInvoice({
          ...invoiceData,
          items,
          ...calculateTotals(items)
        });
      } catch (error) {
        console.error('Error fetching invoice details:', error);
        toast.error("Failed to load invoice details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoiceDetails();
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase() || 'draft';
    const styles = {
      paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
      sent: "bg-blue-100 text-blue-800 border-blue-200",
      overdue: "bg-red-100 text-red-800 border-red-200",
      draft: "bg-slate-100 text-slate-800 border-slate-200"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles[statusLower as keyof typeof styles] || styles.draft}`}>
        {status || 'Draft'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 mb-4">Invoice not found</p>
        <Button onClick={() => router.back()} variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Top Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" className="text-slate-500 hover:text-slate-900" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Invoices
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => downloadPDF(invoice.id)} disabled={isActionLoading}>
            {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => sendEmail(invoice.id)} disabled={isActionLoading}>
            {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4 mr-2" />}
            Send Email
          </Button>
          <Button onClick={() => router.push(`/dashboard/invoices/${invoice.id}/edit`)} className="bg-slate-900 text-white hover:bg-slate-800">
            <Edit className="h-4 w-4 mr-2" /> Edit Invoice
          </Button>
        </div>
      </div>

      {/* Main Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Dark Header */}
        <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="h-6 w-6 text-slate-400" />
              <h1 className="text-2xl font-bold">{invoice.client.company || 'Company Name'}</h1>
            </div>
            <div className="text-slate-400 text-sm space-y-1">
              <p>{invoice.client.email}</p>
              {invoice.client.phone && <p>{invoice.client.phone}</p>}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold tracking-tight">INVOICE</h2>
            <p className="text-slate-400 mt-1 text-lg">#{invoice.number}</p>
          </div>
        </div>

        <div className="p-8">

          {/* Amount & Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col justify-center items-center text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Amount Due</p>
              <p className="text-4xl font-extrabold text-slate-900 mb-4">{formatCurrency(invoice.total || 0)}</p>
              <div>{getStatusBadge(invoice.status)}</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Invoice Date</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {new Date(invoice.issuedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {new Date(invoice.dueAt).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bill To</p>
                <p className="font-bold text-slate-900">{invoice.client.name}</p>
                <p className="text-sm text-slate-600">{invoice.client.email}</p>
                {invoice.client.address && <p className="text-sm text-slate-600 whitespace-pre-line mt-1">{invoice.client.address}</p>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">Line Items</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="pb-4">Description</th>
                  <th className="pb-4 text-right">Qty</th>
                  <th className="pb-4 text-right">Price</th>
                  <th className="pb-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-4 font-medium text-slate-900">{item.description}</td>
                    <td className="py-4 text-right text-slate-600">{item.quantity}</td>
                    <td className="py-4 text-right text-slate-600">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-4 text-right font-bold text-slate-900">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-1/3 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax</span>
                <span className="font-medium">{formatCurrency(invoice.tax || 0)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Discount</span>
                <span className="font-medium text-red-600">-{formatCurrency(invoice.discount || 0)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">{formatCurrency(invoice.total || 0)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notes</p>
              <p className="text-sm text-slate-600 whitespace-pre-line">{invoice.notes}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}