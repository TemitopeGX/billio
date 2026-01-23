"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Calculator,
  FileText,
  User,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle,
  DollarSign,
  Hash,
  Users,
  CalendarDays,
  Clock,
  FileEdit,
  Download,
  Send
} from "lucide-react";
import { useInvoiceCreation, InvoiceItem } from "@/hooks/useInvoiceCreation";
import { useClients } from "@/hooks/useClients";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { SettingsCheck } from "@/components/settings-check";

export default function NewInvoicePage() {
  const { data: clients, isLoading: clientsLoading } = useClients();
  const {
    formData,
    setFormData,
    updateItem,
    addItem,
    removeItem,
    createInvoice,
    isCreating,
  } = useInvoiceCreation();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientId) {
      newErrors.clientId = 'Please select a client';
    }

    if (!formData.number) {
      newErrors.number = 'Please enter an invoice number';
    }

    if (formData.items.some(item => !item.description.trim())) {
      newErrors.items = 'Please fill in all item descriptions';
    }

    if (formData.items.some(item => item.unitPrice <= 0)) {
      newErrors.items = 'Please enter valid unit prices';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClientChange = (clientId: string) => {
    setFormData(prev => ({ ...prev, clientId }));
    if (errors.clientId) {
      setErrors(prev => ({ ...prev, clientId: '' }));
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    updateItem(id, { [field]: value });
    if (errors.items) {
      setErrors(prev => ({ ...prev, items: '' }));
    }
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const invoiceNumber = `INV-${year}${month}-${random}`;
    setFormData(prev => ({ ...prev, number: invoiceNumber }));
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

  const handleCreateInvoice = () => {
    if (validateForm()) {
      createInvoice();
    }
  };

  return (
    <SettingsCheck>
      <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/invoices">
              <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Create Invoice</h1>
              <p className="text-slate-500 text-lg">Create a new invoice for your client</p>
            </div>
          </div>
        </div>

        {/* Helpful Tips */}
        <Card className="border border-slate-200 shadow-sm bg-slate-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <FileText className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Quick Tips</h3>
                <ul className="text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Use the "Generate" button to create a unique invoice number
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Add multiple line items for different products or services
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Set tax and discount percentages for each item
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
                    <div className="flex gap-3">
                      <Input
                        id="invoiceNumber"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder="e.g., INV-0001"
                        className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.number ? 'border-red-300 focus:border-red-500' : ''
                          }`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateInvoiceNumber}
                        className="whitespace-nowrap rounded-xl border-slate-200 hover:bg-slate-50 h-12 font-medium"
                      >
                        Generate
                      </Button>
                    </div>
                    {errors.number && (
                      <p className="text-sm text-red-600 mt-1 font-medium">{errors.number}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSelect" className="text-sm font-bold text-slate-900">
                      <Users className="h-4 w-4 inline mr-2 text-slate-400" />
                      Client
                    </Label>
                    <Select value={formData.clientId} onValueChange={handleClientChange}>
                      <SelectTrigger className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.clientId ? 'border-red-300 focus:border-red-500' : ''
                        }`}>
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
                    {!clientsLoading && clients && clients.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl mt-2">
                        <User className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                        <h3 className="text-base font-bold text-slate-900 mb-1">No clients yet</h3>
                        <p className="text-slate-500 text-sm mb-4">Create a client to proceed</p>
                        <Link href="/dashboard/clients/new">
                          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold h-9">
                            <Plus className="h-3 w-3 mr-1" />
                            Create Client
                          </Button>
                        </Link>
                      </div>
                    )}
                    {errors.clientId && (
                      <p className="text-sm text-red-600 mt-1 font-medium">{errors.clientId}</p>
                    )}
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
                      onChange={(e) => handleInputChange('issuedAt', e.target.value)}
                      className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12"
                    />
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
                      onChange={(e) => handleInputChange('dueAt', e.target.value)}
                      className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12"
                    />
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
                {/* Items Table */}
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
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-3 space-y-2">
                          <Label htmlFor={`description-${item.id}`} className="text-sm font-bold text-slate-900">
                            Description
                          </Label>
                          <Input
                            id={`description-${item.id}`}
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                            placeholder="Product description"
                            className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11 ${errors.items ? 'border-red-300 focus:border-red-500' : ''
                              }`}
                          />
                          {/* Only show error on the first item to avoid clutter */}
                          {index === 0 && errors.items && (
                            <p className="text-sm text-red-600 mt-1 font-medium">{errors.items}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`quantity-${item.id}`} className="text-sm font-bold text-slate-900">
                            Qty
                          </Label>
                          <Input
                            id={`quantity-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`unitPrice-${item.id}`} className="text-sm font-bold text-slate-900">
                            Price
                          </Label>
                          <Input
                            id={`unitPrice-${item.id}`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11 ${errors.items ? 'border-red-300 focus:border-red-500' : ''
                              }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`tax-${item.id}`} className="text-sm font-bold text-slate-900">
                            Tax %
                          </Label>
                          <Input
                            id={`tax-${item.id}`}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={item.tax}
                            onChange={(e) => handleItemChange(item.id, 'tax', parseFloat(e.target.value) || 0)}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
                          />
                        </div>
                        {/* 
                          // Hidden Discount for now to simplify UI, can be re-enabled
                        */}
                      </div>
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-end">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-500">Item Total:</span>
                          <span className="font-black text-lg text-slate-900">
                            {formatCurrency(item.total)}
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
                  onChange={(e) => handleInputChange('notes', e.target.value)}
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
                    Status: Draft
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
                  onClick={handleCreateInvoice}
                  disabled={isCreating || !formData.clientId || formData.items.length === 0}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 font-bold text-lg shadow-none"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Create Invoice
                    </>
                  )}
                </Button>

                <div className="space-y-3 pt-2">
                  <Button variant="outline" className="w-full rounded-xl border-slate-200 hover:bg-slate-50 h-12 font-medium" disabled>
                    <FileText className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SettingsCheck>
  );
}