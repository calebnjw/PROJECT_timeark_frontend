import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { Client } from "../../types/client";
import { Link } from "react-router-dom";
import Projects from "../projects/projects";

import axios from "axios";
axios.defaults.withCredentials = true;

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
  setClientList: React.Dispatch<React.SetStateAction<Client[]>>;
}

// export default function ClientSidebar() {
const ClientSidebar = () => {
  const classes = useStyles();
  const [clientList, setClientList] = useState<Client[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`
      ); // add query user_id as 2nd param
      console.log(result);
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
              {/* <Link
                path="/projects"
                elment={<Projects props={c._id} />}
              /> */}
              <ListItemButton>
                {/* <ListItemText
                  primary={c.client_name}
                  onClick={() => {
                    // <Link path="projects" elment={<Projects />} />;
                  }}
                /> */}
                <Link to={`/clients/${c._id}`} replace={true}>
                  {c.client_name}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 0,
        }}
      >
        <Button component={Link} to="/clients/new">
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography>Add New Client</Typography>
        </Button>
      </Box>
    </Drawer>
  );
};

export default ClientSidebar;
