"use client";

import NextLink from "next/link";
import { Box, Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import logo from "@/public/logo.png";
import Image from "next/image";
export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[200]} 100%)`,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: "20px",
          maxWidth: "30%",
          width: "90%",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Image src={logo} alt="rentFlow logo" />
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={NextLink}
            href="/auth/login"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "background.default",
              color: "black",
            }}
          >
            Login
          </Button>
          <Button
            component={NextLink}
            href="/auth/register"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "background.paper",
              color: "black",
            }}
            // Since registration is not supported, we can disable it for now
            // disabled
          >
            Register
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
