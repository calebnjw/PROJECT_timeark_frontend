import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";

import { ClientGlobalContext } from "../context/clientContext";
import { UserContext, useUserContext } from "../context/userContext";

import AppNavbar from "../components/navbar-App";
import Sidebar from "../components/sidebar";

import { User } from "../types/user";

import axios from "axios";
// import Footer from "../components/footer";
axios.defaults.withCredentials = true;

function AppLayout() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const navigate = useNavigate();

  // get client list
  const getClients = async () => {
    const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients`);
    setClientList(result.data);
  };

  // get user info
  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/user`);
        const userId = result.data.user._id;
        if (userId) {
          getClients();
        }
        setUserProfile(result.data.user);
        setNewUser(result.data.newUser);
        setUserId(userId);
      } catch (error) {
        console.log("Error message: ", error);
        navigate("/login");
      }
    };
    getProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        newUser,
        setNewUser,
        userId,
      }}
    >
      <ClientGlobalContext.Provider
        value={{
          clientList,
          setClientList,
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <AppNavbar />
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            spacing={3}
            sx={{
              marginTop: "8vh",
            }}
          >
            <Grid item>
              <Sidebar />
            </Grid>
            <Grid item>
              <Outlet />
            </Grid>
          </Grid>
        </Box>
      </ClientGlobalContext.Provider>
    </UserContext.Provider>
  );
}

export default AppLayout;
