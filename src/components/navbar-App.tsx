import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { AppBar, Box, Button, Grid, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open && {
//       ...openedMixin(theme),
//       "& .MuiDrawer-paper": openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       "& .MuiDrawer-paper": closedMixin(theme),
//     }),
//   })
// );

function AppNavbar() {
  const { userProfile } = useUserContext();

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

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
        {/* <IconButton
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
        </IconButton> */}
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
