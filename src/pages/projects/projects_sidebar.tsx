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
import { Project } from "../../types/project";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/clientContext";
import { GlobalContent } from "../../context/clientContext";

import axios from "axios";
import { NumberSmall_1 } from "@carbon/icons-react";
axios.defaults.withCredentials = true;
// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const drawerWidth = 240;

const useStyles = makeStyles({
  modal: {
    marginLeft: "240px",
  },
  paper: {
    marginLeft: "240px",
  },
});

interface Props {
  clientList: Client[];
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}

// export default function ClientSidebar() {
const ProjectSidebar = ({ clientList, setSelectedClient }: Props) => {
  const classes = useStyles();

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
            <li key={index} style={{ width: "90%" }}>
              <ListItemButton onClick={() => setSelectedClient(c._id)}>
                {c.client_name}
              </ListItemButton>
            </li>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default ProjectSidebar;
