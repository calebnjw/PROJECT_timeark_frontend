import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { AppBar, Box, Button, Grid, Stack, Toolbar, Typography } from "@mui/material";

function AppNavbar() {
  const { userProfile } = useUserContext();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#0047AB",
          height: "8vh",
        }}
      >
        <Link
          to={"/app/dashboard"}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
            flexGrow: 1,
          }}
        >
          <img
            src="/logo-notext.png"
            alt="logo"
            style={{
              borderRadius: "50%",
              width: "40px",
              marginRight: "15px",
            }}
          />
          <Typography variant="h4" align="left" style={{}}>
            Time Ark
          </Typography>
        </Link>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {userProfile?.photos && (
            <Link to={"/app/profile"}>
              <img
                src={`${userProfile?.photos[0].value}`}
                alt="profile"
                style={{
                  width: "40px",
                  borderRadius: "50%",
                  marginRight: "20px",
                  marginTop: "7px",
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
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppNavbar;
