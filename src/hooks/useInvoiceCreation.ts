import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { toast } from 'sonner';
import { useFirstInvoiceFeedback } from './useFirstInvoiceFeedback';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
  total: number;
}

export interface InvoiceFormData {
  clientId: string;
  number: string;
  issuedAt: string;
  dueAt: string;
  notes: string;
  items: InvoiceItem[];
  totalAmount: number;
}

export const useInvoiceCreation = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientId: '',
    number: '',
    issuedAt: new Date().toISOString().split('T')[0],
    dueAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        unitPrice: 0,
        tax: 0,
        discount: 0,
        total: 0,
      },
    ],
    totalAmount: 0,
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { checkAndTriggerFirstInvoiceFeedback } = useFirstInvoiceFeedback();

  const calculateItemTotal = (item: InvoiceItem): number => {
    const subtotal = item.quantity * item.unitPrice;
    const taxAmount = (subtotal * item.tax) / 100;
    const discountAmount = (subtotal * item.discount) / 100;
    return subtotal + taxAmount - discountAmount;
  };

  const calculateTotalAmount = (items: InvoiceItem[]): number => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setFormData(prev => {
      const newItems = prev.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      
      // Recalculate totals for updated item
      const updatedItems = newItems.map(item => ({
        ...item,
        total: calculateItemTotal(item),
      }));

      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      };
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      discount: 0,
      total: 0,
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => {
      const newItems = prev.items.filter(item => item.id !== id);
      return {
        ...prev,
        items: newItems,
        totalAmount: calculateTotalAmount(newItems),
      };
    });
  };

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      const response = await api.post('/invoices', {
        clientId: data.clientId,
        number: data.number,
        issuedAt: data.issuedAt,
        dueAt: data.dueAt,
        notes: data.notes,
        amount: data.totalAmount,
        items: data.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          tax: item.tax,
          discount: item.discount,
          total: item.total,
        })),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Invoice created successfully!');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-activity'] });
      queryClient.invalidateQueries({ queryKey: ['invoice-stats'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      
      // Check if this might be the user's first invoice
      checkAndTriggerFirstInvoiceFeedback();
      
      router.push('/dashboard/invoices');
    },
    onError: (error: any) => {
      console.error('Error creating invoice:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to create invoice';
      toast.error(errorMessage);
    },
  });

  const createInvoice = () => {
    if (!formData.clientId) {
      toast.error('Please select a client');
      return;
    }

    if (!formData.number) {
      toast.error('Please enter an invoice number');
      return;
    }

    if (formData.items.some(item => !item.description || item.unitPrice <= 0)) {
      toast.error('Please fill in all item details');
      return;
    }

    createInvoiceMutation.mutate(formData);
  };

  return {
    formData,
    setFormData,
    updateItem,
    addItem,
    removeItem,
    createInvoice,
    isCreating: createInvoiceMutation.isPending,
  };
};
