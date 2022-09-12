import { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "date-fns";

import axios from "axios";
axios.defaults.withCredentials = true;

interface Props {
  client: Client;
}

const ProjectList = ({ client }: Props) => {
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
  }, [clientId]);

  return (
    <>
      <TableContainer component={Paper} style={{ width: "92%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgray" }}>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Budget&nbsp;($)</TableCell>
              <TableCell align="right">Rate&nbsp;($/h)</TableCell>
              <TableCell align="right">Due Date</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectList.map((project) => (
              <TableRow
                key={client._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align="right">{project.budget}</TableCell>
                <TableCell align="right">{project.rate}</TableCell>
                <TableCell align="right">
                  {format(new Date(project.due_date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/projects/${project._id}`);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectList;
