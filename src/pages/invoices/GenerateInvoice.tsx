import { useState, useEffect, useContext } from "react";
import { ClientGlobalContext } from "../../context/clientContext";
import Navbar from "../../components/navbar";
import ClientSidebar from "./clients_sidebar";
import MyTable from "./MyTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Table, TableRow, TableCell, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Project } from "../../types/project";
import { Client } from "../../types/client";
import { TableProps } from "../../types/invoiceTypes"
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import { TabUnselected } from "@mui/icons-material";
import { conformsTo } from "lodash";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//===============================props==============================//


//===============================return==============================//

const GenerateInvoice = () => {
  const navigate = useNavigate();
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState<Client>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [project, setProject] = useState<Project>();
  const { clientList } = useContext(ClientGlobalContext);

  const { project_id } = useParams();
  console.log(project_id);


  //==============================query===================================//
  
  //query projectName
  useEffect(() => {
    const projectData = async() => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${project_id}`)
        setProject(result.data.project);
        setClientId(result.data.project.client_id)
        console.log("GenerateInvoice projectData :" , result.data)
      } catch(err){
        console.log(err)
      }
    }
    projectData();
  }, [])


  useEffect(() => {
    if(clientId){
      console.log(clientId)
      const clientData = async() => {
        try {
          const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients/${clientId}`)
          setClient(result.data[0])
          console.log("Client data: ", result.data[0])
        } catch(err){
          console.log(err)
        }
      }
      clientData();
    }
  }, [clientId])


  //===================handle button click=============================//

  // const handleGenerateInvoice = () => {
  //   navigate(`/invoices/${project_id}/new`);
  // };

  const handleProjectButton = () => {
    navigate("/invoices")
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      {setClientId && <ClientSidebar setClientId={setClientId} />}
        <div className="invoice-heading">
        <div
          className="generate-invoice-container"
          style={{ width: "100%", paddingLeft: "530px", paddingTop: "50px", paddingRight: "50px" }}
          >
          <Grid container spacing={2}>
            <Grid item xs={1}>
      
          <Button
            variant="outlined"
            style={{
              left: "30px",
              top: "20px",
            }}
            onClick={handleProjectButton}
            >
            <KeyboardArrowLeftIcon fontSize="large" />
            Back
          </Button>
          </Grid>
          <Grid item xs={11}>
              <h1 style={{ textAlign: "center" }}>Invoices</h1>
          </Grid>
              </Grid>
          <Table>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Project Name: </TableCell>
              <TableCell align="left">{project?.name}</TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Client Name: </TableCell>
              <TableCell align="left">{client?.client_name}</TableCell>
            </TableRow>
                {/* <Button variant="outlined" onClick={handleGenerateInvoice}>
                  Generate Invoice
                </Button> */}
          </Table>
          <MyTable/>
        </div>
      </div>
    </>
  );
};

export default GenerateInvoice;
