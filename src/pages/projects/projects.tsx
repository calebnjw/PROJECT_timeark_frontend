import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const Projects = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProjectSidebar />
      <div style={{ textAlign: "center" }}>Project list: </div>
    </div>
  );
};

export default Projects;
