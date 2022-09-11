import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

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
  const { userProfile } = useUserContext();

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
      navigate("/clients");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      style={{ width: "80%", marginTop: "80px" }}
      component="form"
      autoComplete="off"
    >
      <Typography variant="h5" align="center">
        New Client
      </Typography>
      <div>
        <TextField
          required
          id="clientName"
          label="Client Name"
          onChange={clientNameChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyName"
          label="Company Name"
          onChange={companyNameChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="streetName"
          label="Street Name"
          onChange={streetNumberChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="unitNumber"
          label="Unit Number"
          onChange={unitNumberChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="buildingName"
          label="Building Name"
          onChange={buildingNameChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="cityName"
          label="City Name"
          sx={{ width: 600 }}
          onChange={cityNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="countryName"
          label="Country"
          sx={{ width: 600 }}
          onChange={countryNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="postalCode"
          label="Postal Code"
          onChange={postalCodeChange}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyreg"
          label="Company Registration"
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
