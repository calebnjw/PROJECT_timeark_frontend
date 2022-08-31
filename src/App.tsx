import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";

// import HomeLayout from "./layout/homeLayout";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";
import Projects from "./pages/projects/projects";
import Invoices from "./pages/invoices/invoices";
import Page404 from "./pages/notFound/Page404";
import EditSingleClient from "./pages/clients/editSingleClients";
import { ClientGlobalContext } from "./context/clientContext";
import NewProject from "./pages/projects/newProjectForm";
import SingleProject from "./pages/projects/singleProject";
import EditProjectForm from "./pages/projects/editProjectForm";

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

  return (
    <BrowserRouter>
      <ClientGlobalContext.Provider value={{ clientList, setClientList }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route index element={<Clients />} />
          <Route path="clients" element={<Clients />} />
          <Route path="clients/new" element={<AddClient />} />
          <Route path="clients/:clientId" element={<SingleClient />} />
          <Route
            path="clients/:clientId/update"
            element={<EditSingleClient />}
          />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:project_id" element={<SingleProject />} />
          <Route
            path="projects/:project_id/update"
            element={<EditProjectForm />}
          />
          <Route path="invoices" element={<Invoices />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ClientGlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
