import { useState, useEffect, useContext } from "react";
import { ClientGlobalContext } from "../../context/clientContext";
import Navbar from "../../components/navbar";
import ClientSidebar from "./clients_sidebar";
import MyTable from "./MyTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Project } from "../../types/project";
import { Client } from "../../types/client";
import { TableProps } from "../../types/invoiceTypes"
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import { TabUnselected } from "@mui/icons-material";
import {
  Table,
  TableRow,
  TableCell,
  styled,
  Button,
  Grid,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableBody,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
} from "@mui/material";
import { conformsTo } from "lodash";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//===================================Table styling==========================//
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
              top: "20px",
            }}
            onClick={handleProjectButton}
            >
            <KeyboardArrowLeftIcon/>
          </Button>
          </Grid>
          {/* <Grid item xs={11}>
              <h1 style={{ textAlign: "center" }}>Invoices</h1>
          </Grid> */}
              </Grid>
          <Table style={{marginBottom: "30px", marginTop: "30px"}}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Project</StyledTableCell>
                <StyledTableCell align="center">Client</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">{project?.name}</StyledTableCell>
                <StyledTableCell align="center">{client?.client_name}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
          <h1>Invoices</h1>
          <MyTable/>
        </div>
      </div>
    </>
  );
};

export default GenerateInvoice;

       