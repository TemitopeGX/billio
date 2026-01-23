"use client";

import { useState, useEffect } from "react";
import { useDashboardStats } from "./useDashboard";

export const useFirstInvoiceFeedback = () => {
  const [showFirstInvoiceFeedback, setShowFirstInvoiceFeedback] = useState(false);
  const [hasShownFeedback, setHasShownFeedback] = useState(false);

  // Get user's invoice statistics
  const { data: stats } = useDashboardStats();

  // Check if user has shown feedback before
  useEffect(() => {
    const feedbackShown = localStorage.getItem('first_invoice_feedback_shown');
    setHasShownFeedback(feedbackShown === 'true');
  }, []);

  // Check if we should show first invoice feedback
  const checkAndTriggerFirstInvoiceFeedback = () => {
    if (stats && stats.invoicesSent === 1 && !hasShownFeedback) {
      // This is their first invoice and they haven't seen feedback modal yet
      setTimeout(() => {
        setShowFirstInvoiceFeedback(true);
      }, 2000); // Show after 2 seconds delay
    }
  };

  const closeFirstInvoiceFeedback = () => {
    setShowFirstInvoiceFeedback(false);
    setHasShownFeedback(true);
    localStorage.setItem('first_invoice_feedback_shown', 'true');
  };

  return {
    showFirstInvoiceFeedback,
    closeFirstInvoiceFeedback,
    checkAndTriggerFirstInvoiceFeedback,
    isFirstInvoice: stats?.invoicesSent === 1,
  };
};
