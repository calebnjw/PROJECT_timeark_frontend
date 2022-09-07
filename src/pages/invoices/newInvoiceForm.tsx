import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  Table,
  TableRow,
  TableCell,
} from "@mui/material";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate, useParams } from "react-router-dom";

//=================================Props=================================//
interface Props {
  client: Client;
}

//=================================return function=====================//
const InvoiceForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [projectExists, setProjectExists] = useState<boolean>(false);
  const [taskExists, setTaskExist] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState(null)
  const [month, setMonth] = useState("");

  const { project_id } = useParams();
  const navigate = useNavigate();

  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  const projectOptions: any = projectList.map((c) => {
    return { id: c._id, name: c.name };
  });

  const monthOptions = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((c) => {
    return { id: c, name: c };
  });


  console.log("Tasklist: ", taskList)
  console.log("SelectedProject", selectedProject)
  function submitNewInvoice() {
    const NewInvoice = {
      client_id: selectedClient,
      project_id: selectedProject,
      
    };

    try {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/new`, NewInvoice);
      console.log(NewInvoice);
      navigate(`/invoices/${project_id}`);
    } catch (err) {
      console.log(err);
    }
  }

  const selectedClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClient(e.target.value);
  };

  const selectedProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProject(e.target.value);
  };

  const selectedMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleGetProject = async (e: any) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        {
          params: { client_id: selectedClient, autoCorrect: true },
        }
      );
      if (result.data.msg === "No project found") {
        setProjectExists(false);
      }
      setProjectExists(true);
      setProjectList(result.data.projects);
      console.log(result.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskMonth = async(e: any) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
        params: { project_id: selectedProject, autocorrect: true},
      });
      if (result.data.msg === "No task found") {
        setTaskExist(false);
      }
      setTaskExist(true);
      setTaskList(result.data.tasks);
    } catch(err) {
      console.log(err);
    }
  };



  const handleBackClick = () => {
    navigate(-1);
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

        <form onSubmit={(e: React.SyntheticEvent) => handleGetProject(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            {clientOptions.length > 0 &&
              <>
                <TextField
                  select
                  name="client_id"
                  label="Client"
                  defaultValue=""
                  onChange={selectedClientChange}
                >
                  {clientOptions.map(
                    (option?: { id: string; name: string }) => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <Button onClick={handleGetProject}>Get Projects</Button>
              </>
            
            }
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            {projectList.length > 0 &&
              <>
                <TextField
                  select
                  name="project_id"
                  label="Project"
                  onChange={selectedProjectChange}
                  defaultValue=""
                >
                  {projectOptions.map(
                    (option?: { id: string; name: string }) => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <Button onClick={handleTaskMonth}>Select Month</Button>
              </>
            }
          </div>
          {taskExists && <div 
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            <TextField
            select
            name="monthOptions"
            label="Month"
            onChange={selectedMonthChange}
            defaultValue=""
            >
            {monthOptions.map(
                    (option?: { id: string; name: string }) => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    )
                  )}
            </TextField>
            </div>}
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
              onClick={submitNewInvoice}
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
