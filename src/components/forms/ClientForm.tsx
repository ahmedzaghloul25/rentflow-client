'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { NewClientData } from '@/src/types/client';
import { Box, TextField, Button, Grid, CircularProgress } from '@mui/material';
import { useAddClient } from '@/src/hooks/api/useClients.ts';

const clientSchema = z.object({
  firstName: z.string().min(3, 'First name is too short').max(50, 'First name is too long'),
  middleName: z.string().min(3, 'Middle name is too short').max(50, 'Middle name is too long'),
  lastName: z.string().min(3, 'Last name is too short').max(50, 'Last name is too long'),
  ID_no: z.string().length(14, 'National ID must be 14 digits'),
  phone: z.string().length(11, 'Phone number must be 11 digits'),
});

export function ClientForm() {
  const router = useRouter();
  const addClientMutation = useAddClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewClientData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      firstName: '', middleName: '', lastName: '', ID_no: '', phone: '',
    },
  });

  const onSubmit = (data: NewClientData) => {
    addClientMutation.mutate(data, {
      onSuccess: () => router.push('/dashboard/clients'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:4}}>
          <Controller name="firstName" control={control} render={({ field }) => (
            <TextField {...field} label="First Name" fullWidth required error={!!errors.firstName} helperText={errors.firstName?.message} />
          )}/>
        </Grid>
        <Grid size={{xs:12, md:4}}>
          <Controller name="middleName" control={control} render={({ field }) => (
            <TextField {...field} label="Middle Name" fullWidth required error={!!errors.middleName} helperText={errors.middleName?.message} />
          )}/>
        </Grid>
        <Grid size={{xs:12, md:4}}>
          <Controller name="lastName" control={control} render={({ field }) => (
            <TextField {...field} label="Last Name" fullWidth required error={!!errors.lastName} helperText={errors.lastName?.message} />
          )}/>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Controller name="ID_no" control={control} render={({ field }) => (
            <TextField {...field} label="National ID" fullWidth required error={!!errors.ID_no} helperText={errors.ID_no?.message} />
          )}/>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Controller name="phone" control={control} render={({ field }) => (
            <TextField {...field} label="Phone Number" fullWidth required error={!!errors.phone} helperText={errors.phone?.message} />
          )}/>
        </Grid>
        <Grid size={{xs:12}}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disabled={addClientMutation.isPending}>
              {addClientMutation.isPending ? <CircularProgress size={24} /> : 'Add Client'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}