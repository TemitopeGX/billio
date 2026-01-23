"use client";

import { ReactNode } from "react";
import FloatingFeedbackButton from "./FloatingFeedbackButton";

interface DashboardWrapperProps {
  children: ReactNode;
  showFloatingFeedback?: boolean;
}

export default function DashboardWrapper({ 
  children, 
  showFloatingFeedback = true 
}: DashboardWrapperProps) {
  return (
    <>
      {children}
      {showFloatingFeedback && <FloatingFeedbackButton />}
    </>
  );
}
