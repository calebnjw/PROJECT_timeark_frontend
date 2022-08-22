import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Client } from "../../types/client";
import { Link } from "react-router-dom";
// import Projects from "../projects/Projects";

import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const drawerWidth = 240;

const useStyles = makeStyles({
  modal: {
    marginLeft: "240px",
  },
  paper: {
    marginLeft: "240px",
  },
});

export default function ClientSidebar() {
  const classes = useStyles();
  const [clientList, setClientList] = useState<Client[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(`${BACKEND_URL}/clients`); // add query user_id as 2nd param
      setClientList(result.data);
    };
    getClients();
  }, []);
  console.log("client list: ", clientList);

  return (
    <Drawer
      variant="permanent"
      classes={{
        modal: classes.modal,
        paper: classes.paper,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }} mt={"5rem"}>
        <Typography variant="h5" align="center">
          Clients
        </Typography>
        <List>
          {clientList.map((c, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={c.client_name}
                  onClick={() => {
                    // <Link path="projects" elment={<Projects />} />;
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
