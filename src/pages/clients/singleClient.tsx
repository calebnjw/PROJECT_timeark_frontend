import { Box, Typography, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "../../components/spinner/spinner";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";

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
  // const location = useLocation();
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
      setClient(selectedclient[0]);
      setIsLoaded(true);
    }
  }, [isLoaded, clientList, clientId]);

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          width: "100%",
          flexDirection: "column",
          padding: "3ch",
        }}
      >
        {!isLoaded && client === undefined ? (
          <Box>
            <p>Loading the client</p>
            <Spinner />
          </Box>
        ) : (
          <>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h3" align="left">
                Client Details
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  navigate(`/app/clients/${client._id}/update`, {
                    state: { client },
                  });
                }}
              >
                Edit
              </Button>
            </Box>
            <hr></hr>
            <Box
              style={{
                textAlign: "left",
                marginTop: "20px",
                flexDirection: "column",
              }}
            >
              <p>
                <strong>Client Name: </strong>
                {client.client_name}
              </p>
              <p>
                <strong>Company Name: </strong>
                {client.billing_details.company_name}
              </p>
              <p>
                <strong>Company Registration: </strong>
                {client.billing_details.company_registration}
              </p>

              <Typography
                variant="h5"
                align="left"
                style={{
                  marginTop: "20px",
                }}
              >
                Billing Details
              </Typography>
              <hr></hr>

              <p
                style={{
                  marginTop: "20px",
                }}
              >
                <strong>Street Name: </strong>
                {client.billing_details.street_name}
              </p>
              <p>
                <strong>Unit Number: </strong>
                {client.billing_details.unit_number}
              </p>
              <p>
                <strong>Building Name: </strong>
                {client.billing_details.building_name}
              </p>
              <p>
                <strong>City Name: </strong>
                {client.billing_details.city}
              </p>
              <p>
                <strong>Country: </strong>
                {client.billing_details.country}
              </p>
              <p>
                <strong>Postal Code: </strong>
                {client.billing_details.postal_code}
              </p>
            </Box>
          </>
        )}
      </Paper>
    </div>
  );
}
