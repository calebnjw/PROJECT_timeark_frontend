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

  const hanleGetClientAndProjectName = (projectId: any) => {
    return "Client Name/Project Name";
  };

  if (taskList.length) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* <Box sx={{ width: "100%", textAlign: "center" }}>
          Selected Date: {props.data}
        </Box> */}
        <Box>
          <hr />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              fontSize: "large",
            }}
          >
            <Typography>
              <b>Task Name</b>
            </Typography>
            <Typography>
              <b>Client/Project</b>
            </Typography>
            <Typography>
              <b>Time Entry(hours)</b>
            </Typography>
            <Typography>
              <b>Actions</b>
            </Typography>
          </Box>
          <hr />

          <Box sx={{ width: "100%" }}>
            <ul style={{ width: "100%" }}>
              {taskList.length &&
                taskList.map((task, idx) => (
                  <li key={idx}>
                    <ul style={{ width: "100%" }}>
                      {task.time_trackings.map((time, idx) => (
                        <li
                          key={idx}
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            height: "50px",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          {time.endDate ? (
                            <Box
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                height: "50px",
                                justifyContent: "space-around",
                                // backgroundColor: "green",
                                border: "solid 2px green",
                                borderRadius: "8px",
                              }}
                            >
                              <Typography>{task.name}</Typography>
                              <Typography>
                                {hanleGetClientAndProjectName(task.project_id)}
                              </Typography>
                              <Typography>
                                {computeTime(time.endDate, time.startDate)}{" "}
                              </Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                  showEditTimeTrackingModal(task._id, time._id);
                                }}
                              >
                                Edit
                              </Button>
                            </Box>
                          ) : (
                            <Box
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                height: "50px",
                                backgroundColor: "pink",
                                justifyContent: "space-around",
                                border: "solid 1px gray",
                                borderRadius: "8px",
                              }}
                            >
                              <Typography>{task.name}</Typography>
                              <Typography>
                                {hanleGetClientAndProjectName(task.project_id)}
                              </Typography>
                              <Typography>
                                <ShowTimer startDate={time.startDate} />
                              </Typography>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  handleStopTimer(task._id, time._id);
                                }}
                              >
                                Stop
                              </Button>
                            </Box>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </Box>
        </Box>
        <Box>
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
        </Box>
      </Box>
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
