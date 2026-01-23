"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Star,
  Send,
  Loader2,
  Heart,
  Lightbulb,
  Bug,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'header' | 'floating' | 'first_invoice' | 'manual';
  title?: string;
  description?: string;
}

interface FeedbackData {
  type: string;
  rating: number;
  subject: string;
  message: string;
  email: string;
  trigger: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  trigger = 'manual',
  title,
  description
}: FeedbackModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackData>({
    type: '',
    rating: 0,
    subject: '',
    message: '',
    email: '',
    trigger: trigger
  });

  const feedbackTypes = [
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'text-amber-500' },
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'text-red-500' },
    { value: 'improvement', label: 'Improvement', icon: Zap, color: 'text-emerald-500' },
    { value: 'general', label: 'General Feedback', icon: MessageSquare, color: 'text-slate-500' },
    { value: 'compliment', label: 'Compliment', icon: Heart, color: 'text-pink-500' }
  ];

  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.type || !formData.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/feedback', formData);
      toast.success('Thank you for your feedback! We appreciate your input.');

      // Reset form
      setFormData({
        type: '',
        rating: 0,
        subject: '',
        message: '',
        email: '',
        trigger: trigger
      });

      onClose();
    } catch (error: any) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getModalTitle = () => {
    if (title) return title;

    switch (trigger) {
      case 'first_invoice':
        return '🎉 First Invoice Created!';
      case 'header':
        return 'Share Feedback';
      case 'floating':
        return 'Quick Feedback';
      default:
        return 'We Value Your Feedback';
    }
  };

  const getModalDescription = () => {
    if (description) return description;

    switch (trigger) {
      case 'first_invoice':
        return 'How was the experience? Your feedback helps us improve.';
      case 'header':
        return 'Help us improve by sharing your thoughts or reporting issues.';
      case 'floating':
        return 'Got a quick thought? We\'d love to hear from you!';
      default:
        return 'Your feedback is valuable to us. Please share your thoughts.';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto rounded-3xl border-slate-200 p-0 bg-white">
        <DialogHeader className="p-8 pb-4 border-b border-slate-100 bg-slate-50/50">
          <DialogTitle className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight">
            <div className="p-2 bg-slate-900 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            {getModalTitle()}
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium text-base ml-1">
            {getModalDescription()}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Reaction / Rating */}
          <div className="flex flex-col items-center justify-center space-y-3 py-2">
            <Label className="text-sm font-bold text-slate-900">
              How would you rate your experience?
            </Label>
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className={`p-2 rounded-xl transition-all duration-200 transform hover:scale-110 ${star <= formData.rating
                    ? 'text-yellow-400'
                    : 'text-slate-200 hover:text-slate-300'
                    }`}
                >
                  <Star
                    className="h-8 w-8"
                    fill={star <= formData.rating ? 'currentColor' : 'none'}
                    strokeWidth={star <= formData.rating ? 0 : 2}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feedback Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-bold text-slate-900">
                Feedback Type *
              </Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11 font-medium text-slate-700">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-lg">
                  {feedbackTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value} className="focus:bg-slate-50 cursor-pointer py-3">
                        <div className="flex items-center gap-2 font-medium">
                          <Icon className={`h-4 w-4 ${type.color}`} />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-bold text-slate-900">
                Subject
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Brief summary"
                className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-bold text-slate-900">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please describe your thoughts in detail..."
              rows={4}
              className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 resize-none min-h-[100px]"
            />
          </div>

          {/* Email (optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-bold text-slate-900">
              Email (optional)
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="e.g., you@example.com"
              className="rounded-xl bg-slate-50 border-slate-200 focus:ring-0 focus:border-slate-900 h-11"
            />
            <p className="text-xs text-slate-400 font-medium">
              We'll only reach out if we have questions about your feedback.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border-slate-200 font-bold hover:bg-slate-50 h-12 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.type || !formData.message.trim() || formData.rating === 0}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 px-8 shadow-none transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
