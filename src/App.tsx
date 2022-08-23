import React, { useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects/projects";
import Invoices from "./pages/invoices/invoices";
import Page404 from "./pages/notFound/Page404";
import { Project } from "./types/project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route index element={<Clients />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />

        <Route path="projects" element={<Projects />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
