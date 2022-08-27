import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    type LoginDetails = {
      username: String;
      password: String;
    };
    const loginDetails: LoginDetails = {
      username,
      password,
    };

    console.log("LOGIN DETAILS", loginDetails);
    console.log("BACKEND URL", `${process.env.REACT_APP_BACKEND_URL}/users/login`);
    try {
      // axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, loginDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Grid container direction={"column"} justifyContent="center" alignItems="center">
        <Card>
          <CardContent>
            <Typography variant="h4" textAlign={"center"}>
              Log In
            </Typography>
            <Box
              mt="2rem"
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={usernameChange}
              />
              <TextField
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={passwordChange}
              />
            </Box>
            <Box mt="2rem">
              <Button variant="contained" onClick={handleLogin}>
                Sign In
              </Button>
            </Box>
            <Divider variant="middle" />
            <Stack direction="row" spacing={2}>
              <Button href="/login/federated/google" variant="contained">
                Login with Google
              </Button>
              <Button href="/login/federated/google" variant="contained">
                Login with GitHub
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
