"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { getBaseUrl } from "@/lib/utils";
import {
  Building2,
  Upload,
  Trash2,
  Palette,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Moon,
  Sun,
  Monitor,
  Bell,
  CreditCard,
  Save,
  Loader2,
  Check,
} from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/hooks/useProfile";
import { useTheme } from "@/contexts/theme-context";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { SettingsPageSkeleton } from "@/components/skeletons/page-skeletons";

interface CompanySettings {
  companyName: string | null;
  companyAddress: string | null;
  companyContact: string | null;
  companyLogo: string | null;
  companyWebsite: string | null;
  invoiceFooter: string | null;
  primaryColor: string;
}

interface ProfileSettings {
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  avatar: string | null;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  dateFormat: string;
  timezone: string;
  language: string;
}

interface Plan {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: string; // decimal string
  interval: string;
  billing_period?: string;
  features: string[];
}

interface Subscription {
  id: string;
  planId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd?: boolean;
  plan: Plan;
  trial_ends_at?: string;
  canceled_at?: string;
  auto_renew?: boolean;
  paystack_subscription_code?: string;
  stripeSubscriptionId?: string;
}

interface UsageStats {
  plan_name: string;
  features: {
    invoices: {
      used: number;
      limit: number | string;
      remaining: number | string;
    };
    clients: {
      used: number;
      limit: number | string;
      remaining: number | string;
    };
  };
}

// ... types
type PaymentGateway = 'stripe' | 'paystack';

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();

  const {
    settings: notificationSettings,
    isLoading: notificationSettingsLoading,
    updateSetting: updateNotificationSetting,
    isUpdating: isUpdatingNotifications
  } = useNotificationSettings();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'appearance' | 'notifications' | 'billing'>('profile');
  const [profileErrors, setProfileErrors] = useState<Partial<ProfileSettings>>({});
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('');

  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    companyName: "",
    companyAddress: "",
    companyContact: "",
    companyLogo: null,
    companyWebsite: "",
    invoiceFooter: "",
    primaryColor: "#0f172a" // Default to Slate-900 equivalent
  });

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    avatar: null
  });

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: 'light', // Defaulting to light as per new aesthetic
    currency: 'NGN',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'Africa/Lagos',
    language: 'en'
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('stripe');
  const processedRef = useRef<string | null>(null);

  // Handle URL parameters for tab switching and subscription status
  useEffect(() => {
    const tab = searchParams.get('tab') as 'profile' | 'company' | 'appearance' | 'notifications' | 'billing';
    if (tab && ['profile', 'company', 'appearance', 'notifications', 'billing'].includes(tab)) {
      setActiveTab(tab);
    }

    // Handle subscription success/cancel redirects
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const reference = searchParams.get('reference') || searchParams.get('trxref');

    const sessionId = searchParams.get('session_id');

    /* Paystack Verification Disabled */

    if (sessionId) {
      // Stripe verification
      const currentSessionId = sessionId;
      router.replace('/dashboard/settings?tab=billing');

      if (processedRef.current === currentSessionId) return;
      processedRef.current = currentSessionId;

      api.post('/subscriptions/verify-stripe', { session_id: currentSessionId })
        .then(() => {
          toast.success('Subscription activated successfully!');
          refreshSubscription();
        })
        .catch((err) => {
          console.error('Verify failed:', err);
          // Try refreshing anyway
          setTimeout(() => refreshSubscription(), 1000);
        });
    } else if (success === 'true') {
      toast.success('Subscription updated successfully!');
      // Refresh subscription data
      refreshSubscription();
      // Clean up URL params
      router.replace('/dashboard/settings?tab=billing');
    } else if (canceled === 'true') {
      toast.info('Subscription update canceled');
      router.replace('/dashboard/settings?tab=billing');
    }

  }, [searchParams]);

  // Function to refresh subscription data
  const refreshSubscription = async () => {
    try {
      const [subRes, plansRes, usageRes] = await Promise.all([
        api.get('/subscriptions/me'),
        api.get('/subscriptions/plans'),
        api.get('/subscriptions/usage')
      ]);
      setSubscription(subRes.data.data.subscription || null);
      setPlans(plansRes.data.data.plans || []);
      setUsageStats(usageRes.data.data || null);
    } catch (err) {
      console.error('Error refreshing subscription:', err);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch all data in parallel for faster loading
        const [companyResponse, profileResponse, subRes, plansRes, usageRes] = await Promise.all([
          api.get("/users/settings/company"),
          api.get("/users/profile"),
          api.get('/subscriptions/me').catch(() => ({ data: { success: false } })),
          api.get('/subscriptions/plans').catch(() => ({ data: { success: false } })),
          api.get('/subscriptions/usage').catch(() => ({ data: { success: false } }))
        ]);

        // Process company settings
        const companyData = companyResponse.data?.data?.settings || companyResponse.data?.settings;
        if (companyData) {
          setCompanySettings(prev => ({
            ...prev,
            companyName: companyData.companyName || "",
            companyAddress: companyData.companyAddress || "",
            companyContact: companyData.companyContact || "",
            companyLogo: companyData.companyLogo || null,
            companyWebsite: companyData.companyWebsite || "",
            invoiceFooter: companyData.invoiceFooter || "",
            primaryColor: companyData.primaryColor || "#0f172a"
          }));
        }

        // Process user profile
        const profileData = profileResponse.data?.data?.user || profileResponse.data?.user;
        if (profileData) {
          setProfileSettings(prev => ({
            ...prev,
            name: profileData.name || user?.name || "",
            email: profileData.email || user?.email || "",
            phone: profileData.phone || "",
            address: profileData.address || ""
          }));
        }

        // Load app settings from localStorage
        setAppSettings(prev => ({
          ...prev,
          theme: 'light'
        }));

        // Process subscription data
        if (subRes.data.success && subRes.data.data.subscription) {
          setSubscription(subRes.data.data.subscription);
        }
        if (plansRes.data.success && plansRes.data.data.plans) {
          setPlans(plansRes.data.data.plans);
        }
        if (usageRes.data.success && usageRes.data.data) {
          setUsageStats(usageRes.data.data);
        }

      } catch (error) {
        console.error("Error fetching settings:", error);
        toast.error("Failed to load settings");

        setCompanySettings({
          companyName: "",
          companyAddress: "",
          companyContact: "",
          companyLogo: null,
          companyWebsite: "",
          invoiceFooter: "",
          primaryColor: "#0f172a"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [user]);


  const handleCompanyInputChange = (field: keyof CompanySettings, value: string) => {
    setCompanySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileInputChange = (field: keyof ProfileSettings, value: string) => {
    setProfileSettings(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (profileErrors[field]) {
      setProfileErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateProfileForm = (): boolean => {
    const errors: Partial<ProfileSettings> = {};

    if (!profileSettings?.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!profileSettings?.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileSettings?.email || "")) {
      errors.email = 'Please enter a valid email address';
    }

    if (profileSettings?.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(profileSettings.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAppSettingChange = (field: keyof AppSettings, value: any) => {
    setAppSettings(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-save app settings changes
    setTimeout(() => {
      localStorage.setItem(field, value);
      setAutoSaveStatus('Settings saved automatically');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    }, 100);
  };

  const handleNotificationChange = (field: keyof typeof notificationSettings | string, value: boolean) => {
    updateNotificationSetting(field as any, value);
  };



  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast.error("Please upload a JPEG, PNG or GIF file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    try {
      setIsSaving(true);
      const response = await api.post("/users/settings/company/logo", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const settings = response.data?.data?.settings || response.data?.settings;
      if (settings) {
        setCompanySettings(settings);
      }
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Failed to upload logo");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoDelete = async () => {
    try {
      setIsSaving(true);
      const response = await api.delete("/users/settings/company/logo");
      const settings = response.data?.data?.settings || response.data?.settings;
      if (settings) {
        setCompanySettings(settings);
      }
      toast.success("Logo removed successfully");
    } catch (error) {
      console.error("Error deleting logo:", error);
      toast.error("Failed to remove logo");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const response = await api.put("/users/settings/company", companySettings);
      const settings = response.data?.data?.settings || response.data?.settings;
      if (settings) {
        setCompanySettings(settings); // No spread, we have the full object
      }
      toast.success("Company settings saved successfully");
    } catch (error) {
      console.error("Error saving company settings:", error);
      toast.error("Failed to save company settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    try {
      setIsSaving(true);

      const response = await api.put("/users/profile", {
        name: profileSettings?.name || "",
        email: profileSettings?.email || "",
        phone: profileSettings?.phone || "",
        address: profileSettings?.address || ""
      });

      const profileData = response.data?.data?.user || response.data?.user;
      if (profileData) {
        const updatedProfile = {
          name: profileData.name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          avatar: profileData.avatar || null
        };

        setProfileSettings(updatedProfile);
      }

      const userData = response.data?.data?.user || response.data?.user;
      if (userData) {
        updateProfile({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          avatar: userData.avatar,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt
        });
      }

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAppSettingsSave = () => {
    try {
      localStorage.setItem('currency', appSettings.currency);
      localStorage.setItem('dateFormat', appSettings.dateFormat);
      localStorage.setItem('timezone', appSettings.timezone);
      localStorage.setItem('language', appSettings.language);

      toast.success("App settings saved successfully");
    } catch (error) {
      console.error("Error saving app settings:", error);
      toast.error("Failed to save app settings");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-slate-900" />
            <span className="text-slate-500 font-medium">Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building2 },
    // { id: 'appearance', label: 'Appearance', icon: Palette }, // Hidden for now
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleUpgrade = async (planSlug: string) => {
    try {
      setIsSaving(true);
      const response = await api.post('/subscriptions/checkout', {
        planSlug,
        gateway: selectedGateway
      });

      if (response.data.success && response.data.data.url) {
        // Redirect to Gateway Checkout
        window.location.href = response.data.data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to start checkout');
      setIsSaving(false);
    }
  };

  const handleManageSubscription = async () => {
    // If it's a Paystack subscription (inferred if no stripeSubscriptionId or if we add a gateway field), we handle differently.
    // For now, let's assume if it has paystack_subscription_code (field might need adding to frontend type)
    // or we just try portal and if it fails (not stripe), we show cancel option.
    // But better: Just show "Cancel Subscription" button directly for Paystack users in the JSX, instead of "Manage".

    try {
      setIsSaving(true);
      const response = await api.post('/subscriptions/portal');

      if (response.data.success && response.data.data.url) {
        // Open the management link in a new tab
        window.open(response.data.data.url, '_blank', 'noopener,noreferrer');
      }
    } catch (error: any) {
      // If portal fails (likely not Stripe), suggest cancellation or support
      toast.error(error.response?.data?.message || 'Failed to open billing portal');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? Your Pro plan access will end immediately and you will be moved to the Free plan.')) {
      return;
    }

    try {
      setIsSaving(true);
      await api.post('/subscriptions/cancel');
      toast.success('Subscription canceled. You are now on the Free plan.');
      await refreshSubscription();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <SettingsPageSkeleton />;
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-lg">Manage your account and application preferences</p>
        {autoSaveStatus && (
          <div className="mt-2 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg inline-block font-medium">
            ✓ {autoSaveStatus}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  router.push(`/dashboard/settings?tab=${tab.id}`);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium ${activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <User className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Profile Settings</CardTitle>
                    <CardDescription className="text-slate-500">Update your personal information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-bold text-slate-900">
                        <User className="h-4 w-4 inline mr-2 text-slate-400" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={profileSettings?.name || ""}
                        onChange={(e) => handleProfileInputChange("name", e.target.value)}
                        className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${profileErrors.name ? 'border-red-300 focus:border-red-500' : ''
                          }`}
                      />
                      {profileErrors.name && (
                        <p className="text-sm text-red-600 mt-1">{profileErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-bold text-slate-900">
                        <Mail className="h-4 w-4 inline mr-2 text-slate-400" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileSettings?.email || ""}
                        onChange={(e) => handleProfileInputChange("email", e.target.value)}
                        className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${profileErrors.email ? 'border-red-300 focus:border-red-500' : ''
                          }`}
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-red-600 mt-1">{profileErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-bold text-slate-900">
                        <Phone className="h-4 w-4 inline mr-2 text-slate-400" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={profileSettings?.phone || ""}
                        onChange={(e) => handleProfileInputChange("phone", e.target.value)}
                        className={`rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12 ${profileErrors.phone ? 'border-red-300 focus:border-red-500' : ''
                          }`}
                      />
                      {profileErrors.phone && (
                        <p className="text-sm text-red-600 mt-1">{profileErrors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-bold text-slate-900">
                        <MapPin className="h-4 w-4 inline mr-2 text-slate-400" />
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        value={profileSettings?.address || ""}
                        onChange={(e) => handleProfileInputChange("address", e.target.value)}
                        className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 min-h-[100px]"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-slate-100">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold h-12"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Profile
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Company Settings */}
          {activeTab === 'company' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Company Settings</CardTitle>
                    <CardDescription className="text-slate-500">Customize your company profile and invoice branding</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleCompanySubmit} className="space-y-8">
                  {/* Company Logo */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-bold text-slate-900">Company Logo</Label>
                      <p className="text-sm text-slate-500 mt-1">Upload your company logo to be displayed on invoices</p>
                    </div>
                    {companySettings?.companyLogo ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={`${getBaseUrl()}${companySettings?.companyLogo}`}
                          alt="Company Logo"
                          className="h-20 w-auto object-contain rounded-lg border border-slate-200"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleLogoDelete}
                          disabled={isSaving}
                          className="text-red-600 border-red-200 hover:bg-red-50 font-bold"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Logo
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="logo" className="cursor-pointer">
                          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-slate-400 transition-colors bg-slate-50">
                            <Upload className="h-8 w-8 mx-auto text-slate-400" />
                            <p className="mt-2 text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-400">PNG, JPG or GIF up to 5MB</p>
                          </div>
                        </Label>
                        <input
                          type="file"
                          id="logo"
                          className="hidden"
                          accept="image/jpeg,image/png,image/gif"
                          onChange={handleLogoUpload}
                          disabled={isSaving}
                        />
                      </div>
                    )}
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Company Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="text-sm font-bold text-slate-900">Company Name</Label>
                          <Input
                            id="companyName"
                            value={companySettings?.companyName || ""}
                            onChange={(e) => handleCompanyInputChange("companyName", e.target.value)}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyWebsite" className="text-sm font-bold text-slate-900">
                            <Globe className="h-4 w-4 inline mr-2 text-slate-400" />
                            Company Website
                          </Label>
                          <Input
                            id="companyWebsite"
                            value={companySettings?.companyWebsite || ""}
                            onChange={(e) => handleCompanyInputChange("companyWebsite", e.target.value)}
                            placeholder="https://www.example.com"
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyContact" className="text-sm font-bold text-slate-900">
                            <Phone className="h-4 w-4 inline mr-2 text-slate-400" />
                            Contact Information
                          </Label>
                          <Input
                            id="companyContact"
                            value={companySettings?.companyContact || ""}
                            onChange={(e) => handleCompanyInputChange("companyContact", e.target.value)}
                            placeholder="Phone, email, or other contact details"
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyAddress" className="text-sm font-bold text-slate-900">
                            <MapPin className="h-4 w-4 inline mr-2 text-slate-400" />
                            Business Address
                          </Label>
                          <Textarea
                            id="companyAddress"
                            value={companySettings?.companyAddress || ""}
                            onChange={(e) => handleCompanyInputChange("companyAddress", e.target.value)}
                            placeholder="Enter your business address"
                            rows={3}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    {/* Invoice Customization */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Invoice Customization</h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="invoiceFooter" className="text-sm font-bold text-slate-900">Invoice Footer</Label>
                          <Textarea
                            id="invoiceFooter"
                            value={companySettings?.invoiceFooter || ""}
                            onChange={(e) => handleCompanyInputChange("invoiceFooter", e.target.value)}
                            placeholder="Enter custom footer text for your invoices"
                            rows={3}
                            className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="primaryColor" className="text-sm font-bold text-slate-900">
                            <Palette className="h-4 w-4 inline mr-2 text-slate-400" />
                            Brand Color
                          </Label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="color"
                              id="primaryColor"
                              value={companySettings?.primaryColor || "#0f172a"}
                              onChange={(e) => handleCompanyInputChange("primaryColor", e.target.value)}
                              className="w-16 h-12 rounded-xl border-slate-200"
                            />
                            <div className="flex-1">
                              <p className="text-sm text-slate-500">This color will be used for headers and accents in your invoices</p>
                              <p className="text-xs text-slate-400 mt-1">Current color: {companySettings?.primaryColor || "#0f172a"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-slate-100">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold h-12"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Company Settings
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Palette className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Appearance Settings</CardTitle>
                    <CardDescription className="text-slate-500">Customize the look and feel of your application</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {/* Theme Selection - Removed to enforce Light Mode */}


                  {/* Other Appearance Settings */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Currency</Label>
                        <Select value={appSettings.currency} onValueChange={(value) => handleAppSettingChange('currency', value)}>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                            <SelectItem value="USD">US Dollar (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Date Format</Label>
                        <Select value={appSettings.dateFormat} onValueChange={(value) => handleAppSettingChange('dateFormat', value)}>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Timezone</Label>
                        <Select value={appSettings.timezone} onValueChange={(value) => handleAppSettingChange('timezone', value)}>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                            <SelectItem value="America/New_York">America/New_York</SelectItem>
                            <SelectItem value="Europe/London">Europe/London</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Language</Label>
                        <Select value={appSettings.language} onValueChange={(value) => handleAppSettingChange('language', value)}>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-slate-100">
                    <Button
                      onClick={handleAppSettingsSave}
                      className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold h-12"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Appearance Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Bell className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Notification Settings</CardTitle>
                    <CardDescription className="text-slate-500">Manage how you receive notifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {notificationSettingsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-6 w-6 animate-spin text-slate-900" />
                      <span className="text-slate-500 font-medium">Loading notification settings...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label className="text-sm font-bold text-slate-900">Email Notifications</Label>
                          <p className="text-sm text-slate-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                          disabled={isUpdatingNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label className="text-sm font-bold text-slate-900">Push Notifications</Label>
                          <p className="text-sm text-slate-500">Receive push notifications in your browser</p>
                        </div>
                        <Switch
                          checked={notificationSettings.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                          disabled={isUpdatingNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label className="text-sm font-bold text-slate-900">Invoice Reminders</Label>
                          <p className="text-sm text-slate-500">Get reminded about overdue invoices</p>
                        </div>
                        <Switch
                          checked={notificationSettings.invoiceReminders}
                          onCheckedChange={(checked) => handleNotificationChange('invoiceReminders', checked)}
                          disabled={isUpdatingNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <Label className="text-sm font-bold text-slate-900">Payment Alerts</Label>
                          <p className="text-sm text-slate-500">Get notified when payments are received</p>
                        </div>
                        <Switch
                          checked={notificationSettings.paymentAlerts}
                          onCheckedChange={(checked) => handleNotificationChange('paymentAlerts', checked)}
                          disabled={isUpdatingNotifications}
                        />
                      </div>
                    </div>

                    <Separator className="bg-slate-100" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900">Activity Notifications</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Invoice Created</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.invoiceCreated}
                            onCheckedChange={(checked) => handleNotificationChange('invoiceCreated', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Invoice Updated</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.invoiceUpdated}
                            onCheckedChange={(checked) => handleNotificationChange('invoiceUpdated', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Payment Received</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.paymentReceived}
                            onCheckedChange={(checked) => handleNotificationChange('paymentReceived', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Payment Updated</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.paymentUpdated}
                            onCheckedChange={(checked) => handleNotificationChange('paymentUpdated', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Client Created</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.clientCreated}
                            onCheckedChange={(checked) => handleNotificationChange('clientCreated', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                          <div>
                            <Label className="text-sm font-medium text-slate-900">Client Updated</Label>
                          </div>
                          <Switch
                            checked={notificationSettings.clientUpdated}
                            onCheckedChange={(checked) => handleNotificationChange('clientUpdated', checked)}
                            disabled={isUpdatingNotifications}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                      <div className="text-sm font-medium">
                        {isUpdatingNotifications && (
                          <div className="flex items-center text-slate-500">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Saving notification settings...
                          </div>
                        )}
                        {!isUpdatingNotifications && (
                          <div className="flex items-center text-emerald-600">
                            <span>✓ Notification settings are saved automatically</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Billing Settings */}
          {activeTab === 'billing' && (
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-slate-900" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900">Billing & Subscription</CardTitle>
                    <CardDescription className="text-slate-500">Manage your subscription plan and billing details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="space-y-8">

                  {/* Current Plan Overview */}
                  {/* Current Plan Overview with Usage */}
                  <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="inline-flex items-center space-x-2 bg-slate-800 px-3 py-1 rounded-full mb-4">
                          <span className={`w-2 h-2 rounded-full ${subscription?.status === 'active' ? 'bg-emerald-400' : subscription?.status === 'canceled' ? 'bg-red-400' : 'bg-amber-400'}`}></span>
                          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Current Plan</span>
                        </div>
                        <h3 className="text-3xl font-black mb-2">
                          {subscription?.status === 'active' ? (subscription?.plan?.name || "Free Starter") : "Free Starter"}
                        </h3>
                        <p className="text-slate-400 max-w-md mb-6">
                          {subscription?.status === 'active' && subscription?.plan?.slug?.includes('pro')
                            ? 'Enjoying full access to all premium features.'
                            : 'Perfect for freelancers and individual contractors just getting started.'}
                        </p>

                        <div className="flex flex-col gap-2">
                          {subscription?.status === 'active' ? (
                            <div>
                              {(subscription?.paystack_subscription_code || (!subscription?.stripeSubscriptionId && Number(subscription?.plan?.price) > 0)) ? (
                                <Button
                                  onClick={handleCancelSubscription}
                                  disabled={isSaving}
                                  size="sm"
                                  className="bg-white text-red-600 hover:bg-slate-100 font-semibold px-4"
                                >
                                  Cancel Subscription
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleManageSubscription}
                                  disabled={isSaving}
                                  size="sm"
                                  className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-4"
                                >
                                  {subscription?.cancelAtPeriodEnd ? 'Reactivate Subscription' : 'Manage Subscription'}
                                </Button>
                              )}
                              <p className="text-[10px] text-slate-400 mt-2 pl-1">
                                {subscription?.auto_renew
                                  ? `Auto-renews`
                                  : 'Will not auto-renew'}
                              </p>
                            </div>
                          ) : (
                            <Button
                              onClick={() => {
                                const proPlan = plans.find(p => p.slug.includes('pro')) || plans[1];
                                if (proPlan) handleUpgrade(proPlan.slug);
                              }}
                              className="bg-emerald-500 text-white hover:bg-emerald-600 border-none font-bold"
                            >
                              Upgrade Plan
                            </Button>
                          )}
                        </div>

                        {subscription?.currentPeriodEnd && subscription?.status !== 'canceled' && (
                          <p className="text-xs text-slate-500 mt-3">
                            {subscription?.cancelAtPeriodEnd
                              ? `Cancels on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                              : `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                            }
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                        <h4 className="font-bold text-sm text-slate-200 mb-4 uppercase tracking-wider">Plan Usage</h4>

                        {/* Invoices Usage */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Monthly Invoices</span>
                            <span className="text-white font-medium">
                              {usageStats?.features.invoices.used || 0} / {usageStats?.features.invoices.limit || '∞'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`bg-emerald-500 h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${typeof usageStats?.features.invoices.limit === 'number' ? Math.min(100, ((usageStats?.features.invoices.used || 0) / usageStats.features.invoices.limit) * 100) : 100}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Clients Usage */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-400">Clients</span>
                            <span className="text-white font-medium">
                              {usageStats?.features.clients.used || 0} / {usageStats?.features.clients.limit || '∞'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`bg-blue-500 h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${typeof usageStats?.features.clients.limit === 'number' ? Math.min(100, ((usageStats?.features.clients.used || 0) / usageStats.features.clients.limit) * 100) : 100}%` }}
                            ></div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Available Plans */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Available Plans</h3>

                    {/* Billing Method Toggle */}
                    <div className="flex justify-center mb-8">
                      <div className="bg-slate-100 p-1 rounded-lg flex items-center">
                        <button
                          onClick={() => setBillingCycle('monthly')}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBillingCycle('yearly')}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                          Yearly <span className="text-xs text-emerald-600 font-bold ml-1">-17%</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {['Free', 'Starter', 'Enterprise'].map(planName => {
                        // Find the relevant plan object based on name and cycle
                        const plan = plans.find(p =>
                          p.name === planName &&
                          (p.name === 'Free' ? true : (p.billing_period === billingCycle || p.interval === billingCycle))
                        );

                        if (!plan) return null;

                        // Only consider subscription as current if it's ACTIVE
                        const isActiveSubscription = subscription?.status === 'active';
                        const isCurrent = isActiveSubscription && subscription?.planId === plan.id;
                        const isPro = plan.slug.includes('starter') || plan.slug.includes('enterprise');
                        // Highlight Starter as popular
                        const isPopular = plan.name === 'Starter';

                        // Determine interval for display
                        const interval = plan.billing_period || plan.interval;

                        return (
                          <div key={plan.id} className={`border rounded-2xl p-6 relative flex flex-col ${isPopular ? 'border-2 border-slate-900 bg-white shadow-lg scale-105 z-10' : 'border-slate-200 bg-slate-50'}`}>
                            {isPopular && <div className="absolute top-0 right-0 left-0 mx-auto w-max -mt-3 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}

                            <div className="mb-4">
                              <h4 className="font-bold text-slate-900 text-xl mb-1">{plan.name}</h4>
                              <p className="text-slate-500 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-bold text-slate-900 text-3xl">
                                {Number(plan.price) === 0 ? 'Free' : `₦${Number(plan.price).toLocaleString()}`}
                                {Number(plan.price) !== 0 && <span className="text-sm text-slate-400 font-normal ml-1">/{interval === 'monthly' ? 'mo' : 'yr'}</span>}
                              </h4>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                              {plan.features.slice(0, 6).map((feature: string, i: number) => (
                                <li key={i} className="flex items-start text-sm text-slate-700">
                                  <Check className="h-4 w-4 mr-2 text-emerald-600 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>

                            <Button
                              disabled={isCurrent || isSaving}
                              onClick={() => !isCurrent && handleUpgrade(plan.slug)}
                              className={`w-full font-bold h-11 ${isPopular ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}
                            >
                              {isSaving ? 'Processing...' : isCurrent ? 'Current Plan' : (Number(plan.price) > 0 ? (isPopular ? 'Get Started' : 'Upgrade') : 'Select')}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Payment Gateway Preferences */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Method Preference</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelectedGateway('stripe')}
                        className={`flex-1 p-4 border rounded-xl flex items-center justify-between transition-all ${selectedGateway === 'stripe' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-slate-900" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">Stripe</p>
                            <p className="text-xs text-slate-500">International cards</p>
                          </div>
                        </div>
                        {selectedGateway === 'stripe' && <Check className="w-5 h-5 text-emerald-600" />}
                      </button>

                      {/* Paystack Option Hidden
                      <button
                        onClick={() => setSelectedGateway('paystack')}
                        className={`flex-1 p-4 border rounded-xl flex items-center justify-between transition-all ${selectedGateway === 'paystack' ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 flex items-center justify-center">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Paystack_Logo.svg/2560px-Paystack_Logo.svg.png"
                              alt="Paystack"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">Paystack</p>
                            <p className="text-xs text-slate-500">Local payments (NGN)</p>
                          </div>
                        </div>
                        {selectedGateway === 'paystack' && <Check className="w-5 h-5 text-emerald-600" />}
                      </button>
                      */}
                    </div>
                  </div>

                  <Separator className="bg-slate-100" />

                  {/* Billing History */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Billing History</h3>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                          <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Invoice</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 font-medium text-slate-900">Oct 01, 2025</td>
                            <td className="px-6 py-4">₦0.00</td>
                            <td className="px-6 py-4"><span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">Paid</span></td>
                            <td className="px-6 py-4 text-right"><span className="text-slate-400">N/A</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}