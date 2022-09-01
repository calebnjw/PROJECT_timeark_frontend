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
import { Link, useNavigate } from "react-router-dom";

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

// export default function ClientSidebar() {
const TaskSidebar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

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
          Tasks
        </Typography>
        <List></List>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: 60,
          paddingLeft: "30px",
        }}
      >
        <Button component={Link} to="/tasks/new">
          <AddCircleOutlineIcon fontSize="medium" />
          <Typography>Add New Task</Typography>
        </Button>
      </Box>
    </Drawer>
  );
};

export default TaskSidebar;
