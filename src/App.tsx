import React, { useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.scss";

// import HomeLayout from "./layout/homeLayout";

import Home from "./pages/home/home";
import Login from "./pages/login/login";

import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";
import EditSingleClient from "./pages/clients/editSingleClients";

import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import SingleProject from "./pages/projects/singleProject";
import EditProjectForm from "./pages/projects/editProjectForm";

import Invoices from "./pages/invoices/invoices";

import Profile from "./pages/profile/profile";

import Page404 from "./pages/notFound/Page404";

import { ClientGlobalContext } from "./context/clientContext";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients`); // add query user_id as 2nd param: {params: {user_id: userId}}
      setClientList(result.data);
    };
    getClients();
  }, []);
  // console.log("client list: ", clientList);

  return (
    <ClientGlobalContext.Provider value={{ clientList, setClientList }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />

        <Route path="app" element={<Outlet />}>
          {/* can we do this instead? 
          we make a new "Clients" page with an outlet, in app.tsx we put: 
            <Route path="clients" ></ Routes>

          inside ClientsPage, we put all the routes inside: 
            <Route index element={<Clients />}></Route>
            <Route path="new" element={<AddClient />} />
            <Route path=":clientId" element={<SingleClient />} />
            <Route path=":clientId/update" element={<EditSingleClient />} />
          */}
          <Route index element={<Projects />} />

          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/:clientId" element={<SingleClient />} />
          <Route path="clients/:clientId/update" element={<EditSingleClient />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:project_id" element={<SingleProject />} />
          <Route path="projects/:project_id/update" element={<EditProjectForm />} />

          <Route path="profile" element={<Profile />} />

          <Route path="invoices" element={<Invoices />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ClientGlobalContext.Provider>
  );
}

export default App;
