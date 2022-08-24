import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./pages/home/home";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/projects/projects";
import Invoices from "./pages/invoices/invoices";
import Page404 from "./pages/notFound/Page404";
import { ClientGlobalContext } from "./context/clientContext";
import NewProject from "./pages/projects/newProjectForm";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`
      ); // add query user_id as 2nd param: {params: {user_id: userId}}
      setClientList(result.data);
    };
    getClients();
  }, []);

  console.log("client list: ", clientList);

  return (
    <BrowserRouter>
      <ClientGlobalContext.Provider value={{ clientList, setClientList }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route index element={<Clients />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<AddClient />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ClientGlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
