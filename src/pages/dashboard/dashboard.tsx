import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/userContext";

import TimeSpentChart from "./piechart";
import AmtEarnedChart from "./barchart";
import DashboardProject from "./dashboardproject";
import DashboardButtons from "./dashboardbuttons";

const Dashboard = () => {
  const { newUser } = useUserContext();
  const [timeperiod, setTimePeriod] = useState<string>("all");

  let navigate = useNavigate();
  // redirect user to fill in billing details on first time loggin in
  if (newUser) navigate("/app/onboard");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardProject />
      <DashboardButtons setTimePeriod={setTimePeriod} />
      <div>
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
      <div>
        <AmtEarnedChart />
      </div>
    </div>
  );
};

export default Dashboard;
