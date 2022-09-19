import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewTaskFrom = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectExists, setProjectExists] = useState<boolean>(false);
  const [categoryExists, setCategoryExist] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const navigate = useNavigate();

  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  const projectOptions: any = projectList.map((c) => {
    return { id: c._id, name: c.name };
  });

  function submitNewTask() {
    const NewTask = {
      name: selectedTask,
      category: selectedCategory,
      isDone: false,
      project_id: selectedProject,
    };

    try {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks/new`, NewTask);
      navigate(`/app/projects/${selectedProject}`);
    } catch (error) {
      console.error(error);
    }
  }

  function getCategoryOptions() {
    projectList.map((c) => {
      if (c._id === selectedProject) {
        setCategoryList(c.category_name);
        return c.category_name;
      } else return null;
    });
  }

  useEffect(() => {
    if (selectedProject !== "") {
      setCategoryExist(true);
      getCategoryOptions();
    }
  }, [selectedProject]);

  const selectedClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClient(e.target.value);
  };

  const selectedProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProject(e.target.value);
  };

  const selectedCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectedCategory(e.target.value);
  };

  const selectedTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTask(e.target.value);
  };

  const handleGetProject = async (e: any) => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
        params: { client_id: selectedClient, autoCorrect: true },
      });
      if (result.data.msg === "no project found") {
        setProjectExists(false);
      }
      setProjectExists(true);
      setProjectList(result.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelButton = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        maxWidth: "60vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack direction="column" spacing={5}>
        <Typography variant="h4" textAlign={"center"}>
          New Task
        </Typography>
        {clientOptions.length ? (
          <Stack spacing={2}>
            <TextField
              select
              name="client_id"
              label="*Client"
              defaultValue=""
              onChange={selectedClientChange}
            >
              {clientOptions.map((option?: { id: string; name: string }) => (
                <MenuItem key={option?.id} value={option?.id}>
                  {option?.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" onClick={handleGetProject}>
              Get Projects
            </Button>
          </Stack>
        ) : (
          <>Loading Client Options</>
        )}
        {/* </div> */}
        {/* </form> */}
        {!projectExists ? (
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/app/projects/new`);
            }}
          >
            New Project
          </Button>
        ) : (
          <Stack spacing={2}>
            {projectList.length ? (
              <TextField
                select
                name="project_id"
                label="*Project"
                onChange={selectedProjectChange}
                defaultValue=""
              >
                {projectOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>Loading Project Options</>
            )}
          </Stack>
        )}
        {!categoryExists ? (
          <></>
        ) : (
          <>
            {categoryList.length ? (
              <Stack spacing={2}>
                <TextField
                  select
                  name="category_name"
                  label="*Category"
                  onChange={selectedCategoryChange}
                  defaultValue=""
                >
                  {console.log("categorylist", categoryList)}
                  {categoryList.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField name="task" label="task" onChange={selectedTaskChange} />
                <Button variant="contained" color="success" onClick={submitNewTask}>
                  Create Task
                </Button>
              </Stack>
            ) : (
              <></>
            )}
          </>
        )}
        <Button fullWidth color="secondary" variant="contained" onClick={handleCancelButton}>
          CANCEL
        </Button>
      </Stack>
    </Box>
  );
};
export default NewTaskFrom;
