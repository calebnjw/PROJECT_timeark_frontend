import { format } from "date-fns";
import { useEffect } from "react";
import { Task } from "../../types/task";
import { useGlobalContext } from "../../context/clientContext";
import ShowTimer from "./ShowTimer";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  data: string;
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList = (props: Props) => {
  const selectedDate = format(new Date(props.data), "yyyy-MM-dd");
  const taskList = props.taskList;
  const setTaskList = props.setTaskList;
  const { userId } = useGlobalContext();

  useEffect(() => {
    const getTasksBySelectedDate = async () => {
      const tasks = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/time/${selectedDate}`,
        { params: { user_id: userId } }
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

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

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
                            <button>Edit</button>
                          </>
                        ) : (
                          <>
                            <b style={{ backgroundColor: "pink" }}>
                              Task Name: {task.name} | Time Spent:{" "}
                              {/* {computeTime(new Date(), time.startDate)} {" | "} */}
                              {/* {"timer will be showing here: "} */}
                              {/* {setStartDate(time.startDate)} */}
                              <span>{<ShowTimer />}</span>
                            </b>
                            <button
                              onClick={() => {
                                // console.log("time id: ", time._id);
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
      </div>
    );
  } else {
    return <div>You haven't done any task today.</div>;
  }
};

export default TaskList;
