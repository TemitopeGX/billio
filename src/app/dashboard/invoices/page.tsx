"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useInvoiceActions } from "@/hooks/useInvoiceActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Mail,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Receipt,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  TrendingUp
} from "lucide-react";
import { useInvoices } from "@/hooks/useInvoices";
import { InvoicesPageSkeleton } from "@/components/skeletons/page-skeletons";
import { EmptyState } from "@/components/ui/empty-state";

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'paid':
      return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">Paid</Badge>;
    case 'sent':
      return <Badge className="bg-slate-50 text-slate-700 border-slate-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">Sent</Badge>;
    case 'overdue':
      return <Badge className="bg-red-50 text-red-700 border-red-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">Overdue</Badge>;
    case 'draft':
      return <Badge className="bg-gray-50 text-gray-600 border-gray-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">Draft</Badge>;
    default:
      return <Badge className="bg-slate-50 text-slate-700 border-slate-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">{status || '—'}</Badge>;
  }
};

const formatCurrency = (amount: any) => {
  const num = typeof amount === 'string' ? Number(amount) : amount;
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(num as number);
};

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteInvoiceId, setDeleteInvoiceId] = useState<string | null>(null);
  const [sendEmailId, setSendEmailId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useInvoices();
  const { viewInvoice, editInvoice, downloadPDF, sendEmail, deleteInvoice, isLoading: isActionLoading } = useInvoiceActions();
  const invoices = Array.isArray(data) ? data : [];

  const filteredInvoices = invoices.filter((inv: any) => {
    const clientName = inv?.client?.name || '';
    const id = inv?.number || inv?.id || '';
    const status = (inv?.status || '').toLowerCase();
    const matchesSearch = clientName.toLowerCase().includes(searchTerm.toLowerCase()) || id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Show skeleton loader while loading
  if (isLoading) {
    return <InvoicesPageSkeleton />;
  }

  // Show empty state when no invoices exist
  if (!isLoading && invoices.length === 0) {
    return (
      <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-lg">Manage and track all your invoices in one place.</p>
        </div>

        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Start creating professional invoices for your clients. Track payments, send reminders, and get paid faster."
          actionLabel="Create Your First Invoice"
          onAction={() => window.location.href = '/dashboard/invoices/new'}
        />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Invoices</h1>
          <p className="text-slate-500 text-lg">Manage and track all your invoices in one place.</p>
        </div>
        <Link href="/dashboard/invoices/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3 font-bold shadow-none transition-all">
            <Plus className="h-5 w-5 mr-2" />
            New Invoice
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Invoices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Receipt className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Invoices</p>
            <p className="text-3xl font-bold text-slate-900">{isLoading ? '…' : invoices.length}</p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <DollarSign className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-slate-900">
              {isLoading ? '…' : formatCurrency(invoices.reduce((sum: number, inv: any) => sum + Number(inv.amount || 0), 0))}
            </p>
          </div>
        </div>

        {/* Paid Invoices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <CheckCircle className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+15%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Paid Invoices</p>
            <p className="text-3xl font-bold text-slate-900">{isLoading ? '…' : invoices.filter((inv: any) => (inv.status || '').toLowerCase() === 'paid').length}</p>
          </div>
        </div>

        {/* Overdue Invoices */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowDown className="h-3 w-3" />
              <span>-3%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Overdue</p>
            <p className="text-3xl font-bold text-slate-900">{isLoading ? '…' : invoices.filter((inv: any) => (inv.status || '').toLowerCase() === 'overdue').length}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search invoices by client name or invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-6 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 focus:bg-white transition-all text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-white border-slate-200 rounded-xl h-full font-medium">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-full border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl px-6 font-medium">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">All Invoices</h3>
              <p className="text-slate-500 mt-1 font-medium">
                {isLoading ? 'Loading…' : isError ? 'Failed to load' : `Showing ${filteredInvoices.length} of ${invoices.length} invoices`}
              </p>
            </div>
          </div>
        </div>
        <div className="p-0">
          {isError ? (
            <div className="py-16 text-center">
              <div className="p-4 bg-red-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-red-600 font-bold">Error loading invoices</p>
              <p className="text-slate-500 text-sm mt-1">Please try again later</p>
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="py-16">
              <EmptyState
                icon={Search}
                title="No invoices match your search"
                description="Try adjusting your filters or search terms to find what you're looking for."
                actionLabel="Clear Filters"
                onAction={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="font-bold text-slate-900 py-4 pl-6">Invoice</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Client</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Amount</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Status</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Issue Date</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Due Date</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4 pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((inv: any) => (
                    <TableRow key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4 pl-6">
                        <div>
                          <p className="font-bold text-slate-900">{inv.number || inv.id}</p>
                          <p className="text-sm text-slate-500">{inv.client?.email || '—'}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="font-medium text-slate-700">{inv.client?.name || '—'}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="font-bold text-slate-900">{formatCurrency(inv.amount)}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        {getStatusBadge(inv.status)}
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="text-slate-600 font-medium">{formatDate(inv.issuedAt)}</p>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="text-slate-600 font-medium">{formatDate(inv.dueAt)}</p>
                      </TableCell>
                      <TableCell className="py-4 pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 border-slate-200">
                            <DropdownMenuItem onClick={() => viewInvoice(inv.id)} className="py-3 cursor-pointer focus:bg-slate-50">
                              <Eye className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">View</p>
                                <p className="text-xs text-slate-500">Preview invoice</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => editInvoice(inv.id)} className="py-3 cursor-pointer focus:bg-slate-50">
                              <Edit className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Edit</p>
                                <p className="text-xs text-slate-500">Modify invoice</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => downloadPDF(inv.id)} disabled={isActionLoading} className="py-3 cursor-pointer focus:bg-slate-50">
                              <Download className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Download PDF</p>
                                <p className="text-xs text-slate-500">Export to PDF</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSendEmailId(inv.id)} disabled={isActionLoading} className="py-3 cursor-pointer focus:bg-slate-50">
                              <Mail className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Send Email</p>
                                <p className="text-xs text-slate-500">Email to client</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteInvoiceId(inv.id)}
                              className="py-3 text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer"
                              disabled={isActionLoading}
                            >
                              <Trash2 className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Delete</p>
                                <p className="text-xs opacity-70">Remove invoice</p>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteInvoiceId}
        onOpenChange={(open) => !open && setDeleteInvoiceId(null)}
      >
        <AlertDialogContent className="rounded-2xl border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-slate-900">Delete Invoice</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Are you sure you want to delete this invoice? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionLoading} className="rounded-xl border-slate-200 font-bold text-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (deleteInvoiceId) {
                  await deleteInvoice(deleteInvoiceId);
                  setDeleteInvoiceId(null);
                  refetch();
                }
              }}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700 rounded-xl font-bold"
            >
              {isActionLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                "Delete Invoice"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Email Confirmation Dialog */}
      <AlertDialog
        open={!!sendEmailId}
        onOpenChange={(open) => !open && setSendEmailId(null)}
      >
        <AlertDialogContent className="rounded-2xl border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-slate-900">Send Invoice</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Are you sure you want to send this invoice to the client? They will
              receive it via email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionLoading} className="rounded-xl border-slate-200 font-bold text-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (sendEmailId) {
                  await sendEmail(sendEmailId);
                  setSendEmailId(null);
                }
              }}
              disabled={isActionLoading}
              className="bg-slate-900 hover:bg-slate-800 rounded-xl font-bold"
            >
              {isActionLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                "Send Invoice"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
