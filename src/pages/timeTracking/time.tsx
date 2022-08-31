import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import { useGlobalContext } from "../../context/clientContext";
import { DateTime } from "luxon";
import { Spinner } from "../../components/spinner/spinner";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatesButton from "./datesButtons";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Dates } from "../../types/tasks";
// import TaskSideBar from "./taskSideBar";
import { Project } from "../../types/project";
import { Client } from "../../types/client";

const Time = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const { clientList, setClientList, dates, selectedDate, setSelectedDate } =
    useGlobalContext();

  function DatesArray() {
    const datesArr = [];
    let dt = DateTime.now();
    for (let i = 4; i >= 0; i--) {
      datesArr.push({
        display: dt.minus({ days: i }).toFormat("dd LLL"),
        formatted: dt.minus({ days: i }).toFormat("yyyy-MM-dd"),
      });
    }
    console.log(datesArr);
    // setDates(datesArr);
    return dt;
  }

  useEffect(() => {
    DatesArray();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <p>This is time tracking page.</p>
        <DatesButton
          dates={dates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Footer />
    </>
  );
};

export default Time;
