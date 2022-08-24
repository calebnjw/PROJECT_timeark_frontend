import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { useGlobalContext } from "../../context/clientContext";
import ProjectList from "./projectList";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>([]);

  // useEffect(() => {
  //   if (selectedClient) {
  //     const getProjects = async () => {
  //       const result = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/projects`,
  //         { params: { client_id: selectedClient, autoCorrect: true } }
  //       );
  //       setProjectList(result.data.projects);
  //     };
  //     getProjects();
  //   }
  // }, [selectedClient]);

  console.log("client: ", clientList);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ textAlign: "right", marginRight: "100px" }}>
        <button>+ New Project</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>Clients/Projects</h2>
        <ul>
          {clientList.map((c, idx) => (
            <li key={idx}>{c.client_name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Projects;
