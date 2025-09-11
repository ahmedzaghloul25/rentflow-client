'use client';

import { PropertyForm } from '@/src/components/forms/PropertyForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

export default function CreatePropertyPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add New Property
      </Typography>
      <Paper sx={{ p: 3 , boxShadow:3, borderRadius:3}}>
        <PropertyForm />
      </Paper>
    </Box>
  );
}