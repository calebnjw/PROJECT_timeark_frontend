import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import { useGlobalContext } from "../../context/clientContext";
import InvoicePageList from "./InvoicePageList";
import { Project } from "../../types/project";
import {
  styled,
  Box,
  Typography,
  Table,
  TableBody,
  Link,
  Paper,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
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
    console.log(clientId);
    if (clientId) {
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
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <div>
          <h2>Invoices</h2>
          <ul>
            {clientList.map((client, idx) => (
              <li key={idx}>
                <p style={{ fontWeight: "200" }}>
                  <b>{client.client_name}</b>
                </p>
                <InvoicePageList client={client} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
       
    