import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import axios from "axios";
axios.defaults.withCredentials = true;

const EditProjectForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();

  const location = useLocation();
  const projectInfo: any = location.state;
  const client = clientList.find((c) => {
    if (c._id === projectInfo.client_id) {
      return c;
    }
  });
  const clientName = client?.client_name;

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
      client_id: client?._id,
    };

    console.log("new project: ", newProject);
    if (newProject) {
      try {
        const result = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/projects/${projectInfo._id}/update`,
          newProject
        );

        navigate(`/app/projects/${projectInfo._id}`);
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
        <h3>Update Project</h3>
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
            <h4>{clientName}</h4>
            <TextField
              type="text"
              name="name"
              label="*Project Name"
              defaultValue={projectInfo.name}
            />
            <TextField
              type="number"
              name="budget"
              label="*Budget"
              defaultValue={projectInfo.budget}
            />
            <TextField type="number" name="rate" label="*Rate" defaultValue={projectInfo.rate} />
            <TextField
              type="date"
              name="due_date"
              label="*Due Date"
              defaultValue={projectInfo.due_date.slice(0, 10)}
            />
            <TextField
              name="category_name"
              label="Category"
              multiline
              defaultValue={projectInfo.category_name}
            />
          </div>
          <div>
            <Button type="submit" value="Submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default EditProjectForm;
