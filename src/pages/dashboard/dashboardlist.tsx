import React, { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
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
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/projects`,
        {
          params: { client_id: clientId, autoCorrect: true },
        }
      );
      setProjectList(result.data.projects);
    };
    getProjects();
  }, []);

  return (
    <ul>
      {projectList.map((project, idx) => (
        <Box
          key={idx}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "600px",
            justifyContent: "space-between",
            margin: "5px 0 5px 0",
            padding: "0 5px 0 5px",
            height: "50px",
            borderLeft: "10px solid",
            borderLeftColor: colors[idx % colors.length],
            borderTop: "1px solid black",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }}
          onClick={() => {
            navigate(`/app/projects/${project._id}`);
          }}
        >
          <Stack>
            <p
              style={{
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
          </Stack>
          <p
            style={{
              fontWeight: "600",
              textAlign: "right",
              alignSelf: "center",
            }}
          >
            ${project.budget}
          </p>
        </Box>
      ))}
    </ul>
  );
};

export default DashboardList;
