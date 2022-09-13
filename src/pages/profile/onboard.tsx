import React, { useEffect, useState } from "react";
import { Link, Outlet, Route, useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Divider, Grid, TextField } from "@mui/material";

import { Billing } from "../../types/billingDetails";

import { useUserContext } from "../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function Onboard() {
  // user profile
  const { userProfile, setNewUser } = useUserContext();
  // billing details
  const [companyName, setCompanyName] = useState<string>("");
  const [buildingName, setBuildingName] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [companyRegistration, setCompanyRegistration] = useState<string>("");

  let navigate = useNavigate();

  // TODO: data validation. should not allow user to pass in blank fields.
  const handleUpdate = async () => {
    if (userProfile) {
      const updatedProfile = {
        billingDetails: {
          companyName,
          buildingName,
          unitNumber,
          streetName,
          city,
          country,
          postalCode,
          contactNumber,
          companyRegistration,
        },
      };

      const result: any = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update`, {
        updatedProfile,
      });
      console.log(result.data);
      setNewUser(false);
    }
    setNewUser(false);
    navigate("/app/dashboard");
  };

  // a whole bunch of state change handlers
  const userCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const userBuildingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildingName(e.target.value);
  };
  const userUnitNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitNumber(e.target.value);
  };
  const userStreetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetName(e.target.value);
  };
  const userCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };
  const userCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };
  const userPostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };
  const userContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
  };
  const userCompanyRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyRegistration(e.target.value);
  };

  return (
    <>
      {!userProfile && <h1>Please log in.</h1>}
      {userProfile && (
        <div>
          <h3>Save Your Billing Information</h3>
          <p>This information will be filled into the invoices that you generate. </p>
          <br />
          <TextField
            required
            label="Company Name"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.companyName) || ""
            }
            onChange={userCompanyNameChange}
          />
          <TextField
            label="Registration Number"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.companyRegistration) || ""
            }
            onChange={userCompanyRegistrationChange}
          />
          <TextField
            required
            label="Contact Number"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.contactNumber) || ""
            }
            onChange={userContactNumberChange}
          />
          <h3>Address</h3>
          <TextField
            label="Building Name"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.buildingName) || ""
            }
            onChange={userBuildingNameChange}
          />
          <TextField
            required
            label="Street Name"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.streetName) || ""
            }
            onChange={userStreetNameChange}
          />
          <TextField
            label="Unit Number"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.unitNumber) || ""
            }
            onChange={userUnitNumberChange}
          />
          <TextField
            required
            label="Postal Code"
            defaultValue={
              (userProfile.billingDetails && userProfile.billingDetails.postalCode) || ""
            }
            onChange={userPostalCodeChange}
          />
          <TextField
            required
            label="City"
            defaultValue={(userProfile.billingDetails && userProfile.billingDetails.city) || ""}
            onChange={userCityChange}
          />
          <TextField
            required
            label="Country"
            defaultValue={(userProfile.billingDetails && userProfile.billingDetails.country) || ""}
            onChange={userCountryChange}
          />
          <br />
          <br />
        </div>
      )}
      <div>
        <Button variant="contained" onClick={handleUpdate}>
          Done!
        </Button>
      </div>
    </>
  );
}

export default Onboard;
