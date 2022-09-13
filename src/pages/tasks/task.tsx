import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/clientContext";
import { DateTime } from "luxon";
import { Spinner } from "../../components/spinner/spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatesButton from "../timeTracking/datesButtons";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Dates } from "../../types/tasks";
import TaskSideBar from "./taskSideBar";
import { Project } from "../../types/project";
import { Client } from "../../types/client";

import axios from "axios";
axios.defaults.withCredentials = true;

const Tasks = () => {
  // const [dates, setDates] = useState<Dates[]>([]);
  // const [selectedDate, setSelectedDates] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>([]);
  const { clientList, setClientList } = useGlobalContext();

  // function DatesArray() {
  //   const datesArr = [];
  //   let dt = DateTime.now();
  //   for (let i = 4; i >= 0; i--) {
  //     datesArr.push({
  //       display: dt.minus({ days: i }).toFormat("dd LLL"),
  //       formatted: dt.minus({ days: i }).toFormat("yyyy-MM-dd"),
  //     });
  //   }
  //   console.log(datesArr);
  //   setDates(datesArr);
  //   return dt;
  // }

  // useEffect(() => {
  //   DatesArray();
  // }, []);

  return (
    <>
      <TaskSideBar />
      {/* <DatesButton
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /> */}
    </>
  );
};

export default Tasks;
