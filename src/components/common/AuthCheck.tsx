"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getProfile } from "@/src/services/api/auth";
import setCsrfToken from "@/src/lib/api";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const profileData = await getProfile();
        if (profileData.csrfToken) {
          setCsrfToken(profileData.csrfToken);
        }
        return profileData.user;
      } catch (error) {
        // If getProfile fails, react-query will throw an error
        throw new Error("Not authenticated");
      }
    },
    retry: false, // Don't retry on failure, just redirect
    refetchOnWindowFocus: false, // Optional: prevents refetching just from clicking away and back
  });

  useEffect(() => {
    // If the query fails (isError is true), it means the user is not authenticated.
    if (isError) {
      router.push("/auth/google");
    }
  }, [isError, router]);

  // While the authentication status is being checked, show a loading spinner.
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If the user is successfully fetched, render the actual dashboard content.
  if (user) {
    return <>{children}</>;
  }

  // Render nothing while redirecting
  return null;
}
