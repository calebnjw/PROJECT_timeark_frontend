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
import TablePagination from "@mui/material/TablePagination";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";

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

  //useStates
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    <div className="invoice-container">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Project Name</StyledTableCell>
              <StyledTableCell align="left">Company Name</StyledTableCell>
              <StyledTableCell align="right">View Invoice</StyledTableCell>
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
                    <ReceiptRoundedIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10]}
        component="div"
        count={invoiceProp.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default InvoiceLanding;
