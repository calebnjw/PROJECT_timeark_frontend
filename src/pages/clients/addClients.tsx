import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import NewClient from "./newclients_form";

export default function Clients() {
  return (
    <div>
      <Box sx={{ mt: "2rem" }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <ClientSidebar />
          <Grid item xs={6}>
            <NewClient />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
