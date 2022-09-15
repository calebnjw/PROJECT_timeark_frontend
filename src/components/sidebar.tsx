import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReceiptIcon from "@mui/icons-material/Receipt";
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
              <DashboardIcon
                style={{
                  marginRight: "10px",
                }}
              />
              <Link
                to="/app/dashboard"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Dashboard
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <PersonIcon
                style={{
                  marginRight: "10px",
                }}
              />
              <Link
                to="/app/clients"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Clients
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <WorkIcon
                style={{
                  marginRight: "10px",
                }}
              />
              <Link
                to="/app/projects"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Projects
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <AccessTimeFilledIcon
                style={{
                  marginRight: "10px",
                }}
              />
              <Link
                to={`/app/time/${new Date().toISOString().split("T")[0]}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Time Tracking
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ReceiptIcon
                style={{
                  marginRight: "10px",
                }}
              />
              <Link
                to="/app/invoices"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Invoices
              </Link>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
