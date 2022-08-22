import { useState, useEffect } from "react";
import NavBar from "../../components/navbar";
import Footer from "../../components/footer";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Sidebar from "../../components/sidebar";
import ClientSidebar from "./clients_sidebar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, Route, Routes, Outlet } from "react-router-dom";

export default function Clients() {
  return (
    <div>
      <NavBar />
      <Box sx={{ mt: "2rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Sidebar />
          <ClientSidebar />

          <Grid item xs={6}>
            <Box component="form" autoComplete="off">
              <Typography variant="h5" align="center">
                New Client
              </Typography>
              <div>
                <TextField
                  required
                  id="clientName"
                  label="Name"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="streetName"
                  label="Street Name"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="unitNumber"
                  label="Required"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="buildingName"
                  label="Building Name"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="cityName"
                  label="City Name"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="postalCode"
                  label="Postal Code"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="contactNumber"
                  label="Contact Number"
                  variant="standard"
                  sx={{ width: 600 }}
                />
              </div>
              <Box mt="2rem">
                <Button variant="contained">Submit</Button>
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={1}></Grid> */}
          {/* <Grid item xs={2}></Grid> */}
        </Grid>
      </Box>
      <Footer />
    </div>
  );
}
