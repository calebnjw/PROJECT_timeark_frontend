import React from "react";
import { Outlet } from "react-router-dom";
import { Divider } from "@mui/material";

import { useUserContext } from "../../context/userContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function Profile() {
  const { userProfile } = useUserContext();

  return (
    <>
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        {userProfile && (
          <div>
            {userProfile.photos && (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                  src={userProfile?.photos[0].value}
                  // src="https://www.redditstatic.com/avatars/avatar_default_02_0DD3BB.png"
                  alt={`${userProfile?.displayName}'s profile`}
                  referrerPolicy="no-referrer"
                ></img>
                <h1>Hello {`${userProfile.displayName}`}</h1>
              </div>
            )}
            <Divider />
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
