import AppNavbar from "../../components/navbar-App";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import ProjectList from "./projectList";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <>
      <AppNavbar />
      <Sidebar />

      <div
        style={{
          width: "80%",
          marginLeft: "20%",
          marginTop: "80px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2>Clients/Projects</h2>
            </div>
            <div style={{ textAlign: "right", marginRight: "100px" }}>
              <Button variant="contained" color="success">
                <Link
                  to="new"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  + New Project
                </Link>
              </Button>
            </div>
          </div>
          <ul>
            {clientList.map((client, idx) => (
              <li key={idx} style={{ listStyle: "none", marginTop: "10px" }}>
                <p style={{ fontWeight: "400" }}>
                  <b>{client.client_name}</b>
                </p>
                <ProjectList client={client} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Projects;
