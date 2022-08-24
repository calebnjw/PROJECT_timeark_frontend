import axios from "axios";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../components/spinner/spinner";

interface Props {
  client: Client[];
  setClient: React.Dispatch<React.SetStateAction<Client[]>>;
}

export default function SingleClient() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  let clientId = useParams();

  useEffect(() => {
    const getSelectedClient = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients/${clientId.clientId}`
      );
      console.log("clientdata", result.data);
      let selectedClient = JSON.stringify(result.data);
      setClient(selectedClient);
      setIsLoaded(true);
    };
    getSelectedClient();
  }, []);

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
          <Grid item xs={6}>
            {!isLoaded ? (
              <Box>
                <Typography>Loading the client</Typography>
                <Spinner />
              </Box>
            ) : (
              <Box>
                <Typography>{client}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
