import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project } from "../../types/project";
import Typography from "@mui/material/Typography";

import axios from "axios";
axios.defaults.withCredentials = true;

const EditTaskForm = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryExists, setCategoryExist] = useState<boolean>(false);
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
        {
          params: { client_id: project.client_id, autoCorrect: true },
        }
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

    try {
      const result: any = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${task_id}/update`,
        updateTask
      );

      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteButton = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${task_id}`
      );
      navigate(-1);
    } catch (error) {
      console.log("Error message: ", error);
    }

    return;
  };
  return (
    <Box style={{ width: "100%", marginTop: "90px", marginLeft: "20%" }}>
      <Typography variant="h5">Edit Task</Typography>
      <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)} style={{}}>
        {" "}
        <Box
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
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
        </Box>
        {projectList.length ? (
          <Box>
            <TextField
              select
              name="project_id"
              label="*Project"
              sx={{ width: 600 }}
              defaultValue={project._id}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              {projectOptions.map((option?: { id: string; name: string }) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ) : (
          <>Loading Project Options</>
        )}
        {!categoryExists ? (
          <></>
        ) : (
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              select
              name="category"
              label="*Category"
              sx={{ width: 600 }}
              defaultValue={task.category}
              style={{ marginTop: "10px", marginBottom: "10px" }}
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
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <MenuItem value={false as any}>In Progress</MenuItem>
              <MenuItem value={true as any}>Done</MenuItem>
            </TextField>
          </Box>
        )}
        <Box
          style={{
            marginTop: "0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "600px",
          }}
        >
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteButton}
            style={{ width: "150px" }}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCancelButton}
            style={{ width: "150px" }}
          >
            CANCEL
          </Button>
          <Button
            type="submit"
            value="Submit"
            variant="contained"
            style={{ width: "150px" }}
          >
            Update Task
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default EditTaskForm;
