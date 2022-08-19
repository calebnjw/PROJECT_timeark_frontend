import React, { useState, useEffect } from "react";
import { InvoiceProps } from "../types/invoiceTypes";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';

//================================Props=====================================//
type SetInvoicePropsType = {
  setInvoiceProp: React.Dispatch<React.SetStateAction<InvoiceProps[]>>;
  invoiceProp: InvoiceProps[];
};

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
const InvoiceLanding = ({
  setInvoiceProp,
  invoiceProp,
}: SetInvoicePropsType) => {
    
  //fetch project invoice data
  useEffect(() => {
    const invoiceData = async () => {
      const result = await fetch("http://localhost:8000/invoice");
      const data = await result.json();
      setInvoiceProp(data);
      console.log(data);
      return data;
    };
    invoiceData();
  }, []);


  //handle Click
  const handleViewInvoices = () => {
    //axios call to backend
    fetch("");
    console.log("view invoices button has been clicked");
  };

  //===============================return function===========================//
  return (
    <div className="invoice-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Project Name</StyledTableCell>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="right">Invoice</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceProp.map((invoice) => (
              <StyledTableRow key={invoice.id}>
                <StyledTableCell align="left">
                  {invoice.projectName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {invoice.companyName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={handleViewInvoices}>
                    View Invoices
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceLanding;
