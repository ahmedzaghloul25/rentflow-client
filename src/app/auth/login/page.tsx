"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import api from '@/src/lib/api';
import { setToken } from '@/src/lib/token';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import logo from '@/public/logo.png'; // Assuming you have a logo in your public folder
import { useState } from 'react';
import { AxiosError } from 'axios';


// 1. Define the Zod schema for login validation
const loginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

// Infer the TypeScript type from the schema for type safety
type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  
  // 2. Set up react-hook-form with the Zod resolver
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [serverError, setServerError] = useState('');

  // 3. The onSubmit function now receives validated data
  const onSubmit = async (data: LoginFormInputs) => {
    setServerError('');
    try {
      const response = await api.post('/auth/login', data);
      
      const { token } = response.data;
      console.log(response);
      
      if (!token) {
        throw new Error('Login response did not include a token.');
      }
      
      setToken(token);
      router.push('/dashboard');
    } catch (err: unknown) {
      // --- THIS IS THE FIX ---
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      // 1. Check if the error is an AxiosError
      if (err instanceof AxiosError) {
        // 2. If it is, we can now safely access the response property
        errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      }
      
      setServerError(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 3, sm: 4 },
        }}
      >
        <Image src={logo} alt="RentFlow logo" width={150} height={80} priority />
        {/* 4. Use the handleSubmit from react-hook-form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          {/* 5. Refactor fields to use the Controller component */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          {serverError && (
            <Alert severity="error" sx={{ width: '100%', mt: 2, mb: 1 }}>
              {serverError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
