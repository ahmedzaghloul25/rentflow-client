"use client";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Alert, TablePagination } from "@mui/material";

// Defines the shape of a column configuration object
interface Column<T> {
  id: keyof T | "actions";
  label: string;
  render?: (item: T) => React.ReactNode;
}

// Defines the props the DataTable will accept
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  error: Error | null;
  // Pagination props
  totalRecords: number;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DataTable<T extends { _id: string }>({
  data,
  columns,
  isLoading,
  error,
  // Destructure new props
  totalRecords,
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: DataTableProps<T>) {
  // 1. Handle the loading state
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 2. Handle the error state
  if (error) {
    return <Alert severity="error">Failed to load data: {error.message}</Alert>;
  }

  // 3. Handle the empty state (no data found)
  if (data.length === 0) {
    return (
      <Paper sx={{boxShadow:3, borderRadius:3}}>
        <Typography sx={{ textAlign: "center", p: 4 }}>
          No items found.
        </Typography>
      </Paper>
    );
  }

  // 4. Render the table with the data
  return (
    <Paper sx={{borderRadius: 3, boxShadow:3}}>
      <TableContainer component={'div'}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{fontWeight:'bold'}} key={String(column.id)}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow hover key={item._id}>
                {columns.map((column) => (
                  <TableCell key={String(column.id)}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.id as keyof T] || "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRecords}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}
