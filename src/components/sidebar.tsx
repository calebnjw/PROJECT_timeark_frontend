import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link, Route, Routes, Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
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
        <List>
          <ListItem>
            <ListItemButton>
              <Link to="/home" replace={true}>
                Dashboard
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/clients" replace={true}>
                Clients
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/projects" replace={true}>
                Projects
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/tasks" replace={true}>
                Tasks
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to="/invoices" replace={true}>
                Invoices
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
