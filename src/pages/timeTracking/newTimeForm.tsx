import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project } from "../../types/project";
import { Task } from "../../types/task";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewTimeForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState("");

  // Get user's all projects:
  const getUsersAllProjects = async () => {
    const user_id = "630ee57c4e9cd2d99b739643"; // hardcoded user id
    const getProjects = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/projects/all`,
      { params: { user_id: user_id } }
    );
    // console.log("all projects: ", getProjects.data.projects);
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
    console.log("tasks: ", getDefaultTasks.data.tasks);
    setTaskList(getDefaultTasks.data.tasks);
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
    console.log("tasks: ", getTasks.data.tasks);
    setTaskList(getTasks.data.tasks);
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProject(event.target.value);
    setTaskList([]);
    getTasksBySelectedProject(event.target.value);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTask(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      project_id: { value: string };
      task_id: { value: string };
    };
    console.log("target: ", target);
  };

  console.log("task list: ", taskList);
  console.log("task options: ", taskOptions);

  useEffect(() => {
    getUsersAllProjects();
  }, []);

  return (
    <div>
      <p>New Time Tracker</p>
      <Box style={{ marginTop: "0px" }}>
        {/* <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}> */}
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
            value="Submit"
          >
            Start Tracker
          </Button>
        </div>
        {/* </form> */}
      </Box>
    </div>
  );
};

export default NewTimeForm;
