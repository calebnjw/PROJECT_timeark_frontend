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
        {userProfile && (
          <div>
            {userProfile.photos && (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  // src={`${userProfile?.photos[0].value}`}
                  src="https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png"
                  alt={`${userProfile?.displayName}'s profile`}
                ></img>
                <h1>Hello {`${userProfile.displayName}`}</h1>
              </div>
            )}
            <Divider />
            <Outlet />
          </div>
        )}
      </div>
      {/* <Route path="edit" />
      <Route path="new" /> */}
    </>
  );
}

export default Profile;
