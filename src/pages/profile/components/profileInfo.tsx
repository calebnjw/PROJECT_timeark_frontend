import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Grid, Stack, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BusinessIcon from "@mui/icons-material/Business";

import { useUserContext } from "../../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function ProfileInfo() {
  const { userProfile } = useUserContext();

  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {userProfile && (
        <Stack spacing={4}>
          {/* Name */}
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <PersonIcon fontSize="large" sx={{ marginRight: "10px" }} />
              <Typography variant="h4">Name</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="body1">
                <strong>First Name:</strong> {userProfile.name.givenName}
              </Typography>
              {userProfile.name.middleName && (
                <Typography variant="body1">
                  <strong>Middle Name:</strong> {userProfile.name.middleName}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Last Name:</strong> {userProfile.name.familyName}
              </Typography>
            </Stack>
          </Stack>
          {/* Email */}
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <AlternateEmailIcon fontSize="large" sx={{ marginRight: "10px" }} />
              <Typography variant="h4">Email</Typography>
            </Stack>
            <Stack spacing={1}>
              {!userProfile.emails ? (
                <Typography variant="body1">No email address provided</Typography>
              ) : (
                <Typography variant="body1">
                  <strong>Email Address:</strong> {userProfile.emails[0].value}
                </Typography>
              )}
            </Stack>
          </Stack>
          {/* Business and Address */}
          <Stack spacing={1}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <BusinessIcon fontSize="large" sx={{ marginRight: "10px" }} />
              <Typography variant="h4">Billing Details</Typography>
            </Stack>
            <Stack spacing={1}>
              {!userProfile.billingDetails ? (
                <Typography variant="body1">Please update your billing details</Typography>
              ) : (
                <>
                  <Typography variant="body1">
                    <strong>Company Name:</strong> {userProfile.billingDetails.companyName || "-"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Registration Number:</strong>{" "}
                    {userProfile.billingDetails.companyRegistration || "-"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact Number:</strong>{" "}
                    {userProfile.billingDetails.contactNumber || "-"}
                  </Typography>
                </>
              )}
            </Stack>
            <Stack spacing={1}>
              {!userProfile.billingDetails?.streetName ? (
                <Typography variant="body1">Please update your address</Typography>
              ) : (
                <>
                  <Typography variant="body1">
                    <strong>Address:</strong>{" "}
                  </Typography>

                  <Typography variant="body1">
                    {userProfile.billingDetails.buildingName}
                    <br />
                    {userProfile.billingDetails.streetName}
                    <br />
                    {userProfile.billingDetails.unitNumber}
                    <br />
                    {userProfile.billingDetails.postalCode}, {userProfile.billingDetails.city}{" "}
                    <br />
                    {userProfile.billingDetails.country}
                    <br />
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
          <Button variant="contained" component={Link} to="/app/profile/edit">
            Edit Information
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default ProfileInfo;
