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

interface Props {
  projectList: Project[];
}

const SingleProject = ({ projectList }: Props) => {
  if (!projectList.length) {
    return (
      <div>
        <button>Add new project</button>
        <p>Client has no on going project!</p>
      </div>
    );
  }
  return (
    <div>
      <button>Add new project</button>

      {projectList.map((p, idx) => (
        <li key={idx}>{p.name}</li>
      ))}
    </div>
  );
};

export default SingleProject;
