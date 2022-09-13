import { format } from "date-fns";
import { useEffect } from "react";
import { Task } from "../../types/task";
import ShowTimer from "./ShowTimer";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditTimeTrackingForm from "./editTimeTrackingForm";

import { useUserContext } from "../../context/userContext";

import * as _ from "lodash";

import axios from "axios";
import { AnalyticsRounded } from "@mui/icons-material";
axios.defaults.withCredentials = true;

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

interface Props {
  data: string;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = (props: Props) => {
  const selectedDate = format(new Date(props.data), "yyyy-MM-dd");
  const taskList = props.taskList;
  const setTaskList = props.setTaskList;
  const { userId } = useUserContext();
  const today = format(new Date(), "yyyy-MM-dd");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedTimeTrackingId, setSelectedTimeTrackingId] =
    React.useState("");
  const [selectedTaskId, setSelectedTaskId] = React.useState("");
  // Props for edit&delete time entry below:

  useEffect(() => {
    const getTasksBySelectedDate = async () => {
      const tasks = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/time/${selectedDate}`
      );
      const taskArr = tasks.data.tasksBySelectedDate;
      if (taskArr) {
        setTaskList(taskArr);
      } else {
        setTaskList([]);
      }
    };
    getTasksBySelectedDate();
  }, [selectedDate]);

  const computeTime = (t1: Date, t2: Date) => {
    const endDate: any = new Date(t1);
    const startDate: any = new Date(t2);
    const timeDifference = endDate - startDate;
    const hours = timeDifference / (1000 * 60 * 60);
    return hours.toFixed(2);
  };

  const handleStopTimer = async (taskId: string, timerId: string) => {
    if (taskId && timerId) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}/timetrackings/${timerId}/stop`
        );

        const updatedTask = result.data.getUpdatedTask;
        const updatedTaskList = taskList.map((t) => {
          if (t._id == updatedTask._id) {
            return (t = updatedTask);
          }
          return t;
        });
        setTaskList([]);
        setTaskList(updatedTaskList);
      } catch (error) {
        console.log("Error message: ", error);
      }
    }
  };

  const showEditTimeTrackingModal = (
    taskId: string,
    timeTrackingId: string
  ) => {
    handleOpen();
    setSelectedTaskId(taskId);
    setSelectedTimeTrackingId(timeTrackingId);
  };

  const handleUpdate = (updatedEndDate: Date) => {
    if (updatedEndDate) {
      const updatedTaskList = taskList.map((t) => {
        if (t._id == selectedTaskId) {
          t.time_trackings.map((tt) => {
            if (tt._id == selectedTimeTrackingId) {
              return (tt.endDate = updatedEndDate);
            }
          });
        }
        return t;
      });
    }
    return;
  };

  const handleDeletion = () => {
    const updatedTaskList = taskList.map((t) => {
      if (t._id === selectedTaskId) {
        // check time_trackings arr length
        if (t.time_trackings.length === 1) {
          const idxOfTaskToDelete = taskList.findIndex(
            (t) => t._id == selectedTaskId
          );
          taskList.splice(idxOfTaskToDelete, 1);
          return t;
        } else {
          const filtered = t.time_trackings.filter(
            (tt) => tt._id !== selectedTimeTrackingId
          );
          t.time_trackings = filtered;
          return t;
        }
      }
      return t;
    });
  };

  if (taskList.length) {
    return (
      <div>
        <p>Selected Date: {props.data}</p>
        <div>
          <ul>
            {taskList.length &&
              taskList.map((task, idx) => (
                <li key={idx}>
                  <ul>
                    {task.time_trackings.map((time, idx) => (
                      <li key={idx}>
                        {time.endDate ? (
                          <>
                            <b>
                              {" "}
                              Task Name: {task.name} | Time Spent:{" "}
                              {computeTime(time.endDate, time.startDate)} {"H"}
                            </b>
                            <>
                              <button
                                onClick={() => {
                                  showEditTimeTrackingModal(task._id, time._id);
                                }}
                              >
                                Edit
                              </button>
                              {/* <Button onClick={handleOpen}>Edit</Button> */}
                            </>
                          </>
                        ) : (
                          <>
                            <b style={{ backgroundColor: "pink" }}>
                              Task Name: {task.name} | Time Spent:{" "}
                              <ShowTimer startDate={time.startDate} />
                            </b>
                            <button
                              onClick={() => {
                                handleStopTimer(task._id, time._id);
                              }}
                            >
                              Stop
                            </button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
        <div>
          {/* Modal Window: edit time tracking */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <EditTimeTrackingForm
                  setOpen={setOpen}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  userId={userId}
                  selectedTaskId={selectedTaskId}
                  selectedTimeTrackingId={selectedTimeTrackingId}
                  handleUpdate={handleUpdate}
                  handleDeletion={handleDeletion}
                />
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please select your project and task to start tracker. Happy
                Working!
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    );
  } else {
    if (today === selectedDate && taskList.length) {
      return (
        <Box>
          <Box>Selected Date: {props.data}</Box>
          <Box>Loading Data</Box>
        </Box>
      );
    } else {
      return (
        <Box>
          <Box>Selected Date: {props.data}</Box>

          <Box>You haven't done any task here.</Box>
        </Box>
      );
    }
  }
};

export default TaskList;
