import React, { useState, useEffect } from "react";
import AppNavbar from "../../components/navbar-App";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import InvoicePageList from "./InvoicePageList";
import { Project } from "../../types/project";
import { Box, Typography, Container, Grid, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//=================================Page function=============================//
const InvoicePage = () => {
  const [clientId, setClientId] = useState<string>();
  const { clientList, setClientList } = useGlobalContext();
  const [project, setProject] = useState<[Project]>();

  //useStates
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    if (clientId) {
      console.log(clientId);
      const projectData = async () => {
        try {
          const result = await axios.get(`${BACKEND_URL}/projects?client_id=${clientId}`);
          setProject(result.data.projects);
          console.log(result.data);
        } catch (err) {
          console.log(err);
        }
      };
      projectData();
    }
  }, [clientId]);

  const navigate = useNavigate();

  //=============================for changing the pages========================//
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //===============================return function===========================//
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3ch",
        }}
      >
        <Grid item>
          <Typography variant="h3">Invoices</Typography>
        </Grid>
        <Grid item>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              navigate(`/app/invoices/new`);
            }}
          >
            <Typography>+ Generate Invoice</Typography>
          </Button>
        </Grid>
      </Grid>
      <Stack>
        {clientList.map((client, idx) => (
          <li key={idx} style={{ listStyle: "none", marginTop: "10px" }}>
            <Typography style={{ fontWeight: "400" }}>
              <b>{client.client_name}</b>
            </Typography>
            <InvoicePageList client={client} />
          </li>
        ))}
      </Stack>
    </Box>
  );
};

export default InvoicePage;
