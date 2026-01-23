"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CompanySettings {
  companyName: string | null;
  companyAddress: string | null;
  companyContact: string | null;
  companyLogo: string | null;
  companyWebsite: string | null;
  invoiceFooter: string | null;
  primaryColor: string;
}

export function useCompanySettings() {
  return useQuery({
    queryKey: ['company-settings'],
    queryFn: async () => {
      const response = await api.get("/users/settings/company");
      return (response.data?.data?.settings || response.data?.settings) as CompanySettings;
    }
  });
}

export function isCompanySettingsComplete(settings: CompanySettings | undefined | null): boolean {
  if (!settings) return false;

  // Required fields for invoice template
  return !!(
    settings.companyName &&
    settings.companyAddress &&
    settings.companyContact
  );
}
