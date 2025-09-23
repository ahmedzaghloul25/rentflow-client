"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Paper,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { DataTable } from "@/src/components/common/DataTable";
import {
  useContracts,
  useTerminateContract,
} from "@/src/hooks/api/useContracts";
import { Contract } from "@/src/types/contract";

import { useProperties } from "@/src/hooks/api/useProperties";
import { useClients } from "@/src/hooks/api/useClients.ts";
import { ConfirmDialog } from "@/src/components/common/ConfirmDialog";

export default function ContractsPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const { data: propertiesData } = useProperties({ page: 0, limit: 1 });
  const { data: clientsData } = useClients({ page: 0, limit: 1 });
  const terminateContractMutation = useTerminateContract();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContract, setSelectedContract] = useState<null | Contract>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const { data, isLoading, error } = useContracts({
    page,
    limit: rowsPerPage,
    is_terminated: showActiveOnly ? false : undefined,
  });

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    contract: Contract
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedContract(contract);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTerminateClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowActiveOnly(event.target.checked);
    setPage(0);
  };

  const handleConfirmTerminate = () => {
    if (selectedContract) {
      terminateContractMutation.mutate(selectedContract._id);
    }
    setDialogOpen(false);
  };
  const canCreateContract =
    (propertiesData?.pagination?.totalRecords ?? 0) > 0 &&
    (clientsData?.pagination?.totalRecords ?? 0) > 0;

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const contracts = data?.contracts || [];
  const totalRecords = data?.pagination?.totalRecords || 0;

  const columns: {
    id: keyof Contract | "actions";
    label: string;
    render?: (p: Contract) => React.ReactNode;
  }[] = [
    {
      id: "property_id",
      label: "Property",
      render: (c: Contract) => `${c.property_id.number} (${c.property_id.building})`,
    },
    {
      id: "client_id",
      label: "Client",
      render: (c: Contract) => c.client_id.fullName,
    },
    {
      id: "start_date",
      label: "Start Date",
      render: (c: Contract) => format(new Date(c.start_date), "dd MMM yyyy"),
    },
    {
      id: "end_date",
      label: "End Date",
      render: (c: Contract) => format(new Date(c.end_date), "dd MMM yyyy"),
    },
    {
      id: "is_terminated",
      label: "Status",
      render: (c: Contract) => (
        <Chip
          label={c.is_terminated ? "Terminated" : "Active"}
          color={c.is_terminated ? "error" : "success"}
          size="small"
        />
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: (contract: Contract) => (
        <>
          <IconButton
            component={NextLink}
            href={`/dashboard/contracts/${contract._id}`}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={(e) => handleMenuClick(e, contract)}
            disabled={contract.is_terminated}
          >
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          CONTRACTS
        </Typography>
        <Tooltip
          title={
            !canCreateContract
              ? "You must add at least one property and one client before creating a contract."
              : ""
          }
        >
          <span>
            <Button
              component={NextLink}
              href="/dashboard/contracts/create"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={!canCreateContract}
              sx={{boxShadow:3, borderRadius:3}}
            >
              Create Contract
            </Button>
          </span>
        </Tooltip>
      </Box>
      <Paper
        sx={{ mb: 2, p: 1.5, display: "flex", justifyContent: "flex-end" ,boxShadow:3, borderRadius:3 }}
      >
        <FormControlLabel
          control={
            <Switch checked={showActiveOnly} onChange={handleFilterChange} />
          }
          label="Show active contracts only"
        />
      </Paper>
      <DataTable
        data={contracts}
        columns={columns}
        isLoading={isLoading}
        error={error}
        totalRecords={totalRecords}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleTerminateClick} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          Terminate
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmTerminate}
        title="Terminate Contract?"
        description={`Are you sure you want to terminate this contract? This will cancel all future unpaid payments.`}
      />
    </Box>
  );
}
