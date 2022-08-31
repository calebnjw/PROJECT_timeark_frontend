import { Outlet } from "react-router-dom";

import { Box, Grid } from "@mui/material";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
// import Sidebar from "../components/sidebar";

export default function HomeLayout() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Grid item>
          <Outlet />
        </Grid>
        <Footer />
      </Grid>
    </Box>
  );
}
