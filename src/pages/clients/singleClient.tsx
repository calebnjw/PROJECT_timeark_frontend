import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../components/spinner/spinner";
import { useGlobalContext } from "../../context/clientContext";
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
  const navigate = useNavigate();
  const location = useLocation();
  let { clientId } = useParams();
  let { clientList } = useGlobalContext();

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
      <Box style={{ width: "100%", marginTop: "10%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            {!isLoaded && client === undefined ? (
              <Box>
                <p>Loading the client</p>
                <Spinner />
              </Box>
            ) : (
              <Grid>
                <Box alignContent="left">
                  <p>Client Name: {client.client_name} </p>
                  <p>Company Name: {client.billing_details.company_name}</p>
                  <p>Street Name: {client.billing_details.street_name}</p>
                  <p>Unit Number: {client.billing_details.unit_number}</p>
                  <p>Building Name: {client.billing_details.building_name}</p>
                  <p>City Name: {client.billing_details.city}</p>
                  <p>Country: {client.billing_details.country}</p>
                  <p>Postal Code: {client.billing_details.postal_code}</p>
                  <p>
                    Company Registration:{" "}
                    {client.billing_details.company_registration}
                  </p>
                </Box>
                <Box mt="2rem">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate(`/app/clients/${client._id}/update`, {
                        state: { client },
                      });
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
