import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Divider, Grid, TextField } from "@mui/material";

import { useUserContext } from "../../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function ProfileEdit() {
  // user profile
  const { userProfile } = useUserContext();
  // names
  const [familyName, setFamilyName] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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

  // setting initial values of fields
  useEffect(() => {
    if (userProfile) {
      console.log("USER PROFILE", userProfile);
      setFamilyName(userProfile.name.familyName);
      setGivenName(userProfile.name.givenName);
      userProfile.name.middleName ? setMiddleName(userProfile.name.familyName) : setMiddleName("");
      setEmail(userProfile.emails[0].value);
      if (userProfile.billingDetails) {
        userProfile.billingDetails.companyName
          ? setCompanyName(userProfile.billingDetails.companyName)
          : setCompanyName("");
        userProfile.billingDetails.buildingName
          ? setBuildingName(userProfile.billingDetails.buildingName)
          : setBuildingName("");
        userProfile.billingDetails.unitNumber
          ? setUnitNumber(userProfile.billingDetails.unitNumber)
          : setUnitNumber("");
        userProfile.billingDetails.streetName
          ? setStreetName(userProfile.billingDetails.streetName)
          : setStreetName("");
        userProfile.billingDetails.city ? setCity(userProfile.billingDetails.city) : setCity("");
        userProfile.billingDetails.country
          ? setCountry(userProfile.billingDetails.country)
          : setCountry("");
        userProfile.billingDetails.postalCode
          ? setPostalCode(userProfile.billingDetails.postalCode)
          : setPostalCode("");
        userProfile.billingDetails.contactNumber
          ? setContactNumber(userProfile.billingDetails.contactNumber)
          : setContactNumber("");
        userProfile.billingDetails.companyRegistration
          ? setCompanyRegistration(userProfile.billingDetails.companyRegistration)
          : setCompanyRegistration("");
      }
    }
  }, [userProfile]);

  const handleDeleteUser = async () => {
    const result: any = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/delete`);
    if (result.data.success) {
      // TODO: Can add a message saying that account has been successfully deleted
      navigate("/login?deleted=true");
    }
  };

  const handleUpdate = async () => {
    if (userProfile) {
      const updatedProfile = {
        displayName: `${givenName} ${familyName}`,
        name: {
          familyName,
          givenName,
          middleName,
        },
        // not changing for now, since we're only using google login
        // emails: userProfile.emails,
        // photos: userProfile.photos,
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
      if (result.data.success) {
        // TODO: Can add a message saying that information has been successfully updated
        navigate("/app/profile?saved=true");
      }
    }
  };

  // a whole bunch of state change handlers
  const userFamilyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(e.target.value);
  };
  const userGivenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGivenName(e.target.value);
  };
  const userMiddleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleName(e.target.value);
  };
  const userEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
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
      {!userProfile && <h1>You are not logged in.</h1>}
      {userProfile && (
        <>
          <div>
            <div>
              <h3>Name</h3>
              <TextField
                required
                label="First Name"
                value={givenName}
                defaultValue={userProfile.name.givenName}
                onChange={userGivenNameChange}
              />
              <TextField
                label="Middle Name"
                value={middleName}
                defaultValue={userProfile.name.middleName}
                onChange={userMiddleNameChange}
              />
              <TextField
                required
                label="Family Name"
                value={familyName}
                defaultValue={userProfile.name.familyName}
                onChange={userFamilyNameChange}
              />
            </div>
            <div>
              <h3>Email</h3>
              {(userProfile.provider && (
                // disable editing of email if it's provided by external service
                <TextField disabled label="Email" defaultValue={userProfile.emails[0].value} />
              )) || (
                <TextField
                  required
                  label="Email"
                  value={email}
                  defaultValue={userProfile.emails[0].value}
                  onChange={userEmailChange}
                />
              )}
            </div>
            <div>
              <h3>Billing Details</h3>
              <TextField
                required
                label="Company Name"
                value={companyName}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.companyName) || ""
                }
                onChange={userCompanyNameChange}
              />
              <TextField
                label="Registration Number"
                value={companyRegistration}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.companyRegistration) ||
                  ""
                }
                onChange={userCompanyRegistrationChange}
              />
              <TextField
                required
                label="Contact Number"
                value={contactNumber}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.contactNumber) || ""
                }
                onChange={userContactNumberChange}
              />
              <h3>Address</h3>
              <TextField
                label="Building Name"
                value={buildingName}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.buildingName) || ""
                }
                onChange={userBuildingNameChange}
              />
              <TextField
                required
                label="Street Name"
                value={streetName}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.streetName) || ""
                }
                onChange={userStreetNameChange}
              />
              <TextField
                label="Unit Number"
                value={unitNumber}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.unitNumber) || ""
                }
                onChange={userUnitNumberChange}
              />
              <TextField
                required
                label="Postal Code"
                value={postalCode}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.postalCode) || ""
                }
                onChange={userPostalCodeChange}
              />
              <TextField
                required
                label="City"
                value={city}
                defaultValue={(userProfile.billingDetails && userProfile.billingDetails.city) || ""}
                onChange={userCityChange}
              />
              <TextField
                required
                label="Country"
                value={country}
                defaultValue={
                  (userProfile.billingDetails && userProfile.billingDetails.country) || ""
                }
                onChange={userCountryChange}
              />
            </div>
          </div>
          <div>
            <Button variant="contained" color="warning" onClick={handleDeleteUser}>
              Delete Account
            </Button>
            <Button component={Link} to="/app/profile">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default ProfileEdit;
