import { useState } from "react";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import "./time.css";
import * as React from "react";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Task } from "../../types/task";
import NewTimeForm from "./newTimeForm";
import { useUserContext } from "../../context/userContext";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const today = format(new Date(), "ccc dd MMM yy");
  const [date, setDate] = useState(today);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const { userId } = useUserContext();

  const HandleShowSelectedDateTimeEntrys = (dayStr: any) => {
    setDate(dayStr);
  };

  //* Refactor add new time entry */
  const handleAddTimeEntry = (updatedTask: any) => {
    const isNewTask: any = !taskList.find((t) => t._id == updatedTask._id);
    if (isNewTask) {
      //new task with sinle time entry, add it to task list
      const updatedTaskList = [...taskList, updatedTask];
      setTaskList([]);
      setTaskList(updatedTaskList);
    } else {
      //task already have time entries, update task time entry
      const updatedTaskList = taskList.map((t) => {
        if (t._id == updatedTask._id) {
          t = updatedTask;
        }
        return t;
      });

      setTaskList([]);
      setTaskList(updatedTaskList);
    }
  };

  return (
    <Box>
      {/* <div>
        <pre>{JSON.stringify(taskList, null, 2)}</pre>
      </div> */}
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "3ch",
        }}
      >
        <Grid item>
          <Typography variant="h3">Time Tracking</Typography>
        </Grid>
        <Grid item>
          {today == date && (
            <Button
              variant="contained"
              color="success"
              onClick={handleOpen}
              style={{ width: "150px" }}
            >
              + New Tracker
            </Button>
          )}
        </Grid>
      </Grid>
      <Box style={{ display: "flex", flexDirection: "row", overflow: "auto" }}>
        <Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              style={{ borderRadius: "10px", border: "solid 1px gray" }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <NewTimeForm
                  setOpen={setOpen}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  handleAddTimeEntry={handleAddTimeEntry}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please select your project and task to start tracker. Happy
                Working!
              </Typography>
            </Box>
          </Modal>
        </Box>
        <Calendar
          HandleShowSelectedDateTimeEntrys={HandleShowSelectedDateTimeEntrys}
        />
      </Box>
      {<TaskList date={date} taskList={taskList} setTaskList={setTaskList} />}
    </Box>
  );
};

export default Time;
