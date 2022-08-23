import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function NewClientForm() {
  return (
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
  );
}
