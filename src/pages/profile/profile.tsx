import React, { useEffect, useState } from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { Button, Box, Divider, Grid } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import { User, Name, Email, Photo } from "../../types/user";
import { Billing } from "../../types/billingDetails";

// import { useGlobalContext } from "../../context/clientContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    const getProfile = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user`);
      setUserProfile(result.data.user);
    };
    getProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />

      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        {!userProfile && <h1>You are not logged in.</h1>}
        {userProfile && (
          <div>
            {userProfile.photos && (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={`${userProfile?.photos[0].value}`}
                  alt={`${userProfile?.displayName}'s profile`}
                ></img>
                <h1>Hello {`${userProfile.displayName}`}</h1>
              </div>
            )}
            <Divider />
            <div>
              <h3>name: familyName: string; givenName: string; middleName?:</h3>
              <p>{userProfile.name.familyName}</p>
              <p>{userProfile.name.givenName}</p>
              {userProfile.name.middleName && <p>{userProfile.name.middleName}</p>}
              <h3>emails: IEmail[];</h3>
              {!userProfile.emails && <p>No email address provided</p>}
              {userProfile.emails && <p>{userProfile.emails[0].value}</p>}
              <h3>billingDetails?: IBilling;</h3>
              {!userProfile.billingDetails && <p>Please update your billing details</p>}
              {userProfile.billingDetails && (
                <div>
                  <p>Company Name: {userProfile.billingDetails.company_name}</p>
                  <p>Registration Number: {userProfile.billingDetails.company_registration}</p>
                  <p>Address: </p>
                  <p>
                    {userProfile.billingDetails.building_name}
                    <br />
                    {userProfile.billingDetails.street_name}
                    <br />
                    {userProfile.billingDetails.unit_number}
                    <br />
                    {userProfile.billingDetails.postal_code}, {userProfile.billingDetails.city}{" "}
                    <br />
                    {userProfile.billingDetails.country}
                    <br />
                    {userProfile.billingDetails.contact_number}
                    <br />
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
