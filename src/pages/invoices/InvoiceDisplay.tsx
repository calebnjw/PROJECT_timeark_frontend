import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { Client } from "../../types/client";
import { InvoiceProps } from "../../types/invoiceTypes";

import axios from "axios";
axios.defaults.withCredentials = true;

const InvoiceDisplay = () => {
  const [project, setProject] = useState<Project>();
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<Client>();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskExists, setTaskExist] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceProps>();

  const { invoice_id } = useParams();
  console.log("project", project);
  console.log("taskList", taskList);
  console.log("invoice", invoice);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };
  useEffect(() => {
    const invoiceData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/${invoice_id}`
        );
        setInvoice(result.data.invoice);
        console.log("invoiceresultdata", result.data);
      } catch (err) {
        console.log(err);
      }
    };
    invoiceData();
  }, []);

  useEffect(() => {
    if (invoice) {
      const projectData = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/projects/${invoice.project_id}`
          );
          setProject(result.data.project);
          setClientId(result.data.project.client_id);
          console.log("GenerateInvoice projectData :", result.data);
        } catch (err) {
          console.log(err);
        }
      };
      projectData();
    }
  }, [invoice]);

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

  useEffect(() => {
    if (project) {
      const taskData = async () => {
        try {
          const result = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/tasks`,
            {
              params: { project_id: project._id, autocorrect: true },
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
      taskData();
    }
  }, [project]);

  useEffect(() => {
    if (!taskList) {
      return;
    }

    const computeTime = (t1: Date, t2: Date) => {
      const endDate: any = new Date(t1);
      const startDate: any = new Date(t2);
      const timeDifference = endDate.getTime() - startDate.getTime();
      console.log("Time difference:", timeDifference);
      const hours = timeDifference / (1000 * 60 * 60);
      return hours.toFixed(2);
    };

    //get task id filtered by month
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
    const tasks = taskList.filter((c) => {
      let date;
      if (c.updatedAt) {
        date = c.updatedAt;
      } else {
        date = c.createdAt;
      }
      const dateObject = new Date(date);
      const taskListMonth = monthStrings[dateObject.getUTCMonth()];
      console.log("tasklistmonth&invoicemonth", taskListMonth, invoice?.month);
      return taskListMonth === invoice?.month;
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
    console.log("Total Hours:", totalHours);
    console.log("task list id: ", tasks);
  }, [taskList]);

  return (
    <>
      <div className="main-container">
        <div className="invoice-header">
          <Button
            variant="outlined"
            style={{ left: "50px", top: "80px" }}
            onClick={handleBackButton}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
            Invoices
          </Button>
          <h1 style={{ textAlign: "center" }}>Invoice</h1>
        </div>
      </div>

      <p>User's Name: </p>
      <p>Client's Name: {client?.client_name}</p>
      <p>Company Name: {client?.billing_details.company_name}</p>
      <p>
        Client's Address:
        {client?.billing_details.unit_number}
        {client?.billing_details.street_name}
        {client?.billing_details.building_name}
        {client?.billing_details.postal_code}
        {client?.billing_details.city}
      </p>
      {client?.billing_details.country}
      <p>Invoice number: </p>
      <p>Project name: {project?.name}</p>
      <p>Issued Date: {invoice?.issuedDate}</p>
      <p>Due Date: </p>

      {/* {taskList && taskList.map((i) => ( */}
      <p>Task: </p>
      <p>Task total amount: {}</p>
      {/* ))} */}
      <p>Rate: {project?.rate}</p>
      <p>Total Amount: </p>
    </>
  );
};

export default InvoiceDisplay;
