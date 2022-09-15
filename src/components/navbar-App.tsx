import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";

import { useUserContext } from "../context/userContext";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppNavbar(props: any) {
  const { userProfile } = useUserContext();
  const { open, setOpen } = props;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#0047AB",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
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
                referrerPolicy="no-referrer"
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
