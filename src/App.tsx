import React, { useEffect, useState } from "react";

import Dashboard from "./pages/dashboard/dashboard";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/home";
// import Login from "./pages/login/login";
import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";

import InvoiceDisplay from "./pages/invoices/InvoiceDisplay";
import InvoicePage from "./pages/invoices/InvoicePage";
import GenerateInvoice from "./pages/invoices/GenerateInvoice";
import InvoiceForm from "./pages/invoices/newInvoiceForm";
import EditSingleClient from "./pages/clients/editSingleClients";
import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import EditProjectForm from "./pages/projects/editProjectForm";
import SingleProject from "./pages/projects/singleProject";

import Tasks from "./pages/tasks/task";
import NewTask from "./pages/tasks/newTaskForm";
import SingleTask from "./pages/tasks/singleTask";
import EditTask from "./pages/tasks/editTask";
import Profile from "./pages/profile/profile";
import Page404 from "./pages/notFound/Page404";
import { ClientGlobalContext } from "./context/clientContext";
import { Dates } from "./types/tasks";
import { DateTime } from "luxon";
import Time from "./pages/timeTracking/time";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);
  const [userId, setUserId] = useState("6310b08c2af46259c5514504"); // Please replace your user id here!!! DONT FORGET ADD YOUR USER ID TO CLIENT IN DB

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/clients`,
        { params: { user_id: userId } }
      );
      setClientList(result.data);
    };

    getClients();
  }, []);

  return (
    <ClientGlobalContext.Provider
      value={{
        clientList,
        setClientList,
        userId,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="login" element={<Login />} /> */}

        {/* <Route path="app" element={<Outlet />}> */}
        {/* can we do this instead? 
        we make a new "Clients" page with an outlet, in app.tsx we put: 
          <Route path="clients" ></ Routes>

        inside ClientsPage, we put all the routes inside: 
          <Route index element={<Clients />}></Route>
          <Route path="new" element={<AddClient />} />
          <Route path=":clientId" element={<SingleClient />} />
          <Route path=":clientId/update" element={<EditSingleClient />} />
        */}
        {/* index route to be updated to whichever page to land on after login*/}
        <Route index element={<Projects />} />

        {/* <Route path="login" element={<Login />} /> */}
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />
        <Route path="clients/:clientId" element={<SingleClient />} />
        <Route path="clients/:clientId/update" element={<EditSingleClient />} />

        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<NewProject />} />
        <Route path="projects/:project_id" element={<SingleProject />} />
        <Route
          path="projects/:project_id/update"
          element={<EditProjectForm />}
        />

        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/new" element={<NewTask />} />
        <Route
          path="projects/:project_id/tasks/:task_id"
          element={<SingleTask />}
        />
        <Route
          path="projects/:project_id/tasks/:task_id/update"
          element={<EditTask />}
        />

        <Route path="invoices" element={<InvoicePage />} />
        <Route path="invoices/:project_id" element={<GenerateInvoice />} />
        <Route path="invoices/:project_id/new" element={<InvoiceForm />} />
        <Route path="invoices/:invoice_id" element={<InvoiceDisplay />} />

        <Route path="time" element={<Time />} />
        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </ClientGlobalContext.Provider>
  );
}

export default App;
