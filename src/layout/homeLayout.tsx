import { Outlet } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import HomeNavbar from "../components/navbar-Home";
import Footer from "../components/footer";
// import Sidebar from "../components/sidebar";

function HomeLayout() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <HomeNavbar />
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Outlet />
      </Grid>
      <Footer />
    </Box>
  );
}

export default HomeLayout;
