import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";

import { ClientGlobalContext } from "../context/clientContext";
import { UserContext } from "../context/userContext";

import { useUserContext } from "../context/userContext";

import AppNavbar from "../components/navbar-App";
import Sidebar from "../components/sidebar";

import { User } from "../types/user";

import axios from "axios";
import Footer from "../components/footer";
axios.defaults.withCredentials = true;

function AppLayout() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(""); // Please replace your user id here!!! DONT FORGET ADD YOUR USER ID TO CLIENT IN DB

  // get user info
  useEffect(() => {
    const getProfile = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user`);
      setUserProfile(result.data.user);
      setNewUser(result.data.newUser);
      setUserId(result.data.user.id);
    };
    getProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      const getClients = async () => {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients`, {
          params: { user_id: userProfile?._id },
        });
        setClientList(result.data);
      };
      getClients();
    }
  }, [userProfile]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        newUser,
      }}
    >
      <ClientGlobalContext.Provider
        value={{
          clientList,
          setClientList,
          userId,
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <AppNavbar />
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item>
              <Sidebar />
            </Grid>
            <Outlet />
          </Grid>
          <Footer />
        </Box>
      </ClientGlobalContext.Provider>
    </UserContext.Provider>
  );
}

export default AppLayout;
