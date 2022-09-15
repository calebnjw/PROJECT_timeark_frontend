import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import { Client } from "../../types/client";
import { Project } from "../../types/project";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  client: Client;
}

const DashboardList = ({ client }: Props) => {
  const clientId = client._id;
  const [projectList, setProjectList] = useState<Project[]>([]);
  const navigate = useNavigate();

  const colors = ["Blue", "Red", "Orange", "Green", "Yellow"];

  useEffect(() => {
    const getProjects = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects`, {
        params: { client_id: clientId, autoCorrect: true },
      });
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
            width: "600px",
            justifyContent: "space-between",
            margin: "5px 0 5px 0",
            height: "50px",
            borderLeft: "10px solid",
            borderLeftColor: colors[idx % colors.length],
            borderTop: "1px solid black",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          {" "}
          <Box
            style={{
              flexDirection: "column",
              marginLeft: "5px",
              marginTop: "50px",
            }}
            onClick={() => {
              navigate(`/app/projects/${project._id}`);
            }}
          >
            <p
              style={{
                marginTop: "-50px",
                fontWeight: "600",
              }}
            >
              {project.name}
            </p>
            <p
              style={{
                fontSize: "12px",
              }}
            >
              {client.client_name}
            </p>
          </Box>
          <p
            style={{
              paddingRight: "10px",
              fontWeight: "600",
              marginTop: "10px",
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
