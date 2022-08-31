import axios from "axios";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../components/spinner/spinner";
import { ClientGlobalContext } from "../../context/clientContext";
import { Client, Billing } from "../../types/client";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function SingleClient() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [client, setClient] = useState<Client>({
    _id: "",
    client_name: "",
    billing_details: {
      company_name: "",
      building_name: "",
      unit_number: "",
      street_name: "",
      city: "",
      country: "",
      postal_code: "",
      company_registration: "",
    },
    project_ids: [],
    createdAt: null,
    updatedAt: null,
  });

  let { clientId } = useParams();

  const { clientList } = useContext(ClientGlobalContext);

  useEffect(() => {
    function getSingleClient(
      clientid: string | undefined,
      clientlist: Client[]
    ): Client[] {
      return clientList.filter((element) => element._id === clientid);
    }
    if (!isLoaded && clientId !== undefined && clientList.length !== 0) {
      const selectedclient = getSingleClient(clientId, clientList);
      console.log("selectedclient", selectedclient);
      setClient(selectedclient[0]);
      setIsLoaded(true);
    }
  }, [isLoaded, clientList, clientId]);

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
            {!isLoaded && client === undefined ? (
              <Box>
                <Typography>Loading the client</Typography>
                <Spinner />
              </Box>
            ) : (
              <Grid item xs={6}>
                <Box alignContent="left">
                  <Typography>Client Name: {client.client_name} </Typography>
                  <Typography>
                    Company Name: {client.billing_details.company_name}
                  </Typography>
                  <Typography>
                    Street Name: {client.billing_details.street_name}
                  </Typography>
                  <Typography>
                    Unit Number: {client.billing_details.unit_number}
                  </Typography>
                  <Typography>
                    Building Name: {client.billing_details.building_name}
                  </Typography>
                  <Typography>
                    City Name: {client.billing_details.city}
                  </Typography>
                  <Typography>
                    Country: {client.billing_details.country}
                  </Typography>
                  <Typography>
                    Postal Code: {client.billing_details.postal_code}
                  </Typography>
                  <Typography>
                    Company Registration:{" "}
                    {client.billing_details.company_registration}
                  </Typography>
                </Box>
                <Box mt="2rem">
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/clients/${client._id}/update`}
                  >
                    Edit
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
