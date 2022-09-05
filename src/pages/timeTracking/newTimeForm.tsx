import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { useNavigate } from "react-router-dom";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTimeForm = ({ setOpen }: Props) => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const navigate = useNavigate();

  // Get user's all projects:
  const getUsersAllProjects = async () => {
    const user_id = "630ee57c4e9cd2d99b739643"; // hardcoded user id
    const getProjects = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/projects/all`,
      { params: { user_id: user_id } }
    );
    const projects = getProjects.data.projects;
    const projectsHasTasks = projects.filter((p: any) => p.task_ids.length);
    console.log("projects with tasks: ", projectsHasTasks);
    setProjectList(projectsHasTasks);

    // Get default task list:
    const defaultProjectId = projectsHasTasks[0]._id;
    const getDefaultTasks = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      { params: { project_id: defaultProjectId } }
    );
    setTaskList(getDefaultTasks.data.tasks);

    // Set default selected task
    const defaultTasks = getDefaultTasks.data.tasks;
    const defaultTaskId = defaultTasks[0]._id;
    console.log("defaut task id: ", defaultTaskId);
    setSelectedTask(defaultTaskId);
    return projectsHasTasks;
  };

  const projectOptions: any = projectList.map((p) => {
    return { id: p._id, name: p.name };
  });

  const taskOptions: any = taskList.map((t) => {
    return { id: t._id, name: t.name };
  });

  // Get tasks by selected project
  const getTasksBySelectedProject = async (selectedProject: any) => {
    const getTasks = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      { params: { project_id: selectedProject } }
    );
    const tasks = getTasks.data.tasks;
    setTaskList(tasks);

    // set default selected task according to selected project
    console.log("task list: ", tasks[0]._id);
    setSelectedTask("");
    setSelectedTask(tasks[0]._id);

    return tasks;
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProject(event.target.value);
    setTaskList([]);
    getTasksBySelectedProject(event.target.value);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTask("");
    setSelectedTask(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("task id: ", selectedTask);
    console.log("you clicked: ");
    if (selectedTask) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedTask}/timetrackings`
        );
        console.log("added time tracking: ", result.data.task);
        setOpen(false);
        navigate(`/time`);
      } catch (error) {
        console.log("Error message: ", error);
      }
    }
  };

  console.log("selected task: ", selectedTask);

  useEffect(() => {
    getUsersAllProjects();
  }, []);

  return (
    <div>
      <p>New Time Tracker</p>
      <Box style={{ marginTop: "0px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            height: "200px",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {projectOptions.length ? (
            <>
              <TextField
                select
                name="project_id"
                label="*Project"
                defaultValue={projectOptions[0].id}
                onChange={handleProjectChange}
              >
                {projectOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>Loading Project Options</>
          )}
          {/* </div>
        <div> */}
          {taskOptions.length ? (
            <>
              <TextField
                select
                name="task_id"
                label="*Task"
                defaultValue={taskOptions[0].id}
                onChange={handleTaskChange}
              >
                {taskOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <>Loading Task Options</>
          )}
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Start Tracker
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
        {/* </form> */}
      </Box>
    </div>
  );
};

export default NewTimeForm;
