import { useEffect, useState } from "react";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
    <>
<TableContainer component={Paper} style={{ width: "92%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightgray" }}>
              <TableCell>Project</TableCell>
              <TableCell align="right">Project Invoices</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
      {projectList.map((project, idx) => (
        <TableRow
        key={idx}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                   <TableCell align="right">

          <Button
            size="small"
            onClick={() => {
              navigate(`/app/invoices/projects/${project._id}`);
            }}
            >
            {<VisibilityIcon />}
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

export default InvoicePageList;


       