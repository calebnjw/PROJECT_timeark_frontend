import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { InvoiceProps } from "../../types/invoiceTypes";
import { Client } from "../../types/client";
import {
  styled,
  Table,
  TableBody,
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
  
  //================================Props====================================//
  //need client to get project names??
  interface Props {
    client: Client;
  }
//=================================Page function=============================//
const InvoicePage: React.FC = ({ 
  client_name,
  client_id,
  project_name,
  project_id,
  
 }: InvoiceProps) => {
  const [invoice, setInvoice] = useState();

  //useStates
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = React.useState("");

  //fetch project invoice data
  useEffect(() => {
    const invoiceData = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/invoices`, {
          params: { project_id: "62feb54a6f263e3da7d44561" },
        });
        //error handling
        if (!result) {
          throw new Error("Fail to fetch data");
        }
        if (setInvoice) {
          setInvoice(result.data.invoices);
          console.log(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    invoiceData();
  }, []);

  const navigate = useNavigate();

  //handle Click
  const handleViewInvoices = () => {
    //axios call to backend
    navigate("/invoices/new");
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
    <>
      <Navbar />
      <div className="invoice-container">
        <h1 style={{ textAlign: "center" }}>All Projects</h1>
        <div className="project-table">
          <TableContainer
            style={{ paddingLeft: "500px", paddingRight: "50px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Project Name</StyledTableCell>
                  <StyledTableCell align="right">View Invoices</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice &&
                  invoice.map((i) => (
                    <StyledTableRow key={i._id}>
                      <StyledTableCell align="left">
                        {i.project_name}
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
          {invoice && (
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={invoice.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              style={{ paddingLeft: "500px", paddingRight: "50px" }}
            />
          )}
        </div>
        {/* For error handling later on */}
        <div className="error-container"></div>
      </div>
    </>
  );
};


export default InvoicePage;
