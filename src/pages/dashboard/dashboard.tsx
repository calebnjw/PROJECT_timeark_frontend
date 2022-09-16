import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import TimeSpentChart from "./piechart";
import AmtEarnedChart from "./barchart";
import DashboardProject from "./dashboardproject";
import DashboardButtons from "./dashboardbuttons";
import { Grid } from "@mui/material";

export default function Dashboard() {
  const { newUser } = useUserContext();
  const [timeperiod, setTimePeriod] = useState<string>("all");

  let navigate = useNavigate();

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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TimeSpentChart timeperiod={timeperiod} />
        </Grid>
        <Grid item xs={6}>
          <AmtEarnedChart />
        </Grid>
      </Grid>
    </div>
  );
}
