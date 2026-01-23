import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Expense {
  id: string;
  userId: string;
  date: string;
  category: string;
  description?: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  totalThisMonth: number;
  averageExpense: number;
  categoryCounts: { [key: string]: number };
  monthlyTrend: number;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<ExpenseStats>({
    totalExpenses: 0,
    totalThisMonth: 0,
    averageExpense: 0,
    categoryCounts: {},
    monthlyTrend: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/expenses');
      const expensesData: Expense[] = response.data.data.expenses || [];
      
      console.log('Fetched expenses data:', expensesData);
      
      setExpenses(expensesData);
      
      // Calculate statistics
      const totalExpenses = expensesData.reduce((sum, expense) => {
        return sum + (Number(expense?.amount) || 0);
      }, 0);
      
      // Calculate this month's expenses
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonthExpenses = expensesData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      });
      
      const totalThisMonth = thisMonthExpenses.reduce((sum, expense) => {
        return sum + (Number(expense?.amount) || 0);
      }, 0);
      
      // Calculate average expense
      const averageExpense = expensesData.length > 0 ? totalExpenses / expensesData.length : 0;
      
      // Calculate category counts
      const categoryCounts = expensesData.reduce((acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
      
      // Calculate monthly trend (simplified - compare this month to last month)
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const lastMonthExpenses = expensesData.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
      });
      
      const totalLastMonth = lastMonthExpenses.reduce((sum, expense) => {
        return sum + (Number(expense?.amount) || 0);
      }, 0);
      
      const monthlyTrend = totalLastMonth > 0 
        ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100 
        : 0;
      
      const calculatedStats = {
        totalExpenses,
        totalThisMonth,
        averageExpense,
        categoryCounts,
        monthlyTrend,
      };
      
      console.log('Calculated expense stats:', calculatedStats);
      setStats(calculatedStats);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to fetch expenses');
      // Set empty data on error
      setExpenses([]);
      setStats({
        totalExpenses: 0,
        totalThisMonth: 0,
        averageExpense: 0,
        categoryCounts: {},
        monthlyTrend: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    stats,
    loading,
    error,
    refetch: fetchExpenses,
  };
}
