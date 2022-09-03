import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useGlobalContext } from "../../context/clientContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

const NewTimeForm = () => {
  const { clientList, setClientList } = useGlobalContext();
  const navigate = useNavigate();
  const clientOptions: any = clientList.map((c) => {
    return { id: c._id, name: c.client_name };
  });

  console.log("client options", clientOptions);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      client_id: { value: string };
      project_id: { value: string };
      task_id: { value: string };
    };
  };

  return (
    <div>
      <p>new Time Tracker</p>
      <Box style={{ marginTop: "0px" }}>
        <form onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}>
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
            {/* 
            <Button
              color="success"
              variant="contained"
              onClick={() => navigate("/clients/new")}
            >
              + New Client
            </Button> */}
            <TextField
              select
              name="project_id"
              label="*Project"
              // defaultValue={projectOptions[0].id}
            />

            <TextField
              select
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
        </form>
      </Box>
    </div>
  );
};

export default NewTimeForm;
