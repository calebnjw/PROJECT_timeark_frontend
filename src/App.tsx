import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects/projects";
import Invoices from "./pages/invoices/invoices";
import Page404 from "./pages/notFound/Page404";
import { Project } from "./types/project";

interface Props {
  value: object;
  showProject: boolean;
  setShowProject: React.Dispatch<React.SetStateAction<boolean>>;
  projectList: Project[];
  setProjectList: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProject: Project;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project>>;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route index element={<Clients />} />
        <Route path="clients" element={<Clients />} />
        <Route path="projects" element={<Projects />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
