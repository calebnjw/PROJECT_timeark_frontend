import { Outlet } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { useUserContext } from "../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const { userProfile } = useUserContext();

  return (
    <Box>
      {userProfile && (
        <Stack spacing={2}>
          {userProfile.photos && (
            <Stack
              direction="row"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
              <Typography variant="h2">
                Hello, {`${userProfile.displayName}`}
              </Typography>
            </Stack>
          )}
          <Divider />
          <Outlet />
        </Stack>
      )}
    </Box>
  );
}

export default Profile;
