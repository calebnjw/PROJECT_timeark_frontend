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
import { Link, useNavigate } from "react-router-dom";
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
  //not sure if need React.Dispatch
  setClientId: (value: string) => void;
}

// export default function ClientSidebar() {
const ClientSidebar = (props: Props
) => {
  const classes = useStyles();
  const { setClientId } = props;
  const [clientList, setClientList] = useState<Client[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`
      ); // add query user_id as 2nd param
      setClientList(result.data);
    };
    getClients();
  }, []);

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
                <Button
                  onClick={() => {
                    setClientId(`${c._id}`)
                  }}
                >
                  {c.client_name}
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      
        <Button onClick={() => {
          navigate(`/invoices/new`)
        }}>
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography>Generate Invoice</Typography>
        </Button>
    </Drawer>
  );
};

export default ClientSidebar;
