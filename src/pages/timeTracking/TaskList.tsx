import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Task, Time } from "../../types/task";

import axios from "axios";
import el from "date-fns/esm/locale/el/index.js";
axios.defaults.withCredentials = true;

interface Props {
  data: string;
}

const TaskList = (props: Props) => {
  const selectedDate = format(new Date(props.data), "yyyy-MM-dd");
  const [taskList, setTaskList] = useState<Task[]>([]);

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

  if (taskList) {
    return (
      <div>
        <p>Selected Date: {props.data}</p>
        <div>
          <ul>
            {taskList.length &&
              taskList.map((task, idx) => (
                <li key={idx}>
                  Task Name: {task.name} <br /> Hours Spent:{" "}
                  <ul>
                    {task.time_tracking.map((time, idx) => (
                      <li key={idx}>{time.hours}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return <div>No Task Available</div>;
  }
};

export default TaskList;
