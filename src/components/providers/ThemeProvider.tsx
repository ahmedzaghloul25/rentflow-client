"use client";

import { useMemo, useState } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "@/src/context/ThemeContext";

// Keep your base theme configurations
const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode values
          primary: { main: "#3f51b5" },
          background: { default: "#f7f9fc", paper: "#ffffff" },
          text: { primary: "#212121", secondary: "#757575" },
        }
      : {
          // Dark mode values
          primary: { main: "#90caf9" },
          background: { default: "#121212", paper: "#1e1e1e" },
          text: { primary: "#ffffff", secondary: "#b0bec5" },
        }),
  },
  // You can add other theme settings like typography here
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
