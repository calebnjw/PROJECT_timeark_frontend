import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import { useParams, useLocation } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../components/spinner/spinner";
import { useGlobalContext } from "../../context/clientContext";
import EditClientForm from "./editClient_form";

export default function EditSingleClient() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // let { clientId } = useParams();
  const { clientList, setClientList } = useGlobalContext();
  const location = useLocation();
  const { client }: any = location.state;

  return (
    <div>
      <Box style={{ width: "70%", marginTop: "80px", marginLeft: "50%" }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <ClientSidebar />
          <Grid item>
            {!isLoaded && client === undefined ? (
              <Box>
                <Typography>Loading the client</Typography>
                <Spinner />
              </Box>
            ) : (
              <EditClientForm client={client} setClientList={setClientList} />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
