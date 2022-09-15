import React, { useState, useEffect } from "react";
import AppNavbar from "../../components/navbar-App";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import InvoicePageList from "./InvoicePageList";
import { Project } from "../../types/project";
import {
  styled,
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  Link,
  Paper,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CLIENT_RENEG_WINDOW } from "tls";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//=================================Styling=================================//
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//=================================Page function=============================//
const InvoicePage = () => {
  const [clientId, setClientId] = useState<string>();
  const { clientList, setClientList } = useGlobalContext();
  const [project, setProject] = useState<[Project]>();

  //useStates
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [error, setError] = React.useState("");

  useEffect(() => {
    if (clientId) {
      console.log(clientId);
      const projectData = async () => {
        try {
          const result = await axios.get(
            `${BACKEND_URL}/projects?client_id=${clientId}`
          );
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //===============================return function===========================//
  return (
    <>
      <AppNavbar />
      <Sidebar />
      <Container
        style={{
          width: "100%",
          marginLeft: "23%",
          marginTop: "100px",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={6}>
              <h2>Project/Invoices</h2>
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
      </Container>
    </>
  );
};

export default InvoicePage;
