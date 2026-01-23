"use client";

import { useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';

interface SessionTimeoutConfig {
  warningTime: number; // Time in minutes before showing warning
  logoutTime: number; // Time in minutes before auto logout
  checkInterval: number; // Check interval in seconds
}

const DEFAULT_CONFIG: SessionTimeoutConfig = {
  warningTime: 5, // Show warning 5 minutes before logout
  logoutTime: 30, // Auto logout after 30 minutes of inactivity
  checkInterval: 30 // Check every 30 seconds
};

export const useSessionTimeout = (config: Partial<SessionTimeoutConfig> = {}) => {
  const { logout } = useAuth();

  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Track user activity
  const updateActivity = useCallback(() => {
    localStorage.setItem('lastActivity', Date.now().toString());
  }, []);

  // Check session timeout
  const checkSessionTimeout = useCallback(() => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) {
      updateActivity();
      return;
    }

    const now = Date.now();
    const timeSinceActivity = (now - parseInt(lastActivity)) / (1000 * 60); // minutes

    if (timeSinceActivity >= finalConfig.logoutTime) {
      // Silent logout - no warning
      logout();
    }
  }, [finalConfig, logout, updateActivity]);

  // Set up activity listeners
  useEffect(() => {
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    const handleActivity = () => {
      updateActivity();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Set up interval check
    const interval = setInterval(checkSessionTimeout, finalConfig.checkInterval * 1000);

    // Initial check
    checkSessionTimeout();

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(interval);
    };
  }, [checkSessionTimeout, updateActivity, finalConfig.checkInterval]);

  // Extend session function
  const extendSession = useCallback(() => {
    updateActivity();
  }, [updateActivity]);

  return {
    extendSession
  };
};
