"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Receipt, Calendar, Tag, FileText, DollarSign, CheckCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "sonner";

interface ExpenseFormData {
  date: string;
  category: string;
  description: string;
  amount: string;
}

export default function NewExpensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: ''
  });
  const [errors, setErrors] = useState<Partial<ExpenseFormData>>({});

  const categories = [
    'Software',
    'Marketing',
    'Office',
    'Travel',
    'Utilities',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ExpenseFormData> = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await api.post('/expenses', {
        date: formData.date,
        category: formData.category,
        description: formData.description || null,
        amount: Number(formData.amount)
      });

      toast.success('Expense created successfully!');
      router.push('/dashboard/expenses');
    } catch (error) {
      console.error('Error creating expense:', error);
      toast.error('Failed to create expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/expenses">
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Add Expense</h1>
          <p className="text-slate-500 text-lg">Create a new business expense record</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="pb-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Receipt className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Expense Information</CardTitle>
                <p className="text-slate-500 mt-1">Fill in the details for your new expense</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-bold text-slate-900">
                    <Calendar className="h-4 w-4 inline mr-2 text-slate-400" />
                    Expense Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.date ? 'border-red-300 focus:border-red-500' : ''
                      }`}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.date}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-bold text-slate-900">
                    <Tag className="h-4 w-4 inline mr-2 text-slate-400" />
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.category ? 'border-red-300 focus:border-red-500' : ''
                      }`}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-600 mt-1 font-medium">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-bold text-slate-900">
                  <DollarSign className="h-4 w-4 inline mr-2 text-slate-400" />
                  Amount (NGN) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${errors.amount ? 'border-red-300 focus:border-red-500' : ''
                    }`}
                />
                {errors.amount && (
                  <p className="text-sm text-red-600 mt-1 font-medium">{errors.amount}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold text-slate-900">
                  <FileText className="h-4 w-4 inline mr-2 text-slate-400" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter expense description (optional)"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 min-h-[120px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
                <Link href="/dashboard/expenses">
                  <Button type="button" variant="outline" className="rounded-xl border-slate-200 h-12 px-6 font-bold hover:bg-slate-50">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl h-12 font-bold shadow-none"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Create Expense
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
