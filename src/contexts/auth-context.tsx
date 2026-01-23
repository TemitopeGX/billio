"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User, rememberMe?: boolean) => void;
  logout: () => void;
  isRememberMe: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsRememberMe(rememberMe);
        
        // Set initial activity timestamp
        if (!localStorage.getItem('lastActivity')) {
          localStorage.setItem('lastActivity', Date.now().toString());
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Handle redirect after logout
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/auth/login');
      setShouldRedirect(false);
    }
  }, [shouldRedirect, router]);

  const login = (token: string, user: User, rememberMe: boolean = false) => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token');
      }
      if (!user || !user.id || !user.email) {
        throw new Error('Invalid user data');
      }
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('rememberMe', rememberMe.toString());
      localStorage.setItem('lastActivity', Date.now().toString());
      
      setUser(user);
      setIsRememberMe(rememberMe);
    } catch (error) {
      console.error('Login error:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('lastActivity');
      setUser(null);
      setIsRememberMe(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('lastActivity');
    setUser(null);
    setIsRememberMe(false);
    setShouldRedirect(true);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    isRememberMe,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
