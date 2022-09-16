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
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import axios from "axios";
import { Tab } from "@mui/material";
axios.defaults.withCredentials = true;

const SingleProject = () => {
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

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const getProject = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects/${project_id}`
        );
        setProject(getProject.data.project);

        const getTasks = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/tasks`,
          {
            params: { project_id: project_id },
          }
        );

        console.log("tasks arr: ", getTasks.data.tasks);
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
    console.log("time arr", totalTime);
    return totalTime;
  };

  return (
    <>
      <Box
        style={{
          width: "100%",
<<<<<<< HEAD
          marginLeft: "5%",
          marginTop: "30px",
=======
>>>>>>> 6bad6560e92294b6a7ec6163e0a1e2ad8a07f208
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        sx={{ flexGrow: 1 }}
      >
        <Card style={{ width: "80%" }} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5">Project Details: </Typography>
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
            <Stack direction="row" spacing={2} style={{ width: "100%" }}>
              <Box style={{ width: "50%", textAlign: "center" }}>
                <Button
                  variant="contained"
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
        <Card
          style={{ width: "80%", marginTop: "10px" }}
          sx={{ minWidth: 275 }}
        >
          <CardContent>
            <TableContainer>
              <Typography gutterBottom variant="h6" component="div">
                Tasks
              </Typography>
              <Table
                sx={{ minWidth: 650 }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "20%", textAlign: "center" }}>
                      Name
                    </TableCell>
                    <TableCell style={{ width: "20%", textAlign: "center" }}>
                      Category
                    </TableCell>
                    <TableCell style={{ width: "20%", textAlign: "center" }}>
                      Status
                    </TableCell>
                    <TableCell style={{ width: "20%", textAlign: "center" }}>
                      Time(h)
                    </TableCell>
                    <TableCell
                      style={{ width: "20%", textAlign: "center" }}
                    ></TableCell>
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
                        <Link
                          to={`/app/projects/${project?._id}/tasks/${task._id}/update`}
                          state={{ project, task }}
                          style={{ width: "100%" }}
                        >
                          Update
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}{" "}
                </TableBody>
              </Table>
            </TableContainer>
            <Box style={{ marginTop: "10px", textAlign: "center" }}>
              <Button
                variant="contained"
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
    </>
  );
};

export default SingleProject;
