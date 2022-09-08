import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewProjectForm = () => {
  const { clientList, setClientList } = useGlobalContext();

  const navigate = useNavigate();

  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  console.log("client options: ", clientOptions);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      budget: { value: number };
      rate: { value: number };
      due_date: { value: Date };
      category_name: { value: [] };
      client_id: { value: string };
    };

    const newProject = {
      name: target.name.value,
      budget: Number(target.budget.value),
      rate: Number(target.rate.value),
      due_date: target.due_date.value,
      category_name: target.category_name.value.split(","),
      client_id: target.client_id.value,
    };

    if (newProject) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/projects/new`,
          newProject
        );
        console.log("added new project:", result.data);
        const project_id: any = result.data.project_id;
        console.log("project id: ", project_id);
        const newClientList: any = clientList.map((c) => {
          if (c._id === newProject.client_id) {
            return { ...c, project_ids: [...c.project_ids, project_id] };
          }
          return c;
        });

        setClientList(newClientList);
        navigate(`/projects/${project_id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Box style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <Button variant="contained" color="secondary">
          <Link to="/projects" style={{ color: "white" }}>
            Cancel
          </Link>
        </Button>
        <h3>New Project</h3>

        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              height: "500px",
              justifyContent: "space-around",
            }}
          >
            {clientOptions.length ? (
              <TextField select name="client_id" label="*Client" defaultValue={clientOptions[0].id}>
                {clientOptions.map((option?: { id: string; name: string }) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>Loading Client Options</>
            )}

            <Button color="success" variant="contained" onClick={() => navigate("/clients/new")}>
              + New Client
            </Button>
            <TextField type="text" name="name" label="*Project Name" />
            <TextField type="number" name="budget" label="*Budget" />
            <TextField type="number" name="rate" label="*Rate" />
            <TextField type="date" name="due_date" label="*Due Date" defaultValue={"2022-08-26"} />
            <TextField name="category_name" label="Category" multiline />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit" value="Submit">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default NewProjectForm;
