// src/app/dashboard/layout.tsx
import Box from "@mui/material/Box";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { Header } from "@/src/components/layout/Header";
import { AuthCheck } from "@/src/components/common/AuthCheck";
// We will create the Header component next

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            minHeight: "100vh",
          }}
        >
          {/* The Header will go here */}
          <Header />
          {children}
        </Box>
      </Box>
    </AuthCheck>
  );
}
