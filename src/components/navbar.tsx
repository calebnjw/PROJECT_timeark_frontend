import { Link } from "react-router-dom";

import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

export default function ButtonAppBar() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h6" component="div" align="left">
                Time Ark
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                marginLeft: "90px",
              }}
            >
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                color="secondary"
                href={`${process.env.REACT_APP_BACKEND_URL}/users/logout`}
                variant="contained"
              >
                LOGOUT
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
