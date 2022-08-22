import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

export default function ButtonAppBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h6" component="div" align="left">
                Time Ark
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit">Signup</Button>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
