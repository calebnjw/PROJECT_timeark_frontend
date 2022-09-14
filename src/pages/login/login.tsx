import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";

import GoogleButton from "../../components/google-button";

import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  console.log(
    "backend url: ",
    `${process.env.REACT_APP_BACKEND_URL}/auth/google`
  );
  return (

    <Grid
      container
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1533551660-71ba5ce4db36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw",
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          p: 1,
          paddingBottom: 0,
        }}
        raised
      >
        <CardContent
          sx={{
            display: "flex",
          }}
        >
          <img
            src="./timeark-logo.png"
            alt="timeark logo"
            width="150px"
            style={{ margin: "auto" }}
          />
          <Stack
            spacing={3}
            marginLeft={3}
            marginRight={5}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">Login to your TimeArk!</Typography>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleButton />
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
