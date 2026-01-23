"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Receipt, Calendar, Tag, FileText, DollarSign, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "sonner";

interface ExpenseFormData {
  date: string;
  category: string;
  description: string;
  amount: string;
}

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();
  const expenseId = params.id as string;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: '',
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

  const fetchExpense = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/expenses/${expenseId}`);
      const expense = response.data;
      
      setFormData({
        date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
        category: expense.category || '',
        description: expense.description || '',
        amount: expense.amount ? String(expense.amount) : ''
      });
    } catch (error) {
      console.error('Error fetching expense:', error);
      toast.error('Failed to load expense details');
      router.push('/dashboard/expenses');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (expenseId) {
      fetchExpense();
    }
  }, [expenseId]);

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
      await api.put(`/expenses/${expenseId}`, {
        date: formData.date,
        category: formData.category,
        description: formData.description || null,
        amount: Number(formData.amount)
      });

      toast.success('Expense updated successfully!');
      router.push('/dashboard/expenses');
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error('Failed to update expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading expense details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/expenses">
          <Button variant="outline" size="sm" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Edit Expense</h1>
          <p className="text-muted-foreground text-lg">Update expense information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="card-shadow-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-foreground">Expense Information</CardTitle>
                <p className="text-muted-foreground mt-1">Update the details for this expense</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-foreground">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Expense Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className={`rounded-xl bg-muted border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.date ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.date && (
                    <p className="text-sm text-red-600 mt-1">{errors.date}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-foreground">
                    <Tag className="h-4 w-4 inline mr-2" />
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={`rounded-xl bg-muted border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
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
                    <p className="text-sm text-red-600 mt-1">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-foreground">
                  <DollarSign className="h-4 w-4 inline mr-2" />
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
                  className={`rounded-xl bg-muted border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.amount && (
                  <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground">
                  <FileText className="h-4 w-4 inline mr-2" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter expense description (optional)"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="rounded-xl bg-muted border-border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                <Link href="/dashboard/expenses">
                  <Button type="button" variant="outline" className="rounded-xl">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Expense
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
