import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { useGlobalContext } from "../../context/clientContext";
import SingleProject from "./singleProject";

import axios from "axios";
axios.defaults.withCredentials = true;

// interface Props {
//   clientList: Client[];
//   selectedClient: string;
//   setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
// }

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();
  const [selectedClient, setSelectedClient] = useState<string>("");

  console.log("client id: ", selectedClient);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProjectSidebar
        setSelectedClient={setSelectedClient}
        clientList={clientList}
      />
      <SingleProject selectedClient={selectedClient} />
      <div style={{ textAlign: "center" }}>Project list: </div>
    </div>
  );
};

export default Projects;
