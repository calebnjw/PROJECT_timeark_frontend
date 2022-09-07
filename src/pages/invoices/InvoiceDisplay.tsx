import React from "react";
import { Button, Divider } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Navbar from "../../components/navbar";



const InvoiceDisplay = () => {

  //what we need >>>>
  //invoice from: user's name
  //invoice for: client name & address
  //invoice ID
  //Issued date
  //due date
  //Task: task name
  //Description: Category 
  //Hours
  //Rate
  //Amount
  //Total Amount (final)

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="invoice-header">
          <Button variant="outlined" style={{ left: "50px", top: "30px" }}>
            <KeyboardArrowLeftIcon fontSize="large" />
            Invoices
          </Button>
          <h1 style={{ textAlign: "center" }}>Invoice</h1>
        </div>
        <Divider />
      </div>
    </>
  );
};

export default InvoiceDisplay;
