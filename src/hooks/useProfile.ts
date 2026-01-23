import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/users/profile');
      setProfile(response.data.data.user);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile');
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
    updateProfile
  };
}
