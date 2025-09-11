// src/lib/theme.ts
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // A calm, professional blue
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f7f9fc', // Light gray background
      paper: '#ffffff',   // White for cards, modals, etc.
    },
    text: {
      primary: '#212121',   // Dark gray for primary text
      secondary: '#757575', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    // ... other typography settings
  },
  components: {
    // Set default props for components
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flatter buttons for a modern look
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none', // More readable button text
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0, // No shadow by default
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #e0e0e0', // Subtle border instead of shadow
        },
      },
    },
  },
});

export default theme;