import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";

import { useUserContext } from "../context/userContext";

import AppNavbar from "../components/navbar-App";
import Sidebar from "../components/sidebar";

import axios from "axios";
import Footer from "../components/footer";
axios.defaults.withCredentials = true;

function AppLayout() {
  const { userProfile } = useUserContext();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppNavbar />
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Sidebar />
        </Grid>
        <Outlet />
      </Grid>
      <Footer />
    </Box>
  );
}

export default AppLayout;
