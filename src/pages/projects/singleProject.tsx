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

import axios from "axios";
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

  return (
    <>
      <Box
        style={{
          width: "100%",
          marginLeft: "15%",
          marginTop: "80px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        sx={{ flexGrow: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/app/projects");
            }}
          >
            Back
          </Button>
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
        </Stack>
        <Card style={{ width: "50%" }} sx={{ minWidth: 275 }}>
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
          </CardContent>
        </Card>
        <Box>
          <div>
            <p>
              Tasks:
              {taskList?.map((task) => (
                <li key={task._id}>
                  <Link to={`app/tasks/${task._id}`} state={{ project, task }}>
                    {task.name}
                  </Link>
                </li>
              ))}{" "}
            </p>
          </div>
        </Box>
        <br />
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
    </>
  );
};

export default SingleProject;
