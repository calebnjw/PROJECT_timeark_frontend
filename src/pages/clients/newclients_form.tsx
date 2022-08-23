import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function NewClientForm() {
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [companyreg, setCompanyreg] = useState("");

  const navigate = useNavigate();

  const clientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };
  const companyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const streetNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetNumber(e.target.value);
  };
  const unitNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitNumber(e.target.value);
  };
  const buildingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingName(e.target.value);
  };
  const cityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };
  const countryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  const postalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };
  const companyregChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyreg(e.target.value);
  };

  const handleNewClient = () => {
    const clientDetails = {
      client_name: clientName,
      billing_details: {
        company_name: companyName,
        building_name: buildingName,
        unit_number: unitNumber,
        street_name: streetNumber,
        city: cityName,
        country: countryName,
        postal_code: postalCode,
        company_registration: companyreg,
      },
      project_ids: [],
    };

    try {
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/clients/new`,
        clientDetails
      );
      console.log(clientDetails);
      navigate("/clients");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" autoComplete="off">
      <Typography variant="h5" align="center">
        New Client
      </Typography>
      <div>
        <TextField
          required
          id="clientName"
          label="Client Name"
          variant="standard"
          onChange={clientNameChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyName"
          label="Company Name"
          variant="standard"
          onChange={companyNameChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="streetName"
          label="Street Name"
          variant="standard"
          onChange={streetNumberChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="unitNumber"
          label="Unit Number"
          variant="standard"
          onChange={unitNumberChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="buildingName"
          label="Building Name"
          variant="standard"
          onChange={buildingNameChange}
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
          onChange={cityNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="countryName"
          label="Country"
          variant="standard"
          sx={{ width: 600 }}
          onChange={countryNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="postalCode"
          label="Postal Code"
          variant="standard"
          onChange={postalCodeChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyreg"
          label="Company Registration"
          variant="standard"
          onChange={companyregChange}
          sx={{ width: 600 }}
        />
      </div>
      <Box mt="2rem">
        <Button variant="contained" onClick={handleNewClient}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
