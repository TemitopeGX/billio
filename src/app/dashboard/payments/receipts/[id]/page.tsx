"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, Mail, ArrowLeft, CheckCircle, Printer } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ReceiptPage() {
    const { id } = useParams();
    const router = useRouter();
    const [payment, setPayment] = useState<any>(null);
    const [invoice, setInvoice] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // 1. Fetch Payment
                const paymentRes = await api.get(`/payments/${id}`);
                if (!paymentRes.data.success) throw new Error("Payment not found");
                const paymentData = paymentRes.data.data.payment;
                setPayment(paymentData);

                // 2. Fetch Invoice (using invoiceId from payment)
                if (paymentData.invoiceId) {
                    const invoiceRes = await api.get(`/invoices/${paymentData.invoiceId}`);
                    if (invoiceRes.data.success) {
                        setInvoice(invoiceRes.data.data.invoice);
                    }
                }
            } catch (error) {
                console.error("Error fetching receipt data:", error);
                toast.error("Failed to load receipt details");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleDownload = async () => {
        try {
            setDownloading(true);
            const response = await api.get(`/payments/${id}/receipt`, {
                responseType: 'blob' // Important for PDF download
            });

            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `receipt-${payment.paymentReference || payment.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error("Download error:", error);
            toast.error("Failed to download receipt");
        } finally {
            setDownloading(false);
        }
    };

    const handleSendEmail = async () => {
        try {
            setSending(true);
            const response = await api.post(`/payments/${id}/receipt/send`);
            if (response.data.success) {
                toast.success("Receipt sent to client successfully");
            } else {
                throw new Error(response.data.error?.message || "Failed to send email");
            }
        } catch (error) {
            console.error("Send email error:", error);
            toast.error("Failed to send receipt email");
        } finally {
            setSending(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!payment || !invoice) {
        return (
            <div className="flex flex-col h-[80vh] items-center justify-center space-y-4">
                <p className="text-slate-500">Receipt details not found.</p>
                <Link href="/dashboard/payments/history">
                    <Button variant="outline">Back to History</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6 print:p-0">
            {/* Header Actions - Hidden when printing */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <Link href="/dashboard/payments/history">
                        <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 text-slate-500 hover:text-slate-900 bg-slate-100/50 rounded-xl">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Payment Receipt</h1>
                        <p className="text-slate-500 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">Ref: {payment.paymentReference || 'N/A'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:overflow-visible pb-1 sm:pb-0">
                    <Button variant="outline" onClick={handlePrint} className="h-9 sm:h-10 text-xs sm:text-sm border-slate-200 rounded-xl px-3 sm:px-4 shrink-0 font-bold text-slate-700 hover:bg-slate-50">
                        <Printer className="mr-1.5 sm:mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" onClick={handleSendEmail} disabled={sending} className="h-9 sm:h-10 text-xs sm:text-sm border-slate-200 rounded-xl px-3 sm:px-4 shrink-0 font-bold text-slate-700 hover:bg-slate-50">
                        {sending ? <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-1.5 sm:mr-2 h-4 w-4" />}
                        Email
                    </Button>
                    <Button onClick={handleDownload} disabled={downloading} className="h-9 sm:h-10 text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-3 sm:px-4 shrink-0 font-bold shadow-none">
                        {downloading ? <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-1.5 sm:mr-2 h-4 w-4" />}
                        Download
                    </Button>
                </div>
            </div>

            {/* Receipt Preview */}
            <Card className="bg-white border text-center md:text-left border-slate-200 shadow-sm print:shadow-none print:border-0 overflow-hidden">
                {/* Receipt Header */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 md:p-12 print:bg-slate-900 print:text-white print-color-adjust-exact">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 sm:gap-8 text-center sm:text-left">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-2">Billio.</h2>
                            <p className="text-slate-400 text-xs sm:text-sm">Payment Confirmation</p>
                        </div>
                        <div className="sm:text-right">
                            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-2 sm:mb-3">RECEIPT</div>
                            <div className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> Paid Success
                            </div>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-12 text-center sm:text-left">
                    {/* Amount Section */}
                    <div className="text-center py-6 sm:py-8 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-500 text-xs sm:text-sm font-black uppercase tracking-widest mb-2">Amount Paid</p>
                        <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            ₦{Number(payment.paymentAmount || payment.amount).toLocaleString()}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pr-4">Payment From</h3>
                                <div className="space-y-1">
                                    <p className="text-base sm:text-lg font-black text-slate-900">{invoice.client.name}</p>
                                    <p className="text-sm sm:text-base text-slate-500 truncate">{invoice.client.email}</p>
                                    <p className="text-sm sm:text-base text-slate-500">{invoice.client.address}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pr-4">Payment To</h3>
                                <div className="space-y-1">
                                    <p className="text-base sm:text-lg font-black text-slate-900">{payment.companyName}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 sm:text-right">
                            <div>
                                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Payment Details</h3>
                                <div className="space-y-2.5 inline-block text-left w-full sm:w-auto">
                                    <div className="flex justify-between gap-8 py-1 border-b border-slate-50 sm:border-none">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Date Paid:</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900">{new Date(payment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between gap-8 py-1 border-b border-slate-50 sm:border-none">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Method:</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900 capitalize">{payment.paymentMethod?.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex justify-between gap-8 py-1 border-b border-slate-50 sm:border-none">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Ref:</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono truncate max-w-[120px] sm:max-w-none">{payment.paymentReference || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between gap-8 py-1 sm:border-none">
                                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Invoice No:</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-900">#{invoice.number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items Summary */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">Payment For</h3>
                        <div className="flex justify-between items-center py-2">
                            <span className="font-medium text-slate-900">Invoice #{invoice.number} Settlement</span>
                            <span className="font-bold text-slate-900">₦{Number(payment.paymentAmount || payment.amount).toLocaleString()}</span>
                        </div>
                    </div>

                </CardContent>

                <div className="bg-slate-50 p-8 text-center text-sm text-slate-500 border-t border-slate-100">
                    <p>Thank you for your business.</p>
                    <p className="mt-1">If you have any questions about this receipt, please contact {payment.companyName}.</p>
                </div>
            </Card>

            <div className="text-center text-slate-400 text-xs">
                <p>Genererated by Billio</p>
            </div>
        </div>
    );
}
