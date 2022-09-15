import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

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
    <Box
      sx={{
        margin: "auto",
        maxWidth: "50vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack spacing={5}>
        <Stack spacing={1}>
          <Typography variant="h4">Complete your profile!</Typography>
          <Typography variant="body1">
            We will include this information on invoices that you generate.
          </Typography>
        </Stack>
        <Card
          sx={{
            borderRadius: 2,
            p: 1,
            marginBottom: 0,
          }}
          raised
        >
          <CardContent>
            {userProfile && (
              <Stack spacing={0}>
                <Typography variant="h6">Company Information</Typography>
                <Box
                  component="form"
                  paddingBottom={2}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    required
                    label="Company Name"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.companyName) || ""
                    }
                    onChange={userCompanyNameChange}
                    fullWidth
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                  <TextField
                    label="Registration Number"
                    defaultValue={
                      (userProfile.billingDetails &&
                        userProfile.billingDetails.companyRegistration) ||
                      ""
                    }
                    onChange={userCompanyRegistrationChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                  <TextField
                    required
                    label="Contact Number"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.contactNumber) || ""
                    }
                    onChange={userContactNumberChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                </Box>
              </Stack>
            )}
            {userProfile && (
              <Stack spacing={0} paddingBottom={1}>
                <Typography variant="h6">Address</Typography>
                <Box
                  component="form"
                  paddingBottom={2}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <TextField
                    label="Building Name"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.buildingName) || ""
                    }
                    onChange={userBuildingNameChange}
                    fullWidth
                    sx={{ m: 1 }}
                  />
                  <TextField
                    required
                    label="Street Name"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.streetName) || ""
                    }
                    onChange={userStreetNameChange}
                    fullWidth
                    sx={{ m: 1 }}
                  />
                  <TextField
                    label="Unit Number"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.unitNumber) || ""
                    }
                    onChange={userUnitNumberChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                  <TextField
                    required
                    label="Postal Code"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.postalCode) || ""
                    }
                    onChange={userPostalCodeChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                  <TextField
                    required
                    label="City"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.city) || ""
                    }
                    onChange={userCityChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                  <TextField
                    required
                    label="Country"
                    defaultValue={
                      (userProfile.billingDetails && userProfile.billingDetails.country) || ""
                    }
                    onChange={userCountryChange}
                    sx={{ m: 1, minWidth: "47%" }}
                  />
                </Box>
              </Stack>
            )}
            <Stack sx={{ m: 1 }}>
              <Button
                sx={{ alignSelf: "flex-end" }}
                variant="contained"
                size="large"
                onClick={handleUpdate}
                fullWidth
              >
                Done!
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default Onboard;
