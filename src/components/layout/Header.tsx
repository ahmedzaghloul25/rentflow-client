"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, logout } from "@/src/services/api/auth";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useThemeContext } from "@/src/context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setCsrfToken } from "@/src/lib/api";

export function Header() {
  const { mode, toggleColorMode } = useThemeContext();

  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Fetch user profile
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const data = await getProfile();
      if (data.csrfToken) {
        setCsrfToken(data.csrfToken);
      }      
      return data.user;
    },
    // staleTime: 15 * 60 * 1000,
  });
  // Handle logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      window.location.href = "/auth/login";
    },
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    handleClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.paper",
        boxShadow: 1,
        borderRadius: 3,
        mb: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton sx={{ mr: 1 }} onClick={toggleColorMode} color="default">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {isLoading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        ) : (
          user && (
            <div>
              <IconButton onClick={handleMenu} size="small" sx={{ ml: 2 }}>
                <Avatar alt={user.fullName} src={user.picture} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  <Typography variant="body1">{user.fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )
        )}
      </Toolbar>
    </AppBar>
  );
}
