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
  CircularProgress,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { useState } from 'react';
import { AxiosError } from 'axios';


const loginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  
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
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (err instanceof AxiosError) {
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
        <Image src={logo} alt="RentFlow logo" width={250} height={80} priority />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
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
