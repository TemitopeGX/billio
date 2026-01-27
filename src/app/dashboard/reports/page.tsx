"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useInvoices, Invoice } from "@/hooks/useInvoices";
import { usePayments } from "@/hooks/usePayments";
import { useExpenses } from "@/hooks/useExpenses";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUp,
  CreditCard,
  Users,
  FileText,
  Loader2,
  AlertCircle
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, PieChart as RePieChart, Pie, Cell } from "recharts";
import { ReportsPageSkeleton } from "@/components/skeletons/page-skeletons";
import { EmptyState } from "@/components/ui/empty-state";

export default function ReportsPage() {
  const { data: invoices, isLoading: invoicesLoading, error: invoicesError } = useInvoices();
  const { payments, stats: paymentStats, loading: paymentsLoading, error: paymentsError } = usePayments();
  const { expenses, stats: expenseStats } = useExpenses();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate real data
  const totalRevenue = invoices?.reduce((sum: number, inv: Invoice) => sum + Number(inv.amount || 0), 0) || 0;
  const paidInvoices = invoices?.filter((inv: Invoice) => (inv.status || '').toLowerCase() === 'paid') || [];
  const paidRevenue = paidInvoices.reduce((sum: number, inv: Invoice) => sum + Number(inv.amount || 0), 0);
  const paidRate = totalRevenue > 0 ? Math.round((paidRevenue / totalRevenue) * 100) : 0;
  const totalInvoices = invoices?.length || 0;
  const totalClients = new Set(invoices?.map((inv: Invoice) => inv.client?.name).filter(Boolean)).size;

  // Use actual total expenses from useExpenses hook
  const totalExpenses = expenseStats.totalExpenses;
  const profit = paidRevenue - totalExpenses;

  // Chart data for revenue trends
  const getRevenueData = () => {
    if (!invoices) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return last7Days.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const dayInvoices = invoices.filter((inv: Invoice) => {
        const dateToUse = inv.issuedAt || (inv as any).createdAt; // Handle potential missing createdAt in type
        if (!dateToUse) return false;
        const invoiceDate = new Date(dateToUse).toISOString().split('T')[0];
        return invoiceDate === dateStr;
      });

      const totalAmount = dayInvoices.reduce((sum: number, inv: Invoice) => sum + Number(inv.amount || 0), 0);
      const paidAmount = dayInvoices
        .filter((inv: Invoice) => (inv.status || '').toLowerCase() === 'paid')
        .reduce((sum: number, inv: Invoice) => sum + Number(inv.amount || 0), 0);

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: totalAmount,
        paid: paidAmount,
        count: dayInvoices.length
      };
    });
  };

  const getStatusData = () => {
    if (!invoices) return [];

    // Define accumulator type
    type StatusCounts = {
      [key: string]: number;
    };

    const statusCounts = invoices.reduce((acc: StatusCounts, inv: Invoice) => {
      const status = (inv.status || '').toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as StatusCounts);

    return [
      { name: 'Paid', value: statusCounts.paid || 0, color: '#0f172a' }, // Slate 900
      { name: 'Sent', value: statusCounts.sent || 0, color: '#94a3b8' }, // Slate 400
      { name: 'Draft', value: statusCounts.draft || 0, color: '#e2e8f0' }, // Slate 200
      { name: 'Overdue', value: statusCounts.overdue || 0, color: '#ef4444' } // Red 500
    ].filter(item => item.value > 0);
  };

  const revenueData = getRevenueData();
  const statusData = getStatusData();

  const chartConfig = {
    revenue: {
      label: "Total Revenue",
      color: "#0f172a",
    },
    paid: {
      label: "Paid Revenue",
      color: "#10b981",
    },
    count: {
      label: "Invoice Count",
      color: "#64748b",
    },
  };

  if (invoicesLoading || paymentsLoading) {
    return <ReportsPageSkeleton />;
  }

  if (invoicesError || paymentsError) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            <span className="font-medium">Error loading reports data</span>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state when no data
  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Reports</h1>
          <p className="text-slate-500 text-lg">Analyze your business performance and financial insights</p>
        </div>

        <EmptyState
          icon={BarChart3}
          title="Not enough data for reports"
          description="Create invoices and record payments to see detailed reports and insights about your business performance."
          actionLabel="Create Invoice"
          onAction={() => window.location.href = '/dashboard/invoices/new'}
          secondaryActionLabel="View Invoices"
          onSecondaryAction={() => window.location.href = '/dashboard/invoices'}
        />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Reports</h1>
        <p className="text-slate-500 text-lg">Analyze your business performance and financial insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <DollarSign className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
            <p className="text-xs text-slate-400 mt-1">All invoices</p>
          </div>
        </div>

        {/* Paid Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <CreditCard className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Paid Revenue</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(paidRevenue)}</p>
            <p className="text-xs text-slate-400 mt-1">Received payments</p>
          </div>
        </div>

        {/* Profit */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+15%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Profit</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(profit)}</p>
            <p className="text-xs text-slate-400 mt-1">After expenses</p>
          </div>
        </div>

        {/* Paid Rate */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <BarChart3 className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+5%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Paid Rate</p>
            <p className="text-3xl font-bold text-slate-900">{paidRate}%</p>
            <p className="text-xs text-slate-400 mt-1">Payment success rate</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Revenue Trends</h3>
                <p className="text-slate-500 text-sm font-medium">Last 7 days</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {revenueData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0f172a"
                    fill="#0f172a"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                  <Area
                    type="monotone"
                    dataKey="paid"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500 font-bold">No revenue data available</p>
                  <p className="text-sm text-slate-400 mt-1">Revenue trends will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Status Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <PieChart className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Invoice Status</h3>
                <p className="text-slate-500 text-sm font-medium">Distribution</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {statusData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <RePieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RePieChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <PieChart className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500 font-bold">No status data</p>
                  <p className="text-sm text-slate-400 mt-1">Status breakdown will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-slate-900" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Business Summary</h3>
              <p className="text-slate-500 text-sm font-medium">Key performance indicators</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-slate-50 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-8 w-8 text-slate-900" />
              </div>
              <p className="text-2xl font-black text-slate-900">{totalInvoices}</p>
              <p className="text-sm text-slate-500 font-medium">Total Invoices</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-slate-50 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-slate-900" />
              </div>
              <p className="text-2xl font-black text-slate-900">{totalClients}</p>
              <p className="text-sm text-slate-500 font-medium">Active Clients</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-emerald-50 rounded-xl w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-600">{paidInvoices.length}</p>
              <p className="text-sm text-slate-500 font-medium">Paid Invoices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
