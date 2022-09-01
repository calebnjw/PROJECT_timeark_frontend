import { format } from "date-fns";
import { useEffect, useState } from "react";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  data: string;
}

const TaskList = (props: Props) => {
  const selectedDate = format(new Date(props.data), "yyyy-MM-dd");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getTasksBySelectedDate = async () => {
      const tasks = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/tasks/${selectedDate}`
      );
      console.log("selected data task list: ", tasks);
    };
    getTasksBySelectedDate();
  });

  return <div>Selected Date: {props.data}</div>;
};

export default TaskList;
