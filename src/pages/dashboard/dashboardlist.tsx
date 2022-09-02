import React, { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  client: Client;
}

const DashboardList = ({ client }: Props) => {
  const clientId = client._id;
  const [projectList, setProjectList] = useState<Project[]>([]);
  const navigate = useNavigate();

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
        <li
          key={idx}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            justifyContent: "space-between",
            margin: "5px 0 5px 0",
            height: "50px",
            borderLeft: "5px solid red",
            borderTop: "1px solid black",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          {" "}
          <Box
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "5px",
              marginTop: "5px",
              paddingTop: "8px",
            }}
            onClick={() => {
              navigate(`/projects/${project._id}`);
            }}
          >
            <p
              style={{
                fontSize: "12px",
              }}
            >
              {client.client_name}
            </p>
            <p>{project.name}</p>
          </Box>
          <p
            style={{
              marginTop: "10px",
              paddingRight: "5px",
            }}
          >
            ${project.budget}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default DashboardList;
