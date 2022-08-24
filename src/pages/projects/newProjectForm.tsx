import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import React from "react";

const newProjectForm = () => {
  return (
    <div>
      <Button>
        <Link to="/projects">Cancel</Link>
      </Button>
      <Button>Submit</Button>
      <h3>newProjectForm</h3>
    </div>
  );
};

export default newProjectForm;
