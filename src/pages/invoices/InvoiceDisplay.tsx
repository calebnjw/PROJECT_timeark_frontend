import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import {
  Button,
  styled,
  TableRow,
  tableCellClasses,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { Client } from "../../types/client";
import { InvoiceProps, TimeTrackProps } from "../../types/invoiceTypes";
import AppNavbar from "../../components/navbar-App";

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
//==================================function=============================//

import axios from "axios";
import { result } from "lodash";
axios.defaults.withCredentials = true;

const InvoiceDisplay = () => {
  const [project, setProject] = useState<Project>();
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<Client>();
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [taskExists, setTaskExist] = useState<boolean>(false);
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const [dueDate, setDueDate] = useState<any>();
  const [timeTrack, setTimeTrack] = useState<TimeTrackProps[]>([]);
  const { userProfile } = useUserContext();

  const { invoice_id } = useParams();
  console.log("project", project);
  console.log("taskList", taskList);
  console.log("invoice", invoice);
  console.log("dueDate", dueDate)
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
        const s = result.data.invoice.issuedDate
        result.data.invoice.issue = new Date(s)
        setInvoice(result.data.invoice);
        setTimeTrack(result.data.invoice.time_trackings);
        console.log("invoiceresultdata", result.data);
      } catch (err) {
        console.log(err);
      }
    };
    invoiceData();
  }, []);
  console.log("timetrack", timeTrack);

  useEffect(() => {
    if (invoice) {
      const issuedDate = invoice.issue
      const due = new Date(issuedDate.getTime());
      due.setDate(due.getDate() + 7)
      setDueDate(due)
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
      <AppNavbar />
      <div
        className="main-container-display"
        style={{
          width: "100%",
        }}
      >
        <div className="invoice-header">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBackButton}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          <h1>Invoice</h1>
        </div>
        <div className="invoice-display">
          <div
            className="client-info"
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <table>
              <tr>
                <td>
                  <strong>Issuer :</strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  {userProfile?.name.givenName} {userProfile?.name.middleName}{" "}
                  {userProfile?.name.familyName}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Client :</strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>{client?.client_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Company :</strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  {client?.billing_details.company_name}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Address :</strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  {client?.billing_details.unit_number},{" "}
                  {client?.billing_details.street_name}{" "}
                  {client?.billing_details.building_name},
                  <br />
                  {client?.billing_details.postal_code},{" "}
                  {client?.billing_details.city},
                  <br />
                  {client?.billing_details.country}
                </td>
              </tr>
            </table>
          </div>
          <div className="invoicing-details">
            <table>
              <tr>
                <td>
                  <strong>ID : </strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>{invoice_id}</td>
              </tr>
              <tr>
                <td>
                  <strong>Project : </strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>{project?.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Issued Date : </strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>{invoice?.issuedDate}</td>
              </tr>
              <tr>
                <td>
                  <strong>Due Date : </strong>
                </td>
                <td style={{ paddingLeft: "10px" }}>{dueDate?.toString()}</td>
              </tr>
            </table>
          </div>

          <div className="invoice-task-details" style={{ marginTop: "30px" }}>
            <TableContainer>
              <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Task</StyledTableCell>
                      <StyledTableCell align="center">Rate</StyledTableCell>
                      <StyledTableCell align="center">Hour</StyledTableCell>
                      <StyledTableCell align="center">Amount</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timeTrack.length > 0 &&
                      timeTrack.map((i: any) => (
                        <StyledTableRow key={i.id}>
                          <StyledTableCell align="center">
                            {i?.taskName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project?.rate}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {i?.timeSpent}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project && project?.rate * i?.timeSpent}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    <TableRow>
                      <TableCell />
                      <TableCell colSpan={2} align="right">
                        Total Amount
                      </TableCell>
                      <TableCell align="center">{invoice?.amount}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDisplay;
