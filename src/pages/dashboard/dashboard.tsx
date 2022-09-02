import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/clientContext";
import DashboardList from "./dashboardlist";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const Dashboard = () => {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div
        style={{
          width: "60%",
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
    </>
  );
};

export default Dashboard;
