import { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
import Calendar from "./Calendar";
import TaskList from "./TaskList";
import "./time.css";
import Modal from "./Modal";
import newTimeForm from "./newTimeForm";

const Time = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [data, setData] = useState("");
  const today = new Date();

  const showDetailsHandle = (dayStr: any) => {
    setData(dayStr);
    setShowDetails(true);
  };

  const handleNewTimeTracking = () => {
    console.log("you click me");
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        {Modal(newTimeForm)}
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
