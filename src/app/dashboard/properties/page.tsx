"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import NextLink from "next/link";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataTable } from "@/src/components/common/DataTable";
import { ConfirmDialog } from "@/src/components/common/ConfirmDialog";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useProperties,
  useDeleteProperty,
} from "@/src/hooks/api/useProperties";
import { Property } from "@/src/types/property";

export default function PropertiesPage() {
  const deletePropertyMutation = useDeleteProperty();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<null | Property>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useProperties({
    page,
    limit: rowsPerPage,
  });

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const properties = data?.properties || [];
  const totalRecords = data?.pagination?.totalRecords || 0;

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    property: Property
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedProperty(property);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (selectedProperty) {
      deletePropertyMutation.mutate(selectedProperty._id);
    }
    setDialogOpen(false);
  };

  const columns: {
    id: keyof Property | "actions";
    label: string;
    render?: (p: Property) => React.ReactNode;
  }[] = [
    { id: "number", label: "Number" },
    { id: "type", label: "Type" },
    {
      id: "city",
      label: "City",
      render: (property: Property) => `${property.city}, ${property.district}`,
    },
    {
      id: "building",
      label: "Building",
    },
    {
      id: "notes",
      label: "Notes"
    },
    {
      id: "actions",
      label: "Actions",
      render: (property: Property) => (
        <IconButton onClick={(e) => handleMenuClick(e, property)}>
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
          PROPERTIES
        </Typography>
        <Button
          component={NextLink}
          href="/dashboard/properties/create"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{boxShadow:3, borderRadius:3}}
        >
          Add Property
        </Button>
      </Box>

      <DataTable
        data={properties}
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
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
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
        title="Delete Property?"
        description={`Are you sure you want to delete this property (${selectedProperty?.number})? This action cannot be undone.`}
      />
    </Box>
  );
}
