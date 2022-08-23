import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";

const invoices = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ textAlign: "center" }}>Project invoices list: </div>
    </div>
  );
};

export default invoices;
