'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/src/services/api/auth'; // We need a simple getProfile service
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { removeToken } from '@/src/lib/token';
import api from '@/src/lib/api';

// Simple service function for getProfile
const fetchProfile = async () => {
    const { data } = await api.get('/auth/profile');
    return data.user;
}

export const useLogout = () => {
    const router = useRouter();
    return () => {
        removeToken(); // Clear the token from storage
        // Optionally: call a backend /logout endpoint to update isLoggedIn flag
        // api.post('/auth/logout');
        router.push('/'); // Redirect to login
    };
}


export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      router.push('/');
    }
  }, [isError, router]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
}
