import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { FormProps } from "../../types/invoiceTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

//=================================Props=================================//


//================================variables============================//


//=================================return function=====================//
const InvoiceForm = () => {
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState("");
  const [hour, setHour] = useState("");
  const [rate, setRate] = useState("");


  return (
    <>
    </>
  )
}

export default InvoiceForm;
