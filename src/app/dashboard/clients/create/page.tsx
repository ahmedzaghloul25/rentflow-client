'use client';

import { ClientForm } from '@/src/components/forms/ClientForm';
import { Box, Paper, Typography } from '@mui/material';

export default function CreateClientPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add New Client
      </Typography>
      <Paper sx={{ p: 3 ,boxShadow:3, borderRadius:3}}>
        <ClientForm />
      </Paper>
    </Box>
  );
}