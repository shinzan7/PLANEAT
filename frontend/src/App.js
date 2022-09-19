import React from "react";
import Router from "./Router";
import "./App.css"

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Nanum Gothic', sans-serif",
  },
  palette: {
    purple: {
      main: "#9DA6F8",
    },
    orange: {
      main: "#F7BF87",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;