import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewProjectForm = () => {
  const { clientList, setClientList } = useGlobalContext();

  const navigate = useNavigate();

  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

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
        navigate(`/app/projects/${project_id}`);
      } catch (error) {
        console.error(error);
      }
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
              New Project
            </Typography>
            {clientOptions.length ? (
              <TextField
                select
                name="client_id"
                label="*Client"
                defaultValue={clientOptions[0].id}
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

            <Button
              color="success"
              variant="contained"
              onClick={() => navigate("/app/clients/new")}
              style={{ height: "40px" }}
            >
              + New Client
            </Button>
            <TextField type="text" name="name" label="*Project Name" />
            <TextField type="number" name="budget" label="*Budget(S$)" />
            <TextField type="number" name="rate" label="*Rate(S$/hour)" />
            <TextField
              type="date"
              name="due_date"
              label="*Due Date"
              defaultValue={dayjs(new Date()).format("YYYY-MM-DD")}
            />
            <TextField name="category_name" label="Category" multiline />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" color="secondary">
                <Link
                  to="/app/projects"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Cancel
                </Link>
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="Submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};

export default NewProjectForm;
