"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { LinkButton } from "@/src/components/common/LinkButton";

import { DataTable } from "@/src/components/common/DataTable";
import { ConfirmDialog } from "@/src/components/common/ConfirmDialog";
import { Client } from "@/src/types/client";
import { useClients, useDeleteClient } from "@/src/hooks/api/useClients.ts";

export default function ClientsPage() {
  const deleteClientMutation = useDeleteClient();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClient, setSelectedClient] = useState<null | Client>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useClients({ page, limit: rowsPerPage });

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clients = data?.clients || [];
  const totalRecords = data?.pagination?.totalRecords || 0;

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    client: Client
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedClient(client);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedClient) {
      deleteClientMutation.mutate(selectedClient._id);
    }
    setDialogOpen(false);
  };

  const columns: {
    id: keyof Client | "actions";
    label: string;
    render?: (p: Client) => React.ReactNode;
  }[] = [
    { id: "fullName", label: "Full Name" },
    { id: "phone", label: "Phone Number" },
    { id: "ID_no", label: "National ID" },
    {
      id: "actions",
      label: "Actions",
      render: (client: Client) => (
        <IconButton onClick={(e) => handleMenuClick(e, client)}>
          <MoreVertIcon />
        </IconButton>
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
          CLIENTS
        </Typography>
        {/* <Button
          component={NextLink}
          href="/dashboard/clients/create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{boxShadow:3, borderRadius:3}}
        >
          Add Client
        </Button>
        */}
        <LinkButton
          href="/dashboard/clients/create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ boxShadow: 3, borderRadius: 3 }}
        />
      </Box>

      <DataTable
        data={clients}
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
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Client?"
        description={`Are you sure you want to delete ${selectedClient?.fullName}? This action cannot be undone.`}
      />
    </Box>
  );
}
