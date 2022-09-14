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
import { Client, Billing } from "../../types/client";
import EditClientForm from "./editClient_form";

export default function EditSingleClient() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [client, setClient] = useState<Client>({
  //   _id: "",
  //   client_name: "",
  //   billing_details: {
  //     company_name: "",
  //     building_name: "",
  //     unit_number: "",
  //     street_name: "",
  //     city: "",
  //     country: "",
  //     postal_code: "",
  //     company_registration: "",
  //   },
  //   project_ids: [],
  //   createdAt: null,
  //   updatedAt: null,
  // });

  // let { clientId } = useParams();
  const { clientList, setClientList } = useGlobalContext();
  const location = useLocation();
  const { client }: any = location.state;

  // useEffect(() => {
  //   function getSingleClient(
  //     clientid: string | undefined,
  //     clientlist: Client[]
  //   ): Client[] {
  //     return clientList.filter((element) => element._id === clientid);
  //   }
  //   if (!isLoaded && clientId !== undefined && clientList.length !== 0) {
  //     const selectedclient = getSingleClient(clientId, clientList);
  //     console.log("selectedclient", selectedclient);
  //     setClient(selectedclient[0]);
  //     setIsLoaded(true);
  //   }
  // }, [isLoaded, clientList, clientId]);

  return (
    <div>
      <Box style={{ width: "70%", marginTop: "80px", marginLeft: "50%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Sidebar />
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
