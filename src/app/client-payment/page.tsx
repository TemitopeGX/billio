"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle,
  Info,
  DollarSign,
  CreditCard,
  Calendar,
  Building,
  Receipt,
  ArrowRight,
  Shield,
  Clock,
  Briefcase,
  Download,
  Check
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

interface InvoiceData {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  amount: string;
  dueAt: string;
  status: string;
  userId: string;
  clientId: string;
  items: Array<{
    description: string;
    quantity: string;
    unitPrice: string;
    total: string;
  }>;
}

interface PaymentSubmission {
  invoiceNumber: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentReference?: string;
  notes?: string;
  receiptFile: File | null;
  invoiceFile?: File | null;
}

function ClientPaymentContent() {
  const searchParams = useSearchParams();
  const initialInvoiceNumber = searchParams.get('invoice') || '';

  const [invoiceNumberInput, setInvoiceNumberInput] = useState(initialInvoiceNumber);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Lookup, 2: Review & Pay, 3: Success

  const [paymentData, setPaymentData] = useState<PaymentSubmission>({
    invoiceNumber: initialInvoiceNumber,
    paymentAmount: 0,
    paymentMethod: "bank_transfer",
    receiptFile: null,
  });

  useEffect(() => {
    if (initialInvoiceNumber) {
      fetchInvoiceData(initialInvoiceNumber);
    }
  }, [initialInvoiceNumber]);

  const fetchInvoiceData = async (invNumber: string) => {
    if (!invNumber.trim()) return;
    setIsInvoiceLoading(true);
    try {
      const response = await api.get(`/payments/invoice/${invNumber}`);
      if (response.data.success) {
        const invoice = response.data.data.invoice;
        setInvoiceData(invoice);
        setPaymentData(prev => ({
          ...prev,
          invoiceNumber: invoice.number,
          paymentAmount: parseFloat(invoice.amount) || 0
        }));
        setStep(2);
      } else {
        toast.error("Invoice not found");
        setInvoiceData(null);
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast.error("Failed to fetch invoice details");
      setInvoiceData(null);
    } finally {
      setIsInvoiceLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'receiptFile' | 'invoiceFile') => {
    if (e.target.files && e.target.files[0]) {
      setPaymentData(prev => ({
        ...prev,
        [field]: e.target.files![0]
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentData.receiptFile) {
      toast.error("Please upload a payment receipt.");
      return;
    }
    if (!invoiceData) {
      toast.error("Please fetch invoice details first.");
      return;
    }

    setIsPaymentSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('invoiceId', invoiceData.id);
      formData.append('userId', invoiceData.userId); // Ensure backend sends this
      formData.append('clientId', invoiceData.clientId); // Ensure backend sends this
      formData.append('invoiceNumber', paymentData.invoiceNumber);
      formData.append('paymentAmount', paymentData.paymentAmount.toString());
      formData.append('paymentMethod', paymentData.paymentMethod);
      if (paymentData.paymentReference) formData.append('paymentReference', paymentData.paymentReference);
      if (paymentData.notes) formData.append('notes', paymentData.notes);
      formData.append('receiptFile', paymentData.receiptFile);
      if (paymentData.invoiceFile) formData.append('invoiceFile', paymentData.invoiceFile);

      const response = await api.post('/payments/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success("Payment submitted successfully!");
        setStep(3);
        // Reset form for next use (delay slightly if needed)
      } else {
        toast.error(response.data.error?.message || "Failed to submit payment.");
      }
    } catch (error: any) {
      console.error("Payment submission error:", error);
      toast.error(error.response?.data?.error?.message || "An unexpected error occurred.");
    } finally {
      setIsPaymentSubmitting(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setInvoiceData(null);
    setInvoiceNumberInput('');
    setPaymentData({
      invoiceNumber: '',
      paymentAmount: 0,
      paymentMethod: "bank_transfer",
      receiptFile: null,
      invoiceFile: null,
    });
  };

  // --- Components for cleaner render ---

  const BrandSidebar = () => (
    <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-slate-800 blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-slate-800 blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
            <CreditCard className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">Billio.</span>
        </div>

        <h1 className="text-4xl font-black leading-tight mb-6 tracking-tight">
          Secure Payment <br /> <span className="text-slate-400">Verification Portal</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-md leading-relaxed">
          Quickly verify and submit your payments securely. Your transaction is encrypted and directly sent to the merchant for approval.
        </p>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center space-x-4 text-slate-300">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Shield className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-white">Bank-Grade Security</p>
            <p className="text-sm">256-bit SSL encryption</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-slate-300">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <Clock className="h-6 w-6 text-slate-400" />
          </div>
          <div>
            <p className="font-medium text-white">Fast Verification</p>
            <p className="text-sm">Usually confirmed within 24h</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-xs text-slate-500 pt-8 border-t border-slate-800">
        &copy; {new Date().getFullYear()} Billio Payments. All rights reserved.
      </div>
    </div>
  );

  const LookupStep = () => (
    <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back</h2>
        <p className="text-slate-500">Enter your invoice number to retrieve details</p>
      </div>

      <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="invoice" className="text-slate-700 font-medium">Invoice Number</Label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="invoice"
                  placeholder="e.g. INV-2023-001"
                  className="pl-11 h-12 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 transition-all rounded-xl font-medium"
                  value={invoiceNumberInput}
                  onChange={(e) => setInvoiceNumberInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchInvoiceData(invoiceNumberInput)}
                />
              </div>
            </div>

            <Button
              onClick={() => fetchInvoiceData(invoiceNumberInput)}
              disabled={isInvoiceLoading || !invoiceNumberInput.trim()}
              className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 shadow-none transition-all rounded-xl"
            >
              {isInvoiceLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-5 w-5" />
              )}
              Fetch Invoice Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-slate-400 mt-6">
        Protected by reCAPTCHA and subject to the Privacy Policy and Terms of Service.
      </p>
    </div>
  );

  const ReviewAndPayStep = () => {
    if (!invoiceData) return null;
    return (
      <div className="w-full max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
        <div className="mb-6 flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-900 font-bold cursor-pointer transition-colors" onClick={() => setStep(1)}>
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Back to Lookup</span>
        </div>

        <div className="space-y-6">
          {/* Invoice Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice Details</p>
                <h3 className="text-lg font-bold text-slate-900">{invoiceData.number}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</p>
                <p className="text-xl font-black text-slate-900">₦{parseFloat(invoiceData.amount).toLocaleString()}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Billed To</Label>
                <p className="font-bold text-slate-900 mt-1">{invoiceData.clientName}</p>
                <p className="text-sm text-slate-500">{invoiceData.companyName}</p>
              </div>
              <div className="text-right">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</Label>
                <p className="font-medium text-slate-900">{new Date(invoiceData.dueAt).toLocaleDateString()}</p>
                <p className={`text-xs font-medium ${new Date(invoiceData.dueAt) < new Date() ? 'text-red-500' : 'text-blue-500'}`}>
                  {new Date(invoiceData.dueAt) < new Date() ? 'Overdue' : 'On Schedule'}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-slate-900" />
                Payment Details
              </h3>

              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-slate-900 font-bold">Payment Amount <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₦</span>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={paymentData.paymentAmount}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, paymentAmount: parseFloat(e.target.value) || 0 }))}
                        className="pl-8 bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 rounded-xl font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method" className="text-slate-900 font-bold">Method <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <select
                        id="method"
                        className="flex h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus:border-slate-900 focus:ring-0 transition-all cursor-pointer font-medium"
                        value={paymentData.paymentMethod}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="cash">Cash</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-slate-900 font-bold">Reference Number / Transaction ID</Label>
                  <Input
                    id="reference"
                    placeholder="e.g. TRX-987654321"
                    className="bg-slate-50 border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-0 rounded-xl"
                    value={paymentData.paymentReference || ''}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, paymentReference: e.target.value }))}
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="border border-dashed border-slate-300 rounded-2xl p-6 hover:bg-slate-50 hover:border-slate-400 transition-colors bg-white">
                    <Label htmlFor="receipt" className="block text-center cursor-pointer">
                      <div className="mx-auto w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                        <Upload className="h-6 w-6 text-slate-900" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">Upload Payment Receipt <span className="text-red-500">*</span></span>
                      <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 5MB</p>

                      {paymentData.receiptFile ? (
                        <div className="mt-3 inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                          <Check className="h-3 w-3 mr-1" />
                          {paymentData.receiptFile.name}
                        </div>
                      ) : (
                        <div className="mt-3 inline-block px-4 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-600 shadow-sm">
                          Select File
                        </div>
                      )}

                      <Input
                        id="receipt"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'receiptFile')}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPaymentSubmitting || !paymentData.receiptFile}
                  className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800 shadow-none font-bold rounded-xl"
                >
                  {isPaymentSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>Submit Payment Verification</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const SuccessStep = () => (
    <div className="w-full max-w-md mx-auto text-center animate-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce border border-emerald-100">
        <CheckCircle className="h-12 w-12 text-emerald-600" />
      </div>

      <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Payment Submitted!</h2>
      <p className="text-slate-600 text-lg mb-8 leading-relaxed">
        Your payment proof has been securely transmitted to the merchant. Verification typically takes <strong>24 hours</strong>.
      </p>

      <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left border border-slate-200">
        <p className="text-sm text-slate-500 mb-1">Transaction Reference</p>
        <p className="font-mono text-slate-900 font-medium break-all">
          {paymentData.paymentReference || 'N/A'}
        </p>
      </div>

      <Button
        onClick={resetFlow}
        className="h-12 px-8 bg-slate-900 text-white hover:bg-slate-800 shadow-none rounded-xl font-bold"
      >
        Submit Another Payment
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <BrandSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile Header (visible only on small screens) */}
        <div className="lg:hidden p-6 bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-white" />
            <span className="font-black text-lg tracking-tighter">Billio.</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16 bg-slate-50/50">
          {step === 1 && <LookupStep />}
          {step === 2 && <ReviewAndPayStep />}
          {step === 3 && <SuccessStep />}
        </div>
      </div>
    </div>
  );
}

export default function ClientPaymentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }>
        <ClientPaymentContent />
      </Suspense>
    </div>
  );
}