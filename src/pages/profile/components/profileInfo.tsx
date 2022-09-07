import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Divider, Grid, TextField } from "@mui/material";

import { useUserContext } from "../../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function ProfileInfo() {
  const { userProfile } = useUserContext();

  return (
    <>
      {!userProfile && <h1>You are not logged in.</h1>}
      {userProfile && (
        <div>
          <h3>Name</h3>
          <p>Last Name: {userProfile.name.familyName}</p>
          {userProfile.name.middleName && <p>Middle Name: {userProfile.name.middleName}</p>}
          <p>First Name: {userProfile.name.givenName}</p>

          <h3>Email</h3>
          {!userProfile.emails && <p>No email address provided</p>}
          {/* email address is tied to google account, so should be a disabled field in the edit page */}
          {userProfile.emails && <p>{userProfile.emails[0].value}</p>}

          <h3>Billing Details</h3>
          {!userProfile.billingDetails && <p>Please update your billing details</p>}
          {userProfile.billingDetails && (
            <div>
              <p>Company Name: {userProfile.billingDetails.companyName}</p>
              <p>Registration Number: {userProfile.billingDetails.companyRegistration}</p>
              <p>Contact Number: {userProfile.billingDetails.contactNumber}</p>
              <p>Address: </p>
              <p>
                {userProfile.billingDetails.buildingName}
                <br />
                {userProfile.billingDetails.streetName}
                <br />
                {userProfile.billingDetails.unitNumber}
                <br />
                {userProfile.billingDetails.postalCode}, {userProfile.billingDetails.city} <br />
                {userProfile.billingDetails.country}
                <br />
              </p>
            </div>
          )}
          <Button variant="contained" component={Link} to="/profile/edit">
            Edit Information
          </Button>
        </div>
      )}
    </>
  );
}

export default ProfileInfo;
