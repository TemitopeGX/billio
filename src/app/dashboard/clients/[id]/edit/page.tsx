"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X, Save, Loader2, User, Mail, Phone, MapPin, Building2, ArrowLeft, CheckCircle } from "lucide-react";
import api from "@/lib/api";
import { useClientActions } from "@/hooks/useClientActions";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

const defaultFormData: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
};

export default function EditClientPage() {
  const router = useRouter();
  const { id } = useParams();
  const { updateClient, isLoading: isSubmitting } = useClientActions();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ClientFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<ClientFormData>>({});

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);

        const clientData = response.data.data?.client || response.data;

        if (!clientData) {
          throw new Error('No client data found in response');
        }

        setFormData({
          name: String(clientData.name || ""),
          email: String(clientData.email || ""),
          phone: String(clientData.phone || ""),
          address: String(clientData.address || ""),
          company: String(clientData.company || ""),
        });
      } catch (error) {
        console.error('Error fetching client:', error);
        toast.error("Failed to load client details");
        router.push("/dashboard/clients");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchClient();
    } else {
      setIsLoading(false);
      router.push("/dashboard/clients");
    }
  }, [id, router]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ClientFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ClientFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value || ""
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    updateClient({
      id: id as string,
      data: {
        ...formData,
        name: String(formData.name || ""),
        email: String(formData.email || ""),
        phone: String(formData.phone || ""),
        address: String(formData.address || ""),
        company: String(formData.company || ""),
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-8 max-w-[100rem] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="p-2 border-slate-200 hover:bg-slate-50 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Edit Client</h1>
            <p className="text-slate-500 text-lg">Update client information and contact details</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6 py-3 font-bold"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 py-3 font-bold shadow-none"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <User className="h-5 w-5 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Contact Information</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-bold text-slate-900">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., John Smith"
                      className={`pl-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 transition-all duration-200 h-12 ${errors.name ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center font-medium">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-slate-900">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="e.g., john@example.com"
                      className={`pl-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 transition-all duration-200 h-12 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center font-medium">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-slate-900">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="e.g., +234 123 456 7890"
                      className={`pl-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 transition-all duration-200 h-12 ${errors.phone ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center font-medium">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-bold text-slate-900">Company Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="e.g., ABC Company Ltd"
                      className="pl-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 transition-all duration-200 h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Address Information</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-bold text-slate-900">Business Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter complete business address including city, state, and postal code"
                      className={`pl-10 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-0 focus:border-slate-900 transition-all duration-200 resize-none ${errors.address ? "border-red-500" : ""}`}
                      rows={6}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-red-600 flex items-center font-medium">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Additional Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-white border border-slate-200 rounded-lg">
                      <Building2 className="h-4 w-4 text-slate-900" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Client Management</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Changes will be reflected across all invoices and communications with this client.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}