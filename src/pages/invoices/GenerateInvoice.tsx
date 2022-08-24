import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import {
  Box,
  Grid,
  Table,
  TableRow,
  TableCell,
  styled,
  Divider,
  Button,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableBody,
  FormControlLabel,
  Switch

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//===================================Table styling==========================//
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

//===================handle button click=============================//
const handleInvoices = () => {
  console.log("I have been clicked");
};

//===============================return==============================//
const ProjectInvoices = () => {
  return (
    <>
      <div className="prime-container">
        <Navbar />
        <Sidebar />
        <h1 style={{ textAlign: "center" }}>Invoices</h1>
        <div
          className="generate-invoice-container"
          style={{ width: "70%", paddingLeft: "300px" }}
        >
          <Table>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Project Name: </TableCell>
              <TableCell align="left">Rocket Ship</TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Client Name: </TableCell>
              <TableCell align="left">Foong Co</TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Unbilled Hours: </TableCell>
              <TableCell align="left">10 Hours 20 Minutes</TableCell>
              <TableCell align="right">
                <Button variant="outlined">Generate Invoice</Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
        <Divider />

        <div className="invoice-list">
          <TableContainer
            style={{ paddingLeft: "300px", paddingRight: "50px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Invoice Number</StyledTableCell>
                  <StyledTableCell align="left">Date Generated</StyledTableCell>
                  <StyledTableCell align="left">Date Due</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="right">View Invoices</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow /*key={invoice._id}*/>
                  <StyledTableCell align="left">INV_1234</StyledTableCell>
                  <StyledTableCell align="left">22/10/2022</StyledTableCell>
                  <StyledTableCell align="left">29/10/2022</StyledTableCell>
                  <StyledTableCell align="left"> <FormControlLabel
          value="Paid"
          control={<Switch color="primary" />}
          label="Paid"
        /></StyledTableCell>
                  <StyledTableCell align="right">
                    <Button variant="outlined" onClick={handleInvoices}>
                      <ReceiptRoundedIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ProjectInvoices;
