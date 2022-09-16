import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Spinner } from "../../components/spinner/spinner";
import { useGlobalContext } from "../../context/clientContext";
import EditClientForm from "./editClient_form";

export default function EditSingleClient() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { clientList, setClientList } = useGlobalContext();
  const location = useLocation();
  const { client }: any = location.state;

  return (
    <div>
      <Box style={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
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
