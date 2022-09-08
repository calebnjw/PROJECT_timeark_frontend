import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/clientContext";
import TimeSpentChart from "./piechart";
import DashboardList from "./dashboardlist";
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { clientList, setClientList } = useGlobalContext();
  const { newUser } = useUserContext();

  let navigate = useNavigate();
  // redirect user to fill in billing details on first time loggin in
  if (newUser) navigate("/onboard");

  return (
    <>
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
          width: "50%",
          marginLeft: "20%",
          marginTop: "80px",
          border: "1px solid black",
          backgroundColor: "pink",
        }}
      >
        <TimeSpentChart />
      </div>
    </>
  );
};

export default Dashboard;
