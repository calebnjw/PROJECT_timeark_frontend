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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    type SignUpDetails = { username: String; password: String };
    const loginDetails: SignUpDetails = { username, password };

    try {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/users/login`);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, loginDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ mt: "2rem" }}>
      <Grid container direction={"column"} justifyContent="center" alignItems="center">
        <Card>
          <CardContent>
            <Typography variant="h4" textAlign={"center"}>
              Sign Up
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
              <Button disableElevation href="" variant="contained">
                Sign In
              </Button>
            </Box>
            <Divider variant="middle" />
            <Stack direction="row" spacing={2}>
              <Button disableElevation href="/login/federated/google" variant="contained">
                Login with Google
              </Button>
              <Button
                disableElevation
                href="/login/federated/google"
                variant="contained"
                onClick={handleSignUp}
              >
                Login with GitHub
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
