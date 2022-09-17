import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1533551660-71ba5ce4db36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw",
      }}
    >
      <Typography variant="h1" color="white">
        Page 404
      </Typography>
      <br />
      <Typography color="white">Page is not found!</Typography>
      <br />
      <Typography color="white">
        It's not your fault, I probably broke something...
      </Typography>
      <br />
      <Link
        to="app/dashboard"
        style={{
          color: "white",
        }}
      >
        Back To Home
      </Link>
    </Box>
  );
};

export default Page404;
