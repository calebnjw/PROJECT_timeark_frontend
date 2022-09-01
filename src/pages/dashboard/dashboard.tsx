import React from "react";

import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        This is dashboard, all charts will be showing here later!
      </div>
    </>
  );
};

export default Dashboard;
