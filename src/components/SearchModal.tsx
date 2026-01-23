"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Users, DollarSign, TrendingUp, Clock, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Input } from "@/components/ui/input";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import api from "@/lib/api";

interface SearchResult {
  id: string;
  type: 'invoice' | 'client' | 'payment' | 'expense';
  title: string;
  subtitle: string;
  url: string;
}

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const query = searchQuery.toLowerCase();
      
      // Fetch all data
      const [invoicesRes, clientsRes, expensesRes] = await Promise.allSettled([
        api.get(`/invoices?limit=100`),
        api.get(`/clients?limit=100`),
        api.get(`/expenses?limit=100`),
      ]);

      const searchResults: SearchResult[] = [];

      // Process invoices
      if (invoicesRes.status === 'fulfilled') {
        const invoices = invoicesRes.value.data?.data?.invoices || invoicesRes.value.data || [];
        invoices
          .filter((invoice: any) => {
            const searchableText = `${invoice.number} ${invoice.client?.name || ''} ${invoice.amount}`.toLowerCase();
            return searchableText.includes(query);
          })
          .slice(0, 3)
          .forEach((invoice: any) => {
            searchResults.push({
              id: invoice.id,
              type: 'invoice',
              title: `Invoice #${invoice.number}`,
              subtitle: `${invoice.client?.name || 'Unknown'} - ₦${invoice.amount?.toLocaleString() || '0'}`,
              url: `/dashboard/invoices/${invoice.id}`,
            });
          });
      }

      // Process clients
      if (clientsRes.status === 'fulfilled') {
        const clients = clientsRes.value.data?.data?.clients || clientsRes.value.data || [];
        clients
          .filter((client: any) => {
            const searchableText = `${client.name} ${client.email || ''} ${client.company || ''}`.toLowerCase();
            return searchableText.includes(query);
          })
          .slice(0, 3)
          .forEach((client: any) => {
            searchResults.push({
              id: client.id,
              type: 'client',
              title: client.name,
              subtitle: client.email || client.company || 'Client',
              url: `/dashboard/clients/${client.id}`,
            });
          });
      }

      // Process expenses
      if (expensesRes.status === 'fulfilled') {
        const expenses = expensesRes.value.data?.data?.expenses || expensesRes.value.data || [];
        expenses
          .filter((expense: any) => {
            const searchableText = `${expense.description || ''} ${expense.category || ''} ${expense.amount}`.toLowerCase();
            return searchableText.includes(query);
          })
          .slice(0, 3)
          .forEach((expense: any) => {
            searchResults.push({
              id: expense.id,
              type: 'expense',
              title: expense.description || 'Expense',
              subtitle: `₦${expense.amount?.toLocaleString() || '0'} - ${expense.category || ''}`,
              url: `/dashboard/expenses`,
            });
          });
      }

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleResultClick(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    onOpenChange(false);
    setQuery("");
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'client':
        return <Users className="h-4 w-4 text-purple-600" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'expense':
        return <TrendingUp className="h-4 w-4 text-orange-600" />;
      default:
        return <Search className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search for invoices, clients, payments, and expenses across your dashboard
          </DialogDescription>
        </VisuallyHidden>
        
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search invoices, clients, payments..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="ml-2 p-1 hover:bg-accent rounded"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                    index === selectedIndex
                      ? 'bg-accent'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-muted-foreground capitalize">
                        {result.type}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!query && !loading && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground mb-2">Start typing to search</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Try searching for invoices, clients, or payments</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <KbdGroup>
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
              </KbdGroup>
              <span className="ml-1">Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <Kbd>Enter</Kbd>
              <span className="ml-1">Select</span>
            </div>
            <div className="flex items-center gap-1">
              <Kbd>Esc</Kbd>
              <span className="ml-1">Close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

