import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { AppBar, Button } from "@mui/material";

function AppNavbar() {
  const { userProfile } = useUserContext();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#0047AB",
        height: "10vh",
      }}
    >
      <div
        style={{
          flexDirection: "row",
        }}
      >
        <a href="app/dashboard">
          <img
            src="/logo-notext.png"
            alt="logo"
            style={{
              borderRadius: "50%",
              width: "50px",
              marginTop: "5px",
              marginLeft: "10px",
            }}
          />
        </a>
      </div>
      <div
        style={{
          display: "flex",
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
                height: "40px",
                borderRadius: "50%",
                marginTop: "5px",
                marginRight: "20px",
              }}
            />
          </Link>
        )}

        <Button
          color="secondary"
          href={`${process.env.REACT_APP_BACKEND_URL}/users/logout`}
          variant="contained"
          style={{
            marginRight: "10px",
          }}
        >
          Logout
        </Button>
      </div>
    </AppBar>
  );
}

export default AppNavbar;
