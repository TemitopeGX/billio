"use client";

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/api';

export const useClientActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const viewClient = (id: string) => {
    router.push(`/dashboard/clients/${id}`);
  };

  const editClient = (id: string) => {
    router.push(`/dashboard/clients/${id}/edit`);
  };

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/clients/${id}`);
    },
    onSuccess: () => {
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
    onError: (error: any) => {
      console.error("Error deleting client:", error);
      toast.error(error.response?.data?.error || "Failed to delete client");
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await api.put(`/clients/${id}`, data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success("Client updated successfully");
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      const clientData = response.data?.client || response;
      queryClient.invalidateQueries({ queryKey: ['client', clientData.id] });
      router.push(`/dashboard/clients/${clientData.id}`);
      router.refresh();
    },
    onError: (error: any) => {
      console.error("Error updating client:", error);
      toast.error(error.response?.data?.error || "Failed to update client");
    },
  });

  const createClientMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/clients', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Client created successfully");
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      router.push(`/dashboard/clients/${data.id}`);
      router.refresh();
    },
    onError: (error: any) => {
      console.error("Error creating client:", error);
      toast.error(error.response?.data?.error || "Failed to create client");
    },
  });

  return {
    viewClient,
    editClient,
    deleteClient: deleteClientMutation.mutate,
    updateClient: updateClientMutation.mutate,
    createClient: createClientMutation.mutate,
    isLoading: 
      deleteClientMutation.isPending || 
      updateClientMutation.isPending || 
      createClientMutation.isPending,
  };
};
