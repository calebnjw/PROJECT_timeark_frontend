import React, { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  client: Client;
}

const ProjectList = ({ client }: Props) => {
  const clientId = client._id;
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        { params: { client_id: clientId, autoCorrect: true } }
      );
      setProjectList(result.data.projects);
    };
    getProjects();
  }, []);

  return (
    <ul>
      {projectList.map((project, idx) => (
        <li key={idx} style={{ backgroundColor: "pink" }}>
          {project.name}
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
