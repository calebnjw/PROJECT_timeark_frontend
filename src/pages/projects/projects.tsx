import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import ProjectSidebar from "./projects_sidebar";
import { useGlobalContext } from "../../context/clientContext";
import SingleProject from "./singleProject";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

const Projects = () => {
  let initalSelectedClient;
  const { clientList, setClientList } = useGlobalContext();
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    if (clientList.length) {
      initalSelectedClient = clientList[0]._id;
      setSelectedClient(initalSelectedClient);
    }
    if (selectedClient) {
      const getProjects = async () => {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/projects`,
          { params: { client_id: selectedClient, autoCorrect: true } }
        );
        setProjectList(result.data.projects);
      };
      getProjects();
    }
  }, [selectedClient]);

  console.log("projects: ", projectList);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <ProjectSidebar
        setSelectedClient={setSelectedClient}
        clientList={clientList}
      />
      <div style={{ textAlign: "center" }}>
        Project list:
        {projectList && <SingleProject projectList={projectList} />}
      </div>
    </div>
  );
};

export default Projects;
