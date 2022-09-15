import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useGlobalContext } from "../../context/clientContext";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core/styles";

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  textField: {
    "& p": {
      color: "#FF0000",
    },
  },
}));

export default function NewClientForm() {
  const { clientList, setClientList } = useGlobalContext();

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
  const classes = useStyles();

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

  const handleNewClient = async () => {
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
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/clients/new`,
        clientDetails
      );
      const newClient = result.data;
      const clientId: any = newClient._id;
      const updatedClientList: any = [...clientList, newClient];
      setClientList(updatedClientList);
      navigate(`/app/clients/${clientId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      style={{ width: "80%", marginTop: "60px", marginLeft: "15%" }}
      component="form"
      autoComplete="off"
    >
      <h3
        style={{
          fontSize: "24px",
        }}
      >
        Add A New Client
      </h3>
      <hr
        style={{
          marginTop: "-5%",
          marginRight: "-38%",
        }}
      ></hr>
      <div>
        <TextField
          required
          id="clientName"
          label="Client Name"
          type="text"
          variant="filled"
          onChange={clientNameChange}
          classes={{ root: classes.textField }}
          helperText={clientName === "" ? "Required Field" : " "}
          sx={{ width: 600, marginTop: "10px" }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyName"
          label="Company Name"
          type="text"
          variant="filled"
          onChange={companyNameChange}
          classes={{ root: classes.textField }}
          helperText={companyName === "" ? "Required Field" : " "}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="streetName"
          label="Street Name"
          type="text"
          variant="filled"
          onChange={streetNumberChange}
          classes={{ root: classes.textField }}
          helperText={streetNumber === "" ? "Required Field" : " "}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="unitNumber"
          label="Unit Number"
          variant="filled"
          onChange={unitNumberChange}
          classes={{ root: classes.textField }}
          helperText={unitNumber === "" ? "Required Field" : " "}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="buildingName"
          label="Building Name"
          type="text"
          variant="filled"
          onChange={buildingNameChange}
          classes={{ root: classes.textField }}
          helperText={buildingName === "" ? "Required Field" : " "}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="cityName"
          label="City Name"
          type="text"
          variant="filled"
          sx={{ width: 600 }}
          onChange={cityNameChange}
          classes={{ root: classes.textField }}
          helperText={cityName === "" ? "Required Field" : " "}
        />
      </div>
      <div>
        <TextField
          required
          id="countryName"
          label="Country"
          type="text"
          variant="filled"
          sx={{ width: 600 }}
          onChange={countryNameChange}
          classes={{ root: classes.textField }}
          helperText={countryName === "" ? "Required Field" : " "}
        />
      </div>
      <div>
        <TextField
          required
          id="postalCode"
          label="Postal Code"
          type="text"
          variant="filled"
          onChange={postalCodeChange}
          classes={{ root: classes.textField }}
          helperText={postalCode === "" ? "Required Field" : " "}
          sx={{ width: 600 }}
        />
      </div>
      <div>
        <TextField
          required
          id="companyreg"
          label="Company Registration"
          type="text"
          variant="filled"
          onChange={companyregChange}
          sx={{ width: 600 }}
          classes={{ root: classes.textField }}
          helperText={companyreg === "" ? "Required Field" : " "}
        />
      </div>
      <Box mt="2rem">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleNewClient}
          style={{
            marginBottom: "2rem",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
