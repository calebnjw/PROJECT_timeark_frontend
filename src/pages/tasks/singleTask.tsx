import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Project } from "../../types/project";
import { Task } from "../../types/task";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
axios.defaults.withCredentials = true;

const SingleTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let { task_id } = useParams();
  console.log("task id: ", task_id);

  const { project }: any = location.state;
  const { task }: any = location.state;

  console.log("project info: ", project._id);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/projects/${project._id}/tasks/${task._id}/update`, {
                state: { task, project },
              });
            }}
          >
            Edit
          </Button>
        </Stack>
        <h3>Task Details: </h3>
        <div>
          <p>Task Name: {task.name}</p>
          <p>Project Name: {project.name}</p>
          <p>Category: {task.category}</p>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
