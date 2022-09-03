import { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import "./time.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import NewTimeForm from "./newTimeForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Time = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [data, setData] = useState("");
  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showDetailsHandle = (dayStr: any) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Button onClick={handleOpen}>+ New Tracker</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <NewTimeForm />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please select your project and task to start tracker. Happy
                  Working!
                </Typography>
              </Box>
            </Modal>
          </div>
          <Calendar showDetailsHandle={showDetailsHandle} />
        </div>
        <br />

        {showDetails ? (
          <TaskList data={data} />
        ) : (
          <TaskList data={String(today)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Time;
