import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/clientContext";
import TimeSpentChart from "./piechart";
import AmtEarnedChart from "./barchart";
import DashboardProject from "./dashboardproject";
import { useUserContext } from "../../context/userContext";
import { Button, Paper } from "@mui/material";
import DashboardButtons from "./dashboardbuttons";

const Dashboard = () => {
  const { newUser } = useUserContext();
  const [timeperiod, setTimePeriod] = useState<string>("all");

  let navigate = useNavigate();
  // redirect user to fill in billing details on first time loggin in
  if (newUser) navigate("/app/onboard");

  return (
    <>
      <DashboardProject />
      <DashboardButtons setTimePeriod={setTimePeriod} />
      <div
        style={{
          width: "800px",
          marginLeft: "23%",
          marginTop: "20px",
          backgroundColor: "#f0f0f0",
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
      <div
        style={{
          width: "800px",
          marginLeft: "23%",
          marginTop: "20px",
          paddingTop: "20px",
          marginBottom: "50px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <AmtEarnedChart />
      </div>
    </>
  );
};

export default Dashboard;
