"use client";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-space-grotesk), sans-serif",
  },
});

export default function MuiProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
