import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const ThemeContext = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeContext;
