import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Client } from "../../types/client";
import { useUserContext } from "../../context/userContext";

axios.defaults.withCredentials = true;

interface Props {
  client: Client;
  setClientList: (c: []) => void;
}

export default function EditClientForm({ client, setClientList }: Props) {
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

  useEffect(() => {
    setClientName(client.client_name);
    setCompanyName(client.billing_details.company_name);
    setStreetNumber(client.billing_details.street_name);
    setUnitNumber(client.billing_details.unit_number);
    setBuildingName(client.billing_details.building_name);
    setCityName(client.billing_details.city);
    setCountryName(client.billing_details.country);
    setPostalCode(client.billing_details.postal_code);
    setCompanyreg(client.billing_details.country);
  }, [client]);

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

  const handleEditClient = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/clients/${client._id}/update`,
        {
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
        }
      );
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`
      );
      setClientList(result.data);
      navigate("/app/clients");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" autoComplete="off">
      <Typography
        variant="h5"
        align="left"
        style={{
          fontWeight: 600,
        }}
      >
        Edit Client Information
      </Typography>
      <TextField
        required
        id="clientName"
        label="Client Name"
        value={clientName}
        onChange={clientNameChange}
        sx={{ width: 600 }}
      />
      <TextField
        required
        id="companyName"
        label="Company Name"
        value={companyName}
        onChange={companyNameChange}
        sx={{ width: 600 }}
      />

      <TextField
        required
        id="streetName"
        label="Street Name"
        value={streetNumber}
        onChange={streetNumberChange}
        sx={{ width: 600 }}
      />
      <TextField
        required
        id="unitNumber"
        label="Unit Number"
        value={unitNumber}
        onChange={unitNumberChange}
        sx={{ width: 600 }}
      />
      <TextField
        required
        id="buildingName"
        label="Building Name"
        value={buildingName}
        onChange={buildingNameChange}
        sx={{ width: 600 }}
      />
      <TextField
        required
        id="cityName"
        label="City Name"
        value={cityName}
        sx={{ width: 600 }}
        onChange={cityNameChange}
      />
      <TextField
        required
        id="countryName"
        label="Country"
        value={countryName}
        sx={{ width: 600 }}
        onChange={countryNameChange}
      />
      <TextField
        required
        id="postalCode"
        label="Postal Code"
        value={postalCode}
        onChange={postalCodeChange}
        sx={{ width: 600 }}
      />
      <TextField
        required
        id="companyreg"
        label="Company Registration"
        value={companyreg}
        onChange={companyregChange}
        sx={{ width: 600 }}
      />
      <Box mt="2rem">
        <Button variant="contained" onClick={handleEditClient}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
