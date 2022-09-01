import { TableProps } from "../../types/invoiceTypes";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
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
  Paper,
} from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate } from "react-router-dom";
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

//===============================onClick & onChange functions==========================//
const navigate = useNavigate();
const handleInvoices = () => {
  // navigate(`/invoices/${}`)
  console.log("Invoices button clicked");
};

const handleSelector = () => {
  console.log("Paid/overdue selected");
};

//===================================props=========================//
interface Props {
  client: Client;
}

//======================================Return section=======================//
const MyTable = ({ client }: TableProps) => {
  const { clientList, setClientList } = useGlobalContext();
  const [table, setTable] = useState();
  const clientId = client._id;
  const projectId = client.project_id;
  useEffect(() => {
    const getInvoice = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices`,
          {
            params: {
              client_id: clientId,
              project_id: projectId,
              autoCorrect: true,
            },
          }
        );
        if (setTable) {
          setTable(result.data);
          console.log(result.data);
        }
      } catch (err) {
        console.log(err);
      }
      getInvoice();
    };
  }, []);

  return (
    <>
      <div className="invoice-list">
        <TableContainer style={{ paddingLeft: "100px", paddingRight: "100px" }}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">
                    Invoice Number
                  </StyledTableCell>
                  <StyledTableCell align="right">Issued Date</StyledTableCell>
                  <StyledTableCell align="right">Due Date</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                  <StyledTableCell align="right">View Invoices</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {table.map((i) => ( */}
                  <StyledTableRow /*key={row.id}*/>
                    <StyledTableCell align="left">{}</StyledTableCell>
                    <StyledTableCell align="left">
                      {}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {}
                    </StyledTableCell>
                    <FormControl sx={{ m: 1, minWidth: 90 }}>
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
                    <StyledTableCell align="right">
                      <Button variant="outlined" onClick={handleInvoices}>
                        <ReceiptRoundedIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
      </div>
    </>
  );
};

export default MyTable;
