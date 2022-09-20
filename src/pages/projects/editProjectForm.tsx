import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import axios from "axios";
axios.defaults.withCredentials = true;

const EditProjectForm = () => {
  const { clientList } = useGlobalContext();
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

  const handleDeleteProject = async () => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/projects/${projectInfo._id}`
      );
      navigate(`/app/projects`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        style={{
          width: "100%",
          marginTop: "30px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        sx={{ flexGrow: 1 }}
      >
        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "600px",
              height: "580px",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="h4"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Update Project
            </Typography>
            <Typography>
              <b>Client: {clientName}</b>{" "}
            </Typography>
            <TextField
              type="text"
              name="name"
              label="*Project Name"
              defaultValue={projectInfo.name}
            />
            <TextField
              type="number"
              name="budget"
              label="*Budget(S$)"
              defaultValue={projectInfo.budget}
            />
            <TextField
              type="number"
              name="rate"
              label="*Rate(S$/hour)"
              defaultValue={projectInfo.rate}
            />
            <TextField
              type="date"
              name="due_date"
              label="*Due Date"
              defaultValue={projectInfo.due_date.slice(0, 10)}
            />
            <TextField
              name="category_name"
              label="*Category"
              multiline
              defaultValue={projectInfo.category_name}
            />

            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={handleDeleteProject}
                style={{ width: "150px" }}
              >
                Delete
              </Button>
              <Button variant="contained" color="secondary">
                <Link
                  to="/app/projects"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    width: "150px",
                  }}
                >
                  Cancel
                </Link>
              </Button>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                style={{ width: "150px" }}
              >
                Submit
              </Button>
            </Grid>
          </div>
        </form>
      </Box>
    </>
  );
};

export default EditProjectForm;
