import React, { useState, useEffect } from "react";
import { ProjectProps } from "../../types/invoiceTypes";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate } from "react-router-dom";


//================================Props=====================================//
type SetProjectPropsType = {
  setProjectProp?: (value: ProjectProps[]) => void;
  projectProp?: ProjectProps[];
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
  setProjectProp,
  projectProp,
}: SetProjectPropsType) => {
  //useStates
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = React.useState("");

  //fetch project invoice data
  useEffect(() => {
    const invoiceData = async () => {
      try {
        const result = await fetch("http://localhost:8080/invoices");
        const data = await result.json();
        //error handling
        if (!result) {
          throw new Error("Fail to fetch data");
        }
        if (setProjectProp) {
          setProjectProp(data);
        }
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    invoiceData();
  }, []);

  // const navigate = useNavigate();

  //handle Click
  const handleViewInvoices = async() => { 
    //axios call to backend
    // navigate('/invoice/new');
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
      <div className="invoice-container">
        <div className="project-table">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Project Name</StyledTableCell>
                  <StyledTableCell align="left">Company Name</StyledTableCell>
                  <StyledTableCell align="right">View Invoices</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projectProp &&
                  projectProp.map((project) => (
                    <StyledTableRow key={project.id}>
                      <StyledTableCell align="left">
                        {project.projectName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {project.companyName}
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
          {projectProp && (
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={projectProp.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </div>
        {/* For error handling later on */}
        <div className="error-container"></div>
      </div>
    </>
  );
};

export default InvoiceLanding;
