import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../types/project";
import axios from "axios";
import { InvoiceProps } from "../../types/invoiceTypes";
import { Typography, TextField, Box, MenuItem, Button } from "@mui/material";
axios.defaults.withCredentials = true;

const EditInvoiceForm = () => {
  const [project, setProject] = useState<Project>();
  const [invoice, setInvoice] = useState<InvoiceProps>();
  const navigate = useNavigate();
  
  const handleCancelButton = () => {
    navigate(-1);
  };

  const { invoice_id } = useParams();

  //get invoice data
  useEffect(() => {
    const invoiceData = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/invoices/${invoice_id}`
        );
        setInvoice(result.data.invoice);
        console.log("invoiceresultdata", result.data);
      } catch (err) {
        console.log(err);
      }
    };
    invoiceData();
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      project_id: { value: string};
      month: { value: string};
      paid: { value: boolean};
      overdue: { value: boolean};
      issuedDate: { value: Date};
      amount: { value: number};
    };

    const updateInvoice = {
      project_id: target.project_id.value,
      month: target.selectedMonth.value,
      paid: target.paid.value,
      overdue: target.overdue.value,
      issuedDate: target.issuedDate.value,
      amount: target.amount.value,
    }
    console.log("updateinvoice", updateInvoice)
    try {
      const result: any = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/invoices/${invoice_id}/update`, updateInvoice)
  } catch(err){
    console.log(err)
  }
}

  return (
  <>
     <Box style={{ width: "100%", textAlign: "center" }}>
     <Typography variant="h5">Update Invoice Status</Typography>
     <form
        onSubmit={(e: React.SyntheticEvent) => handleSubmit(e)}
        style={{ width: "50%", margin: "auto" }}
      >
        <TextField
              select
              name="isDone"
              label="Status"
              sx={{ width: 600 }}
              defaultValue={invoice?.paid}
              style={{ marginTop: "10px", marginBottom: "10px" }}
              >
              <MenuItem value={false as any}>Paid</MenuItem>
              <MenuItem value={false as any}>Unpaid</MenuItem>
              <MenuItem value={true as any}>Overdue</MenuItem>
            </TextField>
            <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
          >
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCancelButton}
            >
            CANCEL
          </Button>
          <Button type="submit" value="Submit" variant="contained">
            UPDATE
          </Button>
        </Box>
        </form>
     </Box>
  </>
  )
};

export default EditInvoiceForm;


  //get project; for the project name autofill later
//   useEffect(() => {
//     const projectData = async () => {
//       try {
//         const result = await axios.get(
//           `${process.env.REACT_APP_BACKEND_URL}/projects/${invoice?.project_id}`,
//         );
//         setProject(result.data.projects);
//         console.log("projectdata", result.data)
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     projectData();
//   }, []);
// console.log("projectstate", project)

{/* {" "}
<Box
  style={{
    display: "flex",
    flexDirection: "column",
    width: "600px",
    justifyContent: "space-around",
  }}
>
  <TextField
    type="text"
    name="project"
    label="Project"
    defaultValue={project?.name}
    style={{ marginTop: "10px", marginBottom: "10px" }}
  />
</Box>
<Box>
    <TextField
        type="text"
        name="Month"
        label="Month"
        defaultValue={invoice?.month}
        style={{ marginTop: "10px", marginBottom: "10px" }}
        >
    </TextField>
</Box> */}