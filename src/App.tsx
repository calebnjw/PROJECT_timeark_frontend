import React, { useEffect, useState } from "react";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.scss";
import Home from "./pages/home/home";
import Login from "./pages/login/login";

import Dashboard from "./pages/dashboard/dashboard";

import Clients from "./pages/clients/clients";
import AddClient from "./pages/clients/addClients";
import SingleClient from "./pages/clients/singleClient";
import EditSingleClient from "./pages/clients/editSingleClients";

import Projects from "./pages/projects/projects";
import NewProject from "./pages/projects/newProjectForm";
import SingleProject from "./pages/projects/singleProject";
import EditProjectForm from "./pages/projects/editProjectForm";

import Tasks from "././pages/tasks/task";
import NewTask from "./pages/tasks/newTaskForm";
import SingleTask from "./pages/tasks/singleTask";
import EditTask from "./pages/tasks/editTask";

import Invoices from "./pages/invoices/invoices";

import Profile from "./pages/profile/profile";

import Page404 from "./pages/notFound/Page404";

import { ClientGlobalContext } from "./context/clientContext";
import { Dates } from "./types/tasks";
import { DateTime } from "luxon";

import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const [clientList, setClientList] = useState<[]>([]);
  const [dates, setDates] = useState<Dates[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const getClients = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients`); // add query user_id as 2nd param: {params: {user_id: userId}}
      setClientList(result.data);
    };

    const DatesArray = async () => {
      const datesArr = [];
      let dt = DateTime.now();
      for (let i = 4; i >= 0; i--) {
        datesArr.push({
          display: dt.minus({ days: i }).toFormat("dd LLL"),
          formatted: dt.minus({ days: i }).toFormat("yyyy-MM-dd"),
        });
      }
      setDates(datesArr);
      return dt;
    };
    getClients();
    DatesArray();
  }, []);
  // console.log("client list: ", clientList);

  return (
    <ClientGlobalContext.Provider
      value={{
        clientList,
        setClientList,
        dates,
        selectedDate,
        setSelectedDate,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        {/* <Outlet /> */}
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

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="clients" element={<Clients />} />
        <Route path="clients/new" element={<AddClient />} />
        <Route path="clients/:clientId" element={<SingleClient />} />
        <Route path="clients/:clientId/update" element={<EditSingleClient />} />

        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<NewProject />} />
        <Route path="projects/:project_id" element={<SingleProject />} />
        <Route path="projects/:project_id/update" element={<EditProjectForm />} />
        <Route path="projects/:project_id/tasks/:task_id" element={<SingleTask />} />
        <Route path="projects/:project_id/tasks/:task_id/update" element={<EditTask />} />

        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/new" element={<NewTask />} />

        <Route path="invoices" element={<Invoices />} />

        <Route path="profile" element={<Profile />} />

        {/* </Route> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ClientGlobalContext.Provider>
  );
}

export default App;
