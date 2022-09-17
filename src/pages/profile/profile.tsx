import { Outlet } from "react-router-dom";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";

import { useUserContext } from "../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const { userProfile } = useUserContext();

  return (
    <>
      {userProfile && (
        <Stack spacing={2}>
          {userProfile.photos && (
            <Grid
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Grid item>
                <img
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  src={userProfile?.photos[0].value}
                  alt={`${userProfile?.displayName}'s profile`}
                  referrerPolicy="no-referrer"
                ></img>
              </Grid>
              <Grid item>
                <Typography variant="h3">Hello, {`${userProfile.displayName}`}</Typography>
              </Grid>
            </Grid>
          )}
          <Divider />
          <Outlet />
        </Stack>
      )}
    </>
  );
}

export default Profile;
