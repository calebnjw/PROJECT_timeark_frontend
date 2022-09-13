import { useState } from "react";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import "./time.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Task } from "../../types/task";
import NewTimeForm from "./newTimeForm";

import { useUserContext } from "../../context/userContext";

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
  const [data, setData] = useState(String(new Date()));
  const today = new Date();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { userId } = useUserContext();
  console.log("task list: ", taskList);

  const HandleShowSelectedDateTimeEntrys = (dayStr: any) => {
    setData(dayStr);
  };

  //* Refactor add new time entry */
  const handleAddTimeEntry = (updatedTask: any) => {
    const isNewTask: any = !!taskList.find((t) => t._id == updatedTask._id);
    if (isNewTask) {
      // If task already exists then update task
      const updatedTaskList = taskList.map((t) => {
        if (t._id == updatedTask._id) {
          t = updatedTask;
        }
        return t;
      });

      setTaskList([]);
      setTaskList(updatedTaskList);
    } else {
      //if not, add it to task list
      const updatedTaskList = [...taskList, updatedTask];
      setTaskList([]);
      setTaskList(updatedTaskList);
    }
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          marginLeft: "20%",
          marginTop: "80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", overflow: "auto" }}>
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
                  <NewTimeForm
                    setOpen={setOpen}
                    taskList={taskList}
                    setTaskList={setTaskList}
                    userId={userId}
                    handleAddTimeEntry={handleAddTimeEntry}
                  />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Please select your project and task to start tracker. Happy Working!
                </Typography>
              </Box>
            </Modal>
          </div>
          <Calendar HandleShowSelectedDateTimeEntrys={HandleShowSelectedDateTimeEntrys} />
        </div>
        <br />
        {<TaskList data={data} taskList={taskList} setTaskList={setTaskList} />}
      </div>
    </>
  );
};

export default Time;
