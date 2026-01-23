"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /* Forced Light Mode for now as requested */
  const [theme, setTheme] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Always enforce light mode on mount
    applyTheme('light');
    // Clear any existing partial settings
    localStorage.removeItem('theme');
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    // Always remove dark class to force light mode
    root.classList.remove('dark');
    setResolvedTheme('light');
  };

  const handleSetTheme = (newTheme: Theme) => {
    // Determine user preference but ALWAYS render light
    setTheme('light');
    localStorage.removeItem('theme'); // Don't save choice since we only support light
    applyTheme('light');
  };

  // Listen for system theme changes - DISABLED
  useEffect(() => {
    // No-op
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
