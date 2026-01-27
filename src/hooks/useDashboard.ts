import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface DashboardStats {
  totalRevenue: number;
  invoicesSent: number;
  activeClients: number;
  outstanding: number;
  companyName?: string;
  companyLogo?: string;
}

export interface DashboardInvoice {
  id: string;
  number: string;
  amount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  client: {
    name: string;
  };
  issuedAt?: string;
  dueAt?: string;
}

export interface DashboardActivity {
  type: 'invoice_paid' | 'invoice_sent' | 'client_added' | 'payment_received';
  message: string;
  time: string;
  amount?: string;
}

export interface RevenueTrendData {
  day: string;
  revenue: number;
  invoices: number;
}

export interface TopClient {
  id: string;
  name: string;
  revenue: number;
  totalInvoiced: number;
  invoiceCount: number;
  paidCount: number;
}

export interface QuarterlyData {
  name: string;
  target: number;
  actual: number;
}

// Unified query to fetch all dashboard data at once
const useDashboardAll = () => {
  return useQuery({
    queryKey: ['dashboard-all'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export const useDashboardStats = () => {
  const query = useDashboardAll();
  return { ...query, data: query.data?.stats as DashboardStats };
};

export const useDashboardInvoices = () => {
  const query = useDashboardAll();
  // Map recentInvoices from the bundled response
  return { ...query, data: query.data?.recentInvoices as DashboardInvoice[] };
};

export const useDashboardActivity = () => {
  const query = useDashboardAll();
  return { ...query, data: query.data?.activity as DashboardActivity[] };
};

export const useRevenueTrend = (days: number = 7) => {
  const bundledQuery = useDashboardAll();

  const specificQuery = useQuery<RevenueTrendData[], Error>({
    queryKey: ['revenue-trend', days],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/revenue-trend?days=${days}`);
      return data.data;
    },
    enabled: days !== 7,
  });

  if (days === 7) {
    return { ...bundledQuery, data: bundledQuery.data?.revenueTrend as RevenueTrendData[] };
  }
  return specificQuery;
};

export const useTopClients = (limit: number = 5) => {
  const bundledQuery = useDashboardAll();

  const specificQuery = useQuery<TopClient[], Error>({
    queryKey: ['top-clients', limit],
    queryFn: async () => {
      const { data } = await api.get(`/dashboard/top-clients?limit=${limit}`);
      return data.data;
    },
    enabled: limit !== 5,
  });

  if (limit === 5) {
    return { ...bundledQuery, data: bundledQuery.data?.topClients as TopClient[] };
  }
  return specificQuery;
};

export const useQuarterlyPerformance = () => {
  const query = useDashboardAll();
  return { ...query, data: query.data?.quarterlyPerformance as QuarterlyData[] };
};
