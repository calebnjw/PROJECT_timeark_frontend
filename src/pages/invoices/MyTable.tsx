import { TableProps } from "../../types/invoiceTypes";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TablePagination,
  Paper,
} from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import GenerateInvoice from "./GenerateInvoice";
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

//===============================onClick & onChange functions==========================//



const handleSelector = () => {
  console.log("Paid/overdue selected");
};


//===================================props=========================//
interface Props {
  client: Client;
}

//======================================Return section=======================//
const MyTable = () => {
  const navigate = useNavigate();
  const { clientList, setClientList } = useGlobalContext();
  const [table, setTable] = useState<TableProps[]>([]);
  const [currentInvoices, setCurrentInvoices] = useState<Project>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const clientId = client._id;
  
  const { project_id } = useParams();
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
  
  const handleInvoices = (invoice_id: any) => {
    navigate(`/app/invoices/invoice/${invoice_id}`) 
    console.log("Invoices button clicked");
  };
  
  
  useEffect(() => {
    const getInvoice = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/`, {params: {project_id: project_id}}
          );
          console.log("setTable", result.data.invoices);
          setTable(result.data.invoices);
        } catch (err) {
          console.log(err);
        }
      };
      getInvoice();
    }, []);

    const handleDeleteButton = async(invoiceId: any) => {
      try {
        const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/invoices/invoice/${invoiceId}`)
        navigate(`app/invoices/${project_id}`)
      } catch(err){
        console.log(err)
      }
    }

  //due date
  const invoiceIssuedDate = new Date();
  const invoiceDueDate = new Date(invoiceIssuedDate.getTime());
  invoiceDueDate.setDate(invoiceDueDate.getDate() + 7);

  return (
    <>
      <div className="invoice-list">
        <TableContainer>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" >
                    Invoice Number
                  </StyledTableCell>
                  <StyledTableCell align="center">Issued Date</StyledTableCell>
                  <StyledTableCell align="center">Due Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">View Invoices</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {table &&
                  table.map((i: any) => (
                    <StyledTableRow key={i.id}>
                      <StyledTableCell align="center">{i._id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {`${invoiceIssuedDate.getDate()}/${invoiceIssuedDate.getUTCMonth()}/${
                          invoiceIssuedDate.getFullYear()
                        }`}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {`${invoiceDueDate.getDate()}/${invoiceDueDate.getUTCMonth()}/${
                          invoiceDueDate.getFullYear()
                        }`}
                      </StyledTableCell>
                      <FormControl sx={{ m: 1, minWidth: 90 }} >
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          label="Status"
                          onChange={handleSelector}
                          variant="outlined"
                        >
                          <MenuItem value={"paid"}>Paid</MenuItem>
                          <MenuItem value={"overdue"}>Overdue</MenuItem>
                        </Select>
                      </FormControl>
                      <StyledTableCell align="center">
                        <Button variant="outlined" onClick={() => handleInvoices(i._id)}>
                          <ReceiptRoundedIcon />
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center"><Button
                variant="contained"
                color="error"
                type="submit"
                onClick = {() => {handleDeleteButton(i._id)}}
              >
                <DeleteForeverIcon/>
              </Button></StyledTableCell>

                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
        {table && (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={table.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ paddingLeft: "500px", paddingRight: "50px" }}
        />
      )}
      </div>
    </>
  );
};

export default MyTable;
