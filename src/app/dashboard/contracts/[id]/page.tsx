"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useContractPayments } from "@/src/hooks/api/usePayments";
import { useContract } from "@/src/hooks/api/useContracts"; // We need to create this hook
import { Payment } from "@/src/types/payment";
import { DataTable } from "@/src/components/common/DataTable";

import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import { MarkAsPaidDialog } from "@/src/components/dialogs/MarkAsPaidDialog";

export default function ContractDetailPage() {
  const params = useParams();
  const contractId = params.id as string;

  // State for payments table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ is_paid?: boolean }>({
    is_paid: false,
  });

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const { data: contractData, isLoading: isLoadingContract } =
    useContract(contractId);
  const { data: paymentsData, isLoading: isLoadingPayments } =
    useContractPayments({
      contractId,
      page,
      limit: rowsPerPage,
      filters,
    });

  const handleOpenDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const payments = paymentsData?.payments || [];
  const totalRecords = paymentsData?.pagination?.totalRecords || 0;
  console.log(contractData);

  const paymentColumns: {
    id: keyof Payment | "actions";
    label: string;
    render: (p: Payment) => React.ReactNode;
  }[] = [
    {
      id: "due_date",
      label: "Due Date",
      render: (p: Payment) => format(new Date(p.due_date), "dd MMM yyyy"),
    },
    {
      id: "due_amount",
      label: "Amount Due",
      render: (p: Payment) => `${p.due_amount.toLocaleString()}`,
    },
    {
      id: "is_paid",
      label: "Status",
      render: (p: Payment) => {
        const isOverdue = !p.is_paid && new Date(p.due_date) < new Date();
        if (p.is_paid)
          return <Chip label="Paid" color="success" size="small" />;
        if (isOverdue)
          return <Chip label="Overdue" color="error" size="small" />;
        return <Chip label="Due" color="warning" size="small" />;
      },
    },
    {
      id: "payment_date",
      label: "Payment Date",
      render: (p: Payment) =>
        p.payment_date
          ? format(new Date(p.payment_date), "dd MMM yyyy")
          : "Not Paid",
    },
    {
      id: "payment_method",
      label: "Payment Method",
      render: (p: Payment) => (p.is_paid ? p.payment_method : null),
    },
    {
      id: "actions",
      label: "Actions",
      render: (p: Payment) =>
        !p.is_paid && !p.is_cancelled ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenDialog(p)}
          >
            Mark as Paid
          </Button>
        ) : null,
    },
  ];

  if (isLoadingContract) return <CircularProgress />;
  if (!contractData) return <Alert severity="error">Contract not found.</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        CONTRACT DETAILS
      </Typography>
      {/* Add a component to display contract summary here */}

      <Paper sx={{ boxShadow: 3, borderRadius: 3, paddingX:2, paddingY:3 }}>
        <Box
          sx={{
            px: 1,
            py:2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Stack sx={{justifyContent:"center"}}>
            <Typography variant="h5">
              Payments for {contractData.property_id.number}{" "}
            </Typography>
            <Typography variant="h6">
              {`${contractData.property_id.building}`}
            </Typography>
          </Stack>

          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={
                filters.is_paid === undefined ? "all" : String(filters.is_paid)
              }
              label="Status"
              onChange={(e) => {
                const value = e.target.value;
                setFilters(
                  value === "all" ? {} : { is_paid: value === "true" }
                );
                setPage(0);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="false">Due</MenuItem>
              <MenuItem value="true">Paid</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DataTable
          data={payments}
          columns={paymentColumns}
          isLoading={isLoadingPayments}
          error={null} // Handle error state
          totalRecords={totalRecords}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
        />
      </Paper>

      {selectedPayment && (
        <MarkAsPaidDialog
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedPayment(null);
          }}
          payment={selectedPayment}
        />
      )}
    </Box>
  );
}
