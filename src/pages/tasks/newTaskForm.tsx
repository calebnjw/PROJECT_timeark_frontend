import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Project } from "../../types/project";
// import DatesButton from "../timeTracking/datesButtons";

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
      console.log(NewTask);
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
    console.log(selectedProject);
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
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        {
          params: { client_id: selectedClient, autoCorrect: true },
        }
      );
      if (result.data.msg === "no project found") {
        setProjectExists(false);
      }
      setProjectExists(true);
      setProjectList(result.data.projects);
      console.log(result.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelButton = () => {
    navigate(-1);
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
      <Box style={{ width: "100%", textAlign: "center", marginTop: "90px" }}>
        <h3>New Task</h3>
        <form onSubmit={(e: React.SyntheticEvent) => handleGetProject(e)}>
          <div
            style={{
              width: "100%",
            }}
          >
            {clientOptions.length ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <TextField
                  select
                  name="client_id"
                  label="*Client"
                  defaultValue=""
                  onChange={selectedClientChange}
                  style={{ width: "600px", marginLeft: "23%" }}
                >
                  {clientOptions.map(
                    (option?: { id: string; name: string }) => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
                <Button onClick={handleGetProject}>Get Projects</Button>
              </Box>
            ) : (
              <>Loading Client Options</>
            )}
          </div>
        </form>
        <Button
          color="secondary"
          style={{ width: "600px" }}
          variant="contained"
          onClick={handleCancelButton}
        >
          CANCEL
        </Button>
      </Box>
      {!projectExists ? (
        <Box
          style={{
            marginTop: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            style={{ width: "600px" }}
            color="success"
            onClick={() => {
              navigate(`/app/projects/new`);
            }}
          >
            Add Project
          </Button>
        </Box>
      ) : (
        <Box style={{ width: "80%", marginLeft: "32%", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              justifyContent: "space-around",
            }}
          >
            {projectList.length ? (
              <>
                <TextField
                  select
                  name="project_id"
                  label="*Project"
                  onChange={selectedProjectChange}
                  defaultValue=""
                >
                  {projectOptions.map(
                    (option?: { id: string; name: string }) => (
                      <MenuItem key={option?.id} value={option?.id}>
                        {option?.name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </>
            ) : (
              <>Loading Project Options</>
            )}
          </div>
        </Box>
      )}
      {!categoryExists ? (
        <></>
      ) : (
        <Box style={{ width: "80%", marginLeft: "32%", marginTop: "20px" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              // height: "500px",
              justifyContent: "space-around",
            }}
          >
            {categoryList.length ? (
              <>
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
                <br />
                <TextField
                  name="task"
                  label="task"
                  onChange={selectedTaskChange}
                />
                <br />
                <Button
                  variant="contained"
                  color="success"
                  onClick={submitNewTask}
                >
                  Create Task
                </Button>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default NewTaskFrom;
