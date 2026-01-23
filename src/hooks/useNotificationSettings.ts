"use client";

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { toast } from 'sonner';

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  invoiceReminders: boolean;
  paymentAlerts: boolean;
  invoiceCreated: boolean;
  invoiceUpdated: boolean;
  paymentReceived: boolean;
  paymentUpdated: boolean;
  clientCreated: boolean;
  clientUpdated: boolean;
}

const defaultSettings: NotificationSettings = {
  email: true,
  push: true,
  invoiceReminders: true,
  paymentAlerts: true,
  invoiceCreated: true,
  invoiceUpdated: true,
  paymentReceived: true,
  paymentUpdated: true,
  clientCreated: true,
  clientUpdated: true,
};

export const useNotificationSettings = () => {
  const queryClient = useQueryClient();

  // Fetch notification settings
  const {
    data: settingsData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['notification-settings'],
    queryFn: async () => {
      try {
        const response = await api.get('/notifications/settings');
        return response.data;
      } catch (error: any) {
        // If settings don't exist yet, return default settings
        if (error.response?.status === 404) {
          return { success: true, data: { settings: defaultSettings } };
        }
        throw error;
      }
    },
    staleTime: 30000, // Consider data stale after 30 seconds
  });

  const settings = settingsData?.data?.settings || defaultSettings;

  // Update notification settings
  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<NotificationSettings>) => {
      const response = await api.put('/notifications/settings', newSettings);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] });
      toast.success('Notification settings updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating notification settings:', error);
      const errorMessage = error.response?.data?.error?.message || 
                          error.response?.data?.message || 
                          error.message || 
                          'Failed to update notification settings';
      toast.error(errorMessage);
    },
  });

  // Update a single setting
  const updateSetting = (field: keyof NotificationSettings, value: boolean) => {
    const newSettings = {
      ...settings,
      [field]: value
    };
    updateSettingsMutation.mutate(newSettings);
  };

  // Update multiple settings at once
  const updateSettings = (newSettings: Partial<NotificationSettings>) => {
    updateSettingsMutation.mutate({
      ...settings,
      ...newSettings
    });
  };

  return {
    settings,
    isLoading,
    error,
    updateSetting,
    updateSettings,
    isUpdating: updateSettingsMutation.isPending,
    refetch,
  };
};
