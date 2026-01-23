"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, Trash2, Loader2, FileText, Calculator, FileEdit, DollarSign, Hash, Users, CalendarDays, Clock } from "lucide-react";
import api from "@/lib/api";
import { useClients } from "@/hooks/useClients";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
}

interface InvoiceFormData {
  clientId: string;
  number: string;
  issuedAt: string;
  dueAt: string;
  notes: string;
  status: string;
  items: InvoiceItem[];
}

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: clients, isLoading: clientsLoading } = useClients();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientId: "",
    number: "",
    issuedAt: "",
    dueAt: "",
    notes: "",
    status: "",
    items: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update invoice mutation
  const updateInvoiceMutation = useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const updateData = {
        number: data.number,
        issuedAt: data.issuedAt,
        dueAt: data.dueAt,
        notes: data.notes,
        status: data.status.toUpperCase(),
        amount: data.items.reduce((sum, item) => {
          const subtotal = item.quantity * item.unitPrice;
          const taxAmount = (subtotal * item.tax) / 100;
          const discountAmount = (subtotal * item.discount) / 100;
          return sum + subtotal + taxAmount - discountAmount;
        }, 0)
      };

      await api.put(`/invoices/${id}`, updateData);

      if (data.items.length > 0) {
        try {
          await api.delete(`/invoices/${id}/items`);
          for (const item of data.items) {
            await api.post(`/invoices/${id}/items`, {
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              tax: item.tax,
              discount: item.discount
            });
          }
        } catch (itemError) {
          console.warn('Error updating invoice items:', itemError);
        }
      }
    },
    onSuccess: () => {
      toast.success("Invoice updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', id] });
      router.push(`/dashboard/invoices/${id}`);
    },
    onError: (error: any) => {
      console.error('Error updating invoice:', error);
      toast.error("Failed to update invoice. Please try again.");
    },
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/invoices/${id}`);
        const invoice = response.data.data.invoice;
        setFormData({
          clientId: invoice.client.id,
          number: invoice.number,
          issuedAt: new Date(invoice.issuedAt).toISOString().split('T')[0],
          dueAt: new Date(invoice.dueAt).toISOString().split('T')[0],
          notes: invoice.notes || "",
          status: invoice.status,
          items: invoice.items.map((item: any) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            tax: item.tax,
            discount: item.discount,
          })),
        });
      } catch (error) {
        console.error('Error fetching invoice for edit:', error);
        toast.error("Failed to load invoice");
        router.push("/dashboard/invoices");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [id, router]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) newErrors.clientId = "Please select a client";
    if (!formData.number) newErrors.number = "Please enter an invoice number";
    if (!formData.issuedAt) newErrors.issuedAt = "Please select an issue date";
    if (!formData.dueAt) newErrors.dueAt = "Please select a due date";
    if (formData.items.length === 0) newErrors.items = "Please add at least one item";
    if (formData.items.some(item => !item.description.trim())) newErrors.items = "Please fill in all item descriptions";
    if (formData.items.some(item => item.quantity <= 0)) newErrors.items = "Please enter valid quantities";
    if (formData.items.some(item => item.unitPrice <= 0)) newErrors.items = "Please enter valid unit prices";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
    if (errors.items) {
      setErrors((prev) => ({ ...prev, items: "" }));
    }
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Math.random().toString(36).substr(2, 9),
          description: "",
          quantity: 1,
          unitPrice: 0,
          tax: 0,
          discount: 0,
        },
      ],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    updateInvoiceMutation.mutate(formData);
  };

  const calculateSubtotal = (): number => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTotalTax = (): number => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.tax / 100);
    }, 0);
  };

  const calculateTotalDiscount = (): number => {
    return formData.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.discount / 100);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalTax = calculateTotalTax();
  const totalDiscount = calculateTotalDiscount();
  const grandTotal = subtotal + totalTax - totalDiscount;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/invoices/${id}`}>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Edit Invoice</h1>
            <p className="text-slate-500 text-lg">Update invoice information</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Invoice Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <FileText className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Invoice Information</CardTitle>
                  <CardDescription className="text-slate-500">Basic details for your invoice</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-sm font-bold text-slate-900">
                    <Hash className="h-4 w-4 inline mr-2 text-slate-400" />
                    Invoice Number
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.number}
                    onChange={(e) => handleInputChange("number", e.target.value)}
                    className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.number ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.number && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.number}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientSelect" className="text-sm font-bold text-slate-900">
                    <Users className="h-4 w-4 inline mr-2 text-slate-400" />
                    Client
                  </Label>
                  <Select value={formData.clientId} onValueChange={(value) => handleInputChange("clientId", value)}>
                    <SelectTrigger className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.clientId ? 'border-red-300 focus:border-red-500' : ''}`}>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientsLoading ? (
                        <SelectItem value="loading" disabled>Loading clients...</SelectItem>
                      ) : clients && clients.length > 0 ? (
                        clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-clients" disabled>No clients found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.clientId && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.clientId}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-bold text-slate-900">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="SENT">Sent</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="OVERDUE">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="issuedAt" className="text-sm font-bold text-slate-900">
                    <CalendarDays className="h-4 w-4 inline mr-2 text-slate-400" />
                    Issue Date
                  </Label>
                  <Input
                    id="issuedAt"
                    type="date"
                    value={formData.issuedAt}
                    onChange={(e) => handleInputChange("issuedAt", e.target.value)}
                    className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.issuedAt ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.issuedAt && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.issuedAt}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueAt" className="text-sm font-bold text-slate-900">
                    <Clock className="h-4 w-4 inline mr-2 text-slate-400" />
                    Due Date
                  </Label>
                  <Input
                    id="dueAt"
                    type="date"
                    value={formData.dueAt}
                    onChange={(e) => handleInputChange("dueAt", e.target.value)}
                    className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.dueAt ? 'border-red-300 focus:border-red-500' : ''}`}
                  />
                  {errors.dueAt && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.dueAt}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Calculator className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Line Items</CardTitle>
                  <CardDescription className="text-slate-500">Products and services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={item.id} className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-slate-900 text-lg">Item {index + 1}</h4>
                      {formData.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div className="md:col-span-3 space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Description</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          placeholder="Product description"
                          className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11 ${errors.items ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                        {index === 0 && errors.items && (
                          <p className="text-sm text-red-600 mt-1 font-medium">{errors.items}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Qty</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value) || 0)}
                          className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Price</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                          className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11 ${errors.items ? 'border-red-300 focus:border-red-500' : ''}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Tax %</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={item.tax}
                          onChange={(e) => handleItemChange(index, "tax", parseFloat(e.target.value) || 0)}
                          className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
                        />
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-end">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">Item Total:</span>
                        <span className="font-black text-lg text-slate-900">
                          {formatCurrency((item.quantity * item.unitPrice) * (1 + item.tax / 100) * (1 - item.discount / 100))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                className="w-full rounded-xl border-dashed border-2 border-slate-200 hover:border-slate-400 hover:bg-slate-50 py-6 text-slate-500 hover:text-slate-900 font-bold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Item
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <FileEdit className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Additional Notes</CardTitle>
                  <CardDescription className="text-slate-500">Any additional information for your client</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                placeholder="Enter any additional notes, terms, or conditions..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={4}
                className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-8">
          {/* Invoice Summary */}
          <Card className="border border-slate-200 shadow-sm sticky top-8">
            <CardHeader className="pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Summary</CardTitle>
                  <CardDescription className="text-slate-500">Total calculations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold text-lg text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Total Tax</span>
                  <span className="font-bold text-lg text-emerald-600">+{formatCurrency(totalTax)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Total Discount</span>
                    <span className="font-bold text-lg text-red-600">-{formatCurrency(totalDiscount)}</span>
                  </div>
                )}
                <Separator className="my-4 bg-slate-200" />
                <div className="flex justify-between items-center py-4 bg-slate-50 border border-slate-200 rounded-xl px-4">
                  <span className="text-lg font-bold text-slate-900">Grand Total</span>
                  <span className="text-2xl font-black text-slate-900">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <Badge variant="secondary" className="w-full justify-center py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-500 border border-slate-200 shadow-none">
                  Status: {formData.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-6 border-b border-slate-100">
              <CardTitle className="text-xl font-bold text-slate-900">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Button
                onClick={handleSubmit}
                disabled={updateInvoiceMutation.isPending}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 font-bold text-lg shadow-none"
              >
                {updateInvoiceMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
