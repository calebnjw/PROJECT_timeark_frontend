import React from "react";
import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";

import { useUserContext } from "../context/userContext";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const { userProfile } = useUserContext();

  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Profile;
