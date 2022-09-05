import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate, useParams } from "react-router-dom";

//=================================Props=================================//
interface Props {
  client: Client;
}



const handleSubmit = () => {
  console.log("form submit button clicked");
};

//=================================return function=====================//
const InvoiceForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [project, setProject] = useState<Project>();
  
  const { project_id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getProjects = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects/${project_id}`);
        setProject(result.data.project);
      } catch (err) {
        console.log(err);
      }
    };
    getProjects();
  }, []);

  //handle submit button
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      // client_id: { value: string };
      project_id: { value: string };
      address: { value: {} };
      issuedDate: { value: Date };
      dueDate: { value: Date };
      task: { value: {} };
      hour: { value: number };
      rate: { value: number };
      totalAmount: { value: number };
    };

    const newInvoice = {
      // client_id: target.client_id.value,
      project_id: target.project_id.value,
      address: target.address.value.split(","),
      issuedDate: target.issuedDate.value,
      dueDate: target.dueDate.value,
      task: target.task.value.split(","),
      hour: Number(target.hour.value),
      rate: Number(target.rate.value),
      totalAmount: Number(target.totalAmount.value),
    };
    console.log("New Invoice: ", newInvoice);

    if (newInvoice) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/${project_id}/new`,
          newInvoice
        );
        console.log("Added new invoice: ", result.data);
        const invoice_id: any = result.data.invoice_id;
        console.log("Invoice_id: ", invoice_id);
        navigate(`/invoices/${invoice_id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        style={{
          width: "80%",
          marginLeft: "20%",
          marginTop: "80px",
          paddingLeft: "100px",
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
          Back
        </Button>
        <h3>New Invoice</h3>

        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              height: "500px",
              justifyContent: "space-around",
            }}
          >
            <Table>
              <TableRow sx={{ "& td": { border: 0 } }}>
                <TableCell align="left">Project Name: </TableCell>
                <TableCell align="left">{project?.name}</TableCell>
              </TableRow>
              <TableRow sx={{ "& td": { border: 0 } }}>
                <TableCell align="left">Client Name: </TableCell>
                <TableCell align="left">Foong Co</TableCell>
              </TableRow>
            </Table>
            <TextField type="text" name="address" label="Address" />
            <TextField type="date" name="issuedDate" />
            <TextField type="date" name="dueDate" />
            <TextField name="task" label="Task" multiline />
            <TextField type="text" name="hour" label="Hour" />
            <TextField type="text" name="rate" label="Rate" />
            <TextField type="text" name="totalAmount" label="Total Amount" />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default InvoiceForm;
