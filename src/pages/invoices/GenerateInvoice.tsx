import { useState, useEffect, useContext } from "react";
import { ClientGlobalContext } from "../../context/clientContext";
import Navbar from "../../components/navbar";
import ClientSidebar from "./clients_sidebar";
import MyTable from "./MyTable";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Project } from "../../types/project";
import { Client } from "../../types/client";
import { TableProps } from "../../types/invoiceTypes"
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import { TabUnselected } from "@mui/icons-material";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

//===============================props==============================//
interface Props {
  clientId?: (value: string) => void;
  setClientId?: (value: string) => void;
  client?: Client;
}

//===============================return==============================//

const GenerateInvoice = (props: Props) => {
  const navigate = useNavigate();
  const { clientId, setClientId } = props;
  const [client, setClient] = useState("");
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
        console.log("GenerateInvoice projectData :" , result.data)
      } catch(err){
        console.log(err)
      }
    }
    projectData();
  }, [])


  //query clientName
  // useEffect(() => {
  //     function singleClientData (
  //       clientlist: Client[]
  //     ): Client[] { 
  //       return clientList.filter((element) => element._id === project_id)
  //     } if (!isLoaded && clientList.length !== 0) {
  //       const selectedClient = singleClientData(project_id,);
  //       console.log("Selected Client: ", selectedClient);
  //       setClient(selectedClient);
  //       setIsLoaded(true);
  //     }
  // }, [isLoaded, clientList, clientId]);



  //===================handle button click=============================//

  const handleGenerateInvoice = () => {
    navigate(`/invoices/${project_id}/new`);
  };

  const handleProjectButton = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      {setClientId && <ClientSidebar setClientId={setClientId} />}
      <div className="prime-container">
        <div className="invoice-heading">
          <Button
            variant="outlined"
            style={{
              left: "30px",
              top: "20px",
            }}
            onClick={handleProjectButton}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
            Projects
          </Button>
          <h1 style={{ textAlign: "center" }}>Invoices</h1>
        </div>
        <div
          className="generate-invoice-container"
          style={{ width: "70%", paddingLeft: "300px" }}
        >
          <Table>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Project Name: </TableCell>
              <TableCell align="left">{project?.name}</TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Client Name: </TableCell>
              <TableCell align="left">{}</TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell align="left">Unbilled Hours: </TableCell>
              <TableCell align="left">10 hours 30mins</TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={handleGenerateInvoice}>
                  Generate Invoice
                </Button>
              </TableCell>
            </TableRow>
          </Table>
          {/* <MyTable/> */}
        </div>
      </div>
    </>
  );
};

export default GenerateInvoice;
