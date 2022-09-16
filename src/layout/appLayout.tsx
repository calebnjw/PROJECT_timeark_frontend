import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { ClientGlobalContext } from "../context/clientContext";
import { UserContext } from "../context/userContext";

import AppNavbar from "../components/navbar-App";
import Sidebar from "../components/sidebar";

import { User } from "../types/user";

import axios from "axios";
axios.defaults.withCredentials = true;

function AppLayout() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // get client list
  const getClients = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/clients`
    );
    setClientList(result.data);
  };

  // get user info
  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/user`
        );
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
        <Box
          sx={{
            display: "flex",
          }}
        >
          <AppNavbar open={open} setOpen={setOpen} />
          <Sidebar open={open} setOpen={setOpen} />
          <div
            style={{
              paddingTop: "8ch",
              padding: "30px",
              paddingBottom: "100px",
              flexGrow: 1,
            }}
          >
            <Outlet />
          </div>
        </Box>
      </ClientGlobalContext.Provider>
    </UserContext.Provider>
  );
}

export default AppLayout;
