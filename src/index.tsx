import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";

import "./index.scss";

import App from "./App";

const themePalette = createTheme({
  palette: {
    primary: {
      main: "#0c3866",
    },
    secondary: {
      main: "#1793d1",
    },
    error: {
      main: "#e62851",
    },
    warning: {
      main: "#e6bc28",
    },
    info: {
      main: "#2850e6",
    },
    success: {
      main: "#009f4d",
    },
    divider: "rgba(100,100,100,0.1)",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={themePalette}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
