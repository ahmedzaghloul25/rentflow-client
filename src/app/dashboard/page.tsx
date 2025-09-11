"use client";

import {
  usePropertySummary,
  useFinancialSummary,
} from "@/src/hooks/api/useDashboard";
import { DataTable } from "@/src/components/common/DataTable";
import { DashboardRow } from "@/src/types/dashboard";

import { Box, Typography, CircularProgress, Paper, Grid } from "@mui/material";
import { format, isPast } from "date-fns";
import { useMemo, useState } from "react";

export default function DashboardPage() {
  const { data: summaryData, isLoading: isLoadingSummary } =
    usePropertySummary();
  const { data: financialData, isLoading: isLoadingFinancials } =
    useFinancialSummary();

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // This powerful useMemo hook processes and merges data from both APIs into a single, clean structure for our table.
  const { mergedData, grandTotals } = useMemo(() => {
    if (!summaryData || !financialData) {
      return {
        mergedData: [],
        grandTotals: { totalRevenue: 0, totalPaid: 0, totalDue: 0 },
      };
    }

    const financialMap = new Map(financialData.map((item) => [item._id, item]));
    const duePaymentsMap = new Map(
      summaryData.duePayments.map((p) => [p._id, p.duePayment])
    );

    let totalRevenue = 0;
    let totalPaid = 0;
    let totalDue = 0;

    const data: DashboardRow[] = summaryData.contracts.map((contract) => {
      const financials = financialMap.get(contract._id);
      const nextDuePayment = duePaymentsMap.get(contract._id) || null;

      const rowRevenue = financials?.totalRevenue || 0;
      const rowPaid = financials?.totalReceived || 0;
      const rowDue = financials?.totalDue || 0;

      totalRevenue += rowRevenue;
      totalPaid += rowPaid;
      totalDue += rowDue;

      return {
        _id: contract._id,
        propertyNumber: contract.property_id.number,
        clientName: contract.client_id.fullName,
        startDate: contract.start_date,
        endDate: contract.end_date,
        nextDueDate: nextDuePayment?.due_date || null,
        nextDueAmount: nextDuePayment?.due_amount || null,
        totalRevenue: rowRevenue,
        totalPaid: rowPaid,
        totalDue: rowDue,
      };
    });

    return {
      mergedData: data,
      grandTotals: { totalRevenue, totalPaid, totalDue },
    };
  }, [summaryData, financialData]);

  // Event handlers for pagination
  const handlePageChange = (event: unknown, newPage: number) =>
    setPage(newPage);
  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = mergedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Strictly typed column definition for our unified table
  const columns = [
    { id: "propertyNumber" as const, label: "Property" },
    { id: "clientName" as const, label: "Client" },
    {
      id: "endDate" as const,
      label: "Contract End",
      render: (row: DashboardRow) =>
        format(new Date(row.endDate), "dd MMM yyyy"),
    },
    {
      id: "nextDueDate" as const,
      label: "Next Due Date",
      render: (row: DashboardRow) => {
        if (!row.nextDueDate) return "N/A";
        const isOverdue = isPast(new Date(row.nextDueDate));
        return (
          <Typography
            color={isOverdue ? "error.main" : "text.primary"}
            sx={{ fontWeight: isOverdue ? "bold" : "normal" }}
          >
            {format(new Date(row.nextDueDate), "dd MMM yyyy")}
          </Typography>
        );
      },
    },
    {
      id: "nextDueAmount" as const,
      label: "Next Due Amount",
      render: (row: DashboardRow) =>
        row.nextDueAmount ? `EGP ${row.nextDueAmount.toLocaleString()}` : "N/A",
    },
    {
      id: "totalRevenue" as const,
      label: "Total Value",
      render: (row: DashboardRow) => `EGP ${row.totalRevenue.toLocaleString()}`,
    },
    {
      id: "totalPaid" as const,
      label: "Total Paid",
      render: (row: DashboardRow) => `EGP ${row.totalPaid.toLocaleString()}`,
    },
    {
      id: "totalDue" as const,
      label: "Total Due",
      render: (row: DashboardRow) => `EGP ${row.totalDue.toLocaleString()}`,
    },
  ];

  const isLoading = isLoadingSummary || isLoadingFinancials;

  if (isLoading) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          DASHBOARD
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          {" "}
          <CircularProgress />{" "}
        </Box>
      </>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        DASHBOARD
      </Typography>

      <DataTable
        data={paginatedData}
        columns={columns}
        isLoading={isLoading}
        error={null}
        totalRecords={mergedData.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Paper sx={{ mt: 2, p: 2, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Financial Summary
        </Typography>
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body1">Total Contract Value:</Typography>
            <Typography variant="h6">
              EGP {grandTotals.totalRevenue.toLocaleString()}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body1" color="success.main">
              Total Paid:
            </Typography>
            <Typography variant="h6" color="success.main">
              EGP {grandTotals.totalPaid.toLocaleString()}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="body1" color="error.main">
              Total Due:
            </Typography>
            <Typography variant="h6" color="error.main">
              EGP {grandTotals.totalDue.toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
