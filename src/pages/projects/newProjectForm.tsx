import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import React from "react";

const newProjectForm = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%" }}>
        <Button>
          <Link to="/projects">Cancel</Link>
        </Button>
        <Button>Submit</Button>
        <h3>newProjectForm</h3>
      </div>
    </>
  );
};

export default newProjectForm;
