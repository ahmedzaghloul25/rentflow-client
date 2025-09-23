import Box from "@mui/material/Box";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { Header } from "@/src/components/layout/Header";
import { AuthCheck } from "@/src/components/common/AuthCheck";

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
        <Header />
        {children}
      </Box>
    </Box>
    </AuthCheck>

  );
}
