import { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import axios from "axios";
axios.defaults.withCredentials = true;


interface Props {
    client: Client;
}

const InvoicePageList = ({ client }: Props) => {
    const clientId = client._id;
    const [projectList, setProjectList] = useState<Project[]>([]);
    const navigate = useNavigate();
    const { project_id } = useParams();

  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        { params: { client_id: clientId, autoCorrect: true } }
      );
      setProjectList(result.data.projects);
    };
    getProjects();
  }, [clientId]);

  return (
    <ul>
      {projectList.map((project, idx) => (
        <li
          key={project._id}
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "pink",
            width: "80%",
            justifyContent: "space-between",
            margin: "4px 0 4px 0",
            height: "35px",
            alignItems: "center",
          }}
        >
          {project.name}
          <Button
            size="small"
            onClick={() => {
              navigate(`/app/invoices/${project._id}`);
            }}
          >
            View
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default InvoicePageList;