import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";

function AppNavbar() {
  const { userProfile } = useUserContext();

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Grid
            container
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid item xs={8}>
              <img
                src="/logo-notext.png"
                alt="logo"
                style={{
                  borderRadius: "50%",
                  width: "50px",
                }}
              />
              <Typography variant="h6" component="div" align="left">
                <Link
                  to={"/app/dashboard"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Time Ark
                </Link>
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                marginLeft: "90px",
              }}
            >
              {userProfile?.photos && (
                <Link to={"/app/profile"}>
                  <img
                    src={`${userProfile?.photos[0].value}`}
                    alt="profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "20px",
                    }}
                  />
                </Link>
              )}

              <Button
                color="secondary"
                href={`${process.env.REACT_APP_BACKEND_URL}/users/logout`}
                variant="contained"
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppNavbar;
