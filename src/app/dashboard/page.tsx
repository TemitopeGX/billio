"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  Mail,
  Calculator,
  BarChart3,
  ArrowUpRight,
  Search,
  Bell,
  User,
  Activity,
  Target,
  Zap,
  CreditCard,
  Receipt,
  UserCheck,
  Timer,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboardStats, useDashboardInvoices, useDashboardActivity, useRevenueTrend, useTopClients, useQuarterlyPerformance } from "@/hooks/useDashboard";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PAID":
      return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 rounded-full px-3 py-1 text-xs font-bold shadow-none">Paid</Badge>;
    case "SENT":
      return <Badge className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 rounded-full px-3 py-1 text-xs font-bold shadow-none">Sent</Badge>;
    case "OVERDUE":
      return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 rounded-full px-3 py-1 text-xs font-bold shadow-none">Overdue</Badge>;
    case "DRAFT":
      return <Badge className="bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 rounded-full px-3 py-1 text-xs font-bold shadow-none">Draft</Badge>;
    default:
      return <Badge className="bg-slate-50 text-slate-700 border-slate-200 rounded-full px-3 py-1 text-xs font-bold shadow-none">{status}</Badge>;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "invoice_paid":
      return <CheckCircle className="h-5 w-5 text-emerald-600" />;
    case "invoice_sent":
      return <Mail className="h-5 w-5 text-slate-600" />;
    case "client_added":
      return <Users className="h-5 w-5 text-slate-900" />;
    case "payment_received":
      return <DollarSign className="h-5 w-5 text-emerald-600" />;
    default:
      return <FileText className="h-5 w-5 text-slate-400" />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getTimeAgo = (dateString?: string) => {
  if (!dateString) return '-';
  const now = new Date();
  const date = new Date(dateString);
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  return formatDate(dateString);
};

export default function DashboardPage() {
  const router = useRouter();
  const [showPlanModal, setShowPlanModal] = useState(false);

  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: recentInvoices, isLoading: invoicesLoading, error: invoicesError } = useDashboardInvoices();
  const { data: recentActivity, isLoading: activityLoading, error: activityError } = useDashboardActivity();
  const { data: revenueTrend, isLoading: trendLoading, error: trendError } = useRevenueTrend(7);
  const { data: topClients, isLoading: clientsLoading, error: clientsError } = useTopClients(3);
  const { data: quarterlyData, isLoading: quarterlyLoading, error: quarterlyError } = useQuarterlyPerformance();

  useEffect(() => {
    const plan = localStorage.getItem('intendedPlan');
    // If a pro plan was selected, show the modal
    if (plan && (plan.includes('pro') || plan === 'starter-monthly' || plan === 'starter-annual')) {
      // Check if it's pro
      if (plan.includes('pro')) {
        setShowPlanModal(true);
      } else {
        // It's free plan, just clear it
        localStorage.removeItem('intendedPlan');
      }
    }
  }, []);

  const handleProceedToSubscription = () => {
    localStorage.removeItem('intendedPlan');
    router.push('/dashboard/settings?tab=billing');
  };

  const handleDismissPlan = () => {
    localStorage.removeItem('intendedPlan');
    setShowPlanModal(false);
  };

  const fallbackStats = {
    totalRevenue: 0,
    invoicesSent: 0,
    activeClients: 0,
    outstanding: 0,
  };

  const currentStats = stats || fallbackStats;

  const salesTrendData = revenueTrend || [
    { day: 'Mon', revenue: 0, invoices: 0 },
    { day: 'Tue', revenue: 0, invoices: 0 },
    { day: 'Wed', revenue: 0, invoices: 0 },
    { day: 'Thu', revenue: 0, invoices: 0 },
    { day: 'Fri', revenue: 0, invoices: 0 },
    { day: 'Sat', revenue: 0, invoices: 0 },
    { day: 'Sun', revenue: 0, invoices: 0 },
  ];

  const campaignData = quarterlyData || [
    { name: 'Q1', target: 100000, actual: 0 },
    { name: 'Q2', target: 120000, actual: 0 },
    { name: 'Q3', target: 140000, actual: 0 },
    { name: 'Q4', target: 160000, actual: 0 },
  ];

  const chartConfig = {
    revenue: { label: "Revenue", color: "#0f172a" },
    invoices: { label: "Invoices", color: "#94a3b8" },
    target: { label: "Target", color: "#f1f5f9" },
    actual: { label: "Actual", color: "#0f172a" },
  };

  const statsData = [
    {
      title: "Total Revenue",
      value: formatCurrency(currentStats.totalRevenue),
      icon: CreditCard,
      change: "+12%",
      trendColor: "green",
      cardType: "credit-card",
      description: "This month's earnings",
    },
    {
      title: "Invoices Sent",
      value: currentStats.invoicesSent.toString(),
      icon: Receipt,
      change: "+8%",
      trendColor: "green",
      cardType: "invoice",
      description: "Documents sent to clients",
    },
    {
      title: "Active Clients",
      value: currentStats.activeClients.toString(),
      icon: UserCheck,
      change: "+15%",
      trendColor: "green",
      cardType: "client",
      description: "Currently active accounts",
    },
    {
      title: "Outstanding",
      value: formatCurrency(currentStats.outstanding),
      icon: Timer,
      change: "-3%",
      trendColor: "red",
      cardType: "outstanding",
      description: "Pending payments",
    },
  ];

  if (statsError || invoicesError || activityError) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-slate-500">There was an error loading your dashboard data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[100rem] mx-auto p-0 space-y-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome back!</h1>
          <p className="text-slate-500 text-lg">Here's what's happening with your business today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            return (
              <div key={index} className="group relative overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                {stat.cardType === "credit-card" && (
                  <div className="h-40 bg-slate-900 rounded-xl relative overflow-hidden m-2">
                    {/* Abstract Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>

                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-black text-white/50 uppercase tracking-widest">BILLIO</span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-emerald-500/20 rounded-full px-2 py-1 text-emerald-400">
                        <ArrowUp className="h-3 w-3" />
                        <span className="text-xs font-bold">{stat.change}</span>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                      <div className="text-sm text-slate-400 mt-1">{stat.description}</div>
                    </div>
                  </div>
                )}

                {stat.cardType !== "credit-card" && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-colors">
                        <stat.icon className="h-6 w-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${stat.trendColor === 'green'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                        }`}>
                        {stat.trendColor === 'green' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.description}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="xl:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-fit">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Revenue Overview</h3>
                  <p className="text-slate-500 text-sm mt-1 font-medium">Last 7 days performance</p>
                </div>
              </div>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesTrendData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={3} dot={{ fill: '#0f172a', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="invoices" stroke="#cbd5e1" strokeWidth={3} dot={{ fill: '#cbd5e1', strokeWidth: 0, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Quick Actions</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/dashboard/invoices/new">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-auto py-4 flex flex-col items-center gap-2 rounded-xl shadow-none transition-all">
                    <Plus className="h-5 w-5" />
                    <span className="font-bold">Create Invoice</span>
                  </Button>
                </Link>
                <Link href="/dashboard/clients">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 h-auto py-4 flex flex-col items-center gap-2 rounded-xl shadow-none text-slate-700 transition-all">
                    <Users className="h-5 w-5" />
                    <span className="font-bold">Add Client</span>
                  </Button>
                </Link>
                <Link href="/dashboard/expenses">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 h-auto py-4 flex flex-col items-center gap-2 rounded-xl shadow-none text-slate-700 transition-all">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-bold">Log Expense</span>
                  </Button>
                </Link>
                <Link href="/dashboard/reports">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 h-auto py-4 flex flex-col items-center gap-2 rounded-xl shadow-none text-slate-700 transition-all">
                    <BarChart3 className="h-5 w-5" />
                    <span className="font-bold">Reports</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Activity & Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <Activity className="h-5 w-5 text-slate-900" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className={`p-2 rounded-lg ${activity.type === 'invoice_paid' ? 'bg-emerald-50' : 'bg-slate-50'
                        }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {activity.amount && `${activity.amount} • `}
                          {getTimeAgo(activity.time)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Recent Invoices Table */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Recent Invoices</h3>
              <p className="text-slate-500 text-sm mt-1 font-medium">Latest billing activity</p>
            </div>
            <Link href="/dashboard/invoices">
              <Button variant="outline" className="rounded-xl px-6 py-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold shadow-none">
                View All
              </Button>
            </Link>
          </div>

          {recentInvoices && recentInvoices.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="font-bold text-slate-900 py-4 pl-0">Invoice</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Client</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Status</TableHead>
                    <TableHead className="font-bold text-slate-900 text-right py-4">Amount</TableHead>
                    <TableHead className="font-bold text-slate-900 text-right py-4 pr-0">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-bold text-slate-900 py-4 pl-0">{invoice.number}</TableCell>
                      <TableCell className="text-slate-600 py-4">{invoice.client?.name || 'Unknown'}</TableCell>
                      <TableCell className="py-4">{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right font-bold text-slate-900 py-4">{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell className="text-right py-4 pr-0">
                        <Link href={`/dashboard/invoices/${invoice.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-lg">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-4">No invoices yet</p>
              <Link href="/dashboard/invoices/new">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3 font-bold">
                  Create First Invoice
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Complete Your Subscription</DialogTitle>
              <DialogDescription>
                You selected the <strong>Pro Business</strong> plan. Subscribe now to unlock unlimited invoices and custom branding.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 flex items-start gap-4">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Pro Business</div>
                  <div className="text-sm text-slate-500 mt-1">Unlimited Invoices • Remove Watermark • Priority Support</div>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-start flex-col gap-2">
              <Button onClick={handleProceedToSubscription} className="w-full bg-slate-900 text-white hover:bg-slate-800 h-11 rounded-xl font-bold">
                Subscribe Now
              </Button>
              <Button variant="ghost" onClick={handleDismissPlan} className="w-full mt-2 sm:mt-0 h-11 rounded-xl font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                Continue with Free Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}