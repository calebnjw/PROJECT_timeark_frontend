import React, { useEffect, useState } from "react";
import { Project } from "../../types/project";
import axios from "axios";
import console from "console";
axios.defaults.withCredentials = true;

interface Props {
  selectedClient: string;
}

const SingleProject = ({ selectedClient }: Props) => {
  const [projectList, setProjectList] = useState<Project[]>([]);

  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        { params: { client_id: selectedClient } }
      );
      setProjectList(result.data);
    };
    getProjects();
  }, []);
  // console.log("project list: ", projectList);

  return (
    <div>
      <h4>Single project</h4>
      <p>
        {projectList.map((p) => (
          <li>{p.name}</li>
        ))}
      </p>
    </div>
  );
};

export default SingleProject;
