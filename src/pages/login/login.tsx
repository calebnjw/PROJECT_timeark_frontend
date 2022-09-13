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
  return (
    <Grid item justifyContent="center" alignItems="center">
      <Card>
        <CardContent>
          <Typography variant="h4" textAlign={"center"}>
            Log In
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`} variant="contained">
              Login with Google
            </Button>
            <Button href={`${process.env.REACT_APP_BACKEND_URL}/users/log`} variant="contained">
              LOG REQUEST.USER
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
