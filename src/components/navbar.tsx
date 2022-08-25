import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import { Box, Button, Grid, Toolbar, Typography } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <Grid item>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Time Ark
          </Typography>
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button variant="contained" color="inherit" href="/signup">
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
