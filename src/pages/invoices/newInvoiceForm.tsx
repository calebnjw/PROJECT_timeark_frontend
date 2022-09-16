import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useGlobalContext } from "../../context/clientContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
axios.defaults.withCredentials = true;

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
  const [projectExists, setProjectExists] = useState<boolean>(false);
  const [taskExists, setTaskExist] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState(null);
  const [month, setMonth] = useState("");
  const [project, setProject] = useState<Project>();
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<Client>();

  const navigate = useNavigate();

  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  const projectOptions: any = projectList.map((c) => {
    return { id: c._id, name: c.name };
  });

  const monthStrings = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOptions = monthStrings.map((c) => {
    return { id: c, name: c };
  });

  useEffect(() => {
    for (let projectItem of projectList) {
      if (projectItem._id === selectedProject) {
        setProject(projectItem);
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    const projectData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects/${selectedProject}`
        );
        setProject(result.data.project);
        setClientId(result.data.project.client_id);
      } catch (err) {
        console.log(err);
      }
    };
    projectData();
  }, []);

  useEffect(() => {
    if (clientId) {
      console.log(clientId);
      const clientData = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/clients/${clientId}`
          );
          setClient(result.data[0]);
          console.log("Client data: ", result.data[0]);
        } catch (err) {
          console.log(err);
        }
      };
      clientData();
    }
  }, [clientId]);
  console.log("Tasklist: ", taskList);
  console.log("SelectedProject", selectedProject);

  async function submitNewInvoice() {
    //convert time to hours
    const computeTime = (t1: Date, t2: Date) => {
      const endDate: any = new Date(t1);
      const startDate: any = new Date(t2);
      const timeDifference = endDate.getTime() - startDate.getTime();
      console.log("Time difference:", timeDifference);
      const hours = timeDifference / (1000 * 60 * 60);
      return hours.toFixed(2);
    };

    //get task id filtered by month
    const tasks = taskList.filter((c) => {
      let date;
      if (c.updatedAt) {
        date = c.updatedAt;
      } else {
        date = c.createdAt;
      }
      const dateObject = new Date(date);
      const taskListMonth = monthStrings[dateObject.getUTCMonth()];
      return taskListMonth === month;
    });

    let totalHours = 0;
    const taskDetails = [];
    for (let task of tasks) {
      const taskObject = { taskName: task.name, totalAmount: 0 };
      console.log("taskObject:", taskObject);
      let taskTotalAmount = 0;
      for (let timeTrackingObj of task.time_trackings) {
        const hours = computeTime(
          timeTrackingObj.endDate,
          timeTrackingObj.startDate
        );
        console.log("hours", hours);
        if (project) {
          taskTotalAmount += parseInt(hours) * project?.rate;
        }
        totalHours += parseInt(hours);
      }
      console.log("taskTotalAmount:", taskTotalAmount);
      taskObject.totalAmount = taskTotalAmount;
      taskDetails.push(taskObject);
    }

    const NewInvoice = {
      project_id: selectedProject,
      selectedMonth: month, 
      paid: false,
      overdue: false,
      amount: 100,
      time_trackings: [{taskName: "name", timeSpent: 5}]
    };

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/invoices/new`,
        NewInvoice
      );
      console.log("newInvoice", NewInvoice);
      navigate(`/app/invoices/projects/${selectedProject}`);
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
    console.log("selected month", e.target.value);
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

  const handleTaskMonth = async (e: any) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks`,
        {
          params: { project_id: selectedProject, autocorrect: true },
        }
      );
      if (result.data.msg === "No task found") {
        setTaskExist(false);
      }
      setTaskExist(true);
      setTaskList(result.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        style={{
          width: "100%",
          
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleBackClick}>
        <KeyboardArrowLeftIcon />
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
            {clientOptions.length > 0 && (
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
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            {projectList.length > 0 && (
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
            )}
          </div>
          {taskExists && (
            <div
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
                {monthOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
          <div>
            <Button
              variant="contained"
              color="primary"
              type="button"
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
