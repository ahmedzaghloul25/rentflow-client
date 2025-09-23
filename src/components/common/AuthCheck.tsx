'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/src/services/api/auth';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { removeToken } from '@/src/lib/token';


// export const useLogout = () => {
//     const router = useRouter();
//     return () => {
//         removeToken();
//         router.push('/');
//     };
// }


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
    return null;
  }

  return <>{children}</>;
}
