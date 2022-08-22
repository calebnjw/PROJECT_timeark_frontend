import React from "react";
import Navbar from "../../components/navbar"

import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const Projects = () => {
  return <div>Show current clients' all projects list: </div>;
};

export default Projects;
