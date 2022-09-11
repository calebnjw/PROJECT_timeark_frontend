import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/clientContext";
import Button from "@mui/material/Button";
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
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  userId: string;
  handleAddTimeEntry: any;
}

const NewTimeForm = ({
  setOpen,
  taskList,
  setTaskList,
  userId,
  handleAddTimeEntry,
}: Props) => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [taskLocalList, setTaskLocalList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const navigate = useNavigate();

  // Get user's all projects:
  const getUsersAllProjects = async () => {
    const getProjects = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/projects/all`,
      { params: { user_id: userId } }
    );
    const projects = getProjects.data.projects;
    // console.log("projects: ", projects);

    const projectsHasTasks = projects.filter((p: any) => p.task_ids.length);
    setProjectList(projectsHasTasks);

    // Get default task list:
    const defaultProjectId = projectsHasTasks[0]._id;
    const getDefaultTasks = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      { params: { project_id: defaultProjectId } }
    );
    setTaskLocalList(getDefaultTasks.data.tasks);

    // Set default selected task
    const defaultTasks = getDefaultTasks.data.tasks;
    const defaultTaskId = defaultTasks[0]._id;
    setSelectedTask(defaultTaskId);
    return projectsHasTasks;
  };

  const projectOptions: any = projectList.map((p) => {
    return { id: p._id, name: p.name };
  });

  const taskOptions: any = taskLocalList.map((t) => {
    return { id: t._id, name: t.name };
  });

  // Get tasks by selected project
  const getTasksBySelectedProject = async (selectedProject: any) => {
    const getTasks = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/tasks`,
      { params: { project_id: selectedProject } }
    );
    const tasks = getTasks.data.tasks;
    setTaskLocalList(tasks);

    // set default selected task according to selected project
    setSelectedTask("");
    setSelectedTask(tasks[0]._id);

    return tasks;
  };

  const handleProjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProject(event.target.value);
    setTaskLocalList([]);
    getTasksBySelectedProject(event.target.value);
  };

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTask("");
    setSelectedTask(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedTask) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedTask}/timetrackings`
        );
        const updatedTask = result.data.task;
        console.log("form: updated task: ", updatedTask);
        handleAddTimeEntry(updatedTask);
        setOpen(false);
      } catch (error) {
        console.log("Error message: ", error);
      }
    }
  };

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
      </Box>
    </div>
  );
};

export default NewTimeForm;
