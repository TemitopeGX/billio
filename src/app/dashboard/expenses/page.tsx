"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Receipt,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  Plus,
  Loader2,
  AlertCircle,
  BarChart3,
  PieChart,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, PieChart as RePieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import api from "@/lib/api";
import { ExpensesPageSkeleton } from "@/components/skeletons/page-skeletons";

export default function ExpensesPage() {
  const { expenses, stats, loading, error, refetch } = useExpenses();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    // Consistent pastel backgrounds with slate text scheme
    const colors: { [key: string]: string } = {
      'Software': 'bg-slate-100 text-slate-700 border-slate-200',
      'Marketing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Office': 'bg-slate-100 text-slate-700 border-slate-200',
      'Travel': 'bg-amber-50 text-amber-700 border-amber-200',
      'Utilities': 'bg-slate-100 text-slate-700 border-slate-200',
      'Other': 'bg-slate-50 text-slate-600 border-slate-200',
    };
    return colors[category] || colors['Other'];
  };

  const handleDeleteExpense = async (expenseId: string) => {
    if (!confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/expenses/${expenseId}`);
      toast.success('Expense deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Failed to delete expense. Please try again.');
    }
  };

  // Process data for charts
  const getChartData = () => {
    if (!expenses || expenses.length === 0) return [];

    // Group expenses by date for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    return last7Days.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const dayExpenses = expenses.filter(expense => {
        if (!expense) return false;
        const expenseDate = new Date(expense.date).toISOString().split('T')[0];
        return expenseDate === dateStr;
      });

      const totalAmount = dayExpenses.reduce((sum, expense) => {
        return sum + (Number(expense.amount) || 0);
      }, 0);

      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: totalAmount,
        count: dayExpenses.length
      };
    });
  };

  const getCategoryData = () => {
    if (!stats.categoryCounts) return [];

    return Object.entries(stats.categoryCounts).map(([category, count]) => ({
      name: category,
      value: count,
      color: '#0f172a' // All segments slate-900, maybe opacity variance in real app, but for now solid is fine or we can use shades
    })).map((item, index) => ({
      ...item,
      // Generate shades of slate/gray for a monochrome feel
      color: index % 2 === 0 ? '#0f172a' : '#64748b'
    }));
  };

  const chartData = getChartData();
  const categoryData = getCategoryData();

  const chartConfig = {
    amount: {
      label: "Expense Amount",
      color: "#0f172a",
    },
    count: {
      label: "Expense Count",
      color: "#64748b",
    },
  };

  if (loading) {
    return <ExpensesPageSkeleton />;
  }

  if (error) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            <span className="font-medium">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Expenses</h1>
          <p className="text-slate-500 text-lg">Track and manage your business expenses</p>
        </div>
        <Link href="/dashboard/expenses/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold h-12 shadow-none transition-colors w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Expenses */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Receipt className="h-6 w-6 text-slate-900" />
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${stats.monthlyTrend >= 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
              {stats.monthlyTrend >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(stats.monthlyTrend).toFixed(1)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats?.totalExpenses || 0)}</p>
            <p className="text-xs text-slate-400 mt-1">All time</p>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Calendar className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
              <TrendingUp className="h-3 w-3" />
              <span>This Month</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">This Month</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats?.totalThisMonth || 0)}</p>
            <p className="text-xs text-slate-400 mt-1">Current month</p>
          </div>
        </div>

        {/* Average Expense */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <DollarSign className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
              <BarChart3 className="h-3 w-3" />
              <span>Average</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Average Expense</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(stats?.averageExpense || 0)}</p>
            <p className="text-xs text-slate-400 mt-1">Per expense</p>
          </div>
        </div>

        {/* Total Count */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <FileText className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
              <TrendingUp className="h-3 w-3" />
              <span>Total</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Count</p>
            <p className="text-3xl font-bold text-slate-900">{expenses?.length || 0}</p>
            <p className="text-xs text-slate-400 mt-1">Expenses</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Trends */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Expense Trends</h3>
                <p className="text-slate-500 text-sm font-medium">Last 7 days</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <AreaChart data={chartData}>
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
                    dataKey="amount"
                    stroke="#0f172a"
                    fill="#0f172a"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-slate-200" />
                  <p className="text-slate-500 font-bold">No expense data available</p>
                  <p className="text-sm text-slate-400 mt-1">Expense trends will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <PieChart className="h-5 w-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Categories</h3>
                <p className="text-slate-500 text-sm font-medium">Distribution</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {categoryData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px]">
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
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
                  <p className="text-slate-500 font-bold">No category data</p>
                  <p className="text-sm text-slate-400 mt-1">Category breakdown will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Recent Expenses</h3>
            <p className="text-slate-500 font-medium mt-1">
              {expenses && expenses.length > 0
                ? `Showing ${expenses.length} expense${expenses.length === 1 ? '' : 's'}`
                : 'No expenses found'
              }
            </p>
          </div>
        </div>
        <div className="p-0">
          {!expenses || expenses.length === 0 ? (
            <div className="py-16 text-center">
              <div className="p-4 bg-slate-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Receipt className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">No expenses yet</p>
              <p className="text-slate-400 text-sm mt-1">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="font-bold text-slate-900 py-4 pl-6">Date</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Category</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Description</TableHead>
                    <TableHead className="text-right font-bold text-slate-900 py-4">Amount</TableHead>
                    <TableHead className="text-center font-bold text-slate-900 py-4 pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => {
                    if (!expense) return null;
                    return (
                      <TableRow key={expense.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="py-4 pl-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <p className="text-slate-700 font-medium">{formatDate(expense.date)}</p>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${getCategoryColor(expense.category)} rounded-full px-3 py-1 text-xs font-bold shadow-none`}>
                            <Tag className="h-3 w-3 mr-1" />
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          <p className="text-slate-600 font-medium">{expense.description || 'No description'}</p>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <p className="font-bold text-slate-900">{formatCurrency(Number(expense.amount) || 0)}</p>
                        </TableCell>
                        <TableCell className="text-center py-4 pr-6">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-slate-200 rounded-xl shadow-sm">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/expenses/${expense.id}/edit`} className="flex items-center cursor-pointer font-medium text-slate-700">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="text-red-600 focus:text-red-700 cursor-pointer font-medium focus:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
