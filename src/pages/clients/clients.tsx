import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import SingleClient from "./singleClient";
import { Client } from "../../types/client";

export default function Clients() {
  const [client, setClient] = useState<Client[]>([]);
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
    </div>
  );
}
