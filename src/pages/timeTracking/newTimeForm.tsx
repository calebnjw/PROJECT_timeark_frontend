import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Project, ProjectOption } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewTimeForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);

  useEffect(() => {
    const getUsersAllProjects = async () => {
      const projectsArr = await Promise.all(
        clientList.map(async (c) => {
          const projects = await Promise.all(
            c.project_ids.map(async (p) => {
              try {
                const getProject = await axios.get(
                  `${process.env.REACT_APP_BACKEND_URL}/projects/${p}`
                );
                const project = getProject.data.project;
                if (project.task_ids.length) {
                  return {
                    projectId: project._id,
                    projectName: project.name,
                    clientName: c.client_name,
                    task_ids: project.task_ids,
                  };
                } else {
                  return null;
                }
              } catch (error) {
                console.log("Error message: ", error);
              }
            })
          );
          return projects;
        })
      );
      const availableProjects = projectsArr.flat();
      console.log("availableProjects: ", availableProjects);
    };
    getUsersAllProjects();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      project_id: { value: string };
      task_id: { value: string };
    };
  };

  return (
    <div>
      <p>new Time Tracker</p>
      <Box style={{ marginTop: "0px" }}>
        {/* <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              height: "200px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {projectOptions.length ? (
              <TextField
                select
                name="client_id"
                label="*Client"
                defaultValue={projectOptions[0]._id}
              >
                {clientOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>Loading Client Options</>
            )}
            <TextField
              name="task_id"
              label="*Task"
              // defaultValue={taskOptions[0].id}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Submit"
            >
              Start Tracker
            </Button>
          </div>
        </form> */}
      </Box>
    </div>
  );
};

export default NewTimeForm;
