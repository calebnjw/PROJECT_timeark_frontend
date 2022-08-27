import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import InvoiceForm from "./newInvoiceForm";
// import MyTable from "./MyTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//===================handle button click=============================//

//======================other variables & data======================//

//===============================return==============================//
const ProjectInvoices: React.FC = () => {

  return (
    <>
      <Navbar />
      <div className="prime-container">
        {/* <InvoiceForm /> */}
        <div className="invoice-heading">
          <Button
            variant="outlined"
            style={{
              left: "30px",
              top: "20px",
            }} /*onClick={handleProjectButton}*/
          >
            <KeyboardArrowLeftIcon fontSize="large" />
            Projects
          </Button>
          <h1 style={{ textAlign: "center" }}>Invoices</h1>
        </div>
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
                <Button variant="outlined" /*onClick={handleGenerateInvoice}*/>
                  Generate Invoice
                </Button>
              </TableCell>
            </TableRow>
          </Table>
          {/* <MyTable rows={rows} /> */}
        </div>
      </div>
    </>
  );
};

export default ProjectInvoices;
