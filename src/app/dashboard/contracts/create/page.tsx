"use client";

import { ContractForm } from "@/src/components/forms/ContractForm";
import { Box, Paper, Typography } from "@mui/material";

export default function CreateContractPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create New Contract
      </Typography>
      <Paper sx={{ p: 3 }}>
        <ContractForm />
      </Paper>
    </Box>
  );
}
