import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { useGlobalContext } from "../../context/clientContext";
import SingleProject from "./singleProject";
import { Project } from "../../types/project";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import axios from "axios";
axios.defaults.withCredentials = true;

const Projects = () => {
  let initalSelectedClient;
  const { clientList, setClientList } = useGlobalContext();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    if (selectedClient) {
      const getProjects = async () => {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects`,
          { params: { client_id: selectedClient, autoCorrect: true } }
        );
        setProjectList(result.data.projects);
      };
      getProjects();
      // setSelectedClient("");
    }
  }, [selectedClient]);

  console.log("projects: ", projectList);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProjectSidebar
        setSelectedClient={setSelectedClient}
        clientList={clientList}
      />
      <div style={{ textAlign: "center" }}>
        Project list:
        {projectList && <SingleProject projectList={projectList} />}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Button component={Link} to="/clients/new">
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography>Add New Client</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default Projects;
