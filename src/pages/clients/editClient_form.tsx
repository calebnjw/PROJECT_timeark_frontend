import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Alert } from "@mui/material";
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

  const [isEdited, setIsEdited] = React.useState<boolean>(false);

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
      if (result.data.success) {
        setClientList(result.data.clients);
        setIsEdited(true);
        // navigate(`/app/clients/${client._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="form" autoComplete="off">
      <Typography
        variant="h4"
        align="left"
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Edit Client Information
      </Typography>
      <div>
        <TextField
          required
          id="clientName"
          label="Client Name"
          value={clientName}
          onChange={clientNameChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyName"
          label="Company Name"
          value={companyName}
          onChange={companyNameChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="streetName"
          label="Street Name"
          value={streetNumber}
          onChange={streetNumberChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="unitNumber"
          label="Unit Number"
          value={unitNumber}
          onChange={unitNumberChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="buildingName"
          label="Building Name"
          value={buildingName}
          onChange={buildingNameChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="cityName"
          label="City Name"
          value={cityName}
          sx={{ width: 600, marginTop: "10px" }}
          onChange={cityNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="countryName"
          label="Country"
          value={countryName}
          sx={{ width: 600, marginTop: "10px" }}
          onChange={countryNameChange}
        />
      </div>
      <div>
        <TextField
          required
          id="postalCode"
          label="Postal Code"
          value={postalCode}
          onChange={postalCodeChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyreg"
          label="Company Registration"
          value={companyreg}
          onChange={companyregChange}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      {isEdited ? (
        <Alert
          severity="success"
          style={{
            width: "600px",
            marginTop: "10px",
          }}
        >
          Client is successfully edited
        </Alert>
      ) : (
        <></>
      )}

      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          style={{
            width: "150px",
          }}
          onClick={() => {
            navigate(`/app/clients/${client._id}`);
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleEditClient}
          style={{
            width: "150px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
