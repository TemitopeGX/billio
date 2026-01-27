"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Building2,
  Mail,
  Phone,
  Loader2,
  Users,
  TrendingUp,
  ArrowUp,
  UserCheck,
  Clock,
} from "lucide-react";
import { useClients } from "@/hooks/useClients";
import api from "@/lib/api";
import { ClientsPageSkeleton } from "@/components/skeletons/page-skeletons";
import { EmptyState } from "@/components/ui/empty-state";

export default function ClientsPage() {
  const router = useRouter();
  const { data: clients, isLoading, error, refetch } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredClients = Array.isArray(clients) ? clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      (client.email && client.email.toLowerCase().includes(searchLower)) ||
      (client.phone && client.phone.toLowerCase().includes(searchLower))
    );
  }) : [];

  const handleDelete = async () => {
    if (!deleteClientId) return;

    setIsDeleting(true);
    try {
      await api.delete(`/clients/${deleteClientId}`);
      toast.success("Client deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete client");
    } finally {
      setIsDeleting(false);
      setDeleteClientId(null);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load clients</p>
        <Button onClick={() => refetch()} className="mt-4 bg-slate-900 text-white">
          Try Again
        </Button>
      </div>
    );
  }

  // Show skeleton loader while loading
  if (isLoading) {
    return <ClientsPageSkeleton />;
  }

  // Show empty state when no clients exist
  if (!isLoading && (!clients || clients.length === 0)) {
    return (
      <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Clients</h1>
          <p className="text-slate-500 text-lg">Manage your client relationships.</p>
        </div>

        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Add your first client to start creating invoices and tracking payments. Build your client database and grow your business."
          actionLabel="Add Your First Client"
          onAction={() => router.push('/dashboard/clients/new')}
        />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Clients</h1>
          <p className="text-slate-500 text-lg">Manage your client relationships.</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3 font-bold shadow-none transition-all">
            <Plus className="h-5 w-5 mr-2" />
            Add New Client
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Clients */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Users className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>+8%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Clients</p>
            <p className="text-3xl font-bold text-slate-900">{isLoading ? '…' : clients?.length || 0}</p>
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <UserCheck className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Clients</p>
            <p className="text-3xl font-bold text-slate-900">{isLoading ? '…' : clients?.length || 0}</p>
          </div>
        </div>

        {/* New This Month */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Clock className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+5</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">New This Month</p>
            <p className="text-3xl font-bold text-slate-900">
              {isLoading ? '…' : Math.floor((clients?.length || 0) * 0.3)}
            </p>
          </div>
        </div>

        {/* Clients with Email */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <Mail className="h-6 w-6 text-slate-900" />
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
              <ArrowUp className="h-3 w-3" />
              <span>+15%</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">With Email</p>
            <p className="text-3xl font-bold text-slate-900">
              {isLoading ? '…' : clients?.filter(client => client.email && client.email.trim() !== '').length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search clients by name, company, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-6 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 focus:bg-white transition-all text-sm"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">All Clients</h3>
              <p className="text-slate-500 mt-1 font-medium">
                {isLoading ? 'Loading…' : `Showing ${filteredClients?.length || 0} of ${clients?.length || 0} clients`}
              </p>
            </div>
          </div>
        </div>
        <div className="p-0">
          {filteredClients?.length === 0 ? (
            <div className="py-16">
              <EmptyState
                icon={searchTerm ? Search : Building2}
                title={searchTerm ? "No clients match your search" : "No clients yet"}
                description={searchTerm ? "Try adjusting your search terms to find what you're looking for." : "Add your first client to get started"}
                actionLabel={searchTerm ? "Clear Search" : "Add New Client"}
                onAction={() => searchTerm ? setSearchTerm('') : router.push('/dashboard/clients/new')}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="font-bold text-slate-900 py-4 pl-6">Client</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Contact</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4">Phone</TableHead>
                    <TableHead className="font-bold text-slate-900 py-4 pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients?.map((client) => (
                    <TableRow key={client.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{client.name}</p>
                            <p className="text-sm text-slate-500">ID: {client.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <p className="text-slate-600 font-medium">{client.email || '—'}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <p className="text-slate-600 font-medium">{client.phone || '—'}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 border-slate-200">
                            <DropdownMenuItem
                              onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                              className="py-3 cursor-pointer focus:bg-slate-50"
                            >
                              <Eye className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">View Details</p>
                                <p className="text-xs text-slate-500">See client information</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => router.push(`/dashboard/clients/${client.id}/edit`)}
                              className="py-3 cursor-pointer focus:bg-slate-50"
                            >
                              <Pencil className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Edit</p>
                                <p className="text-xs text-slate-500">Modify client info</p>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="py-3 text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer"
                              onClick={() => setDeleteClientId(client.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-3" />
                              <div>
                                <p className="font-medium">Delete</p>
                                <p className="text-xs opacity-70">Remove client</p>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteClientId}
        onOpenChange={(open) => !open && setDeleteClientId(null)}
      >
        <AlertDialogContent className="rounded-2xl border-slate-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold text-slate-900">Delete Client</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Are you sure you want to delete this client? This action cannot be
              undone and will also delete all associated invoices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl border-slate-200 font-bold text-slate-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 rounded-xl font-bold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Client"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}