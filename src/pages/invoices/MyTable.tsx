import { TableProps } from "../../types/invoiceTypes";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { format } from "date-fns";
import Moment from 'moment';
import { InvoiceProps } from "../../types/invoiceTypes";
import {
  Table,
  TableRow,
  TableCell,
  styled,
  Button,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate, useParams } from "react-router-dom";
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

//===================================props=========================//
interface Props {
  client: Client;
}

//======================================Return section=======================//
const MyTable = () => {
  const navigate = useNavigate();
  const { clientList, setClientList } = useGlobalContext();
  const [table, setTable] = useState<TableProps[]>([]);
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const { project_id } = useParams();

  const handleInvoices = (invoice_id: any) => {
    navigate(`/app/invoices/${invoice_id}`);
    console.log("Invoices button clicked");
  };

  const handleUpdateClick = (invoice_id: any) => {
    navigate(`/app/invoices/${invoice_id}/update`)
  }

  useEffect(() => {
    const getInvoice = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/`,
          { params: { project_id: project_id } }
        );
        console.log("setTable", result.data.invoices);
        setTable(result.data.invoices);
      } catch (err) {
        console.log(err);
      }
    };
    getInvoice();
  }, []);

  
  
  const handleDeleteButton = async (invoiceId: any) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/invoices/invoice/${invoiceId}`
        );
        
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/`,
          { params: { project_id: project_id } }
          );
          console.log("setTable", result.data.invoices);
          setTable(result.data.invoices);
        } catch (err) {
          console.log(err);
        }
      };

      //due date
  const invoiceIssuedDate = Moment(invoice?.issuedDate).format('DD/MM/YYYY');
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const invoiceDueDate = format(dueDate, 'dd/MM/yyyy');

  return (
    <>
      <div className="invoice-list">
        <TableContainer>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Invoice Number
                  </StyledTableCell>
                  <StyledTableCell align="center">Issued Date</StyledTableCell>
                  <StyledTableCell align="center">Due Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Edit Status</StyledTableCell>
                  <StyledTableCell align="center">
                    View Invoices
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {table &&
                  table.map((i: any) => (
                    <StyledTableRow key={i.id}>
                      <StyledTableCell align="center">{i._id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {Moment(i.issuedDate).format('DD/MM/YYYY')}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Moment(i.issuedDate).add(7, 'days').format("DD/MM/YYYY")}
                      </StyledTableCell>
                     <StyledTableCell align="center">{invoice?.paid ? "Paid" : "Overdue"}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                        onClick={() => handleUpdateClick(i._id)}
                        >
                          <BrowserUpdatedIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleInvoices(i._id)}
                        >
                          <ReceiptRoundedIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          type="submit"
                          onClick={() => {
                            handleDeleteButton(i._id);
                          }}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
      </div>
    </>
  );
};

export default MyTable;
