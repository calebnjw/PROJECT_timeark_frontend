import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  List,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { ClientGlobalContext } from "../context/clientContext";
import { UserContext, useUserContext } from "../context/userContext";

// import AppNavbar from "../components/navbar-App";
// import Sidebar from "../components/sidebar";

import { User } from "../types/user";

import axios from "axios";
// import Footer from "../components/footer";
axios.defaults.withCredentials = true;

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function AppLayout() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userProfile, setUserProfile] = useState<User>();
  const [newUser, setNewUser] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // get client list
  const getClients = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/clients`
    );
    setClientList(result.data);
  };

  // get user info
  useEffect(() => {
    const getProfile = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/user`
        );
        const userId = result.data.user._id;
        if (userId) {
          getClients();
        }
        setUserProfile(result.data.user);
        setNewUser(result.data.newUser);
        setUserId(userId);
      } catch (error) {
        console.log("Error message: ", error);
        navigate("/login");
      }
    };
    getProfile();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    // CONTEXT
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        newUser,
        setNewUser,
        userId,
      }}
    >
      <ClientGlobalContext.Provider
        value={{
          clientList,
          setClientList,
        }}
      >
        <Box sx={{ display: "flex" }}>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
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
          {/* <Stack direction="row" spacing={2}> */}
          {/* <Sidebar /> */}
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              <ListItem
                key="Dashboard"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/app/dashboard");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem key="Clients" disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/app/clients");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Clients"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem key="Projects" disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/app/projects");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Projects"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                key="Time Tracking"
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/app/time");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <AccessTimeFilledIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Time Tracking"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem key="Invoices" disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    navigate("/app/invoices");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Invoices"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <div
            style={{
              marginTop: "15vh",
              marginLeft: "20px",
              flexGrow: 1,
              maxWidth: "75vw",
            }}
          >
            <Outlet />
          </div>
          {/* </Stack> */}
        </Box>
      </ClientGlobalContext.Provider>
    </UserContext.Provider>
  );
}

export default AppLayout;
