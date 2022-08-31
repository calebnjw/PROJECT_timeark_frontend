import React, { useEffect, useState } from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { Button, Box, Grid } from "@mui/material";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

import { useGlobalContext } from "../../context/clientContext";

function Profile() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <h1>HELLOOOOO???</h1>
      </div>
    </>
  );
}

export default Profile;
