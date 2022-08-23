import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { Project } from "../../types/project";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  clientList: Client[];
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
}

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [selectedClient, setSelectedClient] = useState<string>("");

  console.log("project - client list: ", clientList);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProjectSidebar
        setSelectedClient={setSelectedClient}
        clientList={clientList}
      />
      <div style={{ textAlign: "center" }}>Project list: </div>
    </div>
  );
};

export default Projects;
