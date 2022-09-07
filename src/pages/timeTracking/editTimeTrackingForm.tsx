import React, { useEffect, useState } from "react";
import { Task } from "../../types/task";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import axios from "axios";
axios.defaults.withCredentials = true;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  color: "black",
  fontSize: "large",
}));

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  userId: string;
  selectedTaskId: string;
  selectedTimeTrackingId: string;
  setUpdatedEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setIsDeleted: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface TimeTracking {
  startDate: Date;
  endDate: Date;
  _id: string;
}

const EditTimeTrackingForm = ({
  setOpen,
  taskList,
  setTaskList,
  userId,
  selectedTaskId,
  selectedTimeTrackingId,
  setUpdatedEndDate,
  setIsDeleted,
}: Props) => {
  const [currentTask, setCurrentTask] = useState<Task>();
  const [currentTimeTracking, setCurrentTimeTracking] =
    useState<TimeTracking>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [updatedTimeSpent, setUpdatedTimeSpent] = useState(0);

  useEffect(() => {
    const getCurrentTimeTrackingInfo = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedTaskId}/timetrackings/${selectedTimeTrackingId}`
      );

      const task = result.data.task;
      if (task) {
        setCurrentTask(result.data.task);
      }
      const time_tracking = result.data.time_tracking;
      if (time_tracking) {
        setCurrentTimeTracking(result.data.time_tracking);
      }
      setIsLoaded(true);
    };

    getCurrentTimeTrackingInfo();
  }, []);

  const computeTime = (t1: Date, t2: Date) => {
    const endDate: any = new Date(t1);
    const startDate: any = new Date(t2);
    const timeDifference = endDate - startDate;
    const hours = timeDifference / (1000 * 60 * 60);
    return hours.toFixed(2);
  };

  if (isLoaded) {
    const endD: any = currentTimeTracking?.endDate;
    const startD: any = currentTimeTracking?.startDate;
    const timeSpent = computeTime(endD, startD);

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const timeEntry: any = event.target.value;
      setUpdatedTimeSpent(timeEntry);
    };

    const handleUpdateTimeEntry = async (e: any) => {
      e.preventDefault();

      if (updatedTimeSpent) {
        try {
          const result = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedTaskId}/timetrackings/${selectedTimeTrackingId}/update`,
            { updatedTimeSpent: updatedTimeSpent }
          );

          const updatedTimeEntryObj = result.data.updatedTimeTracking;
          const newEndDate: Date = updatedTimeEntryObj?.endDate;
          setUpdatedEndDate(newEndDate);
          setOpen(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleDeleteTimeEntry = async () => {
      try {
        const result = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedTaskId}/timetrackings/${selectedTimeTrackingId}`
        );

        if (result.data.msg === "time tracking record removed!") {
          // setIsDeleted(true);
        }

        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <div>Update Task Time Entry </div>
        <div>
          <p>Project/Task</p>
          <Box style={{ marginTop: "0px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "400px",
                height: "200px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Stack
                direction="column"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
              >
                <Item>{currentTask?.name}</Item>
                <Item>{currentTask?.category}</Item>
                <TextField
                  name="time_entry"
                  label="*Time Entry(Hours)"
                  type="number"
                  defaultValue={timeSpent}
                  onChange={handleTaskChange}
                ></TextField>
              </Stack>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleUpdateTimeEntry}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                type="submit"
                onClick={handleDeleteTimeEntry}
              >
                Delete
              </Button>
            </div>
          </Box>
        </div>
      </>
    );
  } else {
    return <>Loading</>;
  }
};

export default EditTimeTrackingForm;
