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
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import "./time.css";

const Time = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [data, setData] = useState("");
  const today = new Date();

  const showDetailsHandle = (dayStr: any) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <Calendar showDetailsHandle={showDetailsHandle} />
        <br />

        {showDetails ? (
          <TaskList data={data} />
        ) : (
          <TaskList data={String(today)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Time;
