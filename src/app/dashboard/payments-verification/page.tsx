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
        <div className="p-8 space-y-8">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">Payment Verification</h1>
                    <p className="text-muted-foreground text-lg">Review and verify payments from your clients.</p>
                </div>
                <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted rounded-xl px-4 py-3"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards - Modern Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Total Payments */}
                <div className="bg-card rounded-2xl p-6 card-shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl">
                            <Receipt className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <TrendingUp className="h-3 w-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Payments</p>
                        <p className="text-3xl font-bold text-foreground">{statsLoading ? '…' : stats.total}</p>
                    </div>
                </div>

                {/* Pending Verification */}
                <div className="bg-card rounded-2xl p-6 card-shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20 rounded-xl">
                            <Clock className="h-6 w-6 text-amber-600" />
                        </div>
                        {stats.pending > 0 && (
                            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                <span>Action needed</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Pending Verification</p>
                        <p className="text-3xl font-bold text-foreground">{statsLoading ? '…' : stats.pending}</p>
                    </div>
                </div>

                {/* Verified Payments */}
                <div className="bg-card rounded-2xl p-6 card-shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <ArrowUp className="h-3 w-3" />
                            <span>+8%</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Verified</p>
                        <p className="text-3xl font-bold text-foreground">{statsLoading ? '…' : stats.paid}</p>
                    </div>
                </div>

                {/* Total Amount */}
                <div className="bg-card rounded-2xl p-6 card-shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl">
                            <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <TrendingUp className="h-3 w-3" />
                            <span>Revenue</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-foreground">{statsLoading ? '…' : formatCurrency(stats.totalAmount)}</p>
                    </div>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-card rounded-2xl card-shadow-sm">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Payment Submissions</h3>
                            <p className="text-muted-foreground mt-1">
                                {paymentsLoading ? 'Loading…' : paymentsError ? 'Failed to load' : `${payments.length} payment${payments.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
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
                                    <TableRow className="border-b border-gray-100">
                                        <TableHead className="font-semibold text-foreground py-4">Invoice</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Client</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Amount</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Method</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Date</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Status</TableHead>
                                        <TableHead className="font-semibold text-foreground py-4">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment) => (
                                        <TableRow key={payment.id} className="border-b border-gray-50 hover:bg-muted transition-colors">
                                            <TableCell className="py-4">
                                                <div className="flex items-center space-x-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium text-foreground">{payment.invoiceNumber}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <p className="font-medium text-foreground">{payment.clientName || '—'}</p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <p className="font-semibold text-foreground">{formatCurrency(payment.paymentAmount)}</p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <p className="text-foreground capitalize">{payment.paymentMethod?.replace('_', ' ')}</p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <p className="text-foreground">{formatDate(payment.createdAt)}</p>
                                            </TableCell>
                                            <TableCell className="py-4">
                                                {getStatusBadge(payment.status)}
                                            </TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex gap-2">
                                                    {/* View Details Button */}
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1"
                                                        onClick={() => setViewingPayment(payment)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Review
                                                    </Button>

                                                    {payment.status === 'pending' && (
                                                        <>
                                                            <Button
                                                                size="sm"
                                                                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-1"
                                                                onClick={() => handleAction(payment, 'approve')}
                                                                disabled={updateStatusMutation.isPending}
                                                            >
                                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                                Verify
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg px-3 py-1"
                                                                onClick={() => handleAction(payment, 'reject')}
                                                                disabled={updateStatusMutation.isPending}
                                                            >
                                                                <XCircle className="h-4 w-4 mr-1" />
                                                                Reject
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
                    <div className="px-6 py-4 border-b bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Receipt className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <DialogTitle className="text-lg font-semibold">Payment Review</DialogTitle>
                                    <DialogDescription className="text-sm">
                                        {viewingPayment?.invoiceNumber}
                                    </DialogDescription>
                                </div>
                            </div>
                            {viewingPayment && getStatusBadge(viewingPayment.status)}
                        </div>
                    </div>

                    {viewingPayment && (
                        <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
                            {/* Amount Highlight */}
                            <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-center">
                                <p className="text-sm text-green-600 mb-1">Amount Paid</p>
                                <p className="text-2xl font-bold text-green-700">{formatCurrency(viewingPayment.paymentAmount)}</p>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Payment Details</h4>
                                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Client</span>
                                        <span className="font-medium">{viewingPayment.clientName || '—'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Payment Method</span>
                                        <span className="font-medium capitalize">{viewingPayment.paymentMethod?.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-sm text-muted-foreground">Reference</span>
                                        <span className="font-medium">{viewingPayment.paymentReference || '—'}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-muted-foreground">Submitted</span>
                                        <span className="font-medium">{formatDate(viewingPayment.createdAt)}</span>
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
                        <div className="px-6 py-4 border-t bg-muted/30 flex gap-3">
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
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
                                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
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
