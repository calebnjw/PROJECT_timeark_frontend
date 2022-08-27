import React, { useState, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { useGlobalContext } from "../../context/clientContext";
import { Client } from "../../types/client";
import { Project } from "../../types/project";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router-dom";

//=================================Props=================================//
interface Props {
  client: Client;
}

//=================================return function=====================//
const InvoiceForm = ({ client }: Props) => {
  const { clientList, setClientList } = useGlobalContext();
  const clientId = client._id;
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [address, setAddress] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [task, setTask] = useState("");
  const [hour, setHour] = useState("");
  const [rate, setRate] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const navigate = useNavigate();

  //get project list
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

  //get client and project list to map
  const clientOptions: any = clientList.map((client) => {
    return { id: client._id, name: client.client_name };
  });

  const projectOptions: any = projectList.map((project) => {
    return { id: project._id, name: project.name };
  });

  console.log("Client Options: ", clientOptions);
  console.log("Project Options: ", projectOptions);

  //handle submit button
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
        client_id: { value: string };
        project_id: { value: string };
    }

    const newInvoice = {
        client: target.name.value,
        project: target.name.value,
    };

    console.log("New Invoice: ", newInvoice);
    // if (newInvoice) {
    //     try {
    //       const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/invoices/new`, newInvoice);
    //     }
    // }
}
  return <></>;
};

export default InvoiceForm;
