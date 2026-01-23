"use client";

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export type Client = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  // Add other client properties as per your Prisma schema
};

export const useClients = () => {
  return useQuery<Client[], Error>({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await api.get('/clients');
      return data.data.clients;
    },
  });
};
