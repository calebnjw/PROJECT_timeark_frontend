import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";

//=================================Props=================================//
interface Props {
  client: Client;
}

//=================================return function=====================//
const InvoiceForm = ({ client }: Props) => {
  const { clientList, setClientList } = useGlobalContext();
  const clientId = client._id;
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [address, setAddress] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState("");
  const [hour, setHour] = useState("");
  const [rate, setRate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/invoices/new");
  };
  //get project list
  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        { params: { client_id: clientId, autoCorrect: true } }
      );
      setProjectList(result.data.projects);
    };
    getProjects();
  }, []);

  //get client and project list to map
  const clientOptions: any = clientList.map((client) => {
    return { id: client._id, name: client.client_name };
  });

  const projectOptions: any = projectList.map((project) => {
    return { id: project._id, name: project.name };
  });

  console.log("Client Options: ", clientOptions);
  console.log("Project Options: ", projectOptions);

  //handle submit button
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      client_id: { value: string };
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
      client_id: target.client_id.value,
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
          `${process.env.REACT_APP_BACKEND_URL}/invoices/new`,
          newInvoice
        );
        console.log("Added new invoice: ", result.data);
        const invoice_id: any = result.data.invoice_id;
        console.log("Invoice_id: ", invoice_id);
        const newProjectList: any = projectList.map((p) => {
          if (p._id === newInvoice.project_id) {
            return { ...p, invoice_ids: [...p.invoice_ids, invoice_id] };
          }
          return p;
        });
        console.log("updated project list: ", newProjectList);
        setProjectList(newProjectList);
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
      <Box style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
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
            {clientOptions.length ? (
              <TextField
                select
                name="client_id"
                label="*Client"
                defaultValue={clientOptions[0].id}
              >
                {clientOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>Loading Client Options</>
            )}
            {projectOptions.length ? (
              <TextField
                select
                name="project_id"
                label="*Project"
                defaultValue={projectOptions[0].id}
              >
                {projectOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>Loading Project Options</>
            )}
            <TextField type="text" name="address" label="*Address" />
            <TextField type="date" name="issuedDate" label="*issuedDate" />
            <TextField type="date" name="dueDate" label="*dueDate" />
            <TextField name="task" label="*task" multiline/>
            <TextField type="text" name="hour" label="*hour" />
            <TextField type="text" name="rate" label="*rate" />
            <TextField type="text" name="totalAmount" label="*totalAmount" />
          </div>
          <div>
          <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
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
