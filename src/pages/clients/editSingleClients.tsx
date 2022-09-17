import { Box, Grid, Typography, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useGlobalContext } from "../../context/clientContext";
import EditClientForm from "./editClient_form";

export default function EditSingleClient() {
  const { clientList, setClientList } = useGlobalContext();
  const location = useLocation();
  const { client }: any = location.state;

  return (
    <div>
      <Box>
        <Grid
          container
          style={{
            // flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <EditClientForm client={client} setClientList={setClientList} />
        </Grid>
      </Box>
    </div>
  );
}
