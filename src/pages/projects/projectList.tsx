import React, { useEffect, useState } from "react";
import { Project } from "../../types/project";
import axios from "axios";
axios.defaults.withCredentials = true;

import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NewProjectForm from "./newProjectForm";

interface Props {
  projectList: Project[];
  selectedClient: string;
}

const ProjectList = ({ projectList, selectedClient }: Props) => {
  if (!projectList.length) {
    return (
      <>
        <Button component={Link} to="/projects/new">
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography> New Project</Typography>
        </Button>
        <p>Client has no on going project!</p>
      </>
    );
  }
  return (
    <>
      <Button>
        <AddCircleOutlineIcon fontSize="medium" />
        <Link to="newProject" state={{ selectedClient: selectedClient }}>
          New Project
        </Link>
      </Button>

      {projectList.map((p, idx) => (
        <li key={idx}>{p.name}</li>
      ))}
    </>
  );
};

export default ProjectList;
