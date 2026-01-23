"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import api from '@/lib/api';

export const useInvoiceActions = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const viewInvoice = (id: string) => {
    router.push(`/dashboard/invoices/${id}`);
  };

  const editInvoice = (id: string) => {
    router.push(`/dashboard/invoices/${id}/edit`);
  };

  const downloadPDF = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/invoices/${id}/pdf`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${id}.pdf`);
      
      // Append to html link element page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
      console.error('Error downloading PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendEmail = async (id: string) => {
    setIsLoading(true);
    try {
      await api.post(`/invoices/${id}/send`);
      toast.success('Invoice sent successfully');
    } catch (error) {
      toast.error('Failed to send invoice');
      console.error('Error sending invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/invoices/${id}`);
      toast.success('Invoice deleted successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to delete invoice');
      console.error('Error deleting invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    viewInvoice,
    editInvoice,
    downloadPDF,
    sendEmail,
    deleteInvoice,
    isLoading
  };
};
