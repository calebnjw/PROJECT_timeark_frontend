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
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/clientContext";

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
  date: string;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = (props: Props) => {
  const selectedDate = format(new Date(props.date), "yyyy-MM-dd");
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
  const navigate = useNavigate();
  const { clientList, setClientList } = useGlobalContext();

  const showClientProjectName = (projectId: any) => {
    // Get Project Name through project id:
    const task = taskList.find((t) => t.project_id == projectId);
    const project: any = task?.project_id;
    const projectName = project.name;
    // Get Client Name through client id:
    const client = clientList.find((c) => c._id == project.client_id);
    const clientName = client?.client_name;
    return `${clientName}/${projectName}`;
  };

  useEffect(() => {
    console.log("selected date: ", selectedDate);
    const getTasksBySelectedDate = async () => {
      const tasks = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/time/${selectedDate}`
      );
      const taskArr = tasks.data.tasksBySelectedDate;
      console.log("taskArr: ", taskArr);
      if (taskArr) {
        setTaskList(taskArr);
      } else {
        setTaskList([]);
      }
      navigate(`/app/time/${selectedDate}`);
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
        // setTaskList([]);
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

  if (taskList.length > 0) {
    return (
      <Box
        sx={{
          width: "100%",
          paddingLeft: "10%",
          paddingRight: "10%",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* <Box sx={{ width: "100%", textAlign: "center" }}>
          Selected Date: {props.data}
        </Box> */}
        <Box>
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
                  <li key={idx} style={{ textDecoration: "none" }}>
                    <ul style={{ width: "100%" }}>
                      {task.time_trackings
                        .filter((item) => {
                          if (
                            format(new Date(item.startDate), "yyyy-MM-dd") ==
                            selectedDate
                          )
                            return true;
                          return false;
                        })
                        .map((time, idx) => (
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
                              textDecoration: "none",
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
                                  justifyContent: "space-between",
                                  border: "solid 2px green",
                                  borderRadius: "8px",
                                }}
                              >
                                <Typography
                                  style={{
                                    width: "30%",
                                    textAlign: "center",
                                  }}
                                >
                                  {task.name}
                                </Typography>
                                <Typography
                                  style={{ width: "40%", textAlign: "center" }}
                                >
                                  {showClientProjectName(task.project_id)}
                                </Typography>
                                <Typography
                                  style={{
                                    width: "30%",
                                    textAlign: "center",
                                  }}
                                >
                                  {computeTime(time.endDate, time.startDate)}{" "}
                                </Typography>
                                <Box
                                  style={{ width: "30%", textAlign: "center" }}
                                >
                                  <Button
                                    style={{
                                      width: "100px",
                                      marginLeft: "15px",
                                    }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      showEditTimeTrackingModal(
                                        task._id,
                                        time._id
                                      );
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </Box>
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
                                  border: "solid 2px gray",
                                  borderRadius: "8px",
                                }}
                              >
                                <Typography
                                  style={{
                                    width: "30%",
                                    textAlign: "center",
                                  }}
                                >
                                  {task.name}
                                </Typography>
                                <Typography
                                  style={{ width: "40%", textAlign: "center" }}
                                >
                                  {showClientProjectName(task.project_id)}
                                </Typography>
                                <Box
                                  style={{
                                    width: "32.5%",
                                    textAlign: "center",
                                  }}
                                >
                                  <ShowTimer startDate={time.startDate} />
                                </Box>
                                <Box
                                  style={{
                                    width: "27.5%",
                                    textAlign: "center",
                                  }}
                                >
                                  <Button
                                    style={{
                                      width: "100px",
                                      marginRight: "12px",
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                      handleStopTimer(task._id, time._id);
                                    }}
                                  >
                                    Stop
                                  </Button>
                                </Box>
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
            <Box
              sx={style}
              style={{ borderRadius: "10px", border: "solid 1px gray" }}
            >
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
            </Box>
          </Modal>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box>Selected Date: {props.date}</Box>
        <Box>You have no time entry here.</Box>
      </Box>
    );
  }
};

export default TaskList;
