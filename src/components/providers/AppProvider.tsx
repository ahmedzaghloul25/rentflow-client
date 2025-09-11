'use client';

import { ThemeProvider } from './ThemeProvider';
import { QueryProvider } from './QueryProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Toaster } from 'react-hot-toast'; // Import the Toaster

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryProvider>
        <ThemeProvider>
          {children}
          <Toaster position="top-center" toastOptions={{duration:5000}} reverseOrder={false} /> {/* Add the Toaster here */}
        </ThemeProvider>
      </QueryProvider>
    </LocalizationProvider>
  );
}