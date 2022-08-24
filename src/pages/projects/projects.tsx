import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useGlobalContext } from "../../context/clientContext";
import ProjectList from "./projectList";
import { Link } from "react-router-dom";

const Projects = () => {
  const { clientList, setClientList } = useGlobalContext();

  return (
    <>
      <Navbar />
      <Sidebar />
      <div style={{ width: "80%", marginLeft: "20%" }}>
        <div style={{ textAlign: "right", marginRight: "100px" }}>
          <button>
            <Link to="/projects/new">+ New Project</Link>
          </button>
        </div>
        <div>
          <h2>Clients/Projects</h2>
          <ul>
            {clientList.map((client, idx) => (
              <li key={idx}>
                <p style={{ fontWeight: "200" }}>
                  <b>{client.client_name}</b>
                </p>
                <ProjectList client={client} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Projects;
