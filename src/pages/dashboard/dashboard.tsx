import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/clientContext";
import TimeSpentChart from "./piechart";
import DashboardList from "./dashboardlist";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useUserContext } from "../../context/userContext";
import { Button } from "@mui/material";

const Dashboard = () => {
  const { clientList, setClientList } = useGlobalContext();
  const { newUser } = useUserContext();
  const [timeperiod, setTimePeriod] = useState<string>("all");

  let navigate = useNavigate();
  // redirect user to fill in billing details on first time loggin in
  if (newUser) navigate("/onboard");

  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        style={{
          width: "50%",
          marginLeft: "20%",
          marginTop: "80px",
          border: "1px solid black",
          backgroundColor: "pink",
        }}
      >
        <h2
          style={{
            marginLeft: "10%",
          }}
        >
          Projects
        </h2>
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {clientList.map((client, idx) => (
            <li key={idx}>
              <DashboardList client={client} />
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "20%",
          marginTop: "50px",
          width: "600px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setTimePeriod("week");
          }}
        >
          Week View
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setTimePeriod("month");
          }}
        >
          Month View
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setTimePeriod("all");
          }}
        >
          All Time
        </Button>
      </div>
      <div
        style={{
          width: "50%",
          marginLeft: "20%",
          marginTop: "20px",
          border: "1px solid black",
          backgroundColor: "pink",
        }}
      >
        {(() => {
          if (timeperiod === "week") {
            return <TimeSpentChart timeperiod={timeperiod} />;
          }
          return null;
        })()}
        {(() => {
          if (timeperiod === "month") {
            return <TimeSpentChart timeperiod={timeperiod} />;
          }
          return null;
        })()}
        {(() => {
          if (timeperiod === "all") {
            return <TimeSpentChart timeperiod={timeperiod} />;
          }
          return null;
        })()}
      </div>
    </>
  );
};

export default Dashboard;
