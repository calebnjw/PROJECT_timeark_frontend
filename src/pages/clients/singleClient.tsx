import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";

export default function SingleClient() {
  return (
    <div>
      <NavBar />
      <Box sx={{ mt: "2rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Sidebar />
          <ClientSidebar />
          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}