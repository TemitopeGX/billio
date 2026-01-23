"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export type Invoice = {
  id: string;
  number: string;
  amount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  client: {
    name: string;
  };
  issuedAt?: string;
  dueAt?: string;
  // Add other invoice properties as per your Prisma schema
};

export const useInvoices = () => {
  return useQuery<Invoice[], Error>({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data } = await api.get('/invoices');
      return data.data.invoices;
    },
  });
};
