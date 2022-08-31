import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const Time = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%", marginTop: "80px" }}>
        <p>This is time tracking page.</p>
      </div>
    </>
  );
};

export default Time;
