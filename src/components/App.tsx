import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";

import AppRoutes from "../routes/AppRoutes";

// Generate Custom Global theme by Material UI

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ab003c",
    },
    primary: {
      main: lightBlue[900],
    },
  },

  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', "sans-serif"].join(","),
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}
