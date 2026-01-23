"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

interface Payment {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentReference: string | null;
  notes: string | null;
  status: 'pending' | 'verified' | 'rejected' | 'paid';
  createdAt: string;
  verifiedAt: string | null;
  receiptFilePath: string | null;
  invoiceFilePath: string | null;
}

interface PaymentStats {
  total: number;
  pending: number;
  paid: number;
  totalAmount: number;
}

export const usePayments = () => {
  const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await api.get('/payments');
      return response.data.data;
    }
  });

  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['payment-stats'],
    queryFn: async () => {
      const response = await api.get('/payments/stats');
      return response.data.data.stats;
    }
  });

  return {
    payments: paymentsData?.payments || [],
    stats: statsData || { total: 0, pending: 0, paid: 0, totalAmount: 0 },
    loading: paymentsLoading || statsLoading,
    error: paymentsError || statsError
  };
};