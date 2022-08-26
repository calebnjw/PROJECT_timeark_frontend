import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { FormProps } from "../../types/invoiceTypes";
//=================================Props=================================//
type SetFormPropsType = {
  setFormValues?: (value: FormProps[]) => void;
  formValues?: FormProps[];
};

//=================================return function=====================//
const InvoiceForm = ({
  setFormValues,
  formValues,
}: SetFormPropsType) => {
  

  return (
    <>
    </>
  )
}

export default InvoiceForm;
