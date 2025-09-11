"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google"; // Using MUI icon for now
import logo from "@/public/logo.png";
import Image from "next/image";

export default function RegisterPage() {
  const handleGoogleSignup = () => {
    // Redirect to the backend's Google auth endpoint
    const googleRegisterUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
    window.location.href = googleRegisterUrl;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400, textAlign: "center", p: 2 }}>
        <CardContent>
          <Image src={logo} alt="RentFlow logo" />
          <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
            Welcome
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Sign up to manage your properties.
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignup}
            sx={{
              backgroundColor: "#fff",
              color: "#424242",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            Sign up
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
