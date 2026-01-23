"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import FeedbackModal from "./FeedbackModal";

interface FloatingFeedbackButtonProps {
  className?: string;
}

export default function FloatingFeedbackButton({ className = "" }: FloatingFeedbackButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
        <Button
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="h-14 w-14 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 group p-0 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>

        {/* Tooltip */}
        <div className={`absolute bottom-full mb-3 right-0 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap transition-all duration-200 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}>
          Share Feedback
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trigger="floating"
      />
    </>
  );
}
