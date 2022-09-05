import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import axios from "axios";
axios.defaults.withCredentials = true;

const SingleProject = () => {
  const navigate = useNavigate();
  const { clientList } = useGlobalContext();
  let { project_id } = useParams();
  console.log("project id: ", project_id);
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
          { params: { project_id: project_id } }
        );

        console.log("tasks arr: ", getTasks.data.tasks);
        setTaskList(getTasks.data.tasks);
      } catch (error) {
        console.log("Error message: ", error);
      }
    };
    getProjectInfo();
  }, []);

  console.log("project info: ", project);
  console.log("client name: ", client);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/projects");
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/projects/${project?._id}/update`, { state: project });
            }}
          >
            Edit
          </Button>
        </Stack>
        <h3>Project Details: </h3>
        <div>
          <h5>{client?.client_name}</h5>
          <p>Project Name: {project?.name}</p>
          <p>Project Budget: {project?.budget}</p>
          <p>Project Rate: {project?.rate}</p>
          <p>Project Due Date: {project?.due_date}</p>
          <div>
            <p>
              Tasks:
              {taskList?.map((task) => (
                <li key={task._id}>
                  <Link to={`tasks/${task._id}`} state={{ project, task }}>
                    {task.name}
                  </Link>
                </li>
              ))}{" "}
            </p>
          </div>
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/tasks/new`);
          }}
        >
          Add New Task
        </Button>
      </div>
    </>
  );
};

export default SingleProject;
