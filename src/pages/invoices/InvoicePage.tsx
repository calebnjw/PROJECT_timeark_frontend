import React, { useState, useEffect } from "react";
import ClientSidebar from "./clients_sidebar";
import { InvoiceProps } from "../../types/invoiceTypes";
import { Project } from "../../types/project";
import {
  styled,
  Box,
  Typography,
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
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

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
          const result = await axios.get(`${BACKEND_URL}/projects?client_id=${clientId}`);
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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //===============================return function===========================//
  return (
    <>
      <ClientSidebar setClientId={setClientId} />
      {clientId && (
        <div className="invoice-container">
          <h1 style={{ textAlign: "center" }}>All Projects</h1>
          <div className="project-table">
            <TableContainer style={{ paddingLeft: "500px", paddingRight: "50px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Project Name</StyledTableCell>
                    <StyledTableCell align="right">View Invoices</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {project === undefined ? (
                    <Box>
                      <Typography>Loading Project</Typography>
                    </Box>
                  ) : (
                    project.map((i) => (
                      <StyledTableRow key={i._id}>
                        <StyledTableCell align="left">{i.name}</StyledTableCell>
                        <StyledTableCell align="right">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              navigate(`/invoices/${i._id}`);
                            }}
                          >
                            <ReceiptRoundedIcon />
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {project && (
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={project.length}
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
      )}
    </>
  );
};

export default InvoicePage;
