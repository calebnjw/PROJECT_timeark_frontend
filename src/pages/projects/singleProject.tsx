import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TimeAndEarningsChart from "./roseChart";

import axios from "axios";
axios.defaults.withCredentials = true;

const SingleProject = () => {
  const [chartData, setChartData] = useState<any>([]);
  const navigate = useNavigate();
  const { clientList } = useGlobalContext();
  let { project_id } = useParams();
  const [project, setProject] = useState<Project>();
  const [taskList, setTaskList] = useState<Task[]>();

  const client = clientList.find((c) => {
    if (c._id === project?.client_id) {
      return c;
    }
  });

  const computeEarnings = () => {
    let projectEarnings = 0;
    chartData.forEach((e: any) => {
      projectEarnings += e.value;
    });
    return projectEarnings.toFixed(2);
  };

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const getProject = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects/${project_id}`
        );
        setProject(getProject.data.project);
        setChartData(getProject.data.taskTimeEarnings);

        // Get project task list
        const getTasks = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/tasks`,
          {
            params: { project_id: project_id },
          }
        );

        setTaskList(getTasks.data.tasks);
      } catch (error) {
        console.log("Error message: ", error);
      }
    };
    getProjectInfo();
  }, []);

  const handleFormatDate = (date: any) => {
    const dateStr = format(new Date(date), "MM/dd/yyyy");
    return String(dateStr);
  };

  const computeTime = (timeArr: any) => {
    const timeSpentArr = timeArr.map((t: any) => {
      const endDate: any = new Date(t.endDate);
      const startDate: any = new Date(t.startDate);
      const timeDifference = endDate - startDate;
      const hours = timeDifference / (1000 * 60 * 60);
      return hours.toFixed(2);
    });
    const totalTime = timeSpentArr.reduce(
      (a: any, b: any) => Number(a) + Number(b)
    );
    return totalTime;
  };

  return (
    <Box
      style={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      sx={{ flexGrow: 1 }}
    >
      <Card style={{ width: "90%" }} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            <b>Project Details: </b>
          </Typography>
          <hr />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Box style={{ marginTop: "50px" }}>
              <Typography variant="h6">{client?.client_name}</Typography>
              <Typography>
                <b>Name: </b>
                {project?.name}
              </Typography>
              <Typography>
                <b>Budget(S$): </b>
                {project?.budget}
              </Typography>
              <Typography>
                <b>Rate(S$/hour): </b>
                {project?.rate}
              </Typography>
              <Typography>
                <b>Due Date: </b>
                {project?.due_date && handleFormatDate(project.due_date)}
              </Typography>
              <Box
                style={{
                  marginTop: "25px",
                  color: "green",
                }}
              >
                <Typography variant="h6">
                  <b>Current Earnings:</b>
                  {"S$"} {computeEarnings()}
                </Typography>
              </Box>
            </Box>
            <TimeAndEarningsChart chartData={chartData} />
          </Box>
          <Stack direction="row" spacing={2} style={{ width: "100%" }}>
            <Box style={{ width: "50%", textAlign: "center" }}>
              <Button
                variant="contained"
                style={{ width: "140px" }}
                color="secondary"
                onClick={() => {
                  navigate("/app/projects");
                }}
              >
                Back
              </Button>
            </Box>
            <Box style={{ width: "50%", textAlign: "center" }}>
              <Button
                variant="contained"
                style={{ width: "140px" }}
                color="primary"
                onClick={() => {
                  navigate(`/app/projects/${project?._id}/update`, {
                    state: project,
                  });
                }}
              >
                Edit
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <Card style={{ width: "90%", marginTop: "10px" }} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>Tasks</b>
          </Typography>
          <hr />
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                  >
                    <b>Name</b>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                  >
                    <b>Category</b>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                  >
                    <b>Status</b>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                  >
                    <b>Time(h)</b>
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      textAlign: "center",
                      fontSize: "large",
                    }}
                  >
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ width: "100%" }}>
                {taskList?.map((task) => (
                  <TableRow key={task._id} style={{ width: "100%" }}>
                    <TableCell style={{ width: "30%", textAlign: "center" }}>
                      {task.name}
                    </TableCell>
                    <TableCell style={{ width: "30%", textAlign: "center" }}>
                      {task.category}
                    </TableCell>
                    <TableCell style={{ width: "30%", textAlign: "center" }}>
                      {task.isDone ? "Done" : "In Process"}
                    </TableCell>
                    <TableCell style={{ width: "30%", textAlign: "center" }}>
                      {task.time_trackings.length
                        ? computeTime(task.time_trackings)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        <Link
                          to={`/app/projects/${project?._id}/tasks/${task._id}/update`}
                          state={{ project, task }}
                          style={{
                            width: "100%",
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Update
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ width: "140px" }}
              color="primary"
              onClick={() => {
                navigate(`/app/tasks/new`);
              }}
            >
              Add New Task
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleProject;
