"use client";

import { useState } from "react";
import {
    CheckCircle,
    Clock,
    XCircle,
    RefreshCw,
    DollarSign,
    TrendingUp,
    Receipt,
    Eye,
    FileText,
    AlertTriangle,
    ArrowUp,
    Download,
    CreditCard,
    User,
    Calendar,
    Hash,
    MessageSquare,
    X
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";

interface Payment {
    id: string;
    invoiceId: string;
    invoiceNumber: string;
    paymentAmount: number;
    status: 'pending' | 'paid' | 'rejected';
    paymentMethod: string;
    paymentReference?: string;
    notes?: string;
    receiptFilePath?: string;
    invoiceFilePath?: string;
    clientName?: string;
    clientEmail?: string;
    userName?: string;
    companyName?: string;
    createdAt: string;
    updatedAt: string;
    verifiedAt?: string;
    verifiedBy?: string;
}

interface PaymentStats {
    total: number;
    pending: number;
    paid: number;
    totalAmount: number;
}

export default function PaymentVerificationPage() {
    const queryClient = useQueryClient();
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
    const [viewingPayment, setViewingPayment] = useState<Payment | null>(null);

    // Fetch payments for the current user
    const {
        data: paymentsData,
        isLoading: paymentsLoading,
        isError: paymentsError,
        refetch
    } = useQuery({
        queryKey: ['my-payments'],
        queryFn: async () => {
            const response = await api.get('/payments');
            return response.data.data;
        }
    });

    // Fetch payment stats
    const {
        data: statsData,
        isLoading: statsLoading
    } = useQuery({
        queryKey: ['my-payment-stats'],
        queryFn: async () => {
            const response = await api.get('/payments/stats');
            return response.data.data.stats || response.data.data;
        }
    });

    // Update payment status mutation
    const updateStatusMutation = useMutation({
        mutationFn: async ({ paymentId, status }: { paymentId: string; status: 'paid' | 'rejected' }) => {
            const response = await api.put(`/payments/${paymentId}/status`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-payments'] });
            queryClient.invalidateQueries({ queryKey: ['my-payment-stats'] });
            toast.success(actionType === 'approve' ? 'Payment verified successfully!' : 'Payment rejected');
            setSelectedPayment(null);
            setActionType(null);
            setViewingPayment(null);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error?.message || 'Failed to update payment status');
        }
    });

    const payments: Payment[] = paymentsData?.payments || [];
    const stats: PaymentStats = statsData || {
        total: 0,
        pending: 0,
        paid: 0,
        totalAmount: 0
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return <Badge className="bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1 text-xs font-medium">Verified</Badge>;
            case 'pending':
                return <Badge className="bg-amber-50 text-amber-700 border-amber-200 rounded-full px-3 py-1 text-xs font-medium">Pending</Badge>;
            case 'rejected':
                return <Badge className="bg-red-50 text-red-700 border-red-200 rounded-full px-3 py-1 text-xs font-medium">Rejected</Badge>;
            default:
                return <Badge className="bg-muted text-foreground border-border rounded-full px-3 py-1 text-xs font-medium">{status || '—'}</Badge>;
        }
    };

    const handleAction = (payment: Payment, action: 'approve' | 'reject') => {
        setSelectedPayment(payment);
        setActionType(action);
    };

    const confirmAction = () => {
        if (selectedPayment && actionType) {
            updateStatusMutation.mutate({
                paymentId: selectedPayment.id,
                status: actionType === 'approve' ? 'paid' : 'rejected'
            });
        }
    };

    const downloadFile = (filePath: string) => {
        const encodedPath = encodeURIComponent(filePath);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1';
        window.open(`${baseUrl}/payments/download/${encodedPath}`, '_blank');
    };

    return (
        <div className="p-0 space-y-6 sm:space-y-8 max-w-[100rem] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tight">Payment Verification</h1>
                    <p className="text-slate-500 text-sm sm:text-lg font-medium">Review and verify payments from your clients.</p>
                </div>
                <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="border-slate-200 text-slate-900 hover:bg-slate-50 rounded-xl px-4 py-3 font-bold w-full sm:w-auto"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards - Modern Design */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {/* Total Payments */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                            <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-slate-900" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-600">
                            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                    <div className="mt-auto space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm font-medium text-slate-500 line-clamp-1">Total Payments</p>
                        <p className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 truncate">{statsLoading ? '…' : stats.total}</p>
                    </div>
                </div>

                {/* Pending Verification */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl">
                            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                        </div>
                        {stats.pending > 0 && (
                            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-100 text-amber-700">
                                <span>Action needed</span>
                            </div>
                        )}
                    </div>
                    <div className="mt-auto space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm font-medium text-slate-500 line-clamp-1">Pending</p>
                        <p className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 truncate">{statsLoading ? '…' : stats.pending}</p>
                    </div>
                </div>

                {/* Verified Payments */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl">
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-700">
                            <ArrowUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>+8%</span>
                        </div>
                    </div>
                    <div className="mt-auto space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm font-medium text-slate-500 line-clamp-1">Verified</p>
                        <p className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 truncate">{statsLoading ? '…' : stats.paid}</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl">
                            <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-slate-900" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-600">
                            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>Rev</span>
                        </div>
                    </div>
                    <div className="mt-auto space-y-0.5 sm:space-y-1">
                        <p className="text-[10px] sm:text-sm font-medium text-slate-500 line-clamp-1">Total Amount</p>
                        <p className="text-lg xs:text-xl sm:text-3xl font-bold text-slate-900 truncate">{statsLoading ? '…' : formatCurrency(stats.totalAmount)}</p>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Payment Submissions</h3>
                            <p className="text-slate-500 mt-1 font-medium text-xs sm:text-sm">
                                {paymentsLoading ? 'Loading…' : paymentsError ? 'Failed to load' : `${payments.length} payment${payments.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-0">
                    {paymentsLoading ? (
                        <div className="py-16 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading payments...</p>
                        </div>
                    ) : paymentsError ? (
                        <div className="py-16 text-center">
                            <div className="p-4 bg-red-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                            </div>
                            <p className="text-red-600 font-medium">Error loading payments</p>
                            <p className="text-muted-foreground text-sm mt-1">Please try again later</p>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="p-4 bg-muted rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <Receipt className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground font-medium">No payments yet</p>
                            <p className="text-muted-foreground text-sm mt-1">Payments from your clients will appear here</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-slate-100 hover:bg-transparent">
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 pl-4 sm:pl-6 text-xs sm:text-sm whitespace-nowrap">Invoice</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Client</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Amount</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Method</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Date</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap">Status</TableHead>
                                        <TableHead className="font-bold text-slate-900 py-3 sm:py-4 pr-4 sm:pr-6 text-right text-xs sm:text-sm whitespace-nowrap">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment) => (
                                        <TableRow key={payment.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="py-3 sm:py-4 pl-4 sm:pl-6 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <FileText className="h-4 w-4 text-slate-400" />
                                                    <span className="font-bold text-slate-900 text-xs sm:text-sm">{payment.invoiceNumber}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                                                <p className="font-medium text-slate-600 text-xs sm:text-sm">{payment.clientName || '—'}</p>
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                                                <p className="font-bold text-slate-900 text-xs sm:text-sm">{formatCurrency(payment.paymentAmount)}</p>
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                                                <p className="text-slate-600 capitalize text-xs sm:text-sm">{payment.paymentMethod?.replace('_', ' ')}</p>
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                                                <p className="text-slate-500 text-xs sm:text-sm">{formatDate(payment.createdAt)}</p>
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 whitespace-nowrap">
                                                {getStatusBadge(payment.status)}
                                            </TableCell>
                                            <TableCell className="py-3 sm:py-4 pr-4 sm:pr-6 text-right whitespace-nowrap">
                                                <div className="flex gap-2 justify-end">
                                                    {/* View Details Button */}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900"
                                                        onClick={() => setViewingPayment(payment)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    {payment.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 rounded-full hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"
                                                                onClick={() => handleAction(payment, 'approve')}
                                                                disabled={updateStatusMutation.isPending}
                                                            >
                                                                <CheckCircle className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 rounded-full hover:bg-red-50 text-red-600 hover:text-red-700"
                                                                onClick={() => handleAction(payment, 'reject')}
                                                                disabled={updateStatusMutation.isPending}
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Details Dialog - Clean Redesign */}
            <Dialog open={!!viewingPayment} onOpenChange={(open) => !open && setViewingPayment(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 sm:px-6 py-4 border-b bg-slate-50/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                                    <Receipt className="h-5 w-5 text-slate-900" />
                                </div>
                                <div className="min-w-0">
                                    <DialogTitle className="text-base sm:text-lg font-bold text-slate-900 truncate">Payment Review</DialogTitle>
                                    <DialogDescription className="text-xs sm:text-sm text-slate-500 truncate">
                                        {viewingPayment?.invoiceNumber}
                                    </DialogDescription>
                                </div>
                            </div>
                            {viewingPayment && getStatusBadge(viewingPayment.status)}
                        </div>
                    </div>

                    {viewingPayment && (
                        <div className="px-4 sm:px-6 py-5 space-y-5 max-h-[80vh] sm:max-h-[60vh] overflow-y-auto">
                            {/* Amount Highlight */}
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                                <p className="text-xs sm:text-sm text-emerald-600 font-medium mb-1 uppercase tracking-wider">Amount Paid</p>
                                <p className="text-2xl sm:text-3xl font-black text-slate-900">{formatCurrency(viewingPayment.paymentAmount)}</p>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Payment Details</h4>
                                <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
                                    <div className="flex justify-between items-center py-1 border-b border-slate-100 pb-3">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Client</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900">{viewingPayment.clientName || '—'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-100 pb-3">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Payment Method</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900 capitalize">{viewingPayment.paymentMethod?.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-slate-100 pb-3">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Reference</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[120px] sm:max-w-none">{viewingPayment.paymentReference || '—'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Submitted</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900">{formatDate(viewingPayment.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Client Notes */}
                            {viewingPayment.notes && (
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Client Notes</h4>
                                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                        <p className="text-sm text-amber-800">{viewingPayment.notes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Attached Files */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Attached Files</h4>
                                <div className="space-y-2">
                                    {viewingPayment.receiptFilePath ? (
                                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-3">
                                                <Receipt className="h-5 w-5 text-blue-600" />
                                                <div>
                                                    <p className="font-medium text-blue-800 text-sm">Payment Receipt</p>
                                                    <p className="text-xs text-blue-600">Proof of payment</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700 text-white h-8"
                                                onClick={() => downloadFile(viewingPayment.receiptFilePath!)}
                                            >
                                                <Download className="h-4 w-4 mr-1" />
                                                Download
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                                            <Receipt className="h-5 w-5 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">No receipt uploaded</p>
                                        </div>
                                    )}

                                    {viewingPayment.invoiceFilePath && (
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-600" />
                                                <div>
                                                    <p className="font-medium text-gray-800 text-sm">Invoice Copy</p>
                                                    <p className="text-xs text-gray-600">Client's copy</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8"
                                                onClick={() => downloadFile(viewingPayment.invoiceFilePath!)}
                                            >
                                                <Download className="h-4 w-4 mr-1" />
                                                Download
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    {viewingPayment?.status === 'pending' && (
                        <div className="px-4 sm:px-6 py-4 border-t bg-slate-50/50 flex flex-col sm:flex-row gap-3">
                            <Button
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold h-11"
                                onClick={() => {
                                    setSelectedPayment(viewingPayment);
                                    setActionType('approve');
                                }}
                                disabled={updateStatusMutation.isPending}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify Payment
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-bold h-11"
                                onClick={() => {
                                    setSelectedPayment(viewingPayment);
                                    setActionType('reject');
                                }}
                                disabled={updateStatusMutation.isPending}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <AlertDialog open={!!selectedPayment && !!actionType} onOpenChange={(open) => !open && setSelectedPayment(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionType === 'approve' ? 'Verify Payment' : 'Reject Payment'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {actionType === 'approve'
                                ? `Are you sure you want to verify this payment of ${selectedPayment ? formatCurrency(selectedPayment.paymentAmount) : ''} for invoice ${selectedPayment?.invoiceNumber}? This will mark the invoice as paid.`
                                : `Are you sure you want to reject this payment? The client may need to resubmit their payment information.`
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={updateStatusMutation.isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmAction}
                            disabled={updateStatusMutation.isPending}
                            className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                        >
                            {updateStatusMutation.isPending ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </>
                            ) : (
                                actionType === 'approve' ? 'Verify Payment' : 'Reject Payment'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
