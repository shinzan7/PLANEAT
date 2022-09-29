import React from "react";
import Router from "./Router";
import "./App.css";
import { RecoilRoot } from 'recoil'; 

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
    primary: {
      main: "#E6E8FD",
    },
    secondary: {
      main: "#F7BF87",
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
