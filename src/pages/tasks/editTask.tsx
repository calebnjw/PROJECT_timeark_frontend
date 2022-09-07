import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

const EditTaskForm = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryExists, setCategoryExist] = useState<boolean>(false);
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();

  let { project_id, task_id } = useParams();

  const { project }: any = location.state;
  const { task }: any = location.state;

  function getCategoryOptions() {
    projectList.map((c) => {
      if (c._id === project_id) {
        setCategoryList(c.category_name);
        return c.category_name;
      } else return null;
    });
  }

  const handleCancelButton = () => {
    navigate(-1);
  };

  const projectOptions: any = projectList.map((c) => {
    return { id: c._id, name: c.name };
  });

  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        { params: { client_id: project.client_id, autoCorrect: true } }
      );
      setProjectList(result.data.projects);
    };
    getProjects();
    if (projectList.length !== 0) {
      getCategoryOptions();
      setCategoryExist(true);
    }
  }, [projectList]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      category: { value: string };
      project_id: { value: string };
      isDone: { value: boolean };
    };

    const updateTask = {
      name: target.name.value,
      category: target.category.value,
      project_id: target.project_id.value,
      isDone: target.isDone.value,
    };

    console.log("update task: ", updateTask);
    try {
      const result: any = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${task_id}/update`,
        updateTask
      );

      navigate(`/projects`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box style={{ width: "80%", marginLeft: "32%", marginTop: "90px" }}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleCancelButton}
        >
          CANCEL
        </Button>
        <h3>Edit Task</h3>
        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            <TextField
              type="text"
              name="name"
              label="*Task Name"
              defaultValue={task.name}
            />
          </div>
          {projectList.length ? (
            <>
              <TextField
                select
                name="project_id"
                label="*Project"
                sx={{ width: 600 }}
                defaultValue={project._id}
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
          {!categoryExists ? (
            <></>
          ) : (
            <>
              <TextField
                select
                name="category"
                label="*Category"
                sx={{ width: 600 }}
                defaultValue={task.category}
              >
                {categoryList.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="isDone"
                label="*Status"
                sx={{ width: 600 }}
                defaultValue={task.isDone}
              >
                <MenuItem value={false as any}>In Progress</MenuItem>
                <MenuItem value={true as any}>Done</MenuItem>
              </TextField>
            </>
          )}
          <Button type="submit" value="Submit" variant="contained">
            Update Task
          </Button>
        </form>
      </Box>
    </>
  );
};
export default EditTaskForm;
